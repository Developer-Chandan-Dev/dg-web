import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    reactStrictMode: false, // disable for development only
    experimental: {
        serverActions: {
            bodySizeLimit: '20mb', // or '20mb' if needed
        },
    },
    images: {
        domains: ["urvriufuxyjetyvrfhhk.supabase.co"],
    },
};

export default nextConfig;
