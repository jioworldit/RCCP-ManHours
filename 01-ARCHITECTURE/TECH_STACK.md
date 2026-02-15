# RCCP Man-Hours - Technology Stack

**Decision Date:** 15 Feb 2026  
**Rationale:** Production-ready, cost-effective, scalable

---

## 1. FRONTEND STACK

### 1.1 Core Framework
| Technology | Version | Purpose | Reason |
|------------|---------|---------|--------|
| **React** | 18.x | UI Framework | Industry standard, component-based, large ecosystem |
| **JavaScript (ES6+)** | Latest | Language | Universal, well-supported |
| **Create React App** | 5.x | Build Tool | Zero-config, optimized production builds |

**Alternative Considered:** Next.js (overkill for this project, SSR not needed)

### 1.2 Styling
| Technology | Purpose | Reason |
|------------|---------|--------|
| **Tailwind CSS** | Utility-first CSS | Rapid development, consistent design, small bundle |
| **CSS Modules** | Component-scoped styles | Encapsulation when needed |

**Alternative Considered:** Material-UI (too heavy, less customizable)

### 1.3 State Management
| Technology | Purpose | Reason |
|------------|---------|--------|
| **React Context API** | Global state | Built-in, sufficient for this app, no extra dependencies |
| **useState/useReducer** | Local state | React built-in, optimal performance |

**Alternative Considered:** Redux (overkill, adds complexity)

### 1.4 Routing
| Technology | Purpose | Reason |
|------------|---------|--------|
| **React Router v6** | SPA Navigation | Industry standard, declarative, lazy loading support |

### 1.5 Forms & Validation
| Technology | Purpose | Reason |
|------------|---------|--------|
| **React Hook Form** | Form handling | Performance, less re-renders, easy validation |
| **Yup** | Schema validation | Declarative, readable, integrates with RHF |

### 1.6 Icons
| Technology | Purpose | Reason |
|------------|---------|--------|
| **Heroicons** | SVG Icons | Clean, consistent, React components available |

---

## 2. BACKEND & INFRASTRUCTURE

### 2.1 Platform
| Technology | Purpose | Reason |
|------------|---------|--------|
| **Firebase** | BaaS Platform | All-in-one: Auth, Database, Hosting, CDN |

**Why Firebase:**
- No server management
- Auto-scaling
- Built-in security
- Generous free tier
- Production-ready

### 2.2 Authentication
| Technology | Purpose | Reason |
|------------|---------|--------|
| **Firebase Authentication** | User Auth | Secure, supports email/password, social login ready |

**Features:**
- Email/Password authentication
- Password reset
- Email verification
- JWT tokens
- Session management

### 2.3 Database
| Technology | Purpose | Reason |
|------------|---------|--------|
| **Cloud Firestore** | NoSQL Database | Real-time, scalable, offline support, querying |

**Why Firestore over Realtime DB:**
- Better querying
- Data structure more flexible
- Stronger typing
- Better offline support

### 2.4 Hosting
| Technology | Purpose | Reason |
|------------|---------|--------|
| **Firebase Hosting** | Web Hosting | Global CDN, SSL, custom domains, CI/CD |

**Features:**
- Automatic HTTPS
- Global CDN (fast loading)
- Custom domain support
- Rollback capability

---

## 3. DEVELOPMENT TOOLS

### 3.1 Code Quality
| Tool | Purpose |
|------|---------|
| **ESLint** | Linting |
| **Prettier** | Code formatting |
| **VS Code** | IDE |

### 3.2 Version Control
| Tool | Purpose |
|------|---------|
| **Git** | Version control |
| **GitHub** | Repository hosting |

### 3.3 Design Tools
| Tool | Purpose | Phase |
|------|---------|-------|
| **Figma** | UI/UX Design | Phase 2 |
| **Google Stitch** | AI Design Assistant | Phase 2 |

### 3.4 Development Tools
| Tool | Purpose | Phase |
|------|---------|-------|
| **Antigravity IDE** | AI Code Generation | Phase 3 |
| **Gemini CLI** | Architecture Planning | Phase 1 |

---

## 4. DEPENDENCIES SUMMARY

