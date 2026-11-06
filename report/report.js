/* Report page. The WhatsApp line is shown as a preview until the project has a WhatsApp Business number;
   the web form below it is live (reportHTML / sendReport in index.html). */
(function(){
if (typeof reportHTML !== 'function') return;
const root=document.createElement('section'); root.id='rp'; root.hidden=true; root.setAttribute('aria-label','Report'); document.body.appendChild(root);
const qr=()=>{ let r=7,c='',n=25; const R=()=>(r=(r*16807)%2147483647)/2147483647; for(let i=0;i<n;i++)for(let j=0;j<n;j++){ if((i<7&&j<7)||(i<7&&j>n-8)||(i>n-8&&j<7)) continue; if(R()<.48) c+='<rect x="'+j*4+'" y="'+i*4+'" width="4.2" height="4.2"/>'; }
  const f=(x,y)=>'<rect x="'+x+'" y="'+y+'" width="28" height="28"/><rect x="'+(x+4)+'" y="'+(y+4)+'" width="20" height="20" fill="#fff"/><rect x="'+(x+8)+'" y="'+(y+8)+'" width="12" height="12"/>';
  return '<svg viewBox="0 0 100 100" fill="#0B0F19" aria-hidden="true">'+c+f(0,0)+f(72,0)+f(0,72)+'</svg>'; };
function render(){
  root.innerHTML=
  '<div class="rp-top"><div class="bg"></div><div class="rp-l"><div class="rp-k">Report</div><h1>Report what’s happening at your site</h1>'+
  '<p class="lede">Live in or near a temporary relocation site? Tell us about the conditions. <b style="color:#fff">Your report helps us advocate for better housing conditions.</b></p>'+
  '<div class="rp-cta">'+
  '<svg class="rp-arrow" viewBox="0 0 160 120" aria-hidden="true"><path class="rp-arrow-line" d="M8 10 C 70 0, 120 30, 112 92" fill="none" stroke="#FBC900" stroke-width="3.5" stroke-linecap="round"/><path d="M98 80 L112 100 L126 82" fill="none" stroke="#FBC900" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'+
  '<div class="rp-wa"><div class="rp-qrwrap"><div class="rp-qr">'+qr()+'<i class="rp-wab" aria-hidden="true"><svg viewBox="0 0 24 24"><path fill="#fff" d="M12 3a9 9 0 00-7.7 13.6L3 21l4.5-1.2A9 9 0 1012 3zm4.4 12.4c-.2.5-1 1-1.5 1-.4.1-.9.1-1.5-.1-.3-.1-.8-.3-1.4-.5-2.4-1-4-3.5-4.1-3.6-.1-.2-1-1.3-1-2.5s.6-1.8.9-2c.2-.2.4-.3.6-.3h.4c.1 0 .3 0 .5.4l.7 1.7c.1.1.1.3 0 .4l-.3.4-.3.3c-.1.1-.2.3-.1.5.2.3.6 1 1.3 1.6.9.8 1.6 1 1.9 1.1.2.1.4.1.5-.1l.7-.8c.2-.2.3-.2.5-.1l1.6.8c.2.1.4.2.4.3.1.1.1.6-.1 1.1z"/></svg></i></div><div class="rp-soon">WhatsApp line opens soon</div></div>'+
  '<div class="rp-wat"><h2>Scan to report on WhatsApp</h2><p>Point your phone camera at the code. A chat opens with a few short questions.</p>'+
  '<ul class="rp-feats"><li><i>💬</i>No app to download</li><li><i>🔒</i>Your name is never shown</li><li><i>📞</i>A researcher may call to check</li></ul></div></div></div></div>'+
'<div class="rp-steps">'+[['1','Start the conversation','Scan the code and say hello. You agree to how your report is used.','02-chat-start'],['2','Choose a topic and share','Pick your site and what it’s about, then type, send a voice note or a photo.','03-chat-report'],['3','Get a reference','A researcher reviews it and may call. Then it shows on the map, without your name.','04-chat-done']]
    .map((s,i)=>'<div class="rp-step"><h3><b>'+s[0]+'</b>'+s[1]+'</h3><p>'+s[2]+'</p><div class="rp-phone" role="img" aria-label="Example WhatsApp chat: '+s[1]+'">'+(window.RP_CHATS?'<div class="rpc" data-i="'+i+'"></div>':'<img src="report/'+s[3]+'.jpg" alt="">')+'</div></div>').join('')+'</div></div>'+
  '<div class="rp-help"><h2>Your report helps us advocate for better housing conditions<span>Every checked report becomes evidence.</span></h2>'+
    [['👁','Show real conditions'],['⚠','Highlight urgent needs'],['🏛','Inform government and partners'],['⚖','Hold decision-makers accountable'],['🏠','Push for safer housing']].map(h=>'<div><i aria-hidden="true">'+h[0]+'</i>'+h[1]+'</div>').join('')+'</div>'+
  '<div class="rp-form"><div class="side"><div class="rp-k">Or report here</div><h2>Use the web form</h2><p>Works now, on any phone or computer. Do not write your name or anyone else’s.</p><p style="font-size:12px;color:#64748B">Chat screens above are examples for illustration. The WhatsApp line needs a WhatsApp Business number and research-ethics approval before it goes live.</p></div><div class="box" id="rpbox"></div></div>';
  document.getElementById('rpbox').innerHTML=reportHTML();
  const f=document.getElementById('rep'); if(f && typeof sendReport==='function') f.onsubmit=sendReport;
}
/* live-text chats: drawn at 390 x 844 and scaled to the phone frame, so text stays sharp */
function fitChats(){ root.querySelectorAll('.rpc').forEach(el=>{ const w=el.parentElement.clientWidth; el.style.transform='scale('+(w/390)+')'; }); }
function fillChats(){ if(!window.RP_CHATS) return; if(!document.getElementById('rpcss')){ const st=document.createElement('style'); st.id='rpcss'; st.textContent=RP_CSS; document.head.appendChild(st); }
  root.querySelectorAll('.rpc').forEach(el=>{ el.innerHTML=RP_CHATS[+el.dataset.i]; }); fitChats(); }
window.addEventListener('resize',()=>{ if(!root.hidden) fitChats(); });
function open(){ render(); root.hidden=false; fillChats(); root.scrollTop=0; document.querySelectorAll('nav button').forEach(b=>b.setAttribute('aria-current',b.dataset.v==='report'?'page':'false')); }
function close(){ root.hidden=true; }
document.querySelectorAll('nav button').forEach(b=>b.addEventListener('click',()=>{ if(b.dataset.v==='report') setTimeout(open,0); else close(); }));
window.openReport=open;
if(location.hash==='#report') setTimeout(open,0);
})();
