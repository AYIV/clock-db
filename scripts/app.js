window.onload = async () => {
    if (!window.credentials || !window.credentials.firebase)
        throw "Firebase credentials is missing!";

    // Initialize Firebase
    firebase.initializeApp(credentials.firebase);

    window.orders = await readOrders();
    var app = new Vue({
        el: '#app',
        data: {
            newOrder: { name: '', price: 0.00 },
            list: orders
        }
    });
};