import { z } from 'zod'

export const contactFormSchema = z.object({
  // Personal Info
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  
  // Service Details
  serviceType: z.enum(['residential', 'commercial', 'move-out', 'deep-clean', 'recurring']),
  propertyType: z.enum(['house', 'apartment', 'condo', 'office', 'other']),
  squareFootage: z.union([
    z.number().min(1, 'Square footage must be at least 1'),
    z.string().optional().transform((val) => {
      if (!val || val === '') return undefined
      const num = parseInt(val, 10)
      if (isNaN(num) || num < 1) {
        throw new Error('Square footage must be a valid number greater than 0')
      }
      return num
    })
  ]).optional(),
  
  // Preferences
  preferredDate: z.string().optional(),
  frequency: z.string().optional(),
  
  // Additional Details
  message: z.string().optional(),
  howDidYouHear: z.string().optional(),
  
  // Submission metadata (optional)
  submittedAt: z.string().optional(),
  userAgent: z.string().optional(),
  timestamp: z.number().optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export const serviceTypes = [
  { value: 'residential', label: 'Residential Cleaning', icon: '🏠' },
  { value: 'commercial', label: 'Commercial Cleaning', icon: '🏢' },
  { value: 'move-out', label: 'Move-Out Cleaning', icon: '📦' },
  { value: 'deep-clean', label: 'Deep Cleaning', icon: '✨' },
  { value: 'recurring', label: 'Recurring Service', icon: '🔄' },
] as const

export const propertyTypes = [
  { value: 'house', label: 'House' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'condo', label: 'Condo' },
  { value: 'office', label: 'Office' },
  { value: 'other', label: 'Other' },
] as const

export const frequencyOptions = [
  { value: 'one-time', label: 'One Time' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'bi-weekly', label: 'Bi-Weekly' },
  { value: 'monthly', label: 'Monthly' },
] as const

export const referralSources = [
  { value: 'google', label: 'Google Search' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'referral', label: 'Friend/Family Referral' },
  { value: 'nextdoor', label: 'Nextdoor' },
  { value: 'other', label: 'Other' },
] as const
