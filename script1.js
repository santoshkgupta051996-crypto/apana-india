var C=JSON.parse(localStorage.getItem('aic'))||[
{name:"NTPC रिहंद",address:"सोनभद्र, UP",complaints:2,rating:"yellow",type:"बिजली",owner:"प्रबंधक",phone:"9876500001"},
{name:"Coal India",address:"सिंगरौली, MP",complaints:1,rating:"green",type:"कोयला",owner:"प्रबंधक",phone:"9876500002"},
{name:"ABC Constructions",address:"सूरत, GJ",complaints:5,rating:"red",type:"निर्माण",owner:"ए.बी.सी.",phone:"9876500003"},
{name:"Reliance Industries",address:"मुंबई, MH",complaints:2,rating:"yellow",type:"उद्योग",owner:"प्रबंधक",phone:"9876500004"},
{name:"Tata Steel",address:"जमशेदपुर, JH",complaints:1,rating:"green",type:"स्टील",owner:"प्रबंधक",phone:"9876500005"},
{name:"Adani Enterprises",address:"अहमदाबाद, GJ",complaints:1,rating:"green",type:"उद्योग",owner:"प्रबंधक",phone:"9876500006"},
{name:"Hindalco",address:"रेनुकूट, UP",complaints:0,rating:"green",type:"एल्युमिनियम",owner:"प्रबंधक",phone:"9876500007"},
{name:"L&T Construction",address:"चेन्नई, TN",complaints:0,rating:"green",type:"निर्माण",owner:"एल.टी.",phone:"9876500008"}];

var SC=JSON.parse(localStorage.getItem('ais'))||[];

var AD=JSON.parse(localStorage.getItem('aia'))||[
{id:1,title:"ITI इलेक्ट्रिशियन चाहिए",cat:"job",detail:"2 साल अनुभव। ₹800/दिन।",phone:"9876543210",state:"गुजरात",district:"सूरत"},
{id:2,title:"2BHK फ्लैट बिक्री",cat:"property",detail:"950 sq ft। ₹25 लाख।",phone:"9876500000",state:"महाराष्ट्र",district:"पुणे"}];

var WK=JSON.parse(localStorage.getItem('aiw'))||[
{id:1,name:"रामू यादव",phone:"9876543210",skill:"राजमिस्त्री",exp:8,village:"बभनी",block:"बभनी",district:"सोनभद्र",state:"उत्तर प्रदेश",photo:"",date:"10/10/2025"},
{id:2,name:"सुरेश कुमार",phone:"9876543211",skill:"वेल्डर",exp:5,village:"बीजपुर",block:"बीजपुर",district:"सोनभद्र",state:"उत्तर प्रदेश",photo:"",date:"11/10/2025"},
{id:3,name:"मोहन लाल",phone:"9876543212",skill:"मजदूर (अकुशल)",exp:10,village:"म्योरपुर",block:"म्योरपुर",district:"सोनभद्र",state:"उत्तर प्रदेश",photo:"",date:"11/10/2025"},
{id:4,name:"अनीता देवी",phone:"9876543213",skill:"सिलाई / टेलरिंग",exp:6,village:"रॉबर्ट्सगंज",block:"रॉबर्ट्सगंज",district:"सोनभद्र",state:"उत्तर प्रदेश",photo:"",date:"12/10/2025"}];

var US=JSON.parse(localStorage.getItem('aiu'))||[];

var CONT=JSON.parse(localStorage.getItem('aict'))||[
{id:1,name:"राजेश ठेकेदार",phone:"9876543220",work:"वेल्डिंग",rate:"₹700/दिन",food:"फ्री",place:"NTPC रिहंद",qty:"10",other:"PF, बोनस, ओवरटाइम 2x",date:"13/10/2025"},
{id:2,name:"मुकेश कंस्ट्रक्शन",phone:"9876543221",work:"कंस्ट्रक्शन",rate:"₹650/दिन",food:"फ्री",place:"सिंगरौली",qty:"20",other:"रहना फ्री",date:"12/10/2025"}];

var PANCH=JSON.parse(localStorage.getItem('aipn'))||[
{id:1,name:"रामलाल",phone:"9876543230",village:"बभनी",block:"बभनी",district:"सोनभद्र",type:"सड़क",detail:"बभनी-म्योरपुर सड़क टूटी है। 6 महीने से ठीक नहीं हुई।",date:"13/10/2025"},
{id:2,name:"सीता देवी",phone:"9876543231",village:"बीजपुर",block:"बीजपुर",district:"सोनभद्र",type:"पानी",detail:"हैंडपंप खराब है। महिलाओं को दूर से पानी लाना पड़ता है।",date:"12/10/2025"}];

