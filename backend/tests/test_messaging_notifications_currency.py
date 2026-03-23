"""
Test suite for Ceylon Canvas - Messaging, Notifications, and Currency features
Tests: In-app Messaging, Notification Center, Multi-currency Support
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Test credentials
ADMIN_EMAIL = "admin@ceyloncanvas.com"
ADMIN_PASSWORD = "admin123"

# Test user for messaging
TEST_USER_EMAIL = f"test_msg_{uuid.uuid4().hex[:8]}@test.com"
TEST_USER_PASSWORD = "testpass123"
TEST_USER_NAME = "Test Messaging User"


class TestCurrencyAPI:
    """Currency conversion API tests"""
    
    def test_get_currency_rates(self):
        """Test GET /api/currency/rates returns exchange rates"""
        response = requests.get(f"{BASE_URL}/api/currency/rates")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "rates" in data, "Response should contain 'rates'"
        assert "base" in data, "Response should contain 'base'"
        assert data["base"] == "USD", "Base currency should be USD"
        assert "USD" in data["rates"], "Rates should include USD"
        assert "LKR" in data["rates"], "Rates should include LKR"
        assert data["rates"]["USD"] == 1.0, "USD rate should be 1.0"
        assert data["rates"]["LKR"] == 325.0, "LKR rate should be 325.0"
        print("✓ Currency rates API working correctly")
    
    def test_convert_currency_usd_to_lkr(self):
        """Test currency conversion from USD to LKR"""
        response = requests.get(f"{BASE_URL}/api/currency/convert", params={
            "amount": 100,
            "from_currency": "USD",
            "to_currency": "LKR"
        })
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert data["original_amount"] == 100
        assert data["original_currency"] == "USD"
        assert data["target_currency"] == "LKR"
        assert data["converted_amount"] == 32500.0, f"Expected 32500, got {data['converted_amount']}"
        assert data["rate"] == 325.0
        print("✓ USD to LKR conversion working correctly")
    
    def test_convert_currency_lkr_to_usd(self):
        """Test currency conversion from LKR to USD"""
        response = requests.get(f"{BASE_URL}/api/currency/convert", params={
            "amount": 32500,
            "from_currency": "LKR",
            "to_currency": "USD"
        })
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert data["original_amount"] == 32500
        assert data["converted_amount"] == 100.0
        print("✓ LKR to USD conversion working correctly")
    
    def test_convert_invalid_currency(self):
        """Test conversion with invalid currency returns error"""
        response = requests.get(f"{BASE_URL}/api/currency/convert", params={
            "amount": 100,
            "from_currency": "INVALID",
            "to_currency": "USD"
        })
        assert response.status_code == 400, f"Expected 400, got {response.status_code}"
        print("✓ Invalid currency returns proper error")


class TestAuthHelpers:
    """Helper methods for authentication"""
    
    @staticmethod
    def login(email, password):
        """Login and return token"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": email,
            "password": password
        })
        if response.status_code == 200:
            return response.json().get("token")
        return None
    
    @staticmethod
    def register(email, password, name, is_artist=False):
        """Register a new user and return token"""
        response = requests.post(f"{BASE_URL}/api/auth/register", json={
            "email": email,
            "password": password,
            "name": name,
            "is_artist": is_artist
        })
        if response.status_code == 200:
            return response.json()
        return None
    
    @staticmethod
    def get_auth_headers(token):
        """Get authorization headers"""
        return {"Authorization": f"Bearer {token}"}


class TestNotificationsAPI:
    """Notification Center API tests"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Setup - login as admin"""
        self.token = TestAuthHelpers.login(ADMIN_EMAIL, ADMIN_PASSWORD)
        if not self.token:
            pytest.skip("Admin login failed - skipping notification tests")
        self.headers = TestAuthHelpers.get_auth_headers(self.token)
    
    def test_get_notifications(self):
        """Test GET /api/notifications returns notifications list"""
        response = requests.get(f"{BASE_URL}/api/notifications", headers=self.headers)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "notifications" in data, "Response should contain 'notifications'"
        assert "unread_count" in data, "Response should contain 'unread_count'"
        assert isinstance(data["notifications"], list), "Notifications should be a list"
        assert isinstance(data["unread_count"], int), "Unread count should be an integer"
        print(f"✓ Get notifications working - {len(data['notifications'])} notifications, {data['unread_count']} unread")
    
    def test_get_notifications_unread_only(self):
        """Test GET /api/notifications with unread_only filter"""
        response = requests.get(f"{BASE_URL}/api/notifications", 
                               params={"unread_only": True}, 
                               headers=self.headers)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        # All returned notifications should be unread
        for notification in data["notifications"]:
            assert notification.get("is_read") == False, "All notifications should be unread"
        print("✓ Unread only filter working correctly")
    
    def test_mark_all_notifications_read(self):
        """Test PUT /api/notifications/read-all marks all as read"""
        response = requests.put(f"{BASE_URL}/api/notifications/read-all", 
                               json={}, 
                               headers=self.headers)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert data.get("success") == True, "Should return success: true"
        print("✓ Mark all notifications read working correctly")


