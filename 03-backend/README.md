# RCCP Man-Hours API

Backend API for the RCCP Man-Hours Estimation System. Built with Node.js, Express, Prisma ORM, and PostgreSQL.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Set up database
npm run db:setup

# Start development server
npm start
```

### Environment Variables

```env
PORT=3000
NODE_ENV=development
DATABASE_URL="postgresql://user:password@localhost:5432/rccp_manhours?schema=public"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="24h"
CORS_ORIGIN="http://localhost:3001"
```

## 📚 API Documentation

### Response Format

All API responses follow a consistent format:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error Type",
  "message": "Human-readable error message",
  "details": { ... } // Optional additional details
}
```

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/register` | Register new user | No |
| GET | `/api/auth/profile` | Get current user profile | Yes |

### Projects API

All project endpoints require JWT authentication via `Authorization: Bearer <token>` header.

#### List All Projects

```http
GET /api/projects?page=1&limit=10&status=&productType=&search=
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | integer | No | Page number (default: 1) |
| `limit` | integer | No | Items per page (default: 10, max: 100) |
| `status` | string | No | Filter by status: `DRAFT`, `IN_PROGRESS`, `COMPLETED`, `ARCHIVED` |
| `productType` | string | No | Filter by type: `Vessel`, `Skid`, `Structure`, `EHouse` |
| `search` | string | No | Search in projectNumber, customerName, description |
| `sortBy` | string | No | Sort field: `createdAt`, `updatedAt`, `projectNumber`, `customerName`, `status` |
| `sortOrder` | string | No | Sort direction: `asc`, `desc` (default: `desc`) |

**Response:**
```json
{
  "success": true,
  "message": "Projects retrieved successfully",
  "data": {
    "projects": [
      {
        "id": "uuid",
        "projectNumber": "PRJ-2025-001",
        "customerName": "Acme Corp",
        "productType": "Vessel",
        "description": "Project description",
        "quantity": 2,
        "status": "DRAFT",
        "totalEstimatedHours": null,
        "createdAt": "2026-02-15T10:00:00.000Z",
        "updatedAt": "2026-02-15T10:00:00.000Z",
        "userId": "uuid",
        "user": {
          "id": "uuid",
          "name": "John Doe",
          "email": "john@example.com"
        },
        "technicalParameters": { ... },
        "_count": {
          "activities": 0,
          "projectScopes": 0
        }
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalCount": 50,
      "limit": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

#### Create Project

```http
POST /api/projects
```

**Request Body:**
```json
{
  "projectNumber": "PRJ-2025-001",
  "customerName": "Acme Corporation",
  "productType": "Vessel",
  "description": "Pressure vessel project description",
  "quantity": 2
}
```

**Required Fields:**
- `projectNumber` (string, max 50 chars, unique)
- `customerName` (string, max 255 chars)
- `productType` (enum: `Vessel`, `Skid`, `Structure`, `EHouse`)

**Optional Fields:**
- `description` (string, max 1000 chars)
- `quantity` (integer, min: 1, default: 1)

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Project created successfully",
  "data": {
    "project": { ... }
  }
}
```

#### Get Single Project

```http
GET /api/projects/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Project retrieved successfully",
  "data": {
    "project": {
      "id": "uuid",
      "projectNumber": "PRJ-2025-001",
      "customerName": "Acme Corp",
      "productType": "Vessel",
      "description": "...",
      "quantity": 2,
      "status": "DRAFT",
      "totalEstimatedHours": null,
      "createdAt": "2026-02-15T10:00:00.000Z",
      "updatedAt": "2026-02-15T10:00:00.000Z",
      "userId": "uuid",
      "user": { ... },
      "technicalParameters": { ... },
      "projectScopes": [ ... ],
      "activities": [ ... ],
      "_count": {
        "activities": 0,
        "projectScopes": 0
      }
    }
  }
}
```

#### Update Project

```http
PUT /api/projects/:id
```

**Request Body:**
```json
{
  "customerName": "Updated Customer Name",
  "description": "Updated description",
  "quantity": 3,
  "status": "IN_PROGRESS"
}
```

**Optional Fields:** (all fields are optional for updates)
- `customerName` (string, max 255 chars)
- `description` (string)
- `quantity` (integer, min: 1)
- `status` (enum: `DRAFT`, `IN_PROGRESS`, `COMPLETED`, `ARCHIVED`)

**Response:**
```json
{
  "success": true,
  "message": "Project updated successfully",
  "data": {
    "project": { ... }
  }
}
```

#### Delete Project

```http
DELETE /api/projects/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Project deleted successfully",
  "data": {
    "deletedProjectId": "uuid"
  }
}
```

#### Save Technical Parameters

```http
POST /api/projects/:id/technical-parameters
```

