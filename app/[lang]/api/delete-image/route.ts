import { v2 as cloudinary } from 'cloudinary'
import { NextRequest } from 'next/server'

// Configure Cloudinary using your credentials
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

export async function DELETE(req: NextRequest) {
  console.log('Raw Request Body:', req.body)

  if (req.method !== 'DELETE') {
    return new Response('Method not allowed', { status: 500 })
  }

  const body = await req.json() // Parse the request body as JSON
  const { publicId } = body // Extract the publicId
  console.log('public id: ', publicId)

  try {
    // Delete from Cloudinary using the signature
    await cloudinary.uploader.destroy(publicId)

    // Set caching headers to prevent browser caching
    return new Response('Image deleted successfully', { status: 200 })
  } catch (error: any) {
    console.error('Error deleting image:', error)
    return new Response('Error deleting image:', { status: 500 })
  }
}
