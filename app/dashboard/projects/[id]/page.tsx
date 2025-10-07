'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft, User, Phone, Mail, MapPin, Calendar, Building2, Home,
  FileText, Camera, History, Shield, CheckCircle, Clock, AlertTriangle,
  DollarSign, Download, Edit, Save, X, Plus, Upload, Eye, Send,
  TrendingUp, TrendingDown, AlertCircle, FileSearch, Briefcase, Star, CalendarCheck,
  Droplets, Check, Target, Zap, Brain, Calculator, ChevronDown,
  CloudRain, Image, XCircle
} from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { FileUploadModal } from '@/components/ui/file-upload-modal'
import { Button } from '@/components/ui/button'
import { SectionHeader } from '@/components/ui/section-header'

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [documents, setDocuments] = useState<any[]>([])


  // Mock data - in real app, fetch based on params.id
  const project = {
    id: params.id,
    projectNumber: 'DL-2024-ENV-001',
    projectType: 'Phase II ESA',
    status: 'Field Work',
    phase: 'Sample Collection',
    createdDate: '2024-01-15',
    lastUpdated: '2024-03-18',
    contractValue: 145000,
    spentToDate: 94250,
    
    // Client Information
    client: {
      name: 'City of Cambridge',
      organization: 'Public Works Department',
      contact: 'John Smith, P.Eng',
      phone: '(519) 555-0123',
      email: 'jsmith@cambridge.ca',
      preferredContact: 'Email',
      relationshipScore: 4.8
    },

    // Site Details
    site: {
      address: '425 Industrial Drive, Cambridge, ON N1R 7H6',
      type: 'Former Manufacturing Facility',
      siteArea: '2.5 hectares',
      historicalUse: 'Metal Fabrication (1965-2010)',
      currentZoning: 'Industrial - Brownfield Redevelopment',
      yearBuilt: 1965,
      lastActive: 2010,
      environmentalConcerns: ['Petroleum Hydrocarbons', 'Heavy Metals (Lead, Arsenic)', 'Volatile Organic Compounds'],
      imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop&q=80'
    },

    // Scope & Objectives
    scope: {
      objectives: [
        'Assess soil and groundwater contamination levels',
        'Identify environmental liabilities for brownfield redevelopment',
        'Support Record of Site Condition (RSC) application',
        'Evaluate remediation requirements and options'
      ],
      deliverables: [
        'Sampling & Analysis Plan (SAP)',
        'Field Investigation Report',
        'Laboratory Analysis Results',
        'Risk Assessment Report',
        'Remedial Options Assessment'
      ]
    },

    // Regulatory Details
    regulatory: {
      primaryAgency: 'Ministry of Environment, Conservation and Parks (MECP)',
      permits: ['O. Reg. 153/04 Compliance', 'Excess Soil Management'],
      standards: ['MECP Table 3 (Industrial/Commercial)', 'CCME Soil Quality Guidelines'],
      rsc: 'Required for Site Redevelopment',
      complianceStatus: 'In Progress'
    },

    // Field Work Status
    fieldWork: {
      scheduled: '2024-03-20',
      fieldTechnician: 'Michael Torres, C.E.T.',
      status: 'In Progress',
      progress: 65,
      sampleLocations: 24,
      samplesCollected: 18,
      samplesAnalyzed: 12,
      requirements: ['Site access secured', 'MECP notification complete', 'Lab contracted (ALS Environmental)']
    },
    
    // Project Team
    team: {
      projectManager: { name: 'Sarah Chen, P.Eng', role: 'Project Manager', phone: '(519) 555-1001' },
      fieldTechnician: { name: 'Michael Torres, C.E.T.', role: 'Field Technician', phone: '(519) 555-1002' },
      labCoordinator: { name: 'ALS Environmental', role: 'Laboratory Services', phone: '1-800-555-2553' },
      qaqcReviewer: { name: 'Dr. Robert Kim, P.Eng, Ph.D.', role: 'QA/QC Review', status: 'Pending' }
    },

    // Budget
    budget: {
      contractValue: 145000,
      spent: 94250,
      remaining: 50750,
      variance: 2.4, // % under budget
      contingency: 14500,
      billingStatus: 'On Track'
    },

    // Documents
    documents: [
      { name: 'Sampling_Analysis_Plan.pdf', date: '2024-02-15', size: '3.2 MB', type: 'plan' },
      { name: 'MECP_Notification.pdf', date: '2024-02-20', size: '0.8 MB', type: 'regulatory' },
      { name: 'Site_Photos_Historical.zip', date: '2024-02-25', size: '45.2 MB', type: 'photos' },
      { name: 'Borehole_Logs_SB01-SB06.pdf', date: '2024-03-10', size: '5.1 MB', type: 'fieldwork' },
      { name: 'Lab_Results_Soil_Batch1.pdf', date: '2024-03-18', size: '2.4 MB', type: 'labresults' },
      { name: 'Lab_Results_Groundwater.pdf', date: '2024-03-20', size: '1.8 MB', type: 'labresults' },
      { name: 'Field_Photos_Sampling.zip', date: '2024-03-12', size: '38.5 MB', type: 'photos' }
    ],

    // Timeline Events
    timeline: [
      {
        id: 1,
        date: '2024-01-15',
        time: '09:30 AM',
        type: 'kickoff',
        title: 'Project Initiated',
        description: 'Proposal accepted by City of Cambridge for Phase II ESA brownfield site assessment',
        user: 'Sarah Chen, P.Eng',
        icon: CheckCircle,
        color: 'green'
      },
      {
        id: 2,
        date: '2024-02-01',
        time: '10:15 AM',
        type: 'planning',
        title: 'Site Access Secured',
        description: 'Access agreement signed with property owner, site mobilization scheduled',
        user: 'Sarah Chen, P.Eng',
        icon: FileText,
        color: 'blue'
      },
      {
        id: 3,
        date: '2024-02-15',
        time: '02:30 PM',
        type: 'regulatory',
        title: 'SAP Approved by MECP',
        description: 'Sampling & Analysis Plan approved by Ministry of Environment',
        user: 'MECP',
        icon: Shield,
        color: 'green'
      },
      {
        id: 4,
        date: '2024-02-25',
        time: '11:00 AM',
        type: 'document',
        title: 'Historical Records Reviewed',
        description: 'Completed review of municipal archives, fire insurance plans, and aerial photographs',
        user: 'Michael Torres, C.E.T.',
        documents: ['Historical_Records_Summary.pdf', 'Site_Photos_Historical.zip'],
        icon: Upload,
        color: 'gray'
      },
      {
        id: 5,
        date: '2024-03-05',
        time: '08:00 AM',
        type: 'fieldwork',
        title: 'Field Work Commenced',
        description: 'Mobilized to site, installed 6 soil borings (SB-01 to SB-06) and 3 monitoring wells',
        user: 'Michael Torres, C.E.T.',
        icon: Target,
        color: 'purple'
      },
      {
        id: 6,
        date: '2024-03-10',
        time: '04:00 PM',
        type: 'fieldwork',
        title: 'Sample Collection Complete',
        description: '24 samples collected: 18 soil, 6 groundwater. Shipped to ALS Environmental for analysis',
        user: 'Michael Torres, C.E.T.',
        icon: CheckCircle,
        color: 'green'
      },
      {
        id: 7,
        date: '2024-03-18',
        time: '02:15 PM',
        type: 'analysis',
        title: 'AI Contamination Analysis',
        description: 'Dillon AI analyzed lab results, identified PHC exceedances and recommended delineation sampling',
        user: 'Dillon AI',
        icon: Brain,
        color: 'blue',
        highlight: true
      },
      {
        id: 8,
        date: '2024-03-20',
        time: '10:30 AM',
        type: 'report',
        title: 'AI Report Draft Generated',
        description: 'Phase II ESA report auto-generated in 8 minutes (saved 6.5 hours) - ready for P.Eng review',
        user: 'Dillon AI',
        icon: Zap,
        color: 'green',
        highlight: true,
        timeSaved: '6.5 hours',
        costSavings: '$1,625'
      }
    ],

    // Site Assessment
    assessment: {
      status: 'Scheduled',
      inspector: 'Michael Torres, C.E.T.',
      type: 'Environmental Site Assessment'
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'fieldwork', label: 'Field Work', icon: Target },
    { id: 'ai-report', label: 'AI Report Generator', icon: Brain },
    { id: 'timeline', label: 'Timeline', icon: History },
    { id: 'documents', label: 'Documents', icon: FileSearch }
  ]

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4">
        {/* Back button and Status on same line */}
        <div className="flex items-center justify-between mb-4">
          <Button
            onClick={() => router.push('/dashboard/projects')}
            variant="ghost"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back to Projects</span>
          </Button>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
        </div>

        {/* Title Row */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
              Project {project.projectNumber}
            </h1>
          </div>
        </div>

        {/* Site Image with Address Overlay */}
        <div className="relative h-48 sm:h-64 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          <img
            src={project.site.imageUrl}
            alt={project.site.address}
            className="w-full h-full object-cover"
          />

          {/* Dark gradient from bottom */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/60 to-transparent" />

          {/* Site Address */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-bold text-white text-lg sm:text-xl leading-tight drop-shadow-lg">
              {project.site.address}
            </h3>
          </div>

          {/* Site Type Badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-gray-900/90 text-gray-800 shadow-lg">
              {project.site.type}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-4">
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-dillon-green hover:bg-dillon-green-dark text-white"
            title={isEditing ? "Save changes" : "Edit project information"}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4" />
                Save
              </>
            ) : (
              <>
                <Edit className="w-4 h-4" />
                Edit
              </>
            )}
          </Button>
          <Button variant="secondary">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>

        {/* Quick Stats - Project Budget Metrics */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Contract Value</p>
            <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
              ${project.budget.contractValue.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Spent to Date</p>
            <p className="text-lg sm:text-2xl font-bold text-dillon-green">
              ${project.budget.spent.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Remaining Budget</p>
            <p className="text-lg sm:text-2xl font-bold text-blue-600">
              ${project.budget.remaining.toLocaleString()}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
            <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1 mb-1">
              <TrendingDown className="w-3 h-3" />
              Budget Variance
            </p>
            <p className="text-lg sm:text-2xl font-bold text-green-600">
              {project.budget.variance}% under
            </p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">Ahead of forecast</p>
          </div>
        </div>
      </div>

      {/* Tabs - Mobile Optimized */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm">
        <div className="border-b border-gray-200 dark:border-gray-700">
          {/* Mobile: All 5 tabs fit on screen */}
          <div className="sm:hidden flex w-full">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 px-1 border-b-2 transition-all min-w-0 ${
                    activeTab === tab.id
                      ? 'border-dillon-green text-dillon-green bg-green-50 dark:bg-green-900/10'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <Icon size={16} />
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Tablet: Show all 5 tabs with smaller sizing */}
          <div className="hidden sm:flex lg:hidden w-full">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex flex-col items-center gap-1 py-2.5 px-2 border-b-2 transition-all min-w-0 ${
                    activeTab === tab.id
                      ? 'border-dillon-green text-dillon-green bg-green-50 dark:bg-green-900/10'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Desktop: Full width tabs */}
          <div className="hidden lg:flex w-full">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center gap-2 py-3 px-4 border-b-2 transition-all justify-center ${
                    activeTab === tab.id
                      ? 'border-dillon-green text-dillon-green bg-green-50 dark:bg-green-900/10'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="p-4">
          {/* Overview Tab - Combined Client, Site & Project Info */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Client Information */}
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Client Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Organization</span>
                      <span className="font-medium">{project.client.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Department</span>
                      <span className="font-medium">{project.client.organization}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Contact</span>
                      <span className="font-medium">{project.client.contact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Phone</span>
                      <span className="font-medium">{project.client.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Email</span>
                      <span className="font-medium text-sm">{project.client.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Relationship Score</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-current" />
                        <span className="font-medium">{project.client.relationshipScore}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Site Details */}
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Site Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Type</span>
                      <span className="font-medium">{project.site.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Address</span>
                      <span className="font-medium text-sm text-right max-w-[200px]">{project.site.address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Site Area</span>
                      <span className="font-medium">{project.site.siteArea}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Historical Use</span>
                      <span className="font-medium text-sm text-right max-w-[200px]">{project.site.historicalUse}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Current Zoning</span>
                      <span className="font-medium text-sm text-right max-w-[200px]">{project.site.currentZoning}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scope & Regulatory Compliance */}
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Scope & Regulatory Compliance
                  </h3>
                <div className="space-y-4">
                  {/* Objectives */}
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Project Objectives</p>
                    <ul className="space-y-1">
                      {project.scope.objectives.map((obj: string, idx: number) => (
                        <li key={idx} className="text-sm flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-dillon-green mt-0.5 flex-shrink-0" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Regulatory Framework */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Primary Agency</p>
                      <p className="font-medium text-sm">{project.regulatory.primaryAgency}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">RSC Required</p>
                      <p className="font-medium">{project.regulatory.rsc}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Standards</p>
                      <div className="flex flex-wrap gap-2">
                        {project.regulatory.standards.map((std: string, idx: number) => (
                          <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                            {std}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Permits & Compliance</p>
                      <div className="flex flex-wrap gap-2">
                        {project.regulatory.permits.map((permit: string, idx: number) => (
                          <span key={idx} className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs">
                            {permit}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Key Deliverables</p>
                    <div className="flex flex-wrap gap-2">
                      {project.scope.deliverables.map((deliverable: string, idx: number) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs">
                          {deliverable}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dates at the bottom */}
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    <span>Created: {project.createdDate}</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    <span>Updated: {project.lastUpdated}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Field Work Tab - Site Investigation & Sampling */}
          {activeTab === 'fieldwork' && (
            <div className="space-y-6">
              {/* Field Work Status Dashboard */}
              <div className="bg-white dark:bg-gray-900 border border-gray-200 rounded-xl p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <Target className="text-dillon-green" size={20} />
                    Field Investigation Status
                  </h3>
                  <span className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs sm:text-sm font-medium self-start sm:self-auto">
                    {project.fieldWork.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 sm:p-4 text-center">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">{project.fieldWork.progress}%</p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Progress</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 sm:p-4 text-center">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-dillon-green">{project.fieldWork.samplesCollected}</p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Samples Collected</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 sm:p-4 text-center">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">{project.fieldWork.samplesAnalyzed}</p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Lab Results In</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 sm:p-4 text-center">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">{project.fieldWork.sampleLocations}</p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Total Locations</p>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Field Work Completion</h4>
                    <span className="text-sm text-dillon-green font-medium">On Schedule</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 mb-2">
                    <div className="bg-dillon-green h-2 rounded-full" style={{ width: `${project.fieldWork.progress}%` }}></div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Soil and groundwater sampling progressing as planned. {project.fieldWork.sampleLocations - project.fieldWork.samplesCollected} locations remaining.</p>
                </div>
              </div>

              {/* Cost Analysis Dashboard */}
              <div className="bg-white dark:bg-gray-900 border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <Calculator className="text-dillon-green" size={20} />
                  Project Cost Analysis
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Labor & Personnel Costs */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Labor & Personnel</h4>
                    <div className="space-y-3">
                      {[
                        { category: 'Field Technicians (C.E.T.)', hours: 156, rate: 85, total: 13260, status: 'On Budget' },
                        { category: 'Project Manager (P.Eng)', hours: 42, rate: 165, total: 6930, status: 'On Budget' },
                        { category: 'Lab Coordination', hours: 28, rate: 95, total: 2660, status: 'Under Budget' },
                        { category: 'QA/QC Review (P.Eng)', hours: 18, rate: 175, total: 3150, status: 'Under Budget' }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 dark:text-gray-100">{item.category}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {item.hours} hrs @ ${item.rate}/hr
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">${item.total.toLocaleString()}</p>
                              <p className={`text-xs font-medium ${
                                item.status === 'On Budget' ? 'text-blue-600' :
                                item.status === 'Under Budget' ? 'text-green-600' :
                                'text-yellow-600'
                              }`}>{item.status}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Materials & Equipment */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Materials & Equipment</h4>
                    <div className="space-y-3">
                      {[
                        { item: 'Laboratory Analysis (ALS Environmental)', quantity: '24 samples', cost: 28800, status: 'Invoiced' },
                        { item: 'Drilling & Sampling Equipment', quantity: '18 locations', cost: 12400, status: 'Paid' },
                        { item: 'Monitoring Well Installation', quantity: '3 wells', cost: 8950, status: 'Paid' },
                        { item: 'Site Safety & PPE', quantity: 'Lump sum', cost: 2150, status: 'Paid' }
                      ].map((expense, index) => (
                        <div key={index} className="bg-white dark:bg-gray-900 border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">{expense.item}</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {expense.quantity}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gray-900 dark:text-gray-100">${expense.cost.toLocaleString()}</p>
                              <span className={`text-xs font-medium ${
                                expense.status === 'Paid' ? 'text-green-600' : 'text-blue-600'
                              }`}>{expense.status}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        <strong>Budget Status:</strong> $50,750 remaining (2.4% under budget for this phase)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Regulatory Compliance Checker */}
              <div className="bg-white dark:bg-gray-900 border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <Shield className="text-dillon-green" size={20} />
                  AI Regulatory Compliance Checker
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Compliance Status */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Automated Compliance Analysis</h4>
                    <div className="space-y-2">
                      {[
                        { regulation: 'O. Reg. 153/04 - Record of Site Condition', status: 'Compliant', confidence: 97, flag: 'Verified' },
                        { regulation: 'MECP Table 3 Standards', status: 'Non-Compliant', confidence: 94, flag: 'Action Required' },
                        { regulation: 'CCME Soil Quality Guidelines', status: 'Compliant', confidence: 92, flag: 'Verified' },
                        { regulation: 'ASTM E1527-21 Phase II Standards', status: 'Compliant', confidence: 89, flag: 'Verified' },
                        { regulation: 'Excess Soil Management (O. Reg. 406/19)', status: 'Pending Review', confidence: 85, flag: 'In Progress' }
                      ].map((check, index) => (
                        <div key={index} className="bg-white dark:bg-gray-900 rounded-lg p-3 border border-gray-200 hover:border-gray-300 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 flex-1">
                              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                                check.status === 'Compliant' ? 'bg-green-50' :
                                check.status === 'Non-Compliant' ? 'bg-red-50' :
                                'bg-yellow-50'
                              }`}>
                                {check.status === 'Compliant' ? (
                                  <CheckCircle className="w-5 h-5 text-green-600" />
                                ) : check.status === 'Non-Compliant' ? (
                                  <AlertTriangle className="w-5 h-5 text-red-600" />
                                ) : (
                                  <Clock className="w-5 h-5 text-yellow-600" />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-sm text-gray-900 dark:text-gray-100">{check.regulation}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                    check.status === 'Compliant' ? 'bg-green-100 text-green-700' :
                                    check.status === 'Non-Compliant' ? 'bg-red-100 text-red-700' :
                                    'bg-yellow-100 text-yellow-700'
                                  }`}>
                                    {check.status}
                                  </span>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
                                  <span className="text-xs text-gray-600 dark:text-gray-400">{check.confidence}% AI Confidence</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Recommendations */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">AI-Generated Action Items</h4>
                    <div className="space-y-3">
                      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200">
                        <div className="flex items-center gap-3 mb-2">
                          <AlertTriangle className="text-red-600" size={20} />
                          <span className="font-medium text-sm text-red-900 dark:text-red-100">MECP Table 3 Exceedance</span>
                        </div>
                        <p className="text-xs text-red-800 dark:text-red-200 ml-7 mb-2">PHC F2 detected at 850 mg/kg (limit: 260 mg/kg industrial)</p>
                        <p className="text-xs font-medium text-red-900 dark:text-red-100 ml-7">Next Step: Delineation sampling required per O. Reg. 153/04</p>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200">
                        <div className="flex items-center gap-3 mb-2">
                          <CheckCircle className="text-green-600" size={20} />
                          <span className="font-medium text-sm text-green-900 dark:text-green-100">RSC Eligibility</span>
                        </div>
                        <p className="text-xs text-green-800 dark:text-green-200 ml-7">Site meets criteria for RSC application after remediation</p>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200">
                        <div className="flex items-center gap-3 mb-2">
                          <Brain className="text-blue-600" size={20} />
                          <span className="font-medium text-sm text-blue-900 dark:text-blue-100">AI Insight</span>
                        </div>
                        <p className="text-xs text-blue-800 dark:text-blue-200 ml-7">Based on 12 similar brownfield projects, recommend targeted excavation (est. $45K-$65K)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Report Generator Tab - SHOWCASE FEATURE */}
          {activeTab === 'ai-report' && (
            <div className="space-y-6">
              {/* Time Savings Highlight */}
              <div className="bg-gradient-to-br from-dillon-green/10 to-blue-50 dark:from-dillon-green/5 dark:to-blue-900/20 border-2 border-dillon-green rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3 mb-2">
                      <Zap className="text-dillon-green" size={32} />
                      AI-Powered Report Generation
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">Transform 8 hours of manual work into 8 minutes</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-dillon-green">$1,625</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Saved per report</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">6.5 hrs</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Time Saved</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-dillon-green">94%</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Accuracy Rate</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600">75 yrs</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Knowledge Base</div>
                  </div>
                </div>
              </div>

              {/* Report Generation Status */}
              <div className="bg-white dark:bg-gray-900 border border-gray-200 rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-4">Phase II ESA Report - Auto-Generation Complete</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-600" size={24} />
                      <div>
                        <p className="font-medium">Executive Summary</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Generated in 45 seconds</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-green-600">AI Confidence: 96%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-600" size={24} />
                      <div>
                        <p className="font-medium">Site Background & History</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">RAG: Referenced 12 similar brownfield projects</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-green-600">AI Confidence: 92%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-600" size={24} />
                      <div>
                        <p className="font-medium">Contamination Analysis</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Auto-interpreted lab results vs MECP Table 3</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-green-600">AI Confidence: 89%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="text-yellow-600" size={24} />
                      <div>
                        <p className="font-medium">Regulatory Compliance Statement</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Flagged for P.Eng review - regulatory interpretation</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-yellow-600">Human QA Required</span>
                  </div>
                </div>
              </div>

              {/* RAG Knowledge Base */}
              <div className="bg-white dark:bg-gray-900 border border-gray-200 rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Brain className="text-blue-600" size={20} />
                  AI Knowledge Base - Cross-Project Insights
                </h4>
                <div className="space-y-3">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">Referenced Similar Projects (12 found)</p>
                    <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                      <li>• PROJ-2018-045: Cambridge brownfield - similar metal fabrication history</li>
                      <li>• PROJ-2020-112: Guelph industrial - PHC remediation approach applied</li>
                      <li>• PROJ-2019-087: Waterloo manufacturing - delineation sampling protocol</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <p className="text-sm font-medium text-green-900 dark:text-green-100 mb-2">Best Practice Recommendations</p>
                    <p className="text-sm text-green-800 dark:text-green-200">Based on historical success: Recommend targeted excavation over in-situ treatment (cost savings: $25K-$40K, timeline reduction: 3-4 weeks)</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Timeline Tab - Activity Feed */}
          {activeTab === 'timeline' && (
            <div className="space-y-6">
              <SectionHeader
                title="Project Timeline"
                description="Complete activity history and project milestones"
                actions={[
                  {
                    label: "Add Event",
                    icon: Plus,
                    className: "bg-dillon-green hover:bg-dillon-green-dark text-white"
                  },
                  {
                    label: "Generate Report",
                    icon: Download,
                    variant: "outline"
                  }
                ]}
              />

              {/* Timeline Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{project.timeline.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Events</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">9</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Days Elapsed</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">3</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Documents</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-green-600">Active</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                </div>
              </div>

              {/* Activity Feed */}
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

                <div className="space-y-4">
                  {project.timeline.map((event, index) => {
                    const Icon = event.icon || Calendar
                    const getEventColor = () => {
                      switch(event.color) {
                        case 'red': return 'bg-red-500'
                        case 'blue': return 'bg-blue-500'
                        case 'green': return 'bg-green-500'
                        case 'yellow': return 'bg-yellow-500'
                        case 'purple': return 'bg-purple-500'
                        case 'gray': return 'bg-gray-500'
                        default: return 'bg-gray-500'
                      }
                    }

                    return (
                      <div key={event.id} className="relative flex items-start gap-4 group">
                        {/* Icon */}
                        <div className={`relative z-10 w-16 h-16 rounded-full ${getEventColor()} flex items-center justify-center shadow-lg`}>
                          <Icon className="text-white" size={24} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100">{event.title}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{event.description}</p>
                            </div>
                            {event.amount && (
                              <span className="text-lg font-bold text-green-600">
                                ${event.amount.toLocaleString()}
                              </span>
                            )}
                          </div>

                          {/* Metadata */}
                          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-3">
                            <div className="flex items-center gap-1">
                              <Calendar size={12} />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={12} />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User size={12} />
                              <span>{event.user}</span>
                            </div>
                          </div>

                          {/* Documents if attached */}
                          {event.documents && event.documents.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Attached Documents:</p>
                              <div className="flex flex-wrap gap-2">
                                {event.documents.map((doc, docIndex) => (
                                  <span key={docIndex} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                                    <FileText size={10} />
                                    {doc}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Load More */}
              <div className="flex items-center justify-center pt-4">
                <Button variant="ghost" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                  Show older events
                </Button>
              </div>
            </div>
          )}

          {/* Documents Tab - Enhanced with Photos and Documents */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <SectionHeader
                title="Documents & Evidence"
                description="All claim documentation, photos, and evidence in one place"
                actions={[
                  {
                    label: "Upload Files",
                    icon: Upload,
                    onClick: () => setShowUploadModal(true),
                    className: "bg-scc-red hover:bg-red-600 text-white"
                  }
                ]}
              />

              {/* Evidence Completion Score */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-green-900">Evidence Completion Score</h4>
                  <span className="text-xl sm:text-2xl font-bold text-green-600">85%</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-3 mb-2">
                  <div className="bg-green-600 h-3 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <p className="text-sm text-green-800">Great progress! Photos and core documents are complete.</p>
              </div>

              {/* Documents Grid - 5 Cards including Assessment Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {/* Damage Documentation Card */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <Camera className="text-gray-600" size={20} />
                    Damage Documentation
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <FileText className="text-blue-600 flex-shrink-0" size={20} />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 dark:text-gray-100 truncate">Inspection_Report.pdf</p>
                          <p className="text-xs text-gray-500 truncate">2.4 MB • March 17, 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="View">
                          <Eye className="text-gray-600" size={16} />
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="Download">
                          <Download className="text-gray-600" size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <FileText className="text-blue-600 flex-shrink-0" size={20} />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 dark:text-gray-100 truncate">Initial_Damage_Report.pdf</p>
                          <p className="text-xs text-gray-500 truncate">1.8 MB • March 15, 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="View">
                          <Eye className="text-gray-600" size={16} />
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="Download">
                          <Download className="text-gray-600" size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <Image className="text-purple-600 flex-shrink-0" size={20} />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 dark:text-gray-100 truncate">Property_Photos.zip</p>
                          <p className="text-xs text-gray-500 truncate">45.2 MB • March 16, 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="View">
                          <Eye className="text-gray-600" size={16} />
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="Download">
                          <Download className="text-gray-600" size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Insurance Documents Card */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <Shield className="text-gray-600" size={20} />
                    Insurance Documents
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <FileText className="text-purple-600 flex-shrink-0" size={20} />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 dark:text-gray-100 truncate">Insurance_Policy.pdf</p>
                          <p className="text-xs text-gray-500 truncate">1.8 MB • March 15, 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="View">
                          <Eye className="text-gray-600" size={16} />
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="Download">
                          <Download className="text-gray-600" size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <FileText className="text-purple-600 flex-shrink-0" size={20} />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 dark:text-gray-100 truncate">Declaration_Pages.pdf</p>
                          <p className="text-xs text-gray-500 truncate">445 KB • March 15, 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="View">
                          <Eye className="text-gray-600" size={16} />
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="Download">
                          <Download className="text-gray-600" size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <FileText className="text-purple-600 flex-shrink-0" size={20} />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 dark:text-gray-100 truncate">Policy_Analysis.pdf</p>
                          <p className="text-xs text-gray-500 truncate">890 KB • March 18, 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="View">
                          <Eye className="text-gray-600" size={16} />
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="Download">
                          <Download className="text-gray-600" size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Estimates & Invoices Card */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <DollarSign className="text-gray-600" size={20} />
                    Estimates & Invoices
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <div className="flex items-center gap-3 flex-1">
                        <FileText className="text-green-600 flex-shrink-0" size={20} />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 dark:text-gray-100 truncate">Contractor_Estimates.pdf</p>
                          <p className="text-xs text-gray-500 truncate">3.1 MB • March 17, 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="View">
                          <Eye className="text-gray-600" size={16} />
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="Download">
                          <Download className="text-gray-600" size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <div className="flex items-center gap-3 flex-1">
                        <FileText className="text-green-600 flex-shrink-0" size={20} />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 dark:text-gray-100 truncate">Emergency_Repairs_Invoice.pdf</p>
                          <p className="text-xs text-gray-500 truncate">892 KB • March 16, 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <Clock className="text-yellow-500 flex-shrink-0" size={16} />
                        <Button variant="ghost" size="icon" className="h-8 w-8" title="View">
                          <Eye className="text-gray-600" size={16} />
                        </Button>
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="Download">
                          <Download className="text-gray-600" size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <div className="flex items-center gap-3 flex-1">
                        <FileText className="text-gray-400 flex-shrink-0" size={20} />
                        <div className="flex-1">
                          <p className="font-medium text-gray-500">Supplemental_Estimate.pdf</p>
                          <p className="text-xs text-gray-400">Not uploaded</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <XCircle className="text-gray-400 flex-shrink-0" size={16} />
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-50" disabled title="Not available">
                          <Eye className="text-gray-400" size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-50" disabled title="Not available">
                          <Download className="text-gray-400" size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Correspondence Card */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <Mail className="text-gray-600" size={20} />
                    Correspondence
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <div className="flex items-center gap-3 flex-1">
                        <FileText className="text-red-600 flex-shrink-0" size={20} />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 dark:text-gray-100 truncate">Denial_Letter.pdf</p>
                          <p className="text-xs text-gray-500 truncate">234 KB • March 11, 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <AlertTriangle className="text-red-500 flex-shrink-0" size={16} />
                        <Button variant="ghost" size="icon" className="h-8 w-8" title="View">
                          <Eye className="text-gray-600" size={16} />
                        </Button>
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="Download">
                          <Download className="text-gray-600" size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <div className="flex items-center gap-3 flex-1">
                        <FileText className="text-blue-600" size={20} />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 dark:text-gray-100 truncate">Appeal_Letter.pdf</p>
                          <p className="text-xs text-gray-500 truncate">156 KB • March 18, 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="View">
                          <Eye className="text-gray-600" size={16} />
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" title="Download">
                          <Download className="text-gray-600" size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <div className="flex items-center gap-3 flex-1">
                        <FileText className="text-gray-400 flex-shrink-0" size={20} />
                        <div className="flex-1">
                          <p className="font-medium text-gray-500">Follow_up_Correspondence.pdf</p>
                          <p className="text-xs text-gray-400">Not uploaded</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <XCircle className="text-gray-400 flex-shrink-0" size={16} />
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-50" disabled title="Not available">
                          <Eye className="text-gray-400" size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-50" disabled title="Not available">
                          <Download className="text-gray-400" size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Assessment Status Card */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <Camera className="text-gray-600" size={20} />
                    Assessment Status
                  </h4>
                  <div className="space-y-4">
                    {/* Status Badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        project.assessment.status === 'Scheduled'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                          : project.assessment.status === 'In Progress'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : project.assessment.status === 'Completed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                      }`}>
                        {project.assessment.status}
                      </span>
                    </div>

                    {/* Inspection Details */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="text-gray-500" size={16} />
                        <span className="text-gray-600 dark:text-gray-400">Date:</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">March 20, 2024</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="text-gray-500" size={16} />
                        <span className="text-gray-600 dark:text-gray-400">Time:</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">10:00 AM</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <User className="text-gray-500" size={16} />
                        <span className="text-gray-600 dark:text-gray-400">Inspector:</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{project.assessment.inspector}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="text-gray-500" size={16} />
                        <span className="text-gray-600 dark:text-gray-400">Type:</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{project.assessment.type}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 space-y-2">
                      {project.assessment.status === 'Scheduled' && (
                        <Link
                          href={`/dashboard/assessments/ASM-002/start`}
                          className="w-full px-4 py-2 bg-scc-red text-white rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-2 text-sm font-medium"
                        >
                          <Camera size={16} />
                          Start Assessment
                        </Link>
                      )}
                      {project.assessment.status === 'In Progress' && (
                        <>
                          <div className="mb-2">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-600 dark:text-gray-400">Progress</span>
                              <span className="font-medium text-gray-900 dark:text-gray-100">65%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                            </div>
                          </div>
                          <Link
                            href={`/dashboard/assessments/ASM-002/continue`}
                            className="w-full px-4 py-2 bg-scc-red text-white rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-2 text-sm font-medium"
                          >
                            <Camera size={16} />
                            Continue Assessment
                          </Link>
                        </>
                      )}
                      {project.assessment.status === 'Completed' && (
                        <Link
                          href={`/dashboard/assessments/ASM-002/report`}
                          className="w-full px-4 py-2 bg-scc-red text-white rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-2 text-sm font-medium"
                        >
                          <FileText size={16} />
                          View Report
                        </Link>
                      )}
                      {!project.assessment.status || project.assessment.status === 'Not Scheduled' && (
                        <Link
                          href={`/dashboard/inspection/new?projectId=${project.id}`}
                          className="w-full px-4 py-2 bg-scc-red text-white rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-2 text-sm font-medium"
                        >
                          <Calendar size={16} />
                          Schedule Inspection
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary and Download All */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Total Documents: 9 files • 54.8 MB</p>
                </div>
                <Button className="bg-scc-red hover:bg-red-600 text-white">
                  Download All as ZIP
                </Button>
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-6">
              {/* Recommended Action Plan - PRIORITY */}
              <div className="bg-scc-red/10 border border-scc-red/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">🎯 Priority Action Plan</h3>
                  <span className="px-3 py-1 bg-scc-red text-white rounded-full text-sm font-medium">Act Now</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">Based on AI analysis of claim history, take these immediate actions to recover additional funds:</p>
                <ol className="space-y-3">
                  <li className="flex items-start gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg border border-scc-red/20">
                    <div className="w-6 h-6 bg-scc-red text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-gray-100">File supplemental claim for 2021 water damage</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Potential recovery: <span className="font-semibold text-green-600">$8,500</span> • Time-sensitive action required</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg border border-scc-red/20">
                    <div className="w-6 h-6 bg-scc-red text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-gray-100">Re-open 2022 wind damage claim before statute expires</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Potential recovery: <span className="font-semibold text-green-600">$18,000</span> • Statute expires in 8 months</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg border border-scc-red/20">
                    <div className="w-6 h-6 bg-scc-red text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-gray-100">Schedule comprehensive inspection for current claim</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Prevent future underpayment • Document all hidden damages</p>
                    </div>
                  </li>
                </ol>
                <div className="mt-4 pt-4 border-t border-scc-red/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Total Additional Recovery Potential</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">From historical underpayments</p>
                    </div>
                    <p className="text-xl sm:text-2xl font-bold text-green-600">$26,500</p>
                  </div>
                </div>
              </div>

              {/* AI Property History Analysis */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                <div className="flex items-start gap-3">
                  <AlertCircle className="text-scc-red mt-1" size={20} />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                      <span>AI Property History Analysis</span>
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      Our AI is searching through 5 years of claim history to identify underpayments and re-opening opportunities.
                    </p>
                  </div>
                </div>
              </div>

              {/* Detailed Claims History */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Claims History Analysis</h3>
                
                {/* Enhanced claim history items */}
                <div className="space-y-3">
                  <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">2022 Wind Damage Claim</h4>
                          <span className="text-sm font-medium text-scc-red">Underpaid by $18,000</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Original Settlement: $45,000</p>
                        <button className="text-xs text-scc-red hover:underline mt-1">Re-open Claim</button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">2021 Water Damage Claim</h4>
                          <span className="text-sm font-medium text-scc-red">Underpaid by $8,500</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Original Settlement: $22,000</p>
                        <button className="text-xs text-scc-red hover:underline mt-1">Re-open Claim</button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">2020 Hurricane Damage</h4>
                          <span className="text-sm font-medium text-green-600">Fairly Settled</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Original Settlement: $125,000</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900 dark:text-gray-100">$125,000</p>
                        <p className="text-xs text-green-600">Settled</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hidden Damage Indicators */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
                  <h4 className="font-semibold text-purple-900 mb-3">Hidden Damage Indicators</h4>
                  <p className="text-sm text-purple-800 mb-3">
                    Based on historical patterns, check for these commonly missed damages:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <Check className="text-purple-600 w-4 h-4" />
                      <span className="text-sm text-purple-900">Foundation settling from water saturation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="text-purple-600 w-4 h-4" />
                      <span className="text-sm text-purple-900">HVAC system contamination</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="text-purple-600 w-4 h-4" />
                      <span className="text-sm text-purple-900">Electrical panel corrosion</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="text-purple-600 w-4 h-4" />
                      <span className="text-sm text-purple-900">Hidden mold in wall cavities</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="text-purple-600 w-4 h-4" />
                      <span className="text-sm text-purple-900">Roof decking deterioration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="text-purple-600 w-4 h-4" />
                      <span className="text-sm text-purple-900">Compromised insulation</span>
                    </div>
                  </div>
                </div>

                {/* Summary Statistics */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-5">
                  <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Total Past Claims</p>
                      <p className="text-base sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
                        $85K
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Underpayments</p>
                      <p className="text-base sm:text-xl md:text-2xl font-bold text-red-600">$26.5K</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Recovery Rate</p>
                      <p className="text-base sm:text-xl md:text-2xl font-bold text-green-600">85%</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}


        </div>
      </div>

      {/* File Upload Modal */}
      <FileUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        claimId={params.id as string}
        onUploadSuccess={(document) => {
          // Add the uploaded document to the local state
          setDocuments(prev => [...prev, document])
          // You can also trigger a refresh of the documents list here
          console.log('Document uploaded:', document)
        }}
      />
    </div>
  )
}