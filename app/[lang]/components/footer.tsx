import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import Link from 'next/link'

export default async function Footer({ lang }: { lang: Locale }) {
  const { footer } = await getDictionary(lang)

  const currentYear = new Date().getFullYear()

  return (
    <footer className='text-md bottom-0 w-full border-t-2 bg-white'>
      <div className='container mx-auto flex flex-col justify-between py-4 text-center md:flex-row md:text-left'>
        <div className='flex flex-col gap-2 md:flex-row md:gap-5'>
          <span aria-label='Copyright information'>
            &copy; {currentYear} {footer.copyright}
          </span>
          <Link
            className='transition hover:text-[#BFA53D]'
            href={`/en/dashboard`}
            aria-label='Link to admin page'
          >
            {footer.admin}
          </Link>
        </div>
        <div className='pt-4 md:pt-0'>
          <span aria-label='Made by information'>{footer.made}</span>
        </div>
      </div>
    </footer>
  )
}
