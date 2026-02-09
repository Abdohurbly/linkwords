// ============================================
// LinkWords - Service Worker
// Offline-first caching strategy
// ============================================

const CACHE_NAME = "linkwords-v3";
const ASSETS = [
    "/",
    "/index.html",
    "/style.css",
    "/game.js",
    "/puzzles.js",
    "/sfx.js",
    "/icon.svg",
    "/manifest.json"
];

// Install: pre-cache all game assets
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
            )
        )
    );
    self.clients.claim();
});

// Fetch: cache-first, fallback to network
self.addEventListener("fetch", (event) => {
    // Skip non-GET and cross-origin requests
    if (event.request.method !== "GET") return;
    if (!event.request.url.startsWith(self.location.origin)) return;

    event.respondWith(
        caches.match(event.request).then((cached) => {
            if (cached) return cached;
            return fetch(event.request).then((response) => {
                // Cache successful responses
                if (response.ok) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
                }
                return response;
            });
        }).catch(() => {
            // Offline fallback
            if (event.request.destination === "document") {
                return caches.match("/index.html");
            }
        })
    );
});
