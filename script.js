// ================= मजदूर रजिस्ट्रेशन =================
var WK=JSON.parse(localStorage.getItem('aiw'))||[
{id:1,name:"रामू यादव",father:"श्री राम लाल",phone:"9876543210",skill:"राजमिस्त्री",exp:8,village:"बभनी",block:"बभनी",district:"सोनभद्र",state:"उत्तर प्रदेश",address:"नया बाजार के पास",photo:"",date:"10/10/2025"},
{id:2,name:"सुरेश कुमार",father:"श्री मोहन",phone:"9876543211",skill:"वेल्डर",exp:5,village:"बीजपुर",block:"बीजपुर",district:"सोनभद्र",state:"उत्तर प्रदेश",address:"",photo:"",date:"11/10/2025"},
{id:3,name:"मोहन लाल",father:"",phone:"9876543212",skill:"मजदूर (अकुशल)",exp:10,village:"म्योरपुर",block:"म्योरपुर",district:"सोनभद्र",state:"उत्तर प्रदेश",address:"",photo:"",date:"11/10/2025"},
{id:4,name:"अनीता देवी",father:"",phone:"9876543213",skill:"सिलाई/टेलरिंग",exp:6,village:"रॉबर्ट्सगंज",block:"रॉबर्ट्सगंज",district:"सोनभद्र",state:"उत्तर प्रदेश",address:"",photo:"",date:"12/10/2025"}
];

var wPhotoData='';

function wTab(t,b){
document.querySelectorAll('#p-worker .tt').forEach(function(x){x.classList.remove('active');});b.classList.add('active');
if(t=='list'){document.getElementById('wListTab').classList.remove('h');document.getElementById('wRegTab').classList.add('h');rWorkers();}
else{document.getElementById('wListTab').classList.add('h');document.getElementById('wRegTab').classList.remove('h');}
}

function previewPhoto(e){
var file=e.target.files[0];if(!file)return;
var reader=new FileReader();
reader.onload=function(ev){
wPhotoData=ev.target.result;
document.getElementById('wPhotoPreview').innerHTML='<img src="'+wPhotoData+'">';
};
reader.readAsDataURL(file);
}

function regWorker(e){
e.preventDefault();
var w={
id:Date.now(),
name:document.getElementById('wN').value.trim(),
father:document.getElementById('wF').value.trim(),
phone:document.getElementById('wP').value.trim(),
skill:document.getElementById('wS').value,
exp:document.getElementById('wE').value||0,
village:document.getElementById('wV').value.trim(),
block:document.getElementById('wB').value.trim(),
district:document.getElementById('wD').value.trim(),
state:document.getElementById('wSt').value,
address:document.getElementById('wA').value.trim(),
photo:wPhotoData,
date:new Date().toLocaleDateString('hi-IN')
};
WK.push(w);
localStorage.setItem('aiw',JSON.stringify(WK));
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
var q=(document.getElementById('wSearch')?.value||'').toLowerCase().trim();
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
b.innerHTML='<div class="no-worker"><b>😕 कोई मजदूर नहीं मिला</b>इस जगह का कोई मजदूर रजिस्टर नहीं है।<br>आप खुद रजिस्टर करें और दूसरों को भी बताएं।</div>';
return;
}

b.innerHTML=list.map(function(w){
var photo=w.photo?'<img src="'+w.photo+'">':'👷';
var waMsg='👷 मजदूर मिला (Apana India):\n\nनाम: '+w.name+'\nहुनर: '+w.skill+'\n📱 '+w.phone+'\n📍 '+w.village+', '+w.block+', '+w.district;
var wa='https://wa.me/?text='+encodeURIComponent(waMsg);
return '<div class="worker-card">'+
'<div class="w-photo">'+photo+'</div>'+
'<div class="w-info">'+
'<h3>'+w.name+'</h3>'+
'<span class="w-skill">'+w.skill+(w.exp>0?' • '+w.exp+' साल':'')+'</span>'+
'<p>📍 '+w.village+', '+w.block+'</p>'+
'<p>🏠 '+w.district+', '+w.state+'</p>'+
(w.address?'<p>📌 '+w.address+'</p>':'')+
'<div class="w-btns"><a href="tel:'+w.phone+'" class="w-call">📞 कॉल</a><a href="'+wa+'" target="_blank" class="w-wa">📱 WhatsApp</a></div>'+
'</div></div>';
}).join('');
}

// go() में पेज जोड़ें
var _go3=go;
go=function(p){
_go3(p);
if(p=='worker'){document.getElementById('p-worker').classList.remove('h');rWorkers();}
};

// sts में मजदूर गिनती जोड़ें
var _sts=sts;
sts=function(){
_sts();
var el=document.getElementById('sw2');if(el)el.innerText=WK.length;
};

// एडमिन में मजदूर लिस्ट जोड़ें
var _ral=ral;
var _rAdmin=rAdmin;
rAdmin=function(){
_rAdmin();
var el=document.getElementById('aw');if(el)el.innerText=WK.length;
var b=document.getElementById('adminWorkers');
if(b)b.innerHTML=WK.length==0?'<p class="note">कोई मजदूर नहीं।</p>':WK.map(function(w){
return '<div class="cp"><h3>'+w.name+'</h3><p>👷 '+w.skill+' | 📱 '+w.phone+'</p><p>📍 '+w.village+', '+w.block+', '+w.district+'</p></div>';
}).join('');
};

rWorkers();
