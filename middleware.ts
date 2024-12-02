import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { i18n } from '@/i18n.config'
import Negotiator from 'negotiator'

import { NextRequest } from 'next/server'

function getLocale(request: NextRequest) {
  const negotiatorHeaders: { [key: string]: string } = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  const locales = i18n.locales
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  const locale = locales.find(l => languages.includes(l)) || i18n.defaultLocale

  return locale
}

const isProtectedRoute = createRouteMatcher([
  '/en/dashboard(.*)',
  '/hr/dashboard(.*)',
  '/gallery(.*)'
])

export default clerkMiddleware(async (auth, request) => {
  const { pathname } = request.nextUrl

  // Locale redirection
  const pathnameIsMissingLocale = i18n.locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
  }

  // Protect routes
  if (isProtectedRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)'
  ]
}
