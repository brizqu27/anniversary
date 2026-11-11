// KUIS (GAME 1), TRUTH OR DARE (GAME 2), WHO IS MORE LIKELY (GAME 3), KODE RAHASIA, UPLOAD FOTO GALERI
const $=id=>document.getElementById(id);
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}

/* ===== GAME 1: KUIS =====
   c:0 artinya jawaban benar ada di urutan pertama daftar a (tombol diacak otomatis).
   ROUND = jumlah soal tiap putaran, diambil acak dari semua soal. */
const ROUND=15;
const questions=[
 {q:"Di mana Abdul dan Dela pertama kali berkenalan?",a:["Telegram","Di Yogyakarta","Bot Anonymous"],c:2,why:"Dari sebuah bot Anonymous, cerita kita dimulai. ♡"},
 {q:"Kapan hubungan Abdul dan Dela dimulai?",a:["11 November 2024","11 November 2023","11 Desember 2023"],c:1,why:"11 November 2023, tanggal spesial kita!"},
 {q:"Kapan pertama kali kita bertemu secara langsung?",a:["Desember 2024","November 2023","Januari 2025"],c:0,why:"Desember 2024: akhirnya dua orang di balik layar bertemu."},
 {q:"Apa tantangan yang kembali kita jalani setelah pertemuan pertama?",a:["Berantem","LDR","Beda Visi"],c:1,why:"Jarak memang ada, tapi kita terus belajar menjalaninya."},
 {q:"Apa status hari jadi 11 November 2026?",a:["Anniversary ke-3","Anniversary ke-1","Anniversary ke-2"],c:0,why:"Tiga tahun perjalanan Abdul dan Dela! 🎉"},
 {q:"Berapa lama kita sudah jadian per 11 November 2026?",a:["4 tahun","2 tahun","3 tahun"],c:2,why:"Tiga tahun sejak 11 November 2023. ♡"},
 {q:"Kira-kira sudah berapa lama kita menjalani LDR?",a:["Sekitar 2 tahun","Baru 9 bulan","Sudah 1 tahun"],c:0,why:"Dua tahun berjarak, tapi kita tetap di sini."},
 {q:"Berapa lama jeda dari jadian sampai ketemu pertama kali?",a:["2 Tahun","1 Tahun","Tiga Tahun"],c:1,why:"Dari November 2023 ke Desember 2024. Penantian yang berharga."},
 {q:"Bagaimana kita saling mengenal di awal?",a:["Ketemu Di Pinggir Jalan","Ngobrol Di Tele","Satu kelas di kampus"],c:1,why:"Dari obrolan panjang yang nggak mau selesai."},
 {q:"Apa yang paling sering menjembatani kita saat LDR?",a:["Chat dan video call","Surat merpati","Telepati"],c:0,why:"Layar kecil itu jembatan kita. ♡"},
 {q:"Siapa yang paling pertama menunjukkan ketertarikan?",a:["Abdul","Tukang PHP","Dela"],c:0,why:"Abdul, dengan banyak cinta (dan mungkin banyak kopi) ☕"},
 {q:"Apa yang ingin Abdul perjuangkan bersama Dela?",a:["Pindah ke bulan","DUITTT","Bersama dan serumah tanpa jarak"],c:2,why:"Sampai kita benar-benar bisa bersama. ♡"},
 {q:"Tanggal 11 November 2023 jatuh di hari apa?",a:["Senin","Jumat","Sabtu"],c:2,why:"Sabtu, 11 November 2023."},
 {q:"Kapan kita akan bertemu lagi?",a:["2027","2026","SETERUSNYAAA"],c:2,why:"PASTINYA MAU KETEMU TERUS SAMPAI TUA BERSAMA DONG♡"},
 {q:"Apa yang ingin Dela perjuangkan bersama Abdul?",a:["DUITTT","Bersama dan serumah tanpa jarak","Pindah ke bulan"],c:1,why:"Sampai kita benar-benar bisa bersama. ♡"}
];
let order=[],qi=0,score=0,answered=false,results=[];
function updateBar(){
 $('qNo').textContent='Pertanyaan '+(qi+1)+' / '+order.length;
 $('qScore').textContent='Skor: '+score;
 $('qDots').innerHTML=order.map((_,i)=>'<i class="'+(results[i]===true?'ok':results[i]===false?'bad':i===qi?'now':'')+'"></i>').join('');
}
function renderQ(){
 const q=order[qi];answered=false;
 $('quizPlay').hidden=false;$('qResult').hidden=true;
 $('qText').textContent=q.q;
 const box=$('qChoices');box.innerHTML='';
 shuffle(q.a.map((t,i)=>({t:t,ok:i===q.c}))).forEach(o=>{
  const b=document.createElement('button');b.textContent=o.t;b.dataset.ok=o.ok?'1':'0';
  b.onclick=()=>pick(b,o.ok,q);box.appendChild(b);
 });
 $('qFeedback').textContent='';$('qFeedback').className='feedback';
 $('nextQ').disabled=true;$('nextQ').textContent=qi===order.length-1?'Lihat skor 🎉':'Pertanyaan berikutnya →';
 updateBar();
}
function pick(btn,ok,q){
 if(answered)return;answered=true;
 [...$('qChoices').children].forEach(b=>{b.disabled=true;if(b.dataset.ok==='1')b.classList.add('right');else if(b!==btn)b.classList.add('dim')});
 if(ok){score++}else{btn.classList.add('wrong')}
 results[qi]=ok;
 const fb=$('qFeedback');
 fb.className='feedback '+(ok?'good':'bad');
 fb.textContent=ok?'✅ YEYEYEYYY BENARR! '+q.why:'❌ SALAH LU PARAH. Jawaban yang benar: “'+q.a[q.c]+'”. '+q.why;
 $('nextQ').disabled=false;updateBar();
}
function showResult(){
 const n=order.length,p=score/n;
 $('quizPlay').hidden=true;$('qResult').hidden=false;
 $('rScore').textContent=score;$('rTotal').textContent=n;
 $('rEmoji').textContent=p===1?'🥹':p>=.6?'🥰':'😆';
 $('rMsg').textContent=p===1?'Sempurna! sayangg hafal semua cerita kita. LOPYUULOPYUUUUU ♡':p>=.6?'ISHH ISHH MASIH ADA SALAH PARAH ♡':'Hmm, LEBIH PARAH INII, DILUPA SEMUA GA INGET!😤';
 $('qNo').textContent='Selesai';$('qScore').textContent='Skor: '+score+' / '+n;
 $('qDots').innerHTML=order.map((_,i)=>'<i class="'+(results[i]?'ok':'bad')+'"></i>').join('');
}
function startQuiz(){order=shuffle(questions.slice()).slice(0,ROUND);qi=0;score=0;results=[];renderQ()}
$('nextQ').onclick=()=>{if(qi===order.length-1)showResult();else{qi++;renderQ()}};
$('again').onclick=startQuiz;
startQuiz();

