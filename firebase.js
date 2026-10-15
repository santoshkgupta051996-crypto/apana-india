// Firebase की सारी जरूरी चीजें
var firebaseConfig = {
  apiKey: "AIzaSyDUNK2J0lJ-VzwuGnovvjsrRCJJX--UTpE",
  authDomain: "apana-india-df3d7.firebaseapp.com",
  projectId: "apana-india-df3d7",
  storageBucket: "apana-india-df3d7.firebasestorage.app",
  messagingSenderId: "881764619223",
  appId: "1:881764619223:web:13510eec19ee1e46cd7192",
  measurementId: "G-BXN81QCKZX"
};

// Firebase को शुरू करें
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
