# RCCP Man-Hours - Risk Assessment

**Assessment Date:** 15 Feb 2026  
**Project Phase:** Architecture Planning  
**Risk Level:** Medium (manageable with proper planning)

---

## 1. TECHNICAL RISKS

### 1.1 Risk: Firestore Query Limitations
**Description:** Firestore has limitations on complex queries (no OR queries, limited sorting)  
**Probability:** Medium  
**Impact:** Medium  
**Mitigation:**
- Design schema to support required queries
- Use denormalization where needed
- Composite indexes for complex sorting
- Client-side filtering as fallback

**Status:** Mitigated through proper schema design

---

### 1.2 Risk: Firebase Cold Start
**Description:** Cloud Functions have cold start latency  
**Probability:** Low (using client-side SDK primarily)  
**Impact:** Low  
**Mitigation:**
- Using Firebase client SDK (no serverless functions for MVP)
- All calculations client-side
- Firestore for persistence only

**Status:** Not applicable for this architecture

---

### 1.3 Risk: Calculation Accuracy
**Description:** Man-hour calculations must be accurate (±5%)  
**Probability:** Medium  
**Impact:** High (core feature)  
**Mitigation:**
- Unit tests for all formulas
- Compare with industry standards
- Manual verification during QA
- User testing with real data

**Contingency:** If calculations are off, adjust formulas based on expert input

---

### 1.4 Risk: Mobile Responsiveness
**Description:** Complex data tables hard to use on mobile  
**Probability:** Medium  
**Impact:** Medium  
**Mitigation:**
- Responsive design from day 1
- Mobile-first approach
- Horizontal scrolling for tables
- Card-based layout alternative
- Testing on actual devices

---

### 1.5 Risk: Export Performance
**Description:** Large projects (1000+ activities) may slow exports  
**Probability:** Low  
**Impact:** Low  
**Mitigation:**
- Client-side processing
- Web Workers for background processing
- Streaming for large files
- Progress indicators

---

## 2. PROJECT RISKS

### 2.1 Risk: Scope Creep
**Description:** Adding features beyond MVP  
**Probability:** High  
**Impact:** High (delays, quality issues)  
**Mitigation:**
- Strict MVP definition
- Change control process
- Sanjay approval for changes
- Document v2 features separately

**Escalation:** Major Jio reviews all scope changes

---

### 2.2 Risk: Timeline Pressure
**Description:** Rushing leads to poor quality  
**Probability:** High (based on previous failure)  
**Impact:** High  
**Mitigation:**
- Realistic timeline (20 hours, 5 days)
- Phase gates with approval
- No shortcuts
- Quality over speed

**Contingency:** Extend timeline rather than compromise quality

---

### 2.3 Risk: Tool Learning Curve
**Description:** Antigravity IDE, Figma learning takes time  
**Probability:** Medium  
**Impact:** Low  
**Mitigation:**
- Captains trained on tools
- Fallback to manual if needed
- Documentation review
- Practice runs

---

### 2.4 Risk: Design Approval Delays
**Description:** Sanjay feedback cycle may take time  
**Probability:** Medium  
**Impact:** Medium  
**Mitigation:**
- Clear requirements upfront
- Regular check-ins
- Figma comments for feedback
- Iterative approach

---

## 3. OPERATIONAL RISKS

### 3.1 Risk: Firebase Service Outage
**Description:** Firebase (Google) service downtime  
**Probability:** Very Low (99.95% SLA)  
**Impact:** High (app unavailable)  
**Mitigation:**
- Google's reliability track record
- Offline mode (Firestore)
- Status monitoring
- User communication plan

**Contingency:** Cannot control, accept risk

---

