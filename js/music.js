/* ===== Musik latar =====
   Jika ada file musik.mp3 di folder yang sama, itu yang diputar.
   Jika tidak ada, diputar melodi kotak musik lembut buatan browser. */
(function(){
var btn=document.getElementById("mus"),want=false,mode="";
var audio=new Audio("musik.mp3");audio.loop=true;audio.volume=.6;
var ctx,master,timer,next=0,step=0;
var chords=[[261.63,329.63,392,523.25],[220,261.63,329.63,440],[174.61,261.63,349.23,440],[196,246.94,293.66,392]];
var pat=[0,1,2,3,2,1,2,3];
function note(f,t,d,type,v){var o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.value=f;
 g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+d);
 o.connect(g);g.connect(master);o.start(t);o.stop(t+d+.05)}
function play(i,t){var c=chords[Math.floor(i/8)%4],k=i%8;
 if(k===0)note(c[0]/2,t,2.6,"sine",.16);
 note(c[pat[k]]*2,t,1.3,"triangle",.09);
 if(k===4)note(c[2]*2,t,1.6,"triangle",.05)}
function sched(){while(next<ctx.currentTime+.6){play(step,next);next+=.43;step++}}
function startSynth(){
 var AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
 if(!ctx){ctx=new AC();master=ctx.createGain();master.gain.value=.8;
  var dl=ctx.createDelay(),fb=ctx.createGain();dl.delayTime.value=.32;fb.gain.value=.38;
  master.connect(ctx.destination);master.connect(dl);dl.connect(fb);fb.connect(dl);dl.connect(ctx.destination)}
 ctx.resume();next=ctx.currentTime+.1;clearInterval(timer);timer=setInterval(sched,200);mode="synth"}
function stopSynth(){clearInterval(timer);if(ctx)ctx.suspend()}
function start(){want=true;btn.classList.remove("off");btn.textContent="🎵";btn.setAttribute("aria-pressed","true");btn.setAttribute("aria-label","Matikan musik");
 var p=audio.play();
 if(p&&p.then)p.then(function(){mode="file"},function(){startSynth()});else startSynth()}
function stop(){want=false;btn.classList.add("off");btn.textContent="🔇";btn.setAttribute("aria-pressed","false");btn.setAttribute("aria-label","Putar musik");
 audio.pause();stopSynth()}
btn.addEventListener("click",function(){want?stop():start()});
document.getElementById("env").addEventListener("click",start,{once:true});
document.addEventListener("visibilitychange",function(){
 if(!want)return;
 if(document.hidden){audio.pause();stopSynth()}else{mode==="file"?audio.play().catch(function(){}):startSynth()}});
/* hati melayang di latar */
var bg=document.getElementById("bg");
for(var i=0;i<14;i++){var e=document.createElement("span");e.textContent=i%3?"♡":"✿";
 e.style.left=(Math.random()*96)+"%";e.style.fontSize=(14+Math.random()*26)+"px";
 e.style.animationDuration=(16+Math.random()*16)+"s";e.style.animationDelay=(-Math.random()*20)+"s";bg.appendChild(e)}
})();