var SUGG=JSON.parse(localStorage.getItem('aisg'))||[
{id:1,name:"संतोष कुमार",text:"वेबसाइट पर मजदूरों के लिए शिक्षा की जानकारी भी होनी चाहिए।",likes:15,date:"13/10/2025"},
{id:2,name:"प्रीति यादव",text:"महिला मजदूरों के लिए अलग सेक्शन बनाना चाहिए।",likes:12,date:"12/10/2025"},
{id:3,name:"अजय सिंह",text:"ओवरटाइम कैलकुलेटर बहुत काम का है। धन्यवाद!",likes:8,date:"11/10/2025"}];

var SHOPS=JSON.parse(localStorage.getItem('aish'))||[
{id:1,owner:"गुप्ता जी",name:"गुप्ता किराना स्टोर",phone:"9876543210",type:"किराना",place:"बभनी, सोनभद्र",product:"आटा, चावल, तेल",price:100,photo:"",date:"10/10/2025"},
{id:2,owner:"जन औषधि",name:"जन औषधि केंद्र",phone:"9876543211",type:"मेडिकल",place:"रॉबर्ट्सगंज",product:"पैरासिटामोल",price:20,photo:"",date:"11/10/2025"},
{id:3,owner:"शर्मा जी",name:"शर्मा हार्डवेयर",phone:"9876543212",type:"हार्डवेयर",place:"बीजपुर",product:"सीमेंट (50kg)",price:400,photo:"",date:"11/10/2025"}];

var NUMBERS=[
{name:"🚨 नेशनल इमरजेंसी",num:"112",desc:"कोई भी आपातकाल",cls:"red"},
{name:"👮 पुलिस",num:"100",desc:"पुलिस सहायता",cls:"red"},
{name:"🚑 एम्बुलेंस",num:"108",desc:"मेडिकल इमरजेंसी",cls:"red"},
{name:"🔥 फायर ब्रिगेड",num:"101",desc:"आग लगने पर",cls:"red"},
{name:"👷 श्रम विभाग",num:"1800114000",desc:"मजदूरों के लिए (टोल फ्री)",cls:"yellow"},
{name:"👩 महिला हेल्पलाइन",num:"1091",desc:"महिलाओं के लिए",cls:"yellow"},
{name:"👶 चाइल्ड हेल्पलाइन",num:"1098",desc:"बच्चों के लिए",cls:"yellow"},
{name:"💻 साइबर क्राइम",num:"1930",desc:"ऑनलाइन ठगी",cls:"yellow"},
{name:"🧠 मेंटल हेल्थ",num:"14416",desc:"मानसिक स्वास्थ्य",cls:""},
{name:"🚂 रेलवे",num:"139",desc:"ट्रेन संबंधी",cls:""},
{name:"📞 एंटी करप्शन",num:"1064",desc:"भ्रष्टाचार शिकायत",cls:""},
{name:"🛡️ कंज्यूमर",num:"1915",desc:"उपभोक्ता शिकायत",cls:""}];

var COURSES=[
{icon:"🔧",name:"वेल्डिंग कोर्स",desc:"गैस, आर्क, MIG/TIG — हिंदी में",price:199,old:499},
{icon:"⚡",name:"इलेक्ट्रिशियन कोर्स",desc:"वायरिंग, मोटर, पैनल",price:199,old:499},
{icon:"🚗",name:"HTV ड्राइविंग",desc:"ट्रक, बस, ट्रेलर",price:299,old:699},
{icon:"📱",name:"मोबाइल रिपेयर",desc:"स्मार्टफोन, डिस्प्ले, बैटरी",price:249,old:599},
{icon:"🔩",name:"फिटर / टर्नर",desc:"ITI फिटर की पूरी तैयारी",price:199,old:499},
{icon:"✂️",name:"सिलाई / टेलरिंग",desc:"महिलाओं के लिए",price:149,old:399},
{icon:"🧑‍🍳",name:"कुकिंग कोर्स",desc:"होटल, ढाबा, कैटरिंग",price:149,old:399},
{icon:"❄️",name:"AC / फ्रिज रिपेयर",desc:"AC, फ्रिज, वॉशिंग मशीन",price:249,old:599}];