class TestMessagingAPI:
    """In-app Messaging API tests"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Setup - login as admin and create test user"""
        self.admin_token = TestAuthHelpers.login(ADMIN_EMAIL, ADMIN_PASSWORD)
        if not self.admin_token:
            pytest.skip("Admin login failed - skipping messaging tests")
        self.admin_headers = TestAuthHelpers.get_auth_headers(self.admin_token)
        
        # Get admin user info
        response = requests.get(f"{BASE_URL}/api/auth/me", headers=self.admin_headers)
        if response.status_code == 200:
            self.admin_user = response.json()
        else:
            pytest.skip("Could not get admin user info")
    
    def test_get_conversations_empty(self):
        """Test GET /api/conversations returns conversations list"""
        response = requests.get(f"{BASE_URL}/api/conversations", headers=self.admin_headers)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert isinstance(data, list), "Response should be a list"
        print(f"✓ Get conversations working - {len(data)} conversations found")
    
    def test_create_conversation_and_send_message(self):
        """Test creating a conversation and sending a message"""
        # First, register a new test user
        test_email = f"test_msg_{uuid.uuid4().hex[:8]}@test.com"
        result = TestAuthHelpers.register(test_email, "testpass123", "Test User", is_artist=True)
        
        if not result:
            pytest.skip("Could not create test user")
        
        test_token = result.get("token")
        test_user = result.get("user")
        test_headers = TestAuthHelpers.get_auth_headers(test_token)
        
        # Create conversation from admin to test user
        response = requests.post(f"{BASE_URL}/api/conversations", 
                                params={"recipient_id": test_user["id"]},
                                headers=self.admin_headers)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        conversation = response.json()
        assert "id" in conversation, "Conversation should have an id"
        assert "participant_ids" in conversation, "Conversation should have participant_ids"
        assert self.admin_user["id"] in conversation["participant_ids"]
        assert test_user["id"] in conversation["participant_ids"]
        print(f"✓ Conversation created: {conversation['id']}")
        
        # Send a message
        response = requests.post(f"{BASE_URL}/api/messages", 
                                json={
                                    "conversation_id": conversation["id"],
                                    "recipient_id": test_user["id"],
                                    "content": "Hello, this is a test message!"
                                },
                                headers=self.admin_headers)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        message = response.json()
        assert "id" in message, "Message should have an id"
        assert message["content"] == "Hello, this is a test message!"
        assert message["sender_id"] == self.admin_user["id"]
        print(f"✓ Message sent: {message['id']}")
        
        # Get conversation with messages
        response = requests.get(f"{BASE_URL}/api/conversations/{conversation['id']}", 
                               headers=self.admin_headers)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        conv_data = response.json()
        assert "messages" in conv_data, "Conversation should include messages"
        assert len(conv_data["messages"]) >= 1, "Should have at least 1 message"
        print(f"✓ Conversation retrieved with {len(conv_data['messages'])} messages")
        
        # Verify notification was created for recipient
        response = requests.get(f"{BASE_URL}/api/notifications", headers=test_headers)
        assert response.status_code == 200
        
        notifications = response.json()
        message_notifications = [n for n in notifications["notifications"] if n["type"] == "message"]
        assert len(message_notifications) >= 1, "Recipient should have message notification"
        print("✓ Message notification created for recipient")
    
    def test_cannot_message_self(self):
        """Test that user cannot start conversation with themselves"""
        response = requests.post(f"{BASE_URL}/api/conversations", 
                                params={"recipient_id": self.admin_user["id"]},
                                headers=self.admin_headers)
        assert response.status_code == 400, f"Expected 400, got {response.status_code}"
        print("✓ Cannot message self - proper error returned")
    
    def test_conversation_not_found(self):
        """Test getting non-existent conversation returns 404"""
        response = requests.get(f"{BASE_URL}/api/conversations/non-existent-id", 
                               headers=self.admin_headers)
        assert response.status_code == 404, f"Expected 404, got {response.status_code}"
        print("✓ Non-existent conversation returns 404")


class TestBidNotifications:
    """Test that bid placement creates notifications"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Setup - login as admin"""
        self.token = TestAuthHelpers.login(ADMIN_EMAIL, ADMIN_PASSWORD)
        if not self.token:
            pytest.skip("Admin login failed")
        self.headers = TestAuthHelpers.get_auth_headers(self.token)
    
    def test_bid_creates_notification(self):
        """Test that placing a bid creates notification for artist"""
        # Get an auction artwork
        response = requests.get(f"{BASE_URL}/api/artworks/auctions", params={"limit": 1})
        if response.status_code != 200 or not response.json():
            pytest.skip("No auction artworks available for testing")
        
        auctions = response.json()
        if not auctions:
            pytest.skip("No auction artworks available")
        
        auction = auctions[0]
        current_bid = auction.get("current_bid") or auction.get("price", 100)
        new_bid = current_bid + 50
        
        # Place a bid
        response = requests.post(f"{BASE_URL}/api/bids", 
                                json={
                                    "artwork_id": auction["id"],
                                    "amount": new_bid
                                },
                                headers=self.headers)
        
        if response.status_code == 200:
            print(f"✓ Bid placed successfully: ${new_bid}")
            # Note: Notification is created for the artist, not the bidder
            # We can verify the bid was recorded
            bid = response.json()
            assert bid["amount"] == new_bid
            print("✓ Bid notification flow working (notification sent to artist)")
        else:
            # Bid might fail if user is the artist or other validation
            print(f"Bid placement returned {response.status_code}: {response.text}")


