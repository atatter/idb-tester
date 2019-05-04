export default class DatabaseController {
    constructor() {
        this.db = new Promise((resolve, reject) => {
            const request = window.indexedDB.open('test-store', 1);
            request.onerror = reject;
            request.onsuccess = function (event) {
                resolve(event.target.result); // db
            }
            request.onupgradeneeded = function (event) {
                const db = event.target.result;
                db.createObjectStore('items', { keyPath: 'id', autoIncrement: true });
            }
        });
    }

    addOne(val) {
        return this.db.then(db => new Promise((resolve, reject) => {
            const request = db.transaction('items', 'readwrite')
                .objectStore('items')
                .add(val);

            request.onerror = reject;
            request.onsuccess = resolve;
        }));
    }

    addMultiple(vals) {
        return this.db.then(async db => new Promise((resolve, reject) => {
            let i = 0;
            const request = db.transaction('items', 'readwrite')
            const tx = request.objectStore('items');
            putNext()
            function putNext(e) {
                if (i<vals.length) {
                    const req = tx.add(vals[i]);
                    req.onerror = reject;
                    req.onsuccess = putNext;
                    ++i;
                } else {
                    resolve(e)
                }
            }
        }));
    }

    // Hella faster than addMultiple
    addMultipleFast(vals) {
        return this.db.then(async db => new Promise((resolve, reject) => {
            let i = 0;
            const request = db.transaction('items', 'readwrite')
            const tx = request.objectStore('items');
            vals.forEach(val => {
                const req = tx.add(val);
                req.onerror = reject;
                req.onsuccess = handleSuccess;
            });
            function handleSuccess(e) {
                i++;
                if (i === vals.length) resolve(e);
            }
        }));
    }

    clearAll() {
        return this.db.then(db => new Promise((resolve, reject) => {
            const request = db.transaction('items', 'readwrite')
                .objectStore('items')
                .clear();

            request.onerror = reject;
            request.onsuccess = resolve;
        }));
    }
}