/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
const nextConfig = {
    images: {
        domains: ["www.suborno.dev", "api.dicebear.com", "via.placeholder.com", "images.remotePatterns", "ibb.co"]
    }
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
