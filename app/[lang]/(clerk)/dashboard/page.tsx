import { UserButton, auth, currentUser } from '@clerk/nextjs'

export default async function Dashboard() {
  const { userId } = auth()
  const adminId = process.env.NEXT_PRIVATE_ADMIN_KEY
  const antonijaId = process.env.NEXT_PRIVATE_ANTONIJA_KEY

  const user = await currentUser()

  if (userId === adminId || antonijaId) {
    return (
      <div className='container flex flex-col justify-center'>
        <h1 className='text-xl font-bold lg:text-3xl'>Dashboard</h1>
        <h2 className='mt-2 text-base lg:mt-5 lg:text-2xl'>
          Welcome, {user?.firstName}
        </h2>
        <div className='mt-5 lg:mt-10'>
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
