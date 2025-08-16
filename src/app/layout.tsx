import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sparkly Savvy Cleaning - Professional Cleaning Services',
  description: 'Transform your space with Sparkly Savvy Cleaning. Professional residential and commercial cleaning services with attention to detail and eco-friendly products.',
  keywords: 'cleaning service, house cleaning, commercial cleaning, professional cleaning, eco-friendly cleaning',
  authors: [{ name: 'Sparkly Savvy Cleaning' }],
  openGraph: {
    title: 'Sparkly Savvy Cleaning - Professional Cleaning Services',
    description: 'Transform your space with professional cleaning services',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
