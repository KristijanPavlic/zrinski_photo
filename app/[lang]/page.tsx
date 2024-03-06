import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'

import Link from 'next/link'

import Image from 'next/image'
import hero1 from '@/public/hero_1.jpg'
import hero2 from '@/public/hero_2.jpg'
import hero3 from '@/public/hero_3.jpg'

export default async function Home({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang)
  const { page } = dictionary

  return (
    <section className='py-10 lg:py-20'>
      <div className='container flex flex-col justify-between gap-8 lg:flex-row'>
        <div className='flex flex-col pb-10 lg:pb-0'>
          <h1 className='text-xl text-gray-500'>{page.home.title}</h1>
          <p
            className={`max-w-md pt-5 font-serif text-3xl font-bold italic leading-[50px] lg:max-w-[500px] lg:text-4xl lg:leading-[72px] xl:max-w-[700px] xl:pt-20  xl:text-5xl xl:leading-[92px]`}
          >
            {page.home.description}
          </p>
          <div className='flex gap-5 pt-12'>
            <Link
              href={`/${lang}/gallery`}
              className='rounded-full border-2 border-black px-5 py-3 transition hover:bg-[#BFA53D] hover:text-white lg:px-7 lg:py-3 lg:text-lg'
            >
              {page.home.btn1}
            </Link>
            <Link
              href={`/${lang}/contact`}
              className='rounded-full border-2 border-black px-5 py-3 transition hover:bg-[#BFA53D] hover:text-white lg:px-7 lg:py-3 lg:text-lg'
            >
              {page.home.btn2}
            </Link>
          </div>
        </div>
        <div className='flex flex-col gap-5 lg:w-1/2 xl:w-1/3'>
          <div>
            <Image
              className='rounded-xl shadow-lg'
              src={hero1}
              width={800}
              height={500}
              alt='First hero image'
            />
          </div>
          <div className='flex gap-5'>
            <div>
              <Image
                className='rounded-xl shadow-lg'
                src={hero2}
                width={400}
                height={200}
                alt='Second hero image'
              />
            </div>
            <div>
              <Image
                className='rounded-xl shadow-lg'
                src={hero3}
                width={400}
                height={200}
                alt='Third hero image'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
