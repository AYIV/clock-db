class IDb {
    constructor (dbName, version = 1) {
        this._dbName = dbName;
        this._version = version;
    }

    init(settings) {
        return new Promise((resolve, reject) => {
            var request = indexedDB.open(this._dbName, this._version);
            request.onblocked = e => reject();
            request.onerror = e => reject();
            request.onupgradeneeded = e => e.target.result.createObjectStore(settings.storeName, { autoIncrement : true });
            request.onsuccess = e => {
                this._db = e.target.result;
                resolve(this);
            }
        });
    }

    async getAll(storeName) {
        return await this.process(this._db
            .transaction(storeName)
            .objectStore(storeName)
            .getAll()
        );
    }

    async put(storeName, value) {
        await this.process(this._db
            .transaction([storeName], "readwrite")
            .objectStore(storeName)
            .add(value)
        );
    }

    async remove(storeName, key) {
        await this.process(this._db
            .transaction([storeName], "readwrite")
            .objectStore(storeName)
            .delete(key)
        );
    }

    process(request) {
        return new Promise((resolve, reject) => {
            request.onerror     = e => reject();
            request.onblocked   = e => reject();
            request.onsuccess   = e => resolve(e.target.result);
        });
    }
}