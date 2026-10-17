// ==========================================
// 1. मजदूर (Majdoor) का सिस्टम
// ==========================================
async function saveMajdoor() {
    const btn = event.target;
    btn.innerText = "सेव हो रहा है..."; // बटन लॉक
    btn.disabled = true;

    const id = document.getElementById('editMajdoorId').value;
    const name = document.getElementById('majdoorName').value.trim();
    const skill = document.getElementById('majdoorSkill').value.trim();
    const mobile = document.getElementById('majdoorMobile').value.trim();
    const file = document.getElementById('majdoorPhoto').files[0];
    
    if (!name || !mobile) {
        btn.innerText = "सेव करें"; btn.disabled = false;
        return alert("नाम और मोबाइल नंबर ज़रूरी है!");
    }

    let photo = file ? await uploadImg(file) : (id ? null : "https://via.placeholder.com/100");
    let data = { name, skill, mobile, uid: currentUser.uid, date: firebase.firestore.FieldValue.serverTimestamp() };
    if (photo) data.photo = photo;

    if (id) await db.collection('majdoor').doc(id).update(data);
    else await db.collection('majdoor').add(data);
    
    btn.innerText = "सेव करें"; btn.disabled = false;
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
// 2. वाहन (Vehicle) का सिस्टम
// ==========================================
async function saveVehicle() {
    const btn = event.target;
    btn.innerText = "सेव हो रहा है..."; 
    btn.disabled = true;

    const id = document.getElementById('editVehicleId').value;
    const name = document.getElementById('vehicleName').value.trim();
    const number = document.getElementById('vehicleNumber').value.trim();
    const mobile = document.getElementById('vehicleMobile').value.trim();
    const file = document.getElementById('vehiclePhoto').files[0];
    
    if (!name || !mobile) {
        btn.innerText = "सेव करें"; btn.disabled = false;
        return alert("नाम और मोबाइल नंबर ज़रूरी है!");
    }

    let photo = file ? await uploadImg(file) : (id ? null : "https://via.placeholder.com/100");
    let lat = document.getElementById('vehicleLat').value;
    let lng = document.getElementById('vehicleLng').value;
    let data = { name, number, mobile, lat, lng, uid: currentUser.uid, date: firebase.firestore.FieldValue.serverTimestamp() };
    if (photo) data.photo = photo;

    if (id) await db.collection('vehicle').doc(id).update(data);
    else await db.collection('vehicle').add(data);
    
    btn.innerText = "सेव करें"; btn.disabled = false;
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
                ${d.lat && d.lng ? `<a href="https://www.google.com/maps?q=${d.lat},${d.lng}" target="_blank" style="background:#2196F3; margin-left:5px;">🗺️ मैप</a>` : ''}
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
    if(d.lat) document.getElementById('vehicleLat').value = d.lat;
    if(d.lng) document.getElementById('vehicleLng').value = d.lng;
    openForm('vehicle');
    window.scrollTo(0,0);
}

// ==========================================
// 3. किराया (Rental) का सिस्टम
// ==========================================
async function saveRental() {
    const btn = event.target;
    btn.innerText = "सेव हो रहा है..."; 
    btn.disabled = true;

    const id = document.getElementById('editRentalId').value;
    const title = document.getElementById('rentalTitle').value.trim();
    const rent = document.getElementById('rentalRent').value.trim();
    const mobile = document.getElementById('rentalMobile').value.trim();
    const file = document.getElementById('rentalPhoto').files[0];
    
    if (!title || !mobile) {
        btn.innerText = "सेव करें"; btn.disabled = false;
        return alert("शीर्षक और मोबाइल नंबर ज़रूरी है!");
    }

    let photo = file ? await uploadImg(file) : (id ? null : "https://via.placeholder.com/100");
    let lat = document.getElementById('rentalLat').value;
    let lng = document.getElementById('rentalLng').value;
    let data = { title, rent, mobile, lat, lng, uid: currentUser.uid, date: firebase.firestore.FieldValue.serverTimestamp() };
    if (photo) data.photo = photo;

    if (id) await db.collection('rental').doc(id).update(data);
    else await db.collection('rental').add(data);
    
    btn.innerText = "सेव करें"; btn.disabled = false;
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
                ${d.lat && d.lng ? `<a href="https://www.google.com/maps?q=${d.lat},${d.lng}" target="_blank" style="background:#2196F3; margin-left:5px;">🗺️ मैप</a>` : ''}
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
    if(d.lat) document.getElementById('rentalLat').value = d.lat;
    if(d.lng) document.getElementById('rentalLng').value = d.lng;
    openForm('rental');
    window.scrollTo(0,0);
}

// ==========================================
// 4. शिकायत (Complaint) का सिस्टम
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
// 5. डिलीट करने का कॉमन फंक्शन
// ==========================================
async function deleteData(collection, id) {
    if (confirm("क्या आप वाकई इसे डिलीट करना चाहते हैं?")) {
        await db.collection(collection).doc(id).delete();
        if(collection === 'majdoor') loadMajdoors();
        if(collection === 'vehicle') loadVehicles();
        if(collection === 'rental') loadRentals();
    }
}
