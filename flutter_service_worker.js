'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "eb93b034ecb18e216e0860ecee21323c",
"version.json": "93f36c3751ee3f609beda61cb5641710",
"index.html": "68b011a7a8049af1eb28288257758066",
"/": "68b011a7a8049af1eb28288257758066",
"main.dart.js": "56a74096689936498f773d88a74f877c",
"flutter.js": "383e55f7f3cce5be08fcf1f3881f585c",
"favicon.png": "157175372dd9dcc44824b644655bd2f0",
"icons/Icon-192.png": "1bd0ce31675970f986ad8aa89e378044",
"icons/Icon-maskable-192.png": "1bd0ce31675970f986ad8aa89e378044",
"icons/Icon-maskable-512.png": "ecc4d1da83970d6825e12ed1edeafc34",
"icons/Icon-512.png": "ecc4d1da83970d6825e12ed1edeafc34",
"manifest.json": "2fd0fa2a4814f9f7e5a543d3e5618a77",
"assets/AssetManifest.json": "f39d611d73f407183b74fe4fc29a18ce",
"assets/NOTICES": "168881cfea4f3a7f04f74d876f767fa8",
"assets/FontManifest.json": "b2add5a52ce54ebf2098754fc3b63df1",
"assets/AssetManifest.bin.json": "49fc6ca561e74a8a2483016c914069fd",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "18dfcdb007ec44366a812def22f592b6",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "c8a0f83230018b917261620d7fc18b44",
"assets/fonts/MaterialIcons-Regular.otf": "716192218169c755a5c4c29608b20abf",
"assets/assets/preview.png": "4e9eafc823969ea4a217172baef5aab9",
"assets/assets/me/happy_me.png": "c270bd145ec23be3ac86373e31ef7cef",
"assets/assets/me/call_me.png": "bc8e4d8139c91da6e9bd08c2311eb7ad",
"assets/assets/me/hi_me.png": "68814348f16c90150d3db290153ad8c0",
"assets/assets/me/thumb_me.png": "ecaba7c56495e78c379b4f0486067dbe",
"assets/assets/icons/github-mark.svg": "8dcc6b5262f3b6138b1566b357ba89a9",
"assets/assets/fonts/Chakra_Petch/ChakraPetch-BoldItalic.ttf": "79e23734147404f65b4d6e544c5c7a06",
"assets/assets/fonts/Chakra_Petch/ChakraPetch-Regular.ttf": "12c7b5f81aa7ab4781673a2a4cf69b5c",
"assets/assets/fonts/Chakra_Petch/ChakraPetch-SemiBoldItalic.ttf": "6b3f7f26bfd04ffa5d4c22a7d3ad8e14",
"assets/assets/fonts/Chakra_Petch/ChakraPetch-Bold.ttf": "905455c99ecaff560f87ca42f904c0a8",
"assets/assets/fonts/Chakra_Petch/ChakraPetch-Italic.ttf": "a822a551828b4787a05c6487b7bc782c",
"assets/assets/fonts/Chakra_Petch/ChakraPetch-MediumItalic.ttf": "d679092f2e53af6283cf086943c72621",
"assets/assets/fonts/Chakra_Petch/ChakraPetch-Light.ttf": "3f9c4b4859854edd76044d5fd59f1cd8",
"assets/assets/fonts/Chakra_Petch/ChakraPetch-SemiBold.ttf": "2c5f0890be62b29479ab1453e038fbbf",
"assets/assets/fonts/Chakra_Petch/OFL.txt": "afbb1d0b67afcd502a771b0f5ad94128",
"assets/assets/fonts/Chakra_Petch/ChakraPetch-Medium.ttf": "4780773bba5e260130580694d237c910",
"assets/assets/fonts/Chakra_Petch/ChakraPetch-LightItalic.ttf": "6c820b8f98fea627fbeeeb954b481b40",
"assets/assets/projects_banner/default_github.webp": "01d3bbfdceaa2878e9b65bf566957012",
"assets/assets/projects_banner/assets_generator_banner.png": "385abbdee38bb86f6d0bd96bba65cd3f",
"assets/assets/projects_banner/system_status.png": "2263069ca163b1970eeb90f951f4a79f",
"canvaskit/skwasm.js": "5d4f9263ec93efeb022bb14a3881d240",
"canvaskit/skwasm.js.symbols": "c3c05bd50bdf59da8626bbe446ce65a3",
"canvaskit/canvaskit.js.symbols": "74a84c23f5ada42fe063514c587968c6",
"canvaskit/skwasm.wasm": "4051bfc27ba29bf420d17aa0c3a98bce",
"canvaskit/chromium/canvaskit.js.symbols": "ee7e331f7f5bbf5ec937737542112372",
"canvaskit/chromium/canvaskit.js": "901bb9e28fac643b7da75ecfd3339f3f",
"canvaskit/chromium/canvaskit.wasm": "399e2344480862e2dfa26f12fa5891d7",
"canvaskit/canvaskit.js": "738255d00768497e86aa4ca510cce1e1",
"canvaskit/canvaskit.wasm": "9251bb81ae8464c4df3b072f84aa969b",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
