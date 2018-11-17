//Files to cache

var cacheName = "RailWayTransport_v1.0";
var appShellFiles = [
    '/RailWayTransport/Assignment_5/',
    '/RailWayTransport/Assignment_5/images/',
    '/RailWayTransport/Assignment_5/images/bluetrain.jpg',
    '/RailWayTransport/Assignment_5/bulma.min.css',
    '/RailWayTransport/Assignment_5/index.html',
    '/RailWayTransport/Assignment_5/register.html',
    '/RailWayTransport/Assignment_5/searchTrain.html',
    '/RailWayTransport/Assignment_5/main.js',
    '/RailWayTransport/Assignment_5/map.js',
    '/RailWayTransport/Assignment_5/script.js',
    '/RailWayTransport/Assignment_5/scriptRegister.js',
    '/RailWayTransport/Assignment_5/icons/',
    '/RailWayTransport/Assignment_5/icons/mapPointer.jpg',
    '/RailWayTransport/Assignment_5/icons/trainIcon_1.png',
    '/RailWayTransport/Assignment_5/icons/trainIcon_2.png',
    '/RailWayTransport/Assignment_5/icons/trainIcon_3.png',
    '/RailWayTransport/Assignment_5/icons/trainIconRed.png'
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