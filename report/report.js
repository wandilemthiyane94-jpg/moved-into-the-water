/* Report page: a 3-step report form (choose site, tell us, review & send).
   Sends to the Google Form in MITW.gform (index.html). Without it, reports stay on the device. */
(function(){
if (typeof SITES === 'undefined') return;
const root=document.createElement('section'); root.id='rp'; root.hidden=true; root.setAttribute('aria-label','Report'); document.body.appendChild(root);
const DRAFT='mitw-draft';
const h=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const I=(d,extra)=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"'+(extra||'')+'>'+d+'</svg>';
const ICON={
  water:I('<path d="M12 3.5s-6 6.8-6 10.8a6 6 0 0 0 12 0c0-4-6-10.8-6-10.8z"/>'),
  san:I('<path d="M7 3h10v5H7z"/><path d="M5 10h14a7 7 0 0 1-14 0z"/><path d="M9.5 16.5 8.5 21h7l-1-4.5"/>'),
  power:I('<path d="M13 2.5 4.5 13.5h6.5l-1 8 8.5-11h-6.5z"/>'),
  safe:I('<path d="M12 3l8 3v6c0 4.8-3.4 8-8 9-4.6-1-8-4.2-8-9V6z"/><path d="m8.6 12 2.4 2.4 4.4-4.6"/>'),
  crowd:I('<circle cx="12" cy="7.5" r="2.6"/><circle cx="5.5" cy="9" r="2"/><circle cx="18.5" cy="9" r="2"/><path d="M7.5 19v-1.5a4.5 4.5 0 0 1 9 0V19"/><path d="M2 18.5v-1a3.5 3.5 0 0 1 5-3.2M22 18.5v-1a3.5 3.5 0 0 0-5-3.2"/>'),
  lock:I('<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15.5" r="1.2" fill="currentColor"/>'),
  clock:I('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
  arrow:I('<path d="M5 12h14M13 6l6 6-6 6"/>',' stroke-width="2"'),
  check:I('<path d="m5 12.5 4.5 4.5L19 7.5"/>',' stroke-width="2.4"'),
  pin:I('<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>')
};
const CONDS=[['water','Water','Is there a reliable supply of clean water?'],
  ['san','Toilets & washing','Are toilets, showers and washing facilities available and in good condition?'],
  ['power','Electricity','Do you have a reliable and safe electricity supply?'],
  ['safe','Safety','Do you feel safe at your site (e.g. at home, at night, and in shared spaces)?'],
  ['crowd','Space & crowding','Is there enough space for your household to live comfortably?']];
const RATE=[['ok','Working well'],['some','Sometimes a problem'],['bad','Not working']];
const YEAR_NOW=new Date().getFullYear();
let step=1, ans={};

/* hand-drawn style illustration: tin houses, a pole and a washing line */
const ART='<svg class="rp-art" viewBox="0 0 420 300" aria-hidden="true" preserveAspectRatio="xMinYMax meet">'+
 '<path d="M0 170 C70 120 120 135 175 112 C230 92 290 120 340 104 C380 92 405 100 420 96 V300 H0Z" fill="#E6DDD1"/>'+
 '<path d="M0 196 C80 170 150 182 220 160 C290 140 360 158 420 146 V300 H0Z" fill="#DCD1C3"/>'+
 '<g stroke="#8C7F70" stroke-width="1.3" fill="none"><path d="M118 70 V250"/><path d="M104 82 H132"/><path d="M108 92 H128"/>'+
 '<path d="M0 98 Q60 120 118 84 Q240 132 420 90"/><path d="M0 110 Q62 132 118 94 Q250 146 420 104"/></g>'+
 '<g stroke="#7A6E62" stroke-width="1" fill="#C9C1B6"><path d="M-10 208 L30 186 L80 206 V262 H-10Z"/><path d="M80 206 L30 186 L-10 208" fill="#A99F93"/>'+
 '<path d="M150 214 L205 192 L260 214 V266 H150Z" fill="#D3CBC0"/><path d="M146 216 L205 190 L264 216" fill="none" stroke-width="2"/>'+
 '<path d="M262 222 L310 204 L360 222 V268 H262Z" fill="#BEB5A9"/><path d="M360 230 L420 214 V270 H360Z" fill="#CFC7BC"/></g>'+
 '<g stroke="#8D8276" stroke-width=".7">'+Array.from({length:12},(_,i)=>'<path d="M'+(156+i*9)+' 216 V264"/>').join('')+Array.from({length:10},(_,i)=>'<path d="M'+(268+i*9)+' 224 V266"/>').join('')+Array.from({length:9},(_,i)=>'<path d="M'+(-4+i*9)+' 210 V260"/>').join('')+'</g>'+
 '<g fill="#5F574F"><rect x="22" y="222" width="18" height="40"/><rect x="190" y="230" width="20" height="36"/><rect x="226" y="226" width="16" height="14"/><rect x="300" y="236" width="14" height="12"/></g>'+
 '<path d="M66 200 Q140 214 240 196" stroke="#6E655C" stroke-width="1" fill="none"/>'+
 '<g stroke="#6E655C" stroke-width=".6"><path d="M86 203 h14 v22 h-14z" fill="#3E4A5A"/><path d="M106 205 h16 l-2 26 h-12z" fill="#7C3B33"/><path d="M128 207 h12 v16 h-12z" fill="#D8A24A"/><path d="M146 207 h14 v24 h-14z" fill="#E9E4DC"/><path d="M166 206 h12 v18 h-12z" fill="#4B5D4B"/></g>'+
 '<path d="M0 262 H420 V300 H0Z" fill="#CFC3B3"/><g fill="#B7AA98"><circle cx="70" cy="276" r="1.5"/><circle cx="240" cy="284" r="1.2"/><circle cx="330" cy="279" r="1.4"/></g>'+
 '</svg>';

function siteOptions(sel){ return '<option value="">Choose your site</option><optgroup label="Mapped sites">'+SITES.map(x=>'<option value="'+x.id+'"'+(sel===x.id?' selected':'')+'>'+h(x.name)+'</option>').join('')+'</optgroup>'+
  (typeof OTHER_TRA!=='undefined'?'<optgroup label="Other relocation areas">'+OTHER_TRA.map(o=>'<option value="tra'+o.id+'"'+(sel==='tra'+o.id?' selected':'')+'>'+h(o.name)+'</option>').join('')+'</optgroup>':'')+
  '<option value="other"'+(sel==='other'?' selected':'')+'>My site isn’t listed</option>'; }
function siteName(v){ const s=SITES.find(x=>x.id===v); if(s) return s.name; const o=typeof OTHER_TRA!=='undefined'&&OTHER_TRA.find(x=>'tra'+x.id===v); return o?o.name:(v==='other'?'Not listed':''); }
const label=(k,v)=>{ const r=RATE.find(x=>x[0]===v); return r?r[1]:''; };

function stepper(){ const S=['Choose your site','Tell us what’s happening','Review & send'];
  return '<ol class="rp-steps" aria-label="Progress">'+S.map((t,i)=>{ const n=i+1, st=n<step?'done':n===step?'on':''; return '<li class="'+st+'"'+(n===step?' aria-current="step"':'')+'><span class="rp-dot">'+(n<step?ICON.check:n)+'</span><span class="t">'+t+'</span></li>'; }).join('<li class="ln" aria-hidden="true"></li>')+'</ol>'; }

function formHTML(){ const a=ans;
  return '<form id="rpf" novalidate>'+
  '<div class="rp-q1"><h2>First, where are you staying?</h2><p class="rp-sub">Choose the site closest to where you live.</p>'+
   '<div class="rp-siterow"><label for="f_site">Your site</label><div class="rp-sel"><select id="f_site" required>'+siteOptions(a.site)+'</select></div><button type="button" class="rp-link" id="f_find">Not sure? Find my site</button></div>'+
   '<p class="rp-err" id="e_site" role="alert"></p></div>'+
  '<h2 class="rp-h2">How are things at your site?</h2>'+
  '<div class="rp-conds">'+CONDS.map(c=>'<fieldset class="rp-cond"><legend class="vh">'+c[1]+'</legend><span class="ic">'+ICON[c[0]]+'</span><div class="tx"><b>'+c[1]+'</b><span>'+c[2]+'</span></div>'+
     '<div class="seg">'+RATE.map(r=>'<label><input type="radio" name="f_'+c[0]+'" value="'+r[0]+'"'+(a[c[0]]===r[0]?' checked':'')+'><span>'+r[1]+'</span></label>').join('')+'</div></fieldset>').join('')+'</div>'+
  '<div class="rp-trio">'+
   '<div><span class="lb" id="l_flood">Has your home or site flooded since you arrived?</span><div class="seg two" role="radiogroup" aria-labelledby="l_flood">'+[['no','No'],['yes','Yes']].map(r=>'<label><input type="radio" name="f_flood" value="'+r[0]+'"'+(a.flood===r[0]?' checked':'')+'><span>'+r[1]+'</span></label>').join('')+'</div></div>'+
   '<div><label for="f_year" class="lb">When did you arrive?</label><div class="rp-sel"><select id="f_year"><option value="">Select year</option>'+Array.from({length:YEAR_NOW-1989},(_,i)=>YEAR_NOW-i).map(y=>'<option'+(String(a.year)===String(y)?' selected':'')+'>'+y+'</option>').join('')+'</select></div></div>'+
   '<div><label for="f_moves" class="lb">How many times has your household been moved?</label><div class="rp-num"><button type="button" data-d="-1" aria-label="One fewer">−</button><input id="f_moves" type="number" inputmode="numeric" min="0" max="20" placeholder="0" value="'+h(a.moves)+'"><button type="button" data-d="1" aria-label="One more">+</button></div></div>'+
  '</div>'+
  '<div class="rp-more"><label for="f_text"><b>Anything else you want us to know?</b> (optional)<span>Please don’t include other people’s names.</span></label><textarea id="f_text" maxlength="1000" rows="2" placeholder="Share anything else about conditions, challenges or needs at your site…">'+h(a.text)+'</textarea></div>'+
  '<div class="rp-follow"><div class="l"><h3>Would you like a researcher to follow up?</h3><p>You can share your name and phone number if you’re happy for a researcher to contact you about this report.</p></div>'+
   '<div class="r"><div class="two"><label><span><b>Your name</b> (optional)</span><input id="f_name" type="text" maxlength="80" autocomplete="name" placeholder="e.g. Wandile" value="'+h(a.name)+'"></label>'+
   '<label><span><b>Phone or WhatsApp</b> (optional)</span><input id="f_phone" type="tel" maxlength="20" autocomplete="tel" placeholder="e.g. 082 123 4567" value="'+h(a.phone)+'"></label></div>'+
   '<label class="chk"><input type="checkbox" id="f_ok"'+(a.ok?' checked':'')+'><span>I agree that this report may be used in this research project.</span></label>'+
   '<label class="chk"><input type="checkbox" id="f_contact"'+(a.contact?' checked':'')+'><span>A researcher may contact me about this report.</span></label>'+
   '<p class="rp-err" id="e_ok" role="alert"></p>'+
   '<p class="note">Your name and contact details are never shown publicly or on the map.</p></div></div>'+
  '<input type="text" id="f_hp" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px">'+
  '<div class="rp-foot"><button type="submit" class="rp-go">Continue '+ICON.arrow+'</button><button type="button" class="rp-link" id="f_save">Save and finish later</button><span class="rp-time">'+ICON.clock+'About 3 minutes <i>•</i> You can review before sending</span></div>'+
  '<p class="rp-saved" id="f_msg" aria-live="polite"></p></form>'; }

function reviewHTML(){ const a=ans, row=(k,v)=>'<div><dt>'+k+'</dt><dd>'+(v===''||v==null?'<span class="na">Not answered</span>':h(v))+'</dd></div>';
  return '<div class="rp-review"><h2>Check your report</h2><p class="rp-sub">Make sure this is right, then send it. You can go back and change anything.</p><dl>'+
   row('Site',siteName(a.site))+CONDS.map(c=>row(c[1],label(c[0],a[c[0]]))).join('')+
   row('Flooded since you arrived',a.flood==='yes'?'Yes':a.flood==='no'?'No':'')+row('Year you arrived',a.year)+row('Times moved',a.moves)+row('Anything else',a.text)+
   row('Name',a.name)+row('Phone or WhatsApp',a.phone)+row('A researcher may contact you',a.contact?'Yes':'No')+'</dl>'+
   '<div class="rp-foot"><button type="button" class="rp-go" id="f_send">Send report '+ICON.arrow+'</button><button type="button" class="rp-link" id="f_back">Go back and edit</button></div><p class="rp-saved" id="f_msg" aria-live="polite"></p></div>'; }

function doneHTML(ref){ return '<div class="rp-done"><span class="big">'+ICON.check+'</span><h2>Thank you. Your report was sent.</h2><p>Your reference is <b>'+ref+'</b>. A researcher reviews every report before anything appears on the map'+(ans.contact&&ans.phone?', and may contact you on the number you gave':'')+'.</p><button type="button" class="rp-go" id="f_new">Send another report</button></div>'; }

function render(){
  root.innerHTML='<div class="rp-wrap">'+stepper()+'<div class="rp-grid"><aside class="rp-side"><h1>Tell us what life is like at your site.</h1><p>Your experience helps build a clearer picture of housing conditions and what needs attention.</p>'+
   '<div class="rp-priv"><span class="ic">'+ICON.lock+'</span><div><b>Your name is private.</b>You can report without sharing contact details.</div></div>'+ART+'</aside>'+
   '<div class="rp-card" id="rpcard">'+(step===3?reviewHTML():step===4?doneHTML(ans.ref):formHTML())+'</div></div></div>';
  wire();
}
function collect(){ const f=root.querySelector('#rpf'); if(!f) return; const v=id=>root.querySelector('#'+id).value, r=n=>{ const x=f.querySelector('input[name="'+n+'"]:checked'); return x?x.value:''; };
  ans.site=v('f_site'); CONDS.forEach(c=>ans[c[0]]=r('f_'+c[0])); ans.flood=r('f_flood'); ans.year=v('f_year'); ans.moves=v('f_moves');
  ans.text=v('f_text').slice(0,1000); ans.name=v('f_name').trim(); ans.phone=v('f_phone').trim(); ans.ok=root.querySelector('#f_ok').checked; ans.contact=root.querySelector('#f_contact').checked; ans.hp=v('f_hp'); }
function setStepFromSite(){ const s=root.querySelector('#f_site'); const ns=s&&s.value?2:1; if(step<3&&ns!==step){ step=ns; const o=root.querySelector('.rp-steps'); if(o) o.outerHTML=stepper(); } }
function go(n){ step=n; render(); root.scrollTop=0; const t=root.querySelector('#rpcard h2'); if(t){ t.tabIndex=-1; t.focus({preventScroll:true}); } }
function wire(){
  const f=root.querySelector('#rpf');
  if(f){
    root.querySelector('#f_site').addEventListener('change',()=>{ root.querySelector('#e_site').textContent=''; setStepFromSite(); });
    root.querySelector('#f_ok').addEventListener('change',()=>root.querySelector('#e_ok').textContent='');
    root.querySelectorAll('.rp-num button').forEach(b=>b.onclick=()=>{ const i=root.querySelector('#f_moves'); i.value=Math.max(0,Math.min(20,(+i.value||0)+ +b.dataset.d)); });
    root.querySelector('#f_find').onclick=findSite;
    root.querySelector('#f_save').onclick=()=>{ collect(); try{ localStorage.setItem(DRAFT,JSON.stringify(ans)); root.querySelector('#f_msg').textContent='Saved on this phone or computer. Come back to this page to finish.'; }catch(e){ root.querySelector('#f_msg').textContent='Could not save on this device.'; } };
    f.onsubmit=e=>{ e.preventDefault(); collect(); let bad=null;
      if(!ans.site){ root.querySelector('#e_site').textContent='Please choose your site so we know where this report is about.'; bad=root.querySelector('#f_site'); }
      if(!ans.ok){ root.querySelector('#e_ok').textContent='Please tick that you agree, so we can use your report.'; bad=bad||root.querySelector('#f_ok'); }
      if(bad){ bad.focus(); bad.scrollIntoView({block:'center',behavior:'smooth'}); return; }
      go(3); };
    setStepFromSite();
  }
  const back=root.querySelector('#f_back'); if(back) back.onclick=()=>go(2);
  const send=root.querySelector('#f_send'); if(send) send.onclick=submit;
  const nw=root.querySelector('#f_new'); if(nw) nw.onclick=()=>{ ans={}; go(1); };
}
function findSite(){ const msg=root.querySelector('#e_site'); if(!navigator.geolocation){ msg.textContent='Your device can’t share its location. Please choose from the list.'; return; }
  msg.textContent='Finding the site nearest to you…';
  navigator.geolocation.getCurrentPosition(p=>{ const la=p.coords.latitude, lo=p.coords.longitude; let best=null,bd=1e9;
    const all=SITES.map(s=>({v:s.id,lat:s.lat,lon:s.lon})).concat(typeof OTHER_TRA!=='undefined'?OTHER_TRA.map(o=>({v:'tra'+o.id,lat:o.lat,lon:o.lon})):[]);
    all.forEach(s=>{ const d=Math.hypot((s.lat-la)*111,(s.lon-lo)*111*Math.cos(la*Math.PI/180)); if(d<bd){bd=d;best=s;} });
    if(best&&bd<5){ root.querySelector('#f_site').value=best.v; msg.textContent='We picked the closest site, about '+(bd<1?'under 1':Math.round(bd))+' km away. Change it if that’s wrong.'; setStepFromSite(); }
    else msg.textContent='We couldn’t find a site near you. Please choose from the list, or pick “My site isn’t listed”.'; },
   ()=>{ msg.textContent='Location wasn’t shared. Please choose your site from the list.'; },{timeout:10000,maximumAge:600000}); }
async function submit(){ const btn=root.querySelector('#f_send'), msg=root.querySelector('#f_msg'); btn.disabled=true; msg.textContent='Sending…';
  const ref='MW-'+Date.now().toString(36).slice(-5).toUpperCase(); const a=ans;
  const v={site_name:siteName(a.site),water:label('',a.water),san:label('',a.san),power:label('',a.power),safe:label('',a.safe),crowd:label('',a.crowd),
    flood:a.flood==='yes'?'Yes':a.flood==='no'?'No':'',year:a.year,moves:a.moves,text:(a.text?a.text+'\n':'')+'[ref '+ref+']',consent:'yes',name:a.name,phone:a.phone,contact:a.contact?'yes':'no'};
  const G=window.MITW&&MITW.gform;
  try{
    if(a.hp){ /* bot */ }
    else if(G&&G.url){ const body=new URLSearchParams(); for(const k in v) if(G.ids[k]&&v[k]!=='') body.append('entry.'+G.ids[k],v[k]); await fetch(G.url,{method:'POST',mode:'no-cors',body}); }
    else { const k='mitw-reports', arr=JSON.parse(localStorage.getItem(k)||'[]'); arr.push(Object.assign({t:Date.now()},v)); localStorage.setItem(k,JSON.stringify(arr)); }
    try{ localStorage.removeItem(DRAFT); }catch(e){}
    ans.ref=ref; go(4);
  }catch(e){ btn.disabled=false; msg.textContent='Could not send just now. Check your connection and try again. Your answers are still here.'; }
}
function open(){ if(step===4){ ans={}; step=1; } if(!ans.site){ try{ const d=JSON.parse(localStorage.getItem(DRAFT)||'null'); if(d){ ans=d; } }catch(e){} }
  step=ans.site?2:1; render(); root.hidden=false; root.scrollTop=0;
  if(ans.site||ans.water){ const m=root.querySelector('#f_msg'); if(m) m.textContent='We brought back the answers you saved earlier.'; }
  document.querySelectorAll('nav button').forEach(b=>b.setAttribute('aria-current',b.dataset.v==='report'?'page':'false')); }
function close(){ if(!root.hidden&&step<3) collect(); root.hidden=true; }
document.querySelectorAll('nav button').forEach(b=>b.addEventListener('click',()=>{ if(b.dataset.v==='report') setTimeout(open,0); else close(); }));
window.openReport=open;
if(location.hash==='#report') setTimeout(open,0);
})();
