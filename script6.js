// ================= ID CARD =================
function liveID(){
var n=document.getElementById('idN').value||'आपका नाम';
var p=document.getElementById('idP').value||'__________';
var s=document.getElementById('idS').value||'________';
var v=document.getElementById('idV').value||'___';
var d=document.getElementById('idD').value||'___';
var st=document.getElementById('idSt').value||'___';
var box=document.getElementById('idCardPreview');
box.innerHTML='<div class="id-card"><div class="id-card-header">🇮🇳 APANA INDIA — मजदूर ID कार्ड</div>'+
'<div class="id-card-body"><div class="id-card-photo">👷</div><div class="id-card-info">'+
'<h3>'+n+'</h3>'+
'<p>🛠️ हुनर: <b>'+s+'</b></p>'+
'<p>📱 '+p+'</p>'+
'<p>📍 '+v+', '+d+'</p>'+
'<p>🏠 '+st+'</p>'+
'</div></div>'+
'<div class="id-card-footer">Apana India — रोजगार भी, मजदूरों को न्याय भी</div></div>';
}

function makeIDCard(e){
e.preventDefault();
var idData={
name:document.getElementById('idN').value.trim(),
father:document.getElementById('idF').value.trim(),
phone:document.getElementById('idP').value.trim(),
skill:document.getElementById('idS').value.trim(),
village:document.getElementById('idV').value.trim(),
block:document.getElementById('idB').value.trim(),
district:document.getElementById('idD').value.trim(),
state:document.getElementById('idSt').value.trim(),
date:new Date().toLocaleDateString('hi-IN'),
user:currentUser?currentUser.uid:'guest'
};
db.collection('idcards').add(idData).then(function(){
document.getElementById('sm10').style.display='block';
liveID();
setTimeout(function(){document.getElementById('sm10').style.display='none';},8000);
}).catch(function(err){alert('❌ Error: '+err.message);});
}

// ================= LAND CONVERTER =================
function convertLand(){
var v=parseFloat(document.getElementById('landInput').value)||0;
var from=document.getElementById('landFrom').value;
var box=document.getElementById('landResult');
if(!v||v<=0){box.innerHTML='';return;}

// सभी को वर्ग मीटर में बदलें
var sqm=0;
if(from=='bigha_up')sqm=v*2529;
else if(from=='bigha_mp')sqm=v*2529;
else if(from=='bigha_raj')sqm=v*1618;
else if(from=='bigha_guj')sqm=v*1618;
else if(from=='bissa')sqm=v*100;
else if(from=='hectare')sqm=v*10000;
else if(from=='acre')sqm=v*4047;
else if(from=='sqmeter')sqm=v;
else if(from=='sqfeet')sqm=v*0.0929;
else if(from=='gaj')sqm=v*0.836;
else if(from=='gunta')sqm=v*101;
else if(from=='katha')sqm=v*80;
else if(from=='marla')sqm=v*25.29;
else if(from=='kanal')sqm=v*505;

var bighaUP=sqm/2529;
var bighaMP=sqm/2529;
var bighaRaj=sqm/1618;
var hectare=sqm/10000;
var acre=sqm/4047;
var bissa=sqm/100;
var sqfeet=sqm/0.0929;
var gaj=sqm/0.836;
var gunta=sqm/101;
var katha=sqm/80;

box.innerHTML='<div class="calc-box">'+
'<div style="text-align:center;font-size:13px;color:#666;margin-bottom:8px">📐 जमीन का पूरा हिसाब</div>'+
'<div class="land-row"><span>बीघा (UP/MP)</span><span>'+bighaUP.toFixed(3)+'</span></div>'+
'<div class="land-row"><span>बीघा (राजस्थान/गुजरात)</span><span>'+bighaRaj.toFixed(3)+'</span></div>'+
'<div class="land-row"><span>हेक्टेयर</span><span>'+hectare.toFixed(4)+'</span></div>'+
'<div class="land-row"><span>एकड़</span><span>'+acre.toFixed(3)+'</span></div>'+
'<div class="land-row"><span>बिस्सा</span><span>'+bissa.toFixed(2)+'</span></div>'+
'<div class="land-row"><span>गुंठा</span><span>'+gunta.toFixed(2)+'</span></div>'+
'<div class="land-row"><span>कट्ठा</span><span>'+katha.toFixed(2)+'</span></div>'+
'<div class="land-row"><span>गज</span><span>'+gaj.toFixed(2)+'</span></div>'+
'<div class="land-row"><span>वर्ग फुट</span><span>'+sqfeet.toFixed(2)+'</span></div>'+
'<div class="land-row"><span>वर्ग मीटर</span><span>'+sqm.toFixed(2)+'</span></div>'+
'</div>';
}

