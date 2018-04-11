
  if (!window.credentials || !window.credentials.firebase)
	  throw 'Firebase credentials is missing!';

  // Initialize Firebase
  firebase.initializeApp(credentials.firebase);
  
  function newPost() {
  	var key = firebase.database().ref().child('orders').push().key;
    
    var updates = {};
    updates[`/orders/${key}`] = { name: 'test', price: 220.14 };
    
    firebase.database().ref().update(updates);
    
    readOrders();
  }
  
  var readOrders = async () => {
  	var orders = (await firebase.database().ref('/orders').once('value')).val();
		
	document.getElementById('content').innerText = Object
		.keys(orders)
		.map(x => JSON.stringify(orders[x]))
		.reduce((acc, val) => `${acc}\n${val}`, '');
  };
  
  window.onload = async () => await readOrders();