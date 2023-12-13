import { ClerkProvider } from '@clerk/nextjs'

const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <div className='flex h-full items-center justify-center py-10 lg:py-32'>
        {children}
      </div>
    </ClerkProvider>
  )
}

export default ClerkLayout
