import { SignIn, UserButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1>Admin Login</h1>
      <a href='/admin/dashboard'>Go to admin dashboard</a>
      <div>
        ovdje ide sign in
        <SignIn />
      </div>
    </main>
  )
}
