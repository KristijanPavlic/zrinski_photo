'use server'

import { v2 as cloudinary, ConfigOptions } from 'cloudinary'

const cloudinaryConfig: ConfigOptions = cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

export async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { imageUrl } = req.body

    try {
      // Cloudinary deletion
      const result = await cloudinary.uploader.destroy(imageUrl)

      res.status(200).json({ message: 'Image deleted successfully' })
    } catch (error) {
      console.error('Error deleting image:', error)
      res.status(500).json({ error: 'Error deleting image' })
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' })
  }
}
