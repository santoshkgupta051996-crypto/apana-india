// ================= COMPLAINT SUBMIT =================
function subc(e){
e.preventDefault();
var cn=document.getElementById('cn').value.trim();
var cState=document.getElementById('cState').value;
var c={
company:cn,
address:document.getElementById('ca').value.trim(),
worker:document.getElementById('wn').value.trim(),
phone:document.getElementById('wp').value.trim(),
state:cState,
stateName:STATE_NUMBERS[cState]?STATE_NUMBERS[cState].name:'',
stateHelpline:STATE_NUMBERS[cState]?STATE_NUMBERS[cState].num:'14434',
type:document.getElementById('ct').value,
detail:document.getElementById('cd').value.trim(),
proof:document.getElementById('cp').value.trim(),
date:new Date().toLocaleDateString('hi-IN'),
status:'pending',
user:currentUser?currentUser.uid:'guest'
};
db.collection('complaints').add(c).then(function(){
db.collection('companies').where('name','==',cn).get().then(function(snap){
if(!snap.empty){
snap.forEach(function(doc){
var old=doc.data().complaints||0;
var newC=old+1;
var newR=newC>=5?'red':(newC>=2?'yellow':'green');
db.collection('companies').doc(doc.id).update({complaints:newC,rating:newR});
});
}else{
db.collection('companies').add({name:cn,address:c.address,complaints:1,rating:'yellow',type:'अन्य',date:c.date});
}
});
document.getElementById('sm1').style.display='block';
showStateHelp();
sts();
setTimeout(function(){document.getElementById('sm1').style.display='none';},8000);
}).catch(function(err){alert('❌ Error: '+err.message);});
}

// ================= MY COMPLAINTS =================
function rmc(){
var b=document.getElementById('mcl');if(!b)return;
b.innerHTML='<p class="note">🔄 लोड हो रहा है...</p>';
db.collection('complaints').get().then(function(snap){
if(snap.empty){b.innerHTML='<p class="note">कोई शिकायत नहीं।</p>';return;}
var list=[];
snap.forEach(function(doc){var c=doc.data();c.id=doc.id;list.push(c);});
b.innerHTML=list.reverse().map(function(c){
var st=c.status||'pending';
var stTxt=st=='approved'?'✅ स्वीकृत':(st=='rejected'?'❌ रद्द':'⏳ जाँच बाकी');
var stCls=st=='approved'?'bg':(st=='rejected'?'br':'by');
return '<div class="cp"><h3>'+c.company+' <span class="bd '+stCls+'">'+stTxt+'</span></h3><p>📍 '+c.address+'</p><p>📋 '+c.type+'</p><p>💬 '+c.detail+'</p><p style="font-size:10px;color:#999">दर्ज: '+c.date+'</p></div>';
}).join('');
}).catch(function(err){b.innerHTML='<p style="color:#b30000">❌ Error: '+err.message+'</p>';});
}

// ================= PUBLIC COMPLAINTS =================
function rPublic(){
var b=document.getElementById('publicComplaints');if(!b)return;
b.innerHTML='<p class="note">🔄 लोड हो रहा है...</p>';
db.collection('complaints').where('status','==','approved').get().then(function(snap){
if(snap.empty){b.innerHTML='<p class="note">अभी कोई सार्वजनिक शिकायत नहीं। एडमिन जाँच के बाद दिखेंगी।</p>';return;}
var list=[];
snap.forEach(function(doc){var c=doc.data();c.id=doc.id;list.push(c);});
b.innerHTML=list.slice(-5).reverse().map(function(c){
var waMsg='📢 शिकायत: '+c.company+'\n📍 '+c.address+'\n📋 '+c.type+'\n💬 '+c.detail+'\n\nApana India';
var wa='https://wa.me/?text='+encodeURIComponent(waMsg);
return '<div class="cp"><h3>'+c.company+' <span class="bd bg">✅ सत्यापित</span></h3><p>📍 '+c.address+'</p><p>📋 '+c.type+'</p><p>💬 '+c.detail+'</p><p style="font-size:10px;color:#999">दर्ज: '+c.date+'</p><a href="'+wa+'" target="_blank" class="btn-wa">📱 WhatsApp</a></div>';
}).join('');
}).catch(function(err){b.innerHTML='<p style="color:#b30000">❌ Error: '+err.message+'</p>';});
}

