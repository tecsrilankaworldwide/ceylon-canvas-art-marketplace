from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone, timedelta
import hashlib
import jwt
from bson import ObjectId
from emergentintegrations.payments.stripe.checkout import StripeCheckout, CheckoutSessionResponse, CheckoutStatusResponse, CheckoutSessionRequest

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# JWT Settings
JWT_SECRET = os.environ.get('JWT_SECRET', 'ceylon-canvas-secret-key-2024')
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24

# Stripe Settings
STRIPE_API_KEY = os.environ.get('STRIPE_API_KEY', 'sk_test_emergent')

# Create the main app
app = FastAPI(title="Ceylon Canvas Art Marketplace API")
api_router = APIRouter(prefix="/api")
security = HTTPBearer(auto_error=False)

# Logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# ==================== MODELS ====================

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str
    is_artist: bool = False

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserProfile(BaseModel):
    id: str
    email: str
    name: str
    is_artist: bool
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None
    created_at: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None
    avatar_url: Optional[str] = None

class ArtistProfile(BaseModel):
    id: str
    user_id: str
    name: str
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    cover_image: Optional[str] = None
    location: Optional[str] = None
    specialties: List[str] = []
    social_links: Dict[str, str] = {}
    total_sales: int = 0
    rating: float = 0.0
    created_at: str

class ArtistProfileCreate(BaseModel):
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    cover_image: Optional[str] = None
    location: Optional[str] = None
    specialties: List[str] = []
    social_links: Dict[str, str] = {}

class ArtworkCreate(BaseModel):
    title: str
    description: str
    category: str  # painting, sculpture, digital, photography, etc.
    medium: Optional[str] = None  # oil, acrylic, watercolor, etc.
    dimensions: Optional[str] = None
    year_created: Optional[int] = None
    images: List[str] = []
    is_digital: bool = False
    is_auction: bool = False
    price: float  # For direct purchase or starting bid
    reserve_price: Optional[float] = None  # Minimum price for auction
    auction_end_date: Optional[str] = None
    tags: List[str] = []
    is_available: bool = True

class ArtworkResponse(BaseModel):
    id: str
    artist_id: str
    artist_name: str
    title: str
    description: str
    category: str
    medium: Optional[str] = None
    dimensions: Optional[str] = None
    year_created: Optional[int] = None
    images: List[str] = []
    is_digital: bool = False
    is_auction: bool = False
    price: float
    current_bid: Optional[float] = None
    reserve_price: Optional[float] = None
    auction_end_date: Optional[str] = None
    bid_count: int = 0
    tags: List[str] = []
    is_available: bool = True
    created_at: str
    views: int = 0

class BidCreate(BaseModel):
    artwork_id: str
    amount: float

class BidResponse(BaseModel):
    id: str
    artwork_id: str
    bidder_id: str
    bidder_name: str
    amount: float
    created_at: str

class CommissionRequestCreate(BaseModel):
    artist_id: str
    title: str
    description: str
    budget_min: float
    budget_max: float
    deadline: Optional[str] = None
    reference_images: List[str] = []

class CommissionResponse(BaseModel):
    id: str
    client_id: str
    client_name: str
    artist_id: str
    artist_name: str
    title: str
    description: str
    budget_min: float
    budget_max: float
    deadline: Optional[str] = None
    reference_images: List[str] = []
    status: str  # pending, accepted, in_progress, completed, rejected
    created_at: str
    updated_at: str

class CartItem(BaseModel):
    artwork_id: str
    quantity: int = 1

class CartItemResponse(BaseModel):
    artwork_id: str
    artwork_title: str
    artwork_image: str
    artist_name: str
    price: float
    quantity: int

class CheckoutRequest(BaseModel):
    origin_url: str

class PaymentStatusResponse(BaseModel):
    status: str
    payment_status: str
    amount_total: float
    currency: str

# ==================== AUTH HELPERS ====================

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(password: str, hashed: str) -> bool:
    return hash_password(password) == hashed

