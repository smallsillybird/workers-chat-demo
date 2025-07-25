var cacheName = 'v14.2.2';
var cacheFiles = [
    '/',
    './index.html',
    './lib/css/gc.spread.sheets.excel2013white.14.2.2.css',
  './lib/css/gc.spread.sheets.designer.14.2.2.css',
  './custom.css',
    './lib/scripts/gc.spread.sheets.all.14.2.2.js',
    './lib/scripts/plugins/gc.spread.sheets.charts.14.2.2.js',
    './lib/scripts/plugins/gc.spread.sheets.shapes.14.2.2.js',
    './lib/scripts/plugins/gc.spread.sheets.print.14.2.2.js',
    './lib/scripts/plugins/gc.spread.sheets.barcode.14.2.2.js',
    './lib/scripts/plugins/gc.spread.sheets.pdf.14.2.2.js',
    './lib/scripts/plugins/gc.spread.pivot.pivottables.14.2.2.js',
    './lib/scripts/interop/gc.spread.excelio.14.2.2.js',
    './lib/scripts/resources/zh/gc.spread.sheets.resources.zh.14.2.2.js',
    './lib/scripts/gc.spread.sheets.designer.resource.cn.14.2.2.js',
    './lib/scripts/gc.spread.sheets.designer.all.14.2.2.js',
];
// 监听 install 事件，安装完成后，进行文件缓存
self.addEventListener('install', function (e) {
    console.log('Service Worker 状态： install');
    var cacheOpenPromise = caches.open(cacheName).then(function (cache) {
  // 把要缓存的 cacheFiles 列表传入
  return cache.addAll(cacheFiles);
    });
    e.waitUntil(cacheOpenPromise);
});
// 监听 fetch 事件，安装完成后，进行文件缓存
self.addEventListener('fetch', function (e) {
    console.log('Service Worker 状态： fetch');
    var cacheMatchPromise = caches.match(e.request).then(function (cache) {
      // 如果有cache则直接返回，否则通过fetch请求
      return cache || fetch(e.request);
  }).catch(function (err) {
      console.log(err);
      return fetch(e.request);
  })
    e.respondWith(cacheMatchPromise);
});
// 监听 activate 事件，清除缓存
self.addEventListener('activate', function (e) {
    console.log('Service Worker 状态： activate');
    var cachePromise = caches.keys().then(function (keys) {
  return Promise.all(keys.map(function (key) {
      if (key !== cacheName) {
          return caches.delete(key);
      }
  }));
    })
    e.waitUntil(cachePromise);
    return self.clients.claim();
});
