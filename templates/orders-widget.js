(async () => await Vue.componentEx('orders-widget', {
    templateUrl: 'templates/orders-widget.html',

    props: ["orders"],

    data() {
        return { newOrder: { name: '', price: 0.00 } };
    },

    methods: {
        async createOrder() {
            await DAL.newPost({ 
                name: this.newOrder.name, 
                price: parseFloat(this.newOrder.price) 
            });
        }
    }
}))();