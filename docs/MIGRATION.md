# Dillon Consulting Migration Guide

## Executive Summary

This document outlines the complete migration strategy to transform the SCC Intelligence Platform (insurance claims processing) into the **Dillon AI Intelligence Platform** - a cutting-edge AI-powered consulting and engineering assistant designed specifically for Dillon Consulting Limited.

**Migration Overview:**
- **From**: SCC Insurance Claims Processing Platform
- **To**: Dillon Consulting Engineering & Project Intelligence Platform
- **Timeline**: Single sprint migration for demo readiness
- **Approach**: Preserve UI/UX excellence, rebrand identity, transform domain content

---

## 1. Brand Identity Transformation

### 1.1 Color Palette Migration

| Element | Old (SCC) | New (Dillon) | Implementation |
|---------|-----------|--------------|----------------|
| Primary Brand | `#9A2824` (Deep Red) | `#08353F` (Forest Green/Teal) | Replace all `scc-red` references |
| Primary UI | `#2B2B2B` (Dark Gray) | `#08353F` (Dillon Green) | Main buttons, headers, active states |
| Secondary | `#707070` (Professional Gray) | `#707070` (Keep Gray) | Secondary actions, text |
| Dark Text | `#2B2B2B` (Dark Gray) | `#2B2B2B` (Keep) | Body text, headings |
| Light Background | `#F5F5F5` (Light Gray) | `#F9FAFB` (Lighter Gray) | Backgrounds, cards |
| Success | `#00A651` (Green) | `#00A651` (Keep) | Success states, positive metrics |
| Accent White | N/A | `#FFFFFF` | Clean, minimalist design element |

### 1.2 Tailwind Configuration Updates

**New Dillon Color System:**
```javascript
colors: {
  dillon: {
    // Primary Brand Colors
    green: "#08353F",           // Primary Dillon Green (dark teal)
    "green-dark": "#06252B",    // Darker green for hover states
    "green-light": "#0A4550",   // Lighter green for backgrounds

    // UI Foundation (Keep professional grays)
    "ui-primary": "#08353F",    // Dillon Green for main UI
    gray: "#707070",            // Professional Gray
    "gray-dark": "#2B2B2B",     // Dark Gray Text
    "gray-light": "#F9FAFB",    // Light Gray Background

    // Gray Scale (Keep existing)
    "gray-900": "#1A1A1A",
    "gray-800": "#2B2B2B",
    "gray-700": "#404040",
    "gray-600": "#525252",
    "gray-500": "#707070",
    "gray-400": "#A0A0A0",
    "gray-300": "#D0D0D0",
    "gray-200": "#E0E0E0",
    "gray-100": "#F9FAFB",
    "gray-50": "#FCFCFC",

    // Semantic Colors (Keep existing)
    success: "#00A651",
    warning: "#F59E0B",
    error: "#DC2626",
    info: "#3B82F6"
  }
}
```

### 1.3 Logo & Brand Assets

**Logo Migration:**
- **Source**: https://www.dillon.ca/wp-content/uploads/2024/01/dillon-logo.svg
- **Location**: `/public/images/dillon_logo.svg` (replace scc_logo.png)
- **Formats**: SVG (primary), PNG fallback for compatibility
- **Usage**: Sidebar, mobile nav, footer, loading states

**Brand Metadata:**
- **Company Name**: Dillon Consulting Limited
- **Tagline**: "Making life work better"
- **Founded**: 1946
- **Employees**: 1,100+
- **Offices**: 25+ across Canada
- **Ownership**: Employee-owned

---

## 2. AI Assistant Transformation: Scotty → Dillon

### 2.1 Global Name Replacement

**Find & Replace Pattern:**
- `Scotty` → `Dillon` (35 files)
- `scotty` → `dillon` (lowercase variants)
- `SCOTTY` → `DILLON` (uppercase variants)

**Key Files Requiring Updates:**
```
lib/ai/system-prompts.ts
lib/ai/prompts/scotty-leads-prompt.ts → dillon-projects-prompt.ts
lib/ai/prompts/scotty-claims-prompt.ts → dillon-contracts-prompt.ts
components/virtual-assistant.tsx
components/Sidebar.tsx
components/MobileBottomNav.tsx
lib/constants/brand.ts
app/api/scotty-claims/ → app/api/dillon-contracts/
app/api/scotty-leads/ → app/api/dillon-projects/
```

