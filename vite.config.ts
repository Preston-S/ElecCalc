import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		sveltekit(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.ico', 'icons/*'],
			manifest: {
				name: 'Electrical Calculator',
				short_name: 'ElecCalc',
				description: 'Fast electrical estimating on mobile',
				theme_color: '#101010',
				background_color: '#101010',
				display: 'standalone',
				scope: '/ElecCalc/',
				start_url: '/ElecCalc/',
				icons: [
					{ src: '/icons/192.png', sizes: '192x192', type: 'image/png' },
					{ src: '/icons/512.png', sizes: '512x512', type: 'image/png' }
				]
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
				sourcemap: true,
				runtimeCaching: [
					{
						urlPattern: ({ request }) => request.mode === 'navigate',
						handler: 'NetworkFirst',
						options: {
							cacheName: 'pages-cache',
							plugins: []
						}
					},
					{
						urlPattern: ({ url }) => url.origin === self.location.origin && (url.pathname.endsWith('.js') || url.pathname.endsWith('.css')),
						handler: 'CacheFirst',
						options: {
							cacheName: 'assets-cache',
							plugins: []
						}
					}
				]
			}
		})
	],
	preview: {
		https: true,
		host: true // Exposes on the network
	}
});
