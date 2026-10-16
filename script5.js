// ================= CONTRACTOR =================
function ctTab(t,b){
document.querySelectorAll('#p-contractor .tt').forEach(function(x){x.classList.remove('active');});
b.classList.add('active');
if(t=='list'){document.getElementById('ctListTab').classList.remove('h');document.getElementById('ctRegTab').classList.add('h');rCont();}
else{document.getElementById('ctListTab').classList.add('h');document.getElementById('ctRegTab').classList.remove('h');}
}

function regContractor(e){
e.preventDefault();
var c={
name:document.getElementById('ctN').value.trim(),
phone:document.getElementById('ctP').value.trim(),
work:document.getElementById('ctW').value.trim(),
rate:document.getElementById('ctR').value.trim(),
food:document.getElementById('ctF').value,
place:document.getElementById('ctA').value.trim(),
qty:document.getElementById('ctQ').value.trim(),
other:document.getElementById('ctO').value.trim(),
date:new Date().toLocaleDateString('hi-IN'),
user:currentUser?currentUser.uid:'guest'
};
db.collection('contractors').add(c).then(function(){
document.getElementById('sm5').style.display='block';
e.target.reset();
setTimeout(function(){document.getElementById('sm5').style.display='none';},5000);
}).catch(function(err){alert('❌ Error: '+err.message);});
}

function rCont(){
var b=document.getElementById('ctList');if(!b)return;
b.innerHTML='<p class="note">🔄 लोड हो रहा है...</p>';
var q=(document.getElementById('ctSearch')?document.getElementById('ctSearch').value:'').toLowerCase().trim();
db.collection('contractors').get().then(function(snap){
var list=[];
snap.forEach(function(doc){var c=doc.data();c.id=doc.id;list.push(c);});
if(q)list=list.filter(function(c){
return (c.name||'').toLowerCase().indexOf(q)>-1||(c.work||'').toLowerCase().indexOf(q)>-1||(c.place||'').toLowerCase().indexOf(q)>-1||(c.rate||'').toLowerCase().indexOf(q)>-1;
});
if(list.length==0){b.innerHTML='<p class="note">कोई पोस्ट नहीं मिली।</p>';return;}
b.innerHTML=list.reverse().map(function(c){
var waMsg='📋 ठेकेदार (Apana India):\n\nनाम: '+c.name+'\nकाम: '+c.work+'\nरेट: '+c.rate+'\nखाना: '+c.food+'\nजगह: '+c.place+'\nमजदूर: '+c.qty;
var wa='https://wa.me/?text='+encodeURIComponent(waMsg);
return '<div class="contractor-card"><h3>👤 '+c.name+'</h3><p>🔧 काम: '+c.work+'</p><span class="rate">'+c.rate+'</span><p>🍛 खाना: '+c.food+'</p><p>📍 '+c.place+'</p><p>👷 जरूरत: '+c.qty+' मजदूर</p>'+(c.other?'<p>💡 '+c.other+'</p>':'')+'<p style="font-size:10px;color:#999">📅 '+c.date+'</p><div class="w-btns"><a href="tel:'+c.phone+'" class="w-call">📞 कॉल</a><a href="'+wa+'" target="_blank" class="w-wa">📱 WhatsApp</a></div></div>';
}).join('');
}).catch(function(err){b.innerHTML='<p style="color:#b30000">❌ Error: '+err.message+'</p>';});
}

// ================= SHOPS =================
function shTab(t,b){
document.querySelectorAll('#p-shops .tt').forEach(function(x){x.classList.remove('active');});
b.classList.add('active');
if(t=='list'){document.getElementById('shListTab').classList.remove('h');document.getElementById('shRegTab').classList.add('h');rShops();}
else{document.getElementById('shListTab').classList.add('h');document.getElementById('shRegTab').classList.remove('h');}
}

function previewShopPhoto(e){
var file=e.target.files[0];if(!file)return;
var reader=new FileReader();
reader.onload=function(ev){shPhotoData=ev.target.result;document.getElementById('shPreview').innerHTML='<img src="'+shPhotoData+'">';};
reader.readAsDataURL(file);
}

