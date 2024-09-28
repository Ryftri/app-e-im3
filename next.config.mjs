/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const nextConfig = {};

const withPWA = withPWAInit({
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  dest: "public",
  workboxOptions: {
      disableDevLogs: true
  },
});

export default withPWA(nextConfig);
