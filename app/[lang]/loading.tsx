import Image from 'next/image'
import ZrinskiLogo from '../../public/zrinski.svg'

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className='absolute z-[999] flex h-[100svh] w-full justify-center bg-white'>
      <Image src={ZrinskiLogo} alt='Zrinski Logo' />
    </div>
  )
}
