/* ============ शुरुआत में सब चालू करें ============ */
document.addEventListener('DOMContentLoaded',function(){
sts();
updTk();
rht();
rPublic();
rTopSuggest();
});

/* ============ एंटर की = काम करे ============ */
document.addEventListener('keydown',function(e){
if(e.key==='Enter'){
var el=document.activeElement;
if(el&&el.tagName==='INPUT'&&el.id!=='ns'){e.preventDefault();}
}
});
