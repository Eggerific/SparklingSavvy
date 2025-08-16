/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors - Your Custom Palette
        'sparkly-white': '#FEFEFE',
        'soft-gray': '#F8F9FA',
        'light-blue': '#8cd0e5',
        'navy-blue': '#376888',
        'lavender': '#826b88',
        'coral': '#de786a',
        'gold': '#f8b976',
        'cream': '#fcddc9',
        
        // Additional Colors
        'charcoal': '#2D3748',
        'elegant-gold': '#D4AF37',
        'sage-green': '#9CAF88',
        'gentle-lavender': '#E6E6FA',
        
        // Neutral Grays
        'light-silver': '#E2E8F0',
        'medium-gray': '#A0AEC0',
        'text-gray': '#4A5568',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