### 2.2 AI Persona & System Prompt Transformation

**New Dillon AI Identity:**

```typescript
export const DILLON_AI_PERSONA = {
  name: 'Dillon',
  title: 'AI Engineering & Consulting Intelligence Assistant',
  company: 'Dillon Consulting Limited',
  expertise: [
    'Engineering project management',
    'Environmental sciences & assessments',
    'Infrastructure planning & development',
    'Contract lifecycle management',
    'Regulatory compliance & documentation',
    'Site assessment & analysis',
    'Multi-disciplinary project coordination',
    'Knowledge base & best practices',
    'Project documentation & reporting'
  ],
  persona: `You are Dillon, the elite AI-powered engineering and consulting intelligence assistant for Dillon Consulting Limited.

  Your PRIMARY mission is to streamline operations, reduce administrative burdens, accelerate project lifecycles, and ensure quality across engineering, environmental, infrastructure, and planning projects.

  ## WHO YOU ARE: DILLON'S CORE IDENTITY

  **Professional Persona:**
  - A master project coordinator specializing in engineering and environmental consulting
  - Professional, efficient, and laser-focused on operational excellence
  - Passionate about reducing rework, enforcing quality standards, and capturing institutional knowledge
  - Expert at quickly identifying process improvements and optimization opportunities
  - Skilled at navigating complex regulatory requirements and multi-stakeholder projects
  - You work for DILLON CONSULTING - an employee-owned firm making life work better since 1946

  **Your PRIMARY Mission:**
  - Streamline document-heavy workflows (proposals, reports, compliance docs)
  - Accelerate project lifecycles through intelligent automation
  - Reduce administrative burden on engineers and consultants
  - Ensure regulatory compliance and quality assurance
  - Capture and leverage institutional knowledge across 1,100+ employees
  - Coordinate multi-disciplinary teams (planning, engineering, environmental, infrastructure)

  **Your Business Model Understanding:**
  - Dillon is an employee-owned Canadian consulting firm (since 1946)
  - 25+ offices, 1,100+ employees across Canada
  - Service areas: Planning, Engineering, Environmental Sciences, Infrastructure, Management
  - Project-based billing with complex multi-stakeholder coordination
  - Legacy workflows with document-heavy operations requiring modernization

  **Your Expertise Domains:**

  ### Engineering & Infrastructure
  - **Civil Engineering**: Infrastructure design, transportation, water/wastewater systems
  - **Structural Engineering**: Building design, assessment, rehabilitation
  - **Environmental Engineering**: Remediation, contaminated sites, brownfield development
  - **Geotechnical Engineering**: Soil analysis, foundation design, slope stability

  ### Environmental Sciences
  - **Environmental Impact Assessment (EIA)**: Regulatory compliance, baseline studies
  - **Site Assessment**: Phase I/II/III ESAs, contamination investigation
  - **Remediation Planning**: Cleanup strategies, risk management, monitoring
  - **Climate Adaptation**: Resilience planning, flood risk, sustainability

  ### Planning & Management
  - **Community Planning**: Land use, zoning, development approvals
  - **Infrastructure Asset Management**: Lifecycle planning, condition assessment
  - **Project Management**: Scheduling, budgeting, stakeholder coordination
  - **Contract Management**: RFPs, procurement, delivery, closeout

  ### Regulatory & Compliance
  - **Canadian Environmental Regulations**: Federal/provincial requirements, permitting
  - **Building Codes & Standards**: CSA, NBC, provincial codes
  - **Municipal Bylaws**: Zoning, development, infrastructure standards
  - **Safety Standards**: OH&S, environmental health, site safety`
}
```

---

## 3. Terminology & Domain Migration

### 3.1 Core Terminology Mapping

| Insurance/Claims Concept | Dillon Consulting Equivalent | Rationale |
|--------------------------|------------------------------|-----------|
| **Claims** | **Contracts / Projects** | Primary work unit in consulting |
| **Claim Assessment** | **Project Scoping** | Initial evaluation phase |
| **Policy Review** | **Contract Review** | Document analysis |
| **Property Inspection** | **Site Assessment** | Field work / evaluation |
| **Damage Analysis** | **Condition Assessment** | Technical evaluation |
| **Settlement** | **Project Deliverable / Completion** | Final outcome |
| **Policyholder** | **Client / Stakeholder** | Customer terminology |
| **Insurance Company** | **Client Organization / Authority** | Project sponsor |
| **Adjuster** | **Consultant / Engineer** | Professional role |
| **Coverage Analysis** | **Scope Analysis** | Work definition |
| **Loss Report** | **Technical Report / Assessment** | Documentation |
| **Claim File** | **Project File** | Record keeping |
| **Premium** | **Contract Value / Fee** | Financial terms |
| **Deductible** | **Client Contribution** | Cost sharing |
| **Underwriting** | **Proposal Development** | Pre-project work |

