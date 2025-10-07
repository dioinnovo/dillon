'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  FileText, Download, Eye, Search, Filter, Calendar, CheckCircle,
  AlertCircle, Clock, MapPin, User, Building2, DollarSign,
  TrendingUp, Star, Home, Shield, Award, Send, Edit
} from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'

interface CompletedProjectReport {
  id: string
  projectNumber: string
  assessmentId?: string // Link to field assessment for review
  site: {
    address: string
    type: 'residential' | 'commercial' | 'industrial' | 'infrastructure'
    client: string
    imageUrl?: string
  }
  completedDate: Date | string
  assessmentType: string
  projectManager?: {
    name: string
    rating: number
  }
  status: 'approved' | 'pending_approval' | 'in_review' | 'sent'
  deliverable: {
    estimated: number
    final: number
    variance: number
  }
  reportUrl?: string
  completenessScore: number
  timeToComplete: string
}

const mockCompletedReports: CompletedProjectReport[] = [
  {
    id: '1',
    projectNumber: 'PROJ-2024-003',
    site: {
      address: '789 Former Gas Station Site, Guelph, ON',
      type: 'commercial',
      client: 'Developer Corp - Brownfield Holdings',
      imageUrl: 'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=800&h=600&fit=crop'
    },
    completedDate: new Date(2024, 0, 15),
    assessmentType: 'Phase I ESA',
    projectManager: {
      name: 'Emily Patel, P.Geo',
      rating: 4.9
    },
    status: 'approved' as const,
    deliverable: {
      estimated: 25000,
      final: 28500,
      variance: 14.0
    },
    completenessScore: 96,
    timeToComplete: '4 days',
    reportUrl: '/reports/guelph-phase1-esa.pdf'
  },
  {
    id: '2',
    projectNumber: 'PROJ-2024-002',
    site: {
      address: 'Grand River Bridge - Fischer-Hallman Road, Waterloo, ON',
      type: 'infrastructure',
      client: 'Region of Waterloo',
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'
    },
    completedDate: new Date(2024, 0, 14),
    assessmentType: 'Infrastructure Assessment',
    projectManager: {
      name: 'James Rodriguez, P.Eng',
      rating: 4.8
    },
    status: 'approved' as const,
    deliverable: {
      estimated: 265000,
      final: 285000,
      variance: 7.5
    },
    completenessScore: 94,
    timeToComplete: '6 weeks',
    reportUrl: '/reports/waterloo-bridge-assessment.pdf'
  },
  {
    id: '3',
    projectNumber: 'PROJ-2024-010',
    site: {
      address: 'Proposed Subdivision - North 40 Acres, Oakville, ON',
      type: 'residential',
      client: 'Residential Developer Inc.',
      imageUrl: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop'
    },
    completedDate: new Date(2024, 0, 13),
    assessmentType: 'Geotechnical',
    projectManager: {
      name: 'Rachel Green, P.Eng',
      rating: 4.7
    },
    status: 'pending_approval' as const,
    deliverable: {
      estimated: 85000,
      final: 88000,
      variance: 3.5
    },
    completenessScore: 91,
    timeToComplete: '3 weeks',
    reportUrl: '/reports/oakville-geotechnical.pdf'
  },
  {
    id: '4',
    projectNumber: 'PROJ-2024-001',
    site: {
      address: '425 Industrial Drive, Cambridge, ON',
      type: 'industrial',
      client: 'City of Cambridge',
      imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop'
    },
    completedDate: new Date(2024, 0, 12),
    assessmentType: 'Phase II ESA',
    projectManager: {
      name: 'Sarah Chen, P.Eng',
      rating: 4.9
    },
    status: 'approved' as const,
    deliverable: {
      estimated: 130000,
      final: 145000,
      variance: 11.5
    },
    completenessScore: 93,
    timeToComplete: '8 weeks',
    reportUrl: '/reports/cambridge-phase2-esa.pdf'
  },
  {
    id: '5',
    projectNumber: 'PROJ-2024-008',
    assessmentId: 'ASM-006', // Assessment ID for review page
    site: {
      address: 'Lakeshore Road Water Main Replacement, Mississauga, ON',
      type: 'infrastructure',
      client: 'City of Mississauga',
      imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop'
    },
    completedDate: new Date(2024, 0, 11),
    assessmentType: 'Infrastructure Assessment',
    projectManager: {
      name: 'Thomas Anderson, P.Eng',
      rating: 4.6
    },
    status: 'in_review' as const,
    deliverable: {
      estimated: 180000,
      final: 195000,
      variance: 8.3
    },
    completenessScore: 87,
    timeToComplete: '5 weeks',
    reportUrl: '/reports/mississauga-infrastructure.pdf'
  },
  {
    id: '6',
    projectNumber: 'PROJ-2024-004',
    site: {
      address: 'Proposed Wastewater Treatment Plant Expansion, London, ON',
      type: 'infrastructure',
      client: 'Municipal Infrastructure Canada',
      imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop'
    },
    completedDate: new Date(2024, 0, 10),
    assessmentType: 'Geotechnical',
    projectManager: {
      name: 'Dr. Robert Kim, P.Eng, Ph.D.',
      rating: 4.8
    },
    status: 'approved' as const,
    deliverable: {
      estimated: 155000,
      final: 175000,
      variance: 12.9
    },
    completenessScore: 95,
    timeToComplete: '7 weeks',
    reportUrl: '/reports/london-geotechnical.pdf'
  }
]