function regShop(e){
e.preventDefault();
var s={
owner:document.getElementById('shO').value.trim(),
name:document.getElementById('shN').value.trim(),
phone:document.getElementById('shP').value.trim(),
type:document.getElementById('shT').value.trim(),
place:document.getElementById('shL').value.trim(),
product:document.getElementById('shPr').value.trim(),
price:document.getElementById('shPc').value,
photo:shPhotoData,
date:new Date().toLocaleDateString('hi-IN'),
user:currentUser?currentUser.uid:'guest'
};
db.collection('shops').add(s).then(function(){
document.getElementById('sm6').style.display='block';
e.target.reset();shPhotoData='';
document.getElementById('shPreview').innerHTML='';
setTimeout(function(){document.getElementById('sm6').style.display='none';},5000);
}).catch(function(err){alert('❌ Error: '+err.message);});
}

function rShops(){
var b=document.getElementById('shopsList');if(!b)return;
b.innerHTML='<p class="note">🔄 लोड हो रहा है...</p>';
var q=(document.getElementById('shSearch')?document.getElementById('shSearch').value:'').toLowerCase();
db.collection('shops').get().then(function(snap){
var list=[];
snap.forEach(function(doc){var s=doc.data();s.id=doc.id;list.push(s);});
if(q)list=list.filter(function(s){return s.name.toLowerCase().indexOf(q)>-1||s.product.toLowerCase().indexOf(q)>-1||s.place.toLowerCase().indexOf(q)>-1;});
if(list.length==0){b.innerHTML='<p class="note">कोई प्रोडक्ट नहीं मिला।</p>';return;}
b.innerHTML=list.reverse().map(function(s){
var photo=s.photo?'<img src="'+s.photo+'">':'🏪';
var waMsg='🛍️ '+s.product+'\nदुकान: '+s.name+'\nकीमत: ₹'+s.price+'\n📍 '+s.place;
var wa='https://wa.me/?text='+encodeURIComponent(waMsg);
return '<div class="shop-card"><div class="s-img">'+photo+'</div><div class="s-info"><h3>'+s.name+'</h3><p>🛍️ '+s.product+'</p><span class="s-price">₹'+s.price+'</span><p>📍 '+s.place+'</p><div class="w-btns"><a href="tel:'+s.phone+'" class="w-call">📞 कॉल</a><a href="'+wa+'" target="_blank" class="w-wa">📱 WhatsApp</a></div></div></div>';
}).join('');
}).catch(function(err){b.innerHTML='<p style="color:#b30000">❌ Error: '+err.message+'</p>';});
}

// ================= RENTAL =================
function rnTab(t,b){
document.querySelectorAll('#p-rental .tt').forEach(function(x){x.classList.remove('active');});
b.classList.add('active');
if(t=='list'){document.getElementById('rnListTab').classList.remove('h');document.getElementById('rnRegTab').classList.add('h');rRentals();}
else{document.getElementById('rnListTab').classList.add('h');document.getElementById('rnRegTab').classList.remove('h');}
}

function previewRentalPhoto(e){
rnPhotoData=[];
var files=e.target.files;
for(var i=0;i<files.length;i++){
(function(f){
var reader=new FileReader();
reader.onload=function(ev){rnPhotoData.push(ev.target.result);document.getElementById('rnPreview').innerHTML=rnPhotoData.map(function(p){return '<img src="'+p+'">';}).join('');};
reader.readAsDataURL(f);
})(files[i]);
}
}

function regRental(e){
e.preventDefault();
var r={
name:document.getElementById('rnN').value.trim(),
phone:document.getElementById('rnP').value.trim(),
type:document.getElementById('rnT').value,
rooms:document.getElementById('rnR').value.trim(),
price:document.getElementById('rnPrice').value,
facilities:document.getElementById('rnF').value.trim(),
address:document.getElementById('rnA').value.trim(),
district:document.getElementById('rnD').value.trim(),
gps:document.getElementById('rnGPS').value.trim(),
photos:rnPhotoData.slice(),
date:new Date().toLocaleDateString('hi-IN'),
user:currentUser?currentUser.uid:'guest'
};
db.collection('rentals').add(r).then(function(){
document.getElementById('sm9').style.display='block';
e.target.reset();rnPhotoData=[];
document.getElementById('rnPreview').innerHTML='';
setTimeout(function(){document.getElementById('sm9').style.display='none';},5000);
}).catch(function(err){alert('❌ Error: '+err.message);});
}