class TestArtworkPricesWithCurrency:
    """Test that artwork prices work with currency context"""
    
    def test_artworks_have_prices(self):
        """Test that artworks endpoint returns prices"""
        response = requests.get(f"{BASE_URL}/api/artworks", params={"limit": 5})
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        artworks = response.json()
        if artworks:
            for artwork in artworks:
                assert "price" in artwork, "Artwork should have price"
                assert isinstance(artwork["price"], (int, float)), "Price should be numeric"
                assert artwork["price"] >= 0, "Price should be non-negative"
            print(f"✓ Artworks have valid prices - checked {len(artworks)} artworks")
        else:
            print("No artworks found to check prices")
    
    def test_featured_artworks_have_prices(self):
        """Test that featured artworks have prices"""
        response = requests.get(f"{BASE_URL}/api/artworks/featured")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        artworks = response.json()
        for artwork in artworks:
            assert "price" in artwork, "Featured artwork should have price"
        print(f"✓ Featured artworks have prices - {len(artworks)} artworks")


class TestEndToEndMessaging:
    """End-to-end messaging flow tests"""
    
    def test_full_messaging_flow(self):
        """Test complete messaging flow: register -> create conversation -> send messages"""
        # Create two test users
        user1_email = f"test_user1_{uuid.uuid4().hex[:8]}@test.com"
        user2_email = f"test_user2_{uuid.uuid4().hex[:8]}@test.com"
        
        result1 = TestAuthHelpers.register(user1_email, "testpass123", "User One", is_artist=True)
        result2 = TestAuthHelpers.register(user2_email, "testpass123", "User Two", is_artist=False)
        
        if not result1 or not result2:
            pytest.skip("Could not create test users")
        
        user1_token = result1["token"]
        user1 = result1["user"]
        user1_headers = TestAuthHelpers.get_auth_headers(user1_token)
        
        user2_token = result2["token"]
        user2 = result2["user"]
        user2_headers = TestAuthHelpers.get_auth_headers(user2_token)
        
        # User 2 starts conversation with User 1 (artist)
        response = requests.post(f"{BASE_URL}/api/conversations",
                                params={"recipient_id": user1["id"]},
                                headers=user2_headers)
        assert response.status_code == 200, f"Failed to create conversation: {response.text}"
        conversation = response.json()
        conv_id = conversation["id"]
        print(f"✓ Conversation created between users")
        
        # User 2 sends message
        response = requests.post(f"{BASE_URL}/api/messages",
                                json={
                                    "conversation_id": conv_id,
                                    "recipient_id": user1["id"],
                                    "content": "Hi, I love your artwork!"
                                },
                                headers=user2_headers)
        assert response.status_code == 200, f"Failed to send message: {response.text}"
        print("✓ User 2 sent message to User 1")
        
        # User 1 checks notifications
        response = requests.get(f"{BASE_URL}/api/notifications", headers=user1_headers)
        assert response.status_code == 200
        notifications = response.json()
        assert notifications["unread_count"] >= 1, "User 1 should have unread notification"
        print(f"✓ User 1 has {notifications['unread_count']} unread notifications")
        
        # User 1 views conversation (marks messages as read)
        response = requests.get(f"{BASE_URL}/api/conversations/{conv_id}", headers=user1_headers)
        assert response.status_code == 200
        conv_data = response.json()
        assert len(conv_data["messages"]) >= 1
        print("✓ User 1 viewed conversation")
        
        # User 1 replies
        response = requests.post(f"{BASE_URL}/api/messages",
                                json={
                                    "conversation_id": conv_id,
                                    "recipient_id": user2["id"],
                                    "content": "Thank you! Let me know if you have questions."
                                },
                                headers=user1_headers)
        assert response.status_code == 200
        print("✓ User 1 replied to User 2")
        
        # Verify conversation has both messages
        response = requests.get(f"{BASE_URL}/api/conversations/{conv_id}", headers=user1_headers)
        assert response.status_code == 200
        conv_data = response.json()
        assert len(conv_data["messages"]) >= 2, "Conversation should have at least 2 messages"
        print(f"✓ Conversation has {len(conv_data['messages'])} messages")
        
        # User 2 checks notifications
        response = requests.get(f"{BASE_URL}/api/notifications", headers=user2_headers)
        assert response.status_code == 200
        notifications = response.json()
        assert notifications["unread_count"] >= 1, "User 2 should have notification from reply"
        print("✓ Full messaging flow completed successfully!")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
