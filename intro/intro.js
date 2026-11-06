/* Story intro: one family's four moves, told with our animation, then handed over to the map.
   Plays over the map on load. Turn it off with INTRO_ON=false in index.html, or open the page with #map.
   The drawn family stands for families of the Gwala Street camp (moves: GroundUp, June 2022).
   The loss slide names Lulama Dingiswayo, whose three children died at that camp (IOL; Amnesty International, 2025). */
(function(){
if (window.INTRO_ON === false || location.hash === '#map' || location.hash === '#stories' || location.hash === '#report' || location.hash === '#return' || location.hash === '#simulation') return;
const BASE='intro/', FPS=5.5, NF=244, fr=i=>BASE+'film8/f'+String(i).padStart(3,'0')+'.jpg';
const PTS={bg_drop:{mega:[50.02,50.06]},bg_mapA:{mega:[28.65,58.08],tehuis:[48.72,58.08],lamont:[71.44,34.08]},bg_mapB:{lamont:[42.31,62.08],bayside:[57.77,30.08],umbilo:[49.26,40.42]},bg_flood:{mega:[29.63,82.5],tehuis:[35.67,82.5],lamont:[42.5,75.29],bayside:[70.43,17.5],umbilo:[55.05,36.16]}};
const PIN='<svg viewBox="0 0 56 70" aria-hidden="true"><path d="M28 68C28 68 4 42 4 26a24 24 0 0148 0c0 16-24 42-24 42z" fill="#FBC900"/><circle cx="21" cy="19" r="4" fill="#0B0F19"/><circle cx="35" cy="19" r="4" fill="#0B0F19"/><circle cx="28" cy="31" r="3" fill="#0B0F19"/><path d="M14 38v-6a7 7 0 0114 0v6zM28 38v-6a7 7 0 0114 0v6z" fill="#0B0F19"/><path d="M23 44v-4a5 5 0 0110 0v4z" fill="#0B0F19"/></svg>';
const CRED='Illustration from our animation · the moves follow GroundUp\'s reporting on families from this camp (June 2022)';
const TOWNS=[['uMlazi','where this story starts'],['Lamontville',''],['Isipingo',''],['KwaMashu',''],['Inanda',''],['Umbilo',''],['Durban central',''],['Chatsworth',''],['Pinetown','']];
let chosen='uMlazi';
const SC=[
 {id:'open',type:'open'},
 {id:'drop',type:'drop',moves:0,auto:5800},
 {id:'home',type:'film',a:0,b:14,loop:true,moves:0,auto:5800,card:{w:'360px',pos:'right:max(16px,3.5cqw);top:max(70px,7.5cqw)',k:'Ordinary life · 2019',t:'Washing on the line, the dog in the yard.',d:'Nothing yet tells you this ground floods.'}},
 {id:'rain',type:'film',a:14,b:34,moves:0,rain:true,card:{w:'340px',pos:'left:max(16px,3.5cqw);top:max(70px,7.5cqw)',k:'April 2019',big:'245 mm',d:'of rain in three days · ERA5 daily (Open-Meteo)'},cta:{line:'The water is at the roof.',btn:'They called for help',sub:'Click to see where the city sent them.'}},
 {id:'lift1',type:'film',fps:3.5,a:34,b:47,moves:1,auto:2500,card:{w:'380px',pos:'left:max(16px,3.5cqw);bottom:max(48px,5cqw)',k:'Move 1 of 4 · 2019',t:'The rope comes down.',d:'The family is lifted out of Mega Village.'}},
 {id:'map1',type:'map',bg:'bg_mapA',from:'mega',to:'tehuis',next:'lamont',moves:1,auto:1400,labels:{mega:'Mega Village · flooded',tehuis:'Tents at Tehuis Hostel',lamont:'Lamontville camp'}},
 {id:'tents',type:'film',fps:3.5,a:47,b:54,moves:1,card:{w:'380px',pos:'right:max(16px,3.5cqw);top:max(70px,7.5cqw)',k:'2019 · Tehuis Hostel',t:'Tents. "Temporary." Two years.',d:'The sun comes back. For now, everything is fine.'},cta:{btn:'Two years later',kind:'white',delay:1500}},
 {id:'lift2',type:'film',fps:3.5,a:54,b:72,moves:2,auto:2500,card:{w:'380px',pos:'left:max(16px,3.5cqw);bottom:max(48px,5cqw)',k:'Move 2 of 4 · 2021',t:'The rope comes again.',d:'From the tents to a camp on the riverbank.'}},
 {id:'map2',type:'map',bg:'bg_mapA',from:'tehuis',to:'lamont',done:'mega',moves:2,auto:1400,labels:{mega:'Mega Village',tehuis:'Tehuis Hostel',lamont:'Lamontville riverside camp'}},
 {id:'camp',type:'film',a:72,b:100,moves:2,rain:true,card:{w:'380px',pos:'left:max(16px,3.5cqw);top:max(70px,7.5cqw)',k:'April 2022',t:'The camp floods.',d:'Lamontville riverside camp, Gwala Street.'},cta:{btn:'They called for help again',sub:'Each time, a little faster.'}},
 {id:'back',type:'film',fps:3.5,a:100,b:122,moves:2,auto:2500,card:{w:'380px',pos:'right:max(16px,3.5cqw);top:max(70px,7.5cqw)',k:'2022',t:'They\'re sent back.',d:'The rope lifts them, and puts them down in the same camp.'}},
 {id:'night',type:'film',a:122,b:150,moves:2,rain:true,auto:500,card:{w:'380px',pos:'left:max(16px,3.5cqw);top:max(70px,7.5cqw)',k:'25 February 2025',t:'It floods again, at night.',d:'Residents say the stream beside the camp was blocked with debris.'}},
 {id:'loss',type:'film',a:150,b:158,moves:2,dim:true,card:{cls:'loss',w:'460px',pos:'right:max(16px,3.5cqw);top:max(70px,7.5cqw)',k:'Gwala Street camp · 25 Feb 2025',t:'Three children are swept away.',d:'Lulama Dingiswayo lost her children that night: two girls, aged 5 and 16, and a boy aged 11. Five people from the camp died. (IOL; Amnesty International, 2025)'},cta:{btn:'Continue',kind:'quiet',delay:4500}},
 {id:'hotel',type:'film',fps:3.5,a:158,b:188,moves:4,auto:2500,card:{w:'400px',pos:'left:max(16px,3.5cqw);bottom:max(48px,5cqw)',k:'Moves 3 and 4 · 2025',t:'A hotel. Evicted. A student residence.',d:'March 2025: the province puts the families in Bayside Hotel. It does not pay the bill, and in July they are evicted onto the pavement. Then a student residence in Umbilo.'}},
 {id:'map34',type:'map',tally:true,bg:'bg_mapB',from:'lamont',to:'bayside',to2:'umbilo',moves:4,auto:1900,labels:{lamont:'Lamontville camp',bayside:'Bayside Hotel',umbilo:'Umbilo residence'}},
 {id:'trace',type:'trace',moves:4,auto:2600},
 {id:'question',type:'question'}
];
const root=document.createElement('div'); root.id='intro'; root.setAttribute('role','dialog'); root.setAttribute('aria-label','Story: one family\'s four moves'); document.body.appendChild(root);

let cur=0, timer=null, raf=null;
const IM=[]; for(let i=0;i<NF;i++){ const im=new Image(); im.src=fr(i); IM.push(im); }
const chrome=m=>{ if(m==null) return ''; const bars=[0,1,2,3].map(i=>'<i class="'+(i<m?'on':'')+'"></i>').join('');
  return '<div class="ix-chrome"><div class="ix-brand">Moved Into the Water</div><div class="ix-prog">'+bars+'<span>'+(m?('Move '+m+' of 4'):'Before')+'</span></div><button class="ix-skip" data-skip>Skip to the map →</button></div>'; };
const card=c=>c?'<div class="ix-card '+(c.cls||'')+'" style="--w:'+c.w+';'+c.pos+'"><div class="ix-k">'+c.k+'</div>'+(c.big?'<div class="ix-big">'+c.big+'</div>':'')+(c.t?'<div class="ix-t">'+c.t+'</div>':'')+(c.d?'<div class="ix-d">'+c.d+'</div>':'')+'</div>':'';
const cta=c=>'<div class="ix-cta">'+(c.line?'<div class="ix-line">'+c.line+'</div>':'')+'<button class="'+(c.kind==='white'?'ix-white':c.kind==='quiet'?'ix-quiet':'ix-red')+'" data-next>'+c.btn+' <span aria-hidden="true">→</span></button>'+(c.sub?'<div class="ix-sub">'+c.sub+'</div>':'')+'</div>';
function clear(){ clearTimeout(timer); cancelAnimationFrame(raf); }
/* scene clock: normally real time; pressing Next during an animation speeds it up so it finishes quickly, then moves on */
let vt=0, vlast=0, SPEED=1, rush=false, sceneEnd=0, ended=false;
function vnow(){ const t=performance.now(); vt+=(t-vlast)*SPEED; vlast=t; return vt; }
function advance(){ const s=SC[cur]; if(s.type==='question'){ done(); return; } if(s.type==='open') return;
  if(ended) { next(); return; } rush=true; SPEED=7; }
function go(i){ clear(); delete root.dataset.ended; cur=Math.max(0,Math.min(SC.length-1,i)); vt=0; vlast=performance.now(); SPEED=1; rush=false; ended=false; render(); }
const next=()=>go(cur+1);
const SETTLE=1200; /* pause after the motion stops, before the Next control appears */
function nextBtn(){ if(root.querySelector('.ix-nextb')) return; root.insertAdjacentHTML('beforeend','<button class="ix-nextb" data-next type="button">Next <span aria-hidden="true">→</span></button>'); }
function after(s,ms){ sceneEnd=ms; if(s.type!=='question') nextBtn();
  const poll=()=>{ if(vnow()<ms){ timer=setTimeout(poll,40); return; } ended=true; root.dataset.ended="1";
    if(rush){ next(); return; }                                   // presenter already asked to move on
    timer=setTimeout(()=>{ if(s.cta){ const nb=root.querySelector('.ix-nextb'); if(nb) nb.remove(); root.insertAdjacentHTML('beforeend',cta(s.cta)); const b=root.querySelector('.ix-cta button'); if(b) b.focus({preventScroll:true}); } },SETTLE+((s.cta&&s.cta.delay)||0)); };
  poll(); }
function render(){ const s=SC[cur]; let h='';
  if(s.type==='open') h=openHTML();
  if(s.type==='drop'){ const p=PTS.bg_drop.mega;
    h+='<div class="ix-cover"><div class="ix-bg" id="ixzb" style="background-image:url('+BASE+'bg_drop.jpg)"></div><div class="ix-ring" style="left:'+p[0]+'%;top:'+p[1]+'%"></div><div class="ix-pin" style="left:'+p[0]+'%;top:'+p[1]+'%;animation:ixdrop 1.1s cubic-bezier(.3,.7,.4,1) both">'+PIN+'</div><div class="ix-place" style="left:'+p[0]+'%;top:'+p[1]+'%">Mega Village, uMlazi</div></div>';
    h+=card({w:'460px',pos:'left:max(16px,3.5cqw);bottom:max(48px,5cqw)',k:'uMlazi, Durban',t:chosen==='uMlazi'?'This is where one family\'s story starts.':'You chose '+chosen+'. This family\'s story starts in uMlazi.',d:'Mega Village sits on low ground beside a river.'});
    h+='<div class="ix-credit">Imagery: Esri, Maxar · pin placement approximate</div>'; }
  if(s.type==='film') h+='<div class="ix-film'+(s.dim?' dim':'')+'"><img id="ixf" src="'+fr(s.a)+'" alt=""></div>'+(s.rain?'<div class="ix-rain"></div>':'')+(s.cta?'<div class="ix-shade"></div>':'')+'<div class="ix-credit">'+CRED+'</div>';
  if(s.tally) h+='<div class="ix-tally"><span>2019 – 2025</span><b>Moved 4 times</b><b class="ix-r">Flooded 3 times</b></div>';
  if(s.type==='map') h+=mapHTML(s)+'<div class="ix-counter"><b>'+s.moves+'<span>/4</span></b><div>moves</div></div><div class="ix-credit">Imagery: Esri, Maxar · routes join reported places; they are not surveyed paths</div>';
  if(s.type==='trace'){ const P=PTS.bg_flood, O=['mega','tehuis','lamont','bayside','umbilo'];
    h+='<div class="ix-cover"><div class="ix-bg" style="background-image:url('+BASE+'bg_flood.jpg)"></div><svg class="ix-route" viewBox="0 0 1600 1000" preserveAspectRatio="none"><polyline id="ixtr" points="'+O.map(k=>P[k][0]*16+','+P[k][1]*10).join(' ')+'" fill="none" stroke="#FBC900" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/></svg>'+
      O.map((k,i)=>'<i class="ix-yd" id="ixd'+i+'" style="left:'+P[k][0]+'%;top:'+P[k][1]+'%"></i>').join('')+'</div><div class="ix-credit">Blue: eThekwini 1-in-100-year flood plain · imagery: Esri, Maxar</div>'; }
  if(s.type==='question'){ const P=PTS.bg_flood, O=['mega','tehuis','lamont','bayside','umbilo'];
    h+='<div class="ix-cover ix-qmap"><div class="ix-bg" style="background-image:url('+BASE+'bg_flood.jpg)"></div><svg class="ix-route" viewBox="0 0 1600 1000" preserveAspectRatio="none"><polyline points="'+O.map(k=>P[k][0]*16+','+P[k][1]*10).join(' ')+'" fill="none" stroke="#FBC900" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/></svg>'+O.map(k=>'<i class="ix-yd on" style="left:'+P[k][0]+'%;top:'+P[k][1]+'%"></i>').join('')+'</div>'+
      '<div class="ix-qscrim"></div><div class="ix-q"><div class="ix-qk">Durban · 2019 – 2025</div><h2>Why does the water keep finding the same people?</h2>'+
      '<p class="ix-qline"><span>4 moves</span><i></i><span class="ix-r">3 floods</span><i></i><span>6 years</span><i></i><span>still “temporary”</span></p>'+
      '<p class="ix-qsub">It is not one family. <b>11 of the 28</b> relocation sites we located in Durban sit inside or within 250 m of the city’s 1-in-100-year flood line.</p>'+
      '<button class="ix-white" data-done>Explore the map <span aria-hidden="true">→</span></button></div>'+
      '<div class="ix-credit">Blue: eThekwini 1-in-100-year flood plain · yellow: the family’s five homes · imagery: Esri, Maxar</div>'; }
  if(s.type!=='open') h+=chrome(s.type==='question'?null:s.moves);
  if(s.type==='question') h+='<div class="ix-chrome" style="background:none"><button class="ix-skip" data-done>Skip to the map →</button></div>';
  h+=card(s.card); root.innerHTML=h;
  if(s.type==='open') wireOpen();
  if(s.type==='drop'){ setTimeout(()=>{ const z=document.getElementById('ixzb'); if(z) z.style.transform='scale(1.18)'; },1200); after(s,0); }
  if(s.type==='film') playFilm(s);
  if(s.type==='map') playMap(s);
  if(s.type==='trace') playTrace(s);
  if(s.type==='question') setTimeout(()=>{ const b=root.querySelector('[data-done].ix-white'); if(b) b.focus({preventScroll:true}); },300);
}
function openHTML(){ return '<div class="ix-bg" style="background-image:url('+BASE+'city.jpg);background-size:cover;background-position:center;filter:saturate(.85) brightness(.82)"></div><div class="ix-open"></div>'+
  '<div class="ix-chrome" style="background:none"><div class="ix-brand">Moved Into the Water</div><button class="ix-skip" data-skip>Skip to the map →</button></div>'+
  '<div class="ix-hero"><div style="font:600 11px var(--mono);letter-spacing:.2em;text-transform:uppercase;color:#F5A524">Durban · a story in four moves</div><h1>Where would the city move you?</h1>'+
  '<p>When floods take a home in Durban, families are sent to "temporary" camps. Pick a township to follow one family\'s journey.</p>'+
  '<form class="ix-search" id="ixform" autocomplete="off"><svg width="20" height="20" viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="5.5" fill="none" stroke="#9AA6B8" stroke-width="1.6"/><path d="M11 11L15 15" stroke="#9AA6B8" stroke-width="1.6"/></svg><input id="ixq" type="text" placeholder="Type your township, e.g. uMlazi" aria-label="Your township"><button class="ix-white" type="submit" style="padding:12px 18px;font-size:15px">Follow →</button></form>'+
  '<div class="ix-sugg" id="ixsugg" hidden></div></div>'+
  '<div class="ix-disc">This is a story built from news reports, not an emergency service. If you are in danger now, contact your local emergency services.</div>'; }
function wireOpen(){ const q=document.getElementById('ixq'), sg=document.getElementById('ixsugg'), form=document.getElementById('ixform');
  const show=()=>{ const v=q.value.trim().toLowerCase(); const list=TOWNS.filter(t=>!v||t[0].toLowerCase().includes(v)).slice(0,5);
    sg.innerHTML=list.map(t=>'<button type="button" data-t="'+t[0]+'"><span>'+t[0]+'</span><small>'+t[1]+'</small></button>').join(''); sg.hidden=!list.length; };
  q.addEventListener('focus',show); q.addEventListener('input',show);
  sg.addEventListener('click',e=>{ const b=e.target.closest('button'); if(!b) return; chosen=b.dataset.t; next(); });
  form.addEventListener('submit',e=>{ e.preventDefault(); const v=q.value.trim(); const m=TOWNS.find(t=>t[0].toLowerCase()===v.toLowerCase()); chosen=m?m[0]:(v||'uMlazi'); next(); });
}
function playFilm(s){ const el=document.getElementById('ixf'), n=s.b-s.a;
  const step=()=>{ let k=Math.floor(vnow()/1000*(s.fps||FPS)); if(s.loop) k%=(n+1); else k=Math.min(k,n);
    el.src=fr(s.a+k); if(s.loop||k<n) raf=requestAnimationFrame(step); };
  raf=requestAnimationFrame(step); after(s,s.loop?0:n/(s.fps||FPS)*1000); }
function mapHTML(s){ const P=PTS[s.bg]; let h='<div class="ix-cover"><div class="ix-bg" style="background-image:url('+BASE+s.bg+'.jpg)"></div><svg class="ix-route" viewBox="0 0 1600 1000" preserveAspectRatio="none">';
  const seg=(a,b,id,dash)=>{ const A=P[a],B=P[b],x1=A[0]*16,y1=A[1]*10,x2=B[0]*16,y2=B[1]*10;
    return '<path id="'+id+'" d="M'+x1+' '+y1+' Q'+(x1+x2)/2+' '+(Math.min(y1,y2)-140)+' '+x2+' '+y2+'" fill="none" stroke="'+(dash?'rgba(255,255,255,.35)':'#F5A524')+'" stroke-width="'+(dash?3:6)+'" stroke-linecap="round" '+(dash?'stroke-dasharray="4 12"':'')+'/>'; };
  if(s.done) h+=seg(s.done,s.from,'ixr0',true); h+=seg(s.from,s.to,'ixr1'); if(s.to2) h+=seg(s.to,s.to2,'ixr2'); if(s.next) h+=seg(s.to,s.next,'ixrn',true); h+='</svg>';
  for(const k in P){ const p=P[k], lab=s.labels[k]; if(!lab) continue; const fromish=k===s.from||k===s.done;
    h+=fromish?'<div class="ix-dot" style="left:'+p[0]+'%;top:'+p[1]+'%"></div><div class="ix-place g" style="left:'+p[0]+'%;top:'+p[1]+'%">'+lab+'</div>'
      :'<div class="ix-place '+(k===s.next?'g':'')+'" id="ixl_'+k+'" style="left:'+p[0]+'%;top:'+p[1]+'%;opacity:'+(k===s.next?.6:0)+'">'+lab+'</div>'; }
  return h+'<div class="ix-pin" id="ixpin" style="left:'+P[s.from][0]+'%;top:'+P[s.from][1]+'%">'+PIN+'</div></div>'; }
function playMap(s){ const segs=['ixr1','ixr2'].map(id=>document.getElementById(id)).filter(Boolean), pin=document.getElementById('ixpin'), stops=[s.to,s.to2].filter(Boolean);
  segs.forEach(p=>{ const L=p.getTotalLength(); p.style.strokeDasharray=L; p.style.strokeDashoffset=L; });
  const DUR=3000, PAUSE=1100; let si=0, t0=0;
  const step=()=>{ const now=vnow(); if(now<t0){ raf=requestAnimationFrame(step); return; } const p=segs[si], L=p.getTotalLength(), u=Math.min(1,(now-t0)/DUR), e=u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2;
    p.style.strokeDashoffset=L*(1-e); const pt=p.getPointAtLength(L*e); pin.style.left=(pt.x/16)+'%'; pin.style.top=(pt.y/10)+'%';
    if(u<1){ raf=requestAnimationFrame(step); return; }
    const lab=document.getElementById('ixl_'+stops[si]); if(lab) lab.style.opacity=1;
    if(si<segs.length-1){ si++; t0=vnow()+PAUSE; raf=requestAnimationFrame(step); } };
  raf=requestAnimationFrame(step); after(s,segs.length*DUR+(segs.length-1)*PAUSE); }
function playTrace(s){ const pl=document.getElementById('ixtr'), L=pl.getTotalLength(), pts=pl.points, N=pts.numberOfItems; const cum=[0];
  for(let i=1;i<N;i++){ const a=pts.getItem(i-1), b=pts.getItem(i); cum.push(cum[i-1]+Math.hypot(b.x-a.x,b.y-a.y)); }
  pl.style.strokeDasharray=L; pl.style.strokeDashoffset=L; const D=2000; document.getElementById('ixd0').classList.add('on');
  const step=()=>{ const u=Math.min(1,vnow()/D), d=L*u; pl.style.strokeDashoffset=L-d;
    for(let i=1;i<N;i++) if(d>=cum[i]-1) document.getElementById('ixd'+i).classList.add('on');
    if(u<1) raf=requestAnimationFrame(step); };
  raf=requestAnimationFrame(step); after(s,D); }
/* hand-over: the story fades out while the real map flies from the camp out to the city */
function done(){ clear(); try{ if(typeof view!=='undefined'&&typeof flyTo==='function'){ view.x=mx(30.9455); view.y=my(-29.9537); view.z=15.2; draw(); flyTo(HOME.x,HOME.y,homeZoom(),2600); } }catch(e){}
  root.classList.add('out'); setTimeout(()=>root.remove(),1500); }
root.addEventListener('click',e=>{ if(e.target.closest('[data-next]')) advance(); else if(e.target.closest('[data-skip]')||e.target.closest('[data-done]')) done(); });
document.addEventListener('keydown',function k(e){ if(!document.getElementById('intro')){ document.removeEventListener('keydown',k); return; } if(e.key==='Escape') done();
  if(['ArrowRight','PageDown',' ','Enter'].includes(e.key)&&!e.target.closest('input')&&!((e.key===' '||e.key==='Enter')&&e.target.closest('button'))){ e.preventDefault(); advance(); }
  if(['ArrowLeft','PageUp'].includes(e.key)&&cur>1){ e.preventDefault(); go(cur-1); } });
const start=SC.findIndex(s=>'#story-'+s.id===location.hash); go(start>0?start:0);
})();
