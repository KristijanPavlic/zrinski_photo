'use client'

import { useState, useEffect } from 'react'
import { CldImage } from 'next-cloudinary'

interface GalleryGridProps {
  folderProp?: string
}

interface ImageData {
  url: string
  folder?: string
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ folderProp }) => {
  const [images, setImages] = useState<ImageData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchImages = async () => {
    const response = await fetch(`/api/cloudinary?t=${Date.now()}`, {
      cache: 'reload'
    })
    setIsLoading(true)

    if (response.ok) {
      const data = await response.json()
      setImages(data)
      setIsLoading(false)
    } else {
      console.error('Error fetching images:', response.status)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  // Filter for matching images
  const filteredImages = images.filter(image => image.folder === folderProp)

  return (
    <div className='mt-5 grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:mt-10 xl:grid-cols-3'>
      {isLoading ? (
        <div className='col-span-full flex h-64 items-center justify-center '>
          <div className='h-16 w-16 animate-spin rounded-full border-4 border-[#BFA53D] border-t-transparent'></div>
        </div>
      ) : (
        filteredImages?.map(image => (
          <div
            key={image.url}
            className='w-full transform overflow-hidden rounded-xl shadow-lg transition-transform duration-300 ease-in-out hover:scale-105'
          >
            <CldImage
              src={image.url}
              width={800}
              height={309.71}
              alt='gallery grid image'
            />
          </div>
        ))
      )}
    </div>
  )
}

export default GalleryGrid
