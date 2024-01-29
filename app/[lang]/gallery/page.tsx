import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'

import Image from 'next/image'
import cover from '@/public/gallery_cover.jpg'
import Link from 'next/link'

export default async function About({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const { page } = await getDictionary(lang)

  const categories = [
    'Weddings',
    'Christening',
    'Cake smash',
    'Family - kids - pregnancy',
    'Christmas'
  ]

  const categoriesHr = [
    'Vjenčanja',
    'Krštenja',
    'Cake smash',
    'Obitelj - djeca - trudnoća',
    'Božić'
  ]

  return (
    <section className='py-10 lg:py-32'>
      <div className='container'>
        <h1 className=' text-xl font-bold lg:text-3xl'>{page.gallery.title}</h1>
        <div className='mt-5 grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:mt-10 xl:grid-cols-3'>
          {categories.map((category, index) => (
            <Link
              href={`/${lang}/gallery/${category === categories[3] ? category.slice(0, 6).toLowerCase() : category.toLowerCase().replace(/\s/g, '-')}`}
              key={category}
            >
              <div className='transition hover:cursor-pointer hover:text-[#BFA53D]'>
                <h2 className='mb-2 text-lg'>
                  {lang === 'en' ? category : categoriesHr[index]}
                </h2>
                <div className='w-full overflow-hidden rounded-xl shadow-lg hover:shadow-none'>
                  <Image
                    src={cover}
                    alt='Gallery cover'
                    className='rounded-[10px] bg-cover duration-200 ease-in-out hover:scale-125 hover:blur-sm'
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
