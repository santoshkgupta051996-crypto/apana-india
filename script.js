// ==========================================
// 1. Firebase कॉन्फ़िगरेशन
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
if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
const db = firebase.firestore();
const auth = firebase.auth();

// ⚠️ ImgBB API Key
const IMGBB_API_KEY = "b601ec4cbb5f140288fa5e5c2ac4ff09;

let currentUser = null; 

// ==========================================
// 2. बेसिक फंक्शन्स (लॉगिन, पेज बदलना, मेनू)
// ==========================================
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.width = (sidebar.style.width === "250px") ? "0" : "250px";
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('page-' + pageId).classList.add('active');
    if (window.innerWidth < 768) toggleSidebar(); 
}

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(result => {
        alert("✅ लॉगिन सफल! स्वागत है " + result.user.displayName);
    }).catch(error => {
        alert("❌ लॉगिन में समस्या: " + error.message);
    });
}

function logoutUser() {
    auth.signOut().then(() => {
        alert("👋 लॉगआउट हो गया!");
        showPage('home');
    });
}

auth.onAuthStateChanged(user => {
    currentUser = user;
    const loginBtn = document.getElementById('loginBtn');
    const userBox = document.getElementById('userBox');
    const loginBox = document.getElementById('googleLoginBtn');

    if (user) {
        if(loginBtn) loginBtn.innerText = "👤 " + user.displayName.split(' ')[0];
        if(userBox) userBox.style.display = "block";
        if(loginBox) loginBox.style.display = "none";
        if(document.getElementById('userName')) document.getElementById('userName').innerText = user.displayName;
        if(document.getElementById('userEmail')) document.getElementById('userEmail').innerText = user.email;
    } else {
        if(loginBtn) loginBtn.innerText = "🔐 लॉगिन";
        if(userBox) userBox.style.display = "none";
        if(loginBox) loginBox.style.display = "flex";
    }

    if (typeof loadMajdoors === 'function') loadMajdoors();
    if (typeof loadVehicles === 'function') loadVehicles();
    if (typeof loadRentals === 'function') loadRentals();
    if (typeof loadComplaints === 'function') loadComplaints();
});

// ==========================================
// 3. कॉमन फंक्शन्स (फॉर्म खोलना, फोटो अपलोड)
// ==========================================
function openForm(type) {
    if (!currentUser) return alert("⚠️ कृपया पहले लॉगिन करें!");
    document.getElementById('edit' + type.charAt(0).toUpperCase() + type.slice(1) + 'Id').value = "";
    document.getElementById(type + 'FormBox').style.display = "flex";
    document.getElementById('add' + type.charAt(0).toUpperCase() + type.slice(1) + 'Btn').style.display = "none";
    document.getElementById(type + 'FormBox').reset();
}

function closeForm(type) {
    document.getElementById(type + 'FormBox').style.display = "none";
    document.getElementById('add' + type.charAt(0).toUpperCase() + type.slice(1) + 'Btn').style.display = "block";
}

async function uploadImg(file) {
    if (!file) return ""; 
    const formData = new FormData();
    formData.append("image", file);
    try {
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, { 
            method: "POST", body: formData 
        });
        const data = await res.json();
        if(data.success) return data.data.url;
        else return "";
    } catch (e) { 
        alert("फोटो अपलोड नहीं हो पाई! इंटरनेट या API Key चेक करें।");
        return ""; 
    }
}

// ==========================================
// 4. GPS लोकेशन का सिस्टम
// ==========================================
function getGPS(type) {
    if (navigator.geolocation) {
        const btn = event.target;
        btn.innerText = "लोकेशन ढूँढ रहे हैं...";
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                
                document.getElementById(type + 'Lat').value = lat;
                document.getElementById(type + 'Lng').value = lng;
                
                document.getElementById(type + 'LocStatus').style.display = "block";
                btn.innerText = "📍 लोकेशन ली गई";
                btn.style.background = "#4CAF50";
                btn.style.color = "#fff";
            },
            (error) => {
                alert("लोकेशन नहीं मिल पाई! कृपया GPS चालू करें और Allow दबाएँ।");
                btn.innerText = "📍 मेरी लोकेशन लें";
            }
        );
    } else {
        alert("आपके ब्राउज़र में GPS सपोर्ट नहीं है।");
    }
}

// ==========================================
// 5. मजदूर (Majdoor)
// ==========================================
async function saveMajdoor() {
    const id = document.getElementById('editMajdoorId').value;
    const name = document.getElementById('majdoorName').value.trim();
    const skill = document.getElementById('majdoorSkill').value.trim();
    const mobile = document.getElementById('majdoorMobile').value.trim();
    const file = document.getElementById('majdoorPhoto').files[0];
    
    if (!name || !mobile) return alert("नाम और मोबाइल नंबर ज़रूरी है!");

    let photo = file ? await uploadImg(file) : (id ? null : "https://via.placeholder.com/100");
    let data = { name, skill, mobile, uid: currentUser.uid, date: firebase.firestore.FieldValue.serverTimestamp() };
    if (photo) data.photo = photo;

    if (id) await db.collection('majdoor').doc(id).update(data);
    else await db.collection('majdoor').add(data);
    
    closeForm('majdoor');
    loadMajdoors();
}