**Request Body:**
```json
{
  "shellThicknessMm": 12.5,
  "diameterMm": 2000,
  "lengthMm": 5000,
  "structuralWeightTons": 15.5,
  "materialGrade": "SA516-70",
  "materialCategory": "CS",
  "numNozzles": 8,
  "numManholes": 2,
  "linearWeldLengthM": 45.5,
  "designPressureBar": 10.5,
  "designTempCelsius": 200,
  "corrosionAllowanceMm": 3.0,
  "requiresRadiography": true,
  "requiresStressRelieve": false,
  "requiresPostWeldHeatTreatment": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Technical parameters saved successfully",
  "data": {
    "technicalParameters": { ... }
  }
}
```

#### Save Scope Selections

```http
POST /api/projects/:id/scopes
```

**Request Body:**
```json
{
  "scopeSelections": [
    {
      "scopeTypeId": "uuid",
      "isSelected": true,
      "notes": "Additional notes"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Scope selections saved successfully",
  "data": {
    "scopeSelections": [ ... ]
  }
}
```

### Activities API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/activities/generate/:id` | Generate activities for project |
| GET | `/api/activities/project/:id` | Get project activities |
| PUT | `/api/activities/project/:projectId/bulk` | Bulk update activities |
| PUT | `/api/activities/:activityId` | Update single activity |
| DELETE | `/api/activities/:activityId` | Delete activity |
| POST | `/api/activities/project/:projectId/manual` | Add manual activity |

### Reference Data

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reference/material-grades` | Get material grades |
| GET | `/api/reference/welding-processes` | Get welding processes |
| GET | `/api/reference/scope-types` | Get scope types |
| GET | `/api/reference/calculation-rules` | Get calculation rules |

## 🔒 Authentication & Authorization

### JWT Token

Include the JWT token in the Authorization header for all protected endpoints:

```
Authorization: Bearer <your-jwt-token>
```

### User Roles

| Role | Permissions |
|------|-------------|
| `ADMIN` | Full access to all projects and users |
| `ENGINEER` | Can create and manage own projects |
| `USER` | Can create and manage own projects |
| `VIEWER` | Read-only access |

### Token Expiration

Tokens expire after 24 hours by default. You'll receive a 401 response when expired:

```json
{
  "success": false,
  "error": "Authentication Failed",
  "message": "Token expired"
}
```

## 🧪 Testing with cURL

### Authentication

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@rccp.local","password":"admin123"}'
```

### Project CRUD Operations

```bash
# Set your JWT token
TOKEN="your-jwt-token"

# Create project
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "projectNumber": "PRJ-2025-001",
    "customerName": "Acme Corporation",
    "productType": "Vessel",
    "description": "Test project",
    "quantity": 1
  }'

# List projects with pagination
curl -X GET "http://localhost:3000/api/projects?page=1&limit=10" \
  -H "Authorization: Bearer $TOKEN"

# Get single project
curl -X GET http://localhost:3000/api/projects/<project-id> \
  -H "Authorization: Bearer $TOKEN"

# Update project
curl -X PUT http://localhost:3000/api/projects/<project-id> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"status":"IN_PROGRESS","description":"Updated"}'

# Delete project
curl -X DELETE http://localhost:3000/api/projects/<project-id> \
  -H "Authorization: Bearer $TOKEN"
```

## 🔧 Database Schema

```
users
├── projects (1:N)
│   ├── technical_parameters (1:1)
│   ├── project_scopes (1:N) → scope_types
│   └── activities (1:N)
├── material_grades (reference)
├── welding_processes (reference)
└── calculation_rules (reference)
```

### Project Status Flow

```
DRAFT → IN_PROGRESS → COMPLETED → ARCHIVED
```

## 🧮 Calculation Engine

The estimation engine uses rule-based calculations:

```
Total Hours = (Base Hours × Quantity × Difficulty Factor) / Efficiency Factor
```

### Material Multipliers

| Material | Cutting | Fit-Up | Welding | NDT |
|----------|---------|--------|---------|-----|
| CS (Carbon Steel) | 1.00 | 1.00 | 1.00 | 1.00 |
| SS 304 | 1.20 | 1.15 | 1.30 | 1.10 |
| SS 316 | 1.25 | 1.20 | 1.35 | 1.10 |
| Alloy | 1.30 | 1.25 | 1.50 | 1.20 |
| Duplex | 1.50 | 1.45 | 1.80 | 1.30 |

## 📁 Project Structure

```
03-backend/
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.js          # Seed data
├── src/
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth, validation, error handling
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   └── index.js         # Entry point
├── package.json
└── .env.example
```

## 📝 Default Users

After seeding, the following users are available:

| Email | Password | Role |
|-------|----------|------|
| admin@rccp.local | admin123 | ADMIN |
| engineer@rccp.local | user123 | ENGINEER |
| user@rccp.local | user123 | USER |

## 🔐 Security

- JWT-based authentication
- Password hashing with bcrypt
- Input validation with express-validator
- Helmet for security headers
- CORS protection
- Role-based access control (RBAC)

## 🚀 Deployment

```bash
# Production build
npm install --production

# Database migration
npx prisma migrate deploy

# Seed if needed
npx prisma db seed

# Start server
npm start
```

## 📄 License

MIT License
