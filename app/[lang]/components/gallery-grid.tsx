'use client'

import { useState } from 'react'
import Image from 'next/image'
import cover from '@/public/gallery_cover.jpg'

import { CldImage } from 'next-cloudinary'

interface GalleryGridProps {
  button1: string
  button2: string
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ button1, button2 }) => {
  const totalImages = 12
  const imagesToShowInitially = 6

  const [visibleImages, setVisibleImages] = useState(imagesToShowInitially)
  const [showMore, setShowMore] = useState(true)

  const toggleImages = () => {
    if (showMore) {
      setVisibleImages(totalImages)
    } else {
      setVisibleImages(imagesToShowInitially)
    }
    setShowMore(!showMore)
  }

  const imageIndices = Array.from(
    { length: visibleImages },
    (_, index) => index
  )

  return (
    <>
      <div className='mt-5 grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:mt-10 xl:grid-cols-3'>
        {imageIndices.map(el => (
          <div
            className='w-full transform overflow-hidden rounded-xl shadow-lg transition-transform duration-300 ease-in-out hover:scale-105'
            key={el}
          >
            <CldImage
              src='https://res.cloudinary.com/dfwfplo4c/image/upload/v1706222043/next/onhuxzogeua1rfkqoepu.png'
              alt='image'
              width='1000'
              height='700'
              sizes='100%'
              className='rounded-[10px] bg-cover'
            />

            {/* <Image
              src={cover}
              alt='Gallery cover'
              className='rounded-[10px] bg-cover'
            /> */}
          </div>
        ))}
      </div>
      {totalImages > imagesToShowInitially && (
        <h3
          className='m-auto mt-6 w-fit cursor-pointer text-center transition hover:text-[#BFA53D]'
          onClick={toggleImages}
        >
          {showMore ? button1 : button2}
        </h3>
      )}
    </>
  )
}

export default GalleryGrid
