'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'

interface ContactFormProps {
  name: string
  nameInput: string
  email: string
  emailInput: string
  message: string
  messageInput: string
  button1: string
  button2: string
  success: string
  failed: string
}

const ContactForm: React.FC<ContactFormProps> = ({
  name,
  nameInput,
  email,
  emailInput,
  message,
  messageInput,
  button1,
  button2,
  success,
  failed
}) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const sendEmail = async (e: any) => {
    e.preventDefault()
    setIsSubmitting(true)

    const response = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (response.status === 200) {
      setIsSubmitting(false)
      toast.success(success)
      clearInputFields()
      setData({
        name: '',
        email: '',
        message: ''
      })
    }

    if (response.status !== 200) {
      setIsSubmitting(false)
      toast.error(failed)
    }
  }

  const clearInputFields = (): void => {
    // Clear the name, email, and message fields
    const nameInput = document.getElementById('name') as HTMLInputElement
    const emailInput = document.getElementById('email') as HTMLInputElement
    const messageInput = document.getElementById(
      'message'
    ) as HTMLTextAreaElement

    nameInput.value = ''
    emailInput.value = ''
    messageInput.value = ''
  }

  return (
    <form className='flex w-full flex-col text-left' onSubmit={sendEmail}>
      <label htmlFor='name'>{name}</label>
      <input
        type='text'
        name='name'
        id='name'
        required
        maxLength={100}
        placeholder={nameInput}
        onChange={e => setData({ ...data, name: e.target.value })}
        className='mt-2 rounded-full border-2 border-gray-500  p-3 focus:border-black'
      />
      <div className='h-5' />
      <label htmlFor='email'>{email}</label>
      <input
        type='email'
        name='email'
        id='email'
        required
        maxLength={100}
        placeholder={emailInput}
        onChange={e => setData({ ...data, email: e.target.value })}
        className='mt-2 rounded-full border-2 border-gray-500  p-3 focus:border-black'
      />
      <div className='h-5' />
      <label htmlFor='message'>{message}</label>
      <textarea
        name='message'
        id='message'
        required
        maxLength={500}
        rows={5}
        placeholder={messageInput}
        onChange={e => setData({ ...data, message: e.target.value })}
        className='mt-2 rounded-3xl border-2 border-gray-500 p-3 focus:border-black'
      />
      <button
        type='submit'
        disabled={isSubmitting}
        className='mt-10 rounded-full border-2 border-gray-500 px-5 py-3 transition hover:border-black hover:bg-[#BFA53D] hover:text-white'
      >
        {isSubmitting ? button2 : button1}
      </button>
    </form>
  )
}

export default ContactForm
