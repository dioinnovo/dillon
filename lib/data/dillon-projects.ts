/**
 * Dillon Consulting Mock Project Data
 * Realistic environmental, infrastructure, and planning projects
 */

export interface DillonProject {
  id: string
  projectNumber: string
  clientName: string
  projectType: 'Phase I ESA' | 'Phase II ESA' | 'Phase III ESA' | 'Infrastructure' | 'Geotechnical' | 'Planning' | 'Remediation'
  siteAddress: string
  city: string
  province: string
  scope: string
  contractValue: number
  status: 'active' | 'field_work' | 'lab_analysis' | 'report_draft' | 'completed' | 'on_hold'
  projectManager: string
  fieldTechnician?: string
  startDate: string
  targetCompletionDate: string
  deliverables: string[]
  regulatoryAgency?: string
  sampleLocations?: string[]
  contaminantsOfConcern?: string[]
  completionRate?: number
  imageUrl?: string
}

export const DILLON_PROJECTS: DillonProject[] = [
  {
    id: 'PROJ-2024-001',
    projectNumber: 'DL-2024-ENV-001',
    clientName: 'City of Cambridge',
    projectType: 'Phase II ESA',
    siteAddress: '425 Industrial Drive',
    city: 'Cambridge',
    province: 'Ontario',
    scope: 'Former manufacturing facility - soil & groundwater investigation for brownfield redevelopment',
    contractValue: 145000,
    status: 'field_work',
    projectManager: 'Sarah Chen, P.Eng',
    fieldTechnician: 'Michael Torres, C.E.T.',
    startDate: '2024-01-15',
    targetCompletionDate: '2024-04-30',
    deliverables: ['Sampling & Analysis Plan', 'Field Investigation Report', 'Laboratory Analysis', 'Risk Assessment Report', 'Remedial Options Assessment'],
    regulatoryAgency: 'Ministry of Environment, Conservation and Parks (MECP)',
    sampleLocations: ['SB-01', 'SB-02', 'SB-03', 'MW-01', 'MW-02', 'MW-03', 'SV-01'],
    contaminantsOfConcern: ['Petroleum Hydrocarbons (PHCs)', 'Heavy Metals (Lead, Arsenic)', 'Volatile Organic Compounds (VOCs)', 'Polycyclic Aromatic Hydrocarbons (PAHs)'],
    completionRate: 65,
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop&q=80'
  },
  {
    id: 'PROJ-2024-002',
    projectNumber: 'DL-2024-INF-012',
    clientName: 'Region of Waterloo',
    projectType: 'Infrastructure',
    siteAddress: 'Grand River Bridge - Fischer-Hallman Road',
    city: 'Waterloo',
    province: 'Ontario',
    scope: 'Structural condition assessment and rehabilitation design for 50-year old concrete bridge',
    contractValue: 285000,
    status: 'report_draft',
    projectManager: 'James Rodriguez, P.Eng',
    startDate: '2023-11-20',
    targetCompletionDate: '2024-03-15',
    deliverables: ['Visual Inspection Report', 'Structural Capacity Analysis', 'Rehabilitation Design Drawings', 'Construction Specifications', 'Cost Estimate'],
    completionRate: 85,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80'
  },
  {
    id: 'PROJ-2024-003',
    projectNumber: 'DL-2024-ENV-008',
    clientName: 'Developer Corp - Brownfield Holdings',
    projectType: 'Phase I ESA',
    siteAddress: '789 Former Gas Station Site',
    city: 'Guelph',
    province: 'Ontario',
    scope: 'Phase I Environmental Site Assessment for commercial property acquisition due diligence',
    contractValue: 28500,
    status: 'completed',
    projectManager: 'Emily Patel, P.Geo',
    startDate: '2024-02-01',
    targetCompletionDate: '2024-02-28',
    deliverables: ['Phase I ESA Report', 'Historical Records Review', 'Site Reconnaissance Report', 'Regulatory Database Search Results'],
    regulatoryAgency: 'MECP, City of Guelph',
    completionRate: 100,
    imageUrl: 'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=800&h=600&fit=crop&q=80'
  },
  {
    id: 'PROJ-2024-004',
    projectNumber: 'DL-2024-GEO-003',
    clientName: 'Municipal Infrastructure Canada',
    projectType: 'Geotechnical',
    siteAddress: 'Proposed Wastewater Treatment Plant Expansion',
    city: 'London',
    province: 'Ontario',
    scope: 'Geotechnical investigation including borehole drilling, soil testing, and foundation design recommendations',
    contractValue: 175000,
    status: 'lab_analysis',
    projectManager: 'Dr. Robert Kim, P.Eng, Ph.D.',
    fieldTechnician: 'Amanda Williams, G.I.T.',
    startDate: '2024-01-10',
    targetCompletionDate: '2024-04-15',
    deliverables: ['Borehole Logs', 'Laboratory Test Results', 'Geotechnical Engineering Report', 'Foundation Design Recommendations', 'Construction Monitoring Plan'],
    sampleLocations: ['BH-01', 'BH-02', 'BH-03', 'BH-04', 'BH-05', 'TP-01 to TP-08'],
    completionRate: 55,
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop&q=80'
  },
  {
    id: 'PROJ-2024-005',
    projectNumber: 'DL-2024-REM-002',
    clientName: 'Provincial Remediation Authority',
    projectType: 'Remediation',
    siteAddress: 'Former Industrial Complex - Site 7',
    city: 'Hamilton',
    province: 'Ontario',
    scope: 'Remediation monitoring and compliance reporting for contaminated soil management',
    contractValue: 95000,
    status: 'active',
    projectManager: 'Lisa Thompson, P.Eng',
    fieldTechnician: 'David Lee, E.I.T.',
    startDate: '2023-09-01',
    targetCompletionDate: '2024-08-31',
    deliverables: ['Quarterly Monitoring Reports', 'Groundwater Sampling Results', 'Compliance Verification', 'Risk Management Updates'],
    regulatoryAgency: 'MECP - Excess Soil Registry',
    sampleLocations: ['MW-01', 'MW-02', 'MW-03', 'MW-04', 'Surface Water SW-01'],
    contaminantsOfConcern: ['Petroleum Hydrocarbons', 'Chlorinated Solvents', 'Heavy Metals'],
    completionRate: 40,
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop&q=80'
  },
  {
    id: 'PROJ-2024-006',
    projectNumber: 'DL-2024-PLAN-005',
    clientName: 'City of Kitchener',
    projectType: 'Planning',
    siteAddress: 'Downtown Core Redevelopment Area',
    city: 'Kitchener',
    province: 'Ontario',
    scope: 'Community planning study and development approval support for mixed-use development',
    contractValue: 125000,
    status: 'active',
    projectManager: 'Alexandra Martin, MCIP, RPP',
    startDate: '2024-01-05',
    targetCompletionDate: '2024-06-30',
    deliverables: ['Planning Justification Report', 'Traffic Impact Study', 'Urban Design Brief', 'Public Consultation Summary', 'Zoning Amendment Application'],
    completionRate: 35,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&q=80'
  },
  {
    id: 'PROJ-2024-007',
    projectNumber: 'DL-2024-ENV-015',
    clientName: 'Real Estate Development Group',
    projectType: 'Phase III ESA',
    siteAddress: 'Former Dry Cleaning Facility',
    city: 'Burlington',
    province: 'Ontario',
    scope: 'Phase III remediation and risk management for chlorinated solvent contamination',
    contractValue: 450000,
    status: 'field_work',
    projectManager: 'Dr. Jennifer Wu, P.Eng, P.Geo',
    fieldTechnician: 'Carlos Martinez, C.E.T.',
    startDate: '2023-10-15',
    targetCompletionDate: '2024-09-30',
    deliverables: ['Remediation Work Plan', 'In-Situ Treatment System Design', 'Groundwater Monitoring Program', 'Risk Assessment & Management Plan', 'Site Closure Report'],
    regulatoryAgency: 'MECP - Risk Assessment & Brownfields',
    sampleLocations: ['EW-01 to EW-06', 'IW-01 to IW-04', 'MW-01 to MW-08'],
    contaminantsOfConcern: ['Tetrachloroethylene (PCE)', 'Trichloroethylene (TCE)', 'Chlorinated Degradation Products'],
    completionRate: 48,
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop&q=80'
  },
  {
    id: 'PROJ-2024-008',
    projectNumber: 'DL-2024-INF-018',
    clientName: 'City of Mississauga',
    projectType: 'Infrastructure',
    siteAddress: 'Lakeshore Road Water Main Replacement',
    city: 'Mississauga',
    province: 'Ontario',
    scope: 'Design and tender preparation for 2.5km water main replacement including condition assessment',
    contractValue: 195000,
    status: 'report_draft',
    projectManager: 'Thomas Anderson, P.Eng',
    startDate: '2023-12-01',
    targetCompletionDate: '2024-05-15',
    deliverables: ['Asset Condition Assessment', 'Detailed Design Drawings', 'Technical Specifications', 'Tender Documents', 'Construction Cost Estimate'],
    completionRate: 75,
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop&q=80'
  },
  {
    id: 'PROJ-2024-009',
    projectNumber: 'DL-2024-ENV-021',
    clientName: 'Federal Infrastructure Program',
    projectType: 'Phase II ESA',
    siteAddress: 'Decommissioned Military Base - Building 12',
    city: 'Borden',
    province: 'Ontario',
    scope: 'Environmental assessment for building demolition and site redevelopment',
    contractValue: 165000,
    status: 'active',
    projectManager: 'Captain (Ret.) Mark Stevens, P.Eng',
    startDate: '2024-02-15',
    targetCompletionDate: '2024-06-30',
    deliverables: ['Hazardous Materials Survey', 'Soil & Groundwater Investigation', 'Asbestos & Lead Assessment', 'Demolition Environmental Management Plan'],
    regulatoryAgency: 'Environment and Climate Change Canada (ECCC)',
    sampleLocations: ['BLD-12-INT-01 to 15', 'EXT-01 to 08'],
    contaminantsOfConcern: ['Asbestos', 'Lead Paint', 'Petroleum Hydrocarbons', 'PCBs'],
    completionRate: 30,
    imageUrl: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&h=600&fit=crop&q=80'
  },
  {
    id: 'PROJ-2024-010',
    projectNumber: 'DL-2024-GEO-007',
    clientName: 'Residential Developer Inc.',
    projectType: 'Geotechnical',
    siteAddress: 'Proposed Subdivision - North 40 Acres',
    city: 'Oakville',
    province: 'Ontario',
    scope: 'Geotechnical investigation for residential subdivision including slope stability analysis',
    contractValue: 88000,
    status: 'completed',
    projectManager: 'Rachel Green, P.Eng',
    startDate: '2023-11-01',
    targetCompletionDate: '2024-01-31',
    deliverables: ['Geotechnical Investigation Report', 'Foundation Recommendations', 'Pavement Design', 'Slope Stability Analysis', 'Earthworks Specifications'],
    completionRate: 100,
    imageUrl: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop&q=80'
  }
]

