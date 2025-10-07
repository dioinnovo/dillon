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

    // Site Inspection
    inspection: {
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
              {/* Coming soon placeholder */}
              <div className="bg-white dark:bg-gray-900 border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <Calculator className="text-scc-red" size={20} />
                  Intelligent Cost Estimation Engine
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Estimate Breakdown */}
                  <div className="lg:col-span-2">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Detailed Repair Estimate</h4>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <div className="space-y-2">
                        {[
                          { item: 'Roof Structural Repair', code: 'RSR-240', quantity: '45 SQ', unit: '$185 per SQ', total: '$95,000' },
                          { item: 'Hurricane Window Replacement', code: 'HWR-110', quantity: '12 EA', unit: '$2,850 per EA', total: '$34,200' },
                          { item: 'HVAC System Replacement', code: 'HSR-320', quantity: '1 System', unit: '$35,000', total: '$35,000' },
                          { item: 'Water Damage Restoration', code: 'WDR-450', quantity: '850 SF', unit: '$45 per SF', total: '$38,250' },
                          { item: 'Electrical Panel Upgrade', code: 'EPU-100', quantity: '1 Panel', unit: '$8,500', total: '$8,500' },
                          { item: 'Ordinance & Law Upgrades', code: 'OLU-200', quantity: '1 LS', unit: '$45,000', total: '$45,000' }
                        ].map((line, index) => (
                          <div key={index} className="bg-white dark:bg-gray-900 rounded-lg p-3">
                            <div className="grid grid-cols-6 gap-2 text-sm">
                              <div className="col-span-2">
                                <p className="font-medium text-gray-900 dark:text-gray-100">{line.item}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{line.code}</p>
                              </div>
                              <div className="text-center text-gray-600 dark:text-gray-400">{line.quantity}</div>
                              <div className="text-center text-gray-600 dark:text-gray-400">{line.unit}</div>
                              <div className="text-right font-semibold text-scc-red col-span-2">{line.total}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                            <span className="font-medium">$255,950</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Overhead & Profit (20%)</span>
                            <span className="font-medium">$51,190</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Tax (7%)</span>
                            <span className="font-medium">$21,490</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Depreciation Recovery</span>
                            <span className="font-medium text-green-600">$13,000</span>
                          </div>
                          <div className="flex justify-between text-lg sm:text-xl font-bold pt-2 border-t border-gray-300 dark:border-gray-600">
                            <span className="text-gray-900 dark:text-gray-100">Total Maximum Recovery</span>
                            <span className="text-scc-red">$385,450</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Intelligence */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Pricing Intelligence</h4>
                    <div className="space-y-3">
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Data Sources</h5>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="text-green-500" size={16} />
                            <span>RSMeans Pricing Database</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="text-green-500" size={16} />
                            <span>Miami-Dade Market Rates</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="text-green-500" size={16} />
                            <span>Contractor Network Pricing</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="text-green-500" size={16} />
                            <span>Updated Daily</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Market Analysis</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Local Market Position:</span>
                            <span className="font-semibold text-gray-700 dark:text-gray-300">Above Average</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Pricing Confidence:</span>
                            <span className="font-semibold text-green-600">94.7%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Contractor Availability:</span>
                            <span className="font-semibold text-scc-red">Limited</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Action Items</h5>
                        <div className="space-y-2">
                          <Button className="w-full bg-scc-red hover:bg-red-600" size="sm">
                            Generate Detailed Estimate
                          </Button>
                          <Button className="w-full border-scc-red text-scc-red hover:bg-scc-red/10" variant="outline" size="sm">
                            Export to PDF
                          </Button>
                          <Button className="w-full" variant="outline" size="sm">
                            Share with Team
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Settlement Strategy & Evidence Analyzer */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Settlement Strategy */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <Target className="text-gray-600 dark:text-gray-400" size={20} />
                    Settlement Strategy Module
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">AI Recommendations</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="text-green-500 mt-0.5" size={16} />
                          <span>Open with demand of $385,450 (100% of analysis)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="text-green-500 mt-0.5" size={16} />
                          <span>Settlement floor: $325,000 (acceptable minimum)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="text-yellow-500 mt-0.5" size={16} />
                          <span>Emphasize ordinance & law coverage ($45K)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <TrendingUp className="text-blue-500 mt-0.5" size={16} />
                          <span>Leverage: 12 comparable settlements avg. $375K</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Success Indicators</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Negotiation Success:</span>
                          <span className="font-semibold text-green-600">94%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Expected Settlement:</span>
                          <span className="font-semibold text-gray-900 dark:text-gray-100">$340K - $365K</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Time to Settlement:</span>
                          <span className="font-semibold text-blue-600">12-18 days</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Evidence Strength Analyzer */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <FileSearch className="text-gray-600 dark:text-gray-400" size={20} />
                    Evidence Strength Analyzer
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">Documentation Score</h4>
                        <span className="text-xl sm:text-2xl font-bold text-green-600">87%</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 mb-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Strong evidence package with room for improvement</p>
                    </div>

                    <div className="space-y-2">
                      {[
                        { item: 'Photo Documentation', status: 'Complete', score: 95 },
                        { item: 'Professional Inspection', status: 'Complete', score: 92 },
                        { item: 'Repair Estimates', status: 'Complete', score: 88 },
                        { item: 'Weather Report', status: 'Missing', score: 0 },
                        { item: 'Comparable Claims', status: 'Partial', score: 60 }
                      ].map((evidence, index) => (
                        <div key={index} className="bg-white dark:bg-gray-900 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="font-medium text-sm text-gray-900 dark:text-gray-100">{evidence.item}</p>
                              <p className={`text-xs ${
                                evidence.status === 'Complete' ? 'text-green-600' :
                                evidence.status === 'Partial' ? 'text-yellow-600' :
                                'text-red-600'
                              }`}>
                                {evidence.status}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className={`text-sm font-bold ${
                                evidence.score >= 80 ? 'text-green-600' :
                                evidence.score >= 50 ? 'text-yellow-600' :
                                'text-red-600'
                              }`}>
                                {evidence.score}%
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 border border-gray-200">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Improvement Tip:</strong> Add weather report (+8%) and complete comparables (+5%) to reach 95% documentation score
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="w-full justify-between bg-scc-red hover:bg-red-600" size="lg">
                  <span className="font-medium">Generate Demand Package</span>
                  <Send className="w-4 h-4" />
                </Button>
                <Button className="w-full justify-between" variant="outline" size="lg">
                  <span className="font-medium">Export Full Report</span>
                  <Download className="w-4 h-4" />
                </Button>
                <Button className="w-full justify-between" variant="outline" size="lg">
                  <span className="font-medium">Schedule Re-inspection</span>
                  <Calendar className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Timeline Tab - Activity Feed */}
          {activeTab === 'timeline' && (
            <div className="space-y-6">
              <SectionHeader
                title="Claim Timeline"
                description="Complete activity history and claim progress"
                actions={[
                  {
                    label: "Add Event",
                    icon: Plus,
                    className: "bg-scc-red hover:bg-red-600 text-white"
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

              {/* Documents Grid - 5 Cards including Inspection Status */}
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

                {/* Inspection Status Card */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <Camera className="text-gray-600" size={20} />
                    Inspection Status
                  </h4>
                  <div className="space-y-4">
                    {/* Status Badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        project.inspection.status === 'Scheduled'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                          : project.inspection.status === 'In Progress'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : project.inspection.status === 'Completed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                      }`}>
                        {project.inspection.status}
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
                        <span className="font-medium text-gray-900 dark:text-gray-100">{project.inspection.inspector}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="text-gray-500" size={16} />
                        <span className="text-gray-600 dark:text-gray-400">Type:</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{project.inspection.type}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 space-y-2">
                      {project.inspection.status === 'Scheduled' && (
                        <Link
                          href={`/dashboard/inspection/INS-002/start`}
                          className="w-full px-4 py-2 bg-scc-red text-white rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-2 text-sm font-medium"
                        >
                          <Camera size={16} />
                          Start Inspection
                        </Link>
                      )}
                      {project.inspection.status === 'In Progress' && (
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
                            href={`/dashboard/inspection/INS-002/continue`}
                            className="w-full px-4 py-2 bg-scc-red text-white rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-2 text-sm font-medium"
                          >
                            <Camera size={16} />
                            Continue Inspection
                          </Link>
                        </>
                      )}
                      {project.inspection.status === 'Completed' && (
                        <Link
                          href={`/dashboard/inspection/INS-002/report`}
                          className="w-full px-4 py-2 bg-scc-red text-white rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-2 text-sm font-medium"
                        >
                          <FileText size={16} />
                          View Report
                        </Link>
                      )}
                      {!project.inspection.status || project.inspection.status === 'Not Scheduled' && (
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

          {/* Settlement Negotiation Tab */}
          {activeTab === 'settlement' && (
            <div className="space-y-6">
              {/* Success Metrics Dashboard */}
              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Settlement Success Indicators</h3>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">High Probability</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-lg">
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">94%</p>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">Win Probability</p>
                  </div>
                  <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-lg">
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold text-scc-red">$385K</p>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">Optimal Demand</p>
                  </div>
                  <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-lg">
                    <div className="flex flex-col">
                      <span className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100">$340K-</span>
                      <span className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100 -mt-1">$365K</span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">Expected Range</p>
                  </div>
                  <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-lg">
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">+$170K</p>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">Above Initial Offer</p>
                  </div>
                </div>
              </div>

              {/* Power Negotiation Arsenal */}
              <div className="bg-white dark:bg-gray-900 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <Target className="text-scc-red" size={20} />
                  Power Negotiation Arsenal
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="text-gray-600 dark:text-gray-400" size={16} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">Market Data Leverage</h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">12 comparable settlements in 2-mile radius</p>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Average settlement: $375K (similar damage)</li>
                            <li>• Highest: $420K (Miami Beach, 2023)</li>
                            <li>• Your demand is 8% below market average</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                          <Building2 className="text-gray-600 dark:text-gray-400" size={16} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">Code Upgrade Goldmine</h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Building code violations = forced upgrades</p>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Ordinance & Law Coverage: $45K available</li>
                            <li>• 2023 wind load requirements not met</li>
                            <li>• Electrical panel must be upgraded</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                          <Briefcase className="text-gray-600 dark:text-gray-400" size={16} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">Business Interruption Ace</h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Lost revenue documentation is airtight</p>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• $45K per month documented loss</li>
                            <li>• 3-month closure minimum</li>
                            <li>• Additional living expenses covered</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                          <History className="text-gray-600 dark:text-gray-400" size={16} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">Insurer Track Record</h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">State Farm's settlement patterns</p>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Average 2.3 rounds to settle</li>
                            <li>• Typically counters at 70% of demand</li>
                            <li>• Weakest on ordinance & law coverage</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                          <AlertTriangle className="text-gray-600 dark:text-gray-400" size={16} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">Pressure Points</h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Time-sensitive leverage factors</p>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Adjuster Sarah Thompson: 89% approval rate</li>
                            <li>• Q1 settlement quota pressure</li>
                            <li>• Hurricane season approaching</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                          <Shield className="text-gray-600 dark:text-gray-400" size={16} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">Legal Threat Level</h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Litigation readiness assessment</p>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Bad faith potential: Medium-High</li>
                            <li>• Statute limitations: 18 months left</li>
                            <li>• Attorney fees recoverable</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tactical Negotiation Playbook */}
              <div className="bg-scc-red/10 border border-scc-red/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <Zap className="text-scc-red" size={20} />
                  Tactical Negotiation Playbook
                </h3>
                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border-l-4 border-scc-red">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">Phase 1: Opening Move Strategy</h4>
                      <span className="px-2 py-1 bg-scc-red text-white rounded text-xs font-medium">Start Strong</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">Lead with strength - establish credibility and set high anchor</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded border border-gray-200">
                        <p className="text-xs font-medium text-gray-900 dark:text-gray-100 mb-1">Key Message</p>
                        <p className="text-xs text-gray-700 dark:text-gray-300">"12 comparable settlements average $375K"</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded border border-gray-200">
                        <p className="text-xs font-medium text-gray-900 dark:text-gray-100 mb-1">Evidence Lead</p>
                        <p className="text-xs text-gray-700 dark:text-gray-300">"Code violations require $45K upgrades"</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded border border-gray-200">
                        <p className="text-xs font-medium text-gray-900 dark:text-gray-100 mb-1">Urgency Factor</p>
                        <p className="text-xs text-gray-700 dark:text-gray-300">"Business losing $45K per month"</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border-l-4 border-scc-red">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">Phase 2: Counter-Attack Responses</h4>
                      <span className="px-2 py-1 bg-scc-red text-white rounded text-xs font-medium">Defend & Counter</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">Anticipated objections and killer responses</p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-900 p-3 rounded border">
                        <div className="text-xs font-medium text-gray-900 dark:text-gray-100 min-w-[80px]">If they say:</div>
                        <div className="text-xs text-gray-700 dark:text-gray-300 flex-1">"Policy limits don't cover code upgrades"</div>
                        <div className="text-xs font-medium text-scc-red min-w-[80px]">You respond:</div>
                        <div className="text-xs text-gray-700 dark:text-gray-300 flex-1">"Ordinance & Law endorsement clearly states..."</div>
                      </div>
                      <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-900 p-3 rounded border">
                        <div className="text-xs font-medium text-gray-900 dark:text-gray-100 min-w-[80px]">If they say:</div>
                        <div className="text-xs text-gray-700 dark:text-gray-300 flex-1">"Market comparables are too high"</div>
                        <div className="text-xs font-medium text-scc-red min-w-[80px]">You respond:</div>
                        <div className="text-xs text-gray-700 dark:text-gray-300 flex-1">"Here's identical property on Ocean Drive..."</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border-l-4 border-scc-red">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">Phase 3: Closing Techniques</h4>
                      <span className="px-2 py-1 bg-scc-red text-white rounded text-xs font-medium">Close Deal</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded border">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Scarcity Close</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">"Hurricane season starts in 6 weeks - contractor availability will disappear"</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded border">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Authority Close</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">"State regulations require we notify DOI if settlement under $340K"</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Center */}
              <div className="bg-white dark:bg-gray-900 border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Negotiation Command Center</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Ready to Execute</h4>
                    <div className="space-y-2">
                      <Button className="w-full justify-between bg-scc-red hover:bg-red-600" size="lg">
                        Send Demand Letter
                        <Send className="w-4 h-4" />
                      </Button>
                      <Button className="w-full justify-between" variant="secondary" size="lg">
                        Schedule Settlement Conference
                        <Calendar className="w-4 h-4" />
                      </Button>
                      <Button className="w-full justify-between" variant="secondary" size="lg">
                        Generate Negotiation Script
                        <FileText className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Timeline Status</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="text-scc-red" size={16} />
                        <span className="text-sm">Demand sent (Mar 12)</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">✓ Complete</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="text-gray-500 dark:text-gray-400" size={16} />
                        <span className="text-sm">Response due (Mar 19)</span>
                        <span className="text-xs text-gray-600 dark:text-gray-400 ml-auto">5 days left</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="text-gray-400" size={16} />
                        <span className="text-sm text-gray-400">Conference TBD</span>
                        <span className="text-xs text-gray-400 ml-auto">Pending</span>
                      </div>
                    </div>
                  </div>
                </div>
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