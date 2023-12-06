import './globals.css'
import type { Metadata } from 'next'
import { Locale, i18n } from '@/i18n.config'

import Header from './components/header'

import { Toaster } from 'react-hot-toast'

import { Poppins } from 'next/font/google'

import Footer from './components/footer'
import { ClerkProvider } from '@clerk/nextjs'

const poppins = Poppins({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: 'Zrinski Photography',
  description: 'Zrinski Photography',
  icons: [
    {
      url: './icon.svg',
      href: './icon.svg'
    }
  ]
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
      <body className={poppins.className}>
        <Header lang={params.lang} />
        <main className='min-h-[92svh]'>
          <Toaster position='top-right' toastOptions={{ duration: 3500 }} />
          {children}
        </main>
        <Footer lang={params.lang} />
      </body>
    </html>
  )
}
