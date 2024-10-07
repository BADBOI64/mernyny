/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      config.module.rules.push({
        test: /\.(mov|mp4)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/videos/[name][ext]'
        }
      });
  
      return config;
    },
  };
  
  export default nextConfig;