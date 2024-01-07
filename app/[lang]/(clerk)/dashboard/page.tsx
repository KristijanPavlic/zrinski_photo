import {
  SignIn,
  SignInButton,
  SignOutButton,
  SignedOut,
  UserButton,
  auth,
  redirectToSignIn
} from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export default async function Dashboard() {
  const { userId } = auth()
  const adminId = process.env.NEXT_PRIVATE_ADMIN_KEY

  /* return (
    <div className='flex flex-col justify-center'>
      <h1>Dashboard</h1>
      <span>{userId}</span>
      <UserButton afterSignOutUrl='/en' />
    </div>
  ) */

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
      <div>
        <h1>You are not authorized to view this page!</h1>
        <SignOutButton>
          <button>Try Signing again!</button>
        </SignOutButton>
      </div>
    )
  }
}
