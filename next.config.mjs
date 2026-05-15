/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow loading the data-URL screenshots returned by /scan
  images: {
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
