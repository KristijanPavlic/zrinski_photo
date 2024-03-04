import GalleryGrid from '@/app/[lang]/components/gallery-grid'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import Link from 'next/link'

export default async function CakeSmash({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const { page } = await getDictionary(lang)

  return (
    <section className='py-10 lg:py-32'>
      <div className='container'>
        <div className='flex gap-3'>
          <Link href={`/${lang}/gallery`}>
            <h1 className='text-xl font-bold transition hover:text-[#BFA53D] lg:text-3xl'>
              {page.gallery.title}
            </h1>
          </Link>
          <span className='text-xl font-bold lg:text-3xl'>-</span>
          <Link href={`/${lang}/gallery/cake-smash`}>
            <h1 className='text-xl font-bold transition hover:text-[#BFA53D] lg:text-3xl'>
              {page.gallery.category3}
            </h1>
          </Link>
        </div>
        <GalleryGrid
        /* button1={page.gallery.moreBtn}
          button2={page.gallery.lessBtn} */
        />
      </div>
    </section>
  )
}
