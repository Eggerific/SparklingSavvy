'use client'

import { motion } from 'framer-motion'
import { Award, Users, Heart, Shield } from 'lucide-react'
import Image from 'next/image'

export default function About() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-navy-blue mb-6">
              About Sparkly Savvy Cleaning
            </h2>
            
            <p className="text-lg text-text-gray mb-6">
              Founded with a passion for creating clean, healthy environments, Sparkly Savvy Cleaning 
              has been serving Jacksonville and Topsail, NC with dedication and excellence for over 2 years. 
              We believe that a clean space is essential for well-being and productivity.
            </p>
            
            <p className="text-lg text-text-gray mb-8">
              As a local, family-owned business, we use eco-friendly products and proven techniques 
              to deliver exceptional results that exceed expectations. We&apos;re not just cleaning spaces—we&apos;re 
              creating environments where people can thrive in our coastal community.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-gold mb-2">100+</div>
                <div className="text-text-gray">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-lavender mb-2">2+</div>
                <div className="text-text-gray">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-coral mb-2">100%</div>
                <div className="text-text-gray">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-light-blue mb-2">Local</div>
                <div className="text-text-gray">Family Business</div>
              </div>
            </div>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Professional team photo */}
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/team-photo.jpg"
                alt="Sparkly Savvy Cleaning Professional Team"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={true}
              />
              {/* Overlay with team info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-display font-semibold mb-2">
                    Professional & Trusted
                  </h3>
                  <p className="text-white/90">
                    Certified, insured, and committed to excellence
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-3xl font-display font-bold text-navy-blue text-center mb-12">
            Our Core Values
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-lavender to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-white" size={32} />
              </div>
              <h4 className="text-xl font-semibold text-navy-blue mb-2">Care</h4>
              <p className="text-text-gray">We care about your space as if it were our own</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-gold to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-white" size={32} />
              </div>
              <h4 className="text-xl font-semibold text-navy-blue mb-2">Trust</h4>
              <p className="text-text-gray">Licensed, insured, and background-checked team</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-coral to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-white" size={32} />
              </div>
              <h4 className="text-xl font-semibold text-navy-blue mb-2">Excellence</h4>
              <p className="text-text-gray">Attention to detail in every cleaning task</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-light-blue to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" size={32} />
              </div>
              <h4 className="text-xl font-semibold text-navy-blue mb-2">Community</h4>
              <p className="text-text-gray">Supporting our local coastal community</p>
            </div>
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 bg-soft-gray rounded-2xl p-8"
        >
          <h3 className="text-3xl font-display font-bold text-navy-blue text-center mb-8">
            Certifications & Insurance
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-white" size={32} />
              </div>
              <h4 className="text-lg font-semibold text-navy-blue mb-2">Fully Insured</h4>
              <p className="text-text-gray">Comprehensive coverage for your peace of mind</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-lavender rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-white" size={32} />
              </div>
              <h4 className="text-lg font-semibold text-navy-blue mb-2">Licensed</h4>
              <p className="text-text-gray">State-licensed and bonded cleaning service</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-coral rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-white" size={32} />
              </div>
              <h4 className="text-lg font-semibold text-navy-blue mb-2">Eco-Certified</h4>
              <p className="text-text-gray">Green cleaning products and practices</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
