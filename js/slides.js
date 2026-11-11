// SLIDE: satu bagian per layar. Judul di menu bisa diubah di TITLES (kunci = id section di index.html).
(function(){
var TITLES={sofar:"Sejauh ini",story:"Cerita kita",timeline:"Perjalanan kita",chat:"Chat pertama",gallery:"Galeri kenangan",reasons:"10 alasan",awards:"Penghargaan",game:"Permainan",promise:"Janji dan tombol sayangg",letter:"Surat untukmu",future:"Impian ke depan",secret:"Pesan rahasia",end:"Penutup"};
var slides=[].slice.call(document.querySelectorAll("main>section")),n=slides.length,cur=-1,menuOpen=false;
var ui=document.createElement("div");
ui.innerHTML='<div class="prog" id="prog"></div>'
+'<button class="ib" id="menuBtn" aria-label="Daftar bagian" aria-expanded="false">☰</button>'
+'<div class="botbar"><button class="nbtn ghost" id="prev">‹ Kembali</button><span class="count" id="count"></span><button class="nbtn" id="next">Lanjut ›</button></div>'
+'<div class="scrim" id="scrim"></div>'
+'<div class="sheet" id="sheet" role="dialog" aria-label="Daftar bagian"><h3>Isi website</h3><div id="list"></div></div>';
while(ui.firstChild)document.body.appendChild(ui.firstChild);
function $(id){return document.getElementById(id)}
function esc(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;")}
var list=$("list");
slides.forEach(function(s,i){
 var b=document.createElement("button"),h=s.querySelector("h2"),t=TITLES[s.id]||(h?h.textContent:"Bagian "+(i+1));
 b.innerHTML="<span>"+(i+1)+"</span>"+esc(t);
 b.addEventListener("click",function(){menu(false);go(i)});
 list.appendChild(b);
});
function menu(on){
 menuOpen=on;$("sheet").classList.toggle("on",on);$("scrim").classList.toggle("on",on);
 $("menuBtn").setAttribute("aria-expanded",on?"true":"false");
}
function go(i){
 i=Math.max(0,Math.min(n-1,i));if(i===cur)return;
 var back=i<cur;
 slides.forEach(function(s){s.classList.remove("active","back")});
 var s=slides[i];s.classList.add("active");if(back)s.classList.add("back");s.scrollTop=0;
 cur=i;
 $("count").textContent=(i+1)+" / "+n;
 $("prog").style.width=((i+1)/n*100)+"%";
 $("prev").disabled=i===0;$("next").disabled=i===n-1;
 [].forEach.call(list.children,function(b,k){b.classList.toggle("cur",k===i)});
}
$("prev").addEventListener("click",function(){go(cur-1)});
$("next").addEventListener("click",function(){go(cur+1)});
$("menuBtn").addEventListener("click",function(){menu(!menuOpen)});
$("scrim").addEventListener("click",function(){menu(false)});
document.addEventListener("keydown",function(e){
 if(!document.body.classList.contains("opened"))return;
 if(e.key==="Escape"){menu(false);return}
 var tg=e.target.tagName;if(tg==="INPUT"||tg==="TEXTAREA"||menuOpen)return;
 if(e.key==="ArrowRight")go(cur+1);else if(e.key==="ArrowLeft")go(cur-1);
});
var sx=0,sy=0;
document.addEventListener("touchstart",function(e){sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});
document.addEventListener("touchend",function(e){
 if(!document.body.classList.contains("opened")||menuOpen)return;
 var dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;
 if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.6)go(cur+(dx<0?1:-1));
},{passive:true});
window.Slides={go:go};
})();
