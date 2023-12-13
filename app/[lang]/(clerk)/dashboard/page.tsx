import { UserButton, SignedIn } from '@clerk/nextjs'

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <UserButton afterSignOutUrl='/' />
    </div>
  )
}

export default Dashboard