### 4.1 Core Dependencies (package.json)
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.x",
    "react-hook-form": "^7.x",
    "yup": "^1.x",
    "@hookform/resolvers": "^3.x",
    "firebase": "^10.x",
    "@heroicons/react": "^2.x",
    "recharts": "^2.x",
    "jspdf": "^2.x",
    "xlsx": "^0.18.x"
  },
  "devDependencies": {
    "tailwindcss": "^3.x",
    "autoprefixer": "^10.x",
    "postcss": "^8.x",
    "eslint": "^8.x",
    "prettier": "^3.x"
  }
}
```

---

## 5. ARCHITECTURE PATTERNS

### 5.1 Component Structure
- **Presentational Components:** Pure UI, no business logic
- **Container Components:** Connect to data, pass to presentational
- **Custom Hooks:** Reusable logic (useAuth, useProjects, etc.)
- **Context Providers:** Global state (AuthContext, ProjectContext)

### 5.2 Data Flow
```
User Action → Component → Context/Hook → Firebase SDK → Firestore
                                      ↓
                              Update State → Re-render UI
```

### 5.3 Folder Structure
```
src/
├── components/        # Reusable UI components
├── pages/            # Route-level pages
├── contexts/         # React Contexts
├── hooks/            # Custom hooks
├── services/         # Firebase integration
├── utils/            # Helper functions
├── styles/           # Global styles
└── App.js           # Root component
```

---

## 6. PERFORMANCE OPTIMIZATIONS

### 6.1 Build Optimizations
- Code splitting (React.lazy)
- Tree shaking
- Gzip compression
- CDN delivery

### 6.2 Runtime Optimizations
- React.memo for expensive components
- useMemo for expensive calculations
- useCallback for stable callbacks
- Virtual scrolling for long lists (if needed)

### 6.3 Data Optimizations
- Firestore query optimization
- Pagination for large datasets
- Caching strategies
- Debounced inputs

---

## 7. SECURITY MEASURES

### 7.1 Authentication
- Firebase Auth (secure, battle-tested)
- JWT tokens
- HTTPS only
- Password validation

### 7.2 Database Security
- Firestore Security Rules
- User-scoped data access
- Input validation
- XSS protection

### 7.3 Hosting Security
- HTTPS enforced
- Security headers
- Content Security Policy

---

## 8. COST ANALYSIS

### 8.1 Firebase Pricing (Estimated Monthly)

**Spark Plan (Free):**
- Authentication: 10k users/month
- Firestore: 50k reads, 20k writes, 20k deletes/day
- Hosting: 10GB transfer, 1GB storage
- **Cost: $0**

**Blaze Plan (Pay-as-you-go):**
- Authentication: Free (included)
- Firestore: ~$0.036 per 100k reads
- Hosting: ~$0.15/GB transferred
- Functions: ~$0.40/million invocations
- **Expected Cost: $0-10/month for moderate usage**

### 8.2 Development Costs
- **Tools:** $0 (all free/open source)
- **Design:** $0 (Figma free tier)
- **Hosting:** $0 (Firebase free tier)

---

## 9. SCALABILITY CONSIDERATIONS

### 9.1 Current Limits
- **Users:** Unlimited (Firebase Auth)
- **Projects:** Unlimited (Firestore)
- **Storage:** 1GB (can upgrade)
- **Transfer:** 10GB/month (can upgrade)

### 9.2 Upgrade Path
If usage exceeds free tier:
1. Enable Blaze plan (pay-as-you-go)
2. Automatic scaling
3. No code changes needed

---

## 10. ALTERNATIVES CONSIDERED

### 10.1 Alternative: Supabase
**Pros:** Open source, PostgreSQL, cheaper  
**Cons:** Newer, smaller ecosystem, less Firebase integration  
**Decision:** Firebase (more mature, better docs)

### 10.2 Alternative: AWS Amplify
**Pros:** AWS ecosystem, scalable  
**Cons:** Complex, steeper learning curve  
**Decision:** Firebase (simpler, faster development)

### 10.3 Alternative: Custom Backend (Node.js + MongoDB)
**Pros:** Full control, flexible  
**Cons:** More maintenance, security responsibility, longer dev time  
**Decision:** Firebase (less maintenance, built-in security)

---

## 11. DECISION SUMMARY

| Layer | Technology | Confidence |
|-------|------------|------------|
| Frontend | React + Tailwind | ⭐⭐⭐⭐⭐ |
| State | Context API | ⭐⭐⭐⭐⭐ |
| Backend | Firebase | ⭐⭐⭐⭐⭐ |
| Auth | Firebase Auth | ⭐⭐⭐⭐⭐ |
| Database | Cloud Firestore | ⭐⭐⭐⭐⭐ |
| Hosting | Firebase Hosting | ⭐⭐⭐⭐⭐ |
| Design | Figma | ⭐⭐⭐⭐⭐ |
| Code Gen | Antigravity IDE | ⭐⭐⭐⭐ |

---

**Next Document:** Risk Assessment