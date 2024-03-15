import { v2 as cloudinary, ConfigOptions } from 'cloudinary'

const cloudinaryConfig: ConfigOptions = cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

export default async function handler(req: any, res: any) {
  const { publicId } = req.body

  try {
    const timestamp = Math.round(new Date().getTime() / 1000) // Example timestamp
    const signature = cloudinary.utils.api_sign_request(
      { public_id: publicId, timestamp },
      cloudinaryConfig.api_secret!
    )

    res.status(200).json({ signature, timestamp })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error generating signature' })
  }
}
