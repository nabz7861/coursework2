self.importScripts('data/courses.js');

// Files to cache
var cacheName = 'firstcatch';
var appShellFiles = [
  '/coursework2/',
  '/coursework2/index.html',
  '/coursework2/app.js',
  '/coursework2/style.css',
  '/coursework2/fonts/graduate.eot',
  '/coursework2/fonts/graduate.ttf',
  '/coursework2/fonts/graduate.woff',
  '/coursework2/favicon.ico',
  '/coursework2/images/icon.png',
  '/coursework2/images/bg.png',
  '/coursework2/otherfavicons/icon-32.png',
  '/coursework2/otherfavicons/icon-64.png',
  '/coursework2/otherfavicons/icon-96.png',
  '/coursework2/otherfavicons/icon-128.png',
  '/coursework2/otherfavicons/icon-168.png',
  '/coursework2/otherfavicons/icon-192.png',
  '/coursework2/otherfavicons/icon-256.png',
  '/coursework2/otherfavicons/icon-512.png'
    

    
    
    
    
    
    
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
