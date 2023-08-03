/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          port: '',
          pathname: '**',
        },
      ],  
        domains: ['15.206.88.50','https://res.cloudinary.com'],
      },
}

module.exports = nextConfig
