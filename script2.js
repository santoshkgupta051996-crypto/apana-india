// ================= NAVIGATION =================
function go(p){
var ps=['home','worker','comp','contractor','rental','news','jobs','wage','calc','idcard','land','health','shikayat','mycomp','laws','yojana','courses','shops','panchayat','suggest','numbers','alert','post','admin','login','help'];
ps.forEach(function(x){
var e=document.getElementById('p-'+x),n=document.getElementById('n-'+x);
if(e)e.classList.add('h');
if(n)n.classList.remove('active');
});
var pageEl=document.getElementById('p-'+p);
var navEl=document.getElementById('n-'+p);
if(pageEl)pageEl.classList.remove('h');
if(navEl)navEl.classList.add('active');
window.scrollTo({top:0,behavior:'smooth'});
if(p=='home'){sts();rht();rPublic();rTopSuggest();}
if(p=='worker')rWorkers();
if(p=='comp')rcomp();
if(p=='contractor')rCont();
if(p=='rental')rRentals();
if(p=='news')rnews();
if(p=='jobs')rad('job');
if(p=='mycomp')rmc();
if(p=='alert')ral();
if(p=='numbers')rnumbers();
if(p=='courses')rCourses();
if(p=='shops')rShops();
if(p=='panchayat')rPanch();
if(p=='suggest')rSuggest();
}

// ================= STATS =================
function sts(){
db.collection('workers').get().then(function(s){document.getElementById('sw2').innerText=s.size;});
db.collection('companies').get().then(function(s){document.getElementById('sco').innerText=s.size;});
db.collection('complaints').get().then(function(s){document.getElementById('sc').innerText=s.size;});
db.collection('ads').get().then(function(s){document.getElementById('sa').innerText=s.size;});
}

// ================= WORKER TAB =================
function wTab(t,b){
document.querySelectorAll('#p-worker .tt').forEach(function(x){x.classList.remove('active');});
b.classList.add('active');
if(t=='list'){document.getElementById('wListTab').classList.remove('h');document.getElementById('wRegTab').classList.add('h');rWorkers();}
else{document.getElementById('wListTab').classList.add('h');document.getElementById('wRegTab').classList.remove('h');}
}

function previewPhoto(e){
var file=e.target.files[0];if(!file)return;
var reader=new FileReader();
reader.onload=function(ev){wPhotoData=ev.target.result;document.getElementById('wPhotoPreview').innerHTML='<img src="'+wPhotoData+'">';};
reader.readAsDataURL(file);
}

function regWorker(e){
e.preventDefault();
var w={
name:document.getElementById('wN').value.trim(),
phone:document.getElementById('wP').value.trim(),
skill:document.getElementById('wS').value,
exp:document.getElementById('wE').value||0,
village:document.getElementById('wV').value.trim(),
block:document.getElementById('wB').value.trim(),
district:document.getElementById('wD').value.trim(),
state:document.getElementById('wSt').value.trim(),
photo:wPhotoData,
date:new Date().toLocaleDateString('hi-IN'),
user:currentUser?currentUser.uid:'guest'
};
db.collection('workers').add(w).then(function(){
document.getElementById('sm3').style.display='block';
e.target.reset();wPhotoData='';document.getElementById('wPhotoPreview').innerHTML='';
setTimeout(function(){document.getElementById('sm3').style.display='none';},5000);
sts();
}).catch(function(err){alert('❌ Error: '+err.message);});
}

