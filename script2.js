function go(p){
var ps=['home','worker','news','jobs','comp','wage','calc','shikayat','mycomp','laws','courses','numbers','shops','alert','post','admin','help'];
ps.forEach(function(x){var e=document.getElementById('p-'+x),n=document.getElementById('n-'+x);if(e)e.classList.add('h');if(n)n.classList.remove('active');});
document.getElementById('p-'+p).classList.remove('h');
document.getElementById('n-'+p).classList.add('active');
window.scrollTo({top:0,behavior:'smooth'});
if(p=='home'){sts();rht();rPublic();}
if(p=='worker')rWorkers();
if(p=='news')rnews();
if(p=='jobs')rad('job');
if(p=='comp')rcomp();
if(p=='mycomp')rmc();
if(p=='alert')ral();
if(p=='numbers')rnumbers();
if(p=='courses')rCourses();
if(p=='shops')rShops();
}

function sts(){
document.getElementById('sa').innerText=AD.length;
document.getElementById('sc').innerText=SC.length;
document.getElementById('sco').innerText=C.length;
document.getElementById('sw2').innerText=WK.length;
}

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
id:Date.now(),
name:document.getElementById('wN').value.trim(),
phone:document.getElementById('wP').value.trim(),
skill:document.getElementById('wS').value,
exp:document.getElementById('wE').value||0,
village:document.getElementById('wV').value.trim(),
block:document.getElementById('wB').value.trim(),
district:document.getElementById('wD').value.trim(),
state:document.getElementById('wSt').value.trim(),
address:'',
photo:wPhotoData,
date:new Date().toLocaleDateString('hi-IN')
};
WK.push(w);
ss();
document.getElementById('sm3').style.display='block';
e.target.reset();
wPhotoData='';
document.getElementById('wPhotoPreview').innerHTML='';
setTimeout(function(){document.getElementById('sm3').style.display='none';},5000);
sts();
}

function rWorkers(){
var b=document.getElementById('wList');
if(!b)return;
var q=(document.getElementById('wSearch')?document.getElementById('wSearch').value:'').toLowerCase().trim();
var list=WK.filter(function(w){
if(!q)return true;
return (w.district||'').toLowerCase().indexOf(q)>-1||
(w.village||'').toLowerCase().indexOf(q)>-1||
(w.block||'').toLowerCase().indexOf(q)>-1||
(w.state||'').toLowerCase().indexOf(q)>-1||
(w.name||'').toLowerCase().indexOf(q)>-1||
(w.skill||'').toLowerCase().indexOf(q)>-1;
});
document.getElementById('wCount').innerText='कुल मजदूर: '+list.length;
if(list.length==0){
b.innerHTML='<div class="no-worker"><b>😕 कोई मजदूर नहीं मिला</b>इस जगह का कोई मजदूर रजिस्टर नहीं है।</div>';
return;
}
b.innerHTML=list.map(function(w){
var photo=w.photo?'<img src="'+w.photo+'">':'👷';
var waMsg='👷 मजदूर (Apana India):\n\nनाम: '+w.name+'\nहुनर: '+w.skill+'\n📱 '+w.phone+'\n📍 '+w.village+', '+w.block+', '+w.district;
var wa='https://wa.me/?text='+encodeURIComponent(waMsg);
return '<div class="worker-card">'+
'<div class="w-photo">'+photo+'</div>'+
'<div class="w-info">'+
'<h3>'+w.name+'</h3>'+
'<span class="w-skill">'+w.skill+(w.exp>0?' • '+w.exp+' साल':'')+'</span>'+
'<p>📍 '+w.village+', '+w.block+'</p>'+
'<p>🏠 '+w.district+', '+w.state+'</p>'+
'<div class="w-btns"><a href="tel:'+w.phone+'" class="w-call">📞 कॉल</a><a href="'+wa+'" target="_blank" class="w-wa">📱 WhatsApp</a></div>'+
'</div></div>';
}).join('');
}

function sw(c,b){
CAT=c;
document.querySelectorAll('.tt').forEach(function(x){x.classList.remove('active');});
b.classList.add('active');
rnews();
}

function rnews(){
var l=document.getElementById('nl');
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
var i=ND.trending.slice(0,3);
b.innerHTML=i.map(function(n){return '<div class="nw tr" onclick="go(\'news\')"><div class="ni">'+n.icon+'</div><div><div class="nt">'+n.title+'</div><div class="nd">'+n.desc+'</div></div></div>';}).join('');
}

