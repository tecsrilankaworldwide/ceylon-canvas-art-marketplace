from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request, File, UploadFile, Query, Header
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.responses import Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone, timedelta
import hashlib
import jwt
import requests
import resend
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

# Email Settings (Resend)
RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

# Object Storage Settings
STORAGE_URL = "https://integrations.emergentagent.com/objstore/api/v1/storage"
EMERGENT_KEY = os.environ.get("EMERGENT_LLM_KEY")
APP_NAME = "ceylon-canvas"
storage_key = None

# MIME Types for images
ALLOWED_MIME_TYPES = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "image/webp": "webp"
}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

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
    is_admin: bool = False
    is_banned: bool = False
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
    badges: List[str] = []  # verified, featured, top_seller, trusted
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

# Review Models
class ReviewCreate(BaseModel):
    artwork_id: str
    rating: int  # 1-5
    title: str
    content: str
    photos: List[str] = []  # URLs of uploaded photos

class ReviewResponse(BaseModel):
    id: str
    artwork_id: str
    user_id: str
    user_name: str
    rating: int
    title: str
    content: str
    photos: List[str] = []
    created_at: str
    helpful_count: int = 0

# Admin Models
class AdminUserResponse(BaseModel):
    id: str
    email: str
    name: str
    is_artist: bool
    is_admin: bool = False
    is_banned: bool = False
    avatar_url: Optional[str] = None
    created_at: str
    order_count: int = 0
    total_spent: float = 0.0

class AdminArtworkResponse(BaseModel):
    id: str
    title: str
    artist_id: str
    artist_name: str
    price: float
    category: str
    is_available: bool
    is_approved: bool = True
    is_flagged: bool = False
    created_at: str
    views: int = 0

class AdminStatsResponse(BaseModel):
    total_users: int
    total_artists: int
    total_artworks: int
    total_orders: int
    total_revenue: float
    platform_fees: float
    pending_verifications: int
    flagged_artworks: int

class ArtistVerificationUpdate(BaseModel):
    status: str  # pending, verified, rejected
    badges: List[str] = []

# Messaging Models
class MessageCreate(BaseModel):
    conversation_id: Optional[str] = None
    recipient_id: str
    content: str
    artwork_id: Optional[str] = None  # Optional reference to artwork being discussed

class MessageResponse(BaseModel):
    id: str
    conversation_id: str
    sender_id: str
    sender_name: str
    sender_avatar: Optional[str] = None
    content: str
    created_at: str
    is_read: bool = False

class ConversationResponse(BaseModel):
    id: str
    participants: List[Dict[str, Any]]
    artwork_id: Optional[str] = None
    artwork_title: Optional[str] = None
    artwork_image: Optional[str] = None
    last_message: Optional[str] = None
    last_message_at: Optional[str] = None
    unread_count: int = 0
    created_at: str

# Notification Models
class NotificationResponse(BaseModel):
    id: str
    user_id: str
    type: str  # bid, outbid, purchase, commission, message, review, verification
    title: str
    message: str
    link: Optional[str] = None
    is_read: bool = False
    created_at: str

# ==================== STORAGE HELPERS ====================

def init_storage():
    """Initialize storage and get session-scoped storage key."""
    global storage_key
    if storage_key:
        return storage_key
    try:
        resp = requests.post(f"{STORAGE_URL}/init", json={"emergent_key": EMERGENT_KEY}, timeout=30)
        resp.raise_for_status()
        storage_key = resp.json()["storage_key"]
        logger.info("Object storage initialized successfully")
        return storage_key
    except Exception as e:
        logger.error(f"Failed to initialize storage: {e}")
        raise HTTPException(status_code=500, detail="Storage initialization failed")

def put_object(path: str, data: bytes, content_type: str) -> dict:
    """Upload file to object storage."""
    key = init_storage()
    resp = requests.put(
        f"{STORAGE_URL}/objects/{path}",
        headers={"X-Storage-Key": key, "Content-Type": content_type},
        data=data, timeout=120
    )
    resp.raise_for_status()
    return resp.json()

def get_object(path: str) -> tuple:
    """Download file from object storage."""
    key = init_storage()
    resp = requests.get(
        f"{STORAGE_URL}/objects/{path}",
        headers={"X-Storage-Key": key}, timeout=60
    )
    resp.raise_for_status()
    return resp.content, resp.headers.get("Content-Type", "application/octet-stream")

# ==================== EMAIL HELPERS ====================

async def send_email(to_email: str, subject: str, html_content: str):
    """Send email using Resend API (non-blocking)."""
    if not RESEND_API_KEY:
        logger.warning(f"Email not sent (no API key): {subject} to {to_email}")
        return None
    
    params = {
        "from": f"Ceylon Canvas <{SENDER_EMAIL}>",
        "to": [to_email],
        "subject": subject,
        "html": html_content
    }
    
    try:
        email = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Email sent to {to_email}: {subject}")
        return email
    except Exception as e:
        logger.error(f"Failed to send email to {to_email}: {e}")
        return None

