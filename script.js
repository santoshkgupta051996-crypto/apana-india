var C=JSON.parse(localStorage.getItem('aic'))||[
{name:"ABC Constructions",address:"सूरत",complaints:5,rating:"red",type:"निर्माण"},
{name:"Shree Ram Builders",address:"अहमदाबाद",complaints:2,rating:"yellow",type:"निर्माण"},
{name:"Green Field Pvt Ltd",address:"पुणे",complaints:0,rating:"green",type:"निर्माण"},
{name:"Jai Bhawani Contractors",address:"दिल्ली",complaints:3,rating:"yellow",type:"ठेकेदार"},
{name:"Tata Steel",address:"जमशेदपुर",complaints:1,rating:"green",type:"स्टील"},
{name:"Reliance Industries",address:"मुंबई",complaints:2,rating:"yellow",type:"उद्योग"},
{name:"Adani Enterprises",address:"अहमदाबाद",complaints:1,rating:"green",type:"उद्योग"},
{name:"L&T Construction",address:"चेन्नई",complaints:0,rating:"green",type:"निर्माण"}];
var SC=JSON.parse(localStorage.getItem('ais'))||[];
var AD=JSON.parse(localStorage.getItem('aia'))||[
{id:1,title:"ITI इलेक्ट्रिशियन",cat:"job",detail:"2 साल अनुभव।",phone:"9876543210"},
{id:2,title:"2BHK फ्लैट",cat:"property",detail:"950 sq ft।",phone:"9876500000"}];
var ND={
trending:[
{title:"🔴 देशभर में मजदूरों की हड़ताल",desc:"न्यूनतम मजदूरी बढ़ाने की मांग को लेकर मजदूर संगठनों ने हड़ताल का ऐलान किया।",date:"आज",src:"राष्ट्रीय समाचार",icon:"🔥"},
{title:"मनरेगा मजदूरी में ₹50 की बढ़ोतरी",desc:"ग्रामीण विकास मंत्रालय ने सभी राज्यों के लिए मजदूरी दरों में संशोधन किया।",date:"आज",src:"ग्रामीण समाचार",icon:"🌾"},
{title:"गिग वर्कर्स को PF और बीमा का लाभ",desc:"Ola, Uber, Swiggy, Zomato के कर्मचारियों को बड़ी राहत।",date:"1 दिन पहले",src:"श्रम मंत्रालय",icon:"📋"}],
breaking:[
{title:"सोनभद्र में बड़ा हादसा, 5 मजदूर घायल",desc:"निर्माण स्थल पर मलबा गिरने से हादसा हुआ।",date:"अभी",src:"स्थानीय समाचार",icon:"🚨"},
{title:"रेलवे में 10,000 नई नौकरियाँ",desc:"भारतीय रेलवे ने तकनीशियन और हेल्पर पदों के लिए भर्ती निकाली।",date:"आज",src:"रेलवे समाचार",icon:"🚂"}],
hartal:[
{title:"⚠️ हरियाणा: 15 अक्टूबर से मजदूर हड़ताल",desc:"न्यूनतम मजदूरी न बढ़ने पर अनिश्चितकालीन हड़ताल।",date:"आज",src:"श्रम समाचार",icon:"✊"},
{title:"महाराष्ट्र में ऑटो कर्मचारियों की हड़ताल",desc:"तीन दिन से हड़ताल, उत्पादन प्रभावित।",date:"1 दिन पहले",src:"महाराष्ट्र समाचार",icon:"⚠️"},
{title:"झारखंड में कोयला खदान मजदूरों का प्रदर्शन",desc:"बकाया वेतन न मिलने पर प्रदर्शन।",date:"2 दिन पहले",src:"झारखंड समाचार",icon:"✊"}],
mazdoor:[
{title:"नियुक्ति पत्र अनिवार्य, बड़ा बदलाव",desc:"अब हर कंपनी को मजदूरों को लिखित नियुक्ति पत्र देना होगा।",date:"आज",src:"श्रम मंत्रालय",icon:"👷"},
{title:"ओवरटाइम का पैसा अब डबल",desc:"नए श्रम कानून में ओवरटाइम 2x करने का प्रावधान।",date:"1 दिन पहले",src:"श्रम समाचार",icon:"💰"},
{title:"ESIC का दायरा बढ़ा",desc:"₹21,000 तक वाले श्रमिक भी ESIC में शामिल।",date:"2 दिन पहले",src:"स्वास्थ्य विभाग",icon:"🏥"}],
company:[
{title:"टाटा स्टील में 500 नई भर्तियाँ",desc:"ITI और डिप्लोमा वालों के लिए सुनहरा मौका।",date:"आज",src:"कंपनी समाचार",icon:"🏢"},
{title:"L&T Construction में 2000 पद",desc:"इंजीनियर, सुपरवाइजर और मजदूरों की भर्ती।",date:"1 दिन पहले",src:"कंपनी समाचार",icon:"🏗️"}],
india:[
{title:"देश में नई श्रम नीति लागू",desc:"केंद्र सरकार ने 4 नई श्रम संहिताएँ लागू कीं।",date:"आज",src:"राष्ट्रीय समाचार",icon:"🇮🇳"},
{title:"PM आवास योजना में नए आवेदन शुरू",desc:"शहरी और ग्रामीण दोनों क्षेत्रों के लिए नई किस्त।",date:"1 दिन पहले",src:"आवास समाचार",icon:"🏠"}],
world:[
{title:"अमेरिका में मजदूरों की हड़ताल",desc:"वेतन बढ़ाने की मांग को लेकर बड़ी हड़ताल।",date:"आज",src:"अंतर्राष्ट्रीय समाचार",icon:"🌍"},
{title:"यूरोप में गिग वर्कर्स को नए अधिकार",desc:"EU ने गिग वर्कर्स के लिए नए कानून बनाए।",date:"2 दिन पहले",src:"विदेश समाचार",icon:"🌐"}],
up:[
{title:"UP में 5,000 कॉन्स्टेबल भर्ती",desc:"UP पुलिस में बड़े पैमाने पर भर्ती।",date:"आज",src:"UP समाचार",icon:"👮"},
{title:"शिक्षक भर्ती 15,000 पद",desc:"बेसिक शिक्षा विभाग में सहायक अध्यापक।",date:"1 दिन पहले",src:"शिक्षा समाचार",icon:"📚"}],
sonbhadra:[
{title:"सोनभद्र में नई सड़क परियोजना",desc:"120 करोड़ की लागत से 45 किमी सड़क बनेगी।",date:"आज",src:"स्थानीय समाचार",icon:"🛣️"},
{title:"बीजपुर में श्रमिक शिविर",desc:"मजदूरों के अधिकारों की जानकारी दी गई।",date:"1 दिन पहले",src:"श्रम विभाग",icon:"👷"}]};

