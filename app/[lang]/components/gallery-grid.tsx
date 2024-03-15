'use client'

import { useState, useEffect } from 'react'
import { CldImage } from 'next-cloudinary'

interface GalleryGridProps {
  folderProp?: string
  userId?: string
}

interface ImageData {
  url: string
  folder?: string
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ folderProp, userId }) => {
  const [images, setImages] = useState<ImageData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const adminId = 'user_2aVHpMhPbS8ypB7UVseXUUrdy9A'
  const antonijaId = 'user_2azBZEZmJiHW4T4gu8q5sBRKT9O'

  const handleDeleteImage = (imageUrl: string) => {
    // 1. Remove from DOM (adjust selector as needed)
    const imageElement = document.querySelector(
      `img[src='${imageUrl}']`
    )?.parentElement
    imageElement?.remove()

    // 2. API call to delete from Cloudinary
    fetch('/api/delete-cloudinary-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl })
    })
      .then(response => {
        if (!response.ok) {
          console.error('Error deleting image:', response.status)
        }
      })
      .catch(error => {
        console.error('Error deleting image:', error)
      })
  }

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
            <div key={image.url} className='relative'>
              <CldImage
                src={image.url}
                width={800}
                height={309.71}
                alt='gallery grid image'
              />

              {(userId === adminId || userId === antonijaId) && (
                <div className='absolute inset-0 opacity-0 hover:flex hover:items-center hover:justify-center hover:bg-gray-900 hover:bg-opacity-50 hover:opacity-100'>
                  <button
                    className='rounded bg-amber-400 px-4 py-2 text-white transition-colors duration-200 hover:bg-amber-500'
                    onClick={() => handleDeleteImage(image.url)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default GalleryGrid