function rWorkers(){
var b=document.getElementById('wList');if(!b)return;
b.innerHTML='<p class="note">🔄 लोड हो रहा है...</p>';
var q=(document.getElementById('wSearch')?document.getElementById('wSearch').value:'').toLowerCase().trim();
db.collection('workers').get().then(function(snap){
var list=[];
snap.forEach(function(doc){var w=doc.data();w.id=doc.id;
if(!q)list.push(w);
else if((w.district||'').toLowerCase().indexOf(q)>-1||(w.village||'').toLowerCase().indexOf(q)>-1||(w.block||'').toLowerCase().indexOf(q)>-1||(w.state||'').toLowerCase().indexOf(q)>-1||(w.name||'').toLowerCase().indexOf(q)>-1||(w.skill||'').toLowerCase().indexOf(q)>-1)list.push(w);
});
document.getElementById('wCount').innerText='कुल: '+list.length;
if(list.length==0){b.innerHTML='<div class="no-worker"><b>😕 कोई मजदूर नहीं मिला</b>इस जगह का कोई मजदूर रजिस्टर नहीं।</div>';return;}
b.innerHTML=list.map(function(w){
var photo=w.photo?'<img src="'+w.photo+'">':'👷';
return '<div class="worker-card"><div class="w-photo">'+photo+'</div><div class="w-info"><h3>'+w.name+'</h3><span class="w-skill">'+w.skill+(w.exp>0?' • '+w.exp+' साल':'')+'</span><p>📍 '+w.village+', '+w.block+'</p><p>🏠 '+w.district+', '+w.state+'</p><div class="w-btns"><a href="tel:'+w.phone+'" class="w-call">📞 कॉल</a><a href="'+wa+'" target="_blank" class="w-wa">📱 WhatsApp</a><button onclick="editWorker(\''+w.id+'\')" style="background:#FF9933;color:#fff;border:none;padding:5px 10px;border-radius:20px;font-size:11px;font-weight:700;margin-top:5px;margin-right:5px;cursor:pointer">✏️ हुनर बदलें</button></div></div></div>';
return '<div class="worker-card"><div class="w-photo">'+photo+'</div><div class="w-info"><h3>'+w.name+'</h3><span class="w-skill">'+w.skill+(w.exp>0?' • '+w.exp+' साल':'')+'</span><p>📍 '+w.village+', '+w.block+'</p><p>🏠 '+w.district+', '+w.state+'</p><div class="w-btns"><a href="tel:'+w.phone+'" class="w-call">📞 कॉल</a><a href="'+wa+'" target="_blank" class="w-wa">📱 WhatsApp</a></div></div></div>';
}).join('');
}).catch(function(err){b.innerHTML='<p style="color:#b30000">❌ Error: '+err.message+'</p>';});
}

// ================= COMPANY TAB =================
function cTab(t,b){
document.querySelectorAll('#p-comp .tt').forEach(function(x){x.classList.remove('active');});
b.classList.add('active');
if(t=='list'){document.getElementById('cListTab').classList.remove('h');document.getElementById('cRegTab').classList.add('h');rcomp();}
else{document.getElementById('cListTab').classList.add('h');document.getElementById('cRegTab').classList.remove('h');}
}

function regComp(e){
e.preventDefault();
var c={
name:document.getElementById('cmpN').value.trim(),
owner:document.getElementById('cmpO').value.trim(),
phone:document.getElementById('cmpP').value.trim(),
type:document.getElementById('cmpT').value,
address:document.getElementById('cmpA').value.trim(),
district:document.getElementById('cmpD').value.trim(),
state:document.getElementById('cmpS').value.trim(),
complaints:0,
rating:'green',
date:new Date().toLocaleDateString('hi-IN'),
user:currentUser?currentUser.uid:'guest'
};
db.collection('companies').add(c).then(function(){
document.getElementById('sm4').style.display='block';
e.target.reset();
setTimeout(function(){document.getElementById('sm4').style.display='none';},5000);
sts();
}).catch(function(err){alert('❌ Error: '+err.message);});
}

function rcomp(){
var b=document.getElementById('cl');if(!b)return;
b.innerHTML='<p class="note">🔄 लोड हो रहा है...</p>';
var q=(document.getElementById('cs')?document.getElementById('cs').value:'').toLowerCase();
db.collection('companies').get().then(function(snap){
var list=[];
snap.forEach(function(doc){var c=doc.data();c.id=doc.id;list.push(c);});
if(q)list=list.filter(function(c){return c.name.toLowerCase().indexOf(q)>-1||(c.district||'').toLowerCase().indexOf(q)>-1;});
if(list.length==0){b.innerHTML='<p class="note">कोई कंपनी नहीं।</p>';return;}
list.sort(function(a,b){return b.complaints-a.complaints;});
b.innerHTML=list.map(function(c){return cc(c);}).join('');
}).catch(function(err){b.innerHTML='<p style="color:#b30000">❌ Error: '+err.message+'</p>';});
}

