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
              <a
                href='mailto:az.photography.hr@gmail.com'
                className='transition hover:text-[#BFA53D]'
              >
                {page.contact.ouremail}
              </a>
            </p>
            <p className='text-gray-500'>
              <b>{page.contact.phone}</b>
              <a
                href='tel:+385989389481'
                className='transition hover:text-[#BFA53D]'
              >
                {page.contact.ourphone}
              </a>
            </p>
            <p className='text-gray-500'>{page.contact.second}</p>
          </div>
          <div className='lg:w-[600px]'>
            <ContactForm
              name={page.contact.name}
              nameInput={page.contact.entername}
              email={page.contact.email}
              emailInput={page.contact.enteremail}
              message={page.contact.message}
              messageInput={page.contact.entermessage}
              button1={page.contact.btn1}
              button2={page.contact.btn2}
              success={page.contact.success}
              failed={page.contact.failed}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
