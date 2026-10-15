function subc(e){
e.preventDefault();
var cn=document.getElementById('cn').value.trim();
var c={
company:cn,
address:document.getElementById('ca').value.trim(),
worker:document.getElementById('wn').value.trim(),
phone:document.getElementById('wp').value.trim(),
type:document.getElementById('ct').value,
detail:document.getElementById('cd').value.trim(),
proof:document.getElementById('cp').value.trim(),
date:new Date().toLocaleDateString('hi-IN'),
status:'pending'
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
e.target.reset();
setTimeout(function(){document.getElementById('sm1').style.display='none';},5000);
}).catch(function(err){
alert('❌ Error: '+err.message);
});
}
}
function rmc(){
var b=document.getElementById('mcl');if(!b)return;
if(SC.length==0){b.innerHTML='<p class="note">कोई शिकायत नहीं।</p>';return;}
b.innerHTML=SC.map(function(c){
var st=c.status||'pending';
var stTxt=st=='approved'?'✅ स्वीकृत':(st=='rejected'?'❌ रद्द':'⏳ जाँच बाकी');
var stCls=st=='approved'?'bg':(st=='rejected'?'br':'by');
return '<div class="cp"><h3>'+c.name+' <span class="bd '+stCls+'">'+stTxt+'</span></h3><p>📍 '+c.address+'</p><p>📋 '+c.type+'</p><p>💬 '+c.detail+'</p><p style="font-size:10px;color:#999">दर्ज: '+c.date+'</p></div>';
}).reverse().join('');
}
function rPublic(){
var b=document.getElementById('publicComplaints');if(!b)return;
var approved=SC.filter(function(c){return c.status=='approved';});
if(approved.length==0){b.innerHTML='<p class="note">अभी कोई सार्वजनिक शिकायत नहीं। एडमिन जाँच के बाद दिखेंगी।</p>';return;}
b.innerHTML=approved.slice(-5).reverse().map(function(c){
var waMsg='📢 शिकायत: '+c.name+'\n📍 '+c.address+'\n📋 '+c.type+'\n💬 '+c.detail+'\n\nApana India';
var wa='https://wa.me/?text='+encodeURIComponent(waMsg);
return '<div class="cp"><h3>'+c.name+' <span class="bd bg">✅ सत्यापित</span></h3><p>📍 '+c.address+'</p><p>📋 '+c.type+'</p><p>💬 '+c.detail+'</p><p style="font-size:10px;color:#999">दर्ज: '+c.date+'</p><a href="'+wa+'" target="_blank" class="btn-wa">📱 WhatsApp</a></div>';
}).join('');
}
function scomp(){
var q=document.getElementById('sq')?document.getElementById('sq').value.toLowerCase().trim():'';
var b=document.getElementById('sr');if(!b)return;
if(!q){b.innerHTML='<p class="note">कंपनी का नाम लिखें...</p>';return;}
var f=C.filter(function(c){return c.name.toLowerCase().indexOf(q)>-1;});
b.innerHTML=f.length==0?'<p style="color:#b30000">कोई कंपनी नहीं।</p>':f.map(function(c){return cc(c);}).join('');
}
function ral(){
var b=document.getElementById('al');if(!b)return;
b.innerHTML=[].concat(C).sort(function(a,b){return b.complaints-a.complaints;}).map(function(c){return cc(c);}).join('');
}
function suba(e){
e.preventDefault();
AD.push({id:Date.now(),title:document.getElementById('at').value.trim(),cat:document.getElementById('ac').value,detail:document.getElementById('ad').value.trim(),phone:document.getElementById('ap').value.trim(),state:document.getElementById('ast').value.trim(),district:document.getElementById('adi').value.trim()});
ss();
document.getElementById('sm2').style.display='block';
e.target.reset();
setTimeout(function(){document.getElementById('sm2').style.display='none';},5000);
sts();
}function alog(){
var p=document.getElementById('apw').value;
var secret=btoa(p);
if(secret=='U29uYmhhZHJhQDIwMjY='){
document.getElementById('alb').classList.add('h');
document.getElementById('apn').classList.remove('h');
rAdmin();
}else{alert('❌ गलत पासवर्ड!');}
}
function rAdmin(){
document.getElementById('aa').innerText=AD.length;
document.getElementById('as').innerText=SC.length;
document.getElementById('aw').innerText=WK.length;
document.getElementById('ap2').innerText=C.length;
var pending=SC.filter(function(c){return !c.status||c.status=='pending';});
var approved=SC.filter(function(c){return c.status=='approved';});
var rejected=SC.filter(function(c){return c.status=='rejected';});
var bp=document.getElementById('acomplPending');
bp.innerHTML=pending.length==0?'<p class="note">कोई नई शिकायत नहीं।</p>':pending.map(function(c){
var i=SC.indexOf(c);
return '<div class="cp rr"><h3>'+c.name+'</h3><p>👷 '+c.worker+' | 📱 '+c.phone+'</p><p>📍 '+c.address+'</p><p>📋 '+c.type+'</p><p>💬 '+c.detail+'</p>'+(c.proof?'<p>🔍 '+c.proof+'</p>':'')+'<p style="font-size:10px;color:#999">दर्ज: '+c.date+'</p><div style="margin-top:8px"><button class="btn-ok" onclick="approve('+i+')">✅ स्वीकार</button><button class="btn-no" onclick="reject('+i+')">❌ रद्द</button></div></div>';
}).join('');
var ba=document.getElementById('acomplApproved');
ba.innerHTML=approved.length==0?'<p class="note">कोई स्वीकृत नहीं।</p>':approved.map(function(c){
var i=SC.indexOf(c);
return '<div class="cp"><h3>'+c.name+'</h3><p>💬 '+c.detail+'</p><button class="btn-no" onclick="reject('+i+')" style="margin-top:6px">❌ रद्द</button></div>';
}).join('');
var br=document.getElementById('acomplRejected');
br.innerHTML=rejected.length==0?'<p class="note">कोई रद्द नहीं।</p>':rejected.map(function(c){
var i=SC.indexOf(c);
return '<div class="cp"><h3>'+c.name+'</h3><p>💬 '+c.detail+'</p><button class="btn-ok" onclick="approve('+i+')" style="margin-top:6px">✅ बहाल</button></div>';
}).join('');
var bw=document.getElementById('adminWorkers');
bw.innerHTML=WK.length==0?'<p class="note">कोई मजदूर नहीं।</p>':WK.map(function(w){
return '<div class="cp"><h3>'+w.name+'</h3><p>👷 '+w.skill+' | 📱 '+w.phone+'</p><p>📍 '+w.village+', '+w.block+', '+w.district+'</p></div>';
}).join('');
}
function approve(i){SC[i].status='approved';ss();rAdmin();rPublic();alert('✅ स्वीकार! होम पर दिखेगी।');}
function reject(i){SC[i].status='rejected';ss();rAdmin();rPublic();alert('❌ रद्द।');}
function rnumbers(){
var b=document.getElementById('numbersList');if(!b)return;
b.innerHTML=NUMBERS.map(function(n){
return '<div class="num-item '+n.cls+'"><div class="info"><b>'+n.name+'</b><span>'+n.desc+'</span></div><a href="tel:'+n.num+'">📞 '+n.num+'</a></div>';
}).join('');
}
function rCourses(){
var b=document.getElementById('coursesList');if(!b)return;
b.innerHTML=COURSES.map(function(c){
var waMsg='🎓 मुझे यह कोर्स चाहिए:\n\n*'+c.name+'*\n'+c.desc+'\n💰 ₹'+c.price+'\n\nकृपया बताएं।';
var wa='https://wa.me/917398807484?text='+encodeURIComponent(waMsg);
return '<div class="course-card"><div class="c-icon">'+c.icon+'</div><div class="c-info"><h3>'+c.name+'</h3><p>'+c.desc+'</p><span class="c-price">₹'+c.price+'</span><span class="c-old">₹'+c.old+'</span></div><a href="'+wa+'" target="_blank" class="c-btn">📱 खरीदें</a></div>';
}).join('');
}
