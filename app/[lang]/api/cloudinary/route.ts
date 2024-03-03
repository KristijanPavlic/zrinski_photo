import cloudinary from 'cloudinary'

interface CloudinaryImage {
  public_id: string
  url: string
}

export async function GET(request: Request) {
  try {
    const response = await fetch(
      'https://res.cloudinary.com/dfwfplo4c/image/upload/v1709029000/next/mttklnqviknla83j8nto.jpg',
      {
        headers: {
          Authorization: `Basic ${btoa(`${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`)}`
        }
      }
    )

    const data = await response.json()

    return data.resources.map((resource: any) => ({
      public_id: resource.public_id,
      url: resource.secure_url // Or use resource.url if you don't need HTTPS
    }))
  } catch (error) {
    console.error('Error fetching Cloudinary images:', error)
    return [] // Or handle the error more gracefully
  }
}

/* const fetchCloudinaryImages = async (): Promise<CloudinaryImage[]> => {
  try {
    const response = await fetch(
      'https://res.cloudinary.com/dfwfplo4c/image/upload/v1709029000/next/mttklnqviknla83j8nto.jpg',
      {
        headers: {
          Authorization: `Basic ${btoa(`${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`)}`
        }
      }
    )

    const data = await response.json()

    return data.resources.map((resource: any) => ({
      public_id: resource.public_id,
      url: resource.secure_url // Or use resource.url if you don't need HTTPS
    }))
  } catch (error) {
    console.error('Error fetching Cloudinary images:', error)
    return [] // Or handle the error more gracefully
  }
} */

/* export default async function getImages() {
  const res = await fetch(
    'https://res.cloudinary.com/dfwfplo4c/image/upload/v1709029000/next/mttklnqviknla83j8nto.jpg'
  )

  if (!res.ok) {
    throw new Error('Failed to fetch images')
  }

  return res
}

export interface CloudinaryImage {
  public_id: string
  url: string
  // Add more properties as needed
}

// Configuration (Place this in a separate config or environment file)
const cloudinary = require('cloudinary')

cloudinary.v2.config({
  cloud_name: 'dfwfplo4c',
  api_key: '912381184135725',
  api_secret: 'OzacpYVgOdjZt-5zIdHmx5wNBMk',
  secure: true
})

export const fetchCloudinaryImages = async (): Promise<CloudinaryImage[]> => {
  try {
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dfwfplo4c/resources/image',
      {
        headers: {
          Authorization: `Basic ${btoa(`${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`)}`
        }
      }
    )

    const data = await response.json()

    return data.resources.map((resource: any) => ({
      public_id: resource.public_id,
      url: resource.secure_url // Or use resource.url if you don't need HTTPS
    }))
  } catch (error) {
    console.error('Error fetching Cloudinary images:', error)
    return [] // Or handle the error more gracefully
  }
}

export async function handler(req: any, res: any) {
  try {
    const images = await fetchCloudinaryImages()
    res.status(200).json(images)
  } catch (error) {
    console.error('Error fetching Cloudinary images:', error)
    res.status(500).json({ error: 'Failed to fetch images' })
  }
} */