function rRentals(){
var b=document.getElementById('rnList');if(!b)return;
b.innerHTML='<p class="note">🔄 लोड हो रहा है...</p>';
var q=(document.getElementById('rnSearch')?document.getElementById('rnSearch').value:'').toLowerCase().trim();
db.collection('rentals').get().then(function(snap){
var list=[];
snap.forEach(function(doc){var r=doc.data();r.id=doc.id;list.push(r);});
if(q)list=list.filter(function(r){
return (r.name||'').toLowerCase().indexOf(q)>-1||(r.district||'').toLowerCase().indexOf(q)>-1||(r.address||'').toLowerCase().indexOf(q)>-1||(r.type||'').toLowerCase().indexOf(q)>-1;
});
if(list.length==0){b.innerHTML='<p class="note">कोई किराया नहीं मिला।</p>';return;}
b.innerHTML=list.reverse().map(function(r){
var photos='';
if(r.photos&&r.photos.length>0){photos='<div class="rent-photos">'+r.photos.map(function(p){return '<img src="'+p+'">';}).join('')+'</div>';}
var waMsg='🏠 किराया (Apana India):\n\n'+r.type+'\nकमरे: '+r.rooms+'\nकिराया: ₹'+r.price+'/माह\nसुविधाएँ: '+r.facilities+'\nपता: '+r.address+', '+r.district;
var wa='https://wa.me/?text='+encodeURIComponent(waMsg);
var gpsLink=r.gps?'<p>📍 <a href="'+r.gps+'" target="_blank" style="color:#138808;font-weight:700">Google Maps पर देखें</a></p>':'';
return '<div class="rental-card"><h3>🏠 '+r.type+' — '+r.district+'</h3>'+photos+'<p>👤 '+r.name+'</p><p>🛏️ '+r.rooms+'</p><span class="rent-price">₹'+r.price+'/माह</span><p>✨ '+r.facilities+'</p><p>📍 '+r.address+'</p>'+gpsLink+'<div class="w-btns"><a href="tel:'+r.phone+'" class="w-call">📞 कॉल</a><a href="'+wa+'" target="_blank" class="w-wa">📱 WhatsApp</a></div></div>';
}).join('');
}).catch(function(err){b.innerHTML='<p style="color:#b30000">❌ Error: '+err.message+'</p>';});
}
// ================= PANCHAYAT =================
function pnTab(t,b){
document.querySelectorAll('#p-panchayat .tt').forEach(function(x){x.classList.remove('active');});
b.classList.add('active');
if(t=='list'){document.getElementById('pnListTab').classList.remove('h');document.getElementById('pnRegTab').classList.add('h');rPanch();}
else{document.getElementById('pnListTab').classList.add('h');document.getElementById('pnRegTab').classList.remove('h');}
}

function regPanchayat(e){
e.preventDefault();
var p={
name:document.getElementById('pnN').value.trim(),
phone:document.getElementById('pnP').value.trim(),
village:document.getElementById('pnV').value.trim(),
block:document.getElementById('pnB').value.trim(),
district:document.getElementById('pnD').value.trim(),
type:document.getElementById('pnT').value,
detail:document.getElementById('pnS').value.trim(),
date:new Date().toLocaleDateString('hi-IN'),
status:'public',
user:currentUser?currentUser.uid:'guest'
};
db.collection('panchayat').add(p).then(function(){
document.getElementById('sm7').style.display='block';
showBDOHelp();
setTimeout(function(){document.getElementById('sm7').style.display='none';},8000);
}).catch(function(err){alert('❌ Error: '+err.message);});
}

function showBDOHelp(){
var d=document.getElementById('pnD').value.trim();
var box=document.getElementById('bdoHelp');
if(!d){box.innerHTML='';return;}
var info=BDO_NUMBERS[d]||BDO_NUMBERS['default'];
box.innerHTML='<div class="wage-card"><h3>🏛️ '+d+' ग्राम विकास अधिकारी</h3>'+
'<div class="rate-row"><span>ब्लॉक</span><span>'+info.block+'</span></div>'+
'<div class="rate-row"><span>हेल्पलाइन</span><span>'+info.num+'</span></div>'+
'<div class="rate-row"><span>विभाग</span><span>'+info.extra+'</span></div>'+
'<div style="margin-top:10px"><a href="tel:'+info.num+'" class="btn-wa" style="background:#138808;margin-right:5px">📞 कॉल करें</a>'+
'<a href="https://wa.me/91'+info.num+'" target="_blank" class="btn-wa">📱 WhatsApp</a></div>'+
'<p class="note" style="margin-top:8px">💡 समस्या आपकी वेबसाइट पर तुरंत सार्वजनिक हो गई है। ऊपर के नंबर पर सीधे बात करें।</p></div>';
}

