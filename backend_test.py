import requests
import sys
import json
from datetime import datetime

class JMLPHAPITester:
    def __init__(self, base_url="https://research-gateway-4.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_result(self, test_name, success, details="", response_data=None):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {test_name} - PASSED")
        else:
            print(f"❌ {test_name} - FAILED: {details}")
        
        self.test_results.append({
            "test": test_name,
            "status": "PASSED" if success else "FAILED",
            "details": details,
            "response_data": response_data
        })

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=30)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=30)
            elif method == 'PATCH':
                response = requests.patch(url, json=data, headers=headers, timeout=30)

            success = response.status_code == expected_status
            response_data = None
            
            try:
                response_data = response.json() if response.text else {}
            except:
                response_data = {"raw_response": response.text}
            
            if success:
                self.log_result(name, True, f"Status: {response.status_code}", response_data)
            else:
                self.log_result(name, False, f"Expected {expected_status}, got {response.status_code}", response_data)

            return success, response_data

        except requests.exceptions.RequestException as e:
            self.log_result(name, False, f"Request failed: {str(e)}")
            return False, {}

    def test_health_check(self):
        """Test health check endpoint"""
        success, response = self.run_test(
            "Health Check",
            "GET",
            "health",
            200
        )
        return success

    def test_root_endpoint(self):
        """Test root API endpoint"""
        success, response = self.run_test(
            "Root Endpoint",
            "GET",
            "",
            200
        )
        return success

    def test_newsletter_subscription(self):
        """Test newsletter subscription"""
        test_email = f"test_{datetime.now().strftime('%Y%m%d_%H%M%S')}@example.com"
        
        # Test valid subscription
        success, response = self.run_test(
            "Newsletter Subscribe - Valid Email",
            "POST",
            "newsletter/subscribe",
            200,
            data={"email": test_email}
        )
        
        if success:
            # Test duplicate subscription
            duplicate_success, duplicate_response = self.run_test(
                "Newsletter Subscribe - Duplicate Email",
                "POST",
                "newsletter/subscribe",
                409,
                data={"email": test_email}
            )
            return duplicate_success
        
        return success

    def test_newsletter_invalid_email(self):
        """Test newsletter with invalid email"""
        success, response = self.run_test(
            "Newsletter Subscribe - Invalid Email",
            "POST", 
            "newsletter/subscribe",
            422,  # Should return validation error
            data={"email": "invalid-email"}
        )
        return success

    def test_contact_form_submission(self):
        """Test contact form submission"""
        contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "subject": "Test Inquiry",
            "message": "This is a test message for the JMLPH contact form."
        }
        
        success, response = self.run_test(
            "Contact Form Submit - Valid Data",
            "POST",
            "contact",
            200,
            data=contact_data
        )
        return success

    def test_contact_form_missing_fields(self):
        """Test contact form with missing required fields"""
        incomplete_data = {
            "name": "Test User"
            # Missing email and message
        }
        
        success, response = self.run_test(
            "Contact Form Submit - Missing Fields", 
            "POST",
            "contact",
            422,  # Should return validation error
            data=incomplete_data
        )
        return success

    def test_get_newsletter_subscriptions(self):
        """Test getting newsletter subscriptions (admin endpoint)"""
        success, response = self.run_test(
            "Get Newsletter Subscriptions",
            "GET",
            "newsletter/subscriptions",
            200
        )
        return success

    def test_get_contact_messages(self):
        """Test getting contact messages (admin endpoint)"""
        success, response = self.run_test(
            "Get Contact Messages",
            "GET",
            "contact/messages", 
            200
        )
        return success

    def run_all_tests(self):
        """Run all API tests"""
        print(f"🚀 Starting JMLPH API Tests")
        print(f"Base URL: {self.base_url}")
        print(f"API URL: {self.api_url}")
        print("=" * 60)
        
        # Test basic endpoints
        self.test_health_check()
        self.test_root_endpoint()
        
        # Test newsletter functionality
        self.test_newsletter_subscription()
        self.test_newsletter_invalid_email()
        self.test_get_newsletter_subscriptions()
        
        # Test contact form functionality
        self.test_contact_form_submission()
        self.test_contact_form_missing_fields()
        self.test_get_contact_messages()
        
        # Print summary
        print("=" * 60)
        print(f"📊 Test Summary:")
        print(f"Tests Run: {self.tests_run}")
        print(f"Tests Passed: {self.tests_passed}")
        print(f"Tests Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        return self.tests_passed == self.tests_run, self.test_results

def main():
    tester = JMLPHAPITester()
    all_passed, results = tester.run_all_tests()
    
    # Save results for reference
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump({
            "timestamp": datetime.now().isoformat(),
            "total_tests": tester.tests_run,
            "passed_tests": tester.tests_passed,
            "success_rate": (tester.tests_passed/tester.tests_run)*100 if tester.tests_run > 0 else 0,
            "results": results
        }, f, indent=2)
    
    return 0 if all_passed else 1

if __name__ == "__main__":
    sys.exit(main())