function cc(c){
var cl=c.rating=='green'?'':(c.rating=='yellow'?'ry':'rr');
var bd=c.rating=='green'?'<span class="bd bg">🟢 सुरक्षित</span>':(c.rating=='yellow'?'<span class="bd by">🟡 सावधान</span>':'<span class="bd br">🔴 अलर्ट</span>');
var waMsg='🏢 '+c.name+'\n📍 '+c.address+'\n📢 शिकायतें: '+c.complaints+'\n\nApana India';
var wa='https://wa.me/?text='+encodeURIComponent(waMsg);
return '<div class="cp '+cl+'"><h3>'+c.name+' '+bd+'</h3><p>📍 '+c.address+' | '+(c.type||'')+'</p>'+(c.owner?'<p>👤 '+c.owner+'</p>':'')+'<p>📢 शिकायतें: <b>'+c.complaints+'</b></p>'+(c.phone?'<p>📞 <a href="tel:'+c.phone+'" style="color:#138808;font-weight:700">'+c.phone+'</a></p>':'')+'<a href="'+wa+'" target="_blank" class="btn-wa">📱 शेयर</a></div>';
}
// ================= NEWS =================
function sw(c,b){
CAT=c;
document.querySelectorAll('#p-news .tt').forEach(function(x){x.classList.remove('active');});
b.classList.add('active');
rnews();
}

function rnews(){
var l=document.getElementById('nl');if(!l)return;
var q=(document.getElementById('ns')?document.getElementById('ns').value:'').toLowerCase();
var items=ND[CAT]||[];
if(q)items=items.filter(function(n){return n.title.toLowerCase().indexOf(q)>-1||n.desc.toLowerCase().indexOf(q)>-1;});
if(items.length==0){l.innerHTML='<p class="note">कोई खबर नहीं।</p>';return;}
l.innerHTML=items.map(function(n,idx){
var ec=CAT=='trending'?'tr':(CAT=='hartal'?'ha':'');
return '<div class="nw '+ec+'" onclick="showNews(\''+CAT+'\','+idx+')"><div class="ni">'+n.icon+'</div><div><div class="nt">'+n.title+'</div><div class="nd">'+n.desc+'</div><div class="nm">📅 '+n.date+' • 📰 '+n.src+'</div></div></div>';
}).join('');
}

function showNews(cat,idx){
var n=ND[cat][idx];
var msg='📰 '+n.title+'\n\n'+n.desc+'\n\n📅 '+n.date+'\n📰 '+n.src+'\n\nApana India से देखा';
var wa='https://wa.me/?text='+encodeURIComponent(msg);
var html='<div style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.75);z-index:100;display:flex;align-items:center;justify-content:center;padding:15px" onclick="this.remove()"><div style="background:#fff;border-radius:12px;padding:18px;max-width:450px" onclick="event.stopPropagation()"><h2 style="color:#000080;font-size:16px;margin-bottom:10px">'+n.title+'</h2><p style="font-size:13px;margin-bottom:10px">'+n.desc+'</p><p style="font-size:11px;color:#666;margin-bottom:12px">📅 '+n.date+' • 📰 '+n.src+'</p><a href="'+wa+'" target="_blank" class="btn-wa">📱 WhatsApp शेयर</a> <button onclick="this.closest(\'div[style*=fixed]\').remove()" style="background:#666;color:#fff;border:none;padding:6px 12px;border-radius:4px;font-size:12px;font-weight:700;cursor:pointer;margin-top:6px">बंद</button></div></div>';
document.body.insertAdjacentHTML('beforeend',html);
}

function rht(){
var b=document.getElementById('ht');if(!b)return;
b.innerHTML=ND.trending.slice(0,3).map(function(n){return '<div class="nw tr" onclick="go(\'news\')"><div class="ni">'+n.icon+'</div><div><div class="nt">'+n.title+'</div><div class="nd">'+n.desc+'</div></div></div>';}).join('');
}

function updTk(){
var t=document.getElementById('tk');if(!t)return;
var a=[].concat(ND.breaking,ND.trending,ND.hartal);
t.innerText=a.map(function(n){return '• '+n.title;}).join('   ');
}

