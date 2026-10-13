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
{title:"🔴 देशभर में मजदूरों की हड़ताल",desc:"न्यूनतम मजदूरी की मांग।",date:"आज",src:"राष्ट्रीय",icon:"🔥"},
{title:"मनरेगा मजदूरी ₹50 बढ़ी",desc:"सभी राज्यों में संशोधन।",date:"आज",src:"ग्रामीण",icon:"🌾"},
{title:"गिग वर्कर्स को PF और बीमा",desc:"Ola, Uber, Swiggy को राहत।",date:"1 दिन",src:"श्रम मंत्रालय",icon:"📋"}],
breaking:[
{title:"सोनभद्र में 5 मजदूर घायल",desc:"निर्माण स्थल पर हादसा।",date:"अभी",src:"स्थानीय",icon:"🚨"},
{title:"रेलवे में 10,000 नौकरियाँ",desc:"तकनीशियन और हेल्पर।",date:"आज",src:"रेलवे",icon:"🚂"}],
hartal:[
{title:"⚠️ हरियाणा में 15 अक्टूबर से हड़ताल",desc:"अनिश्चितकालीन हड़ताल।",date:"आज",src:"श्रम",icon:"✊"},
{title:"महाराष्ट्र ऑटो कर्मचारी हड़ताल",desc:"3 दिन से जारी।",date:"1 दिन",src:"महाराष्ट्र",icon:"⚠️"},
{title:"झारखंड कोयला मजदूर प्रदर्शन",desc:"बकाया वेतन की मांग।",date:"2 दिन",src:"झारखंड",icon:"✊"}],
mazdoor:[
{title:"नियुक्ति पत्र अनिवार्य",desc:"हर कंपनी को देना होगा।",date:"आज",src:"श्रम",icon:"👷"},
{title:"ओवरटाइम डबल मिलेगा",desc:"नए कानून में 2x।",date:"1 दिन",src:"श्रम",icon:"💰"},
{title:"ESIC का दायरा बढ़ा",desc:"₹21,000 तक।",date:"2 दिन",src:"स्वास्थ्य",icon:"🏥"}],
company:[
{title:"टाटा स्टील में 500 भर्तियाँ",desc:"ITI और डिप्लोमा।",date:"आज",src:"कंपनी",icon:"🏢"},
{title:"L&T में 2000 पद",desc:"इंजीनियर से मजदूर।",date:"1 दिन",src:"कंपनी",icon:"🏗️"}],
india:[
{title:"नई श्रम नीति लागू",desc:"4 नई संहिताएँ।",date:"आज",src:"राष्ट्रीय",icon:"🇮🇳"},
{title:"PM आवास योजना नए आवेदन",desc:"नई किस्त।",date:"1 दिन",src:"आवास",icon:"🏠"}],
world:[
{title:"अमेरिका में मजदूर हड़ताल",desc:"कारखाने बंद।",date:"आज",src:"विदेश",icon:"🌍"},
{title:"यूरोप में गिग वर्कर्स को अधिकार",desc:"EU ने कानून बनाए।",date:"2 दिन",src:"विदेश",icon:"🌐"}],
up:[
{title:"UP में 5,000 कॉन्स्टेबल भर्ती",desc:"बड़ी भर्ती।",date:"आज",src:"UP",icon:"👮"},
{title:"शिक्षक भर्ती 15,000 पद",desc:"बेसिक शिक्षा।",date:"1 दिन",src:"शिक्षा",icon:"📚"}],
sonbhadra:[
{title:"सोनभद्र में नई सड़क",desc:"120 करोड़ की लागत।",date:"आज",src:"स्थानीय",icon:"🛣️"},
{title:"बीजपुर में श्रमिक शिविर",desc:"मजदूरों को जानकारी।",date:"1 दिन",src:"श्रम",icon:"👷"}]};
var CAT='trending';
function go(p){var ps=['home','news','jobs','comp','shikayat','mycomp','laws','search','alert','post','admin','help'];
ps.forEach(function(x){var e=document.getElementById('p-'+x),n=document.getElementById('n-'+x);if(e)e.classList.add('h');if(n)n.classList.remove('active');});
document.getElementById('p-'+p).classList.remove('h');
document.getElementById('n-'+p).classList.add('active');
window.scrollTo({top:0,behavior:'smooth'});
if(p=='home'){sts();rht();}
if(p=='news')rnews();
if(p=='jobs')rad('job');
if(p=='comp')rcomp();
if(p=='mycomp')rmc();
if(p=='alert')ral();}
function sts(){document.getElementById('sa').innerText=AD.length;document.getElementById('sc').innerText=SC.length;document.getElementById('sco').innerText=C.length;}
function sw(c,b){CAT=c;document.querySelectorAll('.tt').forEach(function(x){x.classList.remove('active');});b.classList.add('active');rnews();}
function rnews(){var l=document.getElementById('nl');var q=(document.getElementById('ns')?.value||'').toLowerCase();
var items=ND[CAT]||[];
if(q)items=items.filter(function(n){return n.title.toLowerCase().includes(q)||n.desc.toLowerCase().includes(q);});
if(items.length==0){l.innerHTML='<p style="color:#888;font-size:12px">कोई खबर नहीं।</p>';return;}
l.innerHTML=items.map(function(n){var ec=CAT=='trending'?'tr':(CAT=='hartal'?'ha':'');
return '<div class="nw '+ec+'"><div class="ni">'+n.icon+'</div><div><div class="nt">'+n.title+'</div><div class="nd">'+n.desc+'</div><div class="nm">📅 '+n.date+' • 📰 '+n.src+'</div></div></div>';}).join('');}
function rht(){var b=document.getElementById('ht');if(!b)return;var i=ND.trending.slice(0,3);
b.innerHTML=i.map(function(n){return '<div class="nw tr" style="cursor:pointer" onclick="go(\'news\')"><div class="ni">'+n.icon+'</div><div><div class="nt">'+n.title+'</div><div class="nd">'+n.desc+'</div></div></div>';}).join('');}
function updTk(){var t=document.getElementById('tk');if(!t)return;var a=[].concat(ND.breaking,ND.trending,ND.hartal);t.innerText=a.map(function(n){return '• '+n.title;}).join('  ');}
function rcomp(){var b=document.getElementById('cl');var q=(document.getElementById('cs')?.value||'').toLowerCase();
var f=C.filter(function(c){return !q||c.name.toLowerCase().includes(q);});
if(f.length==0){b.innerHTML='<p style="color:#888;font-size:12px">कोई कंपनी नहीं।</p>';return;}
f.sort(function(a,b){return b.complaints-a.complaints;});
b.innerHTML=f.map(function(c){return cc(c);}).join('');}
function cc(c){var cl=c.rating=='green'?'':(c.rating=='yellow'?'ry':'rr');
var bd=c.rating=='green'?'<span class="bd bg">🟢 सुरक्षित</span>':(c.rating=='yellow'?'<span class="bd by">🟡 सावधान</span>':'<span class="bd br">🔴 अलर्ट</span>');
return '<div class="cp '+cl+'"><h3>'+c.name+' '+bd+'</h3><p>📍 '+c.address+' | '+(c.type||'')+'</p><p>📢 शिकायतें: <b>'+c.complaints+'</b></p></div>';}
function rad(cat){var b=document.getElementById('jl');if(!b)return;
var f=AD.filter(function(a){return a.cat==cat;});
b.innerHTML=f.length==0?'<p style="font-size:12px">कोई विज्ञापन नहीं।</p>':f.map(function(a){return '<div class="item"><h3>'+a.title+'</h3><p>'+a.detail+'</p><p>📞 <a href="tel:'+a.phone+'">'+a.phone+'</a></p></div>';}).join('');}
function subc(e){e.preventDefault();var cn=document.getElementById('cn').value.trim();
SC.push({name:cn,address:document.getElementById('ca').value.trim(),worker:document.getElementById('wn').value.trim(),type:document.getElementById('ct').value,detail:document.getElementById('cd').value.trim(),date:new Date().toLocaleDateString('hi-IN')});
var co=C.find(function(c){return c.name.toLowerCase()==cn.toLowerCase();});
if(co){co.complaints++;if(co.complaints>=5)co.rating='red';else if(co.complaints>=2)co.rating='yellow';}
else{C.push({name:cn,address:document.getElementById('ca').value.trim(),complaints:1,rating:'yellow',type:'अन्य'});}
ss();document.getElementById('sm1').style.display='block';e.target.reset();
setTimeout(function(){document.getElementById('sm1').style.display='none';},5000);}
function rmc(){var b=document.getElementById('mcl');
b.innerHTML=SC.length==0?'<p style="font-size:12px">कोई शिकायत नहीं।</p>':SC.map(function(c){return '<div class="cp"><h3>'+c.name+'</h3><p>📍 '+c.address+'</p><p>📋 '+c.type+'</p><p>💬 '+c.detail+'</p><p style="font-size:10px;color:#999">दर्ज: '+c.date+'</p></div>';}).join('');}
function scomp(){var q=document.getElementById('sq').value.toLowerCase().trim();var b=document.getElementById('sr');
if(!q){b.innerHTML='<p style="color:#888">कंपनी का नाम लिखें...</p>';return;}
var f=C.filter(function(c){return c.name.toLowerCase().includes(q);});
b.innerHTML=f.length==0?'<p style="color:#b30000">कोई कंपनी नहीं।</p>':f.map(function(c){return cc(c);}).join('');}
function ral(){var b=document.getElementById('al');b.innerHTML=[].concat(C).sort(function(a,b){return b.complaints-a.complaints;}).map(function(c){return cc(c);}).join('');}
function suba(e){e.preventDefault();AD.push({id:Date.now(),title:document.getElementById('at').value.trim(),cat:document.getElementById('ac').value,detail:document.getElementById('ad').value.trim(),phone:document.getElementById('ap').value.trim()});
ss();document.getElementById('sm2').style.display='block';e.target.reset();
setTimeout(function(){document.getElementById('sm2').style.display='none';},5000);}
function alog(){if(document.getElementById('apw').value=='admin123'){document.getElementById('alb').classList.add('h');document.getElementById('apn').classList.remove('h');
var b=document.getElementById('acompl');
b.innerHTML=SC.length==0?'<p>कोई शिकायत नहीं।</p>':SC.map(function(c){return '<div class="cp"><h3>'+c.name+'</h3><p>👷 '+c.worker+' | '+c.type+'</p><p>💬 '+c.detail+'</p></div>';}).join('');
}else{alert('❌ गलत पासवर्ड!');}}
function ss(){localStorage.setItem('aia',JSON.stringify(AD));localStorage.setItem('ais',JSON.stringify(SC));localStorage.setItem('aic',JSON.stringify(C));}
sts();updTk();rht();
