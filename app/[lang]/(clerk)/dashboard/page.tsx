import { UserButton, auth } from '@clerk/nextjs'

export default async function Dashboard() {
  const { userId } = auth()
  const adminId = process.env.NEXT_PRIVATE_ADMIN_KEY

  return (
    <div className='flex flex-col justify-center'>
      <h1>Dashboard</h1>
      <span>{userId}</span>
      <UserButton afterSignOutUrl='/en' />
    </div>
  )

  /* if (userId === adminId) {
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
        <h1>You are not authorized to view this page.</h1>
        <a href='/en'>Go back to home page</a>
      </div>
    )
  } */
}