// ================= COMPANY SEARCH =================
function scomp(){
var q=document.getElementById('sq')?document.getElementById('sq').value.toLowerCase().trim():'';
var b=document.getElementById('sr');if(!b)return;
if(!q){b.innerHTML='<p class="note">कंपनी का नाम लिखें...</p>';return;}
b.innerHTML='<p class="note">🔄 लोड हो रहा है...</p>';
db.collection('companies').get().then(function(snap){
var f=[];
snap.forEach(function(doc){var c=doc.data();c.id=doc.id;if(c.name.toLowerCase().indexOf(q)>-1)f.push(c);});
b.innerHTML=f.length==0?'<p style="color:#b30000">कोई कंपनी नहीं।</p>':f.map(function(c){return cc(c);}).join('');
}).catch(function(err){b.innerHTML='<p style="color:#b30000">❌ Error: '+err.message+'</p>';});
}

// ================= ALERTS =================
function ral(){
var b=document.getElementById('al');if(!b)return;
b.innerHTML='<p class="note">🔄 लोड हो रहा है...</p>';
db.collection('companies').get().then(function(snap){
var list=[];
snap.forEach(function(doc){var c=doc.data();c.id=doc.id;list.push(c);});
list.sort(function(a,b){return (b.complaints||0)-(a.complaints||0);});
b.innerHTML=list.map(function(c){return cc(c);}).join('');
}).catch(function(err){b.innerHTML='<p style="color:#b30000">❌ Error: '+err.message+'</p>';});
}

// ================= AD SUBMIT =================
function suba(e){
e.preventDefault();
var a={
title:document.getElementById('at').value.trim(),
cat:document.getElementById('ac').value,
detail:document.getElementById('ad').value.trim(),
phone:document.getElementById('ap').value.trim(),
state:document.getElementById('ast').value.trim(),
district:document.getElementById('adi').value.trim(),
date:new Date().toLocaleDateString('hi-IN'),
user:currentUser?currentUser.uid:'guest'
};
db.collection('ads').add(a).then(function(){
document.getElementById('sm2').style.display='block';
e.target.reset();
setTimeout(function(){document.getElementById('sm2').style.display='none';},5000);
sts();
}).catch(function(err){alert('❌ Error: '+err.message);});
}
// ================= ADMIN =================
function alog(){
var p=document.getElementById('apw').value;
var secret=btoa(p);
if(secret=='U29uYmhhZHJhQDIwMjY='){
document.getElementById('alb').classList.add('h');
document.getElementById('apn').classList.remove('h');
rAdmin();
}else{alert('❌ गलत पासवर्ड!');}
}