// ================= HEALTH =================
function rHealth(){
var b=document.getElementById('healthList');if(!b)return;
b.innerHTML='<h3 style="color:#FF9933">🚑 आपातकालीन नंबर</h3>'+
'<div class="num-item red"><div class="info"><b>🚑 एम्बुलेंस (फ्री)</b><span>तुरंत एम्बुलेंस</span></div><a href="tel:108">📞 108</a></div>'+
'<div class="num-item red"><div class="info"><b>👶 गर्भवती/नवजात एम्बुलेंस</b><span>महिला और बच्चे के लिए</span></div><a href="tel:102">📞 102</a></div>'+
'<div class="num-item yellow"><div class="info"><b>👨‍⚕️ डॉक्टर से फ्री सलाह</b><span>फोन पर डॉक्टर</span></div><a href="tel:104">📞 104</a></div>'+
'<div class="num-item yellow"><div class="info"><b>🏥 राष्ट्रीय स्वास्थ्य हेल्पलाइन</b><span>24x7 फ्री</span></div><a href="tel:18001801104">📞 1800-180-1104</a></div>'+
'<div class="num-item red"><div class="info"><b>🚨 आपातकाल (सभी)</b><span>पुलिस/फायर/मेडिकल</span></div><a href="tel:112">📞 112</a></div>'+
'<h3 style="color:#FF9933;margin-top:15px">💻 eSanjeevani — घर बैठे डॉक्टर</h3>'+
'<div class="lc"><ul><li>सरकारी डॉक्टर से <b>फ्री वीडियो कॉल</b></li><li>मोबाइल पर डिजिटल पर्चा मिलेगा</li><li>वेबसाइट: <a href="https://esanjeevaniopd.in" target="_blank">esanjeevaniopd.in</a></li></ul></div>'+
'<h3 style="color:#FF9933;margin-top:15px">🧠 मानसिक स्वास्थ्य</h3>'+
'<div class="num-item"><div class="info"><b>Tele-MANAS</b><span>तनाव, डिप्रेशन — फ्री सलाह</span></div><a href="tel:14416">📞 14416</a></div>';
}

// ================= ON PAGE LOAD =================
window.addEventListener('load',function(){
setTimeout(function(){
var hb=document.getElementById('healthList');
if(hb&&hb.innerHTML=='')rHealth();
},500);
});
// ================= ID CARD PHOTO =================
var idPhotoData='';

function previewIDPhoto(e){
var file=e.target.files[0];if(!file)return;
var reader=new FileReader();
reader.onload=function(ev){
idPhotoData=ev.target.result;
document.getElementById('idPhotoPreview').innerHTML='<img src="'+idPhotoData+'" style="max-width:100px;border-radius:8px;border:2px solid #FF9933">';
liveID();
};
reader.readAsDataURL(file);
}

// Override liveID to include photo
var _oldLiveID=liveID;
liveID=function(){
var n=document.getElementById('idN').value||'आपका नाम';
var p=document.getElementById('idP').value||'__________';
var s=document.getElementById('idS').value||'________';
var v=document.getElementById('idV').value||'___';
var d=document.getElementById('idD').value||'___';
var st=document.getElementById('idSt').value||'___';
var photo=idPhotoData?'<img src="'+idPhotoData+'">':'👷';
var box=document.getElementById('idCardPreview');
box.innerHTML='<div class="id-card"><div class="id-card-header">🇮🇳 APANA INDIA — मजदूर ID कार्ड</div>'+
'<div class="id-card-body"><div class="id-card-photo">'+photo+'</div><div class="id-card-info">'+
'<h3>'+n+'</h3>'+
'<p>🛠️ हुनर: <b>'+s+'</b></p>'+
'<p>📱 '+p+'</p>'+
'<p>📍 '+v+', '+d+'</p>'+
'<p>🏠 '+st+'</p>'+
'</div></div>'+
'<div class="id-card-footer">Apana India — रोजगार भी, मजदूरों को न्याय भी</div></div>';
};

// Override makeIDCard to save photo
var _oldMakeID=makeIDCard;
makeIDCard=function(e){
e.preventDefault();
var idData={
name:document.getElementById('idN').value.trim(),
father:document.getElementById('idF').value.trim(),
phone:document.getElementById('idP').value.trim(),
skill:document.getElementById('idS').value.trim(),
village:document.getElementById('idV').value.trim(),
block:document.getElementById('idB').value.trim(),
district:document.getElementById('idD').value.trim(),
state:document.getElementById('idSt').value.trim(),
photo:idPhotoData,
date:new Date().toLocaleDateString('hi-IN'),
user:currentUser?currentUser.uid:'guest'
};
db.collection('idcards').add(idData).then(function(){
document.getElementById('sm10').style.display='block';
liveID();
setTimeout(function(){document.getElementById('sm10').style.display='none';},8000);
}).catch(function(err){alert('❌ Error: '+err.message);});
};
var idPhotoData='';

