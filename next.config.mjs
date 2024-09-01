// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     // Since in development mode the useEffect() is firing twice and rednering the success and error message at the same time.
//     // In order to fix this, we need to set reactStrictMode to false. to run the useEffect() only once.
//     reactStrictMode: false,

//     // isang beses lang mag rrun
// };

// export default nextConfig;

import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
    dest: "public",
    cacheOnFrontendNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    swcMinify: true,
    disable: false,
    workboxOptions: {
        disableDevLogs: true,
    }
});

// Your Next config is automatically typed!
export default withPWA({
  // Your Next.js config
});
