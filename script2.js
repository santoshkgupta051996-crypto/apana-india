function go(p){
var ps=['home','worker','comp','contractor','news','jobs','wage','calc','shikayat','mycomp','laws','courses','shops','panchayat','suggest','numbers','alert','post','admin','help'];
ps.forEach(function(x){var e=document.getElementById('p-'+x),n=document.getElementById('n-'+x);if(e)e.classList.add('h');if(n)n.classList.remove('active');});
document.getElementById('p-'+p).classList.remove('h');
document.getElementById('n-'+p).classList.add('active');
window.scrollTo({top:0,behavior:'smooth'});
if(p=='home'){sts();rht();rPublic();rTopSuggest();}
if(p=='worker')rWorkers();
if(p=='comp')rcomp();
if(p=='contractor')rCont();
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
WK.push({id:Date.now(),name:document.getElementById('wN').value.trim(),phone:document.getElementById('wP').value.trim(),skill:document.getElementById('wS').value,exp:document.getElementById('wE').value||0,village:document.getElementById('wV').value.trim(),block:document.getElementById('wB').value.trim(),district:document.getElementById('wD').value.trim(),state:document.getElementById('wSt').value.trim(),photo:wPhotoData,date:new Date().toLocaleDateString('hi-IN')});
ss();
document.getElementById('sm3').style.display='block';
e.target.reset();wPhotoData='';document.getElementById('wPhotoPreview').innerHTML='';
setTimeout(function(){document.getElementById('sm3').style.display='none';},5000);
sts();
}
function rWorkers(){
var b=document.getElementById('wList');if(!b)return;
var q=(document.getElementById('wSearch')?document.getElementById('wSearch').value:'').toLowerCase().trim();
var list=WK.filter(function(w){
if(!q)return true;
return (w.district||'').toLowerCase().indexOf(q)>-1||(w.village||'').toLowerCase().indexOf(q)>-1||(w.block||'').toLowerCase().indexOf(q)>-1||(w.state||'').toLowerCase().indexOf(q)>-1||(w.name||'').toLowerCase().indexOf(q)>-1||(w.skill||'').toLowerCase().indexOf(q)>-1;
});
document.getElementById('wCount').innerText='कुल: '+list.length;
if(list.length==0){b.innerHTML='<div class="no-worker"><b>😕 कोई मजदूर नहीं मिला</b>इस जगह का कोई मजदूर रजिस्टर नहीं।</div>';return;}
b.innerHTML=list.map(function(w){
var photo=w.photo?'<img src="'+w.photo+'">':'👷';
var waMsg='👷 मजदूर (Apana India):\n\nनाम: '+w.name+'\nहुनर: '+w.skill+'\n📱 '+w.phone+'\n📍 '+w.village+', '+w.block+', '+w.district;
var wa='https://wa.me/?text='+encodeURIComponent(waMsg);
return '<div class="worker-card"><div class="w-photo">'+photo+'</div><div class="w-info"><h3>'+w.name+'</h3><span class="w-skill">'+w.skill+(w.exp>0?' • '+w.exp+' साल':'')+'</span><p>📍 '+w.village+', '+w.block+'</p><p>🏠 '+w.district+', '+w.state+'</p><div class="w-btns"><a href="tel:'+w.phone+'" class="w-call">📞 कॉल</a><a href="'+wa+'" target="_blank" class="w-wa">📱 WhatsApp</a></div></div></div>';
}).join('');
}
function cTab(t,b){
document.querySelectorAll('#p-comp .tt').forEach(function(x){x.classList.remove('active');});
b.classList.add('active');
if(t=='list'){document.getElementById('cListTab').classList.remove('h');document.getElementById('cRegTab').classList.add('h');rcomp();}
else{document.getElementById('cListTab').classList.add('h');document.getElementById('cRegTab').classList.remove('h');}
}
function regComp(e){
e.preventDefault();
C.push({name:document.getElementById('cmpN').value.trim(),owner:document.getElementById('cmpO').value.trim(),phone:document.getElementById('cmpP').value.trim(),type:document.getElementById('cmpT').value,address:document.getElementById('cmpA').value.trim(),district:document.getElementById('cmpD').value.trim(),state:document.getElementById('cmpS').value.trim(),complaints:0,rating:'green',date:new Date().toLocaleDateString('hi-IN')});
ss();
document.getElementById('sm4').style.display='block';
e.target.reset();
setTimeout(function(){document.getElementById('sm4').style.display='none';},5000);
sts();
}
function rcomp(){
var b=document.getElementById('cl');if(!b)return;
var q=(document.getElementById('cs')?document.getElementById('cs').value:'').toLowerCase();
var f=C.filter(function(c){return !q||c.name.toLowerCase().indexOf(q)>-1||(c.district||'').toLowerCase().indexOf(q)>-1;});
if(f.length==0){b.innerHTML='<p class="note">कोई कंपनी नहीं।</p>';return;}
f.sort(function(a,b){return b.complaints-a.complaints;});
b.innerHTML=f.map(function(c){return cc(c);}).join('');
}
function cc(c){
var cl=c.rating=='green'?'':(c.rating=='yellow'?'ry':'rr');
var bd=c.rating=='green'?'<span class="bd bg">🟢 सुरक्षित</span>':(c.rating=='yellow'?'<span class="bd by">🟡 सावधान</span>':'<span class="bd br">🔴 अलर्ट</span>');
var waMsg='🏢 '+c.name+'\n📍 '+c.address+'\n📢 शिकायतें: '+c.complaints+'\n\nApana India';
var wa='https://wa.me/?text='+encodeURIComponent(waMsg);
return '<div class="cp '+cl+'"><h3>'+c.name+' '+bd+'</h3><p>📍 '+c.address+' | '+(c.type||'')+'</p>'+(c.owner?'<p>👤 '+c.owner+'</p>':'')+'<p>📢 शिकायतें: <b>'+c.complaints+'</b></p>'+(c.phone?'<p>📞 <a href="tel:'+c.phone+'" style="color:#138808;font-weight:700">'+c.phone+'</a></p>':'')+'<a href="'+wa+'" target="_blank" class="btn-wa">📱 शेयर</a></div>';
}function sw(c,b){
CAT=c;
document.querySelectorAll('.tt').forEach(function(x){x.classList.remove('active');});
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
box.innerHTML='<div class="wage-card"><h3>🏢 NTPC रिहंद (सोनभद्र)</h3><div class="rate-row"><span>USW (अकुशल)</span><span>₹500-556/दिन</span></div><div class="rate-row"><span>SSW (अर्ध-कुशल)</span><span>₹600-650/दिन</span></div><div class="rate-row"><span>SW (कुशल)</span><span>₹700-781/दिन</span></div><div class="rate-row"><span>HSW (अति कुशल)</span><span>₹800-918/दिन</span></div><div class="big-rate">₹556/दिन से शुरू</div><div class="warning">⚠️ ओवरटाइम 2x मिलेगा।</div></div>';
}
else if(comp=='reliance'){
box.innerHTML='<div class="wage-card yellow"><h3>🏢 Reliance Industries</h3><div class="rate-row"><span>हेल्पर / लेबर</span><span>₹600-800/दिन</span></div><div class="rate-row"><span>राजमिस्त्री</span><span>₹700-800/दिन</span></div><div class="rate-row"><span>सरिया फिटर</span><span>₹700/दिन</span></div><div class="warning">⚠️ ओवरटाइम 2x।</div></div>';
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
box.innerHTML='<div class="wage-card"><h3>🌾 मनरेगा दैनिक मजदूरी</h3><div class="big-rate">₹'+rate+'/दिन</div><div class="warning">⚠️ ₹300 से कम नहीं।</div></div>';
}function calcWage(){
var manual=parseFloat(document.getElementById('calcManual').value)||0;
var state=document.getElementById('calcState').value;
var days=parseFloat(document.getElementById('calcDays').value)||0;
var ot=parseFloat(document.getElementById('calcOT').value)||0;
var otRate=parseFloat(document.getElementById('calcOTRate').value)||2;
var applyPF=document.getElementById('calcPF').checked;
var fdOn=document.getElementById('calcFinalDemand').checked;
var fdMonth=parseFloat(document.getElementById('calcMonthAmt').value)||0;
var box=document.getElementById('calcResult');
var daily=0,label='';
if(manual>0){daily=manual;label='✍️ आपका रेट';}
else if(state){daily=parseFloat(state);var isN=(daily==556||daily==650||daily==781||daily==918);label=isN?'🏢 NTPC रिहंद':'न्यूनतम/मनरेगा दर';}
if(!daily||!days){box.innerHTML='';return;}

var baseWages=Math.round(daily*days);
var nh=Math.round(baseWages*0.0096);
var el=Math.round(baseWages*0.05);
var bonus=Math.round(baseWages*0.0833);
var rb=Math.round(baseWages*0.048);
var totalAdd=nh+el+bonus+rb;
var hourly=Math.round(daily/8);
var otAmt=Math.round(hourly*otRate*ot);
var gross=baseWages+totalAdd+otAmt;
var epf=applyPF?Math.round(baseWages*0.12):0;
var esic=applyPF?Math.round(baseWages*0.0075):0;
var net=gross-epf-esic;
var fdBase=baseWages+Math.round(baseWages*0.1873);
var finalDemand=fdBase+fdMonth;

var html='<div class="calc-box">';
html+='<div style="text-align:center;font-size:12px;color:#666;margin-bottom:6px">'+label+'</div>';
html+='<div class="row"><span>दैनिक दर</span><span>₹'+daily+'</span></div>';
html+='<div class="row"><span>कुल दिन</span><span>'+days+'</span></div>';
html+='<div class="row"><span>Basic Wages</span><span>₹'+baseWages+'</span></div>';
if(ot>0){html+='<div class="row"><span>OT ('+otRate+'x)</span><span>₹'+otAmt+'</span></div>';}
html+='<div class="row" style="background:#fff5ee"><span><b>कुल वेतन (Gross)</b></span><span><b>₹'+gross+'</b></span></div>';
html+='<div style="margin-top:10px;font-size:12px;color:#888;text-align:center">— जोड़ (Additions) —</div>';
html+='<div class="row"><span>NH (0.96%)</span><span>₹'+nh+'</span></div>';
html+='<div class="row"><span>EL (5%)</span><span>₹'+el+'</span></div>';
html+='<div class="row"><span>बोनस (8.33%)</span><span>₹'+bonus+'</span></div>';
html+='<div class="row"><span>RB (4.8%)</span><span>₹'+rb+'</span></div>';
html+='<div class="row" style="background:#fff5ee"><span><b>Total Additions</b></span><span><b>₹'+totalAdd+'</b></span></div>';
if(applyPF){
html+='<div style="margin-top:10px;font-size:12px;color:#888;text-align:center">— कटौती —</div>';
html+='<div class="row" style="color:#d40000"><span>PF (12%)</span><span>- ₹'+epf+'</span></div>';
html+='<div class="row" style="color:#d40000"><span>ESIC (0.75%)</span><span>- ₹'+esic+'</span></div>';
}
html+='<div class="row" style="background:#e6f9e6"><span><b>हाथ में मिलेगा (Net)</b></span><span><b style="color:#138808">₹'+net+'</b></span></div>';
html+='<div class="big">₹'+net+'</div>';

if(fdOn){
html+='<div style="margin-top:15px;background:#ffe6e6;border:2px solid #d40000;border-radius:8px;padding:12px">';
html+='<h3 style="color:#d40000;text-align:center;margin-bottom:8px">🔴 FINAL DEMAND</h3>';
html+='<div class="row"><span>Basic ('+days+'×₹'+daily+')</span><span>₹'+baseWages+'</span></div>';
html+='<div class="row"><span>+ 18.73% भत्ते</span><span>₹'+Math.round(baseWages*0.1873)+'</span></div>';
if(fdMonth>0){html+='<div class="row"><span>+ एक महीना सैलरी</span><span>₹'+fdMonth+'</span></div>';}
html+='<div class="row" style="background:#fff;color:#d40000;font-size:16px"><span><b>कुल माँग</b></span><span><b>₹'+finalDemand+'</b></span></div>';
html+='<div class="big" style="color:#d40000">₹'+finalDemand+'</div>';
html+='</div>';
}

html+='<a href="https://wa.me/?text='+encodeURIComponent('मजदूरी (Apana India):\n\nBasic: ₹'+baseWages+'\nGross: ₹'+gross+'\nPF: ₹'+epf+'\nESIC: ₹'+esic+'\nNet: ₹'+net+(fdOn?'\n\n🔴 FINAL DEMAND: ₹'+finalDemand:''))+'" target="_blank" class="btn-wa">📱 WhatsApp भेजें</a>';
html+='</div>';
box.innerHTML=html;
}
