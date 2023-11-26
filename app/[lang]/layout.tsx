import './globals.css'
import type { Metadata } from 'next'
import { Locale, i18n } from '@/i18n.config'
import Header from './components/header'

import { Toaster } from 'react-hot-toast'

import { Poppins } from 'next/font/google'
import Footer from './components/footer'

const poppins = Poppins({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: 'Zrinski Photography',
  description: 'Zrinski Photography'
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
        <main className='flex min-h-[100svh] flex-col'>
          <Toaster position='top-right' toastOptions={{ duration: 3000 }} />
          {children}
        </main>
        <Footer lang={params.lang} />
      </body>
    </html>
  )
}
