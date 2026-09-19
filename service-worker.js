const CACHE_NAME = "moau-study-hub-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./materials.html",
    "./flashcards.html",
    "./phy102.html",
    "./quiz-index.html",
    "./quiz.html",
    "./about.html",
    "./privacy.html",
    "./contact.html",
    "./manifest.json"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
    );

    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(names =>
            Promise.all(
                names
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            )
        )
    );

    self.clients.claim();
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                return cachedResponse || fetch(event.request);
            })
    );
});
