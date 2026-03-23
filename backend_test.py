import requests
import sys
import json
from datetime import datetime

class CeylonCanvasAPITester:
    def __init__(self, base_url="https://ceylon-canvas-2.preview.emergentagent.com"):
        self.base_url = base_url
        self.token = None
        self.user_id = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details
        })

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/api/{endpoint}"
        test_headers = {'Content-Type': 'application/json'}
        
        if self.token:
            test_headers['Authorization'] = f'Bearer {self.token}'
        
        if headers:
            test_headers.update(headers)

        try:
            if method == 'GET':
                response = requests.get(url, headers=test_headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=test_headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=test_headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=test_headers, timeout=10)

            success = response.status_code == expected_status
            details = f"Status: {response.status_code}"
            
            if not success:
                details += f" (Expected: {expected_status})"
                try:
                    error_data = response.json()
                    details += f" - {error_data.get('detail', 'Unknown error')}"
                except:
                    details += f" - {response.text[:100]}"

            self.log_test(name, success, details)
            
            if success:
                try:
                    return response.json()
                except:
                    return {}
            return None

        except Exception as e:
            self.log_test(name, False, f"Exception: {str(e)}")
            return None

    def test_seed_data(self):
        """Test seeding sample data"""
        print("\n🌱 Testing Data Seeding...")
        result = self.run_test("Seed Data", "POST", "seed", 200)
        return result is not None

    def test_stats_endpoint(self):
        """Test stats endpoint"""
        print("\n📊 Testing Stats Endpoint...")
        result = self.run_test("Get Stats", "GET", "stats", 200)
        if result:
            required_keys = ['artists', 'artworks', 'sold']
            for key in required_keys:
                if key not in result:
                    self.log_test(f"Stats - {key} field", False, f"Missing {key} field")
                    return False
                else:
                    self.log_test(f"Stats - {key} field", True, f"Value: {result[key]}")
        return result is not None

    def test_categories_endpoint(self):
        """Test categories endpoint"""
        print("\n📂 Testing Categories Endpoint...")
        result = self.run_test("Get Categories", "GET", "categories", 200)
        if result and 'categories' in result:
            categories = result['categories']
            self.log_test("Categories Count", len(categories) > 0, f"Found {len(categories)} categories")
            if categories:
                first_cat = categories[0]
                required_fields = ['id', 'name', 'description']
                for field in required_fields:
                    if field in first_cat:
                        self.log_test(f"Category {field} field", True)
                    else:
                        self.log_test(f"Category {field} field", False, f"Missing {field}")
        return result is not None

    def test_user_registration(self):
        """Test user registration"""
        print("\n👤 Testing User Registration...")
        timestamp = datetime.now().strftime("%H%M%S")
        user_data = {
            "email": f"test_user_{timestamp}@example.com",
            "password": "TestPass123!",
            "name": f"Test User {timestamp}",
            "is_artist": False
        }
        
        result = self.run_test("User Registration", "POST", "auth/register", 200, user_data)
        if result and 'token' in result and 'user' in result:
            self.token = result['token']
            self.user_id = result['user']['id']
            self.log_test("Registration Token", True, "Token received")
            self.log_test("Registration User Data", True, f"User ID: {self.user_id}")
            return True
        return False

    def test_user_login(self):
        """Test user login with existing credentials"""
        print("\n🔐 Testing User Login...")
        if not self.token:
            # Try to register first
            if not self.test_user_registration():
                return False
        
        # Test getting current user info
        result = self.run_test("Get Current User", "GET", "auth/me", 200)
        return result is not None

    def test_artworks_endpoints(self):
        """Test artworks endpoints"""
        print("\n🎨 Testing Artworks Endpoints...")
        
        # Get all artworks
        artworks = self.run_test("Get All Artworks", "GET", "artworks", 200)
        if not artworks:
            return False
            
        self.log_test("Artworks Count", len(artworks) > 0, f"Found {len(artworks)} artworks")
        
        # Test featured artworks
        featured = self.run_test("Get Featured Artworks", "GET", "artworks/featured", 200)
        if featured:
            self.log_test("Featured Artworks", len(featured) > 0, f"Found {len(featured)} featured")
        
        # Test auctions
        auctions = self.run_test("Get Active Auctions", "GET", "artworks/auctions", 200)
        if auctions:
            self.log_test("Active Auctions", True, f"Found {len(auctions)} auctions")
        
        # Test individual artwork if available
        if artworks and len(artworks) > 0:
            artwork_id = artworks[0]['id']
            artwork = self.run_test("Get Single Artwork", "GET", f"artworks/{artwork_id}", 200)
            if artwork:
                required_fields = ['id', 'title', 'artist_name', 'price', 'description']
                for field in required_fields:
                    if field in artwork:
                        self.log_test(f"Artwork {field} field", True)
                    else:
                        self.log_test(f"Artwork {field} field", False, f"Missing {field}")
        
        return True

    def test_artists_endpoints(self):
        """Test artists endpoints"""
        print("\n👨‍🎨 Testing Artists Endpoints...")
        
        # Get all artists
        artists = self.run_test("Get All Artists", "GET", "artists", 200)
        if not artists:
            return False
            
        self.log_test("Artists Count", len(artists) > 0, f"Found {len(artists)} artists")
        
        # Test individual artist if available
        if artists and len(artists) > 0:
            artist_id = artists[0]['id']
            artist = self.run_test("Get Single Artist", "GET", f"artists/{artist_id}", 200)
            if artist:
                required_fields = ['id', 'name', 'user_id']
                for field in required_fields:
                    if field in artist:
                        self.log_test(f"Artist {field} field", True)
                    else:
                        self.log_test(f"Artist {field} field", False, f"Missing {field}")
            
            # Test artist artworks
            artist_artworks = self.run_test("Get Artist Artworks", "GET", f"artists/{artist_id}/artworks", 200)
            if artist_artworks is not None:
                self.log_test("Artist Artworks", True, f"Found {len(artist_artworks)} artworks")
        
        return True

    def test_cart_functionality(self):
        """Test cart functionality"""
        print("\n🛒 Testing Cart Functionality...")
        
        if not self.token:
            self.log_test("Cart Test - Authentication", False, "No auth token")
            return False
        
        # Get empty cart
        cart = self.run_test("Get Empty Cart", "GET", "cart", 200)
        if cart and 'items' in cart:
            self.log_test("Empty Cart Structure", True, f"Items: {len(cart['items'])}")
        
        # Get artworks to add to cart
        artworks = self.run_test("Get Artworks for Cart", "GET", "artworks?is_auction=false&limit=1", 200)
        if artworks and len(artworks) > 0:
            artwork_id = artworks[0]['id']
            
            # Add to cart
            add_result = self.run_test("Add to Cart", "POST", "cart/add", 200, {
                "artwork_id": artwork_id,
                "quantity": 1
            })
            
            if add_result:
                self.log_test("Cart Add Success", True, "Item added to cart")
                
                # Get cart with items
                cart_with_items = self.run_test("Get Cart with Items", "GET", "cart", 200)
                if cart_with_items and len(cart_with_items.get('items', [])) > 0:
                    self.log_test("Cart Has Items", True, f"Items: {len(cart_with_items['items'])}")
                
                # Remove from cart
                remove_result = self.run_test("Remove from Cart", "DELETE", f"cart/{artwork_id}", 200)
                if remove_result:
                    self.log_test("Cart Remove Success", True, "Item removed from cart")
        
        return True

    def test_wishlist_functionality(self):
        """Test wishlist functionality"""
        print("\n❤️ Testing Wishlist Functionality...")
        
        if not self.token:
            self.log_test("Wishlist Test - Authentication", False, "No auth token")
            return False
        
        # Get empty wishlist
        wishlist = self.run_test("Get Empty Wishlist", "GET", "wishlist", 200)
        if wishlist and 'items' in wishlist:
            self.log_test("Empty Wishlist Structure", True, f"Items: {len(wishlist['items'])}")
        
        # Get artworks to add to wishlist
        artworks = self.run_test("Get Artworks for Wishlist", "GET", "artworks?limit=1", 200)
        if artworks and len(artworks) > 0:
            artwork_id = artworks[0]['id']
            
            # Add to wishlist
            add_result = self.run_test("Add to Wishlist", "POST", f"wishlist/{artwork_id}", 200)
            if add_result:
                self.log_test("Wishlist Add Success", True, "Item added to wishlist")
                
                # Remove from wishlist
                remove_result = self.run_test("Remove from Wishlist", "DELETE", f"wishlist/{artwork_id}", 200)
                if remove_result:
                    self.log_test("Wishlist Remove Success", True, "Item removed from wishlist")
        
        return True

    def test_bidding_functionality(self):
        """Test bidding functionality"""
        print("\n🔨 Testing Bidding Functionality...")
        
        if not self.token:
            self.log_test("Bidding Test - Authentication", False, "No auth token")
            return False
        
        # Get auction artworks
        auctions = self.run_test("Get Auctions for Bidding", "GET", "artworks/auctions?limit=1", 200)
        if auctions and len(auctions) > 0:
            artwork_id = auctions[0]['id']
            current_bid = auctions[0].get('current_bid', auctions[0]['price'])
            
            # Get artwork bids
            bids = self.run_test("Get Artwork Bids", "GET", f"artworks/{artwork_id}/bids", 200)
            if bids is not None:
                self.log_test("Get Bids Success", True, f"Found {len(bids)} bids")
            
            # Try to place a bid (this might fail due to business rules, but endpoint should respond)
            bid_amount = current_bid + 100
            bid_result = self.run_test("Place Bid", "POST", "bids", 200, {
                "artwork_id": artwork_id,
                "amount": bid_amount
            })
            
            # Get user's bids
            my_bids = self.run_test("Get My Bids", "GET", "bids/me", 200)
            if my_bids is not None:
                self.log_test("Get My Bids Success", True, f"Found {len(my_bids)} bids")
        
        return True

    def test_commission_functionality(self):
        """Test commission functionality"""
        print("\n💼 Testing Commission Functionality...")
        
        if not self.token:
            self.log_test("Commission Test - Authentication", False, "No auth token")
            return False
        
        # Get artists for commission
        artists = self.run_test("Get Artists for Commission", "GET", "artists?limit=1", 200)
        if artists and len(artists) > 0:
            artist_id = artists[0]['id']
            
            # Create commission request
            commission_data = {
                "artist_id": artist_id,
                "title": "Test Commission",
                "description": "Test commission description",
                "budget_min": 500,
                "budget_max": 1000,
                "deadline": "2024-12-31"
            }
            
            commission_result = self.run_test("Create Commission", "POST", "commissions", 200, commission_data)
            if commission_result:
                self.log_test("Commission Creation Success", True, "Commission request created")
        
        # Get user's commissions
        my_commissions = self.run_test("Get My Commissions", "GET", "commissions/me", 200)
        if my_commissions is not None:
            self.log_test("Get My Commissions Success", True, f"Found {len(my_commissions)} commissions")
        
        return True

    def test_orders_functionality(self):
        """Test orders functionality"""
        print("\n📦 Testing Orders Functionality...")
        
        if not self.token:
            self.log_test("Orders Test - Authentication", False, "No auth token")
            return False
        
        # Get user's orders
        orders = self.run_test("Get My Orders", "GET", "orders", 200)
        if orders is not None:
            self.log_test("Get Orders Success", True, f"Found {len(orders)} orders")
        
        return True

    def run_all_tests(self):
        """Run all tests"""
        print("🚀 Starting Ceylon Canvas Art Marketplace API Tests")
        print("=" * 60)
        
        # Test basic endpoints first
        self.test_seed_data()
        self.test_stats_endpoint()
        self.test_categories_endpoint()
        
        # Test artworks and artists (public endpoints)
        self.test_artworks_endpoints()
        self.test_artists_endpoints()
        
        # Test authentication
        self.test_user_registration()
        self.test_user_login()
        
        # Test protected endpoints
        self.test_cart_functionality()
        self.test_wishlist_functionality()
        self.test_bidding_functionality()
        self.test_commission_functionality()
        self.test_orders_functionality()
        
        # Print summary
        print("\n" + "=" * 60)
        print(f"📊 Test Summary: {self.tests_passed}/{self.tests_run} tests passed")
        success_rate = (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0
        print(f"✨ Success Rate: {success_rate:.1f}%")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return 0
        else:
            print("⚠️  Some tests failed. Check the details above.")
            return 1

def main():
    tester = CeylonCanvasAPITester()
    return tester.run_all_tests()

if __name__ == "__main__":
    sys.exit(main())