def get_email_template(template_type: str, data: dict) -> tuple:
    """Get email subject and HTML content for different notification types."""
    
    base_style = """
        <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1A1D20; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { font-size: 24px; font-weight: bold; color: #0F3057; }
            .logo-sub { font-size: 10px; letter-spacing: 2px; color: #B64E33; text-transform: uppercase; }
            .content { background: #F5F5F0; padding: 30px; border-radius: 4px; }
            .highlight { color: #0F3057; font-weight: 600; }
            .price { font-size: 28px; font-weight: bold; color: #0F3057; }
            .btn { display: inline-block; background: #0F3057; color: white; padding: 12px 30px; text-decoration: none; border-radius: 2px; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; margin-top: 20px; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #5C636A; }
        </style>
    """
    
    if template_type == "bid_placed":
        subject = f"New Bid on Your Artwork: {data['artwork_title']}"
        html = f"""
        <html><head>{base_style}</head><body>
        <div class="container">
            <div class="header">
                <div class="logo">Ceylon Canvas</div>
                <div class="logo-sub">Art Marketplace</div>
            </div>
            <div class="content">
                <h2 style="color: #0F3057; margin-top: 0;">New Bid Received!</h2>
                <p>Great news! Someone has placed a bid on your artwork.</p>
                <p><strong>Artwork:</strong> {data['artwork_title']}</p>
                <p><strong>Bidder:</strong> {data['bidder_name']}</p>
                <p><strong>Bid Amount:</strong></p>
                <p class="price">${data['bid_amount']:,.2f}</p>
                <p>Total bids: {data['bid_count']}</p>
            </div>
            <div class="footer">
                <p>Ceylon Canvas Art Marketplace</p>
                <p>Connecting Sri Lankan Art with the World</p>
            </div>
        </div>
        </body></html>
        """
        return subject, html
    
    elif template_type == "outbid":
        subject = f"You've Been Outbid on: {data['artwork_title']}"
        html = f"""
        <html><head>{base_style}</head><body>
        <div class="container">
            <div class="header">
                <div class="logo">Ceylon Canvas</div>
                <div class="logo-sub">Art Marketplace</div>
            </div>
            <div class="content">
                <h2 style="color: #B64E33; margin-top: 0;">You've Been Outbid!</h2>
                <p>Someone has placed a higher bid on an artwork you're interested in.</p>
                <p><strong>Artwork:</strong> {data['artwork_title']}</p>
                <p><strong>Your Bid:</strong> ${data['your_bid']:,.2f}</p>
                <p><strong>Current Highest Bid:</strong></p>
                <p class="price">${data['current_bid']:,.2f}</p>
                <p>Don't miss out! Place a higher bid to stay in the running.</p>
            </div>
            <div class="footer">
                <p>Ceylon Canvas Art Marketplace</p>
            </div>
        </div>
        </body></html>
        """
        return subject, html
    
    elif template_type == "purchase_confirmation":
        artworks_html = "".join([
            f"<li>{a['title']} by {a['artist_name']} - ${a['price']:,.2f}</li>"
            for a in data['artworks']
        ])
        subject = f"Order Confirmed - Ceylon Canvas #{data['order_id'][:8]}"
        html = f"""
        <html><head>{base_style}</head><body>
        <div class="container">
            <div class="header">
                <div class="logo">Ceylon Canvas</div>
                <div class="logo-sub">Art Marketplace</div>
            </div>
            <div class="content">
                <h2 style="color: #2D5A43; margin-top: 0;">Thank You for Your Purchase!</h2>
                <p>Your order has been confirmed and is being processed.</p>
                <p><strong>Order ID:</strong> {data['order_id'][:8]}</p>
                <p><strong>Items:</strong></p>
                <ul>{artworks_html}</ul>
                <hr style="border: none; border-top: 1px solid #E5E5DF; margin: 20px 0;">
                <p><strong>Total Paid:</strong></p>
                <p class="price">${data['total']:,.2f}</p>
                <p style="margin-top: 20px;">We'll notify you when your artwork ships.</p>
            </div>
            <div class="footer">
                <p>Ceylon Canvas Art Marketplace</p>
                <p>Questions? Contact us at support@ceyloncanvas.com</p>
            </div>
        </div>
        </body></html>
        """
        return subject, html
    
    elif template_type == "commission_request":
        subject = f"New Commission Request: {data['title']}"
        html = f"""
        <html><head>{base_style}</head><body>
        <div class="container">
            <div class="header">
                <div class="logo">Ceylon Canvas</div>
                <div class="logo-sub">Art Marketplace</div>
            </div>
            <div class="content">
                <h2 style="color: #0F3057; margin-top: 0;">New Commission Request!</h2>
                <p>You've received a new commission request.</p>
                <p><strong>From:</strong> {data['client_name']}</p>
                <p><strong>Project:</strong> {data['title']}</p>
                <p><strong>Description:</strong></p>
                <p style="background: white; padding: 15px; border-radius: 4px;">{data['description']}</p>
                <p><strong>Budget Range:</strong> ${data['budget_min']:,.0f} - ${data['budget_max']:,.0f}</p>
                {f"<p><strong>Deadline:</strong> {data['deadline']}</p>" if data.get('deadline') else ""}
                <p style="margin-top: 20px;">Log in to your dashboard to respond to this request.</p>
            </div>
            <div class="footer">
                <p>Ceylon Canvas Art Marketplace</p>
            </div>
        </div>
        </body></html>
        """
        return subject, html
    
    elif template_type == "commission_status_update":
        status_messages = {
            "accepted": "Your commission request has been accepted! The artist will begin working on your project soon.",
            "in_progress": "Your commissioned artwork is now in progress!",
            "completed": "Great news! Your commissioned artwork is complete!",
            "rejected": "Unfortunately, the artist was unable to accept your commission request at this time."
        }
        status_colors = {
            "accepted": "#2D5A43",
            "in_progress": "#0F3057", 
            "completed": "#2D5A43",
            "rejected": "#9E2A2B"
        }
        subject = f"Commission Update: {data['title']} - {data['status'].replace('_', ' ').title()}"
        html = f"""
        <html><head>{base_style}</head><body>
        <div class="container">
            <div class="header">
                <div class="logo">Ceylon Canvas</div>
                <div class="logo-sub">Art Marketplace</div>
            </div>
            <div class="content">
                <h2 style="color: {status_colors.get(data['status'], '#0F3057')}; margin-top: 0;">
                    Commission {data['status'].replace('_', ' ').title()}
                </h2>
                <p><strong>Project:</strong> {data['title']}</p>
                <p><strong>Artist:</strong> {data['artist_name']}</p>
                <p style="margin-top: 20px;">{status_messages.get(data['status'], 'Your commission status has been updated.')}</p>
            </div>
            <div class="footer">
                <p>Ceylon Canvas Art Marketplace</p>
            </div>
        </div>
        </body></html>
        """
        return subject, html
    
    elif template_type == "welcome":
        subject = "Welcome to Ceylon Canvas - Art Marketplace"
        html = f"""
        <html><head>{base_style}</head><body>
        <div class="container">
            <div class="header">
                <div class="logo">Ceylon Canvas</div>
                <div class="logo-sub">Art Marketplace</div>
            </div>
            <div class="content">
                <h2 style="color: #0F3057; margin-top: 0;">Welcome, {data['name']}!</h2>
                <p>Thank you for joining Ceylon Canvas, the premier marketplace for Sri Lankan art.</p>
                <p>{'As an artist, you can now showcase and sell your work to collectors worldwide.' if data.get('is_artist') else 'Discover authentic Sri Lankan art from traditional masterpieces to contemporary digital pieces.'}</p>
                <p style="margin-top: 20px;">Start exploring our gallery and find your next favorite artwork!</p>
            </div>
            <div class="footer">
                <p>Ceylon Canvas Art Marketplace</p>
                <p>Connecting Sri Lankan Art with the World</p>
            </div>
        </div>
        </body></html>
        """
        return subject, html
    
    elif template_type == "auction_won":
        subject = f"Congratulations! You Won: {data['artwork_title']}"
        html = f"""
        <html><head>{base_style}</head><body>
        <div class="container">
            <div class="header">
                <div class="logo">Ceylon Canvas</div>
                <div class="logo-sub">Art Marketplace</div>
            </div>
            <div class="content">
                <h2 style="color: #2D5A43; margin-top: 0;">You Won the Auction!</h2>
                <p>Congratulations! You are the winning bidder.</p>
                <p><strong>Artwork:</strong> {data['artwork_title']}</p>
                <p><strong>Artist:</strong> {data['artist_name']}</p>
                <p><strong>Your Winning Bid:</strong></p>
                <p class="price">${data['winning_bid']:,.2f}</p>
                <p style="margin-top: 20px;">Complete your purchase to claim this beautiful piece!</p>
            </div>
            <div class="footer">
                <p>Ceylon Canvas Art Marketplace</p>
            </div>
        </div>
        </body></html>
        """
        return subject, html
    
    elif template_type == "auction_ended_artist":
        subject = f"Auction Ended: {data['artwork_title']}"
        html = f"""
        <html><head>{base_style}</head><body>
        <div class="container">
            <div class="header">
                <div class="logo">Ceylon Canvas</div>
                <div class="logo-sub">Art Marketplace</div>
            </div>
            <div class="content">
                <h2 style="color: #0F3057; margin-top: 0;">Your Auction Has Ended!</h2>
                <p><strong>Artwork:</strong> {data['artwork_title']}</p>
                {f'''<p><strong>Winner:</strong> {data['winner_name']}</p>
                <p><strong>Winning Bid:</strong></p>
                <p class="price">${data['winning_bid']:,.2f}</p>
                <p style="margin-top: 20px;">The buyer will complete their purchase soon.</p>'''
                if data.get('has_winner') else 
                '''<p>Unfortunately, this auction ended without any bids meeting your reserve price.</p>
                <p style="margin-top: 20px;">Consider relisting with adjusted pricing.</p>'''}
            </div>
            <div class="footer">
                <p>Ceylon Canvas Art Marketplace</p>
            </div>
        </div>
        </body></html>
        """
        return subject, html
    
    elif template_type == "new_review":
        stars = "★" * data['rating'] + "☆" * (5 - data['rating'])
        photos_html = ""
        if data.get('has_photos'):
            photos_html = f"<p style='color: #2D5A43; font-weight: bold;'>📷 This review includes {data['photo_count']} photo(s) of the artwork in the buyer's home!</p>"
        subject = f"New Review on Your Artwork: {data['artwork_title']}"
        html = f"""
        <html><head>{base_style}</head><body>
        <div class="container">
            <div class="header">
                <div class="logo">Ceylon Canvas</div>
                <div class="logo-sub">Art Marketplace</div>
            </div>
            <div class="content">
                <h2 style="color: #0F3057; margin-top: 0;">New Review Received!</h2>
                <p><strong>Artwork:</strong> {data['artwork_title']}</p>
                <p><strong>Reviewer:</strong> {data['reviewer_name']}</p>
                <p style="color: #E5A93C; font-size: 24px;">{stars}</p>
                <p><strong>"{data['review_title']}"</strong></p>
                <p style="background: white; padding: 15px; border-radius: 4px; font-style: italic;">
                    "{data['review_content']}"
                </p>
                {photos_html}
            </div>
            <div class="footer">
                <p>Ceylon Canvas Art Marketplace</p>
            </div>
        </div>
        </body></html>
        """
        return subject, html
    
    return "Ceylon Canvas Notification", "<p>You have a new notification from Ceylon Canvas.</p>"

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
    except Exception:
        return None

