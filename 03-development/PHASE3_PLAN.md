# RCCP Man-Hours - Phase 3 Development Plan

**Status:** APPROVED - Phase 3 Start  
**Date:** 15 Feb 2026, 17:05 GST  
**Owner:** Captain Anti-B  
**Duration:** 48 hours (3 working days)

---

## 🎯 Phase 3 Objectives

1. **Connect Frontend to Backend** - All 7 screens functional
2. **Implement CRUD Operations** - Full data persistence
3. **Authentication Flow** - Login/logout working
4. **Calculation Engine** - Real-time man-hour calculations
5. **Review & Implement** - All Sanjay's feedback addressed

---

## 📋 Sanjay's Feedback Review & Implementation

### ✅ Already Implemented:
- [x] Login page
- [x] Dashboard with project list (number, name, customer, total hours)
- [x] Drill-down to activity details
- [x] Product selection (PV, Skids, E-house, Structure, Other)
- [x] Separate workflow for each product type
- [x] Component-wise entry (Shells, Dish heads, Nozzles, etc.)
- [x] Detailed checklist with sub-checklist
- [x] Save/Load templates for checkpoints
- [x] Activity code in first column
- [x] Manpower requirements (Fabricators, Welders, Fitters, Helpers)
- [x] Welding process options (SMAW, GTAW, GMAW, FCAW, SAW + combinations)
- [x] Compact UI
- [x] Professional branding

### 🔄 To Implement in Phase 3:
- [ ] **Database Integration** - All screens connected to PostgreSQL
- [ ] **Authentication** - JWT token handling, session management
- [ ] **Calculation Engine** - Real-time formulas with material factors
- [ ] **Export Functions** - CSV/PDF/Excel generation
- [ ] **Template System** - Save/load scope templates to database
- [ ] **Responsive Design** - Mobile/tablet optimization

### 📅 Phase 7 (Future):
- [ ] **AI Productivity Norms** - ML-based hour recommendations
- [ ] **Smart Suggestions** - Auto-populate based on historical data

---

## 🏗️ Development Tasks

### **Sprint 3.1: Authentication & Core Setup (8 hours)**
**Captain Anti-B + 2 Soldiers**

- [ ] Connect React frontend to Express backend
- [ ] Implement JWT authentication flow
- [ ] Login/logout functionality
- [ ] Protected routes middleware
- [ ] User context/state management

**Deliverable:** Working login system with session persistence

---

### **Sprint 3.2: Project CRUD (8 hours)**
**Soldier FE-1 + Soldier BE-1**

- [ ] Dashboard: Fetch projects from API
- [ ] Dashboard: Search and filter functionality
- [ ] Project Entry: Create new project
- [ ] Project Entry: Edit existing project
- [ ] Project Entry: Delete project
- [ ] Dashboard: Real-time total hours display

**Deliverable:** Full project management (Create, Read, Update, Delete)

---

### **Sprint 3.3: Components & Scope (8 hours)**
**Soldier FE-2 + Soldier BE-2**

- [ ] Components screen: Save to database
- [ ] Components screen: Load from database
- [ ] Scope selection: Save checklist to database
- [ ] Scope selection: Template save/load functionality
- [ ] Technical parameters: Save/load

**Deliverable:** Component and scope data persistence

---

### **Sprint 3.4: Activities & Calculations (12 hours)**
**Captain Anti-B + Soldier BE-3**

- [ ] Activities grid: Load from database
- [ ] Activities grid: Auto-generate from rules
- [ ] Calculation engine: Material factor multipliers
- [ ] Calculation engine: Thickness-based adjustments
- [ ] Calculation engine: Real-time total updates
- [ ] Manpower allocation calculations
- [ ] Welding process time factors

**Deliverable:** Working calculation engine with accurate man-hours

---

### **Sprint 3.5: Results & Export (8 hours)**
**Soldier FE-3 + Soldier BE-4**

- [ ] Results dashboard: Aggregate calculations
- [ ] Charts and visualizations
- [ ] CSV export functionality
- [ ] PDF report generation
- [ ] Excel export with formulas
- [ ] Print-friendly layout

**Deliverable:** Export functionality complete

---

### **Sprint 3.6: Integration & Testing (8 hours)**
**Captain Anti-B + Captain QA**

- [ ] End-to-end workflow testing
- [ ] Authentication flow testing
- [ ] Calculation accuracy validation
- [ ] Cross-browser testing
- [ ] Mobile responsiveness check
- [ ] Bug fixes and polish

**Deliverable:** Fully functional MVP ready for deployment

---

## 🛠️ Technical Stack

**Frontend:**
- React 18 + TypeScript
- React Router (navigation)
- Axios (API calls)
- Context API (state management)
- Recharts (charts)

**Backend:**
- Node.js + Express
- PostgreSQL + Prisma ORM
- JWT (authentication)
- bcrypt (password hashing)
- Multer (file uploads for exports)

**Integration:**
- REST API
- JSON data format
- Bearer token auth

---

## 📅 Timeline (GST)

| Sprint | Task | Duration | Completion |
|--------|------|----------|------------|
| 3.1 | Auth & Setup | 8 hrs | 16 Feb, 14:00 |
| 3.2 | Project CRUD | 8 hrs | 17 Feb, 10:00 |
| 3.3 | Components & Scope | 8 hrs | 17 Feb, 18:00 |
| 3.4 | Activities & Calc | 12 hrs | 18 Feb, 14:00 |
| 3.5 | Results & Export | 8 hrs | 19 Feb, 10:00 |
| 3.6 | Integration & Test | 8 hrs | 19 Feb, 18:00 |

**Phase 3 Complete:** 19 Feb 2026, 18:00 GST

---

## 🎖️ Team Assignment

**Lead:** Captain Anti-B (Full-Stack Architect)  
**Soldiers:**
- FE-1: Frontend dashboard & projects
- FE-2: Frontend components & scope
- FE-3: Frontend activities & results
- BE-1: Backend projects API
- BE-2: Backend components API
- BE-3: Backend calculations engine
- BE-4: Backend exports & reports

---

## ✅ Success Criteria

- [ ] User can login/logout
- [ ] User can create, edit, delete projects
- [ ] All 7 screens fully functional
- [ ] Data persists to PostgreSQL
- [ ] Calculations are accurate (±5% of manual calc)
- [ ] Exports work (CSV, PDF, Excel)
- [ ] Mobile responsive
- [ ] No critical bugs

---

## 📊 Risk Mitigation

| Risk | Mitigation |
|------|------------|
| API integration issues | Daily standups, early testing |
| Calculation errors | Unit tests for all formulas |
| Performance issues | Database indexing, query optimization |
| Scope creep | Strict adherence to MVP |

---

**Document Version:** 1.0  
**Last Updated:** 15 Feb 2026, 17:05 GST  
**Status:** Active Development

---

*All times in GST (Gulf Standard Time, UTC+4)*