function rAdmin(){
db.collection('ads').get().then(function(snap){document.getElementById('aa').innerText=snap.size;});
db.collection('complaints').get().then(function(snap){document.getElementById('as').innerText=snap.size;});
db.collection('workers').get().then(function(snap){document.getElementById('aw').innerText=snap.size;});
db.collection('companies').get().then(function(snap){document.getElementById('ap2').innerText=snap.size;});

db.collection('complaints').get().then(function(snap){
var pending=[],approved=[],rejected=[];
snap.forEach(function(doc){var c=doc.data();c.id=doc.id;var st=c.status||'pending';
if(st=='approved')approved.push(c);else if(st=='rejected')rejected.push(c);else pending.push(c);});
var bp=document.getElementById('acomplPending');
bp.innerHTML=pending.length==0?'<p class="note">कोई नई शिकायत नहीं।</p>':pending.map(function(c){
return '<div class="cp rr"><h3>'+c.company+'</h3><p>👷 '+c.worker+' | 📱 '+c.phone+'</p><p>📍 '+c.address+'</p><p>📋 '+c.type+'</p><p>💬 '+c.detail+'</p>'+(c.proof?'<p>🔍 '+c.proof+'</p>':'')+(c.stateName?'<p>🏛️ '+c.stateName+'</p>':'')+'<p style="font-size:10px;color:#999">दर्ज: '+c.date+'</p><div style="margin-top:8px"><button class="btn-ok" onclick="approve(\''+c.id+'\')">✅ स्वीकार</button><button class="btn-no" onclick="reject(\''+c.id+'\')">❌ रद्द</button></div></div>';
}).join('');
var ba=document.getElementById('acomplApproved');
ba.innerHTML=approved.length==0?'<p class="note">कोई स्वीकृत नहीं।</p>':approved.map(function(c){
return '<div class="cp"><h3>'+c.company+'</h3><p>💬 '+c.detail+'</p><button class="btn-no" onclick="reject(\''+c.id+'\')" style="margin-top:6px">❌ रद्द</button></div>';
}).join('');
var br=document.getElementById('acomplRejected');
br.innerHTML=rejected.length==0?'<p class="note">कोई रद्द नहीं।</p>':rejected.map(function(c){
return '<div class="cp"><h3>'+c.company+'</h3><p>💬 '+c.detail+'</p><button class="btn-ok" onclick="approve(\''+c.id+'\')" style="margin-top:6px">✅ बहाल</button></div>';
}).join('');
});

db.collection('workers').get().then(function(snap){
var bw=document.getElementById('adminWorkers');
if(snap.empty){bw.innerHTML='<p class="note">कोई मजदूर नहीं।</p>';return;}
var html='';
snap.forEach(function(doc){var w=doc.data();html+='<div class="cp"><h3>'+w.name+'</h3><p>👷 '+w.skill+' | 📱 '+w.phone+'</p><p>📍 '+w.village+', '+w.block+', '+w.district+'</p></div>';});
bw.innerHTML=html;
});
}

function approve(id){db.collection('complaints').doc(id).update({status:'approved'}).then(function(){rAdmin();rPublic();alert('✅ स्वीकृत! होम पर दिखेगी।');});}
function reject(id){db.collection('complaints').doc(id).update({status:'rejected'}).then(function(){rAdmin();rPublic();alert('❌ रद्द।');});}

// ================= NUMBERS =================
function rnumbers(){
var b=document.getElementById('numbersList');if(!b)return;
var q=(document.getElementById('numSearch')?document.getElementById('numSearch').value:'').toLowerCase();
var list=NUMBERS;
if(q)list=list.filter(function(n){return n.name.toLowerCase().indexOf(q)>-1||n.desc.toLowerCase().indexOf(q)>-1||n.num.indexOf(q)>-1;});
if(list.length==0){b.innerHTML='<p class="note">कोई नंबर नहीं मिला।</p>';return;}
b.innerHTML=list.map(function(n){
return '<div class="num-item '+n.cls+'"><div class="info"><b>'+n.name+'</b><span>'+n.desc+'</span></div><a href="tel:'+n.num+'">📞 '+n.num+'</a></div>';
}).join('');
}

// ================= COURSES =================
function rCourses(){
var b=document.getElementById('coursesList');if(!b)return;
b.innerHTML=COURSES.map(function(c){
var waMsg='🎓 मुझे यह कोर्स चाहिए:\n\n'+c.name+'\n'+c.desc+'\n💰 ₹'+c.price+'\n\nकृपया बताएं।';
var wa='https://wa.me/917398807484?text='+encodeURIComponent(waMsg);
return '<div class="course-card"><div class="c-icon">'+c.icon+'</div><div class="c-info"><h3>'+c.name+'</h3><p>'+c.desc+'</p><span class="c-price">₹'+c.price+'</span><span class="c-old">₹'+c.old+'</span></div><a href="'+wa+'" target="_blank" class="c-btn">📱 खरीदें</a></div>';
}).join('');
}
