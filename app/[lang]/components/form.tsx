'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'

const ContactForm = () => {
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
      toast.success(`Hey ${data.name}, your message was sent successfully`)
      clearInputFields()
      setData({
        name: '',
        email: '',
        message: ''
      })
    }

    if (response.status !== 200) {
      setIsSubmitting(false)
      toast.error(
        'We are sorry, but there seems to be problems with sending your message. Please try again.'
      )
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
      <label htmlFor='name'>Name:</label>
      <input
        type='text'
        name='name'
        id='name'
        required
        maxLength={100}
        placeholder='Enter your name'
        onChange={e => setData({ ...data, name: e.target.value })}
        className='mt-2 rounded-full border-2 border-gray-500  p-3 focus:border-black'
      />
      <div className='h-5' />
      <label htmlFor='email'>Email:</label>
      <input
        type='email'
        name='email'
        id='email'
        required
        maxLength={100}
        placeholder='Enter your email'
        onChange={e => setData({ ...data, email: e.target.value })}
        className='mt-2 rounded-full border-2 border-gray-500  p-3 focus:border-black'
      />
      <div className='h-5' />
      <label htmlFor='message'>Message</label>
      <textarea
        name='message'
        id='message'
        required
        maxLength={500}
        rows={5}
        placeholder='Write your message'
        onChange={e => setData({ ...data, message: e.target.value })}
        className='mt-2 rounded-3xl border-2 border-gray-500 p-3 focus:border-black'
      />
      <button
        type='submit'
        disabled={isSubmitting}
        className='mt-10 rounded-full border-2 border-gray-500 px-5 py-3 transition hover:border-black hover:bg-[#BFA53D] hover:text-white'
      >
        {isSubmitting ? 'Sending' : 'Send'}
      </button>
    </form>
  )
}

export default ContactForm
