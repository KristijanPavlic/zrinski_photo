'use client'

import { useState, useEffect } from 'react'
import { CldImage } from 'next-cloudinary'

interface GalleryGridProps {
  button1: string
  button2: string
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ button1, button2 }) => {
  const [images, setImages] = useState([])

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch('../api/cloudinary')
      if (response.ok) {
        const data = await response.json()
        setImages(data)
      } else {
        console.error('Error fetching images:', response.status)
      }
    }

    fetchImages()
  }, [])

  /* const totalImages = images.length */

  return (
    <>
      <div className='mt-5 grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:mt-10 xl:grid-cols-3'>
        {images.map(image => (
          <div
            key={image}
            className='w-full transform overflow-hidden rounded-xl shadow-lg transition-transform duration-300 ease-in-out hover:scale-105'
          >
            <CldImage
              src={image}
              width={500}
              height={300}
              alt='gallery grid image'
            />
          </div>
        ))}
      </div>
      {/* <div>
        {totalImages > 6 ? (
          ''
        ) : (
          <h3 className='m-auto mt-6 w-fit cursor-pointer text-center transition hover:text-[#BFA53D]'>
            {button1}
          </h3>
        )}
      </div> */}
    </>
  )
}

export default GalleryGrid
