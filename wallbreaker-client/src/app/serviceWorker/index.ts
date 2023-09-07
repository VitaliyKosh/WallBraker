import { clientsClaim } from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching'
// import { API_URL } from 'shared/lib/http'
// import { CacheableResponsePlugin } from 'workbox-cacheable-response'
// import { ExpirationPlugin } from 'workbox-expiration/ExpirationPlugin'
// import { registerRoute } from 'workbox-routing'
// import { StaleWhileRevalidate } from 'workbox-strategies'

clientsClaim()

self.skipWaiting()

precacheAndRoute(self.__WB_MANIFEST)

// registerRoute(
//     ({ url }) => url.origin === new URL(API_URL).origin,
//     new StaleWhileRevalidate({
//         cacheName: 'weeks',
//         plugins: [
//             new CacheableResponsePlugin({
//                 statuses: [0, 200]
//             })
//             // new ExpirationPlugin({
//             //     maxEntries: 1
//             // })
//         ]
//     })
// )

self.addEventListener('push', (event: any) => {
    const data = event.data.text()
    console.log(data)
    
//     const options = {
//         body: data.content,
//         icon: '/icons/apple-touch-icon_120.png',
//         badge: '/icons/apple-touch-icon_120.png',
//         data: {
//             url: data.openUrl
//         }
//     }
//     event.waitUntil(
//         self.registration.showNotification(data.title, options)
//     )
})
