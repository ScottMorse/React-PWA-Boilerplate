# Hey Ben and Travis

Here's just an overview of what's here:

## /devServer.js
`npm start` runs this script.  It's an Express server that won't be used in production.
It uses Webpack stuff to hot reload when we're working on the frontend.  If it gets a path it doesn't know, it's probably going to send it `index.html`.

## /index.html
Links up the manifest file for the PWA like normal and has the 'root' div for React.

## /webpack.config.js
Has loaders for file types.  This might be where you go if the frontend is failing to load an external file.

The `workboxPlugin` allows for us to use a Workbox-based service worker with Webpack. Workbox will make caching extremely easy. The plugin uses the `sw.js` file in the client folder to compile the service worker with the project correctly.

## /client/sw.js
This is the service worker.  For now, it pre-caches the bundle.js file built by Webpack and `index.html` at the service worker installation.

```javascript
workbox.precaching.precacheAndRoute([...self.__precacheManifest,'/','/index.html'])
```
We can add to the above code any files that may be needed for the "app shell," like images in the page layout and such.  These are basically files we deem as installation files for the PWA.

It has one example caching strategy written in it:
```javascript
workbox.routing.registerRoute(
  new RegExp(/.*\.css/),
  workbox.strategies.staleWhileRevalidate()
)
```
This means that any css file will be loaded from the cache first for the client, and will then check for an update from the network in the background, and update the cache silently if there is a change in the network file.

Other example Workbox strategies include `.cacheFirst()`, `.cacheOnly()`, `.networkFirst()`, `.networkOnly() `.

The last part of the service worker code is the background sync plugin which is supposed to store any failed HTTP requests that match a given url pattern, which it will complete later when the network comes back.  This will be perfect for the offline storage, but I'm not sure if this will automatically complete IndexedDB requests.  It may need more added to it to make sure the background sync is also syncing with IndexedDB.
