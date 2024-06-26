importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");
firebase.initilizeApp ({
  apiKey: "AIzaSyCrUgmD9f0wRb3NLenwQ_1XhO3vWzPWk_M",
  authDomain: "notificationpushgenius.firebaseapp.com",
  projectId: "notificationpushgenius",
  storageBucket: "notificationpushgenius.appspot.com",
  messagingSenderId: "502047805882",
  appId: "1:502047805882:web:20f3fa552489812bd60d83",
  measurementId: "G-FZEN2J9ZRL"
});
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log("mensaje Payload firebase", payload);
});
