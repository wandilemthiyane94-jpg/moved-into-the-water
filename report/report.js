/* Report page: intro plus the web form (reportHTML / sendReport in index.html). */
(function(){
if (typeof reportHTML !== 'function') return;
const root=document.createElement('section'); root.id='rp'; root.hidden=true; root.setAttribute('aria-label','Report'); document.body.appendChild(root);
function render(){
  root.innerHTML=
  '<div class="rp-top"><div class="bg"></div><div class="rp-l"><div class="rp-k">Report</div><h1>Report what’s happening at your site</h1>'+
  '<p class="lede">Live in or near a temporary relocation site? Tell us about the conditions. <b style="color:#fff">Your report helps us advocate for better housing conditions.</b></p>'+
  '<ul class="rp-feats"><li><i>🔒</i>Your name is never shown publicly</li><li><i>📱</i>Works on any phone or computer</li><li><i>🗺</i>Checked reports show on the map</li></ul></div></div>'+
  '<div class="rp-help"><h2>Your report helps us advocate for better housing conditions<span>Every checked report becomes evidence.</span></h2>'+
    [['👁','Show real conditions'],['⚠','Highlight urgent needs'],['🏛','Inform government and partners'],['⚖','Hold decision-makers accountable'],['🏠','Push for safer housing']].map(h=>'<div><i aria-hidden="true">'+h[0]+'</i>'+h[1]+'</div>').join('')+'</div>'+
  '<div class="rp-form"><div class="side"><div class="rp-k">Report here</div><h2>Tell us about your site</h2><p>Takes a few minutes. Leave your name and number if you’re happy for a researcher to follow up. They stay private and are never shown.</p></div><div class="box" id="rpbox"></div></div>';
  document.getElementById('rpbox').innerHTML=reportHTML();
  const f=document.getElementById('rep'); if(f && typeof sendReport==='function') f.onsubmit=sendReport;
}
function open(){ render(); root.hidden=false; root.scrollTop=0; document.querySelectorAll('nav button').forEach(b=>b.setAttribute('aria-current',b.dataset.v==='report'?'page':'false')); }
function close(){ root.hidden=true; }
document.querySelectorAll('nav button').forEach(b=>b.addEventListener('click',()=>{ if(b.dataset.v==='report') setTimeout(open,0); else close(); }));
window.openReport=open;
if(location.hash==='#report') setTimeout(open,0);
})();
