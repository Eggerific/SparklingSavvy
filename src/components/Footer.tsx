'use client'

import { Phone, Mail, MapPin, Clock, Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-navy-blue text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 text-2xl font-display font-bold mb-6">
              <div className="relative">
                <Sparkles className="text-gold" size={32} />
              </div>
              <span>Sparkly Savvy Cleaning</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Local cleaning services for Jacksonville and Topsail, NC. 
              Licensed, insured, and committed to excellence in every detail.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                <span className="text-white font-bold">5★</span>
              </div>
              <div>
                <div className="text-sm text-gray-300">Local & Trusted</div>
                <div className="text-xs text-gray-400">100+ happy customers</div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="text-gold" size={20} />
                <div>
                  <a 
                    href="tel:9105469633" 
                    className="font-semibold hover:text-gold transition-colors cursor-pointer"
                  >
                    (910) 546-9633
                  </a>
                  <div className="text-sm text-gray-300">Call us anytime</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-gold" size={20} />
                <div>
                  <a 
                    href="mailto:sparklesavcleaning@gmail.com" 
                    className="font-semibold hover:text-gold transition-colors cursor-pointer"
                  >
                    sparklesavcleaning@gmail.com
                  </a>
                  <div className="text-sm text-gray-300">Email us</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-gold" size={20} />
                <div>
                  <div className="font-semibold">Jacksonville & Topsail, NC</div>
                  <div className="text-sm text-gray-300">Licensed & Insured</div>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Business Hours</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Clock className="text-gold" size={20} />
                <div>
                  <div className="font-semibold">Monday - Friday</div>
                  <div className="text-sm text-gray-300">7:00 AM - 7:00 PM</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="text-gold" size={20} />
                <div>
                  <div className="font-semibold">Saturday</div>
                  <div className="text-sm text-gray-300">8:00 AM - 6:00 PM</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="text-gold" size={20} />
                <div>
                  <div className="font-semibold">Sunday</div>
                  <div className="text-sm text-gray-300">9:00 AM - 5:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-300 text-sm">
              © 2024 Sparkly Savvy Cleaning. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-gold transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-gold transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-300 hover:text-gold transition-colors">
                Service Areas
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
