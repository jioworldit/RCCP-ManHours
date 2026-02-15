# RCCP Man-Hours - DRAFT PLAN

**Project:** RCCP Man-Hours Estimation System  
**Phase:** 1 - Planning (Draft)  
**Owner:** Major Jio  
**Date:** 2026-02-15  
**Cost Tier:** 1 (Free - Local tools only)

---

## 🎯 Executive Summary

Building a web-based fabrication man-hour estimation system for heavy engineering products (Pressure Vessels, Process Skids, E-Houses, Structural Steel). The system features a dynamic rule engine that auto-generates activity lists based on technical parameters.

---

## 📋 Scope Definition

### **In Scope:**
- 5-step workflow (Project → Scope → Technical → Activities → Calculation)
- Dynamic scope selection with conditional field display
- Rule engine for auto-generating bill of activities
- Interactive Excel-like calculation grid
- PostgreSQL relational database
- Export to CSV/PDF
- Responsive web UI with stepper navigation

### **Out of Scope (Future Phases):**
- ERP integration
- Machine learning prediction
- Mobile app
- Multi-language support
- Advanced reporting dashboard

---

## 🏗️ Technical Architecture

### **Stack:**
- **Frontend:** React + TypeScript + Tailwind CSS
- **Backend:** Node.js + Express + TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **State Management:** Zustand or Redux Toolkit
- **UI Components:** TanStack Table (for grid), Headless UI
- **Charts:** Recharts (for visualizations)

### **Database:**
- 8 core tables (projects, activities, calculation_rules, etc.)
- Rule engine with formula-based calculations
- Reference tables for materials, welding processes
- See `DATABASE_SCHEMA.md` for full details

### **Key Algorithms:**
- Rule matching engine (filters by scope, material, thickness)
- Formula evaluation with parameter substitution
- Difficulty factor calculation (material × thickness × position × special)
- Real-time recalculation on factor changes

See `LOGIC_FLOW.md` for complete logic documentation.

---

## 📅 Timeline Estimate

| Phase | Captain | Duration | Deliverable |
|-------|---------|----------|-------------|
| **1. Planning** | Major Jio | 4-6 hours | Architecture, DB Schema, Logic Flow |
| **2. Design** | Captain Stitch | 8-12 hours | UI/UX mockups, Grid interface |
| **3. Development** | Captain Anti-B | 20-30 hours | Full-stack implementation |
| **4. Database** | Captain Fire-F | 6-8 hours | PostgreSQL setup, migrations |
| **5. Testing** | Captain QA | 8-12 hours | Testing, edge cases, validation |
| **6. Deployment** | Captain Fire-F | 4-6 hours | Firebase hosting, CI/CD |
| **TOTAL** | - | **50-74 hours** | **(~1 week intensive)** |

---

## 🎖️ Resource Allocation

### **Team:**
- **Major Jio:** Architecture oversight, integration
- **Captain Stitch:** UI/UX design, component library
- **Captain Anti-B:** Full-stack development (2-3 Soldiers)
- **Captain Fire-F:** Database, DevOps
- **Captain QA:** Testing, validation

### **Soldier Tasks:**
- Soldier FE-1: Stepper UI, forms
- Soldier FE-2: Data grid, inline editing
- Soldier BE-1: API endpoints, rule engine
- Soldier BE-2: Database queries, calculations

---

## 💰 Cost Estimate

| Category | Estimated Cost |
|----------|---------------|
| Google One Pro | Included (already have) |
| GCP/Firebase | $20-30 (hosting + DB) |
| OpenRouter/LLM | $10-20 (development assistance) |
| **TOTAL** | **~$30-50** |

**Cost Optimization:** Using Tier 1-2 tools primarily, minimal Tier 3 usage.

---

## ⚠️ Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Complex rule engine logic | High | High | Document thoroughly, unit test formulas |
| Data grid performance | Medium | Medium | Use virtualized table, paginate |
| Calculation accuracy | High | Critical | Validate against industry standards |
| Scope creep | Medium | Medium | Lock requirements before dev phase |

---

## ✅ Success Criteria

- [ ] Rule engine generates accurate activity lists
- [ ] Calculation formulas match industry standards (±10%)
- [ ] Grid supports inline editing with real-time updates
- [ ] Export functionality (CSV/PDF) working
- [ ] UI responsive and user-friendly for engineers
- [ ] All edge cases handled (zero values, extreme inputs)

---

## 🚀 Next Steps

1. **Captain Review:** All Captains review this plan, DB schema, and logic flow
2. **Sanjay Approval:** Review and approve draft plan
3. **Phase 2 Start:** Captain Stitch begins UI/UX design
4. **Soldier Assignment:** Allocate Soldiers to Captain Anti-B

---

## 📚 Documents Created

1. `PROJECT_BRIEF.md` - Initial requirements
2. `DATABASE_SCHEMA.md` - Complete SQL schema (8 tables)
3. `LOGIC_FLOW.md` - Rule engine algorithms and calculations
4. `DRAFT_PLAN.md` - This document

**All documents committed to:** https://github.com/jioworldit/RCCP-ManHours

---

*Cost Tier: 1 (Free - Planning phase complete without API calls)*  
*Status: Awaiting Captain Review & Sanjay Approval*