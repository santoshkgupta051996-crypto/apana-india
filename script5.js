function ctTab(t,b){
document.querySelectorAll('#p-contractor .tt').forEach(function(x){x.classList.remove('active');});
b.classList.add('active');
if(t=='list'){document.getElementById('ctListTab').classList.remove('h');document.getElementById('ctRegTab').classList.add('h');rCont();}
else{document.getElementById('ctListTab').classList.add('h');document.getElementById('ctRegTab').classList.remove('h');}
}
function regContractor(e){
e.preventDefault();
CONT.push({id:Date.now(),name:document.getElementById('ctN').value.trim(),phone:document.getElementById('ctP').value.trim(),work:document.getElementById('ctW').value.trim(),rate:document.getElementById('ctR').value.trim(),food:document.getElementById('ctF').value,place:document.getElementById('ctA').value.trim(),qty:document.getElementById('ctQ').value.trim(),other:document.getElementById('ctO').value.trim(),date:new Date().toLocaleDateString('hi-IN')});
ss();
document.getElementById('sm5').style.display='block';
e.target.reset();
setTimeout(function(){document.getElementById('sm5').style.display='none';},5000);
}
function rCont(){
var b=document.getElementById('ctList');if(!b)return;
if(CONT.length==0){b.innerHTML='<p class="note">कोई पोस्ट नहीं।</p>';return;}
b.innerHTML=CONT.slice().reverse().map(function(c){
var waMsg='📋 ठेकेदार (Apana India):\n\nनाम: '+c.name+'\nकाम: '+c.work+'\nरेट: '+c.rate+'\nखाना: '+c.food+'\nजगह: '+c.place+'\nमजदूर: '+c.qty;
var wa='https://wa.me/?text='+encodeURIComponent(waMsg);
return '<div class="contractor-card"><h3>👤 '+c.name+'</h3><p>🔧 काम: '+c.work+'</p><span class="rate">'+c.rate+'</span><p>🍛 खाना: '+c.food+'</p><p>📍 '+c.place+'</p><p>👷 जरूरत: '+c.qty+' मजदूर</p>'+(c.other?'<p>💡 '+c.other+'</p>':'')+'<p style="font-size:10px;color:#999">📅 '+c.date+'</p><div class="w-btns"><a href="tel:'+c.phone+'" class="w-call">📞 कॉल</a><a href="'+wa+'" target="_blank" class="w-wa">📱 WhatsApp</a></div></div>';
}).join('');
}
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
SHOPS.push({id:Date.now(),owner:document.getElementById('shO').value.trim(),name:document.getElementById('shN').value.trim(),phone:document.getElementById('shP').value.trim(),type:document.getElementById('shT').value.trim(),place:document.getElementById('shL').value.trim(),product:document.getElementById('shPr').value.trim(),price:document.getElementById('shPc').value,photo:shPhotoData,date:new Date().toLocaleDateString('hi-IN')});
ss();
document.getElementById('sm6').style.display='block';
e.target.reset();shPhotoData='';document.getElementById('shPreview').innerHTML='';
setTimeout(function(){document.getElementById('sm6').style.display='none';},5000);
}
function rShops(){
var b=document.getElementById('shopsList');if(!b)return;
var q=(document.getElementById('shSearch')?document.getElementById('shSearch').value:'').toLowerCase();
var f=SHOPS.filter(function(s){return !q||s.name.toLowerCase().indexOf(q)>-1||s.product.toLowerCase().indexOf(q)>-1||s.place.toLowerCase().indexOf(q)>-1;});
if(f.length==0){b.innerHTML='<p class="note">कोई प्रोडक्ट नहीं मिला।</p>';return;}
b.innerHTML=f.slice().reverse().map(function(s){
var photo=s.photo?'<img src="'+s.photo+'">':'🏪';
var waMsg='🛍️ '+s.product+'\nदुकान: '+s.name+'\nकीमत: ₹'+s.price+'\n📍 '+s.place;
var wa='https://wa.me/?text='+encodeURIComponent(waMsg);
return '<div class="shop-card"><div class="s-img">'+photo+'</div><div class="s-info"><h3>'+s.name+'</h3><p>🛍️ '+s.product+'</p><span class="s-price">₹'+s.price+'</span><p>📍 '+s.place+'</p><div class="w-btns"><a href="tel:'+s.phone+'" class="w-call">📞 कॉल</a><a href="'+wa+'" target="_blank" class="w-wa">📱 WhatsApp</a></div></div></div>';
}).join('');
}
function pnTab(t,b){
document.querySelectorAll('#p-panchayat .tt').forEach(function(x){x.classList.remove('active');});
b.classList.add('active');
if(t=='list'){document.getElementById('pnListTab').classList.remove('h');document.getElementById('pnRegTab').classList.add('h');rPanch();}
else{document.getElementById('pnListTab').classList.add('h');document.getElementById('pnRegTab').classList.remove('h');}
}
function regPanchayat(e){
e.preventDefault();
PANCH.push({id:Date.now(),name:document.getElementById('pnN').value.trim(),phone:document.getElementById('pnP').value.trim(),village:document.getElementById('pnV').value.trim(),block:document.getElementById('pnB').value.trim(),district:document.getElementById('pnD').value.trim(),type:document.getElementById('pnT').value,detail:document.getElementById('pnS').value.trim(),date:new Date().toLocaleDateString('hi-IN')});
ss();
document.getElementById('sm7').style.display='block';
e.target.reset();
setTimeout(function(){document.getElementById('sm7').style.display='none';},5000);
}
function rPanch(){
var b=document.getElementById('panchayatList');if(!b)return;
if(PANCH.length==0){b.innerHTML='<p class="note">कोई समस्या पोस्ट नहीं।</p>';return;}
b.innerHTML=PANCH.slice().reverse().map(function(p){
var waMsg='🏛️ गाँव की समस्या:\n\nगाँव: '+p.village+'\nब्लॉक: '+p.block+'\nजिला: '+p.district+'\nप्रकार: '+p.type+'\n\n'+p.detail+'\n\n— '+p.name+'\n📱 '+p.phone;
var wa='https://wa.me/?text='+encodeURIComponent(waMsg);
return '<div class="panchayat-card"><h3>🏛️ '+p.type+' - '+p.village+'</h3><p>'+p.detail+'</p><p class="pn-meta">👤 '+p.name+' • 📱 '+p.phone+' • 📅 '+p.date+'</p><p class="pn-meta">📍 '+p.block+', '+p.district+'</p><a href="'+wa+'" target="_blank" class="btn-wa">📱 WhatsApp शेयर</a></div>';
}).join('');
}
function regSuggest(e){
e.preventDefault();
SUGG.push({id:Date.now(),name:document.getElementById('sgN').value.trim(),text:document.getElementById('sgT').value.trim(),likes:0,date:new Date().toLocaleDateString('hi-IN')});
ss();
document.getElementById('sm8').style.display='block';
e.target.reset();
setTimeout(function(){document.getElementById('sm8').style.display='none';},5000);
rSuggest();rTopSuggest();
}
function rSuggest(){
var b=document.getElementById('allSuggest');if(!b)return;
if(SUGG.length==0){b.innerHTML='<p class="note">कोई सुझाव नहीं।</p>';return;}
var sorted=SUGG.slice().sort(function(a,b){return (b.likes||0)-(a.likes||0);});
b.innerHTML=sorted.map(function(s){
return '<div class="suggest-card"><h3>💡 '+s.name+'</h3><p>'+s.text+'</p><div class="sg-meta">👍 '+s.likes+' • 📅 '+s.date+'</div><button onclick="likeSuggest('+s.id+')" style="background:#138808;color:#fff;border:none;padding:5px 12px;border-radius:14px;font-size:11px;font-weight:700;cursor:pointer;margin-top:6px">👍 पसंद</button></div>';
}).join('');
}
function rTopSuggest(){
var b=document.getElementById('topSuggest');if(!b)return;
if(SUGG.length==0){b.innerHTML='<p class="note">अभी कोई सुझाव नहीं।</p>';return;}
var top=SUGG.slice().sort(function(a,b){return (b.likes||0)-(a.likes||0);})[0];
b.innerHTML='<div class="top-suggest"><h3>🏆 '+top.name+' का सुझाव</h3><p>'+top.text+'</p><div class="sg-meta">👍 '+top.likes+' लोगों ने पसंद किया</div></div>';
}
function likeSuggest(id){
var s=SUGG.find(function(x){return x.id==id;});
if(s){s.likes=(s.likes||0)+1;ss();rSuggest();rTopSuggest();}
  }
