(async () => await Vue.componentEx('orders-widget', {
    templateUrl: 'templates/orders-widget.html',

    props: ["orders"],

    data() {
        return { newOrder: { name: '', price: 0.00 } };
    },

    methods: {
        async reloadOrders() {
            window.orders = await readOrders();
        },

        async createOrder() {
            var key = firebase.database().ref().child('orders').push().key;

            var updates = {};
            updates[`/orders/${key}`] = {
                name: this.newOrder.name,
                price: parseFloat(this.newOrder.price)
            };

            firebase.database().ref().update(updates);

            await this.reloadOrders();
        }
    }
}))();