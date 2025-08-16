import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validation'

// Rate limiting storage (in production, use Redis or similar)
const submissionAttempts = new Map<string, { count: number; lastAttempt: number }>()

// Security constants
const MAX_ATTEMPTS_PER_HOUR = 5
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour in milliseconds
const MIN_SUBMISSION_INTERVAL = 2000 // 2 seconds between submissions

// Input sanitization utility
const sanitizeString = (input: string): string => {
  if (typeof input !== 'string') return ''
  return input.trim().replace(/[<>]/g, '').substring(0, 1000) // Basic XSS prevention + length limit
}

// Rate limiting check
const checkRateLimit = (ip: string): { allowed: boolean; message?: string } => {
  const now = Date.now()
  const userAttempts = submissionAttempts.get(ip)
  
  if (!userAttempts) {
    submissionAttempts.set(ip, { count: 1, lastAttempt: now })
    return { allowed: true }
  }
  
  // Reset if window has passed
  if (now - userAttempts.lastAttempt > RATE_LIMIT_WINDOW) {
    submissionAttempts.set(ip, { count: 1, lastAttempt: now })
    return { allowed: true }
  }
  
  // Check submission interval
  if (now - userAttempts.lastAttempt < MIN_SUBMISSION_INTERVAL) {
    return { allowed: false, message: 'Please wait before submitting again.' }
  }
  
  // Check hourly limit
  if (userAttempts.count >= MAX_ATTEMPTS_PER_HOUR) {
    return { allowed: false, message: 'Too many submission attempts. Please try again later.' }
  }
  
  // Update attempts
  submissionAttempts.set(ip, { 
    count: userAttempts.count + 1, 
    lastAttempt: now 
  })
  
  return { allowed: true }
}

// CSRF protection check
const validateCSRF = (request: NextRequest): boolean => {
  const csrfHeader = request.headers.get('x-requested-with')
  return csrfHeader === 'XMLHttpRequest'
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    
    // Rate limiting check
    const rateLimitCheck = checkRateLimit(ip)
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        { error: rateLimitCheck.message },
        { status: 429 }
      )
    }
    
    // CSRF protection
    if (!validateCSRF(request)) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 403 }
      )
    }
    
    // Parse and validate request body
    const body = await request.json()
    
    // Basic request validation
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      )
    }
    
    // Sanitize input data
    const sanitizedData = {
      ...body,
      firstName: sanitizeString(body.firstName || ''),
      lastName: sanitizeString(body.lastName || ''),
      email: sanitizeString(body.email || '').toLowerCase(),
      phone: sanitizeString(body.phone || ''),
      message: body.message ? sanitizeString(body.message) : undefined,
      howDidYouHear: body.howDidYouHear ? sanitizeString(body.howDidYouHear) : undefined,
      preferredDate: body.preferredDate ? sanitizeString(body.preferredDate) : undefined,
    }
    
    // Validate with Zod schema
    const validationResult = contactFormSchema.safeParse(sanitizedData)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: validationResult.error.errors },
        { status: 400 }
      )
    }
    
    const validatedData = validationResult.data
    
    // Additional security checks
    if (validatedData.email && !validatedData.email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }
    
    // Phone number validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    if (validatedData.phone && !phoneRegex.test(validatedData.phone.replace(/[\s\-\(\)]/g, ''))) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      )
    }
    
    // Date validation (if provided)
    if (validatedData.preferredDate) {
      const selectedDate = new Date(validatedData.preferredDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      if (selectedDate < today) {
        return NextResponse.json(
          { error: 'Preferred date cannot be in the past' },
          { status: 400 }
        )
      }
    }
    
    // Prepare notification data
    const notificationData = {
      customer: `${validatedData.firstName} ${validatedData.lastName}`,
      service: validatedData.serviceType,
      submittedAt: validatedData.submittedAt || new Date().toISOString(),
      email: validatedData.email,
      phone: validatedData.phone,
      propertyType: validatedData.propertyType,
      squareFootage: validatedData.squareFootage,
      frequency: validatedData.frequency,
      preferredDate: validatedData.preferredDate,
      howDidYouHear: validatedData.howDidYouHear,
      message: validatedData.message,
      userAgent: validatedData.userAgent,
      timestamp: validatedData.timestamp,
    }
    
    // Send email notification (placeholder)
    console.log('Email notification would be sent:', `
New Cleaning Lead Received!

Customer Information:
- Name: ${notificationData.customer}
- Email: ${notificationData.email}
- Phone: ${notificationData.phone}

Service Details:
- Service Type: ${notificationData.service}
- Property Type: ${notificationData.propertyType}
- Square Footage: ${notificationData.squareFootage || 'Not specified'}
- Frequency: ${notificationData.frequency || 'Not specified'}

Additional Information:
- Preferred Date: ${notificationData.preferredDate || 'Not specified'}
- How They Heard: ${notificationData.howDidYouHear || 'Not specified'}
- Message: ${notificationData.message || 'No additional message'}

Submission Details:
- Submitted At: ${notificationData.submittedAt}
- User Agent: ${notificationData.userAgent}
- Client IP: ${ip}

Please respond to this lead within 24 hours!
    `)
    
    // Send SMS notification (placeholder)
    console.log('SMS notification would be sent:', `New lead: ${notificationData.customer} - ${notificationData.phone} - ${notificationData.service} cleaning`)
    
    // Log successful submission
    console.log('New lead received:', {
      customer: notificationData.customer,
      service: notificationData.service,
      submittedAt: notificationData.submittedAt,
      ip: ip,
    })
    
    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you! Your request has been submitted successfully.',
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('API Error:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error. Please try again later.',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

// Clean up old rate limiting data periodically (in production, use a proper cleanup mechanism)
setInterval(() => {
  const now = Date.now()
  Array.from(submissionAttempts.entries()).forEach(([ip, data]) => {
    if (now - data.lastAttempt > RATE_LIMIT_WINDOW) {
      submissionAttempts.delete(ip)
    }
  })
}, RATE_LIMIT_WINDOW)