### 3.2 Page & Route Renaming

| Old Route | New Route | Purpose |
|-----------|-----------|---------|
| `/dashboard/claims` | `/dashboard/contracts` | Project/contract management |
| `/dashboard/inspection` | `/dashboard/assessments` | Site assessments & evaluations |
| `/claim-assessment` | `/project-scoping` | Initial project evaluation |
| `/claims/[id]` | `/contracts/[id]` | Individual project detail |
| `/api/scotty-claims` | `/api/dillon-contracts` | Contract AI assistant API |
| `/api/scotty-leads` | `/api/dillon-projects` | Project generation API |

### 3.3 UI Component Text Updates

**Navigation Menu Updates:**
```typescript
const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    description: 'Overview & Project KPIs'
  },
  {
    title: 'Contracts',
    icon: FileSearch,
    href: '/dashboard/contracts',
    description: 'Active contracts & lifecycle management'
  },
  {
    title: 'Dillon AI',
    icon: Brain,
    href: '/dashboard/assistant',
    description: 'AI-powered engineering & consulting assistant'
  },
  {
    title: 'Assessments',
    icon: CalendarDays,
    href: '/dashboard/assessments',
    description: 'Schedule and manage site assessments'
  },
  {
    title: 'Reports',
    icon: FileCheck,
    href: '/dashboard/reports',
    description: 'Technical reports & deliverables'
  }
]
```

**Sidebar Footer Updates:**
```typescript
// Old: NO RECOVERY, NO FEE
// New: MAKING LIFE WORK BETTER

<div className="text-xs text-gray-500 dark:text-gray-400">
  <p className="font-semibold mb-1">MAKING LIFE WORK BETTER</p>
  <p>AI-powered consulting excellence</p>
  <p className="mt-2">© 2025 Dillon Consulting</p>
</div>
```

---

## 4. Technical Implementation Strategy

### 4.1 AI Technology Stack (Preserve & Adapt)

**Current Stack (Keep):**
- ✅ RAG (Retrieval Augmented Generation) - Knowledge base for best practices, standards, past projects
- ✅ STT (Speech-to-Text) - Field voice notes, meeting transcription
- ✅ TTS (Text-to-Speech) - Accessibility, hands-free operation
- ✅ Computer Vision - Drone imagery analysis, site condition assessment, infrastructure inspection
- ✅ PDF Generation - Technical reports, proposals, compliance documentation
- ✅ ChromaDB - Vector embeddings for semantic search across project history
- ✅ OpenAI/Anthropic - LLM for document generation, analysis, summarization

**New Dillon-Specific Adaptations:**

1. **RAG Knowledge Base Content:**
   - Engineering standards (CSA, NBC, provincial codes)
   - Environmental regulations (federal/provincial)
   - Dillon project history & case studies
   - Best practices & lessons learned
   - Contract templates & precedents
   - Technical guidelines & procedures

2. **Computer Vision Use Cases:**
   - Infrastructure condition assessment (roads, bridges, utilities)
   - Environmental site analysis (contamination indicators, vegetation)
   - Drone imagery processing (topography, site boundaries)
   - Construction progress monitoring
   - Asset inventory & condition cataloging

3. **Document Generation:**
   - Environmental Impact Assessments (EIA)
   - Phase I/II/III ESA reports
   - Technical feasibility studies
   - Proposal generation & RFP responses
   - Regulatory compliance documentation
   - Progress reports & status updates

4. **Voice & Field Capture:**
   - Field engineer voice notes during site visits
   - Safety observation logging
   - Real-time data capture for environmental monitoring
   - Meeting minutes & action item extraction

### 4.2 File Migration Plan (34 Core Files)

**Phase 1: Brand Foundation (3 files)**
1. `tailwind.config.ts` - Color system update
2. `lib/constants/brand.ts` - Brand configuration
3. `app/globals.css` - CSS variables & utilities

