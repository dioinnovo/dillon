# Dillon Consulting Content Transformation Plan
## From Insurance Claims Processing → Engineering & Environmental Consulting

**Date:** January 2025
**Purpose:** Transform SCC Insurance Claims app into Dillon Consulting AI Intelligence Platform
**Timeline:** 6-9 hours comprehensive transformation

---

## Executive Summary

This document outlines the complete content transformation strategy to convert an insurance claims processing application into an authentic engineering and environmental consulting platform for Dillon Consulting Limited.

**Critical Issue Identified:** While branding was updated (colors, logo, AI name), the actual CONTENT remains 100% insurance-focused. The app currently shows hurricane damage claims, settlement negotiations, and policy analysis - NONE of which apply to Dillon's business model.

---

## Research Findings

### Dillon Consulting Business Reality

**Company Profile:**
- **Founded:** 1946 (78+ years)
- **Employees:** 1,100+ professionals
- **Offices:** 25+ across Canada
- **Structure:** Employee-owned
- **Tagline:** "Making life work better"

**Core Services:**
1. **Environmental Sciences**
   - Phase I/II/III Environmental Site Assessments (ESAs)
   - Contaminated sites investigation & remediation
   - Soil & groundwater sampling
   - Risk assessment & management
   - Brownfield redevelopment support

2. **Infrastructure Engineering**
   - Bridge & structure condition assessments
   - Water/wastewater system design
   - Transportation engineering
   - Asset management & lifecycle planning

3. **Community Planning**
   - Land use planning & zoning
   - Development approvals
   - Master planning
   - Policy development

4. **Geotechnical Engineering**
   - Subsurface investigation (boreholes)
   - Foundation design
   - Slope stability analysis
   - Materials testing

**Current Hiring Needs (54+ environmental jobs):**
- Environmental Scientists/Engineers (5+ years ESA experience)
- Field Technicians (soil/groundwater sampling)
- Hydrogeologists (contaminated site specialists)
- Infrastructure Engineers (bridge/structural assessment)

**Key Deliverables:**
- Phase I/II/III ESA technical reports
- Geotechnical investigation reports
- Infrastructure condition assessments
- Remediation plans & monitoring reports
- Construction drawings & specifications
- Tender documents & cost estimates
- Regulatory compliance documentation

**Pain Points (Identified from hiring requirements):**
1. **Knowledge Capture:** 5+ years experience required → institutional knowledge critical
2. **Document-Heavy:** ESA reports, permits, compliance docs = administrative burden
3. **Multi-Disciplinary Coordination:** Environmental + engineering + planning teams
4. **Regulatory Complexity:** Federal (ECCC), Provincial (MECP), Municipal requirements
5. **Quality Assurance:** Consistency across 1,100+ employees, 25+ offices

---

## Current App State Analysis

### Files Containing Insurance Terminology (24 files)

**Dashboard Issues:**
- KPIs: "Active Claims (47)", "Total Recovered ($3.25M)", "Avg Settlement ($125K)"
- Activity: "New Hurricane Claim", "Settlement Reached $1.5M"
- Schedule: "Marina Bay Resort - Hurricane Damage Inspection"

**Claims Page Issues:**
- Title: "Claim Analysis Center"
- Clients: "The Shrimp Boat Restaurant", "Cinnamon Shore Resort"
- Types: "Hurricane Damage", "Water Damage", "Fire Damage"
- Locations: Pensacola FL, Panama City FL (should be Cambridge ON, Guelph ON)

**Inspection Page Issues:**
- Property types: Residential/Commercial (should be ESA/Infrastructure/Geotechnical)
- Damage types: Hurricane/Water/Fire (should be Contamination/Structural/Soil)
- Areas: Kitchen, Bathrooms, Living Room (should be Sample Locations, Building Components)

**Reports Page Issues:**
- Report types: "Preliminary Damage Assessment", "Settlement Recommendation"
- Should be: "Phase I ESA", "Geotechnical Investigation Report", "Remediation Feasibility Study"

---

## Transformation Strategy

### Phase 1: Core Content (HIGH PRIORITY - Demo Critical)

#### 1.1 Dashboard KPIs Transform (`/dashboard/page.tsx`)

