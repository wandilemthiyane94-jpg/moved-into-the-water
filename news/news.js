/* Stories page: every story is real reporting, linked to the original. Data: data/stories.js. Opens from the Stories tab. */
(function(){
if (typeof STORIES === 'undefined' || typeof SITES === 'undefined') return;
const esc=t=>String(t??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const TOPICS=['Floods','Relocation','Housing','Government','Residents'];
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const fmt=s=>{ const [y,m,d]=s.date.split('-'); return s.approx?MON[+m-1]+' '+y:(+d)+' '+MON[+m-1]+' '+y; };
const SN=Object.fromEntries(SITES.map(s=>[s.id,s.name]));
const count=id=>STORIES.filter(s=>s.sites.includes(id)).length;
const sitesSorted=SITES.slice().sort((a,b)=>count(b.id)-count(a.id)||a.name.localeCompare(b.name));
let site='all', topic='all', q='';
const root=document.createElement('section'); root.id='news'; root.hidden=true; root.setAttribute('aria-label','Stories'); document.body.appendChild(root);
/* images: licensed GroundUp photos where they exist, otherwise one of the site's own map images, varied by position */
const VAR=[['','Satellite view of ',' · Esri'],['_flood','',' with the 1-in-100-year flood line'],['_water','',' · satellite water record (JRC)']];
const vi=s=>STORIES.indexOf(s)%3;
/* GroundUp photos of each site (CC BY-ND, unaltered apart from size); sites without one keep their satellite view */
const GU='https://groundup.org.za/article/';
const SP={lamontville:['assets/photos/gu_lamontville_relocation_2025.jpg','Tsoanelo Sefoloko'],crystal:['assets/photos/sites/crystal.jpg','Joseph Bracken'],astra:['assets/photos/sites/astra.jpg','Manqulo Nyakombi'],
  point:['assets/photos/sites/point.jpg','Joseph Bracken'],congo:['assets/photos/sites/congo.jpg','Tsoanelo Sefoloko'],frazer:['assets/photos/sites/frazer.jpg','Manqulo Nyakombi'],montclair:['assets/photos/sites/montclair.jpg','Tsoanelo Sefoloko']};
const thumb=id=>SP[id]?SP[id][0]:'assets/sites/'+id+'.jpg';
let sitesOpen=true; try{ sitesOpen=localStorage.getItem('nw-sites')!=='0'; }catch(e){}
const imgOf=s=>s.img||(SP[s.sites[0]]?SP[s.sites[0]][0]:'assets/sites/'+s.sites[0]+VAR[vi(s)][0]+'.jpg');
const labOf=s=>s.img?(s.img.includes('2022')?'Photo: Nokulunga Majola / GroundUp':'Photo: Tsoanelo Sefoloko / GroundUp'):SP[s.sites[0]]?(SN[s.sites[0]]+' · Photo: '+SP[s.sites[0]][1]+' / GroundUp'):VAR[vi(s)][1]+(SN[s.sites[0]]||'the site')+VAR[vi(s)][2];
function line(s){ return '<div class="nw-line"><span>'+fmt(s)+'</span><i class="sep"></i><span>'+esc(s.pub)+'</span>'+s.tags.slice(0,1).map(t=>'<span class="nw-tag t-'+t+'">'+t+'</span>').join('')+'</div>'; }
function card(s){ return '<article class="nw-card"><div class="nw-img" style="background-image:url('+imgOf(s)+')">'+(s.video?'<span class="play">▶</span>':'')+'<span class="lab">'+esc(labOf(s))+'</span></div><div class="tx">'+line(s)+'<h4>'+esc(s.title)+'</h4><a class="nw-read" href="'+esc(s.url)+'" target="_blank" rel="noopener">'+(s.video?'Watch':'Read story')+' <span aria-hidden="true">↗</span></a></div></article>'; }
function feat(s){ return '<article class="nw-feat"><div class="nw-img" style="background-image:url('+imgOf(s)+')">'+(s.video?'<span class="play">▶</span>':'')+'<span class="lab">'+esc(labOf(s))+'</span></div><div class="tx">'+line(s)+'<h4>'+esc(s.title)+'</h4>'+(s.dek?'<p>'+esc(s.dek)+'</p>':'')+'<div style="font-size:12.5px;color:#64748B">'+s.sites.map(id=>esc(SN[id]||id)).join(' · ')+'</div><a class="nw-read" href="'+esc(s.url)+'" target="_blank" rel="noopener">'+(s.video?'Watch on YouTube':'Read the story at '+esc(s.pub))+' <span aria-hidden="true">↗</span></a></div></article>'; }
function list(){ let L=STORIES.filter(s=>(site==='all'||s.sites.includes(site))&&(topic==='all'||s.tags.includes(topic)));
  if(q){ const v=q.toLowerCase(); L=L.filter(s=>(s.title+' '+s.dek+' '+s.pub+' '+s.sites.map(i=>SN[i]).join(' ')).toLowerCase().includes(v)); }
  const p=L.findIndex(s=>s.pin===site); if(p>0) L.unshift(L.splice(p,1)[0]); return L; }
function render(){ const L=list(), S=site==='all'?null:SITES.find(x=>x.id===site);
  root.innerHTML='<div class="nw-hero"><div class="bg"></div><span class="cr">Lamontville camp after the Feb 2025 flood · Photo: Tsoanelo Sefoloko / <a href="https://groundup.org.za/article/over-20-people-died-and-hundreds-relocated-following-recent-kzn-floods/" target="_blank" rel="noopener">GroundUp</a> · CC BY-ND</span><div class="in"><div class="nw-k">Stories</div><h1>People. Places. Decisions.</h1><p>Reporting from Durban’s temporary relocation sites: before, during and after the floods. Every story links to the original.</p></div></div>'+
  '<div class="nw-bar"><label class="nw-search"><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="5.5" fill="none" stroke="#9AA6B8" stroke-width="1.6"/><path d="M11 11L15 15" stroke="#9AA6B8" stroke-width="1.6"/></svg><input id="nwq" type="search" placeholder="Search stories, sites or publishers" value="'+esc(q)+'" aria-label="Search stories"></label>'+
  '<select class="nw-sel" id="nwsite" aria-label="Site"><option value="all">All sites</option>'+sitesSorted.map(s=>'<option value="'+s.id+'"'+(s.id===site?' selected':'')+'>'+esc(s.name)+'</option>').join('')+'</select>'+
  '<div class="nw-chips" role="group" aria-label="Topic"><button data-t="all" aria-pressed="'+(topic==='all')+'">All topics</button>'+TOPICS.map(t=>'<button data-t="'+t+'" aria-pressed="'+(topic===t)+'">'+t+'</button>').join('')+'</div></div>'+
  '<div class="nw-body"><aside class="nw-side"><h3>Sites in Durban</h3><div class="nw-sites"><button data-s="all" class="nw-allbtn" aria-current="'+(site==='all')+'" aria-expanded="'+sitesOpen+'" aria-controls="nwlist"><span class="all">ALL</span><span><b>All sites</b><small>'+STORIES.length+' stories · '+(sitesOpen?'hide list':'show list')+'</small></span><span class="arr nw-chev">⌄</span></button><div id="nwlist" class="nw-list"'+(sitesOpen?'':' hidden')+'>'+
    sitesSorted.map(s=>'<button data-s="'+s.id+'" aria-current="'+(site===s.id)+'"><img src="'+thumb(s.id)+'" alt=""><span><b>'+esc(s.name)+'</b><small>'+count(s.id)+' stor'+(count(s.id)===1?'y':'ies')+'</small></span><span class="arr">›</span></button>').join('')+'</div></div></aside>'+
  '<div class="nw-main"><h2>'+(S?'Stories from '+esc(S.name):'All stories')+'</h2><div class="nw-meta"><span>'+L.length+' stor'+(L.length===1?'y':'ies')+' · latest first'+(topic!=='all'?' · '+topic:'')+'</span>'+(S?'<a href="#" id="nwmap">See this site on the map →</a>':'')+'</div>'+
  (L.length?feat(L[0])+'<div class="nw-grid">'+L.slice(1).map(card).join('')+'</div>':'<div class="nw-empty">No stories match. Try another topic or site.</div>')+
  '<p class="nw-note">Headlines, dates and summaries are each publisher’s own. Photos: GroundUp (CC BY-ND, unaltered apart from size), credited on each image; a site photo may come from a different GroundUp article than the story it sits on. Sites without a licensed photo show their satellite or flood-map view. Tags are ours.</p></div></div>';
  wire(); }
function wire(){ const qi=document.getElementById('nwq');
  qi.addEventListener('input',()=>{ q=qi.value; const pos=qi.selectionStart; render(); const n=document.getElementById('nwq'); n.focus(); try{ n.setSelectionRange(pos,pos); }catch(e){} });
  document.getElementById('nwsite').onchange=e=>{ site=e.target.value; render(); };
  root.querySelectorAll('.nw-chips button').forEach(b=>b.onclick=()=>{ topic=b.dataset.t; render(); });
  root.querySelector('.nw-allbtn').onclick=()=>{ if(site==='all') sitesOpen=!sitesOpen; else { site='all'; } try{ localStorage.setItem('nw-sites',sitesOpen?'1':'0'); }catch(e){} render(); };
  root.querySelectorAll('.nw-list button').forEach(b=>b.onclick=()=>{ site=b.dataset.s; render(); root.querySelector('.nw-main').scrollIntoView({block:'start'}); });
  const m=document.getElementById('nwmap'); if(m) m.onclick=e=>{ e.preventDefault(); const id=site; close(); const nb=document.querySelector('nav button[data-v="map"]'); if(nb) nb.click(); setTimeout(()=>{ if(typeof select==='function') select(id,true); },50); }; }
function open(){ render(); root.hidden=false; root.scrollTop=0; document.querySelectorAll('nav button').forEach(b=>b.setAttribute('aria-current',b.dataset.v==='stories'?'page':'false')); }
function close(){ root.hidden=true; }
document.querySelectorAll('nav button').forEach(b=>b.addEventListener('click',()=>{ if(b.dataset.v==='stories') setTimeout(open,0); else close(); }));
window.openStories=open;
if(location.hash==='#stories') setTimeout(open,0);
})();