async def get_admin_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get current user and verify they are an admin."""
    if not credentials:
        raise HTTPException(status_code=401, detail="Not authenticated")
    payload = decode_token(credentials.credentials)
    user = await db.users.find_one({"id": payload["user_id"]}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    if not user.get("is_admin", False):
        raise HTTPException(status_code=403, detail="Admin access required")
    return user

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
        "is_admin": False,
        "is_banned": False,
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
    
    # Send welcome email (non-blocking)
    subject, html = get_email_template("welcome", {"name": user_data.name, "is_artist": user_data.is_artist})
    asyncio.create_task(send_email(user_data.email, subject, html))
    
    return {"token": token, "user": {k: v for k, v in user.items() if k not in ["password", "_id"]}}

@api_router.post("/auth/login")
async def login(credentials: UserLogin):
    user = await db.users.find_one({"email": credentials.email}, {"_id": 0})
    if not user or not verify_password(credentials.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Check if user is banned
    if user.get("is_banned", False):
        raise HTTPException(status_code=403, detail="Your account has been suspended")
    
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
    medium: Optional[str] = None,
    artist_id: Optional[str] = None,
    is_auction: Optional[bool] = None,
    is_digital: Optional[bool] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    min_year: Optional[int] = None,
    max_year: Optional[int] = None,
    tags: Optional[str] = None,
    search: Optional[str] = None,
    sort_by: str = "created_at",
    sort_order: str = "desc"
):
    query = {"is_available": True}
    
    if category:
        query["category"] = category
    if medium:
        query["medium"] = {"$regex": medium, "$options": "i"}
    if artist_id:
        query["artist_id"] = artist_id
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
    if min_year is not None:
        query["year_created"] = {"$gte": min_year}
    if max_year is not None:
        if "year_created" in query:
            query["year_created"]["$lte"] = max_year
        else:
            query["year_created"] = {"$lte": max_year}
    if tags:
        tag_list = [t.strip().lower() for t in tags.split(",")]
        query["tags"] = {"$in": tag_list}
    if search:
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}},
            {"artist_name": {"$regex": search, "$options": "i"}},
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
    
    # Add artist's user_id for messaging
    artist = await db.artists.find_one({"id": artwork["artist_id"]}, {"_id": 0})
    if artist:
        artwork["artist_user_id"] = artist.get("user_id")
    
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
    
    # Get updated artwork for bid count
    updated_artwork = await db.artworks.find_one({"id": bid_data.artwork_id}, {"_id": 0})
    
    # Send email to artist about new bid
    artist = await db.artists.find_one({"id": artwork["artist_id"]})
    if artist:
        artist_user = await db.users.find_one({"id": artist["user_id"]}, {"_id": 0})
        if artist_user:
            subject, html = get_email_template("bid_placed", {
                "artwork_title": artwork["title"],
                "bidder_name": user["name"],
                "bid_amount": bid_data.amount,
                "bid_count": updated_artwork.get("bid_count", 1)
            })
            asyncio.create_task(send_email(artist_user["email"], subject, html))
            
            # Create in-app notification for artist
            await create_notification(
                user_id=artist["user_id"],
                notification_type="bid",
                title="New Bid Received",
                message=f"{user['name']} placed a ${bid_data.amount} bid on {artwork['title']}",
                link=f"/artwork/{artwork['id']}"
            )
    
    # Notify previous highest bidder they've been outbid
    previous_bids = await db.bids.find(
        {"artwork_id": bid_data.artwork_id, "bidder_id": {"$ne": user["id"]}},
        {"_id": 0}
    ).sort("amount", -1).limit(1).to_list(1)
    
    if previous_bids:
        prev_bidder = await db.users.find_one({"id": previous_bids[0]["bidder_id"]}, {"_id": 0})
        if prev_bidder:
            subject, html = get_email_template("outbid", {
                "artwork_title": artwork["title"],
                "your_bid": previous_bids[0]["amount"],
                "current_bid": bid_data.amount
            })
            asyncio.create_task(send_email(prev_bidder["email"], subject, html))
            
            # Create in-app notification for outbid user
            await create_notification(
                user_id=previous_bids[0]["bidder_id"],
                notification_type="outbid",
                title="You've Been Outbid",
                message=f"Someone placed a higher bid on {artwork['title']}. Current bid: ${bid_data.amount}",
                link=f"/artwork/{artwork['id']}"
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
    
    # Send email to artist about new commission request
    artist_user = await db.users.find_one({"id": artist["user_id"]}, {"_id": 0})
    if artist_user:
        subject, html = get_email_template("commission_request", {
            "title": commission_data.title,
            "client_name": user["name"],
            "description": commission_data.description,
            "budget_min": commission_data.budget_min,
            "budget_max": commission_data.budget_max,
            "deadline": commission_data.deadline
        })
        asyncio.create_task(send_email(artist_user["email"], subject, html))
    
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
    
    # Send email to client about status update
    client = await db.users.find_one({"id": commission["client_id"]}, {"_id": 0})
    if client:
        subject, html = get_email_template("commission_status_update", {
            "title": commission["title"],
            "status": status,
            "artist_name": artist["name"]
        })
        asyncio.create_task(send_email(client["email"], subject, html))
    
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
            artworks_for_email = []
            for artwork_id in transaction["artwork_ids"]:
                await db.artworks.update_one({"id": artwork_id}, {"$set": {"is_available": False}})
                artwork = await db.artworks.find_one({"id": artwork_id}, {"_id": 0})
                if artwork:
                    artworks_for_email.append({
                        "title": artwork["title"],
                        "artist_name": artwork["artist_name"],
                        "price": artwork["price"]
                    })
            
            # Clear user's cart
            await db.carts.update_one({"user_id": transaction["user_id"]}, {"$set": {"items": []}})
            
            # Send purchase confirmation email
            subject, html = get_email_template("purchase_confirmation", {
                "order_id": order_id,
                "artworks": artworks_for_email,
                "total": transaction["amount"]
            })
            asyncio.create_task(send_email(transaction["user_email"], subject, html))
    
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

@api_router.get("/mediums")
async def get_mediums():
    """Get list of available art mediums for filtering."""
    return {
        "mediums": [
            {"id": "oil", "name": "Oil"},
            {"id": "acrylic", "name": "Acrylic"},
            {"id": "watercolor", "name": "Watercolor"},
            {"id": "pastel", "name": "Pastel"},
            {"id": "charcoal", "name": "Charcoal"},
            {"id": "pencil", "name": "Pencil"},
            {"id": "ink", "name": "Ink"},
            {"id": "mixed-media", "name": "Mixed Media"},
            {"id": "digital", "name": "Digital"},
            {"id": "photography", "name": "Photography"},
            {"id": "clay", "name": "Clay"},
            {"id": "bronze", "name": "Bronze"},
            {"id": "wood", "name": "Wood"},
            {"id": "textile", "name": "Textile"},
            {"id": "batik", "name": "Batik"}
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

# ==================== FILE UPLOAD ROUTES ====================

@api_router.post("/upload/image")
async def upload_image(file: UploadFile = File(...), user: dict = Depends(get_current_user)):
    """Upload an image for artworks or profiles."""
    # Validate content type
    if file.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(status_code=400, detail=f"Invalid file type. Allowed: {list(ALLOWED_MIME_TYPES.keys())}")
    
    # Read file data
    data = await file.read()
    
    # Validate file size
    if len(data) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail=f"File too large. Max size: {MAX_FILE_SIZE // (1024*1024)}MB")
    
    # Generate storage path
    ext = ALLOWED_MIME_TYPES[file.content_type]
    file_id = str(uuid.uuid4())
    path = f"{APP_NAME}/artworks/{user['id']}/{file_id}.{ext}"
    
    try:
        # Upload to storage
        result = put_object(path, data, file.content_type)
        
        # Store reference in database
        file_record = {
            "id": file_id,
            "user_id": user["id"],
            "storage_path": result["path"],
            "original_filename": file.filename,
            "content_type": file.content_type,
            "size": result["size"],
            "is_deleted": False,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db.files.insert_one(file_record)
        
        return {
            "id": file_id,
            "path": result["path"],
            "size": result["size"],
            "url": f"/api/files/{result['path']}"
        }
    except Exception as e:
        logger.error(f"Upload failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to upload file")

@api_router.get("/files/{path:path}")
async def download_file(path: str, authorization: str = Header(None), auth: str = Query(None)):
    """Download a file by path. Supports query param auth for img src usage."""
    # Find file record
    record = await db.files.find_one({"storage_path": path, "is_deleted": False}, {"_id": 0})
    if not record:
        raise HTTPException(status_code=404, detail="File not found")
    
    try:
        # Get file from storage
        data, content_type = get_object(path)
        return Response(content=data, media_type=record.get("content_type", content_type))
    except Exception as e:
        logger.error(f"Download failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to download file")

@api_router.delete("/files/{file_id}")
async def delete_file(file_id: str, user: dict = Depends(get_current_user)):
    """Soft-delete a file."""
    record = await db.files.find_one({"id": file_id, "user_id": user["id"]})
    if not record:
        raise HTTPException(status_code=404, detail="File not found")
    
    await db.files.update_one(
        {"id": file_id},
        {"$set": {"is_deleted": True, "deleted_at": datetime.now(timezone.utc).isoformat()}}
    )
    return {"message": "File deleted"}

@api_router.get("/files/user/list")
async def list_user_files(user: dict = Depends(get_current_user)):
    """List all files uploaded by user."""
    files = await db.files.find(
        {"user_id": user["id"], "is_deleted": False},
        {"_id": 0}
    ).to_list(100)
    return files

# ==================== EMAIL TEST ROUTE ====================

class TestEmailRequest(BaseModel):
    email: EmailStr

@api_router.post("/email/test")
async def test_email(request: TestEmailRequest, user: dict = Depends(get_current_user)):
    """Send a test email to verify email configuration."""
    if not RESEND_API_KEY:
        raise HTTPException(status_code=400, detail="Email service not configured")
    
    subject, html = get_email_template("welcome", {"name": user["name"], "is_artist": user.get("is_artist", False)})
    result = await send_email(request.email, subject, html)
    
    if result:
        return {"message": f"Test email sent to {request.email}", "email_id": result.get("id")}
    else:
        raise HTTPException(status_code=500, detail="Failed to send test email. In test mode, emails can only be sent to verified addresses.")

# ==================== ARTIST ANALYTICS ROUTES ====================

@api_router.get("/analytics/artist")
async def get_artist_analytics(user: dict = Depends(get_current_user)):
    """Get comprehensive analytics for artist dashboard."""
    if not user.get("is_artist"):
        raise HTTPException(status_code=403, detail="Only artists can access analytics")
    
    artist = await db.artists.find_one({"user_id": user["id"]}, {"_id": 0})
    if not artist:
        raise HTTPException(status_code=404, detail="Artist profile not found")
    
    artist_id = artist["id"]
    
    # Get all artworks by this artist
    artworks = await db.artworks.find({"artist_id": artist_id}, {"_id": 0}).to_list(1000)
    
    # Calculate totals
    total_artworks = len(artworks)
    available_artworks = len([a for a in artworks if a.get("is_available")])
    sold_artworks = len([a for a in artworks if not a.get("is_available")])
    auction_artworks = len([a for a in artworks if a.get("is_auction") and a.get("is_available")])
    
    # Total views
    total_views = sum(a.get("views", 0) for a in artworks)
    
    # Revenue calculation (from sold items)
    total_revenue = sum(a.get("price", 0) for a in artworks if not a.get("is_available"))
    
    # Get recent orders containing artist's artworks
    artwork_ids = [a["id"] for a in artworks]
    orders = await db.orders.find(
        {"artwork_ids": {"$in": artwork_ids}},
        {"_id": 0}
    ).sort("created_at", -1).to_list(100)
    
    # Calculate monthly revenue (last 6 months)
    from collections import defaultdict
    monthly_revenue = defaultdict(float)
    monthly_sales = defaultdict(int)
    
    for order in orders:
        order_date = datetime.fromisoformat(order["created_at"].replace("Z", "+00:00"))
        month_key = order_date.strftime("%Y-%m")
        
        # Get artworks in this order that belong to this artist
        for artwork_id in order.get("artwork_ids", []):
            artwork = next((a for a in artworks if a["id"] == artwork_id), None)
            if artwork:
                monthly_revenue[month_key] += artwork.get("price", 0)
                monthly_sales[month_key] += 1
    
    # Get last 6 months
    revenue_chart = []
    for i in range(5, -1, -1):
        month = (datetime.now(timezone.utc) - timedelta(days=i*30)).strftime("%Y-%m")
        month_name = (datetime.now(timezone.utc) - timedelta(days=i*30)).strftime("%b %Y")
        revenue_chart.append({
            "month": month_name,
            "revenue": monthly_revenue.get(month, 0),
            "sales": monthly_sales.get(month, 0)
        })
    
    # Get bid activity on artist's auctions
    bids = await db.bids.find(
        {"artwork_id": {"$in": artwork_ids}},
        {"_id": 0}
    ).sort("created_at", -1).to_list(100)
    
    total_bids = len(bids)
    recent_bids = bids[:10]  # Last 10 bids
    
    # Enrich recent bids with artwork info
    for bid in recent_bids:
        artwork = next((a for a in artworks if a["id"] == bid["artwork_id"]), None)
        if artwork:
            bid["artwork_title"] = artwork["title"]
            bid["artwork_image"] = artwork["images"][0] if artwork.get("images") else None
    
    # Top performing artworks (by views)
    top_artworks = sorted(artworks, key=lambda x: x.get("views", 0), reverse=True)[:5]
    
    # Get commissions
    commissions = await db.commissions.find(
        {"artist_id": artist_id},
        {"_id": 0}
    ).sort("created_at", -1).to_list(100)
    
    pending_commissions = len([c for c in commissions if c.get("status") == "pending"])
    active_commissions = len([c for c in commissions if c.get("status") in ["accepted", "in_progress"]])
    completed_commissions = len([c for c in commissions if c.get("status") == "completed"])
    
    # Potential commission revenue
    commission_pipeline_value = sum(
        (c.get("budget_min", 0) + c.get("budget_max", 0)) / 2 
        for c in commissions 
        if c.get("status") in ["pending", "accepted", "in_progress"]
    )
    
    return {
        "overview": {
            "total_artworks": total_artworks,
            "available_artworks": available_artworks,
            "sold_artworks": sold_artworks,
            "auction_artworks": auction_artworks,
            "total_views": total_views,
            "total_revenue": total_revenue,
            "total_bids": total_bids,
            "rating": artist.get("rating", 0)
        },
        "commissions": {
            "pending": pending_commissions,
            "active": active_commissions,
            "completed": completed_commissions,
            "pipeline_value": commission_pipeline_value
        },
        "revenue_chart": revenue_chart,
        "recent_bids": recent_bids,
        "top_artworks": [{
            "id": a["id"],
            "title": a["title"],
            "image": a["images"][0] if a.get("images") else None,
            "views": a.get("views", 0),
            "price": a.get("price", 0),
            "is_available": a.get("is_available", True),
            "is_auction": a.get("is_auction", False),
            "current_bid": a.get("current_bid"),
            "bid_count": a.get("bid_count", 0)
        } for a in top_artworks],
        "recent_orders": [{
            "id": o["id"],
            "amount": o["amount"],
            "status": o["status"],
            "created_at": o["created_at"]
        } for o in orders[:5]]
    }

@api_router.get("/analytics/artist/artworks")
async def get_artist_artwork_analytics(user: dict = Depends(get_current_user)):
    """Get detailed analytics for each artwork."""
    if not user.get("is_artist"):
        raise HTTPException(status_code=403, detail="Only artists can access analytics")
    
    artist = await db.artists.find_one({"user_id": user["id"]}, {"_id": 0})
    if not artist:
        raise HTTPException(status_code=404, detail="Artist profile not found")
    
    artworks = await db.artworks.find(
        {"artist_id": artist["id"]},
        {"_id": 0}
    ).sort("created_at", -1).to_list(100)
    
    # Get bid counts for each artwork
    artwork_analytics = []
    for artwork in artworks:
        bid_count = await db.bids.count_documents({"artwork_id": artwork["id"]})
        wishlist_count = await db.wishlists.count_documents({"artwork_ids": artwork["id"]})
        
        artwork_analytics.append({
            "id": artwork["id"],
            "title": artwork["title"],
            "image": artwork["images"][0] if artwork.get("images") else None,
            "category": artwork.get("category"),
            "price": artwork.get("price", 0),
            "current_bid": artwork.get("current_bid"),
            "views": artwork.get("views", 0),
            "bid_count": bid_count,
            "wishlist_count": wishlist_count,
            "is_available": artwork.get("is_available", True),
            "is_auction": artwork.get("is_auction", False),
            "created_at": artwork.get("created_at")
        })
    
    return artwork_analytics

# ==================== REVIEWS ROUTES ====================

@api_router.post("/reviews")
async def create_review(review_data: ReviewCreate, user: dict = Depends(get_current_user)):
    """Create a review for an artwork (must have purchased it)."""
    artwork = await db.artworks.find_one({"id": review_data.artwork_id}, {"_id": 0})
    if not artwork:
        raise HTTPException(status_code=404, detail="Artwork not found")
    
    # Check if user has purchased this artwork
    user_orders = await db.orders.find({"user_id": user["id"]}).to_list(100)
    has_purchased = any(review_data.artwork_id in order.get("artwork_ids", []) for order in user_orders)
    
    if not has_purchased:
        raise HTTPException(status_code=403, detail="You can only review artworks you have purchased")
    
    # Check if already reviewed
    existing_review = await db.reviews.find_one({
        "artwork_id": review_data.artwork_id,
        "user_id": user["id"]
    })
    if existing_review:
        raise HTTPException(status_code=400, detail="You have already reviewed this artwork")
    
    # Validate rating
    if review_data.rating < 1 or review_data.rating > 5:
        raise HTTPException(status_code=400, detail="Rating must be between 1 and 5")
    
    review_id = str(uuid.uuid4())
    review = {
        "id": review_id,
        "artwork_id": review_data.artwork_id,
        "user_id": user["id"],
        "user_name": user["name"],
        "rating": review_data.rating,
        "title": review_data.title,
        "content": review_data.content,
        "photos": review_data.photos or [],
        "helpful_count": 0,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.reviews.insert_one(review)
    
    # Update artist rating
    artist = await db.artists.find_one({"id": artwork["artist_id"]})
    if artist:
        # Get all reviews for this artist's artworks
        artist_artworks = await db.artworks.find({"artist_id": artist["id"]}, {"id": 1}).to_list(1000)
        artwork_ids = [a["id"] for a in artist_artworks]
        all_reviews = await db.reviews.find({"artwork_id": {"$in": artwork_ids}}).to_list(1000)
        
        if all_reviews:
            avg_rating = sum(r["rating"] for r in all_reviews) / len(all_reviews)
            await db.artists.update_one(
                {"id": artist["id"]},
                {"$set": {"rating": round(avg_rating, 2)}}
            )
        
        # Send email to artist
        artist_user = await db.users.find_one({"id": artist["user_id"]}, {"_id": 0})
        if artist_user:
            subject, html = get_email_template("new_review", {
                "artwork_title": artwork["title"],
                "reviewer_name": user["name"],
                "rating": review_data.rating,
                "review_title": review_data.title,
                "review_content": review_data.content,
                "has_photos": len(review_data.photos or []) > 0,
                "photo_count": len(review_data.photos or [])
            })
            asyncio.create_task(send_email(artist_user["email"], subject, html))
    
    return {k: v for k, v in review.items() if k != "_id"}

@api_router.get("/artworks/{artwork_id}/reviews", response_model=List[ReviewResponse])
async def get_artwork_reviews(artwork_id: str, skip: int = 0, limit: int = 20):
    """Get reviews for an artwork."""
    reviews = await db.reviews.find(
        {"artwork_id": artwork_id},
        {"_id": 0}
    ).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    return reviews

@api_router.get("/artists/{artist_id}/reviews")
async def get_artist_reviews(artist_id: str, skip: int = 0, limit: int = 20):
    """Get all reviews for an artist's artworks."""
    # Get all artworks by this artist
    artworks = await db.artworks.find({"artist_id": artist_id}, {"id": 1, "title": 1}).to_list(1000)
    artwork_ids = [a["id"] for a in artworks]
    artwork_titles = {a["id"]: a["title"] for a in artworks}
    
    reviews = await db.reviews.find(
        {"artwork_id": {"$in": artwork_ids}},
        {"_id": 0}
    ).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    
    # Add artwork title to each review
    for review in reviews:
        review["artwork_title"] = artwork_titles.get(review["artwork_id"], "Unknown")
    
    # Calculate summary
    total_reviews = await db.reviews.count_documents({"artwork_id": {"$in": artwork_ids}})
    if reviews:
        all_ratings = await db.reviews.find({"artwork_id": {"$in": artwork_ids}}, {"rating": 1}).to_list(1000)
        avg_rating = sum(r["rating"] for r in all_ratings) / len(all_ratings)
        rating_distribution = {i: 0 for i in range(1, 6)}
        for r in all_ratings:
            rating_distribution[r["rating"]] += 1
    else:
        avg_rating = 0
        rating_distribution = {i: 0 for i in range(1, 6)}
    
    return {
        "reviews": reviews,
        "total": total_reviews,
        "average_rating": round(avg_rating, 2),
        "rating_distribution": rating_distribution
    }

