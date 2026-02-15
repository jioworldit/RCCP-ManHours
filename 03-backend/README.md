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
npm run dev
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

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/register` | Register new user |
| GET | `/api/auth/profile` | Get current user profile |

### Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | List all projects |
| POST | `/api/projects` | Create new project |
| GET | `/api/projects/:id` | Get project details |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |
| POST | `/api/projects/:id/technical-parameters` | Save technical parameters |
| POST | `/api/projects/:id/scopes` | Save scope selections |

### Activities

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

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

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
├── database/
│   └── schema.sql       # Raw SQL schema
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

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Input validation with express-validator
- Helmet for security headers
- CORS protection

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
