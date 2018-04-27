class VueService {    
    constructor(dataService) {
        this.service = dataService;

        this._orders = [];

        this._reloadArray = async arr => arr.splice(0, arr.length, ...(await this.service.getOrders()));
    }

    async orders() {
        await this._reloadArray(this._orders);

        return this._orders;
    }

    async newPost(order) {
        this.service.newPost(order);

        await this._reloadArray(this._orders);
    }
}