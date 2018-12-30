//file is used by webpack to generate a built sw in production

workbox.skipWaiting();
workbox.clientsClaim();

//register routes/filenames to a caching strategy
workbox.routing.registerRoute(
  new RegExp(/.*\.css/),
  workbox.strategies.staleWhileRevalidate()
)

//When workbox initializes
self.addEventListener('push', (event) => {
  const title = 'Get Started With Workbox';
  const options = {
    body: event.data.text()
  };
  event.waitUntil(self.registration.showNotification(title, options));
})

//add all pre-cache files here
workbox.precaching.precacheAndRoute([...self.__precacheManifest,'/','/index.html'])

//Begin Background sync stuff:

const bgSyncPlugin = new workbox.backgroundSync.Plugin('pwa-queue')

const networkWithBackgroundSync = new workbox.strategies.NetworkOnly({
  plugins: [bgSyncPlugin],
})

  //Failed HTTP requests that match a url pattern will be fetched later when sw is online
  workbox.routing.registerRoute(
  /\/api\/add/, //!REPLACE WITH ROUTE USED TO FETCH FROM NETWORK, MAY BE EXTERNAL URL
  networkWithBackgroundSync,
  'POST' //!INCLUDE COPY WITH GET IF NEEDED
)

//End background sync stuff