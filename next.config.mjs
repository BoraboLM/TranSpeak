/** @type {import('next').NextConfig} */
const nextConfig = {
    // Since in development mode the useEffect() is firing twice and rednering the success and error message at the same time.
    // In order to fix this, we need to set reactStrictMode to false. to run the useEffect() only once.
    reactStrictMode: false,

    // isang beses lang mag rrun
};

export default nextConfig;
