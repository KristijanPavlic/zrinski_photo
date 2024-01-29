import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'

import Image from 'next/image'
import cover from '@/public/gallery_cover.jpg'

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

  return (
    <section className='py-10 lg:py-32'>
      <div className='container'>
        <h1 className=' text-xl font-bold lg:text-3xl'>{page.gallery.title}</h1>
        <div className='mt-5 grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:mt-10 xl:grid-cols-3'>
          {categories.map(category => (
            <div key={category}>
              <h2 className='mb-2'>{category}</h2>
              <div className='h-[270px] w-full'>
                <Image
                  src={cover}
                  alt='Gallery cover'
                  className='rounded-[10px] bg-cover'
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
