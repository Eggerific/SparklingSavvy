# 🧹 Sparkly Savvy Cleaning - Business Platform

A modern, elegant lead generation website for professional cleaning services. Built with Next.js 14, TypeScript, and Tailwind CSS.

## ✨ Features

- **Modern Design**: Clean, professional design with sparkle animations
- **Multi-step Contact Form**: Smooth, guided form experience with validation
- **Lead Generation**: Instant email and SMS notifications for new leads
- **Responsive Design**: Mobile-first approach for all devices
- **SEO Optimized**: Built for local search visibility
- **Fast Performance**: Optimized for Core Web Vitals

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd sparkly-savvy-cleaning
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your actual values
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Manual Deployment

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**
   - [Vercel](https://vercel.com)
   - [Netlify](https://netlify.com)
   - [Railway](https://railway.app)
   - [Render](https://render.com)

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

## 📁 Project Structure

```
sparkly-savvy-cleaning/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts          # Form submission API
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Home page
│   ├── components/
│   │   ├── Hero.tsx                  # Hero section
│   │   ├── Services.tsx              # Services overview
│   │   ├── About.tsx                 # About section
│   │   ├── ContactForm.tsx           # Multi-step form
│   │   └── Footer.tsx                # Footer
│   └── lib/
│       ├── utils.ts                  # Utility functions
│       └── validation.ts             # Form validation schemas
├── tailwind.config.js                # Tailwind configuration
├── next.config.js                    # Next.js configuration
└── package.json                      # Dependencies
```

## 🎨 Design System

### Color Palette

- **Primary Colors**: Light, modern palette with elegant gold accents
- **Sparkly White**: #FEFEFE
- **Soft Gray**: #F8F9FA
- **Elegant Gold**: #D4AF37
- **Sage Green**: #9CAF88
- **Soft Coral**: #FFB5A7

### Typography

- **Headers**: Poppins (modern, clean)
- **Body**: Inter (readable, professional)

## 📝 Contact Form Features

### Multi-step Process

1. **Service Selection**: Choose cleaning service type
2. **Property Details**: Property type and size
3. **Contact Information**: Name, email, phone
4. **Additional Details**: Preferences and message

### Form Validation

- Real-time validation with Zod schemas
- Required field validation
- Email format validation
- Phone number formatting

### Lead Data Structure

```typescript
interface ContactFormData {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Service Details
  serviceType: 'residential' | 'commercial' | 'move-out' | 'deep-clean' | 'recurring';
  propertyType: 'house' | 'apartment' | 'condo' | 'office' | 'other';
  squareFootage?: number;
  
  // Preferences
  preferredDate?: string;
  frequency?: 'one-time' | 'weekly' | 'bi-weekly' | 'monthly';
  
  // Additional Details
  message?: string;
  howDidYouHear?: 'google' | 'facebook' | 'referral' | 'nextdoor' | 'other';
}
```

## 🔌 Email & SMS Integration

### Email Notifications (Resend)

1. **Install Resend**
   ```bash
   npm install resend
   ```

2. **Add environment variables**
   ```env
   RESEND_API_KEY=re_your_api_key_here
   BUSINESS_EMAIL=your-email@gmail.com
   ```

3. **Update API route**
   Replace the placeholder email function in `src/app/api/contact/route.ts`:

   ```typescript
   import { Resend } from 'resend';
   
   const resend = new Resend(process.env.RESEND_API_KEY);
   
   async function sendEmailNotification(formData: ContactFormData) {
     await resend.emails.send({
       from: 'leads@sparklysavvycleaning.com',
       to: process.env.BUSINESS_EMAIL,
       subject: `New Cleaning Lead: ${formData.firstName} ${formData.lastName}`,
       html: generateLeadEmailTemplate(formData),
     });
   }
   ```

### SMS Notifications (Twilio - Optional)

1. **Install Twilio**
   ```bash
   npm install twilio
   ```

2. **Add environment variables**
   ```env
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE_NUMBER=+1234567890
   ```

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Connect your GitHub repository
   - Add environment variables
   - Deploy automatically

### Environment Variables

Create a `.env.local` file:

```env
# Email notifications
RESEND_API_KEY=re_your_api_key_here
BUSINESS_EMAIL=your-email@gmail.com

# Optional: SMS notifications
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Business information
BUSINESS_PHONE=+1987654321
```

## 🎯 SEO Optimization

### Local SEO

- **Keywords**: "cleaning service near me", "house cleaning [city]"
- **Meta descriptions**: Optimized for cleaning services
- **Schema markup**: Local business structured data
- **Google My Business**: Integration ready

### Performance

- **Core Web Vitals**: Optimized for fast loading
- **Mobile-first**: Responsive design
- **Image optimization**: Next.js Image component
- **Font optimization**: Google Fonts with display swap

## 🔧 Customization

### Brand Colors

Update colors in `tailwind.config.js`:

```javascript
colors: {
  'sparkly-white': '#FEFEFE',
  'elegant-gold': '#D4AF37',
  // ... add your brand colors
}
```

### Business Information

Update contact information in:
- `src/components/Footer.tsx`
- `src/app/layout.tsx` (meta tags)
- Environment variables

### Services

Modify services in `src/lib/validation.ts`:

```typescript
export const serviceTypes = [
  { value: 'residential', label: 'Residential Cleaning', icon: '🏠' },
  // ... add your services
]
```

## 📊 Analytics & Tracking

### Google Analytics

1. **Install GA4**
   ```bash
   npm install @next/third-parties
   ```

2. **Add to layout**
   ```typescript
   import { GoogleAnalytics } from '@next/third-parties/google'
   
   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <GoogleAnalytics gaId="G-XXXXXXXXXX" />
         </body>
       </html>
     )
   }
   ```

### Lead Tracking

- Form submissions logged to console
- Email notifications with lead details
- Optional SMS alerts for urgent leads

## 🛡️ Security

### Form Protection

- **Validation**: Server-side and client-side validation
- **Rate limiting**: Implement rate limiting for form submissions
- **Input sanitization**: Clean user inputs
- **CSRF protection**: Built into Next.js

### Data Privacy

- **GDPR compliance**: Privacy policy and consent
- **Data retention**: Minimal data storage
- **Secure transmission**: HTTPS encryption

## 🎨 Animation & Interactions

### Framer Motion

- **Page transitions**: Smooth page loading
- **Form animations**: Step-by-step form progression
- **Sparkle effects**: Brand-consistent animations
- **Hover states**: Interactive elements

### Micro-interactions

- **Button hover effects**: Scale and shadow changes
- **Form validation**: Real-time feedback
- **Loading states**: Spinner animations
- **Success states**: Confirmation animations

## 📱 Mobile Optimization

### Responsive Design

- **Mobile-first**: Designed for mobile devices
- **Touch-friendly**: Large touch targets
- **Fast loading**: Optimized for mobile networks
- **PWA ready**: Progressive Web App capabilities

## 🔄 Future Enhancements

### Phase 2 Features

- **Online booking system**: Calendar integration
- **Customer portal**: Account management
- **Payment processing**: Stripe integration
- **Review system**: Customer testimonials
- **Photo gallery**: Before/after images

### Phase 3 Features

- **AI-powered pricing**: Dynamic quote generation
- **Route optimization**: Efficient scheduling
- **Inventory management**: Supply tracking
- **Employee portal**: Staff management
- **Analytics dashboard**: Business insights

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support or questions:
- Email: info@sparklysavvycleaning.com
- Phone: (555) 123-4567

---

**Built with ❤️ for the cleaning industry**
