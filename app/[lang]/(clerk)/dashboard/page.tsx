import { UserButton, auth, redirectToSignIn } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export default async function Dashboard() {
  const { userId } = auth()
  const adminId = process.env.NEXT_PRIVATE_ADMIN_KEY

  const redirect = () => {
    NextResponse.redirect('/en/sign-in')
  }

  if (userId === adminId) {
    return (
      <div className='flex flex-col justify-center'>
        <h1>Dashboard</h1>
        <span>{userId}</span>
        <UserButton afterSignOutUrl='/en' />
      </div>
    )
  } else {
    return (
      <div className='flex flex-col justify-center'>
        <h1>Access Denied</h1>
        <p>
          You do not have permission to access this page. Please sign in as an
          admin.
        </p>
        <UserButton afterSignOutUrl='/en/sign-in' />
      </div>
    )
  }
}
