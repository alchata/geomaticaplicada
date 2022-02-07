//asignar nombre y direccion de la cache
const CACHE_NAME = 'V1_cache_geomaticaplicada_pwa';

//ficheros a cachear en la aplicacion
var urlsToCache = [
    './',
    './css/styles.css',
    './img/favicon.png',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/facebook.png',
    './img/instagram.png',
    './img/whataspp.png',
    './img/favicon-1024.png',
    './img/favicon-512.png',
    './img/favicon-384.png',
    './img/favicon-256.png',
    './img/favicon-192.png',
    './img/favicon-128.png',
    './img/favicon-96.png',
    './img/favicon-64.png',
    './img/favicon-32.png',
    './img/favicon-16.png',
];


// evento intall
//instalacion del service workwer y guardar en cache los recursos estaticos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(() => {
                        self.skipWaiting();
                    });
            })
            .catch(err => console.log('No se ha registrado el cache', err))
    );
});
//evento activate
// que la app fucnione sin conexion
self.addEventListener('acivate', e => {
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {

                        if(cacheWhitelist.indexOf(cacheName) === -1){
                            //borrar elementos que no se necesitan
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                //activar cache
                self.clients.claim();
            })
    );
});

// evento fetch - actualiza la informacion desde el servidor y la almacena en cache
self.addEventListener('fetch', e => {

    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if(res){
                    //devuelvo datos desde cache
                    return res;
                }
               return fetch(e.request);
            })
    );
});

