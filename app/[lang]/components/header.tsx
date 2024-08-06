'use client'

import '../globals.css'

import Image from 'next/image'
import Link from 'next/link'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

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
  const [menuOpen, setMenuOpen] = useState(false)
  const [navVisible, setNavVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const navRef = useRef(null)

  const pathName = usePathname()

  useEffect(() => {
    const fetchData = async () => {
      const dictionary = await getDictionary(lang)
      setNavigation(dictionary.navigation)
    }
    fetchData()
  }, [lang])

  useEffect(() => {
    setNavVisible(true)

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleClickOutside = (event: MouseEvent) => {
    if (navRef.current && !(navRef.current as any).contains(event.target)) {
      setMenuOpen(false)
    }
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <section
      ref={navRef}
      className={`duration-800 sticky top-0 z-40 w-full border-b-2 bg-white py-4 transition-all ease-in-out ${
        navVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <nav className='container z-50 m-auto flex w-full items-center justify-between bg-white px-4'>
        <Link href={`/${lang}`} onClick={() => setMenuOpen(false)}>
          <Image
            src={ZrinskiLogo}
            alt='Zrinski Photography Logo'
            width={100}
            height={100}
          />
        </Link>
        <div className='z-[999] flex items-center md:hidden'>
          {isMobile && <LocaleSwitcher />}
          <div
            onClick={toggleMenu}
            className={`hamburger ml-6 ${menuOpen ? 'open' : ''}`}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <ul
          className={`absolute left-0 z-50 w-full border-b-2 bg-white text-lg transition-all duration-300 ease-in-out md:static md:flex md:space-x-14 md:border-none md:bg-transparent ${
            menuOpen
              ? 'top-16 opacity-100'
              : 'top-[-200px] opacity-0 md:opacity-100'
          } md:flex md:items-center md:justify-end`}
        >
          <li
            className={`m-auto w-fit pt-6 text-center transition hover:text-[#BFA53D] md:m-0 md:p-0 ${pathName.length < 4 ? 'text-[#BFA53D]' : ''}`}
          >
            <Link href={`/${lang}`} onClick={() => setMenuOpen(false)}>
              {navigation?.home}
            </Link>
          </li>
          <li
            className={`m-auto w-fit pt-6 text-center transition hover:text-[#BFA53D] md:p-0 ${pathName.includes('/gallery') ? 'text-[#BFA53D]' : ''}`}
          >
            <Link href={`/${lang}/gallery`} onClick={() => setMenuOpen(false)}>
              {navigation?.gallery}
            </Link>
          </li>
          <li
            className={`m-auto w-fit pt-6 text-center transition hover:text-[#BFA53D] md:p-0 ${pathName.includes('/about') ? 'text-[#BFA53D]' : ''}`}
          >
            <Link href={`/${lang}/about`} onClick={() => setMenuOpen(false)}>
              {navigation?.about}
            </Link>
          </li>
          <li
            className={`m-auto w-fit pb-6 pt-6 text-center transition hover:text-[#BFA53D] md:p-0 ${pathName.includes('/contact') ? 'text-[#BFA53D]' : ''}`}
          >
            <Link href={`/${lang}/contact`} onClick={() => setMenuOpen(false)}>
              {navigation?.contact}
            </Link>
          </li>
          {!isMobile && (
            <li className='mx-auto mt-4 text-center md:mx-0 md:mt-0'>
              <LocaleSwitcher />
            </li>
          )}
        </ul>
      </nav>
    </section>
  )
}