| Old KPI (Insurance) | New KPI (Dillon) | Value | Change |
|---------------------|------------------|-------|--------|
| Active Claims | Active Projects | 47 | +8% |
| Total Recovered | Contract Value | $12.5M | +15% |
| Avg Settlement | Avg Project Value | $265K | +12% |
| Success Rate | On-Time Delivery Rate | 94% | +3% |

**Activity Feed Updates:**
```typescript
// OLD (Insurance):
{ type: 'claim_submitted', title: 'New Hurricane Claim - Restaurant', time: '5 min ago' }
{ type: 'settlement_reached', title: 'Settlement $1.5M - Cinnamon Shore', time: '1 hr ago' }

// NEW (Dillon):
{ type: 'project_initiated', title: 'New Phase II ESA - Industrial Site, Cambridge ON', time: '5 min ago' }
{ type: 'report_delivered', title: 'ESA Report Complete - Former Gas Station, Guelph', time: '1 hr ago' }
```

**Scheduled Items:**
```typescript
// OLD (Insurance):
'Marina Bay Resort - Pensacola - Hurricane Damage'
'Beachfront Hotel - Panama City - Structural Damage'

// NEW (Dillon):
'Industrial Property - Cambridge ON - Phase II ESA Field Sampling'
'Grand River Bridge - Waterloo Region - Structural Condition Assessment'
```

#### 1.2 Claims → Contracts Page (`/dashboard/claims/page.tsx`)

**Page Title:** "Claim Analysis Center" → "Contract & Project Management"

**List Item Transform:**

| Field | Old Value | New Value |
|-------|-----------|-----------|
| Client | The Shrimp Boat Restaurant | City of Cambridge |
| Property | Pensacola, FL | 425 Industrial Dr, Cambridge ON |
| Type | Hurricane Damage | Phase II ESA - Contaminated Site |
| Status | Settled - $500K | In Progress - Field Sampling |
| Date | 2024-03-15 | 2024-01-15 |

**Filter Options:**
- ❌ **Old:** Damage Type (Hurricane, Water, Fire, Flood)
- ✅ **New:** Project Type (Phase I ESA, Phase II ESA, Infrastructure, Geotechnical, Planning)

- ❌ **Old:** Settlement Value (<$100K, $100K-$250K, >$250K)
- ✅ **New:** Contract Value (<$50K, $50K-$250K, >$250K)

#### 1.3 Mock Data Creation (`lib/data/dillon-projects.ts`)

**10 Realistic Dillon Projects:**

1. **PROJ-2024-001** - City of Cambridge - Phase II ESA - Former Manufacturing ($145K)
2. **PROJ-2024-002** - Region of Waterloo - Bridge Condition Assessment ($285K)
3. **PROJ-2024-003** - Developer Corp - Phase I ESA - Gas Station Site ($28.5K)
4. **PROJ-2024-004** - Municipal Canada - Geotechnical Investigation - WWTP ($175K)
5. **PROJ-2024-005** - Provincial Authority - Remediation Monitoring ($95K)
6. **PROJ-2024-006** - City of Kitchener - Community Planning Study ($125K)
7. **PROJ-2024-007** - Real Estate Group - Phase III Remediation - Dry Cleaner ($450K)
8. **PROJ-2024-008** - City of Mississauga - Water Main Replacement Design ($195K)
9. **PROJ-2024-009** - Federal Infrastructure - Military Base ESA ($165K)
10. **PROJ-2024-010** - Residential Developer - Geotechnical for Subdivision ($88K)

**Total Contract Value:** $1.75M (realistic quarterly portfolio)

---

### Phase 2: Workflows & User Flows (MEDIUM PRIORITY)

#### 2.1 Assessment Type Selector (NEW FEATURE)

**Add dropdown to select assessment/project type:**