/* ===== GAME 2: TRUTH OR DARE (kartu diacak, tidak berulang sampai habis) ===== */
const truths=[
    "Apa hal pertama yang membuatmu nyaman denganku?",
    "Momen apa yang paling kamu ingat dari hubungan kita?",
    "Apa hal kecil dariku yang paling kamu rindukan?",
    "Apa yang ingin kamu lakukan saat kita bertemu lagi?",
    "Apa satu hal yang ingin kita perbaiki bersama?",
    "Kapan kamu merasa paling disayang olehku?",
    "Apa yang paling ditakuti tentang hubungan jarak jauh ini?",
    "Apa momen paling lucu kita lewat video call?",
    "Apa yang kamu pikirkan saat pertama kali ketemu langsung di Desember 2024?",
    "Apa satu hal yang belum kamu ceritakan padaku tapi ingin kamu bagi sekarang tentang kita?",
    "Hal apa yang paling bikin kamu rindu saat kita berjauhan?",
    "Seperti apa mimpimu tentang masa depan kita?",
    "Panggilan sayang apa yang paling kamu suka dariku?",
    "Apa yang kamu pelajari tentang dirimu selama LDR ini?",
    "Pernah diam-diam sedih karena kangen? Ceritain dong.",
    "Apa yang paling kamu syukuri dari tiga tahun ini?"
];
const dares=[
    "Tatap kamera dan rayu pasangan selama 30 detik tanpa tertawa.",
    "Nyanyikan satu bagian lagu yang mengingatkanmu pada pasangan.",
    "Tirukan gaya pasangan saat sedang ngambek.",
    "Sebutkan tiga hal yang kamu syukuri dari hubungan ini.",
    "Kirim flying kiss paling dramatis ke kamera.",
    "Buat video betapa kamu mencintai dan menyayangi pasangan kamu yang paling manis.",
    "TURUTIN 3 PERMINTAAN PASANGAN TANPA BANTAH (APAPUN ITU BEBAS MAU MASUK AKAL ATAU GAK)",
    "LAKUKAN HAL KONYOL YANG BISA BIKIN PASANGAN KETAWA, DAN KAMU HARUS LAKUKAN TANPA NGAMBIS",
    "LAKUKAN APAPUN YANG KAMU MAU",
    "Bilang aku sayang kamu dalam tiga gaya berbeda.",
    "Joget 15 detik di depan kamera.",
    "Ceritakan pertemuan pertama kita seperti narator film dokumenter.",
    "Buat janji kecil untuk pertemuan berikutnya dan ucapkan dengan serius.",
    "Sebutkan hal yang paling kamu banggakan dari pasangan.",
    "Tirukan suara pasangan saat bilang aku kangen.",
    "Tunjukkan foto paling lucu dan suka di galeri HP-mu.",
    "Tebak makanan favorit pasangan. Kalau salah, HARUS TURUTIN 1 PERMINTAAN."
];
const decks={truth:[],dare:[]};
function drawCard(type){
 const src=type==='truth'?truths:dares;
 if(!decks[type].length)decks[type]=shuffle(src.slice());
 $('tdType').textContent=type==='truth'?'Truth 💬':'Dare 🔥';
 $('tdText').textContent=decks[type].pop();
}