def create_token(user_id: str, email: str) -> str:
    payload = {
        "user_id": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRATION_HOURS)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def decode_token(token: str) -> dict:
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if not credentials:
        raise HTTPException(status_code=401, detail="Not authenticated")
    payload = decode_token(credentials.credentials)
    user = await db.users.find_one({"id": payload["user_id"]}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

async def get_optional_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if not credentials:
        return None
    try:
        payload = decode_token(credentials.credentials)
        user = await db.users.find_one({"id": payload["user_id"]}, {"_id": 0})
        return user
    except:
        return None

# ==================== AUTH ROUTES ====================

@api_router.post("/auth/register")
async def register(user_data: UserCreate):
    existing = await db.users.find_one({"email": user_data.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_id = str(uuid.uuid4())
    user = {
        "id": user_id,
        "email": user_data.email,
        "password": hash_password(user_data.password),
        "name": user_data.name,
        "is_artist": user_data.is_artist,
        "avatar_url": None,
        "bio": None,
        "location": None,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.users.insert_one(user)
    
    # If registering as artist, create artist profile
    if user_data.is_artist:
        artist_profile = {
            "id": str(uuid.uuid4()),
            "user_id": user_id,
            "name": user_data.name,
            "bio": None,
            "avatar_url": None,
            "cover_image": None,
            "location": None,
            "specialties": [],
            "social_links": {},
            "total_sales": 0,
            "rating": 0.0,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db.artists.insert_one(artist_profile)
    
    token = create_token(user_id, user_data.email)
    return {"token": token, "user": {k: v for k, v in user.items() if k not in ["password", "_id"]}}

@api_router.post("/auth/login")
async def login(credentials: UserLogin):
    user = await db.users.find_one({"email": credentials.email}, {"_id": 0})
    if not user or not verify_password(credentials.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_token(user["id"], user["email"])
    return {"token": token, "user": {k: v for k, v in user.items() if k != "password"}}

@api_router.get("/auth/me", response_model=UserProfile)
async def get_me(user: dict = Depends(get_current_user)):
    return {k: v for k, v in user.items() if k != "password"}

@api_router.put("/auth/me")
async def update_me(update_data: UserUpdate, user: dict = Depends(get_current_user)):
    updates = {k: v for k, v in update_data.model_dump().items() if v is not None}
    if updates:
        await db.users.update_one({"id": user["id"]}, {"$set": updates})
        # Also update artist profile if exists
        if user.get("is_artist"):
            artist_updates = {}
            if "name" in updates:
                artist_updates["name"] = updates["name"]
            if "bio" in updates:
                artist_updates["bio"] = updates["bio"]
            if "avatar_url" in updates:
                artist_updates["avatar_url"] = updates["avatar_url"]
            if "location" in updates:
                artist_updates["location"] = updates["location"]
            if artist_updates:
                await db.artists.update_one({"user_id": user["id"]}, {"$set": artist_updates})
    
    updated_user = await db.users.find_one({"id": user["id"]}, {"_id": 0, "password": 0})
    return updated_user

# ==================== ARTIST ROUTES ====================

@api_router.get("/artists", response_model=List[ArtistProfile])
async def get_artists(skip: int = 0, limit: int = 20, specialty: Optional[str] = None):
    query = {}
    if specialty:
        query["specialties"] = {"$in": [specialty]}
    artists = await db.artists.find(query, {"_id": 0}).skip(skip).limit(limit).to_list(limit)
    return artists

@api_router.get("/artists/{artist_id}", response_model=ArtistProfile)
async def get_artist(artist_id: str):
    artist = await db.artists.find_one({"id": artist_id}, {"_id": 0})
    if not artist:
        raise HTTPException(status_code=404, detail="Artist not found")
    return artist

@api_router.put("/artists/me")
async def update_artist_profile(profile_data: ArtistProfileCreate, user: dict = Depends(get_current_user)):
    if not user.get("is_artist"):
        raise HTTPException(status_code=403, detail="Not an artist")
    
    updates = profile_data.model_dump()
    updates["name"] = user["name"]
    await db.artists.update_one({"user_id": user["id"]}, {"$set": updates})
    
    artist = await db.artists.find_one({"user_id": user["id"]}, {"_id": 0})
    return artist

@api_router.get("/artists/{artist_id}/artworks", response_model=List[ArtworkResponse])
async def get_artist_artworks(artist_id: str, skip: int = 0, limit: int = 20):
    artworks = await db.artworks.find({"artist_id": artist_id}, {"_id": 0}).skip(skip).limit(limit).to_list(limit)
    return artworks

# ==================== ARTWORK ROUTES ====================

@api_router.post("/artworks")
async def create_artwork(artwork_data: ArtworkCreate, user: dict = Depends(get_current_user)):
    if not user.get("is_artist"):
        raise HTTPException(status_code=403, detail="Only artists can create artworks")
    
    artist = await db.artists.find_one({"user_id": user["id"]}, {"_id": 0})
    if not artist:
        raise HTTPException(status_code=404, detail="Artist profile not found")
    
    artwork_id = str(uuid.uuid4())
    artwork = {
        "id": artwork_id,
        "artist_id": artist["id"],
        "artist_name": artist["name"],
        **artwork_data.model_dump(),
        "current_bid": artwork_data.price if artwork_data.is_auction else None,
        "bid_count": 0,
        "views": 0,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.artworks.insert_one(artwork)
    
    return {k: v for k, v in artwork.items() if k != "_id"}

@api_router.get("/artworks", response_model=List[ArtworkResponse])
async def get_artworks(
    skip: int = 0,
    limit: int = 20,
    category: Optional[str] = None,
    is_auction: Optional[bool] = None,
    is_digital: Optional[bool] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    search: Optional[str] = None,
    sort_by: str = "created_at",
    sort_order: str = "desc"
):
    query = {"is_available": True}
    
    if category:
        query["category"] = category
    if is_auction is not None:
        query["is_auction"] = is_auction
    if is_digital is not None:
        query["is_digital"] = is_digital
    if min_price is not None:
        query["price"] = {"$gte": min_price}
    if max_price is not None:
        if "price" in query:
            query["price"]["$lte"] = max_price
        else:
            query["price"] = {"$lte": max_price}
    if search:
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}},
            {"tags": {"$in": [search.lower()]}}
        ]
    
    sort_direction = -1 if sort_order == "desc" else 1
    artworks = await db.artworks.find(query, {"_id": 0}).sort(sort_by, sort_direction).skip(skip).limit(limit).to_list(limit)
    return artworks

@api_router.get("/artworks/featured", response_model=List[ArtworkResponse])
async def get_featured_artworks(limit: int = 8):
    artworks = await db.artworks.find({"is_available": True}, {"_id": 0}).sort("views", -1).limit(limit).to_list(limit)
    return artworks

@api_router.get("/artworks/auctions", response_model=List[ArtworkResponse])
async def get_active_auctions(limit: int = 10):
    now = datetime.now(timezone.utc).isoformat()
    artworks = await db.artworks.find({
        "is_auction": True,
        "is_available": True,
        "$or": [
            {"auction_end_date": {"$gt": now}},
            {"auction_end_date": None}
        ]
    }, {"_id": 0}).sort("created_at", -1).limit(limit).to_list(limit)
    return artworks

@api_router.get("/artworks/{artwork_id}", response_model=ArtworkResponse)
async def get_artwork(artwork_id: str, user: dict = Depends(get_optional_user)):
    artwork = await db.artworks.find_one({"id": artwork_id}, {"_id": 0})
    if not artwork:
        raise HTTPException(status_code=404, detail="Artwork not found")
    
    # Increment view count
    await db.artworks.update_one({"id": artwork_id}, {"$inc": {"views": 1}})
    artwork["views"] = artwork.get("views", 0) + 1
    
    return artwork

@api_router.put("/artworks/{artwork_id}")
async def update_artwork(artwork_id: str, artwork_data: ArtworkCreate, user: dict = Depends(get_current_user)):
    artwork = await db.artworks.find_one({"id": artwork_id})
    if not artwork:
        raise HTTPException(status_code=404, detail="Artwork not found")
    
    artist = await db.artists.find_one({"user_id": user["id"]})
    if not artist or artist["id"] != artwork["artist_id"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    await db.artworks.update_one({"id": artwork_id}, {"$set": artwork_data.model_dump()})
    updated = await db.artworks.find_one({"id": artwork_id}, {"_id": 0})
    return updated

@api_router.delete("/artworks/{artwork_id}")
async def delete_artwork(artwork_id: str, user: dict = Depends(get_current_user)):
    artwork = await db.artworks.find_one({"id": artwork_id})
    if not artwork:
        raise HTTPException(status_code=404, detail="Artwork not found")
    
    artist = await db.artists.find_one({"user_id": user["id"]})
    if not artist or artist["id"] != artwork["artist_id"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    await db.artworks.delete_one({"id": artwork_id})
    return {"message": "Artwork deleted"}

# ==================== BIDDING ROUTES ====================

@api_router.post("/bids")
async def place_bid(bid_data: BidCreate, user: dict = Depends(get_current_user)):
    artwork = await db.artworks.find_one({"id": bid_data.artwork_id})
    if not artwork:
        raise HTTPException(status_code=404, detail="Artwork not found")
    
    if not artwork.get("is_auction"):
        raise HTTPException(status_code=400, detail="This artwork is not an auction")
    
    if not artwork.get("is_available"):
        raise HTTPException(status_code=400, detail="This auction has ended")
    
    current_bid = artwork.get("current_bid", artwork["price"])
    if bid_data.amount <= current_bid:
        raise HTTPException(status_code=400, detail=f"Bid must be higher than current bid: ${current_bid}")
    
    bid_id = str(uuid.uuid4())
    bid = {
        "id": bid_id,
        "artwork_id": bid_data.artwork_id,
        "bidder_id": user["id"],
        "bidder_name": user["name"],
        "amount": bid_data.amount,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.bids.insert_one(bid)
    
    # Update artwork with new bid
    await db.artworks.update_one(
        {"id": bid_data.artwork_id},
        {"$set": {"current_bid": bid_data.amount}, "$inc": {"bid_count": 1}}
    )
    
    return {k: v for k, v in bid.items() if k != "_id"}

@api_router.get("/artworks/{artwork_id}/bids", response_model=List[BidResponse])
async def get_artwork_bids(artwork_id: str, limit: int = 20):
    bids = await db.bids.find({"artwork_id": artwork_id}, {"_id": 0}).sort("amount", -1).limit(limit).to_list(limit)
    return bids

@api_router.get("/bids/me", response_model=List[BidResponse])
async def get_my_bids(user: dict = Depends(get_current_user)):
    bids = await db.bids.find({"bidder_id": user["id"]}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return bids

# ==================== COMMISSION ROUTES ====================

@api_router.post("/commissions")
async def create_commission(commission_data: CommissionRequestCreate, user: dict = Depends(get_current_user)):
    artist = await db.artists.find_one({"id": commission_data.artist_id})
    if not artist:
        raise HTTPException(status_code=404, detail="Artist not found")
    
    commission_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc).isoformat()
    commission = {
        "id": commission_id,
        "client_id": user["id"],
        "client_name": user["name"],
        "artist_id": commission_data.artist_id,
        "artist_name": artist["name"],
        **commission_data.model_dump(),
        "status": "pending",
        "created_at": now,
        "updated_at": now
    }
    await db.commissions.insert_one(commission)
    
    return {k: v for k, v in commission.items() if k != "_id"}

@api_router.get("/commissions/me", response_model=List[CommissionResponse])
async def get_my_commissions(user: dict = Depends(get_current_user)):
    # Get commissions where user is either client or artist
    artist = await db.artists.find_one({"user_id": user["id"]})
    
    query = {"client_id": user["id"]}
    if artist:
        query = {"$or": [{"client_id": user["id"]}, {"artist_id": artist["id"]}]}
    
    commissions = await db.commissions.find(query, {"_id": 0}).sort("created_at", -1).to_list(100)
    return commissions

@api_router.put("/commissions/{commission_id}/status")
async def update_commission_status(commission_id: str, status: str, user: dict = Depends(get_current_user)):
    valid_statuses = ["pending", "accepted", "in_progress", "completed", "rejected"]
    if status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {valid_statuses}")
    
    commission = await db.commissions.find_one({"id": commission_id})
    if not commission:
        raise HTTPException(status_code=404, detail="Commission not found")
    
    # Only artist can update status
    artist = await db.artists.find_one({"user_id": user["id"]})
    if not artist or artist["id"] != commission["artist_id"]:
        raise HTTPException(status_code=403, detail="Only the artist can update commission status")
    
    await db.commissions.update_one(
        {"id": commission_id},
        {"$set": {"status": status, "updated_at": datetime.now(timezone.utc).isoformat()}}
    )
    
    updated = await db.commissions.find_one({"id": commission_id}, {"_id": 0})
    return updated

# ==================== CART ROUTES ====================

@api_router.get("/cart")
async def get_cart(user: dict = Depends(get_current_user)):
    cart = await db.carts.find_one({"user_id": user["id"]}, {"_id": 0})
    if not cart:
        return {"items": [], "total": 0}
    
    # Get artwork details for cart items
    items = []
    total = 0
    for item in cart.get("items", []):
        artwork = await db.artworks.find_one({"id": item["artwork_id"]}, {"_id": 0})
        if artwork and artwork.get("is_available") and not artwork.get("is_auction"):
            items.append({
                "artwork_id": artwork["id"],
                "artwork_title": artwork["title"],
                "artwork_image": artwork["images"][0] if artwork.get("images") else "",
                "artist_name": artwork["artist_name"],
                "price": artwork["price"],
                "quantity": item["quantity"]
            })
            total += artwork["price"] * item["quantity"]
    
    return {"items": items, "total": total}

@api_router.post("/cart/add")
async def add_to_cart(item: CartItem, user: dict = Depends(get_current_user)):
    artwork = await db.artworks.find_one({"id": item.artwork_id})
    if not artwork:
        raise HTTPException(status_code=404, detail="Artwork not found")
    
    if not artwork.get("is_available"):
        raise HTTPException(status_code=400, detail="Artwork not available")
    
    if artwork.get("is_auction"):
        raise HTTPException(status_code=400, detail="Auction items cannot be added to cart")
    
    cart = await db.carts.find_one({"user_id": user["id"]})
    if not cart:
        await db.carts.insert_one({
            "user_id": user["id"],
            "items": [{"artwork_id": item.artwork_id, "quantity": item.quantity}],
            "updated_at": datetime.now(timezone.utc).isoformat()
        })
    else:
        # Check if item already in cart
        existing_item = next((i for i in cart.get("items", []) if i["artwork_id"] == item.artwork_id), None)
        if existing_item:
            await db.carts.update_one(
                {"user_id": user["id"], "items.artwork_id": item.artwork_id},
                {"$set": {"items.$.quantity": existing_item["quantity"] + item.quantity, "updated_at": datetime.now(timezone.utc).isoformat()}}
            )
        else:
            await db.carts.update_one(
                {"user_id": user["id"]},
                {"$push": {"items": {"artwork_id": item.artwork_id, "quantity": item.quantity}}, "$set": {"updated_at": datetime.now(timezone.utc).isoformat()}}
            )
    
    return await get_cart(user)

@api_router.delete("/cart/{artwork_id}")
async def remove_from_cart(artwork_id: str, user: dict = Depends(get_current_user)):
    await db.carts.update_one(
        {"user_id": user["id"]},
        {"$pull": {"items": {"artwork_id": artwork_id}}, "$set": {"updated_at": datetime.now(timezone.utc).isoformat()}}
    )
    return await get_cart(user)

@api_router.delete("/cart")
async def clear_cart(user: dict = Depends(get_current_user)):
    await db.carts.update_one(
        {"user_id": user["id"]},
        {"$set": {"items": [], "updated_at": datetime.now(timezone.utc).isoformat()}}
    )
    return {"items": [], "total": 0}

# ==================== CHECKOUT & PAYMENT ROUTES ====================

@api_router.post("/checkout")
async def create_checkout_session(checkout_req: CheckoutRequest, request: Request, user: dict = Depends(get_current_user)):
    cart = await db.carts.find_one({"user_id": user["id"]})
    if not cart or not cart.get("items"):
        raise HTTPException(status_code=400, detail="Cart is empty")
    
    # Calculate total from server side
    total = 0.0
    artwork_ids = []
    for item in cart["items"]:
        artwork = await db.artworks.find_one({"id": item["artwork_id"]})
        if artwork and artwork.get("is_available") and not artwork.get("is_auction"):
            total += float(artwork["price"]) * item["quantity"]
            artwork_ids.append(item["artwork_id"])
    
    if total <= 0:
        raise HTTPException(status_code=400, detail="Invalid cart total")
    
    # Setup Stripe
    host_url = str(request.base_url)
    webhook_url = f"{host_url}api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
    
    # Build URLs from frontend origin
    success_url = f"{checkout_req.origin_url}/checkout/success?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{checkout_req.origin_url}/cart"
    
    # Create checkout session
    checkout_request = CheckoutSessionRequest(
        amount=total,
        currency="usd",
        success_url=success_url,
        cancel_url=cancel_url,
        metadata={
            "user_id": user["id"],
            "user_email": user["email"],
            "artwork_ids": ",".join(artwork_ids)
        }
    )
    
    session: CheckoutSessionResponse = await stripe_checkout.create_checkout_session(checkout_request)
    
    # Create payment transaction record
    transaction_id = str(uuid.uuid4())
    await db.payment_transactions.insert_one({
        "id": transaction_id,
        "session_id": session.session_id,
        "user_id": user["id"],
        "user_email": user["email"],
        "amount": total,
        "currency": "usd",
        "artwork_ids": artwork_ids,
        "payment_status": "pending",
        "created_at": datetime.now(timezone.utc).isoformat()
    })
    
    return {"url": session.url, "session_id": session.session_id}

@api_router.get("/checkout/status/{session_id}")
async def get_checkout_status(session_id: str, request: Request, user: dict = Depends(get_current_user)):
    host_url = str(request.base_url)
    webhook_url = f"{host_url}api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
    
    checkout_status: CheckoutStatusResponse = await stripe_checkout.get_checkout_status(session_id)
    
    # Update payment transaction
    transaction = await db.payment_transactions.find_one({"session_id": session_id})
    if transaction and transaction.get("payment_status") != "paid":
        new_status = checkout_status.payment_status
        await db.payment_transactions.update_one(
            {"session_id": session_id},
            {"$set": {"payment_status": new_status, "status": checkout_status.status, "updated_at": datetime.now(timezone.utc).isoformat()}}
        )
        
        # If payment successful, create order and clear cart
        if new_status == "paid":
            order_id = str(uuid.uuid4())
            await db.orders.insert_one({
                "id": order_id,
                "user_id": transaction["user_id"],
                "artwork_ids": transaction["artwork_ids"],
                "amount": transaction["amount"],
                "currency": transaction["currency"],
                "session_id": session_id,
                "status": "completed",
                "created_at": datetime.now(timezone.utc).isoformat()
            })
            
            # Mark artworks as sold
            for artwork_id in transaction["artwork_ids"]:
                await db.artworks.update_one({"id": artwork_id}, {"$set": {"is_available": False}})
            
            # Clear user's cart
            await db.carts.update_one({"user_id": transaction["user_id"]}, {"$set": {"items": []}})
    
    return {
        "status": checkout_status.status,
        "payment_status": checkout_status.payment_status,
        "amount_total": checkout_status.amount_total / 100,
        "currency": checkout_status.currency
    }

@api_router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    body = await request.body()
    signature = request.headers.get("Stripe-Signature")
    
    host_url = str(request.base_url)
    webhook_url = f"{host_url}api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
    
    try:
        webhook_response = await stripe_checkout.handle_webhook(body, signature)
        
        if webhook_response.payment_status == "paid":
            session_id = webhook_response.session_id
            transaction = await db.payment_transactions.find_one({"session_id": session_id})
            
            if transaction and transaction.get("payment_status") != "paid":
                await db.payment_transactions.update_one(
                    {"session_id": session_id},
                    {"$set": {"payment_status": "paid", "updated_at": datetime.now(timezone.utc).isoformat()}}
                )
                
                # Create order
                order_id = str(uuid.uuid4())
                await db.orders.insert_one({
                    "id": order_id,
                    "user_id": transaction["user_id"],
                    "artwork_ids": transaction["artwork_ids"],
                    "amount": transaction["amount"],
                    "currency": transaction["currency"],
                    "session_id": session_id,
                    "status": "completed",
                    "created_at": datetime.now(timezone.utc).isoformat()
                })
                
                # Mark artworks as sold
                for artwork_id in transaction["artwork_ids"]:
                    await db.artworks.update_one({"id": artwork_id}, {"$set": {"is_available": False}})
                
                # Clear cart
                await db.carts.update_one({"user_id": transaction["user_id"]}, {"$set": {"items": []}})
        
        return {"received": True}
    except Exception as e:
        logger.error(f"Webhook error: {e}")
        raise HTTPException(status_code=400, detail=str(e))

# ==================== ORDERS ROUTES ====================

@api_router.get("/orders")
async def get_orders(user: dict = Depends(get_current_user)):
    orders = await db.orders.find({"user_id": user["id"]}, {"_id": 0}).sort("created_at", -1).to_list(100)
    
    # Get artwork details for each order
    for order in orders:
        artworks = []
        for artwork_id in order.get("artwork_ids", []):
            artwork = await db.artworks.find_one({"id": artwork_id}, {"_id": 0})
            if artwork:
                artworks.append({
                    "id": artwork["id"],
                    "title": artwork["title"],
                    "image": artwork["images"][0] if artwork.get("images") else "",
                    "artist_name": artwork["artist_name"],
                    "price": artwork["price"]
                })
        order["artworks"] = artworks
    
    return orders

# ==================== WISHLIST ROUTES ====================

@api_router.get("/wishlist")
async def get_wishlist(user: dict = Depends(get_current_user)):
    wishlist = await db.wishlists.find_one({"user_id": user["id"]}, {"_id": 0})
    if not wishlist:
        return {"items": []}
    
    items = []
    for artwork_id in wishlist.get("artwork_ids", []):
        artwork = await db.artworks.find_one({"id": artwork_id}, {"_id": 0})
        if artwork:
            items.append(artwork)
    
    return {"items": items}

@api_router.post("/wishlist/{artwork_id}")
async def add_to_wishlist(artwork_id: str, user: dict = Depends(get_current_user)):
    artwork = await db.artworks.find_one({"id": artwork_id})
    if not artwork:
        raise HTTPException(status_code=404, detail="Artwork not found")
    
    wishlist = await db.wishlists.find_one({"user_id": user["id"]})
    if not wishlist:
        await db.wishlists.insert_one({
            "user_id": user["id"],
            "artwork_ids": [artwork_id]
        })
    else:
        if artwork_id not in wishlist.get("artwork_ids", []):
            await db.wishlists.update_one(
                {"user_id": user["id"]},
                {"$push": {"artwork_ids": artwork_id}}
            )
    
    return {"message": "Added to wishlist"}

@api_router.delete("/wishlist/{artwork_id}")
async def remove_from_wishlist(artwork_id: str, user: dict = Depends(get_current_user)):
    await db.wishlists.update_one(
        {"user_id": user["id"]},
        {"$pull": {"artwork_ids": artwork_id}}
    )
    return {"message": "Removed from wishlist"}

# ==================== CATEGORIES ====================

@api_router.get("/categories")
async def get_categories():
    return {
        "categories": [
            {"id": "painting", "name": "Paintings", "description": "Traditional and contemporary paintings"},
            {"id": "sculpture", "name": "Sculptures", "description": "3D artworks and installations"},
            {"id": "digital", "name": "Digital Art", "description": "Digital illustrations and NFT-ready art"},
            {"id": "photography", "name": "Photography", "description": "Fine art photography"},
            {"id": "textile", "name": "Textile Art", "description": "Handwoven and textile-based artworks"},
            {"id": "ceramics", "name": "Ceramics", "description": "Pottery and ceramic art"},
            {"id": "mixed-media", "name": "Mixed Media", "description": "Multi-medium artworks"},
            {"id": "traditional", "name": "Traditional Art", "description": "Sri Lankan traditional art forms"}
        ]
    }

# ==================== STATS ====================

@api_router.get("/stats")
async def get_stats():
    artists_count = await db.artists.count_documents({})
    artworks_count = await db.artworks.count_documents({"is_available": True})
    sold_count = await db.artworks.count_documents({"is_available": False})
    
    return {
        "artists": artists_count,
        "artworks": artworks_count,
        "sold": sold_count
    }

# ==================== SEED DATA ====================

@api_router.post("/seed")
async def seed_data():
    # Check if data already exists
    existing = await db.artists.count_documents({})
    if existing > 0:
        return {"message": "Data already seeded"}
    
    # Create sample artists
    sample_artists = [
        {
            "id": str(uuid.uuid4()),
            "user_id": "artist-user-1",
            "name": "Priyantha Udagedara",
            "bio": "Contemporary Sri Lankan artist known for vibrant landscapes and cultural themes. Works with oil and acrylic on canvas.",
            "avatar_url": "https://images.unsplash.com/photo-1752649938112-c63668199052?w=400",
            "cover_image": "https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?w=800",
            "location": "Colombo, Sri Lanka",
            "specialties": ["painting", "traditional", "contemporary"],
            "social_links": {"instagram": "@priyantha.art"},
            "total_sales": 45,
            "rating": 4.8,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "user_id": "artist-user-2",
            "name": "Malini Fonseka",
            "bio": "Digital artist exploring the intersection of traditional Sri Lankan motifs and modern digital techniques.",
            "avatar_url": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
            "cover_image": "https://images.unsplash.com/photo-1766801848077-31bd1900efcc?w=800",
            "location": "Kandy, Sri Lanka",
            "specialties": ["digital", "mixed-media"],
            "social_links": {"instagram": "@malini.digital"},
            "total_sales": 32,
            "rating": 4.9,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "user_id": "artist-user-3",
            "name": "Kumara Weerasekera",
            "bio": "Master sculptor working with stone, wood, and bronze. Specializing in Buddhist and Hindu iconography.",
            "avatar_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
            "cover_image": "https://images.pexels.com/photos/12047518/pexels-photo-12047518.jpeg?w=800",
            "location": "Galle, Sri Lanka",
            "specialties": ["sculpture", "traditional"],
            "social_links": {"website": "kumara-sculptures.lk"},
            "total_sales": 28,
            "rating": 4.7,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    
    for artist in sample_artists:
        await db.artists.insert_one(artist)
    
    # Create sample artworks
    sample_artworks = [
        {
            "id": str(uuid.uuid4()),
            "artist_id": sample_artists[0]["id"],
            "artist_name": sample_artists[0]["name"],
            "title": "Golden Paddy Fields at Dusk",
            "description": "A breathtaking view of Sri Lankan paddy fields during the golden hour. Oil on canvas capturing the serene beauty of rural Ceylon.",
            "category": "painting",
            "medium": "Oil on Canvas",
            "dimensions": "120cm x 80cm",
            "year_created": 2024,
            "images": ["https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"],
            "is_digital": False,
            "is_auction": False,
            "price": 2500.00,
            "current_bid": None,
            "reserve_price": None,
            "auction_end_date": None,
            "bid_count": 0,
            "tags": ["landscape", "rural", "ceylon", "traditional"],
            "is_available": True,
            "views": 156,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "artist_id": sample_artists[0]["id"],
            "artist_name": sample_artists[0]["name"],
            "title": "Temple of the Sacred Tooth",
            "description": "Majestic representation of the iconic Temple of the Sacred Tooth Relic in Kandy. Acrylic with gold leaf accents.",
            "category": "painting",
            "medium": "Acrylic with Gold Leaf",
            "dimensions": "150cm x 100cm",
            "year_created": 2023,
            "images": ["https://images.pexels.com/photos/2097218/pexels-photo-2097218.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"],
            "is_digital": False,
            "is_auction": True,
            "price": 5000.00,
            "current_bid": 5500.00,
            "reserve_price": 4500.00,
            "auction_end_date": (datetime.now(timezone.utc) + timedelta(days=7)).isoformat(),
            "bid_count": 3,
            "tags": ["temple", "kandy", "religious", "heritage"],
            "is_available": True,
            "views": 234,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "artist_id": sample_artists[1]["id"],
            "artist_name": sample_artists[1]["name"],
            "title": "Digital Dreams of Lanka",
            "description": "A vibrant digital artwork blending traditional Kandyan patterns with futuristic elements. High-resolution digital print available.",
            "category": "digital",
            "medium": "Digital Art",
            "dimensions": "4000px x 3000px",
            "year_created": 2024,
            "images": ["https://images.unsplash.com/photo-1720945489924-19b707539b3a?w=940"],
            "is_digital": True,
            "is_auction": False,
            "price": 800.00,
            "current_bid": None,
            "reserve_price": None,
            "auction_end_date": None,
            "bid_count": 0,
            "tags": ["digital", "modern", "kandyan", "patterns"],
            "is_available": True,
            "views": 312,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "artist_id": sample_artists[1]["id"],
            "artist_name": sample_artists[1]["name"],
            "title": "Lotus in Moonlight",
            "description": "Ethereal digital painting of sacred lotus flowers under a full moon. Perfect for meditation spaces.",
            "category": "digital",
            "medium": "Digital Painting",
            "dimensions": "5000px x 3500px",
            "year_created": 2024,
            "images": ["https://images.unsplash.com/photo-1766801848077-31bd1900efcc?w=940"],
            "is_digital": True,
            "is_auction": True,
            "price": 400.00,
            "current_bid": 450.00,
            "reserve_price": 350.00,
            "auction_end_date": (datetime.now(timezone.utc) + timedelta(days=5)).isoformat(),
            "bid_count": 2,
            "tags": ["lotus", "spiritual", "digital", "meditation"],
            "is_available": True,
            "views": 189,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "artist_id": sample_artists[2]["id"],
            "artist_name": sample_artists[2]["name"],
            "title": "Guardian of Anuradhapura",
            "description": "Bronze sculpture inspired by ancient Anuradhapura guard stones. Limited edition, 1 of 5.",
            "category": "sculpture",
            "medium": "Bronze",
            "dimensions": "45cm x 20cm x 15cm",
            "year_created": 2023,
            "images": ["https://images.pexels.com/photos/12047518/pexels-photo-12047518.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"],
            "is_digital": False,
            "is_auction": False,
            "price": 8500.00,
            "current_bid": None,
            "reserve_price": None,
            "auction_end_date": None,
            "bid_count": 0,
            "tags": ["sculpture", "bronze", "anuradhapura", "heritage"],
            "is_available": True,
            "views": 98,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "artist_id": sample_artists[2]["id"],
            "artist_name": sample_artists[2]["name"],
            "title": "Dancing Apsara",
            "description": "Intricately carved wooden sculpture of a celestial dancer. Hand-carved from ebony wood native to Sri Lanka.",
            "category": "sculpture",
            "medium": "Ebony Wood",
            "dimensions": "60cm x 25cm x 20cm",
            "year_created": 2024,
            "images": ["https://images.unsplash.com/photo-1720945489924-19b707539b3a?w=940"],
            "is_digital": False,
            "is_auction": True,
            "price": 12000.00,
            "current_bid": 12500.00,
            "reserve_price": 11000.00,
            "auction_end_date": (datetime.now(timezone.utc) + timedelta(days=10)).isoformat(),
            "bid_count": 1,
            "tags": ["wood", "carving", "traditional", "apsara"],
            "is_available": True,
            "views": 145,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    
    for artwork in sample_artworks:
        await db.artworks.insert_one(artwork)
    
    return {"message": "Sample data seeded successfully", "artists": len(sample_artists), "artworks": len(sample_artworks)}

# ==================== MAIN ====================

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
