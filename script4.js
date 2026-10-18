/* ================= script4.js — शिकायत व एडमिन ================= */

/* ---------------- एडमिन लॉगिन चेक (Google Auth) ---------------- */
const ADMIN_EMAIL = "santoshkgupta051996@gmail.com"; // ⚠️ अपनी Gmail ID यहाँ डालें

function alog() {
  // पुराना फंक्शन हटा दिया गया है
}

function checkAdminAccess() {
  if (typeof currentUser !== 'undefined' && currentUser && currentUser.email === ADMIN_EMAIL) {
    document.getElementById("alb").classList.add("h");
    document.getElementById("apn").classList.remove("h");
    loadAdmin();
  } else {
    document.getElementById("alb").classList.remove("h");
    document.getElementById("apn").classList.add("h");
    if(typeof currentUser !== 'undefined' && currentUser) {
      document.getElementById("adminLoginMsg").innerText = "❌ आप इस ईमेल से एडमिन नहीं हैं।";
    }
  }
}

const STATE_HELP = {
  up:         { name:"उत्तर प्रदेश", num:"1800-180-5345", extra:"जनसुनवाई: 1076" },
  mp:         { name:"मध्य प्रदेश", num:"1800-233-1111", extra:"श्रम विभाग" },
  bihar:      { name:"बिहार", num:"1800-345-6266", extra:"श्रम संसाधन विभाग" },
  cg:         { name:"छत्तीसगढ़", num:"1800-233-3663", extra:"श्रम विभाग" },
  jharkhand:  { name:"झारखंड", num:"1800-345-6577", extra:"श्रम विभाग" },
  haryana:    { name:"हरियाणा", num:"1800-200-0022", extra:"श्रम विभाग" },
  karnataka:  { name:"कर्नाटक", num:"155214", extra:"श्रम हेल्पलाइन" },
  odisha:     { name:"ओडिशा", num:"1800-345-6770", extra:"श्रम विभाग" },
  maharashtra:{ name:"महाराष्ट्र", num:"1800-222-222", extra:"श्रम हेल्पलाइन" },
  rajasthan:  { name:"राजस्थान", num:"181", extra:"सामाजिक सुरक्षा" },
  delhi:      { name:"दिल्ली", num:"155201", extra:"श्रम विभाग" },
  wb:         { name:"पश्चिम बंगाल", num:"1800-345-5512", extra:"श्रम विभाग" },
  tamilnadu:  { name:"तमिलनाडु", num:"155214", extra:"श्रम हेल्पलाइन" },
  gujarat:    { name:"गुजरात", num:"1800-233-4444", extra:"श्रम विभाग" },
  other:      { name:"अन्य राज्य", num:"14434", extra:"केंद्रीय श्रम हेल्पलाइन" }
};

/* ---------------- शिकायत दर्ज ---------------- */
function subc(e){
  e.preventDefault();
  const phone = val("wp");
  if(phone.length !== 10){ alert("मोबाइल 10 अंक का होना चाहिए"); return; }

  const stateKey = val("cState");
  const data = {
    company: val("cn"), companyAddress: val("ca"),
    worker: val("wn"), phone: phone,
    state: stateKey, stateName: (STATE_HELP[stateKey] || {}).name || stateKey,
    type: val("ct"), detail: val("cd"), proof: val("cp"),
    status: "pending", time: Date.now()
  };

  db.collection("complaints").add(data).then(() => {
    localStorage.setItem("myPhone", phone);
    show("sm1");
    e.target.reset();

    const h = STATE_HELP[stateKey] || STATE_HELP.other;
    document.getElementById("stateHelp").innerHTML = `
      <div class="lc">
        <h3>📞 ${esc(h.name)} — श्रम विभाग</h3>
        <div class="num-item"><div class="info"><b>हेल्पलाइन</b><span>शिकायत के लिए</span></div>
        <a href="tel:${esc(h.num)}">📞 ${esc(h.num)}</a></div>
        <div class="num-item"><div class="info"><b>${esc(h.extra)}</b><span>अतिरिक्त सहायता</span></div>
        <a href="tel:14434">📞 14434</a></div>
        <p class="note">✅ आपकी शिकायत एडमिन जाँच के बाद सार्वजनिक होगी।</p>
      </div>`;
    if(typeof loadStats === 'function') loadStats();
  }).catch(err => alert("त्रुटि: " + err.message));
}

