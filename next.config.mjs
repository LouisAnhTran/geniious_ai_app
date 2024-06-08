import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            port: '',
            hostname:
            "oaidalleapiprodscus.blob.core.windows.net"
    }]
    }
};

export default nextConfig;