**Phase 2: Core Components (8 files)**
4. `components/Sidebar.tsx` - Navigation & logo
5. `components/MobileBottomNav.tsx` - Mobile navigation
6. `components/virtual-assistant.tsx` - AI assistant UI
7. `components/roi-calculator.tsx` - Update metrics/calculations
8. `components/AddressAutocomplete.tsx` - Adapt for project locations
9. `components/ui/sources-section.tsx` - Reference materials
10. `components/ui/sources-modal.tsx` - Reference modal
11. `components/ui/chatgpt-prompt-input.tsx` - AI input component

**Phase 3: Dashboard Pages (14 files)**
12. `app/dashboard/page.tsx` - Main dashboard
13. `app/dashboard/claims/page.tsx` → `contracts/page.tsx` - Contract list
14. `app/dashboard/claims/[id]/page.tsx` → `contracts/[id]/page.tsx` - Contract detail
15. `app/dashboard/inspection/page.tsx` → `assessments/page.tsx` - Assessment list
16. `app/dashboard/inspection/[id]/start/page.tsx` - Start assessment
17. `app/dashboard/inspection/[id]/continue/page.tsx` - Continue assessment
18. `app/dashboard/inspection/[id]/areas/page.tsx` - Assessment areas
19. `app/dashboard/inspection/[id]/area/[areaId]/page.tsx` - Area detail
20. `app/dashboard/inspection/[id]/review/page.tsx` - Review assessment
21. `app/dashboard/inspection/[id]/report/page.tsx` - Generate report
22. `app/dashboard/reports/page.tsx` - Reports list
23. `app/dashboard/reports/[id]/review/page.tsx` - Report review
24. `app/page.tsx` - Landing/redirect page
25. `app/landing/page.tsx` - Marketing landing

**Phase 4: AI & Backend (8 files)**
26. `lib/ai/system-prompts.ts` - Core AI prompts
27. `lib/ai/prompts/scotty-leads-prompt.ts` → `dillon-projects-prompt.ts`
28. `lib/ai/prompts/scotty-claims-prompt.ts` → `dillon-contracts-prompt.ts`
29. `app/api/scotty-claims/chat/route.ts` → `dillon-contracts/chat/route.ts`
30. `app/api/scotty-leads/chat/route.ts` → `dillon-projects/chat/route.ts`
31. `app/api/assistant/unified/route.ts` - Unified AI endpoint
32. `app/api/assistant/chat/route.ts` - Chat endpoint
33. `lib/utils/pdf-generator.ts` - Report generation

**Phase 5: Admin & Demo (3 files)**
34. `app/admin/page.tsx` - Admin dashboard
35. `app/admin/claims-center/page.tsx` → `contracts-center/page.tsx`
36. `app/demo/page.tsx` - Interactive demo

---

## 5. Business Model & Value Proposition Alignment

### 5.1 Dillon's Pain Points (AI Solutions)

| Pain Point | Current State | AI Solution | Impact |
|------------|--------------|-------------|--------|
| **Document-heavy workflows** | Manual report writing, 20-40hrs per technical report | AI-generated reports with human review, 4-8hrs | 70-80% time savings |
| **Field data capture** | Handwritten notes, later transcription, errors | Voice-to-text with automatic structuring | 60% faster, fewer errors |
| **Knowledge silos** | 1,100+ employees, inconsistent best practices | RAG-powered knowledge base, instant access | Institutional knowledge capture |
| **Regulatory compliance** | Manual checklist review, missed requirements | AI compliance checking against regulations | 95% accuracy, reduce risk |
| **Proposal development** | 40-80hrs per RFP response, rushed submissions | AI-assisted proposal generation from past wins | 50-60% faster, higher quality |
| **Multi-discipline coordination** | Email chains, version conflicts, delays | Centralized AI assistant coordinating workflows | Reduced rework by 40% |
| **Site assessment variability** | Inconsistent inspection quality across engineers | Standardized AI-guided assessment workflows | Quality consistency |
| **Contract lifecycle tracking** | Spreadsheets, manual updates, status gaps | Automated tracking with predictive insights | Real-time visibility |

### 5.2 Dillon's Competitive Advantages (AI Moat)

**Defensibility Strategy:**

