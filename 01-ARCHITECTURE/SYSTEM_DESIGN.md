# RCCP Man-Hours - System Architecture

**Architecture Type:** Modern Web Application (SPA)  
**Platform:** Firebase (BaaS)  
**Date:** 15 Feb 2026

---

## 1. HIGH-LEVEL ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT SIDE                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   React     │  │  Tailwind   │  │   Firebase SDK      │  │
│  │  Frontend   │  │    CSS      │  │  (Auth + Firestore) │  │
│  └──────┬──────┘  └─────────────┘  └─────────────────────┘  │
└─────────┼───────────────────────────────────────────────────┘
          │ HTTPS
          ▼
┌─────────────────────────────────────────────────────────────┐
│                      FIREBASE PLATFORM                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │  Authentication│  │   Firestore   │  │     Hosting      │   │
│  │   (Identity)   │  │  (NoSQL DB)   │  │   (CDN + SSL)    │   │
│  └──────────────┘  └──────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. FRONTEND ARCHITECTURE

### 2.1 Technology Stack
- **Framework:** React 18 (CRA)
- **Language:** JavaScript (ES6+)
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Routing:** React Router v6
- **Forms:** React Hook Form + Yup validation
- **Icons:** Heroicons / Font Awesome
- **Charts:** Recharts (for v2)

### 2.2 Component Structure
```
src/
├── components/          # Reusable UI components
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Card.jsx
│   ├── Table.jsx
│   ├── Stepper.jsx
│   └── Layout/
│       ├── Header.jsx
│       ├── Sidebar.jsx
│       └── Footer.jsx
├── pages/              # Route-level components
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Dashboard.jsx
│   ├── ProjectEntry.jsx
│   ├── Components.jsx
│   ├── ScopeSelection.jsx
│   ├── ActivitiesGrid.jsx
│   └── Results.jsx
├── contexts/           # React Context providers
│   ├── AuthContext.jsx
│   └── ProjectContext.jsx
├── hooks/              # Custom React hooks
│   ├── useAuth.js
│   ├── useProjects.js
│   └── useCalculations.js
├── services/           # Firebase integration
│   └── firebase.js
├── utils/              # Helper functions
│   ├── calculations.js
│   ├── formatters.js
│   └── validators.js
├── styles/             # Global styles
│   └── index.css
└── App.js              # Main app component
```

### 2.3 State Management

**Auth State (Context API):**
```javascript
{
  user: { uid, email, displayName },
  isAuthenticated: boolean,
  loading: boolean,
  error: string
}
```

**Project State (Context API):**
```javascript
{
  currentProject: { id, name, type, components, scope, activities },
  projectsList: [],
  loading: boolean,
  error: string
}
```

### 2.4 Routing Structure
```
/              → Dashboard (protected)
/login         → Login (public)
/signup        → Signup (public)
/projects/new  → Project Entry (protected)
/projects/:id  → Project Detail (protected)
/components    → Components (protected)
/scope         → Scope Selection (protected)
/activities    → Activities Grid (protected)
/results       → Results (protected)
```

---

## 3. BACKEND ARCHITECTURE

### 3.1 Firebase Services

**Firebase Authentication:**
- Provider: Email/Password
- Features: Registration, Login, Password Reset
- Security: JWT tokens, automatic session management

**Cloud Firestore:**
- Type: NoSQL Document Database
- Structure: Collections → Documents → Fields
- Real-time: Optional (not required for MVP)
- Offline: Automatic caching

**Firebase Hosting:**
- CDN: Global edge network
- SSL: Automatic HTTPS
- Cache: Aggressive static asset caching
- Deploy: CLI integration

### 3.2 Database Collections

