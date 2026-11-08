/* Stories page: every story is real reporting, linked to the original. Data: data/stories.js. Opens from the Stories tab. */
(function(){
if (typeof STORIES === 'undefined' || typeof SITES === 'undefined') return;
const esc=t=>String(t??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const TOPICS=['Floods','Relocation','Housing','Government','Residents'];
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const fmt=s=>{ const [y,m,d]=s.date.split('-'); return s.approx?MON[+m-1]+' '+y:(+d)+' '+MON[+m-1]+' '+y; };
const SN=Object.fromEntries(SITES.map(s=>[s.id,s.name]));
const count=id=>STORIES.filter(s=>s.sites.includes(id)).length;
const sitesSorted=SITES.slice().sort((a,b)=>count(b.id)-count(a.id)||a.name.localeCompare(b.name)).filter(s=>count(s.id)>0);
const YEARS=[...new Set(STORIES.map(s=>s.date.slice(0,4)))].sort().reverse();
const SHOW=4;
let site='all', topic='all', year='all', q='', view='grid', more=false, saved=[];
try{ view=localStorage.getItem('nw-view')||'grid'; saved=JSON.parse(localStorage.getItem('nw-saved')||'[]'); }catch(e){}
const root=document.createElement('section'); root.id='news'; root.hidden=true; root.setAttribute('aria-label','Stories'); document.body.appendChild(root);
/* images: licensed GroundUp photos where they exist, otherwise one of the site's own map images, varied by position */
const VAR=[['','Satellite view of ',' · Esri'],['_flood','',' with the 1-in-100-year flood line'],['_water','',' · satellite water record (JRC)']];
const vi=s=>STORIES.indexOf(s)%3;
const SP={lamontville:['assets/photos/gu_lamontville_relocation_2025.jpg','Tsoanelo Sefoloko'],crystal:['assets/photos/sites/crystal.jpg','Joseph Bracken'],astra:['assets/photos/sites/astra.jpg','Manqulo Nyakombi'],
  point:['assets/photos/sites/point.jpg','Joseph Bracken'],congo:['assets/photos/sites/congo.jpg','Tsoanelo Sefoloko'],frazer:['assets/photos/sites/frazer.jpg','Manqulo Nyakombi'],montclair:['assets/photos/sites/montclair.jpg','Tsoanelo Sefoloko']};
const thumb=id=>SP[id]?SP[id][0]:'assets/sites/'+id+'.jpg';
const imgOf=s=>s.img||(SP[s.sites[0]]?SP[s.sites[0]][0]:'assets/sites/'+s.sites[0]+VAR[vi(s)][0]+'.jpg');
const labOf=s=>s.img?(s.img.includes('2022')?'Photo: Nokulunga Majola / GroundUp':'Photo: Tsoanelo Sefoloko / GroundUp'):SP[s.sites[0]]?(SN[s.sites[0]]+' · Photo: '+SP[s.sites[0]][1]+' / GroundUp'):VAR[vi(s)][1]+(SN[s.sites[0]]||'the site')+VAR[vi(s)][2];
const I=(d,w)=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(w||1.8)+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+d+'</svg>';
const IC={search:I('<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>'),pin:I('<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>'),
  cal:I('<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M8.5 3v4M15.5 3v4"/>'),chev:I('<path d="m6 9 6 6 6-6"/>',2),arrow:I('<path d="M5 12h14M13 6l6 6-6 6"/>',2),
  grid:I('<rect x="4" y="4" width="6.5" height="6.5" rx="1.2"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.2"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.2"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.2"/>'),
  list:I('<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1" fill="currentColor"/><circle cx="4.5" cy="12" r="1" fill="currentColor"/><circle cx="4.5" cy="18" r="1" fill="currentColor"/>'),
  mark:I('<path d="M6.5 3.5h11v17l-5.5-4-5.5 4z"/>'),markOn:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 3.5h11v17l-5.5-4-5.5 4z" fill="currentColor" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
  play:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>'};
const tagOf=s=>topic!=='all'&&s.tags.includes(topic)?topic:s.tags[0];
function meta(s){ const t=tagOf(s); return '<div class="nw-line">'+(t?'<span class="nw-tag t-'+t+'">'+t+'</span>':'')+'<span>'+fmt(s)+'</span><i aria-hidden="true">•</i><span>'+esc(s.pub)+'</span></div>'; }
function card(s){ const i=STORIES.indexOf(s), on=saved.includes(s.url);
  return '<article class="nw-card"><a class="nw-img" href="'+esc(s.url)+'" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true"><img src="'+imgOf(s)+'" alt="" loading="lazy">'+(s.video?'<span class="nw-play">'+IC.play+'</span>':'')+'<span class="nw-lab">'+esc(labOf(s))+'</span></a>'+
   '<div class="tx">'+meta(s)+'<h3><a href="'+esc(s.url)+'" target="_blank" rel="noopener">'+esc(s.title)+'</a></h3>'+(s.dek?'<p>'+esc(s.dek)+'</p>':'')+
   '<div class="ft"><a class="nw-read" href="'+esc(s.url)+'" target="_blank" rel="noopener">'+(s.video?'Watch story':'Read story')+IC.arrow+'<span class="vh"> at '+esc(s.pub)+' (opens in a new tab)</span></a>'+
   '<button type="button" class="nw-mark" data-i="'+i+'" aria-pressed="'+on+'" aria-label="'+(on?'Remove from saved':'Save story')+'" title="'+(on?'Saved on this device':'Save on this device')+'">'+(on?IC.markOn:IC.mark)+'</button></div></div></article>'; }
function list(){ let L=STORIES.filter(s=>(site==='all'||s.sites.includes(site))&&(topic==='all'||(topic==='saved'?saved.includes(s.url):s.tags.includes(topic)))&&(year==='all'||s.date.startsWith(year)));
  if(q){ const v=q.toLowerCase(); L=L.filter(s=>(s.title+' '+s.dek+' '+s.pub+' '+s.sites.map(i=>SN[i]).join(' ')).toLowerCase().includes(v)); }
  return L.slice().sort((a,b)=>b.date.localeCompare(a.date)); }
function sel(id,icon,label,opts,val){ return '<label class="nw-sel">'+icon+'<span>'+esc((opts.find(o=>o[0]===val)||opts[0])[1])+'</span>'+IC.chev+'<select id="'+id+'" aria-label="'+label+'">'+opts.map(o=>'<option value="'+o[0]+'"'+(o[0]===val?' selected':'')+'>'+esc(o[1])+'</option>').join('')+'</select></label>'; }
function siteBtn(s){ const n=count(s.id); return '<button data-s="'+s.id+'" aria-current="'+(site===s.id)+'"><img src="'+thumb(s.id)+'" alt=""><span><b>'+esc(s.name)+'</b><small>'+n+' stor'+(n===1?'y':'ies')+'</small></span></button>'; }
function render(){ const L=list(), S=site==='all'?null:SITES.find(x=>x.id===site);
  const shown=more?sitesSorted:sitesSorted.slice(0,SHOW).concat(S&&sitesSorted.indexOf(S)>=SHOW?[S]:[]);
  root.innerHTML='<div class="nw-hero"><div class="nw-in"><div class="nw-k">Stories</div><h1>People. Places. Decisions.</h1><p>Reporting from Durban’s temporary relocation sites: before, during and after the floods. Real people, real places, and the decisions that shape their lives.</p></div>'+
   '<div class="ph"><img src="assets/photos/gu_lamontville_relocation_2025.jpg" alt="Residents of the Lamontville camp outside their damaged shacks after the February 2025 flood"><span class="nw-cr">Lamontville camp after the Feb 2025 flood <i>•</i> Photo: Tsoanelo Sefoloko / <a href="https://groundup.org.za/article/over-20-people-died-and-hundreds-relocated-following-recent-kzn-floods/" target="_blank" rel="noopener">GroundUp</a> · CC BY-ND</span></div></div>'+
  '<div class="nw-bar"><label class="nw-search">'+IC.search+'<input id="nwq" type="search" placeholder="Search stories" value="'+esc(q)+'" aria-label="Search stories"></label>'+
   sel('nwsite',IC.pin,'Site',[['all','All sites']].concat(sitesSorted.map(s=>[s.id,s.name])),site)+
   sel('nwyear',IC.cal,'Date',[['all','All dates']].concat(YEARS.map(y=>[y,y])),year)+
   '<div class="nw-chips" role="group" aria-label="Topic"><button data-t="all" aria-pressed="'+(topic==='all')+'">All topics</button>'+TOPICS.map(t=>'<button data-t="'+t+'" aria-pressed="'+(topic===t)+'">'+t+'</button>').join('')+
   (saved.length||topic==='saved'?'<button data-t="saved" aria-pressed="'+(topic==='saved')+'">Saved ('+saved.length+')</button>':'')+'</div></div>'+
  '<div class="nw-body"><aside class="nw-side"><h2>Sites in Durban</h2><div class="nw-sites" id="nwsites"><button data-s="all" class="all" aria-current="'+(site==='all')+'"><span class="ic">'+IC.pin+'</span><span><b>All sites</b><small>'+STORIES.length+' stories</small></span></button>'+
    shown.map(siteBtn).join('')+'</div>'+
    (sitesSorted.length>SHOW?'<button type="button" class="nw-more" id="nwmore" aria-expanded="'+more+'" aria-controls="nwsites">'+(more?'Show fewer sites':'Show more sites')+IC.chev+'</button>':'')+'</aside>'+
  '<div class="nw-main"><div class="nw-mh"><div><h2>'+(S?'Stories from '+esc(S.name):topic==='saved'?'Saved stories':'All stories')+'</h2><div class="nw-meta"><span>'+L.length+' stor'+(L.length===1?'y':'ies')+'</span><i aria-hidden="true">•</i><span>Latest first</span>'+(S?'<a href="#" id="nwmap">See this site on the map →</a>':'')+'</div></div>'+
   '<div class="nw-view" role="group" aria-label="Layout"><button type="button" data-v="grid" aria-pressed="'+(view==='grid')+'" aria-label="Grid">'+IC.grid+'</button><button type="button" data-v="list" aria-pressed="'+(view==='list')+'" aria-label="List">'+IC.list+'</button></div></div>'+
   (L.length?'<div class="nw-grid v-'+view+'">'+L.map(card).join('')+'</div>':'<div class="nw-empty">No stories match. <button type="button" id="nwreset">Clear filters</button></div>')+
   '<p class="nw-note">Headlines, dates and summaries are each publisher’s own. Photos: GroundUp (CC BY-ND, unaltered apart from size), credited on each image; a site photo may come from a different GroundUp article than the story it sits on. Sites without a licensed photo show their satellite or flood-map view. Tags are ours. Saved stories stay on this device.</p></div></div>';
  wire(); }
function setSite(id){ site=id; render(); if(innerWidth<=980){ const m=root.querySelector('.nw-main'); if(m) m.scrollIntoView({block:'start',behavior:'smooth'}); } }
function wire(){ const $=id=>document.getElementById(id), qi=$('nwq');
  qi.addEventListener('input',()=>{ q=qi.value; const pos=qi.selectionStart; render(); const n=$('nwq'); n.focus(); try{ n.setSelectionRange(pos,pos); }catch(e){} });
  $('nwsite').onchange=e=>setSite(e.target.value);
  $('nwyear').onchange=e=>{ year=e.target.value; render(); };
  root.querySelectorAll('.nw-chips button').forEach(b=>b.onclick=()=>{ topic=b.dataset.t; render(); });
  root.querySelectorAll('#nwsites button').forEach(b=>b.onclick=()=>setSite(b.dataset.s));
  const mo=$('nwmore'); if(mo) mo.onclick=()=>{ more=!more; render(); };
  root.querySelectorAll('.nw-view button').forEach(b=>b.onclick=()=>{ view=b.dataset.v; try{ localStorage.setItem('nw-view',view); }catch(e){} render(); });
  root.querySelectorAll('.nw-mark').forEach(b=>b.onclick=()=>{ const u=STORIES[+b.dataset.i].url, k=saved.indexOf(u); if(k<0) saved.push(u); else saved.splice(k,1); try{ localStorage.setItem('nw-saved',JSON.stringify(saved)); }catch(e){} const y=root.scrollTop; render(); root.scrollTop=y; });
  const r=$('nwreset'); if(r) r.onclick=()=>{ site='all'; topic='all'; year='all'; q=''; render(); };
  const m=$('nwmap'); if(m) m.onclick=e=>{ e.preventDefault(); const id=site; close(); const nb=document.querySelector('nav button[data-v="map"]'); if(nb) nb.click(); setTimeout(()=>{ if(typeof select==='function') select(id,true); },50); }; }
function open(){ render(); root.hidden=false; root.scrollTop=0; document.querySelectorAll('nav button').forEach(b=>b.setAttribute('aria-current',b.dataset.v==='stories'?'page':'false')); }
function close(){ root.hidden=true; }
document.querySelectorAll('nav button').forEach(b=>b.addEventListener('click',()=>{ if(b.dataset.v==='stories') setTimeout(open,0); else close(); }));
window.openStories=open;
if(location.hash==='#stories') setTimeout(open,0);
})();
