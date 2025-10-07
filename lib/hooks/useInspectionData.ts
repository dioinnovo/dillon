'use client'

import { useState, useEffect, useCallback } from 'react'
import { inspectionMediaData } from '@/lib/inspection-media'

export interface MediaFile {
  id: string
  type: 'photo' | 'audio' | 'document'
  url: string
  thumbnail?: string
  title: string
  description?: string
  timestamp: string
  category: string
  tags?: string[]
  transcript?: string
  duration?: number
}

export interface InspectionArea {
  id: string
  name: string
  category: string
  status: 'completed' | 'skipped' | 'in_progress' | 'not_started'
  photoCount: number
  notesCount: number
  findings: string
  observations: string
  contaminantConcerns: string
  recommendedActions: string
  priority: 'high' | 'medium' | 'low'
  previewImage?: string
  media: MediaFile[]
  // Legacy field for backwards compatibility
  damageDescription?: string
  estimatedCost?: number
}

export interface InspectionData {
  id: string
  site: {
    address: string
    type: 'industrial' | 'commercial' | 'residential' | 'brownfield'
    client: string
    historicalUse?: string
    projectNumber?: string
    siteArea?: string
  }
  // Legacy field for backwards compatibility
  property?: {
    address: string
    type: 'residential' | 'commercial'
    owner: string
    yearBuilt?: string
    policyNumber?: string
  }
  areas: InspectionArea[]
  createdAt: string
  updatedAt: string
  completionPercentage: number
}

