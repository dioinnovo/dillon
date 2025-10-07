'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter } from 'next/navigation'
// Remove heavy animation library for initial load
// import { motion } from 'framer-motion'
import {
  Camera, Plus, Calendar, Clock, MapPin, User, CheckCircle,
  AlertCircle, FileText, TrendingUp, Search, Filter, Download,
  Building2, Home, ChevronRight, Eye
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { PageHeader } from '@/components/ui/page-header'
import { useSidebar } from '@/contexts/SidebarContext'
// Lazy load inspection data hook to improve initial load
// import { useInspectionData } from '@/lib/hooks/useInspectionData'

interface Assessment {
  id: string
  projectId: string
  siteAddress: string
  siteType: string
  status: string
  scheduledDate: string
  scheduledTime: string
  fieldTechnician: string
  clientName: string
  assessmentType: string
  estimatedDuration: string
  completionRate: number
  reportReady?: boolean
  estimatedValue?: number
  imageUrl?: string
  photosCount?: number
  areasInspected?: string[]
  currentArea?: string
  preliminaryFindings?: {
    severity: string
    description: string
    recommendation: string
  }
  reportDetails?: {
    totalPhotos: number
    areasCompleted: number
    totalAreas: number
    findings: string[]
    estimatedCost: number
  }
}

export default function AssessmentListPage() {
  const router = useRouter()
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterAssessmentType, setFilterAssessmentType] = useState('all')
  const { isCollapsed } = useSidebar()

  // Lazy load inspection data to avoid blocking initial render
  const [activeInspectionData, setActiveInspectionData] = useState<any>(null)
  const [realPhotoCount, setRealPhotoCount] = useState(0)
  const [realAreasCompleted, setRealAreasCompleted] = useState<string[]>([])
  const [currentAreaName, setCurrentAreaName] = useState('Windows & Doors')

  // Defer loading inspection data until after initial render
  useEffect(() => {
    // Load inspection data asynchronously after component mounts
    const loadData = async () => {
      const { useInspectionData } = await import('@/lib/hooks/useInspectionData')
      // This is a workaround - in a real app, we'd refactor to use the hook properly
      // For now, we'll just skip the heavy data loading on initial render
    }

    // Only load if we really need the data (for now, skip it)
    // loadData()
  }, [])

  // Mock data for field assessments
  const assessments: Assessment[] = [
    // ONE Green - Active assessment
    {
      id: 'ASM-002',
      projectId: 'PROJ-2024-001',
      siteAddress: '425 Industrial Drive, Cambridge, ON',
      siteType: 'Industrial',
      status: 'in_progress',
      scheduledDate: '2024-03-19',
      scheduledTime: '2:00 PM',
      fieldTechnician: 'Michael Torres, C.E.T.',
      clientName: 'City of Cambridge',
      assessmentType: 'Phase II ESA',
      estimatedDuration: '6 hours',
      completionRate: 65,
      imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop&q=80',
      photosCount: realPhotoCount || 51,
      currentArea: currentAreaName || 'Groundwater Sampling',
      areasInspected: realAreasCompleted.length > 0 ? realAreasCompleted : ['Site Reconnaissance', 'Soil Boring SB-01', 'Soil Boring SB-02', 'Monitoring Well MW-01', 'Groundwater Sampling', 'Soil Vapor Survey', 'Surface Water Sample'],
      preliminaryFindings: {
        severity: 'Moderate',
        description: 'Former manufacturing facility showing evidence of petroleum hydrocarbon contamination in shallow soils. Soil samples indicate concentrations exceeding Table 3 standards.',
        recommendation: 'Continue sampling program, establish groundwater monitoring network, and prepare remediation options assessment'
      }
    },
    // TWO Orange - Scheduled assessments
    {
      id: 'ASM-001',
      projectId: 'PROJ-2024-002',
      siteAddress: 'Grand River Bridge - Fischer-Hallman Road, Waterloo, ON',
      siteType: 'Infrastructure',
      status: 'scheduled',
      scheduledDate: '2024-03-20',
      scheduledTime: '10:00 AM',
      fieldTechnician: 'James Rodriguez, P.Eng',
      clientName: 'Region of Waterloo',
      assessmentType: 'Infrastructure Assessment',
      estimatedDuration: '8 hours',
      completionRate: 0,
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80',
      preliminaryFindings: {
        severity: 'Significant',
        description: '50-year old concrete bridge showing signs of structural deterioration, spalling concrete, and exposed rebar. Comprehensive structural capacity analysis required.',
        recommendation: 'Complete visual inspection, core sampling, and load capacity assessment before developing rehabilitation design'
      }
    },
    {
      id: 'ASM-005',
      projectId: 'PROJ-2024-004',
      siteAddress: 'Proposed Wastewater Treatment Plant Expansion, London, ON',
      siteType: 'Institutional',
      status: 'scheduled',
      scheduledDate: '2024-03-21',
      scheduledTime: '9:30 AM',
      fieldTechnician: 'Amanda Williams, G.I.T.',
      clientName: 'Municipal Infrastructure Canada',
      assessmentType: 'Geotechnical',
      estimatedDuration: '10 hours',
      completionRate: 0,
      imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop&q=80',
      preliminaryFindings: {
        severity: 'Standard',
        description: 'Geotechnical investigation including 5 boreholes (BH-01 to BH-05) and 8 test pits for foundation design recommendations',
        recommendation: 'Complete borehole drilling, soil sampling, and laboratory testing for bearing capacity and settlement analysis'
      }
    },
    // Completed assessments
    {
      id: 'ASM-003',
      projectId: 'PROJ-2024-003',
      siteAddress: '789 Former Gas Station Site, Guelph, ON',
      siteType: 'Commercial',
      status: 'completed',
      scheduledDate: '2024-03-18',
      scheduledTime: '9:00 AM',
      fieldTechnician: 'Emily Patel, P.Geo',
      clientName: 'Developer Corp - Brownfield Holdings',
      assessmentType: 'Phase I ESA',
      estimatedDuration: '4 hours',
      completionRate: 100,
      reportReady: true,
      imageUrl: 'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=800&h=600&fit=crop&q=80',
      reportDetails: {
        totalPhotos: 89,
        areasCompleted: 8,
        totalAreas: 8,
        findings: [
          'Historical records review identified former gas station use from 1965-2002',
          'Environmental database search found no regulatory violations',
          'Site reconnaissance revealed underground storage tank (UST) fill ports',
          'Adjacent properties include automotive repair facility (potential offsite contamination)',
          'Phase II ESA recommended due to former petroleum storage use'
        ],
        estimatedCost: 28500
      }
    },
    // Report ready (completed)
    {
      id: 'ASM-004',
      projectId: 'PROJ-2024-010',
      siteAddress: 'Proposed Subdivision - North 40 Acres, Oakville, ON',
      siteType: 'Residential',
      status: 'report_ready',
      scheduledDate: '2024-03-17',
      scheduledTime: '11:00 AM',
      fieldTechnician: 'Rachel Green, P.Eng',
      clientName: 'Residential Developer Inc.',
      assessmentType: 'Geotechnical',
      estimatedDuration: '5 hours',
      completionRate: 100,
      reportReady: true,
      estimatedValue: 88000,
      imageUrl: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop&q=80',
      reportDetails: {
        totalPhotos: 63,
        areasCompleted: 6,
        totalAreas: 6,
        findings: [
          'Soil borings completed to depths of 6-10 meters below grade',
          'Bearing capacity suitable for standard residential foundation design',
          'Slope stability analysis shows adequate safety factors for proposed grading',
          'Seasonal groundwater table identified at 3.5m depth',
          'Granular fill recommended for pavement subgrade preparation'
        ],
        estimatedCost: 88000
      }
    },
    {
      id: 'ASM-006',
      projectId: 'PROJ-2024-008',
      siteAddress: 'Lakeshore Road Water Main Replacement, Mississauga, ON',
      siteType: 'Infrastructure',
      status: 'report_ready',
      scheduledDate: '2024-03-16',
      scheduledTime: '4:00 PM',
      fieldTechnician: 'Thomas Anderson, P.Eng',
      clientName: 'City of Mississauga',
      assessmentType: 'Infrastructure Assessment',
      estimatedDuration: '6 hours',
      completionRate: 100,
      reportReady: true,
      imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop&q=80',
      reportDetails: {
        totalPhotos: 71,
        areasCompleted: 7,
        totalAreas: 7,
        findings: [
          '2.5km water main showing significant corrosion and reduced capacity',
          'Internal inspection camera reveals tuberculation reducing pipe diameter by 40%',
          'Multiple leak repair history indicates end of service life',
          'Coordination required with gas, hydro, and telecom utilities',
          'Tender documents and construction specifications prepared for spring 2024 construction'
        ],
        estimatedCost: 195000
      }
    }
  ]

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'scheduled': return 'bg-blue-500 text-white'
      case 'in_progress': return 'bg-amber-500 text-white'
      case 'completed': return 'bg-green-500 text-white'
      case 'report_ready': return 'bg-purple-500 text-white'
      case 'cancelled': return 'bg-gray-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'scheduled': return 'Scheduled'
      case 'in_progress': return 'In Progress'
      case 'completed': return 'Completed'
      case 'report_ready': return 'Report Ready'
      case 'cancelled': return 'Cancelled'
      default: return status
    }
  }

  // Filter only Active/Scheduled assessments
  const activeScheduledAssessments = assessments.filter(assessment =>
    assessment.status === 'scheduled' || assessment.status === 'in_progress'
  ).filter(assessment => {
    const matchesSearch = assessment.siteAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          assessment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          assessment.projectId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || assessment.status === filterStatus
    const matchesAssessmentType = filterAssessmentType === 'all' || assessment.assessmentType === filterAssessmentType
    return matchesSearch && matchesStatus && matchesAssessmentType
  }).sort((a, b) => {
    // Sort by date and time (soonest first)
    const dateA = new Date(`${a.scheduledDate} ${a.scheduledTime}`)
    const dateB = new Date(`${b.scheduledDate} ${b.scheduledTime}`)
    return dateA.getTime() - dateB.getTime()
  })

  // Get assessments that need action
  const scheduledAssessments = assessments.filter(i => i.status === 'scheduled')
  const inProgressAssessments = assessments.filter(i => i.status === 'in_progress')

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Schedule Field Assessments"
        description="AI-powered site assessments and field investigations"
        action={
          <Link
            href="/dashboard/assessments/new"
            className="h-12 px-6 bg-dillon-green text-white rounded-full hover:bg-dillon-green-dark flex items-center justify-center gap-2 w-full sm:w-auto transition-colors font-medium"
          >
            <Plus size={20} />
            <span>New Assessment</span>
          </Link>
        }
      />

      {/* Search and Filters Section - Always Visible */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-4">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search by site address, client, or project ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200/60 dark:border-gray-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-dillon-green/30 focus:bg-white dark:focus:bg-gray-700 transition-all text-sm md:text-base text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-dillon-green/30 focus:border-dillon-green/50"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="report_ready">Report Ready</option>
            </select>

            {/* Assessment Type Filter */}
            <select
              value={filterAssessmentType}
              onChange={(e) => setFilterAssessmentType(e.target.value)}
              className="px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-dillon-green/30 focus:border-dillon-green/50"
            >
              <option value="all">All Assessment Types</option>
              <option value="Phase I ESA">Phase I ESA</option>
              <option value="Phase II ESA">Phase II ESA</option>
              <option value="Phase III ESA">Phase III ESA</option>
              <option value="Geotechnical">Geotechnical</option>
              <option value="Infrastructure Assessment">Infrastructure Assessment</option>
              <option value="Planning">Planning</option>
            </select>
          </div>

          {/* Active Filters Display */}
          {(filterStatus !== 'all' || filterAssessmentType !== 'all') && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
              {filterStatus !== 'all' && (
                <button
                  onClick={() => setFilterStatus('all')}
                  className="px-3 py-1 bg-dillon-green/10 text-dillon-green rounded-full text-sm flex items-center gap-1 hover:bg-dillon-green/20 transition-colors"
                >
                  {getStatusLabel(filterStatus)}
                  <span className="text-dillon-green/60">×</span>
                </button>
              )}
              {filterAssessmentType !== 'all' && (
                <button
                  onClick={() => setFilterAssessmentType('all')}
                  className="px-3 py-1 bg-dillon-green/10 text-dillon-green rounded-full text-sm flex items-center gap-1 hover:bg-dillon-green/20 transition-colors"
                >
                  {filterAssessmentType}
                  <span className="text-dillon-green/60">×</span>
                </button>
              )}
              <button
                onClick={() => {
                  setFilterStatus('all')
                  setFilterAssessmentType('all')
                }}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Scheduled Assessments Section */}
      {activeScheduledAssessments.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">Scheduled Field Assessments</h2>
            <div className="flex items-center gap-3">
              {activeScheduledAssessments.filter(i => i.status === 'in_progress').length > 0 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
                  {activeScheduledAssessments.filter(i => i.status === 'in_progress').length} Active
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                <Calendar size={14} />
                {activeScheduledAssessments.filter(i => i.status === 'scheduled').length} Scheduled
              </span>
            </div>
          </div>

          {/* Scheduled Grid - 1 column on mobile and md screens */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {activeScheduledAssessments.map((assessment) => (
              <div
                key={assessment.id}
                className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-200 dark:border-gray-700 animate-fadeInSlide"
                onClick={() => {
                  if (assessment.status === 'in_progress') {
                    // For in-progress assessments, continue the assessment
                    router.push(`/dashboard/assessments/${assessment.id}/continue`)
                  } else {
                    // For scheduled assessments, go to start page
                    router.push(`/dashboard/assessments/${assessment.id}/start`)
                  }
                }}
              >
                {/* Image Section */}
                <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                  {assessment.imageUrl ? (
                    <Image
                      src={assessment.imageUrl}
                      alt={assessment.siteAddress}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={false}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-300">
                      <div className="w-full h-full flex items-center justify-center">
                        {assessment.siteType === 'Commercial' || assessment.siteType === 'Industrial' || assessment.siteType === 'Infrastructure' ? (
                          <Building2 className="text-gray-400 dark:text-gray-600" size={64} />
                        ) : (
                          <Home className="text-gray-400 dark:text-gray-600" size={64} />
                        )}
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/60 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-bold text-white text-lg leading-tight drop-shadow-lg">
                      {assessment.siteAddress}
                    </h3>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-2 right-2">
                    {assessment.status === 'in_progress' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-[10px] font-semibold shadow-lg backdrop-blur-sm">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"/>
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-[10px] font-semibold shadow-lg backdrop-blur-sm">
                        <Clock size={10} />
                        Scheduled
                      </span>
                    )}
                  </div>

                  <div className="absolute top-2 left-2">
                    <span className="inline-block px-2 py-1 rounded-full text-[10px] font-semibold bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 shadow-lg">
                      {assessment.siteType}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  {/* Progress Bar for In Progress */}
                  {assessment.status === 'in_progress' && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-600">Progress</span>
                        <span className="text-xs font-bold text-green-600">{assessment.completionRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${assessment.completionRate}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Progress Details for In-Progress */}
                  {assessment.status === 'in_progress' && assessment.currentArea && assessment.areasInspected && (
                    <div className="bg-green-50 rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs">
                          <div className="flex items-center gap-1">
                            <Camera size={12} className="text-blue-600" />
                            <span className="font-medium text-gray-700">{assessment.photosCount} photos</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={12} className="text-green-600" />
                            <span className="font-medium text-gray-700">{assessment.areasInspected.length} samples done</span>
                          </div>
                        </div>
                        <div className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                          Active
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-gray-700 mb-1">Currently sampling:</p>
                        <p className="text-xs text-green-600 font-medium">{assessment.currentArea}</p>
                      </div>

                      {assessment.preliminaryFindings && (
                        <div>
                          <p className="text-xs font-semibold text-gray-700 mb-1">Preliminary Findings:</p>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {assessment.preliminaryFindings.description}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Project ID</p>
                      <p className="text-sm font-semibold text-gray-900 truncate">{assessment.projectId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Client</p>
                      <p className="text-sm font-semibold text-gray-900 truncate">{assessment.clientName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Field Tech</p>
                      <p className="text-sm font-semibold text-gray-900 truncate">{assessment.fieldTechnician}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Assessment Type</p>
                      <p className="text-sm font-semibold text-gray-900 truncate">{assessment.assessmentType}</p>
                    </div>
                  </div>

                  {/* Preliminary Findings for Scheduled */}
                  {assessment.status === 'scheduled' && assessment.preliminaryFindings && (
                    <div className="bg-blue-50 rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-dillon-green">Scope Overview:</p>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          assessment.preliminaryFindings.severity === 'Significant'
                            ? 'bg-orange-100 text-orange-700'
                            : assessment.preliminaryFindings.severity === 'Moderate'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {assessment.preliminaryFindings.severity}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {assessment.preliminaryFindings.description}
                      </p>
                    </div>
                  )}

                  {/* Date and Time */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{assessment.scheduledDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{assessment.scheduledTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-3">
                    {assessment.status === 'scheduled' && (
                      <Link
                        href={`/dashboard/assessments/${assessment.id}/start`}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full px-4 py-2.5 bg-dillon-green text-white rounded-xl hover:bg-dillon-green-dark transition-all duration-200 flex items-center justify-center gap-2 text-sm font-semibold shadow-sm"
                      >
                        <Camera size={16} />
                        <span>Start Assessment</span>
                      </Link>
                    )}
                    {assessment.status === 'in_progress' && (
                      <Link
                        href={`/dashboard/assessments/${assessment.id}/continue`}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full px-4 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 flex items-center justify-center gap-2 text-sm font-semibold shadow-sm"
                      >
                        <ChevronRight size={16} />
                        <span>Continue Assessment</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {activeScheduledAssessments.length === 0 && searchTerm && (
            <div className="text-center py-8">
              <AlertCircle className="text-gray-400 mx-auto mb-4" size={48} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No active assessments found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      )}

      {/* Empty State - No assessments at all */}
      {activeScheduledAssessments.length === 0 && !searchTerm && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-12 text-center">
          <AlertCircle className="text-gray-400 mx-auto mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No assessments found</h3>
          <p className="text-gray-600">Get started by scheduling your first field assessment</p>
        </div>
      )}
    </div>
  )
}