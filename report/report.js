/* Report page. The WhatsApp line is shown as a preview until the project has a WhatsApp Business number;
   the web form below it is live (reportHTML / sendReport in index.html). */
(function(){
if (typeof reportHTML !== 'function') return;
const root=document.createElement('section'); root.id='rp'; root.hidden=true; root.setAttribute('aria-label','Report'); document.body.appendChild(root);
/* Real WhatsApp QR once MITW.wa holds a number; until then a decorative placeholder. */
const M=window.MITW||{}, waNum=String(M.wa||'').replace(/\D/g,'');
const waURL=waNum?'https://wa.me/'+waNum+'?text='+encodeURIComponent('Hi, I want to report conditions at my site.'):'';
const realQR=()=>{ const q=qrcode(0,'H'); q.addData(waURL); q.make(); const n=q.getModuleCount(), s=100/n; let c='';
  for(let i=0;i<n;i++)for(let j=0;j<n;j++) if(q.isDark(i,j)) c+='<rect x="'+(j*s).toFixed(2)+'" y="'+(i*s).toFixed(2)+'" width="'+(s+.05).toFixed(2)+'" height="'+(s+.05).toFixed(2)+'"/>';
  return '<svg viewBox="0 0 100 100" fill="#0B0F19" role="img" aria-label="QR code that opens a WhatsApp chat with the project">'+c+'</svg>'; };
const waLabel=()=> waNum&&M.waLive ? '<a class="rp-soon" href="'+waURL+'" target="_blank" rel="noopener" style="color:inherit">On your phone? Tap to open WhatsApp</a>' : '<div class="rp-soon" style="width:auto;display:inline-block;justify-self:start;align-self:flex-start;margin:6px 0 2px">WhatsApp line opens soon</div>';
const qr=()=>{ if(waNum&&window.qrcode) return realQR(); let r=7,c='',n=25; const R=()=>(r=(r*16807)%2147483647)/2147483647; for(let i=0;i<n;i++)for(let j=0;j<n;j++){ if((i<7&&j<7)||(i<7&&j>n-8)||(i>n-8&&j<7)) continue; if(R()<.48) c+='<rect x="'+j*4+'" y="'+i*4+'" width="4.2" height="4.2"/>'; }
  const f=(x,y)=>'<rect x="'+x+'" y="'+y+'" width="28" height="28"/><rect x="'+(x+4)+'" y="'+(y+4)+'" width="20" height="20" fill="#fff"/><rect x="'+(x+8)+'" y="'+(y+8)+'" width="12" height="12"/>';
  return '<svg viewBox="0 0 100 100" fill="#0B0F19" aria-hidden="true">'+c+f(0,0)+f(72,0)+f(0,72)+'</svg>'; };
function render(){
  root.innerHTML=
  '<div class="rp-top"><div class="bg"></div><div class="rp-l"><div class="rp-k">Report</div><h1>Report what’s happening at your site</h1>'+
  '<p class="lede">Live in or near a temporary relocation site? Tell us about the conditions. <b style="color:#fff">Your report helps us advocate for better housing conditions.</b></p>'+
  '<div class="rp-cta">'+
  '<div class="rp-wa"><div class="rp-wat"><h2>Report on WhatsApp</h2>'+waLabel()+'<p>Send a message to the project line. A chat opens with a few short questions.</p>'+
  '<ul class="rp-feats"><li><i>💬</i>No app to download</li><li><i>🔒</i>Your name is never shown</li><li><i>📞</i>A researcher may call to check</li></ul></div></div></div></div>'+
'<div class="rp-steps">'+[['1','Start the conversation','Message the line and say hello. You agree to how your report is used.','02-chat-start'],['2','Choose a topic and share','Pick your site and what it’s about, then type, send a voice note or a photo.','03-chat-report'],['3','Get a reference','A researcher reviews it and may call. Then it shows on the map, without your name.','04-chat-done']]
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