var ND={
trending:[
{title:"🔴 देशभर में मजदूरों की हड़ताल",desc:"न्यूनतम मजदूरी बढ़ाने की मांग को लेकर मजदूर संगठनों ने हड़ताल का ऐलान किया।",date:"आज",src:"राष्ट्रीय समाचार",icon:"🔥"},
{title:"मनरेगा मजदूरी में ₹50 की बढ़ोतरी",desc:"ग्रामीण विकास मंत्रालय ने सभी राज्यों के लिए मजदूरी दरों में संशोधन किया।",date:"आज",src:"ग्रामीण समाचार",icon:"🌾"},
{title:"गिग वर्कर्स को PF और बीमा",desc:"Ola, Uber, Swiggy, Zomato के कर्मचारियों को बड़ी राहत।",date:"1 दिन पहले",src:"श्रम मंत्रालय",icon:"📋"}],
breaking:[
{title:"सोनभद्र में बड़ा हादसा, 5 मजदूर घायल",desc:"निर्माण स्थल पर मलबा गिरने से हादसा।",date:"अभी",src:"स्थानीय समाचार",icon:"🚨"},
{title:"रेलवे में 10,000 नई नौकरियाँ",desc:"तकनीशियन और हेल्पर पदों के लिए भर्ती।",date:"आज",src:"रेलवे समाचार",icon:"🚂"}],
hartal:[
{title:"⚠️ हरियाणा: 15 अक्टूबर से हड़ताल",desc:"न्यूनतम मजदूरी न बढ़ने पर अनिश्चितकालीन हड़ताल।",date:"आज",src:"श्रम समाचार",icon:"✊"},
{title:"महाराष्ट्र ऑटो कर्मचारी हड़ताल",desc:"तीन दिन से हड़ताल जारी।",date:"1 दिन पहले",src:"महाराष्ट्र समाचार",icon:"⚠️"},
{title:"झारखंड कोयला मजदूर प्रदर्शन",desc:"बकाया वेतन की मांग।",date:"2 दिन पहले",src:"झारखंड समाचार",icon:"✊"}],
mazdoor:[
{title:"नियुक्ति पत्र अनिवार्य",desc:"हर कंपनी को मजदूरों को लिखित पत्र देना होगा।",date:"आज",src:"श्रम मंत्रालय",icon:"👷"},
{title:"ओवरटाइम का पैसा अब डबल",desc:"नए कानून में ओवरटाइम 2x।",date:"1 दिन पहले",src:"श्रम समाचार",icon:"💰"},
{title:"ESIC का दायरा बढ़ा",desc:"₹21,000 तक वाले श्रमिक शामिल।",date:"2 दिन पहले",src:"स्वास्थ्य विभाग",icon:"🏥"}],
company:[
{title:"NTPC में 500 नई भर्तियाँ",desc:"ITI और डिप्लोमा वालों के लिए।",date:"आज",src:"कंपनी समाचार",icon:"🏢"},
{title:"L&T में 2000 पद",desc:"इंजीनियर, सुपरवाइजर, मजदूर।",date:"1 दिन पहले",src:"कंपनी समाचार",icon:"🏗️"},
{title:"Coal India में बंपर भर्ती",desc:"10,000 पदों पर भर्ती।",date:"2 दिन पहले",src:"कंपनी समाचार",icon:"⛏️"}],
india:[
{title:"देश में नई श्रम नीति लागू",desc:"4 नई श्रम संहिताएँ लागू।",date:"आज",src:"राष्ट्रीय समाचार",icon:"🇮🇳"},
{title:"PM आवास योजना नए आवेदन",desc:"नई किस्त जारी।",date:"1 दिन पहले",src:"आवास समाचार",icon:"🏠"}],
world:[
{title:"अमेरिका में मजदूर हड़ताल",desc:"कारखाने बंद।",date:"आज",src:"अंतर्राष्ट्रीय",icon:"🌍"},
{title:"यूरोप में गिग वर्कर्स को अधिकार",desc:"EU ने नए कानून बनाए।",date:"2 दिन पहले",src:"विदेश समाचार",icon:"🌐"}],
up:[
{title:"UP में 5,000 कॉन्स्टेबल भर्ती",desc:"बड़े पैमाने पर भर्ती।",date:"आज",src:"UP समाचार",icon:"👮"},
{title:"शिक्षक भर्ती 15,000 पद",desc:"बेसिक शिक्षा विभाग।",date:"1 दिन पहले",src:"शिक्षा समाचार",icon:"📚"}],
sonbhadra:[
{title:"सोनभद्र में नई सड़क परियोजना",desc:"120 करोड़ की लागत से 45 किमी।",date:"आज",src:"स्थानीय समाचार",icon:"🛣️"},
{title:"बीजपुर में श्रमिक शिविर",desc:"मजदूरों को जानकारी दी गई।",date:"1 दिन पहले",src:"श्रम विभाग",icon:"👷"},
{title:"म्योरपुर में स्वास्थ्य शिविर",desc:"निःशुल्क जाँच 15 अक्टूबर।",date:"2 दिन पहले",src:"स्वास्थ्य विभाग",icon:"🏥"}]};

var CAT='trending';
var wPhotoData='';
var shPhotoData='';

function ss(){
localStorage.setItem('aia',JSON.stringify(AD));
localStorage.setItem('ais',JSON.stringify(SC));
localStorage.setItem('aic',JSON.stringify(C));
localStorage.setItem('aiu',JSON.stringify(US));
localStorage.setItem('aiw',JSON.stringify(WK));
localStorage.setItem('aict',JSON.stringify(CONT));
localStorage.setItem('aipn',JSON.stringify(PANCH));
localStorage.setItem('aisg',JSON.stringify(SUGG));
localStorage.setItem('aish',JSON.stringify(SHOPS));
}
