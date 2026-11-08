/* Conditions page: one site at a time, each condition compared with the government standard.
   Uses the sourced data in index.html (SITES, LAMC via condOf, STD, STDP, HC). Opens from the Conditions tab. */
(function(){
if (typeof SITES==='undefined' || typeof condOf!=='function') return;
const root=document.createElement('section'); root.id='cd'; root.hidden=true; root.setAttribute('aria-label','Site conditions'); document.body.appendChild(root);
const h=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const I=(d,w)=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(w||1.7)+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+d+'</svg>';
const IC={
  water:I('<path d="M12 3s-6.5 7.2-6.5 11.5a6.5 6.5 0 0 0 13 0C18.5 10.2 12 3 12 3z"/>'),
  san:I('<path d="M7 3h10v5.5H7z"/><path d="M5 10.5h14a7 7 0 0 1-14 0z"/><path d="M9.5 16.8 8.6 21h6.8l-.9-4.2"/>'),
  power:I('<path d="M13 2.5 4.5 13.5h6.5l-1 8 8.5-11h-6.5z"/>'),
  crowd:I('<path d="M3.5 11 12 4l8.5 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5.5h4V20"/>'),
  safe:I('<path d="M12 3l8 3v6c0 4.8-3.4 8-8 9-4.6-1-8-4.2-8-9V6z"/><path d="m8.6 12 2.4 2.4 4.4-4.6"/>'),
  people:I('<circle cx="12" cy="7" r="2.8"/><circle cx="5" cy="9" r="2.2"/><circle cx="19" cy="9" r="2.2"/><path d="M7 20v-2a5 5 0 0 1 10 0v2"/><path d="M1.5 19v-1.2A3.8 3.8 0 0 1 7 14.5M22.5 19v-1.2a3.8 3.8 0 0 0-5.5-3.3"/>',1.5),
  pin:I('<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>'),
  chev:I('<path d="m6 9 6 6 6-6"/>',2), right:I('<path d="m9 6 6 6-6 6"/>',2), arrow:I('<path d="M5 12h14M13 6l6 6-6 6"/>',2),
  bulb:I('<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.8.6 1.1 1.4 1.1 2.2h5c0-.8.3-1.6 1.1-2.2A6 6 0 0 0 12 3z"/>'),
  info:I('<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5"/><circle cx="12" cy="7.8" r=".6" fill="currentColor"/>')
};
const CK=[['water','Water','Access to clean and reliable water at the site.'],['san','Toilets','Toilets and places to wash at the site.'],['power','Power','Electricity and lighting at the site.'],
  ['crowd','Housing','Space and shelter for each household.'],['safe','Safety','Whether the site itself is safe from flooding.']];
const STAT={red:['Below standard','bad'],yellow:['Needs attention','warn'],green:['Meets standard','ok'],grey:['Not reported','na']};
/* Lamontville: the counts behind each comparison (GroundUp 8 Jun 2022, IOL 26 Feb 2025, Housing Code 2009, Sphere 2018) */
const LAM={
  water:{short:'1 tap for about 100 households',site:['1 tap','for about 100 households'],std:['4 taps','(1 per 25 families)'],
    mean:'There are <b>3 fewer taps</b> than the government standard, which can lead to long queues, poor hygiene and a higher risk of disease.'},
  san:{short:'16 toilets, rarely cleaned',site:['16 toilets','portable, rarely cleaned · nowhere to wash'],std:['20 toilets','(1 per 5 families)'],
    mean:'The camp is <b>4 toilets short</b> of the standard, and residents have nowhere to wash. Shared toilets that are rarely cleaned spread disease.'},
  power:{short:'No electricity on arrival',site:['None','no electricity when residents arrived'],std:['Street lights','(high-mast lighting only)'],
    mean:'The programme only pays for high-mast lighting, so there is <b>no household electricity standard</b> to fall short of. Homes can stay dark either way.'},
  crowd:{short:'9 people in one tin room',site:['9 people','in one tin room (size not reported)'],std:['24 m²','(shelter per household)'],
    mean:'If nine people share a 24 m² shelter, each has <b>2.7 m²</b>, below the 3.5 m² per person humanitarian minimum (Sphere). The room’s actual size was not reported.'},
  safe:{short:'2 m from the flood line',site:['2 m','from the 1-in-100-year flood line'],std:['Off flood land','(move people away from flood risk)'],
    mean:'The camp <b>flooded in April 2022 and February 2025</b>. Emergency housing is meant for people moved off land “prone to dangerous flooding”.'}
};
/* illustrations: what the site has (solid) vs what the standard asks for (dashed = missing) */
const G='#1F5C3B', B='#5AA0E6';
const tap=(x,dash)=>'<g transform="translate('+x+' 14)" fill="none" stroke="'+G+'" stroke-width="'+(dash?1.6:3.2)+'"'+(dash?' stroke-dasharray="3.5 3"':'')+' stroke-linejoin="round"><path d="M8 100V30a12 12 0 0 1 12-12h26v12H24a4 4 0 0 0-4 4v66"/><path d="M28 18V8M20 8h16"/><path d="M44 30v7"/></g><path d="M'+(x+44)+' 60c0 0-4.5 6-4.5 9a4.5 4.5 0 0 0 9 0c0-3-4.5-9-4.5-9z" fill="'+B+'"/>'+(dash?'':'<ellipse cx="'+(x+44)+'" cy="118" rx="16" ry="3.5" fill="'+B+'" opacity=".8"/>');
const loo=(x,dash)=>'<g transform="translate('+x+' 18) scale(1.15)" fill="none" stroke="'+G+'" stroke-width="'+(dash?1.5:2.8)+'"'+(dash?' stroke-dasharray="3.5 3"':'')+' stroke-linejoin="round"><path d="M8 4h34v20H8z"/><path d="M3 31h44a22 22 0 0 1-44 0z"/><path d="M16 52l-3 30h24l-3-30"/></g>';
const house=(x,y,s,c,dash)=>'<g transform="translate('+x+' '+y+') scale('+s+')" fill="none" stroke="'+(c||G)+'" stroke-width="'+(2.6/s)+'"'+(dash?' stroke-dasharray="3 3"':'')+' stroke-linejoin="round"><path d="M2 20 20 5l18 15"/><path d="M6 17v19h28V17"/><path d="M16 36v-9h8v9"/></g>';
const person=(x,y)=>'<circle cx="'+x+'" cy="'+(y-15)+'" r="5" fill="'+G+'"/><path d="M'+(x-7)+' '+y+'v-4a7 7 0 0 1 14 0v4z" fill="'+G+'"/>';
const ART={
  water:()=>tap(18)+'<line x1="118" y1="18" x2="118" y2="122" stroke="#B9CDBD"/>'+tap(140,1)+tap(220,1)+tap(300,1),
  san:()=>loo(22)+'<line x1="118" y1="18" x2="118" y2="122" stroke="#B9CDBD"/>'+[0,1,2,3].map(i=>loo(136+i*64,1)).join(''),
  power:()=>'<g fill="none" stroke="'+G+'" stroke-width="3" stroke-linejoin="round"><path d="M60 18a26 26 0 0 1 15 47v12H45V65a26 26 0 0 1 15-47z"/><path d="M47 86h26M50 95h20"/><path d="M30 112 92 14" stroke="#C2410C"/></g>'+
    '<line x1="140" y1="18" x2="140" y2="122" stroke="#B9CDBD"/><g fill="none" stroke="'+G+'" stroke-width="3"><path d="M210 122V22h34"/><path d="M238 16h22v12h-22z" fill="'+G+'"/></g><path d="M240 30 215 122h70l-25-92z" fill="#F5C842" opacity=".35"/>',
  crowd:()=>'<rect x="14" y="20" width="100" height="98" fill="none" stroke="'+G+'" stroke-width="2" stroke-dasharray="5 4"/>'+[0,1,2,3,4,5,6,7,8].map(i=>person(32+(i%3)*32,54+Math.floor(i/3)*30)).join('')+
    '<line x1="140" y1="18" x2="140" y2="122" stroke="#B9CDBD"/><rect x="172" y="26" width="92" height="92" fill="#DCEADD" stroke="'+G+'" stroke-width="2.6"/><text x="218" y="76" text-anchor="middle" font-family="Inter,Arial" font-weight="700" font-size="18" fill="'+G+'">24 m²</text><text x="218" y="96" text-anchor="middle" font-family="Inter,Arial" font-size="11" fill="#3B3B3B">≈ 4.9 × 4.9 m</text>',
  safe:()=>house(30,40,1.9)+'<path d="M8 104q10-8 20 0t20 0 20 0 20 0 20 0M8 116q10-8 20 0t20 0 20 0 20 0 20 0" fill="none" stroke="'+B+'" stroke-width="3"/>'+
    '<line x1="140" y1="18" x2="140" y2="122" stroke="#B9CDBD"/><path d="M160 122q50-60 140 -20V122z" fill="#DCEADD"/>'+house(214,38,1.5)+'<path d="M160 118q10-7 20 0" fill="none" stroke="'+B+'" stroke-width="3"/>'
};
let site='lamontville', k='water';
function x(){ return byId[site]; }
function shortName(s){ return s.name.replace(/ (transit )?camp$/i,'').replace(/^Larger /,''); }
function placeName(s){ const a=(s.addr||'').split(',').map(t=>t.trim()).filter(Boolean); return a.length?a[a.length-1]:shortName(s); }
function hh(s){ const t=s.hh||'', n=(t.match(/[\d,]+\+?/)||[''])[0]; const unit=/famil/i.test(t)?'families':/people|residents/i.test(t)?'people':'households';
  return n?{pre:/about|around|approx|~|roughly|estimated/i.test(t)?'About':'',n,unit}:{pre:'',n:'—',unit:'not reported'}; }
function status(s,key){ return condOf(s,key).c||'grey'; }
function summary(s){ const st=CK.map(c=>status(s,c[0])), red=st.filter(c=>c==='red').length, yel=st.filter(c=>c==='yellow').length, grn=st.filter(c=>c==='green').length, gr=st.filter(c=>c==='grey').length;
  const lab=red>=2?['Below standard','bad']:red||yel?['Needs attention','warn']:grn===5?['Meets standard','ok']:['Not enough reports','na'];
  let t=red?'Below the standard on '+red+' of 5 key conditions':grn?'Meets the standard on '+grn+' of 5 key conditions':'No condition has been checked against the standard';
  if(yel) t+=', with '+yel+' needing attention'; if(gr) t+='; '+gr+' not reported'; return {lab,t:t+'.'}; }
function detail(s){ const L=s.id==='lamontville', c=condOf(s,k), lab=CK.find(q=>q[0]===k), d=L?LAM[k]:null;
  const site=d?d.site:[STAT[c.c||'grey'][0],c.t||'Not reported'], std=d?d.std:['Standard',STD[k]];
  const big=(t,cls)=>'<b class="'+cls+(t.length>14?' long':'')+'">'+h(t)+'</b>';
  const mean=d?d.mean:(c.c==='grey'?'Nobody has reported this condition at '+h(shortName(s))+' yet, so it can’t be compared with the standard.':'Reported: '+h(c.t)+'. No counts were published for this site, so the size of the gap can’t be measured yet.');
  return '<div class="cd-det" id="cddet" tabindex="-1"><div class="cd-dh"><span class="ic">'+IC[k]+'</span><div><h2>'+lab[1]+'</h2><p>'+lab[2]+'</p></div></div>'+
   '<div class="cd-cmp"><div class="cd-t cd-ts"><small>At the site</small>'+big(site[0],'v')+'<span>'+h(site[1])+'</span></div><span class="vs" aria-hidden="true">VS</span>'+
    '<div class="cd-t cd-tg"><small>Government standard</small>'+big(std[0],'v')+'<span>'+h(std[1])+' <a class="inf" href="'+HC+'" target="_blank" rel="noopener" aria-label="Source: '+h(STDP[k])+'" title="Source: '+h(STDP[k])+'">'+IC.info+'</a></span></div>'+
    '<div class="cd-art">'+(L?'<svg viewBox="0 0 380 134" role="img" aria-label="'+h(site[0]+' at the site compared with '+std[0]+' in the standard')+'">'+ART[k]()+'</svg>':'<p>Counts were not reported for this site, so there is nothing to draw to scale yet.</p>')+'</div></div>'+
   '<div class="cd-mean"><span class="ic">'+IC.bulb+'</span><b>What this means</b><p>'+mean+(c.src?' <a href="'+h(c.src)+'" target="_blank" rel="noopener">Evidence ↗</a>':'')+'</p></div>'+
   (typeof animSVG==='function'?'<div class="cd-anim"><p class="cd-swipe">Swipe to see the standard →</p><div class="sc"><svg viewBox="0 0 960 420" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Animated comparison: '+h(lab[1])+' at the site against the government standard">'+animSVG(s,k)+'</svg></div></div>':'')+
   '</div>'; }
function pill(c){ const s=STAT[c]||STAT.grey; return '<span class="cd-pill '+s[1]+'">'+s[0]+'</span>'; }
function render(){ const s=x(), H=hh(s), S=summary(s), L=s.id==='lamontville';
  root.innerHTML='<div class="cd-wrap">'+
  '<div class="cd-top"><div class="cd-head"><div class="cd-k">Site conditions</div><h1>How does '+h(s.name)+' compare to the standard?</h1><p>See what services are available at the site and what the government standard requires.</p></div>'+
   '<div class="cd-side"><label class="cd-pick"><span class="ic">'+IC.pin+'</span><span class="tx"><b>'+h(s.name)+'</b><small>'+h(s.addr||'')+'</small></span><span class="cv">'+IC.chev+'</span>'+
     '<select id="cdsite" aria-label="Choose a site">'+SITES.map(q=>'<option value="'+q.id+'"'+(q.id===site?' selected':'')+'>'+h(q.name)+'</option>').join('')+'</select></label>'+
    '<div class="cd-sum"><span class="ic">'+IC.people+'</span><div class="hh"><small>'+H.pre+'</small><b>'+h(H.n)+'</b><span>'+H.unit+'</span></div><div class="as"><small>Overall assessment</small><span class="cd-big '+S.lab[1]+'">'+S.lab[0]+'</span><p>'+S.t+'</p></div></div></div></div>'+
  '<div class="cd-body"><div class="cd-list" role="group" aria-label="Conditions">'+CK.map(([key,l])=>{ const c=status(s,key), on=key===k;
     return '<button type="button" data-k="'+key+'" aria-pressed="'+on+'"><span class="ic">'+IC[key]+'</span><span class="tx"><b>'+l+'</b><small>'+(on&&L?LAM[key].short:STAT[c][0])+'</small></span><span class="go">'+IC.right+'</span></button>'; }).join('')+'</div>'+
   '<div class="cd-main">'+detail(s)+
    '<div class="cd-other"><div class="oh"><h2>Other conditions at this site</h2><button type="button" class="cd-link" id="cdfull">View full site report '+IC.arrow+'</button></div>'+
     '<div class="og">'+CK.filter(c=>c[0]!==k).map(([key,l])=>'<button type="button" data-k="'+key+'"><span class="ic">'+IC[key]+'</span><span><b>'+l+'</b>'+pill(status(s,key))+'</span></button>').join('')+'</div></div>'+
   '</div></div>'+
  '<p class="cd-src">Site facts: news reports listed on each site (Lamontville: GroundUp, 8 Jun 2022; IOL, 26 Feb 2025). Standard: <a href="'+HC+'" target="_blank" rel="noopener">National Housing Code 2009, Emergency Housing Programme ↗</a>; space minimum: Sphere Handbook 2018.</p></div>';
  wire(); }
function pick(key,focus){ k=key; render(); if(focus){ const d=document.getElementById('cddet'); if(d){ d.focus({preventScroll:true}); if(innerWidth<=980) d.scrollIntoView({behavior:'smooth',block:'start'}); } } }
function wire(){
  root.querySelector('#cdsite').onchange=e=>{ site=e.target.value; render(); };
  root.querySelectorAll('.cd-list button,.og button').forEach(b=>b.onclick=()=>pick(b.dataset.k,true));
  root.querySelector('#cdfull').onclick=()=>{ const id=site, m=document.querySelector('nav button[data-v="map"]'); if(m) m.click(); setTimeout(()=>{ try{ select(id,true); }catch(e){} },60); };
}
function open(){ render(); root.hidden=false; root.scrollTop=0; ['rp','sim','news'].forEach(id=>{ const el=document.getElementById(id); if(el) el.hidden=true; });
  document.querySelectorAll('nav button').forEach(b=>b.setAttribute('aria-current',b.dataset.v==='conditions'?'page':'false')); }
function close(){ root.hidden=true; }
document.querySelectorAll('nav button').forEach(b=>b.addEventListener('click',()=>{ if(b.dataset.v==='conditions') setTimeout(open,0); else close(); }));
window.openConditions=open;
if(location.hash==='#conditions') setTimeout(open,0);
})();
