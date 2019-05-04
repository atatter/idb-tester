import { openDB } from 'https://unpkg.com/idb?module';

export default class PromisedDatabaseController {
    constructor() {
        this.db = openDB('test-store', 1, {
            upgrade(db) {
                db.createObjectStore('items', { keyPath: 'id', autoIncrement: true });
            },
        });
    }

    addOne(val) {
        return this.db.then(db => {
            const tx = db.transaction('items', 'readwrite');
            const store = tx.objectStore('items');
            store.put(val);
            return tx.done;
        });
    }

    addMultiple(vals) {
        return this.db.then(async db => {
            const tx = db.transaction('items', 'readwrite');
            const store = tx.objectStore('items');
            await Promise.all(vals.map(x => store.add(x)));
            return tx.done;
        });
    }

    clearAll() {
        return this.db.then(db => {
            const tx = db.transaction('items', 'readwrite');
            const store = tx.objectStore('items');
            store.clear();
            return tx.done;
        });
    }
}