@api_router.post("/reviews/{review_id}/helpful")
async def mark_review_helpful(review_id: str, user: dict = Depends(get_current_user)):
    """Mark a review as helpful."""
    review = await db.reviews.find_one({"id": review_id})
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    
    # Check if user already marked this review
    existing = await db.review_helpful.find_one({
        "review_id": review_id,
        "user_id": user["id"]
    })
    if existing:
        raise HTTPException(status_code=400, detail="You already marked this review as helpful")
    
    await db.review_helpful.insert_one({
        "review_id": review_id,
        "user_id": user["id"],
        "created_at": datetime.now(timezone.utc).isoformat()
    })
    
    await db.reviews.update_one(
        {"id": review_id},
        {"$inc": {"helpful_count": 1}}
    )
    
    return {"message": "Marked as helpful"}

# ==================== AUCTION END HANDLING ====================

@api_router.post("/auctions/check-ended")
async def check_ended_auctions():
    """Check and process ended auctions. Can be called periodically."""
    now = datetime.now(timezone.utc).isoformat()
    
    # Find auctions that have ended but not yet processed
    ended_auctions = await db.artworks.find({
        "is_auction": True,
        "is_available": True,
        "auction_end_date": {"$lte": now},
        "auction_processed": {"$ne": True}
    }, {"_id": 0}).to_list(100)
    
    processed = []
    
    for artwork in ended_auctions:
        # Get highest bid
        highest_bid = await db.bids.find_one(
            {"artwork_id": artwork["id"]},
            {"_id": 0},
            sort=[("amount", -1)]
        )
        
        # Check if reserve price met
        reserve_met = True
        if artwork.get("reserve_price"):
            if not highest_bid or highest_bid["amount"] < artwork["reserve_price"]:
                reserve_met = False
        
        if highest_bid and reserve_met:
            # Auction has a winner
            winner = await db.users.find_one({"id": highest_bid["bidder_id"]}, {"_id": 0})
            
            # Create a pending order for the winner
            order_id = str(uuid.uuid4())
            await db.auction_wins.insert_one({
                "id": order_id,
                "artwork_id": artwork["id"],
                "winner_id": highest_bid["bidder_id"],
                "winning_bid": highest_bid["amount"],
                "status": "pending_payment",
                "created_at": datetime.now(timezone.utc).isoformat()
            })
            
            # Notify winner
            if winner:
                subject, html = get_email_template("auction_won", {
                    "artwork_title": artwork["title"],
                    "artist_name": artwork["artist_name"],
                    "winning_bid": highest_bid["amount"]
                })
                asyncio.create_task(send_email(winner["email"], subject, html))
            
            # Notify artist
            artist = await db.artists.find_one({"id": artwork["artist_id"]})
            if artist:
                artist_user = await db.users.find_one({"id": artist["user_id"]}, {"_id": 0})
                if artist_user:
                    subject, html = get_email_template("auction_ended_artist", {
                        "artwork_title": artwork["title"],
                        "has_winner": True,
                        "winner_name": highest_bid["bidder_name"],
                        "winning_bid": highest_bid["amount"]
                    })
                    asyncio.create_task(send_email(artist_user["email"], subject, html))
            
            processed.append({
                "artwork_id": artwork["id"],
                "title": artwork["title"],
                "winner": highest_bid["bidder_name"],
                "winning_bid": highest_bid["amount"]
            })
        else:
            # No winner or reserve not met
            artist = await db.artists.find_one({"id": artwork["artist_id"]})
            if artist:
                artist_user = await db.users.find_one({"id": artist["user_id"]}, {"_id": 0})
                if artist_user:
                    subject, html = get_email_template("auction_ended_artist", {
                        "artwork_title": artwork["title"],
                        "has_winner": False
                    })
                    asyncio.create_task(send_email(artist_user["email"], subject, html))
            
            processed.append({
                "artwork_id": artwork["id"],
                "title": artwork["title"],
                "winner": None,
                "reason": "No bids" if not highest_bid else "Reserve not met"
            })
        
        # Mark auction as processed
        await db.artworks.update_one(
            {"id": artwork["id"]},
            {"$set": {"auction_processed": True}}
        )
    
    return {"processed": len(processed), "auctions": processed}

