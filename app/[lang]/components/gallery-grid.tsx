'use client'

import { useState, useEffect } from 'react'
import { CldImage } from 'next-cloudinary'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'

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
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null)

  const { user } = useUser()

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

  const filteredImages = images.filter(image => image.folder === folderProp)

  const deleteImage = async (url: string) => {
    try {
      const publicId = url.split('/')[8].split('.')[0]
      const folder = folderProp

      const response = await fetch(`/api/delete-image`, {
        method: 'POST',
        cache: 'reload',
        body: JSON.stringify({ publicId, folder })
      })

      if (response.ok) {
        setImages(images.filter(image => image.url !== url))
      } else {
        console.error('Error deleting image:', response.status)
      }
    } catch (error) {
      console.error('Error deleting image:', error)
    }
  }

  return (
    <div className='mt-5 grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:mt-10 xl:grid-cols-3'>
      {isLoading ? (
        <div className='col-span-full flex h-64 items-center justify-center '>
          <div className='h-16 w-16 animate-spin rounded-full border-4 border-[#BFA53D] border-t-transparent'></div>
        </div>
      ) : filteredImages.length > 0 ? (
        filteredImages.map(image => (
          <div
            key={image.url}
            className='h-fit w-full transform overflow-hidden rounded-xl shadow-lg transition-transform duration-300 ease-in-out hover:scale-105'
          >
            <div key={image.url} className='relative'>
              <CldImage
                src={image.url}
                width={600}
                height={400}
                alt='There is a problem with loading this image'
                className='hover:cursor-pointer'
                onClick={() => setFullscreenImage(image.url)}
              />
              {(user?.id === process.env.NEXT_PUBLIC_ADMIN_KEY ||
                user?.id === process.env.NEXT_PUBLIC_ANTONIJA_KEY) && (
                <div
                  className='absolute left-0 top-0 flex h-full w-full items-center 
                  justify-center bg-black/50 opacity-0 transition-opacity 
                  duration-300 ease-in-out hover:opacity-100'
                >
                  <button
                    onClick={() => deleteImage(image.url)}
                    className='rounded bg-red-500 px-4 py-2 text-white'
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className='col-span-full flex h-64 items-center justify-center'>
          <p>No images found in this folder.</p>
        </div>
      )}

      {fullscreenImage && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 transition-all duration-300'
          onClick={() => setFullscreenImage(null)}
        >
          <div className='relative' onClick={e => e.stopPropagation()}>
            <Image
              src={fullscreenImage}
              width={1000}
              height={700}
              alt='Fullscreen Image'
              className='max-h-screen max-w-full'
            />
            <button
              onClick={() => setFullscreenImage(null)}
              className='absolute right-2 top-2 rounded bg-red-500 px-4 py-2 text-white'
            >
              &#10005;
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default GalleryGrid
