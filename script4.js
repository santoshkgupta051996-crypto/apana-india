// ================= DOM READY — सब चालू करें =================
document.addEventListener('DOMContentLoaded',function(){
sts();
updTk();
rht();
rPublic();
rTopSuggest();
});

// ================= ENTER KEY का इस्तेमाल =================
document.addEventListener('keydown',function(e){
if(e.key==='Enter'){
var el=document.activeElement;
if(el&&el.tagName==='INPUT'&&el.id!=='ns'&&el.id!=='numSearch'&&el.id!=='globalSearch'){e.preventDefault();}
}
});

// ================= GLOBAL SEARCH =================
function globalSearchFn(){
var q=(document.getElementById('globalSearch')?document.getElementById('globalSearch').value:'').toLowerCase().trim();
var box=document.getElementById('searchResults');
if(!q){box.innerHTML='';return;}
if(q.length<2){box.innerHTML='<p class="note">कम से कम 2 अक्षर लिखें...</p>';return;}
box.innerHTML='<p class="note">🔄 खोज रहे हैं...</p>';

var results=[];

// स्थानीय डेटा में खोज
if(typeof NUMBERS!=='undefined')NUMBERS.forEach(function(n){
if(n.name.toLowerCase().indexOf(q)>-1||n.desc.toLowerCase().indexOf(q)>-1)results.push({icon:"📞",title:n.name+" — "+n.num,go:'numbers'});
});
if(typeof COURSES!=='undefined')COURSES.forEach(function(c){
if(c.name.toLowerCase().indexOf(q)>-1||c.desc.toLowerCase().indexOf(q)>-1)results.push({icon:"🎓",title:c.name+" — ₹"+c.price,go:'courses'});
});

// फायरबेस में खोज
db.collection('workers').get().then(function(snap){
snap.forEach(function(doc){var w=doc.data();
if((w.name||'').toLowerCase().indexOf(q)>-1||(w.skill||'').toLowerCase().indexOf(q)>-1||(w.district||'').toLowerCase().indexOf(q)>-1||(w.village||'').toLowerCase().indexOf(q)>-1)
results.push({icon:"👷",title:w.name+" — "+w.skill+" ("+w.district+")",go:'worker'});
});
db.collection('companies').get().then(function(snap2){
snap2.forEach(function(doc){var c=doc.data();
if((c.name||'').toLowerCase().indexOf(q)>-1||(c.district||'').toLowerCase().indexOf(q)>-1)
results.push({icon:"🏢",title:c.name+" ("+c.district+")",go:'comp'});
});
db.collection('contractors').get().then(function(snap3){
snap3.forEach(function(doc){var c=doc.data();
if((c.name||'').toLowerCase().indexOf(q)>-1||(c.work||'').toLowerCase().indexOf(q)>-1)
results.push({icon:"📋",title:c.name+" — "+c.work+" ("+c.rate+")",go:'contractor'});
});
db.collection('shops').get().then(function(snap4){
snap4.forEach(function(doc){var s=doc.data();
if((s.name||'').toLowerCase().indexOf(q)>-1||(s.product||'').toLowerCase().indexOf(q)>-1)
results.push({icon:"🏪",title:s.name+" — "+s.product+" (₹"+s.price+")",go:'shops'});
});
db.collection('panchayat').get().then(function(snap5){
snap5.forEach(function(doc){var p=doc.data();
if((p.village||'').toLowerCase().indexOf(q)>-1||(p.detail||'').toLowerCase().indexOf(q)>-1)
results.push({icon:"🏛️",title:p.type+" — "+p.village,go:'panchayat'});
});
db.collection('rentals').get().then(function(snap6){
snap6.forEach(function(doc){var r=doc.data();
if((r.name||'').toLowerCase().indexOf(q)>-1||(r.district||'').toLowerCase().indexOf(q)>-1||(r.type||'').toLowerCase().indexOf(q)>-1)
results.push({icon:"🏠",title:r.type+" — "+r.district+" (₹"+r.price+")",go:'rental'});
});

// दिखाएं
if(results.length==0){box.innerHTML='<p class="note">❌ कुछ नहीं मिला। दूसरा शब्द आज़माएं।</p>';return;}
box.innerHTML=results.slice(0,15).map(function(r){
return '<div class="nw" onclick="go(\''+r.go+'\')"><div class="ni">'+r.icon+'</div><div><div class="nt">'+r.title+'</div></div></div>';
}).join('');
});
});
});
});
});
});
}