@api_router.get("/auctions/wins")
async def get_auction_wins(user: dict = Depends(get_current_user)):
    """Get auctions won by current user that need payment."""
    wins = await db.auction_wins.find(
        {"winner_id": user["id"], "status": "pending_payment"},
        {"_id": 0}
    ).to_list(100)
    
    # Enrich with artwork details
    for win in wins:
        artwork = await db.artworks.find_one({"id": win["artwork_id"]}, {"_id": 0})
        if artwork:
            win["artwork"] = {
                "title": artwork["title"],
                "artist_name": artwork["artist_name"],
                "image": artwork["images"][0] if artwork.get("images") else None
            }
    
    return wins

@api_router.post("/auctions/wins/{win_id}/checkout")
async def checkout_auction_win(win_id: str, request: Request, user: dict = Depends(get_current_user)):
    """Create checkout session for auction win."""
    win = await db.auction_wins.find_one({"id": win_id, "winner_id": user["id"]})
    if not win:
        raise HTTPException(status_code=404, detail="Auction win not found")
    
    if win["status"] != "pending_payment":
        raise HTTPException(status_code=400, detail="This auction has already been paid")
    
    artwork = await db.artworks.find_one({"id": win["artwork_id"]})
    if not artwork:
        raise HTTPException(status_code=404, detail="Artwork not found")
    
    # Setup Stripe
    host_url = str(request.base_url)
    webhook_url = f"{host_url}api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
    
    origin = request.headers.get("origin", host_url)
    success_url = f"{origin}/checkout/success?session_id={{CHECKOUT_SESSION_ID}}&auction_win={win_id}"
    cancel_url = f"{origin}/dashboard"
    
    checkout_request = CheckoutSessionRequest(
        amount=win["winning_bid"],
        currency="usd",
        success_url=success_url,
        cancel_url=cancel_url,
        metadata={
            "user_id": user["id"],
            "user_email": user["email"],
            "artwork_ids": win["artwork_id"],
            "auction_win_id": win_id
        }
    )
    
    session: CheckoutSessionResponse = await stripe_checkout.create_checkout_session(checkout_request)
    
    # Create payment transaction
    transaction_id = str(uuid.uuid4())
    await db.payment_transactions.insert_one({
        "id": transaction_id,
        "session_id": session.session_id,
        "user_id": user["id"],
        "user_email": user["email"],
        "amount": win["winning_bid"],
        "currency": "usd",
        "artwork_ids": [win["artwork_id"]],
        "auction_win_id": win_id,
        "payment_status": "pending",
        "created_at": datetime.now(timezone.utc).isoformat()
    })
    
    return {"url": session.url, "session_id": session.session_id}

