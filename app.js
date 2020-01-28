if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('/sw.js')
                                 .then((reg) => console.log('service works'))
                                 .catch((err) => console.log('not reg'))
}