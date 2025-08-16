'use client'

import { motion } from 'framer-motion'
import { Sparkles, Star, Shield, Clock } from 'lucide-react'

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-light-blue via-sparkly-white to-cream overflow-hidden">
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-light-blue via-sparkly-white to-cream"
        animate={{
          background: [
            "linear-gradient(to bottom right, #8cd0e5, #FEFEFE, #fcddc9)",
            "linear-gradient(to bottom right, #fcddc9, #FEFEFE, #8cd0e5)",
            "linear-gradient(to bottom right, #8cd0e5, #FEFEFE, #fcddc9)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Moving Stars Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Horizontal moving stars - Row 1 */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`star-h1-${i}`}
            className="absolute text-gold opacity-60"
            style={{
              left: `-80px`,
              top: `${(i * 15) + 8}%`,
            }}
            animate={{
              x: [0, 1600],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20 + (i * 1.5),
              repeat: Infinity,
              delay: i * 0.8,
              ease: "linear"
            }}
          >
            <Sparkles size={24 + (i % 2) * 8} />
          </motion.div>
        ))}
        
        {/* Horizontal moving stars - Row 2 */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`star-h2-${i}`}
            className="absolute text-gold opacity-50"
            style={{
              left: `-80px`,
              top: `${(i * 12) + 25}%`,
            }}
            animate={{
              x: [0, 1600],
              rotate: [0, -360],
            }}
            transition={{
              duration: 25 + (i * 2),
              repeat: Infinity,
              delay: i * 1.2,
              ease: "linear"
            }}
          >
            <Star size={20 + (i % 3) * 6} />
          </motion.div>
        ))}
        
        {/* Horizontal moving stars - Row 3 */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`star-h3-${i}`}
            className="absolute text-gold opacity-70"
            style={{
              left: `-80px`,
              top: `${(i * 18) + 60}%`,
            }}
            animate={{
              x: [0, 1600],
              rotate: [0, 360],
            }}
            transition={{
              duration: 18 + (i * 1.8),
              repeat: Infinity,
              delay: i * 0.6,
              ease: "linear"
            }}
          >
            <Sparkles size={28 + (i % 2) * 10} />
          </motion.div>
        ))}
        
        {/* Horizontal moving stars - Row 4 */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`star-h4-${i}`}
            className="absolute text-gold opacity-55"
            style={{
              left: `-80px`,
              top: `${(i * 20) + 80}%`,
            }}
            animate={{
              x: [0, 1600],
              rotate: [0, -360],
            }}
            transition={{
              duration: 22 + (i * 2.5),
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear"
            }}
          >
            <Star size={22 + (i % 2) * 8} />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Logo/Brand */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 text-4xl font-display font-bold text-navy-blue">
              <div className="relative">
                <Sparkles className="text-gold animate-sparkle" size={48} />
                <Star className="absolute -top-1 -right-1 text-coral" size={20} />
              </div>
              <span className="bg-gradient-to-r from-navy-blue to-gold bg-clip-text text-transparent">
                Sparkly Savvy
              </span>
              <span className="text-lavender">Cleaning</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-display font-bold text-navy-blue mb-6"
          >
            Serving Jacksonville & Topsail
            <br />
            <span className="text-lavender">Professional Cleaning</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-text-gray mb-8 max-w-2xl mx-auto"
          >
            Local cleaning services for Jacksonville, NC and Topsail, NC. 
            <br />
            Licensed, insured, and committed to excellence.
            <br />
            <a 
              href="tel:9105469633" 
              className="text-coral font-semibold hover:text-coral/80 transition-colors cursor-pointer"
            >
              Call (910) 546-9633 today!
            </a>
          </motion.p>

          {/* Trust Signals */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            <div className="flex items-center gap-2 text-lavender">
              <Shield size={20} />
              <span className="font-semibold">Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2 text-gold">
              <Clock size={20} />
              <span className="font-semibold">Same Day Response</span>
            </div>
            <div className="flex items-center gap-2 text-coral">
              <Star size={20} />
              <span className="font-semibold">Local & Trusted</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button 
              onClick={() => scrollToSection('contact-form')}
              className="btn-primary text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Free Quote
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection('services')}
              className="btn-secondary text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Services
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-navy-blue rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-navy-blue rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