1. **Growing Knowledge Base**
   - Each project feeds embeddings → smarter recommendations
   - Proprietary domain-specific fine-tuning on Dillon's 75+ years of project data
   - Network effects: More projects = Better AI = More wins

2. **Workflow Lock-In**
   - Once multiple teams adopt, switching cost is high
   - Integration with GIS/CAD/environmental data pipelines
   - Custom workflows aligned to Dillon's processes

3. **Data Network Effects**
   - Project outcomes feed back into proposal models
   - Predictive analytics improve with scale
   - Cross-project learning (brownfield insights apply to future sites)

4. **Deep Integration**
   - Esri/GIS partnership integration
   - Environmental database connections
   - Municipal/regulatory API integrations
   - CAD/BIM workflow embedding

5. **Rich User Experience**
   - Voice-first field operations (hard for generic tools)
   - Multi-modal AI (text, voice, vision, geospatial)
   - Agentic assistants (autonomous workflow execution)
   - Domain-specific UI/UX optimized for engineers

### 5.3 Demo Value Propositions (Messaging)

**Primary Messages:**

1. **"Cut Project Lifecycle Time in Half"**
   - Demo: Site assessment → AI report generation in 2 hours vs. 2 days
   - Show: Voice notes → structured data → compliance-checked report

2. **"Eliminate Administrative Burden"**
   - Demo: AI assistant handles document routing, status updates, reminders
   - Show: Engineer focuses on technical work, AI handles admin

3. **"Never Lose Institutional Knowledge Again"**
   - Demo: Query past projects for best practices, lessons learned
   - Show: RAG system retrieving relevant precedents instantly

4. **"Ensure 100% Compliance, Every Time"**
   - Demo: AI cross-checks report against current regulations
   - Show: Automated flagging of missing requirements, citations

5. **"Win More Proposals with AI-Powered Intelligence"**
   - Demo: RFP analysis → past project matching → proposal draft in minutes
   - Show: AI assembles proposal sections from winning templates

---

## 6. Demo Scenarios (Tailored for Dillon)

### 6.1 Scenario 1: Environmental Site Assessment (ESA)

**User Story:**
> "As a Senior Environmental Consultant, I need to conduct a Phase II ESA for a former industrial site and generate a compliant technical report within 48 hours."

**Demo Flow:**

1. **Initiate Assessment**
   - Create new project: "Former Manufacturing Site - 123 Industrial Rd"
   - AI suggests assessment areas based on historical use (from knowledge base)
   - Upload drone imagery + historical aerial photos

2. **Field Data Capture (Voice)**
   - Engineer walks site, dictates observations:
     - "Visible soil staining in northeast quadrant, approximately 20 square meters"
     - "Strong petroleum odor detected near former loading dock"
     - "Standing water in retention pond, discolored"
   - AI transcribes, structures, tags locations on map

3. **Computer Vision Analysis**
   - AI analyzes drone imagery for:
     - Vegetation stress patterns (contamination indicators)
     - Surface anomalies (buried tanks, disturbed soil)
     - Change detection vs. historical aerials
   - Generates visual annotations + recommended sampling locations

4. **AI Report Generation**
   - Input: Field notes + lab results + imagery analysis
   - Output: Draft Phase II ESA report (75 pages)
     - Executive summary
     - Site history & background
     - Methodology & findings
     - Risk assessment
     - Recommendations
     - Regulatory compliance checklist (auto-verified)
   - Human review + edits → Final report in 6 hours (vs. 3 days manual)

5. **Knowledge Capture**
   - Project learnings embedded in knowledge base
   - Similar future projects benefit from this experience

**KPIs Demonstrated:**
- Time savings: 75% (6hrs vs. 24hrs)
- Compliance accuracy: 100% (AI-verified)
- Cost reduction: $8,000 saved in consultant hours
- Quality: Consistent structure, comprehensive analysis

---

### 6.2 Scenario 2: Infrastructure Condition Assessment

**User Story:**
> "As a Municipal Engineer, I need to assess the condition of 50km of road network and prioritize rehabilitation projects with budget constraints."

**Demo Flow:**

1. **Project Setup**
   - Create project: "Municipal Road Condition Assessment 2025"
   - Define scope: 50km network, budget $5M
   - AI loads past assessment data (if available)

2. **Data Collection**
   - Upload: Drone footage, pavement sensor data, maintenance records
   - AI analyzes:
     - Crack density & severity (computer vision)
     - Rutting & deformation (3D modeling)
     - Drainage issues (water pooling detection)
   - Generates condition scores per segment