/* ---------------- मेरी शिकायतें ---------------- */
function rMyComplaints(){
  const box = document.getElementById("mcl");
  if(!box) return;
  const phone = localStorage.getItem("myPhone");
  if(!phone){
    box.innerHTML = '<p class="note">पहले शिकायत दर्ज करें। उसके बाद आपकी शिकायतें यहाँ दिखेंगी।</p>';
    return;
  }

  db.collection("complaints").where("phone", "==", phone).get().then(s => {
    if(!s.size){
      box.innerHTML = '<p class="note">आपकी कोई शिकायत दर्ज नहीं है।</p>';
      return;
    }
    const list = s.docs.map(d => ({ id:d.id, ...d.data() }))
                        .sort((a,b) => (b.time||0) - (a.time||0));
    const badge = st => st === "approved" ? "✅ स्वीकृत"
                    : st === "rejected" ? "❌ रद्द" : "⏳ जाँच में";
    box.innerHTML = list.map(c => `
      <div class="item">
        <b>🏢 ${esc(c.company)}</b>
        <p>${esc(c.type)}</p>
        <p style="font-size:12px;color:#777">${esc(c.detail).slice(0,120)}</p>
        <div class="row"><span class="tag">${badge(c.status)}</span>
        <span style="font-size:11px;color:#999">${new Date(c.time||0).toLocaleDateString("hi-IN")}</span></div>
      </div>`).join("");
  }).catch(()=>{});
}

/* ---------------- एडमिन लोड ---------------- */
function loadAdmin(){
  db.collection("ads").get().then(s => setTxt("aa", s.size)).catch(()=>{});
  db.collection("complaints").get().then(s => setTxt("as", s.size)).catch(()=>{});
  db.collection("workers").get().then(s => setTxt("aw", s.size)).catch(()=>{});
  db.collection("companies").get().then(s => setTxt("ap2", s.size)).catch(()=>{});

  db.collection("complaints").get().then(s => {
    const all = s.docs.map(d => ({ id:d.id, ...d.data() }))
                       .sort((a,b) => (b.time||0) - (a.time||0));

    const card = (c, actions) => `
      <div class="item">
        <b>🏢 ${esc(c.company)}</b>
        <p>👤 ${esc(c.worker)} • 📞 ${esc(c.phone)}</p>
        <p>📍 ${esc(c.stateName || c.state)} • ${esc(c.type)}</p>
        <p style="font-size:12px;color:#666">${esc(c.detail)}</p>
        ${c.proof ? `<p style="font-size:12px;color:#666">सबूत: ${esc(c.proof)}</p>` : ""}
        <div class="row">
          <span style="font-size:11px;color:#999">${new Date(c.time||0).toLocaleString("hi-IN")}</span>
          <span>${actions || ""}</span>
        </div>
      </div>`;

    document.getElementById("acomplPending").innerHTML =
      all.filter(c => c.status === "pending")
         .map(c => card(c, `<button class="mini ok" onclick="setStatus('${c.id}','approved')">✅ स्वीकृत</button>
                            <button class="mini no" onclick="setStatus('${c.id}','rejected')">❌ रद्द</button>`))
         .join("") || '<p class="note">कोई पेंडिंग शिकायत नहीं।</p>';

    document.getElementById("acomplApproved").innerHTML =
      all.filter(c => c.status === "approved")
         .map(c => card(c, `<button class="mini no" onclick="delComplaint('${c.id}')">🗑️ हटाएँ</button>`))
         .join("") || '<p class="note">कोई स्वीकृत शिकायत नहीं।</p>';

    document.getElementById("acomplRejected").innerHTML =
      all.filter(c => c.status === "rejected")
         .map(c => card(c, `<button class="mini ok" onclick="setStatus('${c.id}','approved')">✅ स्वीकृत</button>`))
         .join("") || '<p class="note">कोई रद्द शिकायत नहीं।</p>';
  }).catch(()=>{});

  db.collection("workers").get().then(s => {
    const list = s.docs.map(d => ({ id:d.id, ...d.data() }))
                        .sort((a,b) => (b.time||0) - (a.time||0));
    document.getElementById("adminWorkers").innerHTML = list.length ? list.map(w => `
      <div class="item">
        <b>👷 ${esc(w.name)}</b>
        <p>🛠️ ${esc(w.skill)} • 📞 ${esc(w.phone)}</p>
        <p>📍 ${esc(w.village)}, ${esc(w.block)}, ${esc(w.district)}</p>
      </div>`).join("") : '<p class="note">कोई मजदूर रजिस्टर नहीं।</p>';
  }).catch(()=>{});
}

function setStatus(id, st){
  db.collection("complaints").doc(id).update({ status: st }).then(() => {
    loadAdmin(); 
    if(typeof loadPublicComplaints === 'function') loadPublicComplaints(); 
    if(typeof loadStats === 'function') loadStats();
  }).catch(err => alert("त्रुटि: " + err.message));
}

function delComplaint(id){
  if(!confirm("यह शिकायत हमेशा के लिए हट जाएगी। पक्का?")) return;
  db.collection("complaints").doc(id).delete().then(() => {
    loadAdmin(); 
    if(typeof loadPublicComplaints === 'function') loadPublicComplaints(); 
    if(typeof loadStats === 'function') loadStats();
  }).catch(err => alert("त्रुटि: " + err.message));
}