// ================= ADS =================
function rad(cat){
var b=document.getElementById('jl');if(!b)return;
b.innerHTML='<p class="note">🔄 लोड हो रहा है...</p>';
db.collection('ads').get().then(function(snap){
var f=[];
snap.forEach(function(doc){var a=doc.data();a.id=doc.id;if(a.cat==cat)f.push(a);});
if(f.length==0){b.innerHTML='<p class="note">कोई विज्ञापन नहीं।</p>';return;}
b.innerHTML=f.map(function(a){
var waMsg='📌 '+a.title+'\n'+a.detail+'\n📞 '+a.phone+'\n\nApana India';
var wa='https://wa.me/?text='+encodeURIComponent(waMsg);
return '<div class="item"><h3>'+a.title+'</h3><p>'+a.detail+'</p><p>📍 '+(a.district||'')+' '+(a.state||'')+'</p><p>📞 <a href="tel:'+a.phone+'" style="color:#138808;font-weight:700">'+a.phone+'</a></p><a href="'+wa+'" target="_blank" class="btn-wa">📱 WhatsApp</a></div>';
}).join('');
}).catch(function(err){b.innerHTML='<p style="color:#b30000">❌ Error: '+err.message+'</p>';});
}

// ================= WAGE RATES =================
function showWageRate(){
var comp=document.getElementById('wageCompany').value;
var box=document.getElementById('wageRateResult');
var mBox=document.getElementById('mgnregaStateBox');
mBox.classList.add('h');
if(!comp){box.innerHTML='';return;}
if(comp=='ntpc'){
box.innerHTML='<div class="wage-card"><h3>🏢 NTPC रिहंद (सोनभद्र) - अनुमानित</h3><div class="rate-row"><span>USW (अकुशल)</span><span>₹500-556/दिन</span></div><div class="rate-row"><span>SSW (अर्ध-कुशल)</span><span>₹600-650/दिन</span></div><div class="rate-row"><span>SW (कुशल)</span><span>₹700-781/दिन</span></div><div class="rate-row"><span>HSW (अति कुशल)</span><span>₹800-918/दिन</span></div><div class="big-rate">₹556/दिन से शुरू</div><div class="warning">⚠️ ओवरटाइम 2x मिलेगा। 8 घंटे से ज्यादा काम गैरकानूनी।</div><p class="note">📌 स्रोत: NTPC रिहंद श्रम रिपोर्ट्स।</p></div>';
}
else if(comp=='reliance'){
box.innerHTML='<div class="wage-card yellow"><h3>🏢 Reliance Industries - अनुमानित</h3><div class="rate-row"><span>हेल्पर / लेबर</span><span>₹600-800/दिन</span></div><div class="rate-row"><span>राजमिस्त्री</span><span>₹700-800/दिन</span></div><div class="rate-row"><span>सरिया फिटर</span><span>₹700/दिन</span></div><div class="rate-row"><span>शटरिंग कारपेंटर</span><span>₹700/दिन</span></div><div class="warning">⚠️ ओवरटाइम 2x। 8 घंटे से ज्यादा पर 2x दर।</div><p class="note">📌 स्रोत: जामनगर प्रोजेक्ट जॉब पोस्टिंग्स।</p></div>';
}
else if(comp=='mgnrega'){
mBox.classList.remove('h');
box.innerHTML='<p class="note">कृपया नीचे से राज्य चुनें।</p>';
}
}

