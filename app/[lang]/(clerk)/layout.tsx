import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zrinski Photography Dashbaord',
  description: 'Zrinski Photography Dashbaord',
  authors: { name: 'Kristijan Pavlic Tumpa' },
  icons: [
    {
      url: './icon.svg',
      href: './icon.svg'
    }
  ]
}

const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-full items-center justify-center py-10 lg:py-32'>
      {children}
    </div>
  )
}

export default ClerkLayout