```
users/{userId}
├── email: string
├── name: string
├── company: string
├── createdAt: timestamp
└── updatedAt: timestamp

projects/{projectId}
├── userId: reference
├── projectNumber: string
├── name: string
├── customer: string
├── location: string
├── productType: enum
├── status: enum
├── totalHours: number
├── createdAt: timestamp
└── updatedAt: timestamp

projectComponents/{projectId}
├── components: array
│   ├── type: string
│   ├── name: string
│   ├── quantity: number
│   ├── thickness: number
│   ├── material: string
│   └── dimensions: object
└── updatedAt: timestamp

projectScope/{projectId}
├── selectedScopes: array
├── templates: array
└── updatedAt: timestamp

projectActivities/{projectId}
├── activities: array
│   ├── code: string
│   ├── description: string
│   ├── quantity: number
│   ├── baseHours: number
│   ├── difficulty: number
│   ├── efficiency: number
│   └── totalHours: number
└── updatedAt: timestamp
```

### 3.3 Security Rules

```javascript
// Firestore Security Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /projects/{projectId} {
      allow read, write: if request.auth != null 
                         && resource.data.userId == request.auth.uid;
    }
    
    match /projectComponents/{projectId} {
      allow read, write: if request.auth != null;
    }
    
    match /projectScope/{projectId} {
      allow read, write: if request.auth != null;
    }
    
    match /projectActivities/{projectId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 4. DATA FLOW

### 4.1 User Registration Flow
```
1. User fills signup form
2. Frontend validates input
3. Call: firebase.auth().createUserWithEmailAndPassword()
4. Store additional data in Firestore (users collection)
5. Redirect to Dashboard
```

### 4.2 Project Creation Flow
```
1. User fills project form
2. Frontend validates
3. Call: addDoc(collection(db, 'projects'), data)
4. Firestore returns project ID
5. Store ID in local state
6. Navigate to Components page
```

### 4.3 Calculation Flow
```
1. User adds components
2. User selects scope
3. Frontend generates activities array
4. Calculate totals client-side
5. Save to Firestore (projectActivities)
6. Display results
```

---

## 5. CALCULATION ENGINE

### 5.1 Formula
```javascript
const calculateTotalHours = (activity) => {
  return (activity.baseHours * activity.quantity * activity.difficultyFactor) 
         / activity.efficiencyFactor;
};
```

### 5.2 Material Multipliers
```javascript
const materialFactors = {
  'CS': { cutting: 1.0, fitup: 1.0, welding: 1.0 },
  'SS304': { cutting: 1.2, fitup: 1.15, welding: 1.3 },
  'SS316': { cutting: 1.25, fitup: 1.2, welding: 1.35 },
  'Alloy': { cutting: 1.3, fitup: 1.25, welding: 1.5 },
  'Duplex': { cutting: 1.5, fitup: 1.45, welding: 1.8 }
};
```

### 5.3 Thickness Factors
```javascript
const getThicknessFactor = (thickness, activityType) => {
  if (thickness <= 12) return 1.0;
  if (thickness <= 25) return 1.3;
  if (thickness <= 50) return 1.8;
  return 2.5;
};
```

---

## 6. EXPORT SYSTEM

### 6.1 CSV Export
- Library: Native JavaScript
- Method: Convert array to CSV string
- Download: Create Blob, trigger download

### 6.2 PDF Export (v2)
- Library: jsPDF or html2pdf.js
- Method: Convert HTML to PDF
- Layout: Professional report format

### 6.3 Excel Export (v2)
- Library: SheetJS (xlsx)
- Method: Create workbook from JSON
- Features: Formulas, formatting

---

## 7. PERFORMANCE OPTIMIZATIONS

### 7.1 Frontend
- Lazy loading for routes
- Code splitting
- Image optimization
- Memoization (useMemo, useCallback)
- Virtual scrolling for large lists

### 7.2 Firebase
- Query optimization
- Indexing (Firestore)
- Pagination for large datasets
- Caching strategies

---

## 8. ERROR HANDLING

### 8.1 Global Error Boundary
- Catch React errors
- Display user-friendly message
- Log to console/monitoring

### 8.2 API Error Handling
- Firebase errors mapped to messages
- Retry logic for network failures
- Offline queue (optional)

### 8.3 Form Validation
- Client-side (Yup schema)
- Real-time validation
- Clear error messages

---

**Next Document:** Database Schema