# ==================== ADMIN ROUTES ====================

@api_router.get("/admin/stats")
async def get_admin_stats(admin: dict = Depends(get_admin_user)):
    """Get platform statistics for admin dashboard."""
    total_users = await db.users.count_documents({})
    total_artists = await db.artists.count_documents({})
    total_artworks = await db.artworks.count_documents({})
    total_orders = await db.orders.count_documents({})
    
    # Calculate total revenue from completed orders
    revenue_pipeline = [
        {"$match": {"status": "completed"}},
        {"$group": {"_id": None, "total": {"$sum": "$total"}}}
    ]
    revenue_result = await db.orders.aggregate(revenue_pipeline).to_list(1)
    total_revenue = revenue_result[0]["total"] if revenue_result else 0.0
    
    # Platform fees (10% of revenue)
    platform_fees = total_revenue * 0.10
    
    # Pending artist verifications
    pending_verifications = await db.artists.count_documents({"verification_status": "pending"})
    
    # Flagged artworks
    flagged_artworks = await db.artworks.count_documents({"is_flagged": True})
    
    return {
        "total_users": total_users,
        "total_artists": total_artists,
        "total_artworks": total_artworks,
        "total_orders": total_orders,
        "total_revenue": total_revenue,
        "platform_fees": platform_fees,
        "pending_verifications": pending_verifications,
        "flagged_artworks": flagged_artworks
    }

@api_router.get("/admin/users")
async def get_admin_users(
    skip: int = 0,
    limit: int = 20,
    search: Optional[str] = None,
    role: Optional[str] = None,
    admin: dict = Depends(get_admin_user)
):
    """Get all users for admin management."""
    query = {}
    
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"email": {"$regex": search, "$options": "i"}}
        ]
    
    if role == "artist":
        query["is_artist"] = True
    elif role == "admin":
        query["is_admin"] = True
    elif role == "banned":
        query["is_banned"] = True
    
    users = await db.users.find(query, {"_id": 0, "password": 0}).skip(skip).limit(limit).to_list(limit)
    total = await db.users.count_documents(query)
    
    # Enrich with order data
    enriched_users = []
    for user in users:
        order_count = await db.orders.count_documents({"user_id": user["id"]})
        spent_pipeline = [
            {"$match": {"user_id": user["id"], "status": "completed"}},
            {"$group": {"_id": None, "total": {"$sum": "$total"}}}
        ]
        spent_result = await db.orders.aggregate(spent_pipeline).to_list(1)
        total_spent = spent_result[0]["total"] if spent_result else 0.0
        
        enriched_users.append({
            **user,
            "order_count": order_count,
            "total_spent": total_spent
        })
    
    return {"users": enriched_users, "total": total}

@api_router.put("/admin/users/{user_id}/ban")
async def ban_user(user_id: str, admin: dict = Depends(get_admin_user)):
    """Ban a user."""
    user = await db.users.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user.get("is_admin"):
        raise HTTPException(status_code=400, detail="Cannot ban an admin")
    
    await db.users.update_one({"id": user_id}, {"$set": {"is_banned": True}})
    return {"message": "User banned successfully"}

@api_router.put("/admin/users/{user_id}/unban")
async def unban_user(user_id: str, admin: dict = Depends(get_admin_user)):
    """Unban a user."""
    user = await db.users.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    await db.users.update_one({"id": user_id}, {"$set": {"is_banned": False}})
    return {"message": "User unbanned successfully"}

