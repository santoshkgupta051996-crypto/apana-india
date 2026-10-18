// ================= FIREBASE CONFIG =================
const firebaseConfig = {
  apiKey: "AIzaSyDUNK2J0l-J-VzwuGnovvjsrRCJJX--UTpE",
  authDomain: "apana-india-df3d7.firebaseapp.com",
  projectId: "apana-india-df3d7",
  storageBucket: "apana-india-df3d7.firebasestorage.app",
  messagingSenderId: "881764619223",
  appId: "1:881764619223:web:13510eec19ee1e46cd7192",
  measurementId: "G-BXN81QCKZX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var auth = firebase.auth();

// ================= GLOBAL USER =================
var currentUser = null;

// Login status change
auth.onAuthStateChanged(function(u){
  currentUser = u;
  var un=document.getElementById('userName');
  var ue=document.getElementById('userEmail');
  var lb=document.getElementById('loginBox');
  var ub=document.getElementById('userBox');
  var lb2=document.getElementById('loginBtn');
  if(u){
    if(un)un.innerText=u.displayName||'उपयोगकर्ता';
    if(ue)ue.innerText=u.email||'';
    if(lb)lb.style.display='none';
    if(ub)ub.classList.remove('h');
    if(lb2)lb2.innerText='👤 '+((u.displayName||'').split(' ')[0]||'यूज़र');
  }else{
    if(lb)lb.style.display='block';
    if(ub)ub.classList.add('h');
    if(lb2)lb2.innerText='🔐 लॉगिन';
  }
});

// ================= GOOGLE LOGIN =================
function googleLogin(){
  var provider=new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).then(function(r){
    alert('✅ लॉगिन सफल! स्वागत '+(r.user.displayName||''));
    go('home');
  }).catch(function(e){
    alert('❌ Error: '+e.message);
  });
}

// ================= LOGOUT =================
function logoutUser(){
  auth.signOut().then(function(){
    alert('👋 लॉगआउट हो गया!');
    go('home');
  });
}