3. **Prioritization & Optimization**
   - AI recommends:
     - Critical repairs (safety risk)
     - Cost-effective preventive maintenance
     - Deferred projects (budget optimization)
   - Interactive map: Color-coded priority segments
   - Budget allocation suggestions

4. **Report & Presentation**
   - Auto-generate:
     - Technical assessment report
     - Executive summary for council
     - Public communication materials (simplified)
   - Include: Maps, photos, cost tables, recommendations

**KPIs Demonstrated:**
- Speed: 2 weeks vs. 8 weeks manual
- Coverage: 100% network vs. 30% sample-based
- Cost optimization: $500K savings via smart prioritization
- Data-driven: Objective scoring vs. subjective judgment

---

### 6.3 Scenario 3: Contract Lifecycle Management

**User Story:**
> "As a Project Manager, I need to track multiple contracts across different stages, ensure deliverables are met, and proactively manage risks."

**Demo Flow:**

1. **Dashboard Overview**
   - 15 active contracts displayed
   - Status: On-track (10), At-risk (3), Delayed (2)
   - AI flags: "Contract #A123 deliverable due in 3 days, 60% complete"

2. **AI-Powered Insights**
   - Predictive alerts:
     - "Budget overrun risk: Contract #B456 trending 15% over"
     - "Scope creep detected: Contract #C789 added 12 tasks not in SOW"
   - Recommendations:
     - "Schedule client check-in for Contract #A123"
     - "Request change order for Contract #C789"

3. **Document Management**
   - AI assistant: "Show me all addendums for Contract #B456"
   - Instant retrieval + summarization
   - Version control + audit trail

4. **Automated Workflows**
   - Milestone reached → AI generates progress report → Routes for approval
   - Contract nearing end → AI drafts closeout checklist
   - Invoice due → AI compiles supporting documentation

**KPIs Demonstrated:**
- Administrative time: 80% reduction (AI handles routine tasks)
- Risk mitigation: Proactive alerts prevent 90% of issues
- Client satisfaction: Faster response, better communication
- Profitability: Budget variance reduced by 25%

---

## 7. KPI Dashboard Transformation

### 7.1 Insurance KPIs → Consulting KPIs

| Old KPI (Insurance) | New KPI (Consulting) | Calculation |
|---------------------|----------------------|-------------|
| Total Claims Recovered | Total Contract Value | Sum of active + completed contracts |
| Average Claim Value | Average Project Value | Mean contract value |
| Settlement Rate | Project Completion Rate | (Completed / Total) * 100 |
| Active Claims | Active Projects | Count of in-progress contracts |
| Claims Pending Review | Projects Pending Approval | Count requiring client/internal approval |
| Recovery Ratio | Profitability Margin | (Revenue - Cost) / Revenue * 100 |
| Days to Settlement | Project Cycle Time | Average days from start to completion |
| Client Satisfaction | Client Satisfaction | NPS or rating (1-5 scale) |
| Policy Types Served | Service Verticals | Planning, Engineering, Environmental, etc. |
| Claim Success Rate | Proposal Win Rate | (Won / Submitted) * 100 |

### 7.2 Dashboard Metrics (Mock Data for Demo)

```typescript
const DILLON_DEMO_METRICS = {
  totalContractValue: 12500000,        // $12.5M active contracts
  activeProjects: 47,                   // 47 ongoing projects
  completedThisQuarter: 23,             // 23 delivered projects
  averageProjectValue: 265000,          // $265K average
  projectCompletionRate: 94,            // 94% on-time delivery
  profitabilityMargin: 22,              // 22% margin
  averageCycleTime: 45,                 // 45 days average
  clientSatisfaction: 4.6,              // 4.6/5.0 rating
  proposalWinRate: 68,                  // 68% win rate
  serviceVerticals: {
    planning: 12,
    engineering: 18,
    environmental: 11,
    infrastructure: 6
  },
  aiTimeSavings: 1240,                  // 1,240 hours saved this quarter
  documentsGenerated: 156,              // 156 AI-generated reports
  complianceRate: 100                   // 100% compliance (AI-verified)
}
```

---

## 8. Implementation Checklist

