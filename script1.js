// ==========================================
// 1. बेसिक फंक्शन्स (मेनू और पेज बदलना)
// ==========================================
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.width = (sidebar.style.width === "250px") ? "0" : "250px";
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    const targetPage = document.getElementById('page-' + pageId);
    if(targetPage) targetPage.classList.add('active');
    
    // मोबाइल में पेज बदलते ही साइडबार बंद हो जाए
    if (window.innerWidth < 768) toggleSidebar(); 
}

// ==========================================
// 2. Google लॉगिन और लॉगआउट
// ==========================================
function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(result => {
        alert("✅ लॉगिन सफल! स्वागत है " + result.user.displayName);
        showPage('home'); // लॉगिन के बाद होम पेज पर भेजें
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

// लॉगिन स्टेटस चेक करना (जब भी वेबसाइट खुले)
auth.onAuthStateChanged(user => {
    currentUser = user;
    const loginBtn = document.getElementById('loginBtn');
    const userBox = document.getElementById('userBox');
    const loginBox = document.getElementById('googleLoginBtn');

    if (user) {
        // अगर यूज़र लॉगिन है
        if(loginBtn) loginBtn.innerText = "👤 " + (user.displayName ? user.displayName.split(' ')[0] : 'यूज़र');
        if(userBox) userBox.style.display = "block";
        if(loginBox) loginBox.style.display = "none";
        if(document.getElementById('userName')) document.getElementById('userName').innerText = user.displayName || 'उपयोगकर्ता';
        if(document.getElementById('userEmail')) document.getElementById('userEmail').innerText = user.email || '';
    } else {
        // अगर यूज़र लॉगआउट है
        if(loginBtn) loginBtn.innerText = "🔐 लॉगिन";
        if(userBox) userBox.style.display = "none";
        if(loginBox) loginBox.style.display = "flex";
    }

    // बाकी फाइलों के डेटा लोडिंग फंक्शन्स कॉल करें (अगर वो मौजूद हों)
    if (typeof loadMajdoors === 'function') loadMajdoors();
    if (typeof loadVehicles === 'function') loadVehicles();
    if (typeof loadRentals === 'function') loadRentals();
    if (typeof loadComplaints === 'function') loadComplaints();
});

// ==========================================
// 3. कॉमन फंक्शन्स (फॉर्म खोलना/बंद करना)
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

// ==========================================
// 4. ImgBB पर फोटो अपलोड करना
// ==========================================
async function uploadImg(file) {
    if (!file) return ""; // अगर फोटो नहीं चुनी है तो खाली रिटर्न करें
    
    const formData = new FormData();
    formData.append("image", file);
    
    try {
        // IMGBB_API_KEY जो हमने firebase.js में सेट की थी
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, { 
            method: "POST", 
            body: formData 
        });
        const data = await res.json();
        if(data.success) {
            return data.data.url; // फोटो का लिंक मिल गया
        } else {
            alert("फोटो अपलोड नहीं हो पाई: " + (data.error ? data.error.message : "Unknown Error"));
            return "";
        }
    } catch (e) { 
        alert("फोटो अपलोड करने में समस्या आई! इंटरनेट चेक करें।");
        return ""; 
    }
}

// ==========================================
// 5. GPS लोकेशन का सिस्टम (वाहन और किराया के लिए)
// ==========================================
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
