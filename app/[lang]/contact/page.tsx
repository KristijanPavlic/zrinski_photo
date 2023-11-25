import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import ContactForm from '../components/form'

export default async function About({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const { page } = await getDictionary(lang)

  return (
    <section className='py-10 lg:py-32'>
      <div className='container'>
        <h1 className=' text-xl font-bold lg:text-3xl'>{page.contact.title}</h1>
        <div className='mt-5 flex flex-col gap-6 lg:mt-10 lg:flex-row lg:justify-between lg:gap-12'>
          <div className='flex w-full flex-col gap-3 text-base lg:gap-6 lg:text-lg'>
            <p className='text-gray-500'>{page.contact.first}</p>
            <p className='text-gray-500'>
              <b>{page.contact.email}</b>
              {page.contact.ouremail}
            </p>
            <p className='text-gray-500'>
              <b>{page.contact.phone}</b>
              {page.contact.ourphone}
            </p>
            <p className='text-gray-500'>{page.contact.second}</p>
          </div>
          <div className='lg:w-[600px]'>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
