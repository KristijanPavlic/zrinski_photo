'use client'

import { useState, useEffect } from 'react'
import { CldImage } from 'next-cloudinary'

interface GalleryGridProps {
  button1: string
  button2: string
}

const GalleryGrid = () => {
  const [images, setImages] = useState([])

  const fetchImages = async () => {
    const response = await fetch(`/api/cloudinary?t=${Date.now()}`, {
      cache: 'no-cache'
    })

    if (response.ok) {
      const data = await response.json()

      setImages(data)
    } else {
      console.error('Error fetching images:', response.status)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  return (
    <>
      <div className='mt-5 grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:mt-10 xl:grid-cols-3'>
        {images?.map(image => (
          <div
            key={image}
            className='w-full transform overflow-hidden rounded-xl shadow-lg transition-transform duration-300 ease-in-out hover:scale-105'
          >
            <CldImage
              src={image}
              width={800}
              height={460}
              alt='gallery grid image'
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default GalleryGrid
