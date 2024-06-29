import './globals.css'

import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'

import type { Metadata } from 'next'
import { Locale, i18n } from '@/i18n.config'

import Header from './components/header'

import { Toaster } from 'react-hot-toast'

import { Poppins } from 'next/font/google'

import Footer from './components/footer'

import { ClerkProvider } from '@clerk/nextjs'
import { Suspense } from 'react'
import Loading from './loading'

const poppins = Poppins({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: 'Zrinski Photography - Capturing Moments, Creating Memories',
  keywords: [
    'photography',
    'Zrinski Photography',
    'Antonija Zrinski',
    'photographer',
    'professional photography',
    'wedding photography',
    'portrait photography',
    'event photography',
    'photography portfolio',
    'photo gallery',
    'Zrinski Photography portfolio',
    'Zrinski Photography website',
    'Antonija Zrinski photography',
    'Antonija Zrinski photographer',
    'Antonija Zrinski portfolio',
    'fotografija',
    'Zrinski fotografija',
    'Antonija Zrinski',
    'fotograf',
    'profesionalno fotografiranje',
    'fotografiranje vjenčanja',
    'portretna fotografija',
    'fotografija događaja',
    'portfolio fotografija',
    'FOTOGALERIJA',
    'Portfolio Zrinski Photography',
    'web stranica Zrinski Photography',
    'Antonija Zrinski fotografija',
    'Antonija Zrinski fotograf',
    'Antonija Zrinski portfelj'
  ],
  description: 'Zrinski Photography - Capturing Moments, Creating Memories',
  authors: { name: 'Kristijan Pavlic Tumpa' },
  robots: 'index, follow',
  icons: [
    {
      url: '/favicon.ico',
      href: '/favicon.ico',
      type: 'image/ico'
    }
  ],
  openGraph: {
    title: 'Zrinski Photography - Capturing Moments, Creating Memories',
    description:
      'Explore Zrinski Photography, the professional portfolio of Antonija Zrinski. Discover stunning photos, creative projects, and contact information.',
    url: 'https://zrinski-photo.com',
    type: 'website',
    images: [
      {
        url: 'https://zrinski-photo.com/favicon.ico',
        width: 32,
        height: 32,
        alt: 'Zrinski Photography Logo'
      }
    ]
  }
}

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }))
}

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  return (
    <html lang={params.lang}>
      <SpeedInsights />
      <Suspense fallback={<Loading />}>
        <body className={poppins.className}>
          <Header lang={params.lang} />
          <main className='min-h-[92svh]'>
            <Toaster position='top-right' toastOptions={{ duration: 3500 }} />
            <ClerkProvider>
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </ClerkProvider>
          </main>
          <Footer lang={params.lang} />
        </body>
      </Suspense>
      <Analytics />
    </html>
  )
}
