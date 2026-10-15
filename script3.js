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
}).catch(function(err){alert('❌ Error: '+err.message);});
}
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
function suba(e){
e.preventDefault();
var a={
title:document.getElementById('at').value.trim(),
cat:document.getElementById('ac').value,
detail:document.getElementById('ad').value.trim(),
phone:document.getElementById('ap').value.trim(),
state:document.getElementById('ast').value.trim(),
district:document.getElementById('adi').value.trim(),
date:new Date().toLocaleDateString('hi-IN')
};
db.collection('ads').add(a).then(function(){
document.getElementById('sm2').style.display='block';
e.target.reset();
setTimeout(function(){document.getElementById('sm2').style.display='none';},5000);
sts();
}).catch(function(err){alert('❌ Error: '+err.message);});
}
