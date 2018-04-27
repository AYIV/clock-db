window.onload = async () => {
    if (!window.credentials)
        throw "Credentials is missing!";

    window.DAL = new VueService(
        new FirebaseRepository(window.credentials.firebase)
    );

    var app = new Vue({
        el: '#app',
        data: {
            newOrder: { name: '', price: 0.00 },
            list: await DAL.orders()
        }
    });
};