function showMgnregaRate(){
var rate=document.getElementById('mgnregaState').value;
var box=document.getElementById('mgnregaResult');
if(!rate){box.innerHTML='';return;}
box.innerHTML='<div class="wage-card"><h3>🌾 मनरेगा दैनिक मजदूरी</h3><div class="big-rate">₹'+rate+'/दिन</div><p style="font-size:12px;color:#555;text-align:center">केंद्र सरकार द्वारा तय दर</p><div class="warning">⚠️ अब किसी राज्य में ₹300 से कम नहीं।</div></div>';
}
// ================= CALCULATOR =================
function calcWage(){
var manual=parseFloat(document.getElementById('calcManual').value)||0;
var state=document.getElementById('calcState').value;
var days=parseFloat(document.getElementById('calcDays').value)||0;
var ot=parseFloat(document.getElementById('calcOT').value)||0;
var otRate=parseFloat(document.getElementById('calcOTRate').value)||2;
var applyPF=document.getElementById('calcPF').checked;
var box=document.getElementById('calcResult');
var daily=0,label='';
if(manual>0){daily=manual;label='✍️ आपका रेट';}
else if(state){daily=parseFloat(state);var isN=(daily==556||daily==650||daily==781||daily==918);label=isN?'🏢 NTPC रिहंद':'न्यूनतम/मनरेगा दर';}
if(!daily||!days){box.innerHTML='';return;}

var basic=Math.round(daily*days);
var nh=Math.round(basic*0.0096);
var el=Math.round(basic*0.05);
var bonus=Math.round(basic*0.0833);
var rb=Math.round(basic*0.048);
var medical=Math.round(basic*0.005);
var otAmt=Math.round((daily/8)*otRate*ot);
var total=basic+nh+el+bonus+rb+medical+otAmt;
var epf=applyPF?Math.round(basic*0.12):0;
var esic=applyPF?Math.round(basic*0.0075):0;
var ded=epf+esic;
var net=total-ded;

window.lastCalc={daily:daily,days:days,label:label,basic:basic,nh:nh,el:el,bonus:bonus,rb:rb,medical:medical,ot:ot,otRate:otRate,otAmt:otAmt,total:total,epf:epf,esic:esic,ded:ded,net:net};

var html='<div class="calc-box">';
html+='<div style="text-align:center;font-size:12px;color:#666;margin-bottom:6px">'+label+'</div>';
html+='<div style="margin-top:8px;font-size:12px;color:#138808;font-weight:700">➕ कमाई (Earnings)</div>';
html+='<div class="row"><span>Basic ('+days+' × ₹'+daily+')</span><span>₹'+basic+'</span></div>';
html+='<div class="row"><span>NH (0.96%)</span><span>₹'+nh+'</span></div>';
html+='<div class="row"><span>EL (5%)</span><span>₹'+el+'</span></div>';
html+='<div class="row"><span>बोनस (8.33%)</span><span>₹'+bonus+'</span></div>';
html+='<div class="row"><span>RB (4.8%)</span><span>₹'+rb+'</span></div>';
html+='<div class="row"><span>Medical (0.5%)</span><span>₹'+medical+'</span></div>';
if(ot>0){html+='<div class="row"><span>OT ('+ot+' घं × '+otRate+'x)</span><span>₹'+otAmt+'</span></div>';}
html+='<div class="row" style="background:#e6f9e6;font-size:15px"><span><b>कुल वेतन (Total)</b></span><span><b style="color:#138808">₹'+total+'</b></span></div>';
if(applyPF){
html+='<div style="margin-top:12px;font-size:12px;color:#d40000;font-weight:700">➖ कटौती (Deductions)</div>';
html+='<div class="row" style="color:#d40000"><span>EPF (12% of Basic)</span><span>- ₹'+epf+'</span></div>';
html+='<div class="row" style="color:#d40000"><span>ESIC (0.75% of Basic)</span><span>- ₹'+esic+'</span></div>';
html+='<div class="row" style="background:#ffe6e6"><span><b>कुल कटौती</b></span><span><b style="color:#d40000">- ₹'+ded+'</b></span></div>';
}
html+='<div style="margin-top:12px;background:#d4f8d4;padding:10px;border-radius:8px;text-align:center">';
html+='<div style="font-size:13px;color:#0a7a0a;font-weight:700">✅ हाथ में मिलेगा (Net Amount)</div>';
html+='<div style="font-size:34px;color:#138808;font-weight:800;margin-top:6px">₹'+net+'</div>';
html+='</div>';
html+='<a href="https://wa.me/?text='+encodeURIComponent('📋 मजदूरी हिसाब (Apana India)\n\nBasic: ₹'+basic+'\nNH: ₹'+nh+'\nEL: ₹'+el+'\nBonus: ₹'+bonus+'\nRB: ₹'+rb+'\nMedical: ₹'+medical+(ot>0?'\nOT: ₹'+otAmt:'')+'\n\nTotal: ₹'+total+'\nEPF: ₹'+epf+'\nESIC: ₹'+esic+'\n\n✅ हाथ में: ₹'+net)+'" target="_blank" class="btn-wa">📱 WhatsApp भेजें</a>';
html+='</div>';
box.innerHTML=html;
}

