'use client'

import { motion } from 'framer-motion'
import { Home, Building, Package, Sparkles, RefreshCw, CheckCircle } from 'lucide-react'
import Image from 'next/image'

const services = [
  {
    icon: Home,
    title: 'Residential Cleaning',
    description: 'Comprehensive home cleaning services tailored to your lifestyle and preferences.',
    features: ['Regular maintenance', 'Deep cleaning', 'Eco-friendly products', 'Flexible scheduling'],
    price: 'From $85',
    color: 'from-lavender to-purple-400'
  },
  {
    icon: Building,
    title: 'Commercial Cleaning',
    description: 'Professional cleaning solutions for offices, retail spaces, and commercial properties.',
    features: ['Daily/weekly service', 'Specialized equipment', 'Certified staff', 'After-hours cleaning'],
    price: 'From $150',
    color: 'from-gold to-yellow-400'
  },
  {
    icon: Package,
    title: 'Move-Out Cleaning',
    description: 'Thorough cleaning to ensure your security deposit return and leave a lasting impression.',
    features: ['Full property cleaning', 'Appliance cleaning', 'Window washing', 'Final inspection'],
    price: 'From $120',
    color: 'from-coral to-pink-400'
  },
  {
    icon: Sparkles,
    title: 'Deep Cleaning',
    description: 'Intensive cleaning service for neglected spaces or special occasions.',
    features: ['Detailed attention', 'Hard-to-reach areas', 'Sanitization', 'Odor elimination'],
    price: 'From $180',
    color: 'from-light-blue to-blue-400'
  },
  {
    icon: RefreshCw,
    title: 'Recurring Service',
    description: 'Consistent cleaning schedule to maintain your space at its best year-round.',
    features: ['Customized schedule', 'Priority booking', 'Consistent quality', 'Loyalty discounts'],
    price: 'From $75',
    color: 'from-cream to-yellow-200'
  },
  {
    icon: Sparkles,
    title: 'Specialty Cleaning',
    description: 'Specialized cleaning for unique surfaces, materials, and specific requirements.',
    features: ['Custom solutions', 'Expert techniques', 'Specialized equipment', 'Detailed attention'],
    price: 'From $200',
    color: 'from-sage-green to-green-400'
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-soft-gray">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal mb-6">
            Our Cleaning Services
          </h2>
          <p className="text-xl text-text-gray max-w-3xl mx-auto">
            From regular maintenance to deep cleaning, we offer comprehensive solutions 
            to keep your space sparkling clean and healthy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card p-8 hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 mx-auto`}>
                <service.icon className="text-white" size={32} />
              </div>
              
              <h3 className="text-2xl font-display font-semibold text-charcoal mb-4">
                {service.title}
              </h3>
              
              <p className="text-text-gray mb-6">
                {service.description}
              </p>
              
              <div className="space-y-3 mb-6">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle className="text-sage-green flex-shrink-0" size={20} />
                    <span className="text-sm text-text-gray">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-display font-bold text-coral mb-4">
                  {service.price}
                </div>
                <button 
                  onClick={() => {
                    const contactForm = document.getElementById('contact-form')
                    if (contactForm) {
                      contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  }}
                  className="btn-primary w-full"
                >
                  Get Quote
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-3xl font-display font-bold text-charcoal mb-12">
            Why Choose Sparkly Savvy Cleaning?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-lavender to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-white" size={32} />
              </div>
              <h4 className="text-xl font-semibold text-navy-blue mb-2">Quality Guaranteed</h4>
              <p className="text-text-gray">100% satisfaction guarantee with every service</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-gold to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-white" size={32} />
              </div>
              <h4 className="text-xl font-semibold text-navy-blue mb-2">Eco-Friendly</h4>
              <p className="text-text-gray">Safe, non-toxic cleaning products for your family</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-coral to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-white" size={32} />
              </div>
              <h4 className="text-xl font-semibold text-navy-blue mb-2">Reliable Service</h4>
              <p className="text-text-gray">On-time, professional, and consistent every time</p>
            </div>
          </div>
        </motion.div>

        {/* Cleaning Gallery Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-3xl font-display font-bold text-charcoal text-center mb-12">
            Our Work Speaks for Itself
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { src: '/images/cleaning-service-1.jpg', alt: 'Professional residential cleaning service' },
              { src: '/images/cleaning-service-2.jpg', alt: 'Commercial cleaning excellence' },
              { src: '/images/cleaning-service-3.jpg', alt: 'Move-out cleaning service' },
              { src: '/images/cleaning-service-4.jpg', alt: 'Deep cleaning transformation' },
              { src: '/images/cleaning-service-5.jpg', alt: 'Recurring maintenance cleaning' },
              { src: '/images/cleaning-service-6.jpg', alt: 'Specialty cleaning services' },
            ].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-xl shadow-lg"
              >
                <div className="relative h-64">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
