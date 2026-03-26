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
        "https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?w=800",
        "https://images.unsplash.com/photo-1766801848077-31bd1900efcc?w=800",
        "https://images.pexels.com/photos/12047518/pexels-photo-12047518.jpeg?w=800",
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800",
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800",
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800"
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