// ================= CALC PDF DOWNLOAD =================
function downloadCalcPDF(){
if(!window.lastCalc){alert('पहले हिसाब लगाएं!');return;}
var d=window.lastCalc;
var txt='APANA INDIA - मजदूरी हिसाब\n';
txt+='==============================\n\n';
txt+='रेट: '+d.label+'\n';
txt+='दैनिक: ₹'+d.daily+'\n';
txt+='दिन: '+d.days+'\n\n';
txt+='--- कमाई ---\n';
txt+='Basic: ₹'+d.basic+'\n';
txt+='NH (0.96%): ₹'+d.nh+'\n';
txt+='EL (5%): ₹'+d.el+'\n';
txt+='बोनस (8.33%): ₹'+d.bonus+'\n';
txt+='RB (4.8%): ₹'+d.rb+'\n';
txt+='Medical (0.5%): ₹'+d.medical+'\n';
if(d.ot>0)txt+='OT ('+d.ot+'×'+d.otRate+'x): ₹'+d.otAmt+'\n';
txt+='कुल वेतन: ₹'+d.total+'\n\n';
txt+='--- कटौती ---\n';
txt+='EPF (12%): -₹'+d.epf+'\n';
txt+='ESIC (0.75%): -₹'+d.esic+'\n';
txt+='कुल कटौती: -₹'+d.ded+'\n\n';
txt+='==============================\n';
txt+='✅ हाथ में मिलेगा: ₹'+d.net+'\n';
txt+='==============================\n\n';
txt+='Apana India - रोजगार भी, मजदूरों को न्याय भी\n';
txt+='https://santoshkgupta051996-crypto.github.io/apanaindia/';

var blob=new Blob([txt],{type:'text/plain;charset=utf-8'});
var url=URL.createObjectURL(blob);
var a=document.createElement('a');
a.href=url;
a.download='Apana-India-Wage-Slip.txt';
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
setTimeout(function(){URL.revokeObjectURL(url);},1000);
alert('✅ हिसाब डाउनलोड हो गया! WhatsApp पर भी भेज सकते हैं।');
}

// ================= COMPLAINT STATE HELP =================
function showStateHelp(){
var s=document.getElementById('cState').value;
var box=document.getElementById('stateHelp');
if(!s||!STATE_NUMBERS[s]){box.innerHTML='';return;}
var info=STATE_NUMBERS[s];
box.innerHTML='<div class="wage-card"><h3>📞 '+info.name+' श्रम विभाग</h3>'+
'<div class="rate-row"><span>हेल्पलाइन</span><span>'+info.num+'</span></div>'+
(info.extra?'<div class="rate-row"><span>अतिरिक्त</span><span>'+info.extra+'</span></div>':'')+
'<div style="margin-top:10px"><a href="tel:'+info.num+'" class="btn-wa" style="background:#138808;margin-right:5px">📞 कॉल करें</a>'+
'<a href="https://wa.me/91'+info.num+'" target="_blank" class="btn-wa">📱 WhatsApp</a></div>'+
'<p class="note" style="margin-top:8px">💡 अगर कॉल न लगे तो केंद्रीय हेल्पलाइन 14434 पर कॉल करें।</p></div>';
}
// ================= EDIT FUNCTIONS =================
function editWorker(id){
var newSkill=prompt('✏️ नया हुनर लिखें (जैसे: वेल्डर, फिटर, राजमिस्त्री, ड्राइवर):');
if(!newSkill)return;
db.collection('workers').doc(id).update({skill:newSkill.trim()}).then(function(){
alert('✅ हुनर अपडेट हो गया! अब आप '+newSkill+' हैं।');
rWorkers();
}).catch(function(err){alert('❌ Error: '+err.message);});
}

function editCompany(id){
var newType=prompt('✏️ कंपनी का काम का प्रकार बदलें (जैसे: निर्माण, स्टील, कोयला):');
if(!newType)return;
db.collection('companies').doc(id).update({type:newType.trim()}).then(function(){
alert('✅ कंपनी का प्रकार अपडेट हो गया!');
rcomp();
}).catch(function(err){alert('❌ Error: '+err.message);});
}