@api_router.put("/admin/users/{user_id}/make-admin")
async def make_admin(user_id: str, admin: dict = Depends(get_admin_user)):
    """Grant admin privileges to a user."""
    user = await db.users.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    await db.users.update_one({"id": user_id}, {"$set": {"is_admin": True}})
    return {"message": "User is now an admin"}

@api_router.put("/admin/users/{user_id}/remove-admin")
async def remove_admin(user_id: str, admin: dict = Depends(get_admin_user)):
    """Remove admin privileges from a user."""
    user = await db.users.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user_id == admin["id"]:
        raise HTTPException(status_code=400, detail="Cannot remove your own admin privileges")
    
    await db.users.update_one({"id": user_id}, {"$set": {"is_admin": False}})
    return {"message": "Admin privileges removed"}

@api_router.get("/admin/artworks")
async def get_admin_artworks(
    skip: int = 0,
    limit: int = 20,
    search: Optional[str] = None,
    status: Optional[str] = None,
    admin: dict = Depends(get_admin_user)
):
    """Get all artworks for admin moderation."""
    query = {}
    
    if search:
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"artist_name": {"$regex": search, "$options": "i"}}
        ]
    
    if status == "flagged":
        query["is_flagged"] = True
    elif status == "unavailable":
        query["is_available"] = False
    elif status == "available":
        query["is_available"] = True
    
    artworks = await db.artworks.find(query, {"_id": 0}).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    total = await db.artworks.count_documents(query)
    
    return {"artworks": artworks, "total": total}

@api_router.put("/admin/artworks/{artwork_id}/flag")
async def flag_artwork(artwork_id: str, admin: dict = Depends(get_admin_user)):
    """Flag an artwork for review."""
    artwork = await db.artworks.find_one({"id": artwork_id})
    if not artwork:
        raise HTTPException(status_code=404, detail="Artwork not found")
    
    await db.artworks.update_one({"id": artwork_id}, {"$set": {"is_flagged": True}})
    return {"message": "Artwork flagged"}

@api_router.put("/admin/artworks/{artwork_id}/unflag")
async def unflag_artwork(artwork_id: str, admin: dict = Depends(get_admin_user)):
    """Remove flag from an artwork."""
    artwork = await db.artworks.find_one({"id": artwork_id})
    if not artwork:
        raise HTTPException(status_code=404, detail="Artwork not found")
    
    await db.artworks.update_one({"id": artwork_id}, {"$set": {"is_flagged": False}})
    return {"message": "Artwork unflagged"}

@api_router.delete("/admin/artworks/{artwork_id}")
async def admin_delete_artwork(artwork_id: str, admin: dict = Depends(get_admin_user)):
    """Delete an artwork (admin only)."""
    artwork = await db.artworks.find_one({"id": artwork_id})
    if not artwork:
        raise HTTPException(status_code=404, detail="Artwork not found")
    
    await db.artworks.delete_one({"id": artwork_id})
    # Also delete related bids
    await db.bids.delete_many({"artwork_id": artwork_id})
    return {"message": "Artwork deleted"}

@api_router.get("/admin/artists")
async def get_admin_artists(
    skip: int = 0,
    limit: int = 20,
    search: Optional[str] = None,
    verification_status: Optional[str] = None,
    admin: dict = Depends(get_admin_user)
):
    """Get all artists for admin management."""
    query = {}
    
    if search:
        query["name"] = {"$regex": search, "$options": "i"}
    
    if verification_status:
        query["verification_status"] = verification_status
    
    artists = await db.artists.find(query, {"_id": 0}).skip(skip).limit(limit).to_list(limit)
    total = await db.artists.count_documents(query)
    
    # Enrich with artwork count and sales
    enriched_artists = []
    for artist in artists:
        artwork_count = await db.artworks.count_documents({"artist_id": artist["id"]})
        
        enriched_artists.append({
            **artist,
            "artwork_count": artwork_count,
            "verification_status": artist.get("verification_status", "pending"),
            "badges": artist.get("badges", [])
        })
    
    return {"artists": enriched_artists, "total": total}

@api_router.put("/admin/artists/{artist_id}/verify")
async def verify_artist(artist_id: str, data: ArtistVerificationUpdate, admin: dict = Depends(get_admin_user)):
    """Update artist verification status and badges."""
    artist = await db.artists.find_one({"id": artist_id})
    if not artist:
        raise HTTPException(status_code=404, detail="Artist not found")
    
    updates = {
        "verification_status": data.status,
        "badges": data.badges
    }
    
    await db.artists.update_one({"id": artist_id}, {"$set": updates})
    
    # Send notification email to artist
    user = await db.users.find_one({"id": artist["user_id"]})
    if user and RESEND_API_KEY:
        if data.status == "verified":
            subject = "Congratulations! Your Artist Profile is Verified"
            html = f"""
            <html><body>
            <h2>Welcome to the Verified Artists Community!</h2>
            <p>Dear {artist['name']},</p>
            <p>We are pleased to inform you that your artist profile on Ceylon Canvas has been verified!</p>
            <p>You now have access to the verified artist badge and additional features.</p>
            <p>Thank you for being part of our community.</p>
            <p>Best regards,<br>Ceylon Canvas Team</p>
            </body></html>
            """
            asyncio.create_task(send_email(user["email"], subject, html))
    
    return {"message": f"Artist verification status updated to {data.status}"}

@api_router.get("/admin/orders")
async def get_admin_orders(
    skip: int = 0,
    limit: int = 20,
    status: Optional[str] = None,
    admin: dict = Depends(get_admin_user)
):
    """Get all orders for admin view."""
    query = {}
    
    if status:
        query["status"] = status
    
    orders = await db.orders.find(query, {"_id": 0}).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    total = await db.orders.count_documents(query)
    
    return {"orders": orders, "total": total}

@api_router.get("/admin/revenue-chart")
async def get_revenue_chart(days: int = 30, admin: dict = Depends(get_admin_user)):
    """Get revenue data for chart visualization."""
    from_date = datetime.now(timezone.utc) - timedelta(days=days)
    
    pipeline = [
        {"$match": {
            "status": "completed",
            "created_at": {"$gte": from_date.isoformat()}
        }},
        {"$group": {
            "_id": {"$substr": ["$created_at", 0, 10]},
            "revenue": {"$sum": "$total"},
            "orders": {"$sum": 1}
        }},
        {"$sort": {"_id": 1}}
    ]
    
    results = await db.orders.aggregate(pipeline).to_list(days)
    
    return {
        "data": [
            {"date": r["_id"], "revenue": r["revenue"], "orders": r["orders"]}
            for r in results
        ]
    }

@api_router.post("/admin/create-admin")
async def create_admin_account(user_data: UserCreate, admin: dict = Depends(get_admin_user)):
    """Create a new admin account."""
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
        "is_admin": True,
        "is_banned": False,
        "avatar_url": None,
        "bio": None,
        "location": None,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.users.insert_one(user)
    
    return {"message": "Admin account created", "user_id": user_id}

# ==================== NOTIFICATION HELPERS ====================