async function loadMajdoors() {
    const list = document.getElementById('majdoorList');
    if(!list) return;
    const snap = await db.collection('majdoor').orderBy('date', 'desc').get();
    list.innerHTML = snap.empty ? "<p>कोई मजदूर नहीं है।</p>" : "";
    snap.forEach(doc => {
        const d = doc.data();
        const isOwner = currentUser && d.uid === currentUser.uid;
        let html = `
        <div class="card">
            <img src="${d.photo || 'https://via.placeholder.com/100'}">
            <div class="card-info">
                <h3>${d.name}</h3>
                <p>🛠️ ${d.skill || 'मजदूर'}</p>
                <a href="tel:${d.mobile}">📞 ${d.mobile}</a>
            </div>`;
        if (isOwner) {
            html += `<div class="card-actions">
                <button style="background:#2196F3" onclick="editMajdoor('${doc.id}')">✏️</button>
                <button style="background:#f44336" onclick="deleteData('majdoor','${doc.id}')">🗑️</button>
            </div>`;
        }
        html += `</div>`;
        list.innerHTML += html;
    });
}

async function editMajdoor(id) {
    const doc = await db.collection('majdoor').doc(id).get();
    const d = doc.data();
    document.getElementById('editMajdoorId').value = id;
    document.getElementById('majdoorName').value = d.name;
    document.getElementById('majdoorSkill').value = d.skill || "";
    document.getElementById('majdoorMobile').value = d.mobile;
    openForm('majdoor');
    window.scrollTo(0,0);
}

// ==========================================
// 6. वाहन (Vehicle) - GPS के साथ
// ==========================================
async function saveVehicle() {
    const id = document.getElementById('editVehicleId').value;
    const name = document.getElementById('vehicleName').value.trim();
    const number = document.getElementById('vehicleNumber').value.trim();
    const mobile = document.getElementById('vehicleMobile').value.trim();
    const file = document.getElementById('vehiclePhoto').files[0];
    
    if (!name || !mobile) return alert("नाम और मोबाइल नंबर ज़रूरी है!");

    let photo = file ? await uploadImg(file) : (id ? null : "https://via.placeholder.com/100");
    
    // GPS डेटा
    let lat = document.getElementById('vehicleLat').value;
    let lng = document.getElementById('vehicleLng').value;
    
    let data = { name, number, mobile, lat, lng, uid: currentUser.uid, date: firebase.firestore.FieldValue.serverTimestamp() };
    if (photo) data.photo = photo;

    if (id) await db.collection('vehicle').doc(id).update(data);
    else await db.collection('vehicle').add(data);
    
    closeForm('vehicle');
    loadVehicles();
}

async function loadVehicles() {
    const list = document.getElementById('vehicleList');
    if(!list) return;
    const snap = await db.collection('vehicle').orderBy('date', 'desc').get();
    list.innerHTML = snap.empty ? "<p>कोई वाहन नहीं है।</p>" : "";
    snap.forEach(doc => {
        const d = doc.data();
        const isOwner = currentUser && d.uid === currentUser.uid;
        let html = `
        <div class="card">
            <img src="${d.photo || 'https://via.placeholder.com/100'}">
            <div class="card-info">
                <h3>${d.name}</h3>
                <p>🚗 ${d.number || 'गाड़ी नंबर नहीं'}</p>
                <a href="tel:${d.mobile}">📞 ${d.mobile}</a>
                ${d.lat && d.lng ? `<a href="https://www.google.com/maps?q=${d.lat},${d.lng}" target="_blank" style="background:#2196F3; margin-left:5px;">🗺️ मैप देखें</a>` : ''}
            </div>`;
        if (isOwner) {
            html += `<div class="card-actions">
                <button style="background:#2196F3" onclick="editVehicle('${doc.id}')">✏️</button>
                <button style="background:#f44336" onclick="deleteData('vehicle','${doc.id}')">🗑️</button>
            </div>`;
        }
        html += `</div>`;
        list.innerHTML += html;
    });
}

async function editVehicle(id) {
    const doc = await db.collection('vehicle').doc(id).get();
    const d = doc.data();
    document.getElementById('editVehicleId').value = id;
    document.getElementById('vehicleName').value = d.name;
    document.getElementById('vehicleNumber').value = d.number || "";
    document.getElementById('vehicleMobile').value = d.mobile;
    
    // पुरानी लोकेशन भरें
    if(d.lat) document.getElementById('vehicleLat').value = d.lat;
    if(d.lng) document.getElementById('vehicleLng').value = d.lng;
    
    openForm('vehicle');
    window.scrollTo(0,0);
}

