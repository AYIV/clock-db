function newPost() {
    var key = firebase.database().ref().child('orders').push().key;

    var updates = {};
    updates[`/orders/${key}`] = { name: 'test', price: 220.14 };

    firebase.database().ref().update(updates);

    readOrders();
}

var readOrders = async () => {
    var raw = (await firebase.database().ref('/orders').once('value')).val();

    return Object
        .keys(raw)
        .map(firebaseKey => raw[firebaseKey]);
}
// window.onload = async () => await readOrders();