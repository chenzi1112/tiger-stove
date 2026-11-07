// 晋阳考古・数字展厅 —— 离线/秒开缓存
// 模型与静态资源走 cache-first；页面走 network-first，保证发版后能拿到新 HTML。
const VERSION = 'v2';
const ASSETS = `jinyang-assets-${VERSION}`;
const PAGES = `jinyang-pages-${VERSION}`;
const PRECACHE = [
  './', './index.html', './tiger.html', './bird.html', './guardians.html',
  './assemble.html', './bird-game.html', './guardians-game.html',
  './welcome-art.webp', './qr-share.png'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(PAGES);
    await Promise.all(PRECACHE.map(url => cache.add(url).catch(() => {})));
    self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== ASSETS && k !== PAGES).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

// 构建产物带哈希，可永久缓存；模型与图片文件名固定，用 stale-while-revalidate，
// 这样换模型后下一次访问会自动更新，不会一直卡在旧版本。
const isImmutable = url => /\/assets\//.test(url.pathname);
const isMutableAsset = url =>
  /\/models\//.test(url.pathname) || /\.(webp|jpe?g|png|css|woff2?)$/.test(url.pathname);

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== location.origin) return;

  if (isImmutable(url)) return event.respondWith(cacheFirst(request));
  if (isMutableAsset(url)) return event.respondWith(staleWhileRevalidate(request));
  if (request.mode === 'navigate' || /\.html$/.test(url.pathname)) return event.respondWith(networkFirst(request));
});

async function cacheFirst(request) {
  const cache = await caches.open(ASSETS);
  const hit = await cache.match(request, { ignoreSearch: false });
  if (hit) return hit;
  const response = await fetch(request);
  if (response.ok && response.type === 'basic') cache.put(request, response.clone()).catch(() => {});
  return response;
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(ASSETS);
  const hit = await cache.match(request);
  const network = fetch(request)
    .then(response => {
      if (response.ok && response.type === 'basic') cache.put(request, response.clone()).catch(() => {});
      return response;
    })
    .catch(() => null);
  if (hit) return hit;
  const response = await network;
  if (response) return response;
  throw new Error('offline and not cached');
}

async function networkFirst(request) {
  const cache = await caches.open(PAGES);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone()).catch(() => {});
    return response;
  } catch (error) {
    const hit = await cache.match(request);
    if (hit) return hit;
    throw error;
  }
}