export default function ReportsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'approved' | 'pending_approval' | 'in_review' | 'sent'>('all')
  const [reports, setReports] = useState<CompletedProjectReport[]>(mockCompletedReports)

  useEffect(() => {
    // Load reports from sessionStorage
    const storedReports = sessionStorage.getItem('assessment_reports')
    if (storedReports) {
      const parsed = JSON.parse(storedReports)
      // Ensure all reports have assigned project managers
      const reportsWithManagers = parsed.map((report: any) => ({
        ...report,
        projectManager: report.projectManager || {
          name: 'John Smith, P.Eng',
          rating: 4.8
        }
      }))
      // Merge with mock data, new reports first
      setReports([...reportsWithManagers, ...mockCompletedReports])
    }
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800'
      case 'pending_approval':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800'
      case 'in_review':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800'
      case 'sent':
        return 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800'
      case 'requires_revision':
        return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800'
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4" />
      case 'pending_approval':
        return <Clock className="w-4 h-4" />
      case 'in_review':
        return <Edit className="w-4 h-4" />
      case 'sent':
        return <Send className="w-4 h-4" />
      case 'requires_revision':
        return <AlertCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const filteredReports = reports.filter(report => {
    const matchesSearch =
      report.site.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.projectNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.site.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (report.projectManager?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false)

    const matchesFilter =
      selectedFilter === 'all' ||
      (selectedFilter === 'approved' && report.status === 'approved') ||
      (selectedFilter === 'pending_approval' && report.status === 'pending_approval') ||
      (selectedFilter === 'in_review' && report.status === 'in_review') ||
      (selectedFilter === 'sent' && report.status === 'sent')

    return matchesSearch && matchesFilter
  })

  const stats = {
    total: reports.length,
    approved: reports.filter(r => r.status === 'approved').length,
    pending: reports.filter(r => r.status === 'pending_approval').length,
    inReview: reports.filter(r => r.status === 'in_review').length,
    sent: reports.filter(r => r.status === 'sent').length,
    totalValue: reports.filter(r => r.status === 'approved').reduce((acc, r) => acc + r.deliverable.final, 0),
    averageVariance: reports.filter(r => r.status === 'approved' && r.deliverable.variance > 0)
      .reduce((acc, r, _, arr) => acc + r.deliverable.variance / arr.length, 0)
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <PageHeader
        title="Project Reports"
        description="AI-powered deliverables and comprehensive project documentation"
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-8 h-8 text-gray-400" />
            <span className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 rounded">Total</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.total}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Reports Generated</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <span className="text-xs font-medium px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded">Approved</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.approved}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Ready to Deliver</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8 text-green-600" />
            <span className="text-xs font-medium px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded">Value</span>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{formatCurrency(stats.totalValue)}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Total Project Value</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-dillon-green" />
            <span className="text-xs font-medium px-2 py-1 bg-green-100 dark:bg-green-900/20 text-dillon-green dark:text-green-400 rounded">Avg</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">+{stats.averageVariance.toFixed(1)}%</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Budget Variance</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by site, project number, or project manager..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-dillon-green/20 focus:border-dillon-green"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['all', 'approved', 'pending_approval', 'in_review', 'sent'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter as any)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedFilter === filter
                    ? 'bg-dillon-green text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {filter === 'all' ? `All (${stats.total})` :
                 filter === 'approved' ? `Approved (${stats.approved})` :
                 filter === 'pending_approval' ? `Pending (${stats.pending})` :
                 filter === 'in_review' ? `In Review (${stats.inReview})` :
                 filter === 'sent' ? `Sent (${stats.sent})` :
                 'Other'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredReports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
                 onClick={() => {
                   if (report.status === 'approved' || report.status === 'sent') {
                     // For approved/sent reports, go to the comprehensive report view
                     const assessmentId = report.assessmentId || 'ASM-002';
                     router.push(`/dashboard/inspection/${assessmentId}/report`);
                   } else if (report.status === 'in_review') {
                     // For in_review reports, use the assessment review page
                     const assessmentId = report.assessmentId || 'ASM-002';
                     router.push(`/dashboard/inspection/${assessmentId}/review`);
                   } else {
                     // For pending_approval, go to a review page
                     router.push(`/dashboard/reports/${report.id}/review`);
                   }
                 }}>
              {/* Site Image with Overlay */}
              <div className="relative h-48">
                <img
                  src={report.site.imageUrl || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'}
                  alt={report.site.address}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Site Type Badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 shadow-lg">
                    {report.site.type === 'residential' ?
                      <Home className="w-3.5 h-3.5" /> :
                      <Building2 className="w-3.5 h-3.5" />
                    }
                    {report.site.type}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                    {getStatusIcon(report.status)}
                    {report.status === 'approved' ? 'Approved' :
                     report.status === 'pending_approval' ? 'Pending Approval' :
                     report.status === 'in_review' ? 'In Review' :
                     report.status === 'sent' ? 'Sent' :
                     report.status === 'requires_revision' ? 'Requires Revision' : 'Unknown'}
                  </span>
                </div>

                {/* Site Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-lg leading-tight drop-shadow-lg">
                    {report.site.address.split(',')[0]}
                  </h3>
                  <p className="text-white/90 text-sm mt-1">
                    {report.site.client}
                  </p>
                </div>
              </div>

              {/* Report Details */}
              <div className="p-5">
                {/* Project Info */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Project Number</p>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">{report.projectNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Completed</p>
                    <p className="font-medium text-gray-700 dark:text-gray-300">
                      {typeof report.completedDate === 'string'
                        ? new Date(report.completedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                        : report.completedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>

                {/* Deliverable Info */}
                {report.status === 'approved' && (
                  <div className="bg-green-50 dark:bg-green-900/10 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Project Value</span>
                      <span className="text-xs font-medium px-2 py-0.5 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded">
                        +{report.deliverable.variance}%
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold text-green-600">
                        {formatCurrency(report.deliverable.final)}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                        {formatCurrency(report.deliverable.estimated)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Report Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Shield className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Assessment</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{report.assessmentType}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Award className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Completeness</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{report.completenessScore}%</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{report.timeToComplete}</p>
                  </div>
                </div>

                {/* Project Manager Info */}
                <div className="flex items-center gap-2 py-3 border-t border-gray-100 dark:border-gray-800">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {report.projectManager?.name || 'Project Manager Assigned'}
                    </p>
                    {report.projectManager && (
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">{report.projectManager.rating}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-3">
                  {report.status === 'pending_approval' ? (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Use the assessment review page for pending approval reports
                          const assessmentId = report.assessmentId || 'ASM-002';
                          router.push(`/dashboard/inspection/${assessmentId}/review`);
                        }}
                        className="col-span-2 flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
                      >
                        <Edit className="w-4 h-4" />
                        <span className="text-sm font-medium">Review & Approve</span>
                      </button>
                    </>
                  ) : report.status === 'in_review' ? (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Use the assessment review page for in-review reports
                          const assessmentId = report.assessmentId || 'ASM-006';
                          router.push(`/dashboard/inspection/${assessmentId}/review`);
                        }}
                        className="col-span-2 flex items-center justify-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
                      >
                        <Edit className="w-4 h-4" />
                        <span className="text-sm font-medium">Continue Review</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // View the comprehensive report
                          const assessmentId = report.assessmentId || 'ASM-002';
                          router.push(`/dashboard/inspection/${assessmentId}/report`);
                        }}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="text-sm font-medium">View</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('PDF download would be triggered here');
                        }}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-dillon-green text-white rounded-lg hover:bg-dillon-green-dark transition"
                      >
                        <Download className="w-4 h-4" />
                        <span className="text-sm font-medium">PDF</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredReports.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12">
          <div className="text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No Reports Found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm ? 'Try adjusting your search or filters' : 'No completed reports available'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}