var CAT='trending';

function go(p){
var ps=['home','news','jobs','comp','shikayat','mycomp','laws','search','alert','post','admin','help'];
ps.forEach(function(x){var e=document.getElementById('p-'+x),n=document.getElementById('n-'+x);if(e)e.classList.add('h');if(n)n.classList.remove('active');});
document.getElementById('p-'+p).classList.remove('h');
document.getElementById('n-'+p).classList.add('active');
window.scrollTo({top:0,behavior:'smooth'});
if(p=='home'){sts();rht();rPublic();}
if(p=='news')rnews();
if(p=='jobs')rad('job');
if(p=='comp')rcomp();
if(p=='mycomp')rmc();
if(p=='alert')ral();
}

function sts(){
document.getElementById('sa').innerText=AD.length;
document.getElementById('sc').innerText=SC.length;
document.getElementById('sco').innerText=C.length;
}

function sw(c,b){CAT=c;document.querySelectorAll('.tt').forEach(function(x){x.classList.remove('active');});b.classList.add('active');rnews();}

function rnews(){
var l=document.getElementById('nl');
var q=(document.getElementById('ns')?document.getElementById('ns').value:'').toLowerCase();
var items=ND[CAT]||[];
if(q)items=items.filter(function(n){return n.title.toLowerCase().indexOf(q)>-1||n.desc.toLowerCase().indexOf(q)>-1;});
if(items.length==0){l.innerHTML='<p style="color:#888;font-size:12px">कोई खबर नहीं।</p>';return;}
l.innerHTML=items.map(function(n,idx){
var ec=CAT=='trending'?'tr':(CAT=='hartal'?'ha':'');
return '<div class="nw '+ec+'" onclick="showNews(\''+CAT+'\','+idx+')"><div class="ni">'+n.icon+'</div><div><div class="nt">'+n.title+'</div><div class="nd">'+n.desc+'</div><div class="nm">📅 '+n.date+' • 📰 '+n.src+'</div></div></div>';
}).join('');
}