### 3.2 Risk: Data Loss
**Description:** Accidental deletion or corruption  
**Probability:** Low  
**Impact:** High  
**Mitigation:**
- Firestore automatic backups
- Soft deletes (mark deleted, don't remove)
- Audit logs
- User confirmation for destructive actions

---

### 3.3 Risk: Cost Overruns
**Description:** Firebase usage exceeds free tier  
**Probability:** Low (for initial usage)  
**Impact:** Low  
**Mitigation:**
- Monitor usage dashboard
- Set budget alerts
- Optimize queries
- Predictable pricing

---

## 4. SECURITY RISKS

### 4.1 Risk: Data Breach
**Description:** Unauthorized access to project data  
**Probability:** Low (Firebase security)  
**Impact:** High  
**Mitigation:**
- Firestore Security Rules
- Authentication required
- User-scoped data access
- HTTPS only
- Regular security audits

---

### 4.2 Risk: XSS/Injection Attacks
**Description:** Malicious input from users  
**Probability:** Low  
**Impact:** Medium  
**Mitigation:**
- React automatic escaping
- Input validation (Yup)
- CSP headers
- No dangerouslySetInnerHTML

---

## 5. BUSINESS RISKS

### 5.1 Risk: User Adoption
**Description:** Users don't adopt the tool  
**Probability:** Unknown  
**Impact:** High  
**Mitigation:**
- User-friendly UI/UX
- Training materials
- Support documentation
- Gather feedback early

**Contingency:** Iterate based on user feedback

---

### 5.2 Risk: Competition
**Description:** Existing tools in market  
**Probability:** High  
**Impact:** Low  
**Mitigation:**
- Focus on specific use case (fabrication)
- Industry-specific features
- Competitive pricing (free)
- Continuous improvement

---

## 6. RISK MATRIX

| Risk | Probability | Impact | Score | Status |
|------|-------------|--------|-------|--------|
| Scope Creep | High | High | 9 | Active Monitoring |
| Timeline Pressure | High | High | 9 | Active Monitoring |
| Calculation Accuracy | Medium | High | 6 | Mitigated |
| Mobile Responsiveness | Medium | Medium | 4 | Mitigated |
| Firestore Limitations | Medium | Medium | 4 | Mitigated |
| Data Loss | Low | High | 3 | Mitigated |
| Firebase Outage | Very Low | High | 2 | Accepted |
| Security Breach | Low | High | 2 | Mitigated |
| Cost Overruns | Low | Low | 1 | Monitored |

**Risk Score Scale:** 1-3 (Low), 4-6 (Medium), 7-9 (High)

---

## 7. MITIGATION STRATEGIES

### 7.1 High Priority (Score 7-9)
1. **Scope Creep:** Strict change control, daily reviews
2. **Timeline Pressure:** Realistic estimates, no shortcuts, buffer time

### 7.2 Medium Priority (Score 4-6)
1. **Calculation Accuracy:** Unit tests, industry validation
2. **Mobile Responsiveness:** Mobile-first design, device testing
3. **Firestore Limitations:** Proper schema, composite indexes

### 7.3 Low Priority (Score 1-3)
1. Monitor and accept (Firebase reliability, security)

---

## 8. CONTINGENCY PLANS

### 8.1 If Calculations Are Wrong
- Audit formula with industry experts
- Adjust multipliers based on feedback
- Release patch quickly

### 8.2 If Timeline Slips
- Cut v2 features (export, AI)
- Extend timeline (better than bad product)
- Add more resources (if available)

### 8.3 If Firebase Has Issues
- Switch to Supabase (migration path)
- Use local-first architecture
- Queue changes for sync

---

## 9. RISK MONITORING

### 9.1 Daily Checks
- Timeline progress
- Scope changes
- Blockers

### 9.2 Weekly Reviews
- Risk register update
- Mitigation effectiveness
- New risks identification

### 9.3 Escalation Triggers
- Timeline slip > 20%
- Scope change requested
- Technical blocker > 4 hours
- Quality concerns

**Escalate to:** Major Jio → Sanjay

---

## 10. LESSONS FROM PREVIOUS FAILURE

### 10.1 What Went Wrong (Previous Attempt)
- Rushed development (5 hours vs 20 hours)
- Skipped architecture phase
- No design phase (Figma)
- Used wrong tools (manual coding)
- No testing
- No quality gates

### 10.2 How We're Preventing It
- ✅ Proper 20-hour timeline
- ✅ This architecture document (Phase 1)
- ✅ Figma design phase (Phase 2)
- ✅ Antigravity IDE for coding (Phase 3)
- ✅ QA phase (Phase 4)
- ✅ Approval gates at each phase

---

## 11. RISK ACCEPTANCE

**Accepted Risks (cannot mitigate):**
- Firebase service outage (very rare)
- User adoption (unknown market)
- Competition (external factor)

**Monitoring:**
- Firebase status page
- User feedback
- Market research

---

**Risk Assessment Complete**

**Confidence Level:** High (risks identified and mitigated)

**Recommendation:** Proceed with project, maintain risk register

**Next:** System Design Document