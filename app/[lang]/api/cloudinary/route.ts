interface CloudinaryImageResource {
  public_id: string
  secure_url: string
}

const imageCache: string[] = []

export async function GET() {
  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME
    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    const authString = btoa(`${apiKey}:${apiSecret}`)
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image`

    if (imageCache.length === 0) {
      const response = await fetch(url, {
        headers: {
          Authorization: `Basic ${authString}`
        }
      })

      if (!response.ok) {
        throw new Error(`Error fetching images: ${response.status}`)
      }

      const data = await response.json()
      const imageUrls = data.resources.map(
        (resource: CloudinaryImageResource) => resource.secure_url
      )

      imageCache.push(...imageUrls)
    }

    return new Response(JSON.stringify(imageCache), { status: 200 })
  } catch (error: any) {
    console.error('Error fetching Cloudinary images:', error)
    return new Response('Error fetching images', { status: 500 })
  }
}