function showNews(cat,idx){
var n=ND[cat][idx];
alert('📰 '+n.title+'\n\n'+n.desc+'\n\n📅 '+n.date+'\n📰 स्रोत: '+n.src+'\n\nपूरी खबर के लिए मूल स्रोत देखें।');
}

function rht(){
var b=document.getElementById('ht');if(!b)return;
var i=ND.trending.slice(0,3);
b.innerHTML=i.map(function(n,idx){
return '<div class="nw tr" onclick="go(\'news\')"><div class="ni">'+n.icon+'</div><div><div class="nt">'+n.title+'</div><div class="nd">'+n.desc+'</div></div></div>';
}).join('');
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
if(f.length==0){b.innerHTML='<p style="color:#888;font-size:12px">कोई कंपनी नहीं।</p>';return;}
f.sort(function(a,b){return b.complaints-a.complaints;});
b.innerHTML=f.map(function(c){return cc(c);}).join('');
}

function cc(c){
var cl=c.rating=='green'?'':(c.rating=='yellow'?'ry':'rr');
var bd=c.rating=='green'?'<span class="bd bg">🟢 सुरक्षित</span>':(c.rating=='yellow'?'<span class="bd by">🟡 सावधान</span>':'<span class="bd br">🔴 अलर्ट</span>');
return '<div class="cp '+cl+'"><h3>'+c.name+' '+bd+'</h3><p>📍 '+c.address+' | '+(c.type||'')+'</p><p>📢 शिकायतें: <b>'+c.complaints+'</b></p></div>';
}

function rad(cat){
var b=document.getElementById('jl');if(!b)return;
var f=AD.filter(function(a){return a.cat==cat;});
b.innerHTML=f.length==0?'<p style="font-size:12px">कोई विज्ञापन नहीं।</p>':f.map(function(a){
return '<div class="item"><h3>'+a.title+'</h3><p>'+a.detail+'</p><p>📞 <a href="tel:'+a.phone+'">'+a.phone+'</a></p></div>';
}).join('');
}

function subc(e){
e.preventDefault();
var cn=document.getElementById('cn').value.trim();
SC.push({
name:cn,
address:document.getElementById('ca').value.trim(),
worker:document.getElementById('wn').value.trim(),
phone:document.getElementById('wp').value.trim(),
type:document.getElementById('ct').value,
detail:document.getElementById('cd').value.trim(),
proof:document.getElementById('cp').value.trim(),
date:new Date().toLocaleDateString('hi-IN'),
status:'pending'
});
var co=C.find(function(c){return c.name.toLowerCase()==cn.toLowerCase();});
if(co){co.complaints++;}
else{C.push({name:cn,address:document.getElementById('ca').value.trim(),complaints:1,rating:'yellow',type:'अन्य'});}
ss();
document.getElementById('sm1').style.display='block';
e.target.reset();
setTimeout(function(){document.getElementById('sm1').style.display='none';},5000);
}

function rmc(){
var b=document.getElementById('mcl');
if(SC.length==0){b.innerHTML='<p style="font-size:12px">कोई शिकायत नहीं।</p>';return;}
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
if(approved.length==0){
b.innerHTML='<p style="color:#888;font-size:12px">अभी कोई सार्वजनिक शिकायत नहीं। एडमिन जाँच के बाद यहाँ दिखेंगी।</p>';
return;
}
b.innerHTML=approved.slice(-5).reverse().map(function(c){
return '<div class="cp"><h3>'+c.name+' <span class="bd bg">✅ सत्यापित</span></h3><p>📍 '+c.address+'</p><p>📋 '+c.type+'</p><p>💬 '+c.detail+'</p><p style="font-size:10px;color:#999">दर्ज: '+c.date+'</p></div>';
}).join('');
}

