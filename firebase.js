// Firebase Config
var firebaseConfig = {
  apiKey: "AIzaSyDUNK2J0lJ-VzwuGnovvjsrRCJJX--UTpE",
  authDomain: "apana-india-df3d7.firebaseapp.com",
  projectId: "apana-india-df3d7",
  storageBucket: "apana-india-df3d7.firebasestorage.app",
  messagingSenderId: "881764619223",
  appId: "1:881764619223:web:13510eec19ee1e46cd7192",
  measurementId: "G-BXN81QCKZX"
};

// Initialize
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var auth = firebase.auth();

// Global current user
var currentUser = null;
auth.onAuthStateChanged(function(u){
if(u){
currentUser = u;
var un=document.getElementById('userName');
var ue=document.getElementById('userEmail');
if(un)un.innerText=u.displayName||'उपयोगकर्ता';
if(ue)ue.innerText=u.email||'';
var lb=document.getElementById('loginBox');
var ub=document.getElementById('userBox');
if(lb)lb.style.display='none';
if(ub)ub.classList.remove('h');
var lb2=document.getElementById('loginBtn');
if(lb2)lb2.innerText='👤 '+((u.displayName||'').split(' ')[0]||'यूज़र');
}else{
currentUser = null;
var lb3=document.getElementById('loginBox');
var ub2=document.getElementById('userBox');
if(lb3)lb3.style.display='block';
if(ub2)ub2.classList.add('h');
var lb4=document.getElementById('loginBtn');
if(lb4)lb4.innerText='🔐 लॉगिन';
}
});

// Google Login
function googleLogin(){
var provider=new firebase.auth.GoogleAuthProvider();
auth.signInWithPopup(provider).then(function(r){
alert('✅ लॉगिन सफल! स्वागत '+r.user.displayName);
}).catch(function(e){alert('❌ Error: '+e.message);});
}

// Logout
function logoutUser(){
auth.signOut().then(function(){
alert('👋 लॉगआउट हो गया!');
go('home');
});
}