async def create_notification(user_id: str, notification_type: str, title: str, message: str, link: Optional[str] = None):
    """Create a notification for a user."""
    notification = {
        "id": str(uuid.uuid4()),
        "user_id": user_id,
        "type": notification_type,
        "title": title,
        "message": message,
        "link": link,
        "is_read": False,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.notifications.insert_one(notification)
    # Return without MongoDB _id
    return {k: v for k, v in notification.items() if k != "_id"}

# ==================== MESSAGING ROUTES ====================

@api_router.get("/conversations")
async def get_conversations(user: dict = Depends(get_current_user)):
    """Get all conversations for the current user."""
    conversations = await db.conversations.find(
        {"participant_ids": user["id"]},
        {"_id": 0}
    ).sort("last_message_at", -1).to_list(50)
    
    # Enrich with participant info and unread counts
    enriched = []
    for conv in conversations:
        participants = []
        for pid in conv.get("participant_ids", []):
            if pid != user["id"]:
                p_user = await db.users.find_one({"id": pid}, {"_id": 0, "password": 0})
                if p_user:
                    participants.append({
                        "id": p_user["id"],
                        "name": p_user["name"],
                        "avatar_url": p_user.get("avatar_url"),
                        "is_artist": p_user.get("is_artist", False)
                    })
        
        # Get unread count
        unread_count = await db.messages.count_documents({
            "conversation_id": conv["id"],
            "sender_id": {"$ne": user["id"]},
            "is_read": False
        })
        
        # Get artwork info if linked
        artwork_title = None
        artwork_image = None
        if conv.get("artwork_id"):
            artwork = await db.artworks.find_one({"id": conv["artwork_id"]}, {"_id": 0})
            if artwork:
                artwork_title = artwork.get("title")
                artwork_image = artwork.get("images", [None])[0]
        
        enriched.append({
            **conv,
            "participants": participants,
            "unread_count": unread_count,
            "artwork_title": artwork_title,
            "artwork_image": artwork_image
        })
    
    return enriched

@api_router.get("/conversations/{conversation_id}")
async def get_conversation(conversation_id: str, user: dict = Depends(get_current_user)):
    """Get a specific conversation with messages."""
    conv = await db.conversations.find_one(
        {"id": conversation_id, "participant_ids": user["id"]},
        {"_id": 0}
    )
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    # Get messages
    messages = await db.messages.find(
        {"conversation_id": conversation_id},
        {"_id": 0}
    ).sort("created_at", 1).to_list(100)
    
    # Mark messages as read
    await db.messages.update_many(
        {"conversation_id": conversation_id, "sender_id": {"$ne": user["id"]}, "is_read": False},
        {"$set": {"is_read": True}}
    )
    
    # Get participant info
    participants = []
    for pid in conv.get("participant_ids", []):
        p_user = await db.users.find_one({"id": pid}, {"_id": 0, "password": 0})
        if p_user:
            participants.append({
                "id": p_user["id"],
                "name": p_user["name"],
                "avatar_url": p_user.get("avatar_url"),
                "is_artist": p_user.get("is_artist", False)
            })
    
    return {
        **conv,
        "participants": participants,
        "messages": messages
    }

@api_router.post("/conversations")
async def create_or_get_conversation(
    recipient_id: str,
    artwork_id: Optional[str] = None,
    user: dict = Depends(get_current_user)
):
    """Create a new conversation or get existing one."""
    if recipient_id == user["id"]:
        raise HTTPException(status_code=400, detail="Cannot start conversation with yourself")
    
    # Check if recipient exists
    recipient = await db.users.find_one({"id": recipient_id})
    if not recipient:
        raise HTTPException(status_code=404, detail="Recipient not found")
    
    # Check for existing conversation between these users
    existing = await db.conversations.find_one({
        "participant_ids": {"$all": [user["id"], recipient_id]},
        "artwork_id": artwork_id
    }, {"_id": 0})
    
    if existing:
        return existing
    
    # Create new conversation
    conv_id = str(uuid.uuid4())
    conversation = {
        "id": conv_id,
        "participant_ids": [user["id"], recipient_id],
        "artwork_id": artwork_id,
        "last_message": None,
        "last_message_at": datetime.now(timezone.utc).isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.conversations.insert_one(conversation)
    
    # Return without MongoDB _id
    return {k: v for k, v in conversation.items() if k != "_id"}

@api_router.post("/messages")
async def send_message(message_data: MessageCreate, user: dict = Depends(get_current_user)):
    """Send a message in a conversation."""
    # Get or create conversation
    if message_data.conversation_id:
        conv = await db.conversations.find_one({
            "id": message_data.conversation_id,
            "participant_ids": user["id"]
        })
        if not conv:
            raise HTTPException(status_code=404, detail="Conversation not found")
    else:
        # Create new conversation
        conv = await create_or_get_conversation(
            message_data.recipient_id,
            message_data.artwork_id,
            user
        )
    
    # Create message
    message_id = str(uuid.uuid4())
    message = {
        "id": message_id,
        "conversation_id": conv["id"],
        "sender_id": user["id"],
        "sender_name": user["name"],
        "sender_avatar": user.get("avatar_url"),
        "content": message_data.content,
        "is_read": False,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.messages.insert_one(message)
    
    # Update conversation last message
    await db.conversations.update_one(
        {"id": conv["id"]},
        {"$set": {
            "last_message": message_data.content[:100],
            "last_message_at": message["created_at"]
        }}
    )
    
    # Get recipient ID
    recipient_id = [pid for pid in conv["participant_ids"] if pid != user["id"]][0]
    
    # Create notification for recipient
    await create_notification(
        user_id=recipient_id,
        notification_type="message",
        title="New Message",
        message=f"{user['name']}: {message_data.content[:50]}{'...' if len(message_data.content) > 50 else ''}",
        link=f"/messages/{conv['id']}"
    )
    
    # Return without MongoDB _id
    return {k: v for k, v in message.items() if k != "_id"}

@api_router.put("/messages/{message_id}/read")
async def mark_message_read(message_id: str, user: dict = Depends(get_current_user)):
    """Mark a message as read."""
    result = await db.messages.update_one(
        {"id": message_id},
        {"$set": {"is_read": True}}
    )
    return {"success": result.modified_count > 0}

# ==================== NOTIFICATION ROUTES ====================

@api_router.get("/notifications")
async def get_notifications(
    skip: int = 0,
    limit: int = 20,
    unread_only: bool = False,
    user: dict = Depends(get_current_user)
):
    """Get notifications for the current user."""
    query = {"user_id": user["id"]}
    if unread_only:
        query["is_read"] = False
    
    notifications = await db.notifications.find(query, {"_id": 0}).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    unread_count = await db.notifications.count_documents({"user_id": user["id"], "is_read": False})
    
    return {
        "notifications": notifications,
        "unread_count": unread_count
    }

@api_router.put("/notifications/{notification_id}/read")
async def mark_notification_read(notification_id: str, user: dict = Depends(get_current_user)):
    """Mark a notification as read."""
    result = await db.notifications.update_one(
        {"id": notification_id, "user_id": user["id"]},
        {"$set": {"is_read": True}}
    )
    return {"success": result.modified_count > 0}

@api_router.put("/notifications/read-all")
async def mark_all_notifications_read(user: dict = Depends(get_current_user)):
    """Mark all notifications as read."""
    result = await db.notifications.update_many(
        {"user_id": user["id"], "is_read": False},
        {"$set": {"is_read": True}}
    )
    return {"success": True, "count": result.modified_count}

@api_router.delete("/notifications/{notification_id}")
async def delete_notification(notification_id: str, user: dict = Depends(get_current_user)):
    """Delete a notification."""
    result = await db.notifications.delete_one(
        {"id": notification_id, "user_id": user["id"]}
    )
    return {"success": result.deleted_count > 0}

# ==================== CURRENCY CONVERSION ====================

# Exchange rates (in production, use a real API)
EXCHANGE_RATES = {
    "USD": 1.0,
    "LKR": 325.0  # Approximate USD to LKR rate
}

@api_router.get("/currency/rates")
async def get_currency_rates():
    """Get current exchange rates."""
    return {
        "base": "USD",
        "rates": EXCHANGE_RATES,
        "updated_at": datetime.now(timezone.utc).isoformat()
    }

@api_router.get("/currency/convert")
async def convert_currency(
    amount: float,
    from_currency: str = "USD",
    to_currency: str = "LKR"
):
    """Convert amount between currencies."""
    if from_currency not in EXCHANGE_RATES or to_currency not in EXCHANGE_RATES:
        raise HTTPException(status_code=400, detail="Invalid currency")
    
    # Convert to USD first, then to target currency
    amount_in_usd = amount / EXCHANGE_RATES[from_currency]
    converted_amount = amount_in_usd * EXCHANGE_RATES[to_currency]
    
    return {
        "original_amount": amount,
        "original_currency": from_currency,
        "converted_amount": round(converted_amount, 2),
        "target_currency": to_currency,
        "rate": EXCHANGE_RATES[to_currency] / EXCHANGE_RATES[from_currency]
    }

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

@app.on_event("startup")
async def startup_event():
    """Initialize storage on startup."""
    try:
        if EMERGENT_KEY:
            init_storage()
    except Exception as e:
        logger.warning(f"Storage initialization deferred: {e}")
