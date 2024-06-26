import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    const data = await resend.emails.send({
      from: 'Zrinski Photography <onboarding@resend.dev>',
      to: ['az.photography.hr@gmail.com'],
      subject: 'New form submission',
      text: `You have a new message from: \n Name: ${name} \n Email: ${email} \n Message: ${message}`
    })

    return NextResponse.json(data)
  } catch (error: any) {
    return new Response('Error with sending an email', { status: 500 })
  }
}
