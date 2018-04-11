window.onload = () => {
    if (!window.credentials || !window.credentials.firebase)
        throw "Firebase credentials is missing!";

    // Initialize Firebase
    firebase.initializeApp(credentials.firebase);

    var app = new Vue({ el: '#app' });
};