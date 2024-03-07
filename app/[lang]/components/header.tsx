'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import LocaleSwitcher from './locale-switcher'
import ZrinskiLogo from '../../../public/zrinski.svg'

export default function Header({ lang }: { lang: Locale }) {
  const [navigation, setNavigation] = useState<{
    home: string
    gallery: string
    about: string
    contact: string
  } | null>(null)
  const [showMenu, setShowMenu] = useState(false)

  const pathName = usePathname()

  useEffect(() => {
    const fetchData = async () => {
      const dictionary = await getDictionary(lang)
      setNavigation(dictionary.navigation)
    }

    fetchData()
  }, [lang])

  const handleMenuClick = () => {
    if (showMenu) {
      setShowMenu(false)
    } else {
      setShowMenu(true)
    }
  }

  const closeMenuOnClick = () => {
    setShowMenu(false)
  }

  const menuBtnText = () => {
    return lang === 'en'
      ? showMenu
        ? 'Close'
        : 'Menu'
      : showMenu
        ? 'Zatvori'
        : 'Meni'
  }

  return (
    <>
      <div className='sticky top-0 bg-[#BFA53D] py-4 text-center'>
        The site is currently under development
      </div>
      <header className='sticky top-0 z-50 border-b-2 bg-white py-4 shadow-lg'>
        <nav className='container font-serif text-lg'>
          <div className='flex items-center justify-between'>
            <div>
              <Link href={`/${lang}`} onClick={closeMenuOnClick}>
                <Image
                  src={ZrinskiLogo}
                  alt='Zrinski Photography Logo'
                  width={100}
                  height={100}
                />
              </Link>
            </div>

            <div className='hidden md:block'>
              <ul className='desktop-nav flex gap-x-8'>
                <li
                  className={`w-fit transition hover:text-[#BFA53D] ${pathName.length < 4 ? 'text-[#BFA53D]' : ''}`}
                >
                  <Link href={`/${lang}`}>{navigation?.home}</Link>
                </li>
                <li
                  className={`w-fit transition hover:text-[#BFA53D] ${pathName.includes('/gallery') ? 'text-[#BFA53D]' : ''}`}
                >
                  <Link href={`/${lang}/gallery`}>{navigation?.gallery}</Link>
                </li>
                <li
                  className={`w-fit transition hover:text-[#BFA53D] ${pathName.includes('/about') ? 'text-[#BFA53D]' : ''}`}
                >
                  <Link href={`/${lang}/about`}>{navigation?.about}</Link>
                </li>
                <li
                  className={`w-fit transition hover:text-[#BFA53D] ${pathName.includes('/contact') ? 'text-[#BFA53D]' : ''}`}
                >
                  <Link href={`/${lang}/contact`}>{navigation?.contact}</Link>
                </li>
                <LocaleSwitcher />
              </ul>
            </div>

            <div className='md:hidden'>
              <button
                onClick={handleMenuClick}
                className={`transition hover:text-[#BFA53D] ${
                  showMenu ? 'close' : ''
                }`}
              >
                {menuBtnText()}
              </button>
              <nav
                id='navMenu'
                className={`absolute left-0 top-[84px] z-50 h-fit w-full border-b-2 bg-white px-6 py-4 shadow-lg ${
                  showMenu ? 'block' : 'hidden'
                }`}
              >
                <ul className='flex h-full flex-col justify-center gap-y-2'>
                  <li
                    className={`w-fit transition hover:text-[#BFA53D] ${pathName.length < 4 ? 'text-[#BFA53D]' : ''}`}
                  >
                    <Link href={`/${lang}`} onClick={closeMenuOnClick}>
                      {navigation?.home}
                    </Link>
                  </li>
                  <li
                    className={`w-fit transition hover:text-[#BFA53D] ${pathName.includes('/gallery') ? 'text-[#BFA53D]' : ''}`}
                  >
                    <Link href={`/${lang}/gallery`} onClick={closeMenuOnClick}>
                      {navigation?.gallery}
                    </Link>
                  </li>
                  <li
                    className={`w-fit transition hover:text-[#BFA53D] ${pathName.includes('/about') ? 'text-[#BFA53D]' : ''}`}
                  >
                    <Link href={`/${lang}/about`} onClick={closeMenuOnClick}>
                      {navigation?.about}
                    </Link>
                  </li>
                  <li
                    className={`w-fit transition hover:text-[#BFA53D] ${pathName.includes('/contact') ? 'text-[#BFA53D]' : ''}`}
                  >
                    <Link href={`/${lang}/contact`} onClick={closeMenuOnClick}>
                      {navigation?.contact}
                    </Link>
                  </li>
                  <LocaleSwitcher />
                </ul>
              </nav>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
