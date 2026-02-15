#!/bin/bash
# RCCP Project API Test Script
# Usage: ./test-api.sh [token]

BASE_URL="http://localhost:3000/api"
TOKEN=${1:-""}

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "================================"
echo "RCCP Project API Test Script"
echo "================================"
echo ""

# Function to print test results
print_result() {
  if [ $1 -eq 0 ]; then
    echo -e "${GREEN}✓ PASS${NC}: $2"
  else
    echo -e "${RED}✗ FAIL${NC}: $2"
  fi
}

# 1. Health Check
echo "Testing Health Endpoint..."
HEALTH=$(curl -s "$BASE_URL/health")
if echo "$HEALTH" | grep -q '"status":"ok"'; then
  print_result 0 "Health check"
else
  print_result 1 "Health check"
fi

# 2. Authentication (if no token provided)
if [ -z "$TOKEN" ]; then
  echo ""
  echo "Authenticating..."
  AUTH_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
    -H "Content-Type: application/json" \
    -d '{"email":"admin@rccp.local","password":"admin123"}')
  
  TOKEN=$(echo "$AUTH_RESPONSE" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
  
  if [ -n "$TOKEN" ]; then
    print_result 0 "Authentication"
    echo "Token: ${TOKEN:0:50}..."
  else
    print_result 1 "Authentication"
    exit 1
  fi
fi

# 3. Create Project
echo ""
echo "Testing Project CRUD..."
CREATE_RESPONSE=$(curl -s -X POST "$BASE_URL/projects" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "projectNumber": "API-TEST-'$(date +%s)'",
    "customerName": "API Test Customer",
    "productType": "Vessel",
    "description": "Created by test script",
    "quantity": 1
  }')

PROJECT_ID=$(echo "$CREATE_RESPONSE" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
if [ -n "$PROJECT_ID" ]; then
  print_result 0 "Create project"
else
  print_result 1 "Create project"
fi

# 4. List Projects
LIST_RESPONSE=$(curl -s -X GET "$BASE_URL/projects?page=1&limit=10" \
  -H "Authorization: Bearer $TOKEN")

if echo "$LIST_RESPONSE" | grep -q '"success":true'; then
  PROJECT_COUNT=$(echo "$LIST_RESPONSE" | grep -o '"totalCount":[0-9]*' | cut -d':' -f2)
  print_result 0 "List projects (found: $PROJECT_COUNT)"
else
  print_result 1 "List projects"
fi

# 5. Get Single Project
if [ -n "$PROJECT_ID" ]; then
  GET_RESPONSE=$(curl -s -X GET "$BASE_URL/projects/$PROJECT_ID" \
    -H "Authorization: Bearer $TOKEN")
  
  if echo "$GET_RESPONSE" | grep -q '"success":true'; then
    print_result 0 "Get single project"
  else
    print_result 1 "Get single project"
  fi
fi

# 6. Update Project
if [ -n "$PROJECT_ID" ]; then
  UPDATE_RESPONSE=$(curl -s -X PUT "$BASE_URL/projects/$PROJECT_ID" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d '{"status":"IN_PROGRESS"}')
  
  if echo "$UPDATE_RESPONSE" | grep -q '"status":"IN_PROGRESS"'; then
    print_result 0 "Update project"
  else
    print_result 1 "Update project"
  fi
fi

# 7. Save Technical Parameters
if [ -n "$PROJECT_ID" ]; then
  TECH_RESPONSE=$(curl -s -X POST "$BASE_URL/projects/$PROJECT_ID/technical-parameters" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d '{
      "shellThicknessMm": 12.5,
      "diameterMm": 2000,
      "materialGrade": "SA516-70",
      "materialCategory": "CS"
    }')
  
  if echo "$TECH_RESPONSE" | grep -q '"success":true'; then
    print_result 0 "Save technical parameters"
  else
    print_result 1 "Save technical parameters"
  fi
fi

# 8. Test Filters
echo ""
echo "Testing Filters & Search..."

# Filter by status
FILTER_STATUS=$(curl -s -X GET "$BASE_URL/projects?status=IN_PROGRESS" \
  -H "Authorization: Bearer $TOKEN")
if echo "$FILTER_STATUS" | grep -q '"success":true'; then
  print_result 0 "Filter by status"
else
  print_result 1 "Filter by status"
fi

# Filter by product type
FILTER_TYPE=$(curl -s -X GET "$BASE_URL/projects?productType=Vessel" \
  -H "Authorization: Bearer $TOKEN")
if echo "$FILTER_TYPE" | grep -q '"success":true'; then
  print_result 0 "Filter by product type"
else
  print_result 1 "Filter by product type"
fi

# Search
SEARCH=$(curl -s -X GET "$BASE_URL/projects?search=API" \
  -H "Authorization: Bearer $TOKEN")
if echo "$SEARCH" | grep -q '"success":true'; then
  print_result 0 "Search functionality"
else
  print_result 1 "Search functionality"
fi

# 9. Test Error Handling
echo ""
echo "Testing Error Handling..."

# No auth
NO_AUTH=$(curl -s -X GET "$BASE_URL/projects")
if echo "$NO_AUTH" | grep -q '"error":"Authentication required"'; then
  print_result 0 "JWT protection (no token)"
else
  print_result 1 "JWT protection (no token)"
fi

# Invalid auth
INVALID_AUTH=$(curl -s -X GET "$BASE_URL/projects" \
  -H "Authorization: Bearer invalid_token")
if echo "$INVALID_AUTH" | grep -q '"error":"Authentication failed"'; then
  print_result 0 "JWT protection (invalid token)"
else
  print_result 1 "JWT protection (invalid token)"
fi

# Validation error
VALIDATION_ERROR=$(curl -s -X POST "$BASE_URL/projects" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"customerName":"Test"}')
if echo "$VALIDATION_ERROR" | grep -q '"error":"Validation Error"'; then
  print_result 0 "Validation error handling"
else
  print_result 1 "Validation error handling"
fi

# Not found
NOT_FOUND=$(curl -s -X GET "$BASE_URL/projects/00000000-0000-0000-0000-000000000000" \
  -H "Authorization: Bearer $TOKEN")
if echo "$NOT_FOUND" | grep -q '"error":"Not Found"'; then
  print_result 0 "Not found error handling"
else
  print_result 1 "Not found error handling"
fi

# 10. Delete Project (cleanup)
if [ -n "$PROJECT_ID" ]; then
  echo ""
  echo "Cleanup..."
  DELETE_RESPONSE=$(curl -s -X DELETE "$BASE_URL/projects/$PROJECT_ID" \
    -H "Authorization: Bearer $TOKEN")
  
  if echo "$DELETE_RESPONSE" | grep -q '"success":true'; then
    print_result 0 "Delete project"
  else
    print_result 1 "Delete project"
  fi
fi

echo ""
echo "================================"
echo "Test Suite Complete!"
echo "================================"
