# Expanded seed data for Ceylon Canvas Art Marketplace
import uuid
from datetime import datetime, timezone, timedelta

def generate_artists():
    """Generate 40 Sri Lankan artists"""
    first_names = ["Priyantha", "Malini", "Kumara", "Sanduni", "Chamara", "Dilani", "Nuwan", "Pavithra", 
                   "Lasitha", "Shirani", "Rohan", "Nirmala", "Anura", "Chandrika", "Sunil", "Deepika",
                   "Asanka", "Samanthi", "Ruwan", "Kumudini", "Gayan", "Rashmi", "Mahesh", "Chathurika",
                   "Dinesh", "Niluka", "Kasun", "Hiruni", "Tharaka", "Sachini", "Buddhika", "Madhavi",
                   "Chathura", "Yashodha", "Amila", "Dhanushka", "Lakmal", "Ramani", "Suranga", "Nisansala"]
    
    last_names = ["Udagedara", "Fonseka", "Weerasekera", "Perera", "Fernando", "Silva", "Jayawardena",
                  "Bandara", "Senanayake", "Ratnayake", "Wickremasinghe", "Gunawardena", "Karunaratne",
                  "Dissanayake", "Herath", "Mendis", "Rajapaksa", "Amarasekara", "Wijesinghe", "Gunasekara"]
    
    locations = ["Colombo, Sri Lanka", "Kandy, Sri Lanka", "Galle, Sri Lanka", "Jaffna, Sri Lanka",
                 "Negombo, Sri Lanka", "Matara, Sri Lanka", "Kurunegala, Sri Lanka", "Anuradhapura, Sri Lanka",
                 "Batticaloa, Sri Lanka", "Trincomalee, Sri Lanka"]
    
    specialties_pool = [
        ["painting", "traditional"], ["painting", "contemporary"], ["digital", "mixed-media"],
        ["sculpture", "traditional"], ["sculpture", "contemporary"], ["batik", "traditional"],
        ["pottery", "ceramics"], ["watercolor", "landscape"], ["oil", "portrait"], ["acrylic", "abstract"],
        ["woodcarving", "traditional"], ["metalwork", "jewelry"], ["textile", "weaving"],
        ["calligraphy", "traditional"], ["digital", "illustration"]
    ]
    
    avatar_urls = [
        "https://images.unsplash.com/photo-1752649938112-c63668199052?w=400",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400"
    ]
    
    cover_images = [
        "https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?w=400",
        "https://images.unsplash.com/photo-1766801848077-31bd1900efcc?w=400",
        "https://images.pexels.com/photos/12047518/pexels-photo-12047518.jpeg?w=400",
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400",
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400",
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400"
    ]
    
    artists = []
    for i in range(40):
        first_name = first_names[i % len(first_names)]
        last_name = last_names[i % len(last_names)]
        artist = {
            "id": str(uuid.uuid4()),
            "user_id": f"artist-user-{i+1}",
            "name": f"{first_name} {last_name}",
            "bio": f"Talented Sri Lankan artist specializing in {specialties_pool[i % len(specialties_pool)][0]}. Creating unique artworks that blend traditional Ceylon aesthetics with contemporary vision.",
            "avatar_url": avatar_urls[i % len(avatar_urls)],
            "cover_image": cover_images[i % len(cover_images)],
            "location": locations[i % len(locations)],
            "specialties": specialties_pool[i % len(specialties_pool)],
            "social_links": {"instagram": f"@{first_name.lower()}.art"},
            "total_sales": (i * 3) % 50 + 5,
            "rating": round(4.0 + (i % 10) * 0.1, 1),
            "badges": [],
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        artists.append(artist)
    
    return artists


def generate_artworks(artists):
    """Generate 50 artworks (20 regular + 30 auctions)"""
    artwork_images = [
        "https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/2824173/pexels-photo-2824173.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/3094218/pexels-photo-3094218.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/3246665/pexels-photo-3246665.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/3059658/pexels-photo-3059658.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/12047518/pexels-photo-12047518.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/2911544/pexels-photo-2911544.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/1579708/pexels-photo-1579708.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/1568607/pexels-photo-1568607.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    ]
    
    artwork_titles = [
        "Golden Paddy Fields at Dusk", "Temple of the Sacred Tooth", "Sigiriya Lion's Paw",
        "Colombo Skyline", "Ancient Dagoba", "Dancing Apsara", "Guardian of Anuradhapura",
        "Lotus in Moonlight", "Ceylon Tea Gardens", "Fishermen at Dawn", "Kandyan Dancer",
        "Elephant Procession", "Buddhist Meditation", "Tropical Paradise", "Village Life",
        "Monsoon Dreams", "Peacock Glory", "Traditional Masks", "Spice Market", "Ocean Waves",
        "Mountain Mist", "Reclining Buddha", "Festival of Lights", "Batik Dreams", "Pottery Making",
        "Silk Road", "Heritage Walk", "Colonial Architecture", "Modern Colombo", "Ancient Scripts",
        "River Journey", "Forest Spirits", "Moonlit Temple", "Sunrise Meditation", "Coastal Beauty",
        "Rural Harmony", "City Lights", "Cultural Fusion", "Traditional Dance", "Nature's Canvas",
        "Artistic Vision", "Creative Spirit", "Ceylon Heritage", "Island Dreams", "Tropical Colors",
        "Sacred Geometry", "Divine Light", "Eternal Beauty", "Timeless Art", "Ceylon Soul"
    ]
    
    categories = ["painting", "sculpture", "digital", "mixed-media", "photography", "textile"]
    mediums = ["Oil on Canvas", "Acrylic on Canvas", "Watercolor", "Digital Art", "Bronze", "Wood", "Mixed Media", "Ceramic"]
    
    artworks = []
    
    # 20 Regular artworks (for sale)
    for i in range(20):
        artist_idx = i % len(artists)
        artwork = {
            "id": str(uuid.uuid4()),
            "artist_id": artists[artist_idx]["id"],
            "artist_name": artists[artist_idx]["name"],
            "title": artwork_titles[i % len(artwork_titles)],
            "description": f"A stunning piece showcasing the beauty of Sri Lankan art and culture. This {categories[i % len(categories)]} represents the artist's unique vision and mastery of {mediums[i % len(mediums)]}.",
            "category": categories[i % len(categories)],
            "medium": mediums[i % len(mediums)],
            "dimensions": f"{80 + (i * 5)}cm x {60 + (i * 3)}cm",
            "year_created": 2023 + (i % 3),
            "images": [artwork_images[i % len(artwork_images)]],
            "is_digital": i % 5 == 0,
            "is_auction": False,
            "price": round(500 + (i * 150), 2),
            "current_bid": None,
            "reserve_price": None,
            "auction_end_date": None,
            "bid_count": 0,
            "tags": ["ceylon", "traditional", categories[i % len(categories)]],
            "is_available": True,
            "views": 50 + (i * 10),
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        artworks.append(artwork)
    
    # 30 Auction artworks
    for i in range(30):
        artist_idx = (i + 20) % len(artists)
        base_price = 1000 + (i * 200)
        artwork = {
            "id": str(uuid.uuid4()),
            "artist_id": artists[artist_idx]["id"],
            "artist_name": artists[artist_idx]["name"],
            "title": artwork_titles[(i + 20) % len(artwork_titles)],
            "description": f"An exceptional auction piece representing the finest Sri Lankan artistry. This rare {categories[i % len(categories)]} is a unique investment opportunity.",
            "category": categories[i % len(categories)],
            "medium": mediums[i % len(mediums)],
            "dimensions": f"{100 + (i * 5)}cm x {80 + (i * 3)}cm",
            "year_created": 2024,
            "images": [artwork_images[(i + 3) % len(artwork_images)]],
            "is_digital": i % 7 == 0,
            "is_auction": True,
            "price": None,
            "current_bid": round(base_price * 1.1, 2),
            "reserve_price": round(base_price * 0.8, 2),
            "auction_end_date": (datetime.now(timezone.utc) + timedelta(days=3 + (i % 10))).isoformat(),
            "bid_count": i % 5 + 1,
            "tags": ["auction", "ceylon", "investment", categories[i % len(categories)]],
            "is_available": True,
            "views": 100 + (i * 15),
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        artworks.append(artwork)
    
    return artworks


def generate_furniture():
    """Generate furniture items for all regions: Local, Asian, European, American"""
    
    # Authentic furniture images by category (Unsplash/Pexels - Royalty-free)
    
    # Japanese/Asian furniture
    asian_images = [
        "https://images.unsplash.com/photo-1664005575921-d0dfc7ab9f49?w=400",  # Japanese bench
        "https://images.unsplash.com/photo-1760259476944-62cc7103a804?w=400",  # Asian antiques
        "https://images.pexels.com/photos/33472153/pexels-photo-33472153.jpeg?w=400",  # Chinese furniture
        "https://images.pexels.com/photos/13829629/pexels-photo-13829629.jpeg?w=400",  # Chinese cabinet
        "https://images.unsplash.com/photo-1687676626545-4e13739e826e?w=400",  # Chinese rosewood
    ]
    
    # European/French antique furniture
    european_images = [
        "https://images.unsplash.com/photo-1666276523796-90329b78ea4a?w=400",  # French fancy room
        "https://images.unsplash.com/photo-1577892209303-4b1352c6162a?w=400",  # French chair
        "https://images.unsplash.com/photo-1705591937098-dfd5b4ef1dbc?w=400",  # French living room
        "https://images.unsplash.com/photo-1752108037856-47c91b82d7f5?w=400",  # Elegant room
        "https://images.pexels.com/photos/8135247/pexels-photo-8135247.jpeg?w=400",  # White armoire
        "https://images.pexels.com/photos/6830012/pexels-photo-6830012.jpeg?w=400",  # Antique showroom
    ]
    
    # American/Mid-century modern furniture
    american_images = [
        "https://images.unsplash.com/photo-1577176434922-803273eba97a?w=400",  # Mid-century set
        "https://images.unsplash.com/photo-1729603483131-22a1af22b486?w=400",  # Vintage credenza
        "https://images.unsplash.com/photo-1742404450287-60c4cbb838e4?w=400",  # Cozy armchair
        "https://images.unsplash.com/photo-1586580330552-0e0d2938275c?w=400",  # Round table
    ]
    
    # Contemporary/Scandinavian furniture
    contemporary_images = [
        "https://images.unsplash.com/photo-1772442363851-738a548f6c5c?w=400",  # Dining set
        "https://images.unsplash.com/photo-1723748972084-4124765e0a55?w=400",  # Living room fireplace
        "https://images.unsplash.com/photo-1771888703723-01d85da1dae1?w=400",  # Minimalist room
        "https://images.pexels.com/photos/13073982/pexels-photo-13073982.jpeg?w=400",  # Modern living room
        "https://images.pexels.com/photos/5870/purple-white-design-decoration.jpg?w=400",  # Modern sideboard
    ]
    
    # Sleek iron/metal bent contemporary furniture
    iron_metal_images = [
        "https://images.unsplash.com/photo-1639299940869-4addd5e19727?w=400",  # Sleek metal bench
        "https://images.unsplash.com/photo-1537384901770-4dc15e7ae013?w=400",  # Gray metal armchair
        "https://images.unsplash.com/photo-1612022636405-d10f630fe7aa?w=400",  # Stainless steel chair
        "https://images.unsplash.com/photo-1763705860375-b118c271815c?w=400",  # Round metal tables
        "https://images.pexels.com/photos/29248907/pexels-photo-29248907.jpeg?w=400",  # Minimalist metal set
        "https://images.pexels.com/photos/31155441/pexels-photo-31155441.jpeg?w=400",  # Wrought iron patio
        "https://images.pexels.com/photos/21036382/pexels-photo-21036382.jpeg?w=400",  # Vintage iron set
        "https://images.unsplash.com/photo-1729446886782-12732a683a1e?w=400",  # Modern metal table
    ]
    
    # Local Sri Lankan style
    local_images = [
        "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?w=400",
        "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?w=400",
        "https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg?w=400",
        "https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?w=400",
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?w=400",
    ]
    
    furniture_images = local_images + asian_images + european_images + american_images + contemporary_images + iron_metal_images
    
    # Categories and their items
    furniture_data = {
        "local": {
            "antique": [
                {"title": "Colonial Era Almirah", "material": "Teak Wood", "origin": "Sri Lanka", "year": 1920, "price": 2500},
                {"title": "Dutch Period Writing Desk", "material": "Ebony Wood", "origin": "Sri Lanka", "year": 1880, "price": 4500},
                {"title": "Kandyan Traditional Chest", "material": "Jackfruit Wood", "origin": "Sri Lanka", "year": 1910, "price": 1800},
                {"title": "British Colonial Rocking Chair", "material": "Mahogany", "origin": "Sri Lanka", "year": 1935, "price": 950},
                {"title": "Vintage Ceylon Tea Cabinet", "material": "Rosewood", "origin": "Sri Lanka", "year": 1945, "price": 1200},
            ],
            "contemporary": [
                {"title": "Modern Colombo Coffee Table", "material": "Teak & Glass", "origin": "Sri Lanka", "year": 2024, "price": 450},
                {"title": "Minimalist Dining Set", "material": "Rubber Wood", "origin": "Sri Lanka", "year": 2024, "price": 1200},
                {"title": "Urban Living Sofa Set", "material": "Teak & Fabric", "origin": "Sri Lanka", "year": 2024, "price": 2800},
                {"title": "Contemporary Bookshelf", "material": "MDF & Teak", "origin": "Sri Lanka", "year": 2024, "price": 380},
                {"title": "Modern TV Console", "material": "Engineered Wood", "origin": "Sri Lanka", "year": 2024, "price": 520},
            ],
            "handcrafted_unique": [
                {"title": "Hand-Carved Elephant Table", "material": "Teak Wood", "origin": "Sri Lanka", "year": 2023, "price": 1800},
                {"title": "Artisan Peacock Chair", "material": "Cane & Rattan", "origin": "Sri Lanka", "year": 2023, "price": 650},
                {"title": "Traditional Mask Display Cabinet", "material": "Jackfruit Wood", "origin": "Sri Lanka", "year": 2024, "price": 920},
            ],
        },
        "asian": [
            {"title": "Japanese Tansu Chest", "material": "Paulownia Wood", "origin": "Japan", "year": 1960, "price": 3200, "category": "antique"},
            {"title": "Chinese Rosewood Cabinet", "material": "Hongmu Rosewood", "origin": "China", "year": 1890, "price": 8500, "category": "antique"},
            {"title": "Korean Wedding Chest", "material": "Elm Wood & Brass", "origin": "South Korea", "year": 1920, "price": 2800, "category": "antique"},
            {"title": "Thai Temple Altar Table", "material": "Teak with Gold Leaf", "origin": "Thailand", "year": 1950, "price": 4200, "category": "antique"},
            {"title": "Indian Carved Daybed", "material": "Sheesham Wood", "origin": "India", "year": 1940, "price": 3500, "category": "antique"},
            {"title": "Balinese Console Table", "material": "Recycled Teak", "origin": "Indonesia", "year": 2023, "price": 1200, "category": "contemporary"},
            {"title": "Vietnamese Bamboo Shelf", "material": "Bamboo", "origin": "Vietnam", "year": 2024, "price": 450, "category": "contemporary"},
            {"title": "Modern Asian Fusion Dining Table", "material": "Acacia Wood", "origin": "Malaysia", "year": 2024, "price": 1800, "category": "contemporary"},
            {"title": "Zen Garden Meditation Bench", "material": "Cedar Wood", "origin": "Japan", "year": 2024, "price": 680, "category": "handcrafted_unique"},
            {"title": "Dragon Carved Room Divider", "material": "Camphor Wood", "origin": "China", "year": 2023, "price": 2400, "category": "handcrafted_unique"},
        ],
        "european": [
            {"title": "French Louis XV Armoire", "material": "Oak Wood", "origin": "France", "year": 1880, "price": 12000, "category": "antique"},
            {"title": "Victorian Mahogany Sideboard", "material": "Mahogany", "origin": "United Kingdom", "year": 1870, "price": 5500, "category": "antique"},
            {"title": "Italian Renaissance Cabinet", "material": "Walnut", "origin": "Italy", "year": 1920, "price": 7800, "category": "antique"},
            {"title": "German Biedermeier Secretary Desk", "material": "Cherry Wood", "origin": "Germany", "year": 1840, "price": 9200, "category": "antique"},
            {"title": "Dutch Colonial Chest of Drawers", "material": "Oak & Ebony", "origin": "Netherlands", "year": 1890, "price": 4800, "category": "antique"},
            {"title": "Scandinavian Modern Bookcase", "material": "White Oak", "origin": "Denmark", "year": 2024, "price": 2200, "category": "contemporary"},
            {"title": "Italian Leather Sofa Set", "material": "Leather & Chrome", "origin": "Italy", "year": 2024, "price": 5500, "category": "contemporary"},
            {"title": "Swedish Minimalist Dining Table", "material": "Ash Wood", "origin": "Sweden", "year": 2024, "price": 1800, "category": "contemporary"},
            {"title": "Spanish Wrought Iron Console", "material": "Iron & Marble", "origin": "Spain", "year": 2023, "price": 1400, "category": "handcrafted_unique"},
            {"title": "Portuguese Azulejo Tile Table", "material": "Ceramic & Wood", "origin": "Portugal", "year": 2024, "price": 980, "category": "handcrafted_unique"},
        ],
        "american": [
            {"title": "American Colonial Highboy", "material": "Cherry Wood", "origin": "USA", "year": 1920, "price": 6500, "category": "antique"},
            {"title": "Shaker Style Rocking Chair", "material": "Maple Wood", "origin": "USA", "year": 1890, "price": 2200, "category": "antique"},
            {"title": "Mission Style Oak Bookcase", "material": "Quarter-sawn Oak", "origin": "USA", "year": 1910, "price": 3800, "category": "antique"},
            {"title": "Art Deco Vanity Dresser", "material": "Walnut & Mirror", "origin": "USA", "year": 1935, "price": 2800, "category": "antique"},
            {"title": "Mid-Century Modern Credenza", "material": "Teak Veneer", "origin": "USA", "year": 1960, "price": 4200, "category": "antique"},
            {"title": "California Modern Platform Bed", "material": "Walnut", "origin": "USA", "year": 2024, "price": 2400, "category": "contemporary"},
            {"title": "Brooklyn Industrial Coffee Table", "material": "Reclaimed Wood & Steel", "origin": "USA", "year": 2024, "price": 850, "category": "contemporary"},
            {"title": "Austin Live Edge Dining Table", "material": "Black Walnut", "origin": "USA", "year": 2024, "price": 3200, "category": "contemporary"},
            {"title": "Mexican Carved Bench", "material": "Mesquite Wood", "origin": "Mexico", "year": 2023, "price": 1100, "category": "handcrafted_unique"},
            {"title": "Canadian Rustic Log Cabinet", "material": "Pine Wood", "origin": "Canada", "year": 2024, "price": 1600, "category": "handcrafted_unique"},
        ]
    }
    
    furniture_types = {
        "Teak Wood": "wooden", "Ebony Wood": "wooden", "Jackfruit Wood": "wooden", "Mahogany": "wooden",
        "Rosewood": "wooden", "Teak & Glass": "wooden", "Rubber Wood": "wooden", "MDF & Teak": "wooden",
        "Engineered Wood": "wooden", "Paulownia Wood": "wooden", "Hongmu Rosewood": "wooden",
        "Elm Wood & Brass": "brass_metal", "Sheesham Wood": "wooden", "Recycled Teak": "wooden",
        "Bamboo": "cane_rattan", "Acacia Wood": "wooden", "Cedar Wood": "wooden", "Camphor Wood": "wooden",
        "Oak Wood": "wooden", "Walnut": "wooden", "Cherry Wood": "wooden", "Oak & Ebony": "wooden",
        "White Oak": "wooden", "Leather & Chrome": "wooden", "Ash Wood": "wooden",
        "Iron & Marble": "brass_metal", "Ceramic & Wood": "carved_decorative", "Maple Wood": "wooden",
        "Quarter-sawn Oak": "wooden", "Walnut & Mirror": "wooden", "Teak Veneer": "wooden",
        "Reclaimed Wood & Steel": "brass_metal", "Black Walnut": "wooden", "Mesquite Wood": "carved_decorative",
        "Pine Wood": "wooden", "Cane & Rattan": "cane_rattan", "Teak & Fabric": "wooden",
        "Teak with Gold Leaf": "carved_decorative"
    }
    
    conditions = ["excellent", "excellent", "excellent", "good", "good", "fair"]
    
    furniture_items = []
    item_index = 0
    
    # Process local furniture
    for category, items in furniture_data["local"].items():
        for item in items:
            furniture_item = {
                "id": str(uuid.uuid4()),
                "title": item["title"],
                "description": f"Exquisite {category.replace('_', ' ')} piece from Sri Lanka. {item['title']} crafted from {item['material']}. Perfect for local homes seeking authentic Sri Lankan craftsmanship.",
                "category": category,
                "furniture_type": furniture_types.get(item["material"], "wooden"),
                "region": "local",
                "origin": item["origin"],
                "material": item["material"],
                "dimensions": f"{120 + (item_index * 5)}cm x {60 + (item_index * 3)}cm x {80 + (item_index * 2)}cm",
                "weight": f"{25 + (item_index * 2)} kg",
                "year_made": item["year"],
                "condition": conditions[item_index % len(conditions)],
                "price": item["price"],
                "is_negotiable": item["price"] > 1000,
                "images": [furniture_images[item_index % len(furniture_images)]],
                "tags": ["sri-lanka", "local", category, item["material"].lower().split()[0]],
                "is_available": True,
                "is_featured": item_index < 5,
                "views": 50 + (item_index * 15),
                "created_at": datetime.now(timezone.utc).isoformat(),
                "updated_at": None
            }
            furniture_items.append(furniture_item)
            item_index += 1
    
    # Process export regions
    for region in ["asian", "european", "american"]:
        for item in furniture_data[region]:
            furniture_item = {
                "id": str(uuid.uuid4()),
                "title": item["title"],
                "description": f"Premium export-quality {item['category'].replace('_', ' ')} furniture from {item['origin']}. This {item['title']} is crafted from finest {item['material']}. Ideal for {region.title()} markets with international shipping available.",
                "category": item["category"],
                "furniture_type": furniture_types.get(item["material"], "wooden"),
                "region": region,
                "origin": item["origin"],
                "material": item["material"],
                "dimensions": f"{130 + (item_index * 4)}cm x {65 + (item_index * 2)}cm x {85 + (item_index * 3)}cm",
                "weight": f"{30 + (item_index * 3)} kg",
                "year_made": item["year"],
                "condition": conditions[item_index % len(conditions)],
                "price": item["price"],
                "is_negotiable": item["price"] > 2000,
                "images": [furniture_images[item_index % len(furniture_images)]],
                "tags": [region, "export", item["category"], item["origin"].lower().replace(" ", "-")],
                "is_available": True,
                "is_featured": item_index % 5 == 0,
                "views": 80 + (item_index * 12),
                "created_at": datetime.now(timezone.utc).isoformat(),
                "updated_at": None
            }
            furniture_items.append(furniture_item)
            item_index += 1
    
    return furniture_items