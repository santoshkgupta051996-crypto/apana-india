const firebaseConfig = {
    apiKey: "AIzaSyCm_NoSK82BdJLt9LYRoM4eul1HdNba29A", // आपकी नई Key जो काम कर रही है
    authDomain: "apana-india-df3d7.firebaseapp.com",
    projectId: "apana-india-df3d7",
    storageBucket: "apana-india-df3d7.firebasestorage.app",
    messagingSenderId: "881764619223",
    appId: "1:881764619223:web:13510eec19ee1e46cd7192"
};

if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
const db = firebase.firestore();
const auth = firebase.auth();

// ImgBB API Key (फोटो अपलोड के लिए)
const IMGBB_API_KEY = "b601ec4cbb5f140288fa5e5c2ac4ff0"; 

let currentUser = null; 