### Phase 1: Foundation (Day 1, AM)
- [ ] Update `tailwind.config.ts` with Dillon color system
- [ ] Download Dillon logo → `/public/images/dillon_logo.svg`
- [ ] Update `lib/constants/brand.ts` with Dillon brand config
- [ ] Update `app/globals.css` with new CSS variables
- [ ] Test: Build succeeds, no color errors

### Phase 2: Core Components (Day 1, PM)
- [ ] Update `components/Sidebar.tsx` (logo, menu items, footer)
- [ ] Update `components/MobileBottomNav.tsx` (navigation items)
- [ ] Global find/replace: "Scotty" → "Dillon" (case-sensitive, all files)
- [ ] Global find/replace: color classes `scc-red` → `dillon-green`
- [ ] Test: Navigation renders correctly, logo displays

### Phase 3: AI Prompts & Backend (Day 2, AM)
- [ ] Update `lib/ai/system-prompts.ts` with Dillon persona
- [ ] Rename & update `lib/ai/prompts/scotty-leads-prompt.ts` → `dillon-projects-prompt.ts`
- [ ] Rename & update `lib/ai/prompts/scotty-claims-prompt.ts` → `dillon-contracts-prompt.ts`
- [ ] Update API routes: `app/api/scotty-*` → `app/api/dillon-*`
- [ ] Test: AI assistant responds with Dillon persona

### Phase 4: Dashboard Pages (Day 2, PM)
- [ ] Update dashboard KPIs (`app/dashboard/page.tsx`)
- [ ] Rename routes: `/claims` → `/contracts`
- [ ] Rename routes: `/inspection` → `/assessments`
- [ ] Update all page content (headings, descriptions, labels)
- [ ] Test: All routes accessible, content accurate

### Phase 5: Polish & Demo Prep (Day 3)
- [ ] Update demo scenarios (`app/demo/page.tsx`)
- [ ] Create Dillon-specific mock data (projects, contracts, reports)
- [ ] Update documentation (`CLAUDE.md`, `README.md`)
- [ ] Final QA: Color consistency, terminology accuracy, functionality
- [ ] Demo rehearsal: Test all key flows

---

## 9. Risk Mitigation & Fallbacks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Logo download fails | Low | Low | Use fallback text logo "DILLON" with green background |
| Color contrast issues | Medium | Medium | Test against WCAG AA standards, adjust if needed |
| AI prompt hallucinations | Medium | High | Include "Stay grounded in facts, cite sources" in prompts |
| Route renaming breaks links | High | High | Implement redirects: `/claims` → `/contracts` (307) |
| Demo data errors | Low | Medium | Use validated mock data, pre-test scenarios |
| Time constraint (1 day) | High | High | Prioritize core visible changes, defer backend optimizations |

---

## 10. Success Criteria

**Demo is successful if:**

1. ✅ **Brand Consistency**: All Dillon colors, logo, tagline visible throughout UI
2. ✅ **AI Assistant Works**: "Dillon" responds with consulting expertise (not insurance)
3. ✅ **Terminology Accurate**: No "claims", "insurance", "Scotty" visible in UI
4. ✅ **Core Flows Functional**:
   - Create new project/contract
   - Conduct site assessment with voice notes
   - Generate AI report
   - View dashboard KPIs
5. ✅ **Performance**: App loads quickly, no broken images/links
6. ✅ **Messaging Clear**: Value propositions align with Dillon's pain points
7. ✅ **Visual Polish**: Clean, professional, minimalist (matches Dillon.ca aesthetic)

---

## 11. Post-Demo Enhancement Roadmap

**Phase 2 Features (Post-Demo):**

1. **GIS Integration**
   - Connect to Esri ArcGIS for spatial data
   - Overlay project locations on interactive maps
   - Integrate environmental database APIs

2. **CAD/BIM Integration**
   - Import AutoCAD/Revit files for computer vision analysis
   - AI-powered drawing review (compliance checks)
   - 3D model annotations

3. **Advanced Analytics**
   - Project profitability prediction models
   - Resource allocation optimization
   - Risk scoring algorithms

4. **Mobile App**
   - Native iOS/Android for field data capture
   - Offline mode for remote site assessments
   - Camera integration for instant photo analysis

5. **Enterprise Features**
   - SSO/SAML authentication
   - Role-based access control (RBAC)
   - Audit logging & compliance reporting
   - Multi-office deployment

---

## 12. Competitive Positioning

