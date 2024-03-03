'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { i18n } from '@/i18n.config'

export default function LocaleSwitcher() {
  const pathName = usePathname()

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <ul className='flex gap-x-3'>
      {i18n.locales.map(locale => {
        return (
          <li key={locale} className='transition hover:text-[#BFA53D]'>
            {pathName.includes('/dashboard') || pathName.includes(locale) ? (
              <div></div>
            ) : (
              <Link href={redirectedPathName(locale)}>
                {locale.toUpperCase()}
              </Link>
            )}
          </li>
        )
      })}
    </ul>
  )
}