export const PROJECT_TYPES = [
  'Phase I ESA',
  'Phase II ESA',
  'Phase III ESA',
  'Infrastructure',
  'Geotechnical',
  'Planning',
  'Remediation'
] as const

export const PROJECT_STATUSES = {
  active: { label: 'Active', color: 'bg-blue-500' },
  field_work: { label: 'Field Work', color: 'bg-purple-500' },
  lab_analysis: { label: 'Lab Analysis', color: 'bg-yellow-500' },
  report_draft: { label: 'Report Draft', color: 'bg-orange-500' },
  completed: { label: 'Completed', color: 'bg-green-500' },
  on_hold: { label: 'On Hold', color: 'bg-gray-500' }
} as const

export const REGULATORY_AGENCIES = [
  'Ministry of Environment, Conservation and Parks (MECP)',
  'Environment and Climate Change Canada (ECCC)',
  'Ontario Building Code (OBC)',
  'Canadian Environmental Assessment Act (CEAA)',
  'Municipal Authority',
  'Conservation Authority'
] as const

// Helper function to get projects by type
export function getProjectsByType(type: typeof PROJECT_TYPES[number]) {
  return DILLON_PROJECTS.filter(project => project.projectType === type)
}

// Helper function to get projects by status
export function getProjectsByStatus(status: keyof typeof PROJECT_STATUSES) {
  return DILLON_PROJECTS.filter(project => project.status === status)
}

// Helper function to calculate total contract value
export function getTotalContractValue() {
  return DILLON_PROJECTS.reduce((sum, project) => sum + project.contractValue, 0)
}

// Helper function to get average project value
export function getAverageProjectValue() {
  const total = getTotalContractValue()
  return Math.round(total / DILLON_PROJECTS.length)
}
