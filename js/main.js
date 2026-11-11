// AMPLOP PEMBUKA, HITUNG MUNDUR, PENGHITUNG HARI, TOMBOL SAYANGG, SURAT BERTAHAP, HUJAN HATI
(function(){
var $=function(s){return document.querySelector(s)};
var start=new Date(2023,10,11),target=new Date(2026,10,11,0,0,0);
function pad(n){return String(n).padStart(2,"0")}
function tick(){
 var n=new Date(),d=target-n,el=$("#cd");
 if(d>0){var t=Math.floor(d/1000);
  el.innerHTML=[["Hari",Math.floor(t/86400)],["Jam",Math.floor(t%86400/3600)],["Menit",Math.floor(t%3600/60)],["Detik",t%60]].map(function(x){return "<div><b>"+pad(x[1])+"</b><span>"+x[0]+"</span></div>"}).join("");
  $("#cdl").textContent="SELAMAT ANNIVERSARY KE-3 TAHUN SAYANGG !!!";
 }else{el.innerHTML="";$("#cdl").textContent="Hari ini hari kita. Selamat Anniversary!"}
 $("#dayNum").textContent=Math.max(0,Math.floor((n-start)/864e5)).toLocaleString("id-ID");
}
tick();setInterval(tick,1000);
function rain(c,k){for(var i=0;i<k;i++)(function(i){setTimeout(function(){
 var e=document.createElement("span");e.className="fl";e.textContent=c[Math.floor(Math.random()*c.length)];
 e.style.left=Math.random()*100+"vw";e.style.fontSize=(16+Math.random()*22)+"px";e.style.animationDuration=(3+Math.random()*3)+"s";
 document.body.appendChild(e);setTimeout(function(){e.remove()},6500)},i*70)})(i)}
$("#env").addEventListener("click",function(){
 this.classList.add("open");rain(["💗","🌸","🤍","♡"],36);
 setTimeout(function(){document.body.classList.add("opened");window.Slides&&Slides.go(0)},1100);
},{once:true});
var msgs=["ABANG SAYANGG ADEKK🥹","Adek Itu Rumah Bagi Abang!","Bangga dan Bersyukur Banget Punya Adek","KANGENNN BERATTT SUMPAHH","Tunggu Abangg Yaaa, Aband Datang","Jangan ngambek-ngambek utututuu abang di sini","Cuma adek, dari dulu cuma adek","Abang bucin, dan sama sekali nggak menyesal milih adek😘❤️"],mi=0;
$("#tap").addEventListener("click",function(){$("#out").textContent=msgs[mi++%msgs.length];rain(["♡"],6)});
var box=$("#letterBox"),parts=box.textContent.trim().split(/\n\s*\n/);
box.innerHTML="";parts.forEach(function(t){var p=document.createElement("p");p.textContent=t.trim();box.appendChild(p)});
var played=false;
$("#readBtn").addEventListener("click",function(){
 if(played)return;played=true;this.style.display="none";
 var ps=box.querySelectorAll("p");
 ps.forEach(function(p,i){setTimeout(function(){p.classList.add("show");if(i>0)p.scrollIntoView({behavior:"smooth",block:"center"})},i*2200)});
 setTimeout(function(){rain(["💗","🌸","🤍","♡","🥹"],60)},ps.length*2200);
});
})();
