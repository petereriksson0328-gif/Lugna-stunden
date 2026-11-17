/* Lugna Stunden – service worker
   Gör att appen kan installeras och fungerar utan internet.
   Höj VERSION när du ändrar något, så hämtas nya filer. */
const VERSION = 'lugna-v9';

/* Den riktiga appen (…/Lugna-stunden/) och testversionen (…/Lugna-stunden/test/) ligger på samma domän.
   Varje version har därför en egen cache, märkt med sin adress, och rör aldrig den andras. */
const SCOPE = self.registration.scope;
const IS_TEST = /\/test\/$/.test(SCOPE);
const CACHE = VERSION + '@' + SCOPE;
const TEST_PATH = new URL('./test/', SCOPE).pathname;

const FILES = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys
        /* ta bort gamla versioner av den egna cachen (och gamla cachar utan adress, från före testmiljön) */
        .filter(k => k !== CACHE && (k.endsWith('@' + SCOPE) || (!IS_TEST && !k.includes('@'))))
        .map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Visa sparad version direkt, hämta en ny i bakgrunden till nästa gång */
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) return;
  /* Den riktiga appens service worker lägger sig inte i testversionen */
  if (!IS_TEST && new URL(e.request.url).pathname.startsWith(TEST_PATH)) return;
  e.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(e.request, { ignoreSearch: true }).then(cached => {
        const fresh = fetch(e.request).then(res => {
          if (res && res.ok) cache.put(e.request, res.clone());
          return res;
        }).catch(() => cached);
        return cached || fresh;
      })
    )
  );
});