function rPanch(){
var b=document.getElementById('panchayatList');if(!b)return;
b.innerHTML='<p class="note">🔄 लोड हो रहा है...</p>';
db.collection('panchayat').get().then(function(snap){
if(snap.empty){b.innerHTML='<p class="note">कोई समस्या पोस्ट नहीं।</p>';return;}
var list=[];
snap.forEach(function(doc){var p=doc.data();p.id=doc.id;list.push(p);});
b.innerHTML=list.reverse().map(function(p){
var waMsg='🏛️ गाँव की समस्या:\n\nगाँव: '+p.village+'\nब्लॉक: '+p.block+'\nजिला: '+p.district+'\nप्रकार: '+p.type+'\n\n'+p.detail+'\n\n— '+p.name+'\n📱 '+p.phone;
var wa='https://wa.me/?text='+encodeURIComponent(waMsg);
return '<div class="panchayat-card"><h3>🏛️ '+p.type+' - '+p.village+'</h3><p>'+p.detail+'</p><p class="pn-meta">👤 '+p.name+' • 📱 '+p.phone+' • 📅 '+p.date+'</p><p class="pn-meta">📍 '+p.block+', '+p.district+'</p><a href="'+wa+'" target="_blank" class="btn-wa">📱 WhatsApp शेयर</a></div>';
}).join('');
}).catch(function(err){b.innerHTML='<p style="color:#b30000">❌ Error: '+err.message+'</p>';});
}

// ================= SUGGESTIONS =================
function regSuggest(e){
e.preventDefault();
var s={
name:document.getElementById('sgN').value.trim(),
text:document.getElementById('sgT').value.trim(),
likes:0,
date:new Date().toLocaleDateString('hi-IN'),
user:currentUser?currentUser.uid:'guest'
};
db.collection('suggestions').add(s).then(function(){
document.getElementById('sm8').style.display='block';
e.target.reset();
setTimeout(function(){document.getElementById('sm8').style.display='none';},5000);
rSuggest();
rTopSuggest();
}).catch(function(err){alert('❌ Error: '+err.message);});
}

function rSuggest(){
var b=document.getElementById('allSuggest');if(!b)return;
b.innerHTML='<p class="note">🔄 लोड हो रहा है...</p>';
db.collection('suggestions').get().then(function(snap){
if(snap.empty){b.innerHTML='<p class="note">कोई सुझाव नहीं।</p>';return;}
var list=[];
snap.forEach(function(doc){var s=doc.data();s.id=doc.id;list.push(s);});
list.sort(function(a,b){return (b.likes||0)-(a.likes||0);});
b.innerHTML=list.map(function(s){
return '<div class="suggest-card"><h3>💡 '+s.name+'</h3><p>'+s.text+'</p><div class="sg-meta">👍 '+s.likes+' • 📅 '+s.date+'</div><button onclick="likeSuggest(\''+s.id+'\')" style="background:#138808;color:#fff;border:none;padding:5px 12px;border-radius:14px;font-size:11px;font-weight:700;cursor:pointer;margin-top:6px">👍 पसंद</button></div>';
}).join('');
}).catch(function(err){b.innerHTML='<p style="color:#b30000">❌ Error: '+err.message+'</p>';});
}

function rTopSuggest(){
var b=document.getElementById('topSuggest');if(!b)return;
b.innerHTML='<p class="note">🔄 लोड हो रहा है...</p>';
db.collection('suggestions').get().then(function(snap){
if(snap.empty){b.innerHTML='<p class="note">अभी कोई सुझाव नहीं।</p>';return;}
var list=[];
snap.forEach(function(doc){var s=doc.data();s.id=doc.id;list.push(s);});
list.sort(function(a,b){return (b.likes||0)-(a.likes||0);});
var top=list[0];
b.innerHTML='<div class="top-suggest"><h3>🏆 '+top.name+' का सुझाव</h3><p>'+top.text+'</p><div class="sg-meta">👍 '+top.likes+' लोगों ने पसंद किया</div></div>';
}).catch(function(err){b.innerHTML='<p style="color:#b30000">❌ Error: '+err.message+'</p>';});
}

function likeSuggest(id){
db.collection('suggestions').doc(id).get().then(function(doc){
if(doc.exists){
var likes=(doc.data().likes||0)+1;
db.collection('suggestions').doc(id).update({likes:likes}).then(function(){
rSuggest();rTopSuggest();
});
}
});
}
