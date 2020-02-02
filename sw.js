self.importScripts('data/courses.js');

// Files to cache
var cacheName = 'firstcatch';
var appShellFiles = [
  '/example/',
  '/example/index.html',
  '/example/app.js',
  '/example/style.css',
  '/example/fonts/graduate.eot',
  '/example/fonts/graduate.ttf',
  '/example/fonts/graduate.woff',
  '/example/favicon.ico',
  '/example/images/icon.png',
  '/example/images/bg.png',
  '/example/otherfavicons/icon-32.png',
  '/example/otherfavicons/icon-64.png',
  '/example/otherfavicons/icon-96.png',
  '/example/otherfavicons/icon-128.png',
  '/example/otherfavicons/icon-168.png',
  '/example/otherfavicons/icon-192.png',
  '/example/otherfavicons/icon-256.png',
  '/example/otherfavicons/icon-512.png'
    

    
    
    
    
    
    
];
var coursesImages = [];
for(var i=0; i<courses.length; i++) {
  coursesImages.push('data/img/'+courses[i].slug+'.jpg');
}
var contentToCache = appShellFiles.concat(coursesImages);

// Installing Service Worker
self.addEventListener('install', function(e) {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(contentToCache);
    })
  );
});

// Fetching content using Service Worker
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then(function(response) {
        return caches.open(cacheName).then(function(cache) {
          console.log('[Service Worker] Caching new resource: ' + e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});
