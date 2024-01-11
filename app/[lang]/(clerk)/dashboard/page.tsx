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
      <div className='container flex flex-col justify-center'>
        <h1 className='text-xl font-bold lg:text-3xl'>Dashboard</h1>
        <div className='mt-5 lg:mt-10'>
          <span>{userId}</span>
          <UserButton afterSignOutUrl='/en' />
        </div>
      </div>
    )
  } else {
    return (
      <div className='container flex flex-col items-center justify-center gap-3'>
        <h1 className='text-[8rem] font-bold'>403</h1>
        <h2 className='text-3xl'>Forbidden</h2>
        <span className='text-center'>
          You do not have permission to access this page. Please sign in using a
          different account.
        </span>
        <UserButton afterSignOutUrl='/en/sign-in' />
      </div>
    )
  }
}
