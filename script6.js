/* ================= script6.js — ID कार्ड, जमीन, लॉगिन, Init ================= */

/* ---------------- डिजिटल ID कार्ड ---------------- */
function liveID(){
  const box = document.getElementById("idCardPreview");
  if(!box) return;
  const n = val("idN");
  if(!n){ box.innerHTML = ""; return; }

  box.innerHTML = `
    <div class="idcard">
      <div class="idcard-top">🇮🇳 APANA INDIA</div>
      <div class="idcard-body">
        <div class="idcard-name">${esc(n)}</div>
        <div class="idcard-row"><span>पिता/पति</span><b>${esc(val("idF") || "—")}</b></div>
        <div class="idcard-row"><span>मोबाइल</span><b>${esc(val("idP") || "—")}</b></div>
        <div class="idcard-row"><span>हुनर</span><b>${esc(val("idS") || "—")}</b></div>
        <div class="idcard-row"><span>पता</span><b>${esc(val("idV") || "—")}, ${esc(val("idB") || "—")}</b></div>
        <div class="idcard-row"><span>जिला</span><b>${esc(val("idD") || "—")}, ${esc(val("idSt") || "—")}</b></div>
        <div class="idcard-id">ID: AI-${(n.length + (val("idP")||"").length) * 7}${(val("idP")||"0000").slice(-4)}</div>
      </div>
      <div class="idcard-foot">रोजगार भी, मजदूरों को न्याय भी</div>
    </div>`;
}

function makeIDCard(e){
  e.preventDefault();
  liveID();
  show("sm10");
}

/* ---------------- जमीन कन्वर्टर ---------------- */
const LAND = {
  bigha_up:  { m2: 2529.29, name: "बीघा (UP)" },
  bigha_mp:  { m2: 1114.84, name: "बीघा (MP)" },
  bigha_raj: { m2: 2529.29, name: "बीघा (राजस्थान)" },
  bigha_guj: { m2: 1740.24, name: "बीघा (गुजरात)" },
  bissa:     { m2: 126.46,  name: "बिस्सा" },
  hectare:   { m2: 10000,   name: "हेक्टेयर" },
  acre:      { m2: 4046.86, name: "एकड़" },
  sqmeter:   { m2: 1,       name: "वर्ग मीटर" },
  sqfeet:    { m2: 0.0929,  name: "वर्ग फुट" },
  gaj:       { m2: 0.8361,  name: "गज" },
  gunta:     { m2: 101.17,  name: "गुंठा" },
  katha:     { m2: 126.46,  name: "कट्ठा" },
  marla:     { m2: 25.29,   name: "मरला" },
  kanal:     { m2: 505.86,  name: "कनाल" }
};

function convertLand(){
  const amt  = parseFloat(val("landInput"));
  const from = val("landFrom");
  const box  = document.getElementById("landResult");
  if(!box) return;

  if(!amt || amt <= 0){ box.innerHTML = ""; return; }

  const m2 = amt * LAND[from].m2;

  const rows = Object.keys(LAND).map(k => {
    const v = m2 / LAND[k].m2;
    return `<div class="num-item">
      <div class="info"><b>${LAND[k].name}</b></div>
      <span style="font-weight:800;color:#000080">${v.toFixed(v < 1 ? 4 : 3)}</span>
    </div>`;
  }).join("");

  box.innerHTML = `
    <h3 style="margin-bottom:8px;color:#FF9933">📐 ${amt} ${LAND[from].name} =</h3>
    ${rows}
    <div class="tip"><b>💡</b> यह अनुमानित हिसाब है। असली नापी के लिए लेखपाल/अमीन से संपर्क करें।</div>`;
}

/* ---------------- लॉगिन ---------------- */
function googleLogin(){
  if(auth){
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .then(() => { /* state listener handle करेगा */ })
      .catch(err => alert("लॉगिन नहीं हुआ: " + err.message));
  } else {
    /* ऑफलाइन मोड — स्थानीय लॉगिन */
    const name = prompt("आपका नाम बताएँ:");
    if(!name) return;
    currentUser = { displayName: name, email: "offline@apanaindia.in" };
    localStorage.setItem("localUser", JSON.stringify(currentUser));
    renderLoginUI();
  }
}

function logoutUser(){
  if(auth){
    auth.signOut().then(renderLoginUI);
  } else {
    currentUser = null;
    localStorage.removeItem("localUser");
    renderLoginUI();
  }
}

function renderLoginUI(){
  const loginBox = document.getElementById("loginBox");
  const userBox  = document.getElementById("userBox");
  if(!loginBox || !userBox) return;

  if(currentUser){
    loginBox.classList.add("h");
    userBox.classList.remove("h");
    setTxt("userName", currentUser.displayName || "उपयोगकर्ता");
    setTxt("userEmail", currentUser.email || "");
  } else {
    loginBox.classList.remove("h");
    userBox.classList.add("h");
  }

  // ✅ एडमिन पैनल चेक करें (यह लाइन नई जोड़ी गई है)
  if (typeof checkAdminAccess === "function") {
    checkAdminAccess();
  }
}

/* ---------------- ऐप शुरू ---------------- */
document.addEventListener("DOMContentLoaded", function(){

  /* लॉगिन UI */
  if(auth){
    auth.onAuthStateChanged(u => {
      currentUser = u;
      renderLoginUI();
    });
  } else {
    try{
      const u = JSON.parse(localStorage.getItem("localUser") || "null");
      if(u) currentUser = u;
    }catch(e){}
    renderLoginUI();
  }

  /* पहला पेज + डेटा */
  go("home");
  if(typeof loadCache === 'function') loadCache();
  if(typeof rnumbers === 'function') rnumbers();
  if(typeof rAlerts === 'function') rAlerts();
  if(typeof rCourses === 'function') rCourses();
  if(typeof rnews === 'function') rnews();
  if(typeof rJobs === 'function') rJobs();
  if(typeof liveID === 'function') liveID();

  /* ऑफलाइन मोड की सूचना */
  if(typeof OFFLINE_MODE !== 'undefined' && OFFLINE_MODE){
    console.log("⚠️ Offline mode — Firebase keys नहीं डाली गईं");
  }
});
