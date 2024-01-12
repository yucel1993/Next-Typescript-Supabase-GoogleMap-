const nextConfig = {
	images: {
		deviceSizes: [640, 768, 1080, 1200, 1920, 2048, 2560],
		formats: ['image/avif', 'image/webp'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'react.webworker.berlin',
			},
			{
				protocol: 'https',
				hostname: 'fakestoreapi.com', // Add the hostname here
			},
		],
	},
	// Other configurations...
};

module.exports = nextConfig;
