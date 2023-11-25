'use client'

import { useForm, SubmitHandler } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { ContactFormSchema } from '@/lib/schema'
import { sendEmail } from '../_actions'
import { toast } from 'sonner'

export type ContactFormInputs = z.infer<typeof ContactFormSchema>

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(ContactFormSchema)
  })

  const processForm: SubmitHandler<ContactFormInputs> = async data => {
    const result = await sendEmail(data)

    if (result?.success) {
      console.log({ data: result.data })
      toast.success('Email sent!')
      reset()
      return
    }

    console.log(result?.error)
    toast.error('Something went wrong!')
  }

  return (
    <form
      className='flex w-full flex-col text-left'
      action={handleSubmit(processForm)}
    >
      <label>Name:</label>
      <input
        type='text'
        required
        maxLength={20}
        placeholder='Enter your name'
        className='mt-2 rounded-full border-2 border-black p-3'
        {...register('name')}
      />
      {errors.name?.message && (
        <p className='ml-1 mt-1 text-sm text-red-400'>{errors.name.message}</p>
      )}
      <div className='h-5' />
      <label>Email:</label>
      <input
        required
        maxLength={100}
        placeholder='Enter your email'
        className='mt-2 rounded-full border-2 border-black p-3'
        {...register('email')}
      />
      {errors.email?.message && (
        <p className='ml-1 mt-1 text-sm text-red-400'>{errors.email.message}</p>
      )}
      <div className='h-5' />
      <label>Message</label>
      <textarea
        required
        rows={5}
        placeholder='Write your message'
        className='mt-2 rounded-3xl border-2 border-black p-3'
        {...register('message')}
      />
      {errors.message?.message && (
        <p className='ml-1 mt-1 text-sm text-red-400'>
          {errors.message.message}
        </p>
      )}
      <button
        type='button'
        disabled={isSubmitting}
        className='mt-10 rounded-full border-2 border-black px-5 py-3 transition hover:bg-[#BFA53D] hover:text-white'
      >
        {isSubmitting ? 'Sending' : 'Send'}
      </button>
    </form>
  )
}

/* 'use client'


export const ContactForm = () => {
  return (
    <form
      className='flex w-full flex-col text-left'
    >
      <label htmlFor='senderName'>Name:</label>
      <input
        type='text'
        name='senderName'
        required
        maxLength={20}
        placeholder='Enter your name'
        className='mt-2 rounded-full border-2 border-black p-3'
      />
      <div className='h-5' />
      <label htmlFor='senderEmail'>Email:</label>
      <input
        type='email'
        name='senderEmail'
        required
        maxLength={100}
        placeholder='Enter your email'
        className='mt-2 rounded-full border-2 border-black p-3'
      />
      <div className='h-5' />
      <label htmlFor='message'>Message</label>
      <textarea
        name='message'
        required
        maxLength={500}
        rows={5}
        placeholder='Write your message'
        className='mt-2 rounded-3xl border-2 border-black p-3'
      />
      <button
        type='submit'
        className='mt-10 rounded-full border-2 border-black px-5 py-3 transition hover:bg-[#BFA53D] hover:text-white'
      >
        Send
      </button>
    </form>
  )
}
 */
