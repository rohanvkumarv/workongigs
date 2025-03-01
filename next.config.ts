// // // import type { NextConfig } from "next";

// // // const nextConfig: NextConfig = {
// // //   /* config options here */
// // // };

// // // export default nextConfig;
// // import type { NextConfig } from "next";

// // const nextConfig: NextConfig = {
// //   /* config options here */
// //   typescript:{
// //     ignoreBuildErrors: true,
// //   },
// //   eslint:{
// //     ignoreDuringBuilds: true
// //   }
// // };

// // export default nextConfig;
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   eslint: {
//     ignoreDuringBuilds: true
//   },
//   images: {
//     domains: ['workongigs.s3.us-east-1.amazonaws.com','images.ctfassets.net'],
//   }
// };

// export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  }
};

export default nextConfig;