const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-full items-center justify-center py-10 lg:py-32'>
      {children}
    </div>
  )
}

export default ClerkLayout
