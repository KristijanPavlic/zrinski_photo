import cloudinary from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
})

export async function POST(req: NextRequest) {
  const { publicId } = await req.json()
  try {
    // Generate signature
    const timestamp = Math.round(new Date().getTime() / 1000)
    const signature = generateSignature(publicId, timestamp)

    cloudinary.v2.utils.api_sign_request(
      publicId,
      cloudinary.v2.config().api_secret!
    )
    // Delete image using signature
    const result = await cloudinary.v2.uploader.destroy(publicId, {
      invalidate: true
    })

    console.log('Cloudinary deletion result:', result)
    return new NextResponse('Image deleted successfully', { status: 200 })
  } catch (error: any) {
    return new NextResponse('Error deleting image:', { status: 500 })
  }
}

// Helper function to generate the signature
function generateSignature(publicId: string, timestamp: number) {
  const toSign = `public_id=${publicId}&timestamp=${timestamp}${process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET}`
  const sha1Hash = createHash('sha1')
  sha1Hash.update(toSign)
  return sha1Hash.digest('hex')
}