// ==========================================
// 7. किराया (Rental) - GPS के साथ
// ==========================================
async function saveRental() {
    const id = document.getElementById('editRentalId').value;
    const title = document.getElementById('rentalTitle').value.trim();
    const rent = document.getElementById('rentalRent').value.trim();
    const mobile = document.getElementById('rentalMobile').value.trim();
    const file = document.getElementById('rentalPhoto').files[0];
    
    if (!title || !mobile) return alert("शीर्षक और मोबाइल नंबर ज़रूरी है!");

    let photo = file ? await uploadImg(file) : (id ? null : "https://via.placeholder.com/100");
    
    // GPS डेटा
    let lat = document.getElementById('rentalLat').value;
    let lng = document.getElementById('rentalLng').value;
    
    let data = { title, rent, mobile, lat, lng, uid: currentUser.uid, date: firebase.firestore.FieldValue.serverTimestamp() };
    if (photo) data.photo = photo;

    if (id) await db.collection('rental').doc(id).update(data);
    else await db.collection('rental').add(data);
    
    closeForm('rental');
    loadRentals();
}

async function loadRentals() {
    const list = document.getElementById('rentalList');
    if(!list) return;
    const snap = await db.collection('rental').orderBy('date', 'desc').get();
    list.innerHTML = snap.empty ? "<p>कोई किराया नहीं है।</p>" : "";
    snap.forEach(doc => {
        const d = doc.data();
        const isOwner = currentUser && d.uid === currentUser.uid;
        let html = `
        <div class="card">
            <img src="${d.photo || 'https://via.placeholder.com/100'}">
            <div class="card-info">
                <h3>${d.title}</h3>
                <p>💰 ₹${d.rent || '0'}</p>
                <a href="tel:${d.mobile}">📞 ${d.mobile}</a>
                ${d.lat && d.lng ? `<a href="https://www.google.com/maps?q=${d.lat},${d.lng}" target="_blank" style="background:#2196F3; margin-left:5px;">🗺️ मैप देखें</a>` : ''}
            </div>`;
        if (isOwner) {
            html += `<div class="card-actions">
                <button style="background:#2196F3" onclick="editRental('${doc.id}')">✏️</button>
                <button style="background:#f44336" onclick="deleteData('rental','${doc.id}')">🗑️</button>
            </div>`;
        }
        html += `</div>`;
        list.innerHTML += html;
    });
}

async function editRental(id) {
    const doc = await db.collection('rental').doc(id).get();
    const d = doc.data();
    document.getElementById('editRentalId').value = id;
    document.getElementById('rentalTitle').value = d.title;
    document.getElementById('rentalRent').value = d.rent || "";
    document.getElementById('rentalMobile').value = d.mobile;
    
    // पुरानी लोकेशन भरें
    if(d.lat) document.getElementById('rentalLat').value = d.lat;
    if(d.lng) document.getElementById('rentalLng').value = d.lng;
    
    openForm('rental');
    window.scrollTo(0,0);
}

// ==========================================
// 8. शिकायत (Complaint)
// ==========================================
async function saveComplaint() {
    const title = document.getElementById('complaintTitle').value.trim();
    const desc = document.getElementById('complaintDesc').value.trim();
    
    if (!title || !desc) return alert("विषय और शिकायत दोनों लिखें!");

    let data = { title, desc, uid: currentUser ? currentUser.uid : 'guest', date: firebase.firestore.FieldValue.serverTimestamp() };
    await db.collection('complaint').add(data);
    
    document.getElementById('complaintTitle').value = "";
    document.getElementById('complaintDesc').value = "";
    alert("✅ शिकायत दर्ज हो गई!");
    loadComplaints();
}

async function loadComplaints() {
    const list = document.getElementById('complaintList');
    if(!list) return;
    const snap = await db.collection('complaint').orderBy('date', 'desc').get();
    list.innerHTML = snap.empty ? "<p>कोई शिकायत नहीं है।</p>" : "";
    snap.forEach(doc => {
        const d = doc.data();
        let html = `
        <div class="card" style="border-left: 5px solid #f44336;">
            <div class="card-info">
                <h3>${d.title}</h3>
                <p>${d.desc}</p>
            </div>
        </div>`;
        list.innerHTML += html;
    });
}

// ==========================================
// 9. कॉमन डिलीट फंक्शन
// ==========================================
async function deleteData(collection, id) {
    if (confirm("क्या आप वाकई इसे डिलीट करना चाहते हैं?")) {
        await db.collection(collection).doc(id).delete();
        if(collection === 'majdoor') loadMajdoors();
        if(collection === 'vehicle') loadVehicles();
        if(collection === 'rental') loadRentals();
    }
}
