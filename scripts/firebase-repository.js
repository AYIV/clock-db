class FirebaseRepository {
    constructor(credentials) {
        if (!credentials)
            throw "Firebase credentials is missing!";

        // Initialize Firebase
        firebase.initializeApp(credentials);
    }

    async getOrders() {
        var raw = (await firebase.database().ref('/orders').once('value')).val();

        return Object
            .keys(raw)
            .map(firebaseKey => raw[firebaseKey]);
    }

    newPost(order) {
        var key = firebase.database().ref().child('orders').push().key;
    
        var updates = {};
        updates[`/orders/${key}`] = order;
    
        firebase.database().ref().update(updates);
    }
};