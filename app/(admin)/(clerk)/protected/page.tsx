'use client'

import { UserButton } from '@clerk/nextjs'

const Admin = () => {
  return (
    <>
      <h1>Protected</h1>
      <UserButton afterSignOutUrl='/' />
    </>
  )
}

export default Admin