function scomp(){
var q=document.getElementById('sq').value.toLowerCase().trim();
var b=document.getElementById('sr');
if(!q){b.innerHTML='<p style="color:#888">कंपनी का नाम लिखें...</p>';return;}
var f=C.filter(function(c){return c.name.toLowerCase().indexOf(q)>-1;});
b.innerHTML=f.length==0?'<p style="color:#b30000">कोई कंपनी नहीं।</p>':f.map(function(c){return cc(c);}).join('');
}

function ral(){
var b=document.getElementById('al');
b.innerHTML=[].concat(C).sort(function(a,b){return b.complaints-a.complaints;}).map(function(c){return cc(c);}).join('');
}

function suba(e){
e.preventDefault();
AD.push({id:Date.now(),title:document.getElementById('at').value.trim(),cat:document.getElementById('ac').value,detail:document.getElementById('ad').value.trim(),phone:document.getElementById('ap').value.trim()});
ss();
document.getElementById('sm2').style.display='block';
e.target.reset();
setTimeout(function(){document.getElementById('sm2').style.display='none';},5000);
}

function alog(){
if(document.getElementById('apw').value=='admin123'){
document.getElementById('alb').classList.add('h');
document.getElementById('apn').classList.remove('h');
rAdmin();
}else{alert('❌ गलत पासवर्ड!');}
}

function rAdmin(){
var pending=SC.filter(function(c){return !c.status||c.status=='pending';});
var approved=SC.filter(function(c){return c.status=='approved';});
var rejected=SC.filter(function(c){return c.status=='rejected';});

var bp=document.getElementById('acomplPending');
if(pending.length==0){bp.innerHTML='<p style="font-size:12px">कोई नई शिकायत नहीं।</p>';}
else{
bp.innerHTML=pending.map(function(c){
var i=SC.indexOf(c);
return '<div class="cp rr"><h3>'+c.name+'</h3><p>👷 '+c.worker+' | 📱 '+c.phone+'</p><p>📍 '+c.address+'</p><p>📋 '+c.type+'</p><p>💬 '+c.detail+'</p>'+(c.proof?'<p>🔍 सबूत: '+c.proof+'</p>':'')+'<p style="font-size:10px;color:#999">दर्ज: '+c.date+'</p><div style="margin-top:8px"><button class="btn-ok" onclick="approve('+i+')">✅ स्वीकार करें</button><button class="btn-no" onclick="reject('+i+')">❌ रद्द करें</button></div></div>';
}).join('');
}

var ba=document.getElementById('acomplApproved');
if(approved.length==0){ba.innerHTML='<p style="font-size:12px">कोई स्वीकृत शिकायत नहीं।</p>';}
else{
ba.innerHTML=approved.map(function(c){
var i=SC.indexOf(c);
return '<div class="cp"><h3>'+c.name+'</h3><p>💬 '+c.detail+'</p><p style="font-size:10px;color:#999">दर्ज: '+c.date+'</p><button class="btn-no" onclick="reject('+i+')" style="margin-top:6px">❌ रद्द करें</button></div>';
}).join('');
}

var br=document.getElementById('acomplRejected');
if(rejected.length==0){br.innerHTML='<p style="font-size:12px">कोई रद्द शिकायत नहीं।</p>';}
else{
br.innerHTML=rejected.map(function(c){
var i=SC.indexOf(c);
return '<div class="cp"><h3>'+c.name+'</h3><p>💬 '+c.detail+'</p><button class="btn-ok" onclick="approve('+i+')" style="margin-top:6px">✅ बहाल करें</button></div>';
}).join('');
}
}

function approve(i){SC[i].status='approved';ss();rAdmin();alert('✅ शिकायत स्वीकार हुई! अब यह होम पेज पर सबको दिखेगी।');}
function reject(i){SC[i].status='rejected';ss();rAdmin();alert('❌ शिकायत रद्द की गई।');}

function ss(){
localStorage.setItem('aia',JSON.stringify(AD));
localStorage.setItem('ais',JSON.stringify(SC));
localStorage.setItem('aic',JSON.stringify(C));
}

sts();updTk();rht();rPublic();
