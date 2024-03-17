'use client'

import { useState } from 'react'

import Image from 'next/image'
import portrait from '@/public/portrait.jpg'

export default function AboutImageLoading() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className='relative max-w-fit'>
      {isLoading && (
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
          <div className='h-16 w-16 animate-spin rounded-full border-4 border-[#BFA53D] border-t-transparent'></div>
        </div>
      )}
      <Image
        className='w-full rounded-xl shadow-lg sm:w-auto'
        src={portrait}
        alt='Zrinski Photography Portrait'
        width={238}
        height={356}
        onLoad={() => setIsLoading(false)}
      />
      <h3 className='absolute bottom-0 w-full rounded-b-xl bg-black pb-1 pl-4 pt-1 text-white'>
        Antonija Zrinski
      </h3>
    </div>
  )
}
