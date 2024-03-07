/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    images: {
        remotePatterns: [
            // images.cloudinary.com and res.cloudinary.com:
            { protocol: 'https', hostname: '**.cloudinary.com' },

            // Specific Cloudinary API endpoint:
            { protocol: 'https', hostname: 'api.cloudinary.com', pathname: '/v1_1/dfwfplo4c/resources/image/**' }
        ],
    },
}