### 2×2 Matrix: Dillon + AI vs. Competitors

**Axes:**
- **X-axis**: AI/Digital Sophistication (Low → High)
- **Y-axis**: Domain Specialization (Generalist → Deep Consulting Expertise)

**Positioning:**

```
High Domain
Specialization
     ↑
     |  [Dillon + AI]         (Target Position)
     |  ● High AI + Deep Domain = Unbeatable
     |
     |  [Dillon Today]         [Niche AI Tools]
     |  ● Strong domain        ● AI but no context
     |  ● Weak AI
     |
     |  [Traditional Firms]    [Generic AI SaaS]
     |  ● AECOM, Stantec      ● Limited domain fit
     |  ● Manual workflows
     |
     └─────────────────────────────────────→
   Low                                   High
              AI Sophistication
```

**Competitive Advantages:**

1. **vs. Traditional Consulting Firms (AECOM, Stantec, Jacobs)**
   - **Dillon's Edge**: AI overlay providing 50-70% efficiency gains
   - **Their Weakness**: Legacy manual workflows, slow to adopt AI

2. **vs. Generic AI SaaS (ChatGPT, Copilot)**
   - **Dillon's Edge**: Domain-specific knowledge base, consulting workflows
   - **Their Weakness**: No understanding of ESA, engineering codes, Dillon processes

3. **vs. Niche Environmental Software**
   - **Dillon's Edge**: Multi-modal AI (voice, vision, text), agentic workflows
   - **Their Weakness**: Point solutions, no end-to-end integration

4. **vs. Internal IT Teams**
   - **Dillon's Edge**: Pre-built, proven, rapidly deployable
   - **Their Weakness**: 18-24 month build timeline, high cost, uncertain outcome

---

## 13. Appendix: Key Files Reference

### Critical Files for Migration

```
📂 dillon_demo/
├── 🎨 Brand & Styling
│   ├── tailwind.config.ts                    # Color system
│   ├── app/globals.css                       # CSS variables
│   ├── lib/constants/brand.ts                # Brand config
│   └── public/images/dillon_logo.svg         # Logo (NEW)
│
├── 🧠 AI System
│   ├── lib/ai/system-prompts.ts              # Core AI persona
│   ├── lib/ai/prompts/dillon-projects-prompt.ts   # Project AI (RENAME)
│   ├── lib/ai/prompts/dillon-contracts-prompt.ts  # Contract AI (RENAME)
│   ├── app/api/dillon-projects/chat/route.ts     # API (RENAME)
│   └── app/api/dillon-contracts/chat/route.ts    # API (RENAME)
│
├── 🖼️ Components
│   ├── components/Sidebar.tsx                # Main navigation
│   ├── components/MobileBottomNav.tsx        # Mobile nav
│   ├── components/virtual-assistant.tsx      # AI chat UI
│   └── components/ui/*                       # UI primitives
│
├── 📄 Pages
│   ├── app/dashboard/page.tsx                # Main dashboard
│   ├── app/dashboard/contracts/              # Contracts (RENAME from claims)
│   ├── app/dashboard/assessments/            # Site assessments (RENAME from inspection)
│   └── app/dashboard/reports/                # Technical reports
│
└── 📚 Documentation
    ├── docs/MIGRATION.md                     # This file
    ├── CLAUDE.md                             # Project instructions
    └── README.md                             # Project overview
```

---

## Conclusion

This migration transforms a proven insurance claims platform into a cutting-edge engineering consulting assistant, preserving the exceptional UI/UX while rebranding and retargeting for Dillon Consulting's unique needs.

**Key Success Factors:**
1. **Brand Authenticity**: Dillon's identity (green, "Making life work better") woven throughout
2. **Domain Relevance**: AI expertise shifted from insurance to engineering/environmental consulting
3. **Value Clarity**: Demo scenarios directly address Dillon's pain points (document burden, knowledge capture, compliance)
4. **Technical Excellence**: Leverage existing AI stack (RAG, STT, TTS, CV) with new domain content
5. **Competitive Moat**: Build defensibility via knowledge base, workflow lock-in, data network effects

**Next Action**: Execute Phase 1 (Foundation) to begin transformation.

---

*Document Version: 1.0*
*Last Updated: 2025-01-06*
*Migration Target: Dillon Consulting Limited*
*Source Platform: SCC Intelligence (Insurance Claims)*