```typescript
const ASSESSMENT_TYPES = [
  {
    id: 'esa-phase1',
    name: 'Phase I ESA',
    icon: FileSearch,
    description: 'Historical review & site reconnaissance',
    workflows: [
      'Historical Records Review',
      'Site Reconnaissance Visit',
      'Regulatory Database Search',
      'Stakeholder Interviews',
      'Generate Phase I Report'
    ]
  },
  {
    id: 'esa-phase2',
    name: 'Phase II ESA',
    icon: Droplet,
    description: 'Soil & groundwater sampling investigation',
    workflows: [
      'Develop Sampling & Analysis Plan',
      'Field Investigation & Sampling',
      'Laboratory Analysis',
      'Risk Assessment',
      'Generate Phase II Technical Report'
    ]
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure Condition Assessment',
    icon: Building,
    description: 'Structural evaluation & rehabilitation design',
    workflows: [
      'Visual Inspection',
      'Structural Capacity Analysis',
      'Deficiency Assessment',
      'Rehabilitation Recommendations',
      'Design Drawings & Specifications'
    ]
  },
  {
    id: 'geotechnical',
    name: 'Geotechnical Investigation',
    icon: Layers,
    description: 'Subsurface investigation & foundation design',
    workflows: [
      'Borehole Drilling Program',
      'Soil & Groundwater Testing',
      'Laboratory Analysis',
      'Foundation Design Recommendations',
      'Geotechnical Report'
    ]
  },
  {
    id: 'remediation',
    name: 'Remediation Monitoring',
    icon: Shield,
    description: 'Site cleanup monitoring & compliance',
    workflows: [
      'Monitoring Plan Development',
      'Quarterly Sampling Events',
      'Compliance Verification',
      'Risk Management Updates',
      'Regulatory Reporting'
    ]
  }
]
```

#### 2.2 Inspection → Site Assessment Page (`/dashboard/inspection/`)

**Property Type → Project Type:**
- ❌ Residential/Commercial
- ✅ Environmental / Infrastructure / Geotechnical / Planning

**Damage Types → Assessment Scope:**
- ❌ Hurricane, Water, Fire, Flood, Hail
- ✅ Soil Contamination, Groundwater Impact, Structural Deficiency, Geotechnical Concern

**Inspector → Field Professional:**
- ❌ "James Rodriguez - Property Inspector"
- ✅ "Sarah Chen, P.Eng - Environmental Engineer" or "Michael Torres, C.E.T. - Field Technician"

**Photo Areas → Site Documentation Points:**

**For Phase II ESA:**
- ❌ Kitchen, Living Room, Bathrooms
- ✅ Sample Location SB-01, Monitoring Well MW-03, Soil Stockpile Area, Chain of Custody Photos

**For Infrastructure:**
- ❌ Roof, Walls, Windows
- ✅ Bridge Deck, Support Columns, Expansion Joints, Structural Deficiencies

#### 2.3 Inspection Start Page (`/inspection/[id]/start/`)

**Form Field Transformation:**

| Old Field | New Field | Example Value |
|-----------|-----------|---------------|
| Claim Number | Project Number | DL-2024-ENV-001 |
| Property Address | Site Address | 425 Industrial Drive, Cambridge ON |
| Property Type | Project Type | Phase II ESA |
| Owner Name | Client Name | City of Cambridge |
| Insurance Company | Regulatory Agency | MECP (Ministry of Environment) |
| Policy Number | Contract/PO Number | PO-2024-12345 |
| Date of Loss | Project Start Date | 2024-01-15 |
| Damage Types | Assessment Scope | Soil & Groundwater Contamination |
| Estimated Claim Value | Contract Value | $145,000 |
| Adjuster Contact | Project Manager | Sarah Chen, P.Eng |

---

### Phase 3: Reports & Polish (LOWER PRIORITY)

#### 3.1 Reports Page (`/dashboard/reports/`)

**Report Type Transform:**

| Old Type | New Type | Sections |
|----------|----------|----------|
| Preliminary Damage Assessment | Phase I Environmental Site Assessment | Executive Summary, Site Background, Historical Review, Site Reconnaissance, Conclusions & Recommendations |
| Detailed Inspection Report | Phase II ESA Technical Report | Introduction, Field Investigation, Laboratory Results, Risk Assessment, Remedial Options |
| Settlement Recommendation | Remediation Feasibility Study | Site Conditions, Remediation Technologies, Cost-Benefit Analysis, Implementation Plan |
| Final Claim Report | Infrastructure Condition Assessment | Asset Inventory, Condition Rating, Deficiency Analysis, Rehabilitation Recommendations, Cost Estimates |

**Report Generation Sections:**

```typescript
// Phase II ESA Report Structure
const ESA_REPORT_SECTIONS = [
  '1. Executive Summary',
  '2. Introduction',
  '3. Site Background & History',
  '4. Regulatory Framework',
  '5. Field Investigation Methodology',
  '6. Sampling Locations & Results',
  '7. Laboratory Analysis',
  '8. Risk Assessment',
  '9. Conclusions',
  '10. Recommendations',
  'Appendix A: Borehole Logs',
  'Appendix B: Laboratory Certificates',
  'Appendix C: Site Plans & Figures'
]
```

