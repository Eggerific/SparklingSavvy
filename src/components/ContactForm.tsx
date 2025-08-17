'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, ArrowLeft, CheckCircle, Sparkles } from 'lucide-react'
import { contactFormSchema, type ContactFormData, serviceTypes, propertyTypes, frequencyOptions, referralSources } from '@/lib/validation'
import { cn } from '@/lib/utils'

// Security and validation utilities
const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '') // Basic XSS prevention
}

const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))
}

// Rate limiting utility
const RATE_LIMIT_DELAY = 2000 // 2 seconds between submissions
let lastSubmissionTime = 0

export default function ContactForm() {
  // ===== STATE MANAGEMENT =====
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submissionError, setSubmissionError] = useState<string | null>(null)

  // ===== FORM SETUP =====
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    clearErrors,
    formState: { errors, isValid, isDirty },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange',
  })

  // ===== WATCHED FIELDS =====
  const watchedServiceType = watch('serviceType')
  const watchedPropertyType = watch('propertyType')
  const watchedFirstName = watch('firstName')
  const watchedLastName = watch('lastName')
  const watchedEmail = watch('email')
  const watchedPhone = watch('phone')

  // ===== DEBUGGING =====
  useEffect(() => {
    console.log('=== FORM DEBUG ===')
    console.log('Current Step:', currentStep)
    console.log('Is Valid:', isValid)
    console.log('Is Dirty:', isDirty)
    console.log('Errors:', errors)
    console.log('Watched Values:', {
      serviceType: watchedServiceType,
      propertyType: watchedPropertyType,
      firstName: watchedFirstName,
      lastName: watchedLastName,
      email: watchedEmail,
      phone: watchedPhone,
    })
    console.log('==================')
  }, [currentStep, isValid, isDirty, errors, watchedServiceType, watchedPropertyType, watchedFirstName, watchedLastName, watchedEmail, watchedPhone])

  // ===== VALIDATION LOGIC =====
  const isStepValid = useCallback(() => {
    switch (currentStep) {
      case 1:
        return !!watchedServiceType
      case 2:
        return !!watchedServiceType && !!watchedPropertyType
      case 3:
        return !!watchedServiceType && !!watchedPropertyType && 
               !!watchedFirstName && !!watchedLastName && 
               !!watchedEmail && !!watchedPhone
      case 4:
        // Step 4 is always valid since it has no required fields
        return true
      default:
        return false
    }
  }, [currentStep, watchedServiceType, watchedPropertyType, watchedFirstName, watchedLastName, watchedEmail, watchedPhone])

  // Check if form is ready for final submission
  const isFormReadyForSubmission = useCallback(() => {
    return !!watchedServiceType && !!watchedPropertyType && 
           !!watchedFirstName && !!watchedLastName && 
           !!watchedEmail && !!watchedPhone
  }, [watchedServiceType, watchedPropertyType, watchedFirstName, watchedLastName, watchedEmail, watchedPhone])

  // ===== SECURITY & SUBMISSION HANDLING =====
  const onSubmit = useCallback(async (data: ContactFormData) => {
    console.log('=== SUBMISSION STARTED ===')
    console.log('Form Data:', data)
    
    // Rate limiting check
    const now = Date.now()
    if (now - lastSubmissionTime < RATE_LIMIT_DELAY) {
      setSubmissionError('Please wait a moment before submitting again.')
      return
    }
    lastSubmissionTime = now

    // Input sanitization
    const sanitizedData = {
      ...data,
      firstName: sanitizeInput(data.firstName),
      lastName: sanitizeInput(data.lastName),
      email: sanitizeInput(data.email).toLowerCase(),
      phone: sanitizeInput(data.phone),
      message: data.message ? sanitizeInput(data.message) : undefined,
    }

    // Additional validation
    if (!validatePhoneNumber(sanitizedData.phone)) {
      setSubmissionError('Please enter a valid phone number.')
      return
    }

    setIsSubmitting(true)
    setSubmissionError(null)
    
    try {
      // Submit to FormSubmit
      const formData = new FormData()
      formData.append('serviceType', sanitizedData.serviceType)
      formData.append('propertyType', sanitizedData.propertyType)
      formData.append('squareFootage', sanitizedData.squareFootage?.toString() || '')
      formData.append('frequency', sanitizedData.frequency || '')
      formData.append('firstName', sanitizedData.firstName)
      formData.append('lastName', sanitizedData.lastName)
      formData.append('email', sanitizedData.email)
      formData.append('phone', sanitizedData.phone)
      formData.append('preferredDate', sanitizedData.preferredDate || '')
      formData.append('howDidYouHear', sanitizedData.howDidYouHear || '')
      formData.append('message', sanitizedData.message || '')
      formData.append('_subject', `New Cleaning Lead: ${sanitizedData.firstName} ${sanitizedData.lastName}`)
      formData.append('_template', 'table')
      formData.append('_captcha', 'false')

      const response = await fetch('https://formsubmit.co/sparklesavcleaning@gmail.com', {
        method: 'POST',
        body: formData,
      })

      console.log('Response status:', response.status)
      
      if (response.ok) {
        console.log('=== SUBMISSION SUCCESS ===')
        setIsSubmitted(true)
      } else {
        throw new Error('Failed to submit form')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmissionError('There was an error submitting your request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  // ===== NAVIGATION HANDLERS =====
  const nextStep = useCallback(async () => {
    console.log('=== NEXT STEP ===')
    console.log('Current step:', currentStep)
    console.log('Is step valid:', isStepValid())
    
    if (currentStep < 4) {
      // Validate current step before proceeding
      const fieldsToValidate = getFieldsForStep(currentStep)
      console.log('Fields to validate:', fieldsToValidate)
      
      const isValid = await trigger(fieldsToValidate)
      console.log('Trigger result:', isValid)
      
      if (isValid) {
        // Clear any errors before moving to next step
        clearErrors()
        setCurrentStep(currentStep + 1)
      }
    }
  }, [currentStep, isStepValid, trigger, clearErrors])



  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      // Clear errors when going back
      clearErrors()
      setCurrentStep(currentStep - 1)
    }
  }, [currentStep, clearErrors])

  const getFieldsForStep = (step: number): (keyof ContactFormData)[] => {
    switch (step) {
      case 1: return ['serviceType']
      case 2: return ['serviceType', 'propertyType']
      case 3: return ['serviceType', 'propertyType', 'firstName', 'lastName', 'email', 'phone']
      case 4: return ['serviceType', 'propertyType', 'firstName', 'lastName', 'email', 'phone']
      default: return []
    }
  }

  // ===== RENDER SUCCESS STATE =====
  if (isSubmitted) {
    return (
      <section id="contact-form" className="py-20 bg-gradient-to-br from-light-blue to-gentle-lavender">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-sage-green to-green-400 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="text-white" size={48} />
            </div>
            <h2 className="text-4xl font-display font-bold text-charcoal mb-6">
              Thank You!
            </h2>
            <p className="text-xl text-text-gray mb-8">
              Your cleaning request has been submitted successfully. We&apos;ll get back to you within 24 hours 
              with a personalized quote and scheduling options.
            </p>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-charcoal mb-4">What happens next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-elegant-gold rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                  <span className="text-text-gray">We&apos;ll review your request and prepare a custom quote</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-elegant-gold rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                  <span className="text-text-gray">You&apos;ll receive a detailed proposal within 24 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-elegant-gold rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                  <span className="text-text-gray">Schedule your cleaning service at your convenience</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  // ===== MAIN FORM RENDER =====
  return (
    <section id="contact-form" className="py-20 bg-gradient-to-br from-light-blue to-gentle-lavender">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal mb-6">
            Get Your Free Quote
          </h2>
          <p className="text-xl text-text-gray max-w-2xl mx-auto">
            Tell us about your cleaning needs and we&apos;ll provide a personalized quote 
            within 24 hours. No obligation, just sparkling results.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <form 
            action="https://formsubmit.co/sparklesavcleaning@gmail.com" 
            method="POST"
            onSubmit={(e) => {
              e.preventDefault() // Always prevent default first
              if (currentStep !== 4) {
                console.log('Form submission prevented: not on step 4')
                return
              }
              // Only allow submission on step 4
              handleSubmit(onSubmit)(e)
            }} 
            onKeyDown={(e) => {
              if (e.key === 'Enter' && currentStep !== 4) {
                e.preventDefault()
              }
            }} 
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            {/* Hidden fields for FormSubmit */}
            <input type="hidden" name="serviceType" value={watchedServiceType || ''} />
            <input type="hidden" name="propertyType" value={watch('propertyType') || ''} />
            <input type="hidden" name="squareFootage" value={watch('squareFootage') || ''} />
            <input type="hidden" name="frequency" value={watch('frequency') || ''} />
            <input type="hidden" name="firstName" value={watchedFirstName || ''} />
            <input type="hidden" name="lastName" value={watchedLastName || ''} />
            <input type="hidden" name="email" value={watchedEmail || ''} />
            <input type="hidden" name="phone" value={watchedPhone || ''} />
            <input type="hidden" name="preferredDate" value={watch('preferredDate') || ''} />
            <input type="hidden" name="howDidYouHear" value={watch('howDidYouHear') || ''} />
            <input type="hidden" name="message" value={watch('message') || ''} />
            
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold",
                      step <= currentStep 
                        ? "bg-elegant-gold text-white" 
                        : "bg-light-silver text-text-gray"
                    )}>
                      {step}
                    </div>
                    {step < 4 && (
                      <div className={cn(
                        "w-16 h-1 mx-2",
                        step < currentStep ? "bg-elegant-gold" : "bg-light-silver"
                      )} />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-sm text-text-gray text-center">
                Step {currentStep} of 4
              </div>
            </div>

            {/* Debug Info */}
            <div className="mb-4 p-3 bg-gray-100 rounded text-xs">
              <div>Debug: Step {currentStep}, Valid: {isValid ? 'Yes' : 'No'}, Dirty: {isDirty ? 'Yes' : 'No'}</div>
              <div>Errors: {Object.keys(errors).length > 0 ? Object.keys(errors).join(', ') : 'None'}</div>
            </div>

            {/* Error Display */}
            {submissionError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <p className="text-red-600 text-sm">{submissionError}</p>
              </motion.div>
            )}

            {/* Form Steps */}
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-display font-semibold text-charcoal mb-6">
                    What type of cleaning service do you need?
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {serviceTypes.map((service) => (
                      <button
                        key={service.value}
                        type="button"
                        onClick={() => {
                          console.log('Setting service type:', service.value)
                          setValue('serviceType', service.value)
                        }}
                        className={cn(
                          "p-6 rounded-xl border-2 text-left transition-all duration-300",
                          watchedServiceType === service.value
                            ? "border-elegant-gold bg-elegant-gold/5"
                            : "border-light-silver hover:border-elegant-gold/50"
                        )}
                      >
                        <div className="text-3xl mb-3">{service.icon}</div>
                        <h4 className="text-lg font-semibold text-charcoal mb-2">
                          {service.label}
                        </h4>
                      </button>
                    ))}
                  </div>
                  
                  {errors.serviceType && (
                    <p className="text-red-500 text-sm">{errors.serviceType.message}</p>
                  )}
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-display font-semibold text-charcoal mb-6">
                    Tell us about your property
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-charcoal mb-2">
                        Property Type
                      </label>
                      <select
                        {...register('propertyType')}
                        className="w-full p-3 border border-light-silver rounded-lg focus:ring-2 focus:ring-elegant-gold focus:border-transparent"
                      >
                        <option value="">Select property type</option>
                        {propertyTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      {errors.propertyType && (
                        <p className="text-red-500 text-sm mt-1">{errors.propertyType.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-charcoal mb-2">
                        Square Footage (optional)
                      </label>
                                             <input
                         type="number"
                         {...register('squareFootage')}
                         placeholder="e.g., 1500"
                         min="1"
                         max="50000"
                         className="w-full p-3 border border-light-silver rounded-lg focus:ring-2 focus:ring-elegant-gold focus:border-transparent"
                       />
                       {errors.squareFootage && (
                         <p className="text-red-500 text-sm mt-1">{errors.squareFootage.message}</p>
                       )}
                    </div>
                  </div>
                  
                  {watchedServiceType === 'recurring' && (
                    <div>
                      <label className="block text-sm font-semibold text-charcoal mb-2">
                        Cleaning Frequency
                      </label>
                      <select
                        {...register('frequency')}
                        className="w-full p-3 border border-light-silver rounded-lg focus:ring-2 focus:ring-elegant-gold focus:border-transparent"
                      >
                        <option value="">Select frequency</option>
                        {frequencyOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-display font-semibold text-charcoal mb-6">
                    Your contact information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-charcoal mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        {...register('firstName')}
                        className="w-full p-3 border border-light-silver rounded-lg focus:ring-2 focus:ring-elegant-gold focus:border-transparent"
                        placeholder="John"
                        maxLength={50}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-charcoal mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        {...register('lastName')}
                        className="w-full p-3 border border-light-silver rounded-lg focus:ring-2 focus:ring-elegant-gold focus:border-transparent"
                        placeholder="Doe"
                        maxLength={50}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-charcoal mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        {...register('email')}
                        className="w-full p-3 border border-light-silver rounded-lg focus:ring-2 focus:ring-elegant-gold focus:border-transparent"
                        placeholder="john@example.com"
                        maxLength={100}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-charcoal mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        {...register('phone')}
                        className="w-full p-3 border border-light-silver rounded-lg focus:ring-2 focus:ring-elegant-gold focus:border-transparent"
                        placeholder="(910) 555-0123"
                        maxLength={20}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-display font-semibold text-charcoal mb-6">
                    Additional details
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-2">
                      Preferred Date (optional)
                    </label>
                    <input
                      type="date"
                      {...register('preferredDate')}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-3 border border-light-silver rounded-lg focus:ring-2 focus:ring-elegant-gold focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-2">
                      How did you hear about us?
                    </label>
                    <select
                      {...register('howDidYouHear')}
                      className="w-full p-3 border border-light-silver rounded-lg focus:ring-2 focus:ring-elegant-gold focus:border-transparent"
                    >
                      <option value="">Select an option</option>
                      {referralSources.map((source) => (
                        <option key={source.value} value={source.value}>
                          {source.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-2">
                      Additional Message (optional)
                    </label>
                    <textarea
                      {...register('message')}
                      rows={4}
                      maxLength={500}
                      className="w-full p-3 border border-light-silver rounded-lg focus:ring-2 focus:ring-elegant-gold focus:border-transparent"
                      placeholder="Tell us about any specific cleaning needs or special instructions&hellip;"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Maximum 500 characters
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300",
                  currentStep === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-charcoal hover:text-elegant-gold"
                )}
              >
                <ArrowLeft size={20} />
                Previous
              </button>
              
              {currentStep < 4 && (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300",
                    isStepValid()
                      ? "bg-elegant-gold text-white hover:bg-elegant-gold/90"
                      : "bg-light-silver text-gray-400 cursor-not-allowed"
                  )}
                >
                  Next
                  <ArrowRight size={20} />
                </button>
              )}
            </div>

            {/* Submit Section - Only on Step 4 */}
            {currentStep === 4 && (
              <div className="mt-8 pt-6 border-t border-light-silver">
                <div className="text-center">
                  <p className="text-sm text-text-gray mb-4">
                    Review your information above and click submit when ready
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting || !isFormReadyForSubmission()}
                    className={cn(
                      "flex items-center gap-2 px-8 py-4 rounded-lg transition-all duration-300 mx-auto",
                      isSubmitting || !isFormReadyForSubmission()
                        ? "bg-light-silver text-gray-400 cursor-not-allowed"
                        : "bg-coral text-white hover:bg-coral/90 shadow-lg"
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Request
                        <Sparkles size={20} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