// Default areas for environmental site assessments (Phase II ESA)
const DEFAULT_ENVIRONMENTAL_AREAS: Omit<InspectionArea, 'media'>[] = [
  // Site Perimeter
  { id: 'perimeter-access', name: 'Site Perimeter & Access', category: 'Site Perimeter', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', observations: '', contaminantConcerns: '', recommendedActions: '', priority: 'low' },
  { id: 'perimeter-boundaries', name: 'Site Boundaries', category: 'Site Perimeter', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', observations: '', contaminantConcerns: '', recommendedActions: '', priority: 'low' },
  { id: 'perimeter-drainage', name: 'Stormwater & Drainage', category: 'Site Perimeter', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', observations: '', contaminantConcerns: '', recommendedActions: '', priority: 'low' },

  // Site Areas
  { id: 'area-manufacturing', name: 'Former Manufacturing Area', category: 'Site Areas', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', observations: '', contaminantConcerns: '', recommendedActions: '', priority: 'high' },
  { id: 'area-storage', name: 'Storage Areas (Tanks/Drums)', category: 'Site Areas', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', observations: '', contaminantConcerns: '', recommendedActions: '', priority: 'high' },
  { id: 'area-waste', name: 'Waste Management Area', category: 'Site Areas', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', observations: '', contaminantConcerns: '', recommendedActions: '', priority: 'high' },
  { id: 'area-loading', name: 'Loading Docks & Transport', category: 'Site Areas', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', observations: '', contaminantConcerns: '', recommendedActions: '', priority: 'medium' },
  { id: 'area-surface', name: 'Surface Conditions', category: 'Site Areas', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', observations: '', contaminantConcerns: '', recommendedActions: '', priority: 'medium' },
  { id: 'area-underground', name: 'Underground Storage Tanks', category: 'Site Areas', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', observations: '', contaminantConcerns: '', recommendedActions: '', priority: 'high' },

  // Environmental
  { id: 'env-soil-sampling', name: 'Soil Sampling Locations', category: 'Environmental', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', observations: '', contaminantConcerns: '', recommendedActions: '', priority: 'high' },
  { id: 'env-groundwater', name: 'Groundwater Monitoring Wells', category: 'Environmental', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', observations: '', contaminantConcerns: '', recommendedActions: '', priority: 'high' },
  { id: 'env-air-quality', name: 'Air Quality & Ventilation', category: 'Environmental', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', observations: '', contaminantConcerns: '', recommendedActions: '', priority: 'medium' }
]

// Legacy residential areas for backwards compatibility
const DEFAULT_RESIDENTIAL_AREAS: Omit<InspectionArea, 'media'>[] = [
  // Exterior
  { id: 'exterior-roof', name: 'Roof & Gutters', category: 'Exterior', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', observations: '', contaminantConcerns: '', recommendedActions: '', priority: 'low', damageDescription: '', estimatedCost: 0 },
  { id: 'exterior-siding', name: 'Siding & Walls', category: 'Exterior', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', observations: '', contaminantConcerns: '', recommendedActions: '', priority: 'low', damageDescription: '', estimatedCost: 0 },
  { id: 'exterior-windows', name: 'Windows & Doors', category: 'Exterior', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', observations: '', contaminantConcerns: '', recommendedActions: '', priority: 'low', damageDescription: '', estimatedCost: 0 },
  { id: 'exterior-foundation', name: 'Foundation', category: 'Exterior', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', observations: '', contaminantConcerns: '', recommendedActions: '', priority: 'low', damageDescription: '', estimatedCost: 0 },
  { id: 'exterior-landscape', name: 'Landscape & Drainage', category: 'Exterior', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', observations: '', contaminantConcerns: '', recommendedActions: '', priority: 'low', damageDescription: '', estimatedCost: 0 },

  // Interior
  { id: 'interior-living', name: 'Living Room', category: 'Interior', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', observations: '', contaminantConcerns: '', recommendedActions: '', priority: 'low', damageDescription: '', estimatedCost: 0 },
  { id: 'interior-kitchen', name: 'Kitchen', category: 'Interior', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', observations: '', contaminantConcerns: '', recommendedActions: '', priority: 'low', damageDescription: '', estimatedCost: 0 },
  { id: 'interior-master-bed', name: 'Master Bedroom', category: 'Interior', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', observations: '', contaminantConcerns: '', recommendedActions: '', priority: 'low', damageDescription: '', estimatedCost: 0 },
  { id: 'interior-bedrooms', name: 'Other Bedrooms', category: 'Interior', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', observations: '', contaminantConcerns: '', recommendedActions: '', priority: 'low', damageDescription: '', estimatedCost: 0 },
  { id: 'interior-bathrooms', name: 'Bathrooms', category: 'Interior', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', observations: '', contaminantConcerns: '', recommendedActions: '', priority: 'low', damageDescription: '', estimatedCost: 0 },
  { id: 'interior-basement', name: 'Basement/Attic', category: 'Interior', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', observations: '', contaminantConcerns: '', recommendedActions: '', priority: 'low', damageDescription: '', estimatedCost: 0 },

  // Systems
  { id: 'systems-electrical', name: 'Electrical System', category: 'Systems', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', observations: '', contaminantConcerns: '', recommendedActions: '', priority: 'low', damageDescription: '', estimatedCost: 0 },
  { id: 'systems-plumbing', name: 'Plumbing System', category: 'Systems', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', observations: '', contaminantConcerns: '', recommendedActions: '', priority: 'low', damageDescription: '', estimatedCost: 0 },
  { id: 'systems-hvac', name: 'HVAC System', category: 'Systems', status: 'not_started', photoCount: 0, notesCount: 0, findings: '', observations: '', contaminantConcerns: '', recommendedActions: '', priority: 'low', damageDescription: '', estimatedCost: 0 }
]

export function useInspectionData(inspectionId: string) {
  const [inspectionData, setInspectionData] = useState<InspectionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load inspection data
  useEffect(() => {
    if (!inspectionId) {
      setError('No inspection ID provided')
      setLoading(false)
      return
    }

    try {
      // Special handling for demo assessment ASM-002
      if (inspectionId === 'ASM-002') {
        // Define correct order based on DEFAULT_RESIDENTIAL_AREAS
        const correctOrder = [
          'exterior-roof',
          'exterior-siding',
          'exterior-windows',
          'exterior-foundation',
          'exterior-landscaping', // Note: different ID in demo data
          'interior-living',
          'interior-kitchen',
          'interior-bedrooms', // Master bedroom
          'interior-other', // Other bedrooms
          'interior-bathrooms',
          'interior-basement',
          'systems-electrical',
          'systems-plumbing',
          'systems-hvac'
        ]

        // Map demo data from inspection-media.ts
        const mappedAreas = inspectionMediaData.map(area => ({
          id: area.areaId,
          name: area.areaName,
          category: area.category,
          status: area.status,
          photoCount: area.media?.filter(m => m.type === 'photo').length || 0,
          notesCount: area.media?.filter(m => m.type === 'audio').length || 0,
          findings: area.findings || '',
          damageDescription: area.damageDescription || '',
          recommendedActions: area.recommendedActions || '',
          estimatedCost: area.estimatedCost || 0,
          priority: area.priority || 'low',
          previewImage: area.media?.find(m => m.type === 'photo')?.url, // Add preview image from first photo
          media: area.media || []
        }))

        // Sort areas according to correct order
        const demoAreas: InspectionArea[] = correctOrder
          .map(areaId => mappedAreas.find(area => area.id === areaId))
          .filter(area => area !== undefined) as InspectionArea[]

        const completedCount = demoAreas.filter(a => a.status === 'completed' || a.status === 'skipped').length
        const completionPercentage = Math.round((completedCount / demoAreas.length) * 100)

        const demoData: InspectionData = {
          id: inspectionId,
          site: {
            address: '425 Industrial Drive, Cambridge, ON',
            type: 'brownfield',
            client: 'City of Cambridge',
            historicalUse: 'Metal Fabrication (1965-2010)',
            projectNumber: 'DL-2024-ENV-001',
            siteArea: '2.5 hectares'
          },
          property: {
            address: '425 Industrial Drive, Cambridge, ON',
            type: 'commercial',
            owner: 'City of Cambridge',
            yearBuilt: '1965',
            policyNumber: 'DL-2024-ENV-001'
          },
          areas: demoAreas,
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: new Date().toISOString(),
          completionPercentage
        }

        setInspectionData(demoData)
        // Don't save demo data to localStorage to keep it fresh
      } else {
        // Try to load from localStorage for non-demo inspections
        const stored = localStorage.getItem(`inspection-${inspectionId}-data`)
        if (stored) {
          const data = JSON.parse(stored)
          setInspectionData(data)
        } else {
        // Check if there's basic inspection info
        const basicInfo = localStorage.getItem(`inspection-${inspectionId}`)
        if (basicInfo) {
          // Initialize with default areas
          const basic = JSON.parse(basicInfo)
          const newData: InspectionData = {
            id: inspectionId,
            site: {
              address: basic.address || basic.siteAddress || '',
              type: basic.siteType || 'industrial',
              client: basic.clientName || basic.ownerName || '',
              historicalUse: basic.historicalUse,
              projectNumber: basic.projectNumber || basic.policyNumber,
              siteArea: basic.siteArea
            },
            property: {
              address: basic.address || '',
              type: basic.propertyType || 'commercial',
              owner: basic.ownerName || '',
              yearBuilt: basic.yearBuilt,
              policyNumber: basic.policyNumber
            },
            areas: DEFAULT_ENVIRONMENTAL_AREAS.map(area => ({ ...area, media: [] })),
            createdAt: basic.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            completionPercentage: 0
          }
          setInspectionData(newData)
          // Save the initialized data
          localStorage.setItem(`inspection-${inspectionId}-data`, JSON.stringify(newData))
        } else {
          setError(`No assessment found with ID: ${inspectionId}`)
        }
      }
      }
    } catch (err) {
      console.error('Error loading inspection data:', err)
      setError('Failed to load inspection data')
    } finally {
      setLoading(false)
    }
  }, [inspectionId])

  // Save inspection data
  const saveInspectionData = useCallback((data: InspectionData) => {
    try {
      // Calculate completion percentage
      const totalAreas = data.areas.length
      const completedAreas = data.areas.filter(a => a.status === 'completed' || a.status === 'skipped').length
      data.completionPercentage = Math.round((completedAreas / totalAreas) * 100)
      data.updatedAt = new Date().toISOString()

      localStorage.setItem(`inspection-${inspectionId}-data`, JSON.stringify(data))
      setInspectionData(data)
      return true
    } catch (err) {
      console.error('Error saving inspection data:', err)
      setError('Failed to save inspection data')
      return false
    }
  }, [inspectionId])

  // Update a specific area
  const updateArea = useCallback((areaId: string, updates: Partial<InspectionArea>) => {
    if (!inspectionData) return false

    const updatedData = {
      ...inspectionData,
      areas: inspectionData.areas.map(area =>
        area.id === areaId ? { ...area, ...updates } : area
      )
    }

    return saveInspectionData(updatedData)
  }, [inspectionData, saveInspectionData])

  // Mark area as completed
  const markAreaCompleted = useCallback((areaId: string) => {
    return updateArea(areaId, { status: 'completed' })
  }, [updateArea])

  // Mark area as skipped
  const markAreaSkipped = useCallback((areaId: string) => {
    return updateArea(areaId, { status: 'skipped' })
  }, [updateArea])

  // Mark area as in progress
  const markAreaInProgress = useCallback((areaId: string) => {
    return updateArea(areaId, { status: 'in_progress' })
  }, [updateArea])

  // Add media to an area
  const addMediaToArea = useCallback((areaId: string, media: MediaFile) => {
    if (!inspectionData) return false

    const area = inspectionData.areas.find(a => a.id === areaId)
    if (!area) return false

    const updatedMedia = [...(area.media || []), media]
    const photoCount = updatedMedia.filter(m => m.type === 'photo').length
    const notesCount = updatedMedia.filter(m => m.type === 'audio').length

    return updateArea(areaId, {
      media: updatedMedia,
      photoCount,
      notesCount
    })
  }, [inspectionData, updateArea])

  // Get inspection progress
  const getProgress = useCallback(() => {
    if (!inspectionData) return { percentage: 0, completed: 0, total: 0 }

    const total = inspectionData.areas.length
    const completed = inspectionData.areas.filter(a =>
      a.status === 'completed' || a.status === 'skipped'
    ).length

    return {
      percentage: inspectionData.completionPercentage,
      completed,
      total
    }
  }, [inspectionData])

  return {
    inspectionData,
    loading,
    error,
    saveInspectionData,
    updateArea,
    markAreaCompleted,
    markAreaSkipped,
    markAreaInProgress,
    addMediaToArea,
    getProgress
  }
}