#### 3.2 Demo Page (`/demo/page.tsx`)

**Scenario Transform:**

**OLD (Insurance):**
1. Submit insurance claim with property photos
2. AI analyzes policy coverage and finds hidden benefits
3. AI identifies $450K in additional coverage
4. Generate settlement demand letter

**NEW (Dillon Consulting):**
1. Initiate Phase II ESA with site data & historical records
2. AI reviews regulatory requirements (MECP, ECCC) & generates sampling plan
3. AI analyzes field data & identifies contamination areas requiring remediation
4. Generate preliminary ESA technical report with recommendations

**Value Proposition Updates:**

| Old (Insurance) | New (Dillon) |
|-----------------|--------------|
| "We find money insurance companies hide" | "We streamline environmental compliance & accelerate project delivery" |
| "$2B recovered for clients" | "1,000+ successful ESAs completed, 94% on-time delivery" |
| "No recovery, no fee" | "AI-powered efficiency reducing report generation time by 75%" |
| "Average 340% settlement increase" | "Average 70% time savings on technical report preparation" |

---

## Technical Implementation

### Data Structure Changes

#### New Interfaces:

```typescript
// Replace insurance-focused ClaimData with:
interface ProjectData {
  projectId: string
  projectNumber: string
  projectType: 'Phase I ESA' | 'Phase II ESA' | 'Infrastructure' | 'Geotechnical'
  site: {
    address: string
    city: string
    province: string
    type: 'environmental' | 'infrastructure' | 'planning'
    historicalUse?: string
    areaSqMeters?: number
  }
  client: {
    name: string
    contact: string
    email: string
  }
  regulatory: {
    agency: string
    permitNumbers?: string[]
    complianceRequirements: string[]
  }
  scope: {
    initiationDate: string
    assessmentTypes: string[]
    deliverables: string[]
    contractValue: number
  }
}
```

### Component Updates

**Assessment Type Selector Component:**

```tsx
<Select value={assessmentType} onValueChange={setAssessmentType}>
  <SelectItem value="esa-phase1">
    <FileSearch className="mr-2" />
    Phase I ESA
  </SelectItem>
  <SelectItem value="esa-phase2">
    <Droplet className="mr-2" />
    Phase II ESA - Soil & Groundwater
  </SelectItem>
  <SelectItem value="infrastructure">
    <Building className="mr-2" />
    Infrastructure Condition Assessment
  </SelectItem>
  <SelectItem value="geotechnical">
    <Layers className="mr-2" />
    Geotechnical Investigation
  </SelectItem>
</Select>
```

**Dynamic Workflow Cards:**

```tsx
const getWorkflowSteps = (assessmentType: string) => {
  const workflows = {
    'esa-phase1': [
      { id: 1, name: 'Historical Records Review', icon: FileText },
      { id: 2, name: 'Site Reconnaissance', icon: Camera },
      { id: 3, name: 'Regulatory Database Search', icon: Search },
      { id: 4, name: 'Generate Phase I Report', icon: FileCheck }
    ],
    'esa-phase2': [
      { id: 1, name: 'Sampling & Analysis Plan', icon: ClipboardList },
      { id: 2, name: 'Field Investigation', icon: Shovel },
      { id: 3, name: 'Laboratory Analysis', icon: Flask },
      { id: 4, name: 'Risk Assessment', icon: AlertTriangle },
      { id: 5, name: 'Technical Report', icon: FileText }
    ],
    // ... other workflows
  }

  return workflows[assessmentType] || []
}
```

---

## File Modification Checklist

### Phase 1 Files (Critical - 8 files):
- ✅ `lib/data/dillon-projects.ts` (NEW - Mock data)
- ⏳ `app/dashboard/page.tsx` (KPIs, activity feed)
- ⏳ `app/dashboard/claims/page.tsx` (→ contracts, list items)
- ⏳ `app/dashboard/claims/[id]/page.tsx` (Detail view)
- ⏳ `lib/data/scc-cases.ts` (Update or replace with Dillon data)