function updTk(){
var t=document.getElementById('tk');if(!t)return;
var a=[].concat(ND.breaking,ND.trending,ND.hartal);
t.innerText=a.map(function(n){return '• '+n.title;}).join('   ');
}

function rcomp(){
var b=document.getElementById('cl');
var q=(document.getElementById('cs')?document.getElementById('cs').value:'').toLowerCase();
var f=C.filter(function(c){return !q||c.name.toLowerCase().indexOf(q)>-1;});
if(f.length==0){b.innerHTML='<p class="note">कोई कंपनी नहीं।</p>';return;}
f.sort(function(a,b){return b.complaints-a.complaints;});
b.innerHTML=f.map(function(c){return cc(c);}).join('');
}

function cc(c){
var cl=c.rating=='green'?'':(c.rating=='yellow'?'ry':'rr');
var bd=c.rating=='green'?'<span class="bd bg">🟢 सुरक्षित</span>':(c.rating=='yellow'?'<span class="bd by">🟡 सावधान</span>':'<span class="bd br">🔴 अलर्ट</span>');
var waMsg='🏢 '+c.name+'\n📍 '+c.address+'\n📢 शिकायतें: '+c.complaints+'\n\nApana India';
var wa='https://wa.me/?text='+encodeURIComponent(waMsg);
return '<div class="cp '+cl+'"><h3>'+c.name+' '+bd+'</h3><p>📍 '+c.address+' | '+(c.type||'')+'</p><p>📢 शिकायतें: <b>'+c.complaints+'</b></p><a href="'+wa+'" target="_blank" class="btn-wa">📱 शेयर</a></div>';
}

function rad(cat){
var b=document.getElementById('jl');if(!b)return;
var f=AD.filter(function(a){return a.cat==cat;});
b.innerHTML=f.length==0?'<p class="note">कोई विज्ञापन नहीं।</p>':f.map(function(a){
var waMsg='📌 '+a.title+'\n'+a.detail+'\n📞 '+a.phone+'\n\nApana India';
var wa='https://wa.me/?text='+encodeURIComponent(waMsg);
return '<div class="item"><h3>'+a.title+'</h3><p>'+a.detail+'</p><p>📍 '+(a.district||'')+' '+(a.state||'')+'</p><p>📞 <a href="tel:'+a.phone+'" style="color:#138808;font-weight:700">'+a.phone+'</a></p><a href="'+wa+'" target="_blank" class="btn-wa">📱 WhatsApp</a></div>';
}).join('');
}

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

function calcWage(){
var state=document.getElementById('calcState').value;
var days=parseFloat(document.getElementById('calcDays').value)||0;
var ot=parseFloat(document.getElementById('calcOT').value)||0;
var box=document.getElementById('calcResult');
if(!state||!days){box.innerHTML='';return;}
var daily=parseFloat(state);
var normal=Math.round(daily*days);
var hourly=Math.round(daily/8);
var otAmt=Math.round(hourly*2*ot);
var total=normal+otAmt;
var isNTPC=(daily==556||daily==650||daily==781||daily==918);
var label=isNTPC?'🏢 NTPC रिहंद':'न्यूनतम/मनरेगा दर';
box.innerHTML='<div class="calc-box"><div style="text-align:center;font-size:12px;color:#666;margin-bottom:6px">'+label+'</div><div class="row"><span>दैनिक मजदूरी</span><span>₹'+daily+'</span></div><div class="row"><span>कुल दिन</span><span>'+days+'</span></div><div class="row"><span>सामान्य मजदूरी</span><span>₹'+normal+'</span></div>'+(ot>0?'<div class="row"><span>ओवरटाइम ('+ot+'×2x)</span><span>₹'+otAmt+'</span></div>':'')+'<div class="row"><span>कुल मिलना चाहिए</span><span>₹'+total+'</span></div><div class="big">₹'+total+'</div>'+(isNTPC?'<div class="warning">⚠️ ओवरटाइम 2x। PF, बोनस अलग।</div>':'')+'<a href="https://wa.me/?text='+encodeURIComponent('मजदूरी (Apana India):\n'+label+'\n₹'+daily+'/दिन × '+days+' दिन\nकुल: ₹'+total)+'" target="_blank" class="btn-wa">📱 WhatsApp भेजें</a></div>';
  }
