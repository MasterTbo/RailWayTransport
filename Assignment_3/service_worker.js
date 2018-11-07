//Files to cache

var cacheName = "RailWayTransport_v1.0";
var appShellFiles = [
    '/RailWayTransport/Assignment_3/',
    '/RailWayTransport/Assignment_3/images/',
    '/RailWayTransport/Assignment_3/images/bluetrain.jpg',
    '/RailWayTransport/Assignment_3/bulma.min.css',
    '/RailWayTransport/Assignment_3/index.html',
    '/RailWayTransport/Assignment_3/main.js'
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