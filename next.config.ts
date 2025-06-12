import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		serverActions: {
			bodySizeLimit: "30mb", // Set desired value here
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
				port: "",
			},
		],
	},
	async headers() {
		return [
			{
				source: '/api/views/daily',
				headers: [
					{
						key: 'Access-Control-Allow-Origin',
						value: '*',
					},
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET,DELETE,PATCH,POST,PUT,OPTIONS',
					},
				],
			},
		]
	},
};

export default nextConfig;
