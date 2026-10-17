function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.width = (sidebar.style.width === "250px") ? "0" : "250px";
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    const targetPage = document.getElementById('page-' + pageId);
    if(targetPage) targetPage.classList.add('active');
    if (window.innerWidth < 768) toggleSidebar(); 
}

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(result => {
        alert("✅ लॉगिन सफल! स्वागत है " + result.user.displayName);
        showPage('home'); 
    }).catch(error => { alert("❌ लॉगिन में समस्या: " + error.message); });
}

function logoutUser() {
    auth.signOut().then(() => { alert("👋 लॉगआउट हो गया!"); showPage('home'); });
}

auth.onAuthStateChanged(user => {
    currentUser = user;
    const loginBtn = document.getElementById('loginBtn');
    const userBox = document.getElementById('userBox');
    const loginBox = document.getElementById('googleLoginBtn');

    if (user) {
        if(loginBtn) loginBtn.innerText = "👤 " + (user.displayName ? user.displayName.split(' ')[0] : 'यूज़र');
        if(userBox) userBox.style.display = "block";
        if(loginBox) loginBox.style.display = "none";
        if(document.getElementById('userName')) document.getElementById('userName').innerText = user.displayName || 'उपयोगकर्ता';
        if(document.getElementById('userEmail')) document.getElementById('userEmail').innerText = user.email || '';
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
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, { method: "POST", body: formData });
        const data = await res.json();
        return data.success ? data.data.url : "";
    } catch (e) { alert("फोटो अपलोड नहीं हो पाई!"); return ""; }
}

function getGPS(type) {
    if (navigator.geolocation) {
        const btn = event.target;
        btn.innerText = "लोकेशन ढूँढ रहे हैं...";
        navigator.geolocation.getCurrentPosition(
            (position) => {
                document.getElementById(type + 'Lat').value = position.coords.latitude;
                document.getElementById(type + 'Lng').value = position.coords.longitude;
                document.getElementById(type + 'LocStatus').style.display = "block";
                btn.innerText = "📍 लोकेशन ली गई";
                btn.style.background = "#138808"; btn.style.color = "#fff";
            },
            (error) => { alert("लोकेशन नहीं मिल पाई!"); btn.innerText = "📍 मेरी लोकेशन लें"; }
        );
    }
}
