//Files to cache

var cacheName = "RailWayTransport_v1.0";
var appShellFiles = [
    '/RailWayTransport/Assignment_4/',
    '/RailWayTransport/Assignment_4/images/',
    '/RailWayTransport/Assignment_4/images/bluetrain.jpg',
    '/RailWayTransport/Assignment_4/bulma.min.css',
    '/RailWayTransport/Assignment_4/index.html',
    '/RailWayTransport/Assignment_4/main.js',
    '/RailWayTransport/Assignment_4/icons/',
    '/RailWayTransport/Assignment_4/icons/mapPointer.jpg',
    '/RailWayTransport/Assignment_4/icons/trainIcon_1.png',
    '/RailWayTransport/Assignment_4/icons/trainIcon_2.png',
    '/RailWayTransport/Assignment_4/icons/trainIcon_3.png',
    '/RailWayTransport/Assignment_4/icons/trainIconRed.png'
];

//Installing Service Worker
self.addEventListener('install', function(e){
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache){
            console.log('[Service Worker] Caching all: app shell and content');
            return cache.addAll(contentToCache);
        })
    );
});

//Fetch content using Service worker
self.addEventListener('fetch', function(e){
    e.respondWith(
        caches.match(e.request).then(function(r){
            console.log('[Service Worker] Fetching resource: ' + e.request.url);
            return r || fetch(e.request).then(function(response){
                return caches.open(cacheName).then(function(cache){
                    console.log('[Service Worker] Caching new resource: ' + e.request.url);
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});