/* ===== GAME 3: WHO IS MORE LIKELY (skor = seberapa kompak pilihan kalian) ===== */
const WROUND=18;
const whos=[
    "Siapa yang lebih manjaa?",
    "Siapa yang paling sering ngajak video call?",
    "Siapa yang paling mungkin menangis saat bertemu lagi?",
    "Siapa yang paling mungkin merencanakan kejutan?",
    "Siapa yang paling suka lupa waktu saat ngobrol?",
    "Siapa yang paling sering bilang aku nggak ngambek padahal ngambek?",
    "Siapa yang paling mungkin tiba-tiba bilang kangen tanpa alasan?",
    "Siapa yang paling sering minta maaf duluan setelah berantem?",
    "Siapa yang paling sering salah tingkah saat dipuji?",
    "Siapa yang suka lupaan jadi orang?",
    "Siapa yang paling sering cerewet dalam segala hal?",
    "Siapa yang paling suka buat kesal?",
    "Siapa yang paling suka goda-goda😘?",
    "Siapa yang suka suka sedih sendiri?",
    "Siapa yang paling mungkin bilang terserah padahal ada maunya?",
    "Siapa yang paling suka menyimpan semua screenshot/foto kita?",
    "Siapa yang suka kelewatan dengan pasangannya?",
    "Siapa yang paling sering bilang 'sayangg' dan 'lopyuu' setiap hari?"
];
let wOrder=[],wi=0,wMatch=0,wRes=[],pA=null,pD=null,tally={Abdul:0,Dela:0};
function wBar(){
 $('wNo').textContent='Pertanyaan '+(wi+1)+' / '+wOrder.length;
 $('wScore').textContent='Kompak: '+wMatch;
 $('wDots').innerHTML=wOrder.map((_,i)=>'<i class="'+(wRes[i]===true?'ok':wRes[i]===false?'diff':i===wi?'now':'')+'"></i>').join('');
}
function duo(boxId,who){
 const box=$(boxId);box.innerHTML='';
 ['Abdul','Dela'].forEach(n=>{const b=document.createElement('button');b.textContent=n;b.dataset.n=n;b.onclick=()=>wPick(who,n);box.appendChild(b)});
}
function renderW(){
 pA=null;pD=null;
 $('whoPlay').hidden=false;$('wResult').hidden=true;
 $('whoText').textContent=wOrder[wi];
 duo('wA','A');duo('wD','D');
 $('wFeedback').textContent='';$('wFeedback').className='feedback';
 $('nextWho').disabled=true;$('nextWho').textContent=wi===wOrder.length-1?'Lihat hasil 🎉':'Pertanyaan selanjutnya →';
 wBar();
}
function wPick(who,n){
 if(who==='A'){if(pA)return;pA=n}else{if(pD)return;pD=n}
 const box=$(who==='A'?'wA':'wD');
 [...box.children].forEach(b=>{b.disabled=true;if(b.dataset.n===n)b.classList.add('picked')});
 const fb=$('wFeedback');
 if(!(pA&&pD)){fb.textContent='✔ '+(who==='A'?'Abdul':'Dela')+' sudah memilih. Tunggu '+(who==='A'?'Dela':'Abdul')+' ya…';return}
 tally[pA]++;tally[pD]++;
 const same=pA===pD;
 if(same)wMatch++;
 wRes[wi]=same;
 [...$('wA').children].forEach(b=>b.classList.toggle('sel',b.dataset.n===pA));
 [...$('wD').children].forEach(b=>b.classList.toggle('sel',b.dataset.n===pD));
 fb.className='feedback '+(same?'good':'diff');
 fb.textContent=same?'✅ Kompak! Sama-sama pilih '+pA+' 😆':'😆 Beda pendapat! Abdul pilih '+pA+', Dela pilih '+pD+'. Debat dulu sana!';
 $('nextWho').disabled=false;wBar();
}
function showW(){
 const n=wOrder.length,p=Math.round(wMatch/n*100);
 $('whoPlay').hidden=true;$('wResult').hidden=false;
 $('wRScore').textContent=wMatch;$('wRTotal').textContent=n;
 $('wEmoji').textContent=p>=80?'🥹':p>=50?'🥰':'😆';
 const most=tally.Abdul===tally.Dela?'Seimbang, sama-sama sering jadi tersangka':(tally.Abdul>tally.Dela?'Abdul':'Dela')+' paling sering dipilih sebagai tersangka';
 $('wRPct').textContent='Tingkat kekompakan '+p+'%. '+most+'.';
 $('wRMsg').textContent=p>=80?'Kalian kompak banget, isi kepalanya kayak satu ♡':p>=50?'Lumayan kompak! Sisanya bahan debat manis 😆':'Beda-beda tapi saling melengkapi. ANJAII NIKAH🥰💍';
 $('wNo').textContent='Selesai';$('wScore').textContent='Kompak: '+wMatch+' / '+n;
 $('wDots').innerHTML=wRes.map(r=>'<i class="'+(r?'ok':'diff')+'"></i>').join('');
}
function startW(){wOrder=shuffle(whos.slice()).slice(0,WROUND);wi=0;wMatch=0;wRes=[];tally={Abdul:0,Dela:0};renderW()}
$('nextWho').onclick=()=>{if(wi===wOrder.length-1)showW();else{wi++;renderW()}};
$('wAgain').onclick=startW;
startW();

function unlock(){if(document.getElementById('secretCode').value.trim()==='11112023'){document.getElementById('secretHint').textContent='';document.getElementById('secretMessage').hidden=false;document.getElementById('secretMessage').scrollIntoView({behavior:'smooth',block:'center'});document.getElementById('secretCode').value='';}else{document.getElementById('secretHint').textContent='SALAH! INGAT LAGI PIKIRKAN SECARA LOGIKA! ❤️'}}
document.getElementById('secretCode').addEventListener('keydown',e=>{if(e.key==='Enter')unlock()});
document.getElementById('photos').addEventListener('change',e=>{const grid=document.getElementById('galleryGrid');grid.querySelectorAll('.photo:not(.filled)').forEach(p=>p.remove());[...e.target.files].forEach(f=>{if(!f.type.startsWith('image/'))return;let wrap=document.createElement('div');wrap.className='photo filled';let img=document.createElement('img');img.src=URL.createObjectURL(f);img.alt='Kenangan Abdul dan Dela';img.decoding='async';wrap.appendChild(img);grid.appendChild(wrap)});e.target.value=''});