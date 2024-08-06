/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "admin.teranga-resto-galerie.fr",
          pathname: "/**",
        },
        {
          protocol: "http",
          hostname: "vps.latelier22.fr",
          pathname: "/**",
        },
        {
          protocol: "http",
          hostname: "placehold.co",
          pathname: "/**",
        },
       
      ],
    },
  };
  
  module.exports = nextConfig;