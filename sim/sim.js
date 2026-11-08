/* Simulation page. Inputs (total rain, duration, scenario) are turned into an hourly rain series and sent to the
   Gwala Street flood model (stories/gwala-orbit.html in embed mode). The model re-runs; the page then asks it for
   every half-hour step and keeps the camp depth and flooded area, so readouts and the summary use model numbers.
   "Aerial" shows the ArcGIS Pro run of the real 2022 storm at the same moment; "Model" shows the live model. */
(function(){
const REAL=[6.1,5.8,4.9,4.5,4.9,3.8,4.0,4.8,7.3,11.6,15.9,18.4,6.5,7.4,7.9,9.4,10.9];   // ERA5 hourly, 11 Apr 2022 09:00–
const REAL_TOTAL=Math.round(REAL.reduce((a,b)=>a+b,0)), KMAX=33;                          // model runs 09:00 to 01:30 in half-hours
const SC=[['Lighter rain',50,6],['2022-like event',REAL_TOTAL,17],['Heavier rain',200,17]];
const DMAX=17, TMAX=300;
let total=REAL_TOTAL, dur=17, k=0, playing=false, rain=REAL.slice(), last=0, frameReady=false, mode='aerial', zoom=1;
let prof=null, sweep=null;   // prof[k] = {camp, area} from the model for the current rain
const root=document.createElement('section'); root.id='sim'; root.hidden=true; root.setAttribute('aria-label','Flood simulation'); document.body.appendChild(root);
const $=id=>document.getElementById(id);
const hh=k=>{ const m=9*60+k*30, h=Math.floor(m/60)%24; return String(h).padStart(2,'0')+':'+(m%60?'30':'00'); };
const day=k=>9*60+k*30>=24*60?'12 Apr 2022':'11 Apr 2022';
const I=d=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+d+'</svg>';
const IC={
  play:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>',
  pause:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/></svg>',
  cloud:I('<path d="M7 16.5h10a4 4 0 0 0 .6-7.95A5.5 5.5 0 0 0 7 9.5a3.5 3.5 0 0 0 0 7z"/><path d="M9 19.5l-.5 1.5M13 19.5l-.5 1.5M17 19.5l-.5 1.5"/>'),
  check:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="currentColor"/><path d="m7 12.5 3.2 3.2L17.5 8.5" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  waves:I('<path d="M3 8c2 0 2-1.5 4.5-1.5S9.5 8 12 8s2.5-1.5 4.5-1.5S19 8 21 8M3 13c2 0 2-1.5 4.5-1.5S9.5 13 12 13s2.5-1.5 4.5-1.5S19 13 21 13M3 18c2 0 2-1.5 4.5-1.5S9.5 18 12 18s2.5-1.5 4.5-1.5S19 18 21 18"/>'),
  area:I('<path d="M4 7V4h3M17 4h3v3M20 17v3h-3M7 20H4v-3"/><path d="M9 4h6M20 9v6M9 20h6M4 9v6" stroke-dasharray="2 2.5"/>'),
  drop:I('<path d="M12 3.5s-6 6.8-6 10.8a6 6 0 0 0 12 0c0-4-6-10.8-6-10.8z"/><path d="M9.5 15a2.5 2.5 0 0 0 2.5 2.5"/>'),
  warn:I('<path d="M12 3.5 2.5 20h19z"/><path d="M12 10v4.5"/><circle cx="12" cy="17.3" r=".6" fill="currentColor"/>'),
  sign:I('<path d="M12 21V3"/><path d="M5 5.5h12l2 2-2 2H5z"/><path d="M19 11.5H7l-2 2 2 2h12z"/>'),
  plus:I('<path d="M12 6v12M6 12h12"/>'), minus:I('<path d="M6 12h12"/>'),
  locate:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5 3.5 10.6l7.2 2.7 2.7 7.2z" fill="currentColor"/></svg>'
};
/* total + duration → 17 hourly values: the real 2022 profile, squeezed into the duration and scaled to the total */
function series(){ if(total===REAL_TOTAL&&dur===17) return REAL.slice(); const out=[];
  for(let i=0;i<17;i++){ if(i>=dur){ out.push(0); continue; } const a=i/dur*17, b=(i+1)/dur*17; let s=0;
    for(let j=Math.floor(a);j<Math.ceil(b);j++){ const lo=Math.max(a,j), hi=Math.min(b,j+1); if(hi>lo) s+=REAL[j]*(hi-lo); } out.push(s); }
  const sum=out.reduce((x,y)=>x+y,0)||1; return out.map(v=>+(v*total/sum).toFixed(2)); }

function slider(id,lab,val,min,max,unit,minL,maxL){ return '<div class="sv-f"><div class="sv-row"><label for="'+id+'r">'+lab+'</label><div class="sv-v"><input id="'+id+'" type="number" min="'+min+'" max="'+max+'" value="'+val+'" aria-label="'+lab+' in '+unit+'"><em>'+unit+'</em></div></div>'+
  '<input id="'+id+'r" class="sv-rng" type="range" min="'+min+'" max="'+max+'" value="'+val+'"><div class="sv-mm"><span>'+minL+'</span><span>'+maxL+'</span></div></div>'; }
function render(){
  root.innerHTML=
  '<div class="sv-wrap">'+
  '<div class="sv-head"><div class="sv-k">Flood simulation <i>·</i> Gwala Street, Lamontville</div><h1>What if it rained differently?</h1>'+
   '<p>Explore how different amounts of rain and durations could affect flooding at the camp.</p></div>'+
  '<div class="sv-body">'+
   '<aside class="sv-in">'+
    slider('smtot','Rainfall',total,0,TMAX,'mm','0 mm',TMAX+' mm')+
    slider('smdur','Duration',dur,1,DMAX,'hours','1 hour',DMAX+' hours')+
    '<div class="sv-scw"><h2 id="smsch">Or choose a scenario</h2><div class="sv-sc" id="smsc" role="group" aria-labelledby="smsch">'+SC.map((x,i)=>'<button type="button" data-i="'+i+'" aria-pressed="false"><span class="ic">'+IC.cloud+'</span><span class="tx"><b>'+x[0]+'</b><small>'+x[1]+' mm · '+x[2]+' h</small></span><span class="ck">'+IC.check+'</span></button>').join('')+'</div></div>'+
    '<p class="sv-note">A simplified model on LiDAR terrain (30 m grid), starting 09:00 on 11 April 2022. Your rain follows the shape of the real storm, scaled to your choice. Indicative only.</p>'+
   '</aside>'+
   '<div class="sv-main">'+
    '<div class="sv-stage" id="smstage" data-mode="aerial">'+
     '<div class="sv-pan" id="smpan"><img id="smarc" src="stories/gwala-arcfull/a00.jpg" alt="Aerial 3D view of Gwala Street camp and the stream, flooding as in the 2022 storm"></div>'+
     '<iframe id="smframe" class="sm-model" title="Flood model with your rain" tabindex="-1" src="stories/gwala-orbit.html#embed"></iframe>'+
     '<div class="sv-clock"><button class="sv-pb sm" id="smpb2" type="button" aria-label="Play">'+IC.play+'</button><div><b id="smt1">09:00</b><span id="smd1">11 Apr 2022</span></div></div>'+
     '<div class="sv-seg" role="group" aria-label="View"><button type="button" data-m="aerial" aria-pressed="true" title="ArcGIS Pro render of the real 2022 storm">Aerial</button><button type="button" data-m="model" aria-pressed="false" title="The flood model running your rain">Model</button></div>'+
     '<div class="sv-zoom"><button type="button" id="smzi" aria-label="Zoom in">'+IC.plus+'</button><button type="button" id="smzo" aria-label="Zoom out">'+IC.minus+'</button></div>'+
     '<button type="button" class="sv-home" id="smzh" aria-label="Reset view">'+IC.locate+'</button>'+
     '<div class="sv-read"><div class="chip"><span class="ic">'+IC.waves+'</span><div><small>Water depth</small><b id="smdep">0.00<em>m</em></b></div></div>'+
      '<div class="chip"><span class="ic">'+IC.area+'</span><div><small>Area under water</small><b id="smarea">0.00<em>km²</em></b></div></div></div>'+
     '<span class="sv-src" id="smsrc">Aerial: ArcGIS Pro run of the 2022 storm · numbers: model with your rain</span>'+
    '</div>'+
    '<div class="sv-tl"><button class="sv-pb" id="smpb" type="button" aria-label="Play">'+IC.play+'</button>'+
     '<div class="sm-tl"><div class="sm-bars" id="smbars" aria-hidden="true"></div><div class="sm-rail"><div class="sm-fill" id="smfill"></div></div><input id="smk" type="range" min="0" max="'+KMAX+'" step="0.1" value="0" aria-label="Time in the storm"><div class="sm-ticks" id="smticks"></div></div>'+
     '<div class="sv-leg"><i></i>Rainfall (mm/h)</div></div></div>'+
    '<div class="sv-cards">'+
     '<div class="sv-card a"><span class="ic">'+IC.drop+'</span><div><h3 id="smc1h">At '+total+' mm over '+dur+' hours…</h3><p id="smc1">Working out the flood…</p></div></div>'+
     '<div class="sv-card"><span class="ic warn">'+IC.warn+'</span><div><h3>Key risk</h3><p id="smc2">…</p></div></div>'+
     '<div class="sv-card"><span class="ic">'+IC.sign+'</span><div><h3>What this means</h3><ul id="smc3"></ul></div></div>'+
    '</div>'+
   '</div></div>';
  wire(); ticks(); send(); show(k); setPressed();
}
function bars(){ const mx=Math.max(...rain,1); $('smbars').innerHTML=rain.map((v,i)=>'<i style="height:'+Math.max(3,v/mx*30)+'px" title="'+hh(i*2)+' · '+v+' mm"></i>').join(''); paintBars(); }
function paintBars(){ document.querySelectorAll('#smbars i').forEach((b,i)=>b.classList.toggle('past',i*2<k)); }
function ticks(){ $('smticks').innerHTML=[0,6,12,18,24,30].map(t=>'<span data-t="'+t+'" style="left:'+(t/KMAX*100)+'%">'+hh(t)+'</span>').join(''); }
function at(kk){ if(!prof) return null; const a=Math.floor(kk), b=Math.min(KMAX,a+1), f=kk-a, A=prof[a], B=prof[b]; if(!A||!B) return A||B||null; return {camp:A.camp+(B.camp-A.camp)*f, area:A.area+(B.area-A.area)*f}; }
function show(kk){ k=Math.max(0,Math.min(KMAX,kk)); const r=Math.round(k);
  $('smt1').textContent=hh(r); $('smd1').textContent=day(r);
  $('smk').value=k; $('smfill').style.width=(k/KMAX*100)+'%';
  $('smarc').src='stories/gwala-arcfull/a'+String(Math.round(k*60/KMAX)).padStart(2,'0')+'.jpg';
  document.querySelectorAll('#smticks span').forEach(s=>s.classList.toggle('on',Math.abs(+s.dataset.t-k)<1.5));
  paintBars(); const s=at(k); if(s){ $('smdep').innerHTML=s.camp.toFixed(2)+'<em>m</em>'; $('smarea').innerHTML=s.area.toFixed(2)+'<em>km²</em>'; }
  const fr=$('smframe'); if(!sweep&&fr&&fr.contentWindow&&frameReady) fr.contentWindow.postMessage({type:'gwala-time',k:k},'*'); }
/* re-run the model with the current rain, then ask it for every half-hour step */
function send(){ rain=series(); bars(); prof=null; summary(); const fr=$('smframe'); if(!fr||!fr.contentWindow||!frameReady) return;
  fr.contentWindow.postMessage({type:'gwala-rain',rain:rain},'*');
  sweep={got:{},n:0}; for(let i=0;i<=KMAX;i++) fr.contentWindow.postMessage({type:'gwala-time',k:i},'*'); }
addEventListener('message',e=>{ const m=e.data||{}; if(m.type!=='gwala-state') return; frameReady=true;
  if(sweep){ const i=Math.round(m.k); if(Math.abs(m.k-i)<1e-6&&!sweep.got[i]){ sweep.got[i]={camp:m.camp,area:m.area}; sweep.n++; }
    if(sweep.n>KMAX){ prof=sweep.got; sweep=null; summary(); show(k); } } });
function summary(){ const h1=$('smc1h'); if(!h1) return; h1.textContent='At '+total+' mm over '+dur+' hour'+(dur===1?'':'s')+'…';
  if(!prof){ $('smc1').textContent='Working out the flood…'; $('smc2').textContent='…'; $('smc3').innerHTML=''; return; }
  let pk=0,pa=0,pkK=0,first=-1; for(let i=0;i<=KMAX;i++){ const s=prof[i]; if(s.camp>pk){pk=s.camp;pkK=i;} if(s.area>pa) pa=s.area; if(first<0&&s.camp>=0.1) first=i; }
  $('smc1').innerHTML='Water is expected to reach <b>'+pk.toFixed(2)+' m</b> deep and cover about <b>'+pa.toFixed(2)+' km²</b> at the camp, deepest around '+hh(pkK)+'.';
  $('smc2').textContent=first>=0?'Low-lying homes near the stream are likely to flood first, with water at the camp passing 10 cm around '+hh(first)+(first>0?' (between '+hh(first-1)+' and '+hh(first)+')':'')+'.'
    :(pk>=0.02?'Water collects in low spots near the stream but stays below 10 cm at the camp in this scenario.':'Little or no standing water at the camp in this scenario.');
  const L=pk>=0.3?['Homes close to the stream are at highest risk.','Water this deep can enter homes and carry people off their feet.','Plan for early warning and evacuation before the peak.']
    :pk>=0.1?['Homes close to the stream are at highest risk.','Drainage is likely to be overwhelmed.','Plan for early warning and possible evacuation.']
    :pk>=0.02?['Paths, toilets and taps near the stream may flood.','Drainage is under strain.','Keep an eye on the stream during heavy rain.']
    :['Flood risk at the camp is low in this scenario.','Heavier or longer rain changes this quickly.','Try the 2022-like event to compare.'];
  $('smc3').innerHTML=L.map(x=>'<li>'+x+'</li>').join(''); }
function setPressed(){ document.querySelectorAll('#smsc button').forEach((b,i)=>b.setAttribute('aria-pressed',SC[i][1]===total&&SC[i][2]===dur)); }
function setInputs(t,d){ total=Math.max(0,Math.min(TMAX,Math.round(t||0))); dur=Math.max(1,Math.min(DMAX,Math.round(d||1)));
  ['smtot','smtotr'].forEach(id=>{ const el=$(id); if(document.activeElement!==el||el.type==='range') el.value=total; });
  ['smdur','smdurr'].forEach(id=>{ const el=$(id); if(document.activeElement!==el||el.type==='range') el.value=dur; });
  fillRanges(); setPressed(); $('smc1h').textContent='At '+total+' mm over '+dur+' hour'+(dur===1?'':'s')+'…'; clearTimeout(window._smt); window._smt=setTimeout(send,150); }
function fillRanges(){ document.querySelectorAll('#sim .sv-rng').forEach(r=>r.style.setProperty('--p',((r.value-r.min)/(r.max-r.min)*100)+'%')); }
function setPlay(p){ playing=p; [$('smpb'),$('smpb2')].forEach(b=>{ b.innerHTML=p?IC.pause:IC.play; b.setAttribute('aria-label',p?'Pause':'Play'); }); }
function setMode(m){ mode=m; $('smstage').dataset.mode=m; document.querySelectorAll('.sv-seg button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.m===m));
  $('smsrc').textContent=m==='aerial'?'Aerial: ArcGIS Pro run of the 2022 storm · numbers: model with your rain':'Model: your rain on LiDAR terrain (30 m grid)'; }
function setZoom(z){ zoom=Math.max(1,Math.min(2.5,z)); $('smpan').style.transform='scale('+zoom+')'; }
function wire(){
  $('smtot').oninput=e=>setInputs(+e.target.value,dur); $('smtotr').oninput=e=>setInputs(+e.target.value,dur);
  $('smdur').oninput=e=>setInputs(total,+e.target.value); $('smdurr').oninput=e=>setInputs(total,+e.target.value);
  $('smsc').onclick=e=>{ const b=e.target.closest('button'); if(b){ const s=SC[+b.dataset.i]; setInputs(s[1],s[2]); } };
  $('smk').oninput=e=>{ setPlay(false); show(+e.target.value); };
  const toggle=()=>{ setPlay(!playing); if(playing&&k>=KMAX) show(0); last=performance.now(); if(playing) requestAnimationFrame(tick); };
  $('smpb').onclick=toggle; $('smpb2').onclick=toggle;
  document.querySelectorAll('.sv-seg button').forEach(b=>b.onclick=()=>setMode(b.dataset.m));
  $('smzi').onclick=()=>setZoom(zoom*1.25); $('smzo').onclick=()=>setZoom(zoom/1.25); $('smzh').onclick=()=>setZoom(1);
  $('smframe').addEventListener('load',()=>{ frameReady=true; setTimeout(send,500); });
  fillRanges(); }
function tick(now){ if(!playing||root.hidden) return; const dt=Math.min(.1,(now-last)/1000); last=now; show(k+dt*1.6); if(k>=KMAX){ setPlay(false); return; } requestAnimationFrame(tick); }
let built=false;
function open(){ if(!built){ render(); built=true; } root.hidden=false; document.querySelectorAll('nav button').forEach(b=>b.setAttribute('aria-current',b.dataset.v==='sim'?'page':'false')); }
function close(){ root.hidden=true; playing=false; }
const nav=document.querySelector('nav'); if(nav&&!nav.querySelector('[data-v="sim"]')){ const b=document.createElement('button'); b.type='button'; b.dataset.v='sim'; b.textContent='Simulation';
  const rep=nav.querySelector('[data-v="report"]'); nav.insertBefore(b,rep);
  b.addEventListener('click',()=>{ ['news','rp'].forEach(id=>{ const el=document.getElementById(id); if(el) el.hidden=true; }); open(); }); }
document.querySelectorAll('nav button').forEach(b=>{ if(b.dataset.v!=='sim') b.addEventListener('click',close); });
if(location.hash==='#simulation') setTimeout(open,0);
})();
