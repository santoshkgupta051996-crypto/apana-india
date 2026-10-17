// ==========================================
// 1. Firebase कॉन्फ़िगरेशन (आपकी असली डिटेल्स)
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyDUNK2J0lJ-VzwuGnovvjsrRCJJX--UTpE",
    authDomain: "apana-india-df3d7.firebaseapp.com",
    projectId: "apana-india-df3d7",
    storageBucket: "apana-india-df3d7.firebasestorage.app",
    messagingSenderId: "881764619223",
    appId: "1:881764619223:web:13510eec19ee1e46cd7192",
    measurementId: "G-BXN81QCKZX"
};

// Firebase शुरू करें
if (!firebase.apps.length) { 
    firebase.initializeApp(firebaseConfig); 
}

// डेटाबेस और लॉगिन को वैश्विक (Global) बनाएँ
const db = firebase.firestore();
const auth = firebase.auth();

// ==========================================
// 2. ImgBB API Key (फोटो अपलोड के लिए)
// ==========================================
// ⚠️ यहाँ अपनी असली ImgBB की (Key) डालें
const IMGBB_API_KEY = "b601ec4cbb5f140288fa5e5c2ac4ff0"; 

// ==========================================
// 3. ग्लोबल वेरिएबल्स
// ==========================================
let currentUser = null; // यह याद रखेगा कि कौन लॉगिन है