### Phase 2 Files (Important - 10 files):
- ⏳ `app/dashboard/inspection/page.tsx` (→ assessments, type selector)
- ⏳ `app/dashboard/inspection/[id]/start/page.tsx` (Form fields)
- ⏳ `app/dashboard/inspection/[id]/areas/page.tsx` (Site components)
- ⏳ `app/dashboard/inspection/[id]/area/[areaId]/page.tsx` (Documentation)
- ⏳ `app/dashboard/inspection/[id]/continue/page.tsx` (Workflow)
- ⏳ `app/dashboard/inspection/[id]/review/page.tsx` (Review)
- ⏳ `app/dashboard/inspection/[id]/report/page.tsx` (Report gen)
- ⏳ `app/claim-assessment/page.tsx` (→ project-scoping)

### Phase 3 Files (Polish - 6 files):
- ⏳ `app/dashboard/reports/page.tsx` (Report types)
- ⏳ `app/dashboard/reports/[id]/review/page.tsx` (Report detail)
- ⏳ `app/demo/page.tsx` (Demo scenario)
- ⏳ `app/landing/page.tsx` (Marketing copy)
- ⏳ `components/roi-calculator.tsx` (Value metrics)
- ⏳ `lib/utils/pdf-generator.ts` (ESA report templates)

---

## Success Criteria

### Functional Requirements:
✅ **Zero insurance/claims terminology** visible in UI
✅ **Authentic Dillon projects** (Cambridge, Guelph, Waterloo locations)
✅ **Correct deliverables** (ESA reports, not damage assessments)
✅ **Proper workflows** (sampling plans, not property inspections)
✅ **Assessment type selector** working with dynamic workflows
✅ **Realistic mock data** (actual Dillon project types)

### Business Requirements:
✅ **Compelling value proposition** (streamline compliance vs. maximize settlements)
✅ **Address Dillon's pain points** (document burden, knowledge capture, multi-disciplinary)
✅ **Showcase AI capabilities** (report generation, compliance checking, workflow automation)
✅ **Demonstrate ROI** (75% time savings, 94% on-time, 100% compliance)

---

## Timeline & Effort Estimate

| Phase | Tasks | Files | Estimated Time |
|-------|-------|-------|----------------|
| **Phase 1: Core Content** | KPIs, mock data, contracts page | 5 files | 3-4 hours |
| **Phase 2: Workflows** | Assessment types, field forms, workflows | 8 files | 2-3 hours |
| **Phase 3: Reports & Polish** | Report templates, demo, landing | 6 files | 1-2 hours |
| **Testing & QA** | E2E testing, bug fixes | All files | 1 hour |
| **TOTAL** | Full transformation | 19 files | **7-10 hours** |

---

## Risk Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Breaking existing functionality | High | Medium | Test each page after changes, keep legacy fallbacks |
| Inconsistent terminology | Medium | High | Create glossary, use find/replace systematically |
| Missing Dillon context | High | Medium | Use realistic Ontario cities, actual ESA terminology |
| Demo data not authentic | Medium | High | Research actual Dillon projects, use proper regulatory agencies |
| Time overrun | Medium | Medium | Prioritize Phase 1, defer Phase 3 if needed |

---

## Glossary: Insurance → Consulting

| Insurance Term | Consulting Equivalent | Notes |
|----------------|----------------------|-------|
| Claims | Contracts / Projects | Primary work unit |
| Settlement | Deliverable / Report | Final output |
| Policy | Contract / Scope of Work | Agreement terms |
| Damage Assessment | Site Assessment / ESA | Technical evaluation |
| Property Inspection | Field Investigation / Site Visit | On-site work |
| Adjuster | Project Manager / Engineer | Professional role |
| Policyholder | Client / Municipality | Customer |
| Coverage | Scope / Deliverables | Work definition |
| Claim Value | Contract Value | Financial terms |
| Hurricane/Water/Fire Damage | Contamination / Structural Deficiency | Issue types |

---

## Next Steps

1. ✅ **Phase 1 Started** - Dillon mock data created
2. ⏳ **Dashboard KPIs** - Update to consulting metrics
3. ⏳ **Contracts Page** - Transform claims to projects
4. ⏳ **Assessment Workflows** - Add type selector & dynamic flows
5. ⏳ **Reports & Demo** - Update content & scenarios
6. ⏳ **Final QA** - End-to-end testing

---

*Document Status: Living Document - Updated During Implementation*
*Last Updated: January 2025*
*Author: AI Transformation Team*
*Stakeholder: Dillon Consulting Limited Demo*
