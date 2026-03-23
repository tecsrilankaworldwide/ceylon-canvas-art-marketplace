"""
Backend API Tests for Ceylon Canvas Art Marketplace
Testing Admin Dashboard and Gallery Filtering Features
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://ceylon-canvas-2.preview.emergentagent.com')

# Admin credentials
ADMIN_EMAIL = "admin@ceyloncanvas.com"
ADMIN_PASSWORD = "admin123"


class TestAdminAuthentication:
    """Test admin login and authentication"""
    
    def test_admin_login_success(self):
        """Test admin can login successfully"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        assert response.status_code == 200
        data = response.json()
        assert "token" in data
        assert "user" in data
        assert data["user"]["is_admin"] == True
        assert data["user"]["email"] == ADMIN_EMAIL
        print(f"✓ Admin login successful: {data['user']['name']}")
    
    def test_admin_login_invalid_credentials(self):
        """Test admin login with wrong password"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": "wrongpassword"
        })
        assert response.status_code == 401
        print("✓ Invalid credentials rejected correctly")


@pytest.fixture(scope="module")
def admin_token():
    """Get admin authentication token"""
    response = requests.post(f"{BASE_URL}/api/auth/login", json={
        "email": ADMIN_EMAIL,
        "password": ADMIN_PASSWORD
    })
    if response.status_code == 200:
        return response.json()["token"]
    pytest.skip("Admin authentication failed")


class TestAdminStats:
    """Test Admin Dashboard Overview Stats"""
    
    def test_get_admin_stats(self, admin_token):
        """Test getting platform statistics"""
        response = requests.get(f"{BASE_URL}/api/admin/stats", headers={
            "Authorization": f"Bearer {admin_token}"
        })
        assert response.status_code == 200
        data = response.json()
        
        # Verify all required fields exist
        assert "total_users" in data
        assert "total_artists" in data
        assert "total_artworks" in data
        assert "total_orders" in data
        assert "total_revenue" in data
        assert "platform_fees" in data
        assert "pending_verifications" in data
        assert "flagged_artworks" in data
        
        # Verify data types
        assert isinstance(data["total_users"], int)
        assert isinstance(data["total_artworks"], int)
        assert isinstance(data["total_revenue"], (int, float))
        
        print(f"✓ Admin stats: {data['total_users']} users, {data['total_artworks']} artworks, ${data['total_revenue']} revenue")
    
    def test_admin_stats_requires_auth(self):
        """Test that admin stats requires authentication"""
        response = requests.get(f"{BASE_URL}/api/admin/stats")
        assert response.status_code == 401
        print("✓ Admin stats correctly requires authentication")


class TestAdminUsers:
    """Test Admin Users Management"""
    
    def test_get_admin_users(self, admin_token):
        """Test getting all users"""
        response = requests.get(f"{BASE_URL}/api/admin/users", headers={
            "Authorization": f"Bearer {admin_token}"
        })
        assert response.status_code == 200
        data = response.json()
        
        assert "users" in data
        assert "total" in data
        assert isinstance(data["users"], list)
        
        if len(data["users"]) > 0:
            user = data["users"][0]
            assert "id" in user
            assert "email" in user
            assert "name" in user
            assert "created_at" in user
        
        print(f"✓ Retrieved {len(data['users'])} users (total: {data['total']})")
    
    def test_search_users(self, admin_token):
        """Test searching users by name/email"""
        response = requests.get(f"{BASE_URL}/api/admin/users", params={
            "search": "admin"
        }, headers={
            "Authorization": f"Bearer {admin_token}"
        })
        assert response.status_code == 200
        data = response.json()
        assert "users" in data
        print(f"✓ User search returned {len(data['users'])} results")
    
    def test_filter_users_by_role_artist(self, admin_token):
        """Test filtering users by artist role"""
        response = requests.get(f"{BASE_URL}/api/admin/users", params={
            "role": "artist"
        }, headers={
            "Authorization": f"Bearer {admin_token}"
        })
        assert response.status_code == 200
        data = response.json()
        
        # All returned users should be artists
        for user in data["users"]:
            assert user.get("is_artist") == True
        
        print(f"✓ Artist filter returned {len(data['users'])} artists")
    
    def test_filter_users_by_role_admin(self, admin_token):
        """Test filtering users by admin role"""
        response = requests.get(f"{BASE_URL}/api/admin/users", params={
            "role": "admin"
        }, headers={
            "Authorization": f"Bearer {admin_token}"
        })
        assert response.status_code == 200
        data = response.json()
        
        # All returned users should be admins
        for user in data["users"]:
            assert user.get("is_admin") == True
        
        print(f"✓ Admin filter returned {len(data['users'])} admins")


class TestAdminArtworks:
    """Test Admin Artworks Management"""
    
    def test_get_admin_artworks(self, admin_token):
        """Test getting all artworks for admin"""
        response = requests.get(f"{BASE_URL}/api/admin/artworks", headers={
            "Authorization": f"Bearer {admin_token}"
        })
        assert response.status_code == 200
        data = response.json()
        
        assert "artworks" in data
        assert "total" in data
        
        if len(data["artworks"]) > 0:
            artwork = data["artworks"][0]
            assert "id" in artwork
            assert "title" in artwork
            assert "artist_name" in artwork
            assert "price" in artwork
        
        print(f"✓ Retrieved {len(data['artworks'])} artworks (total: {data['total']})")
    
    def test_search_artworks(self, admin_token):
        """Test searching artworks"""
        response = requests.get(f"{BASE_URL}/api/admin/artworks", params={
            "search": "Temple"
        }, headers={
            "Authorization": f"Bearer {admin_token}"
        })
        assert response.status_code == 200
        data = response.json()
        print(f"✓ Artwork search returned {len(data['artworks'])} results")
    
    def test_filter_artworks_by_status(self, admin_token):
        """Test filtering artworks by availability status"""
        response = requests.get(f"{BASE_URL}/api/admin/artworks", params={
            "status": "available"
        }, headers={
            "Authorization": f"Bearer {admin_token}"
        })
        assert response.status_code == 200
        data = response.json()
        print(f"✓ Available artworks filter returned {len(data['artworks'])} results")


class TestAdminArtists:
    """Test Admin Artists Management"""
    
    def test_get_admin_artists(self, admin_token):
        """Test getting all artists for admin"""
        response = requests.get(f"{BASE_URL}/api/admin/artists", headers={
            "Authorization": f"Bearer {admin_token}"
        })
        assert response.status_code == 200
        data = response.json()
        
        assert "artists" in data
        assert "total" in data
        
        if len(data["artists"]) > 0:
            artist = data["artists"][0]
            assert "id" in artist
            assert "name" in artist
            assert "verification_status" in artist
        
        print(f"✓ Retrieved {len(data['artists'])} artists (total: {data['total']})")
    
    def test_filter_artists_by_verification(self, admin_token):
        """Test filtering artists by verification status"""
        response = requests.get(f"{BASE_URL}/api/admin/artists", params={
            "verification_status": "pending"
        }, headers={
            "Authorization": f"Bearer {admin_token}"
        })
        assert response.status_code == 200
        data = response.json()
        
        for artist in data["artists"]:
            assert artist.get("verification_status") == "pending"
        
        print(f"✓ Pending verification filter returned {len(data['artists'])} artists")


class TestAdminOrders:
    """Test Admin Orders View"""
    
    def test_get_admin_orders(self, admin_token):
        """Test getting all orders for admin"""
        response = requests.get(f"{BASE_URL}/api/admin/orders", headers={
            "Authorization": f"Bearer {admin_token}"
        })
        assert response.status_code == 200
        data = response.json()
        
        assert "orders" in data
        assert "total" in data
        
        print(f"✓ Retrieved {len(data['orders'])} orders (total: {data['total']})")


class TestRevenueChart:
    """Test Admin Revenue Chart"""
    
    def test_get_revenue_chart(self, admin_token):
        """Test getting revenue chart data"""
        response = requests.get(f"{BASE_URL}/api/admin/revenue-chart", params={
            "days": 30
        }, headers={
            "Authorization": f"Bearer {admin_token}"
        })
        assert response.status_code == 200
        data = response.json()
        
        assert "data" in data
        assert isinstance(data["data"], list)
        
        if len(data["data"]) > 0:
            day_data = data["data"][0]
            assert "date" in day_data
            assert "revenue" in day_data
            assert "orders" in day_data
        
        print(f"✓ Revenue chart returned {len(data['data'])} days of data")


class TestGalleryFiltering:
    """Test Gallery Page Filtering APIs"""
    
    def test_get_categories(self):
        """Test getting artwork categories"""
        response = requests.get(f"{BASE_URL}/api/categories")
        assert response.status_code == 200
        data = response.json()
        
        assert "categories" in data
        assert len(data["categories"]) > 0
        
        # Verify category structure
        cat = data["categories"][0]
        assert "id" in cat
        assert "name" in cat
        
        print(f"✓ Retrieved {len(data['categories'])} categories")
    
    def test_get_mediums(self):
        """Test getting artwork mediums"""
        response = requests.get(f"{BASE_URL}/api/mediums")
        assert response.status_code == 200
        data = response.json()
        
        assert "mediums" in data
        assert len(data["mediums"]) > 0
        
        # Verify medium structure
        med = data["mediums"][0]
        assert "id" in med
        assert "name" in med
        
        print(f"✓ Retrieved {len(data['mediums'])} mediums")
    
    def test_get_artists_for_filter(self):
        """Test getting artists for filter dropdown"""
        response = requests.get(f"{BASE_URL}/api/artists", params={"limit": 50})
        assert response.status_code == 200
        data = response.json()
        
        assert isinstance(data, list)
        if len(data) > 0:
            artist = data[0]
            assert "id" in artist
            assert "name" in artist
        
        print(f"✓ Retrieved {len(data)} artists for filter")
    
    def test_filter_by_category(self):
        """Test filtering artworks by category"""
        response = requests.get(f"{BASE_URL}/api/artworks", params={
            "category": "painting"
        })
        assert response.status_code == 200
        data = response.json()
        
        for artwork in data:
            assert artwork["category"] == "painting"
        
        print(f"✓ Category filter returned {len(data)} paintings")
    
    def test_filter_by_medium(self):
        """Test filtering artworks by medium"""
        response = requests.get(f"{BASE_URL}/api/artworks", params={
            "medium": "oil"
        })
        assert response.status_code == 200
        data = response.json()
        print(f"✓ Medium filter returned {len(data)} artworks")
    
    def test_filter_by_artist(self):
        """Test filtering artworks by artist"""
        # First get an artist ID
        artists_response = requests.get(f"{BASE_URL}/api/artists", params={"limit": 1})
        artists = artists_response.json()
        
        if len(artists) > 0:
            artist_id = artists[0]["id"]
            response = requests.get(f"{BASE_URL}/api/artworks", params={
                "artist_id": artist_id
            })
            assert response.status_code == 200
            data = response.json()
            
            for artwork in data:
                assert artwork["artist_id"] == artist_id
            
            print(f"✓ Artist filter returned {len(data)} artworks")
        else:
            pytest.skip("No artists available for testing")
    
    def test_filter_by_auction(self):
        """Test filtering auction artworks"""
        response = requests.get(f"{BASE_URL}/api/artworks", params={
            "is_auction": True
        })
        assert response.status_code == 200
        data = response.json()
        
        for artwork in data:
            assert artwork["is_auction"] == True
        
        print(f"✓ Auction filter returned {len(data)} auction artworks")
    
    def test_filter_by_digital(self):
        """Test filtering digital artworks"""
        response = requests.get(f"{BASE_URL}/api/artworks", params={
            "is_digital": True
        })
        assert response.status_code == 200
        data = response.json()
        
        for artwork in data:
            assert artwork["is_digital"] == True
        
        print(f"✓ Digital filter returned {len(data)} digital artworks")
    
    def test_filter_by_price_range(self):
        """Test filtering artworks by price range"""
        response = requests.get(f"{BASE_URL}/api/artworks", params={
            "min_price": 500,
            "max_price": 5000
        })
        assert response.status_code == 200
        data = response.json()
        
        for artwork in data:
            assert artwork["price"] >= 500
            assert artwork["price"] <= 5000
        
        print(f"✓ Price range filter returned {len(data)} artworks")
    
    def test_search_artworks(self):
        """Test searching artworks"""
        response = requests.get(f"{BASE_URL}/api/artworks", params={
            "search": "Temple"
        })
        assert response.status_code == 200
        data = response.json()
        print(f"✓ Search returned {len(data)} artworks")
    
    def test_sort_by_price_asc(self):
        """Test sorting artworks by price ascending"""
        response = requests.get(f"{BASE_URL}/api/artworks", params={
            "sort_by": "price",
            "sort_order": "asc"
        })
        assert response.status_code == 200
        data = response.json()
        
        if len(data) > 1:
            for i in range(len(data) - 1):
                assert data[i]["price"] <= data[i + 1]["price"]
        
        print(f"✓ Price ascending sort working correctly")
    
    def test_sort_by_price_desc(self):
        """Test sorting artworks by price descending"""
        response = requests.get(f"{BASE_URL}/api/artworks", params={
            "sort_by": "price",
            "sort_order": "desc"
        })
        assert response.status_code == 200
        data = response.json()
        
        if len(data) > 1:
            for i in range(len(data) - 1):
                assert data[i]["price"] >= data[i + 1]["price"]
        
        print(f"✓ Price descending sort working correctly")
    
    def test_sort_by_newest(self):
        """Test sorting artworks by newest first"""
        response = requests.get(f"{BASE_URL}/api/artworks", params={
            "sort_by": "created_at",
            "sort_order": "desc"
        })
        assert response.status_code == 200
        data = response.json()
        print(f"✓ Newest first sort returned {len(data)} artworks")
    
    def test_sort_by_popularity(self):
        """Test sorting artworks by popularity (views)"""
        response = requests.get(f"{BASE_URL}/api/artworks", params={
            "sort_by": "views",
            "sort_order": "desc"
        })
        assert response.status_code == 200
        data = response.json()
        
        if len(data) > 1:
            for i in range(len(data) - 1):
                assert data[i]["views"] >= data[i + 1]["views"]
        
        print(f"✓ Popularity sort working correctly")
    
    def test_combined_filters(self):
        """Test combining multiple filters"""
        response = requests.get(f"{BASE_URL}/api/artworks", params={
            "category": "digital",
            "is_digital": True,
            "sort_by": "price",
            "sort_order": "asc"
        })
        assert response.status_code == 200
        data = response.json()
        
        for artwork in data:
            assert artwork["category"] == "digital"
            assert artwork["is_digital"] == True
        
        print(f"✓ Combined filters returned {len(data)} artworks")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
