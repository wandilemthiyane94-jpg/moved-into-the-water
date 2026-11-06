/* Opening map animation: plays once on landing, in the map area only, lined up with the real map.
   Survey sketch → sites drop in (all labelled) → the city's flood line grows in from the sea, the six sites
   within 250 m pulse → satellite fades in → hands over to the normal interactive map.
   Nothing else on the page changes. Turn off with window.MAPANIM_ON = false (index.html). Layers: assets/mapanim/. */
(function(){
if (window.MAPANIM_ON === false || typeof view === 'undefined' || typeof scr !== 'function') return;
if (matchMedia('(prefers-reduced-motion: reduce)').matches || location.hash === '#return' || location.hash === '#simulation') return;
const B = 'assets/mapanim/', DUR = 18000;
const NEAR = {lamontville:'2 m',kwadimba:'37 m',gwala:'56 m',lindelani:'59 m',crystal:'60 m',frazer:'160 m'};
const load = s => new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = s; });
const host = document.getElementById('map');
const cv = document.createElement('canvas'); cv.id = 'mapanim';
cv.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;transition:opacity 1.2s ease';
const css = document.createElement('style'); css.textContent = 'body.manim #ov .site,body.manim #ov .place{opacity:0!important}';
document.head.appendChild(css);
let M, sketch, sat, water, G, WD, off, octx, img, t0 = 0, raf = 0, lastG = -1, lastSa = -1;
function waitForIntro(){ return new Promise(r => { const tick = () => document.getElementById('intro') ? setTimeout(tick, 150) : r(); tick(); }); }
(async () => {
  try {
    const meta = await fetch(B + 'meta.json').then(r => r.json());
    let dimg; [sketch, sat, water, dimg] = await Promise.all([load(B + 'sketch.jpg'), load(B + 'sat.jpg'), load(B + 'water.png'), load(B + 'dist.png')]);
    M = meta; const w = M.w, h = M.h;
    const t = document.createElement('canvas'); t.width = w; t.height = h; const tc = t.getContext('2d');
    tc.drawImage(dimg, 0, 0); const dd = tc.getImageData(0, 0, w, h).data; G = new Float32Array(w * h);
    for (let i = 0; i < w * h; i++) G[i] = (dd[i * 4] * 256 + dd[i * 4 + 1]) / 65535;
    tc.clearRect(0, 0, w, h); tc.drawImage(water, 0, 0); WD = tc.getImageData(0, 0, w, h);
    off = document.createElement('canvas'); off.width = w; off.height = h; octx = off.getContext('2d'); img = octx.createImageData(w, h);
    // georeference: the baked layers cover this Mercator box
    const S0 = 256 * Math.pow(2, M.z); M.box = [M.cx - w / 2 / S0, M.cy - h / 2 / S0, M.cx + w / 2 / S0, M.cy + h / 2 / S0];
    // each pin's growth value, matched to the live sites by id
    M.byId = {}; M.pins.forEach(p => M.byId[p.id] = p);
  } catch (e) { return; }          // layers missing: leave the normal map alone
  await waitForIntro();
  const cvMap = document.getElementById('cv'); host.insertBefore(cv, cvMap.nextSibling);
  document.body.classList.add('manim'); t0 = performance.now(); raf = requestAnimationFrame(frame);
})();
function sizeCanvas(){ const d = Math.min(2, devicePixelRatio || 1), w = Math.round(innerWidth * d), h = Math.round(innerHeight * d); if (cv.width !== w || cv.height !== h){ cv.width = w; cv.height = h; } return d; }
function drawGeo(x, im){ const a = scr(M.box[0], M.box[1]), b = scr(M.box[2], M.box[3]); x.drawImage(im, a[0], a[1], b[0] - a[0], b[1] - a[1]); }
function frame(now){
  const p = window.MAPANIM_P != null ? window.MAPANIM_P : Math.min(1, (now - t0) / DUR), d = sizeCanvas(), x = cv.getContext('2d');
  x.setTransform(d, 0, 0, d, 0, 0); x.clearRect(0, 0, innerWidth, innerHeight);
  x.fillStyle = '#0b0b0b'; x.fillRect(0, 0, innerWidth, innerHeight);
  x.imageSmoothingEnabled = true; drawGeo(x, sketch);
  const sa = Math.max(0, Math.min(1, (p - .66) / .18));
  if (sa > 0){ x.globalAlpha = sa; drawGeo(x, sat); x.globalAlpha = 1; }
  // the flood line and rivers grow inland from the sea
  const q = Math.max(0, Math.min(1, (p - .22) / (.62 - .22))), g = Math.pow(q, 1.6) * 1.15;
  if (g !== lastG || sa !== lastSa){ lastG = g; lastSa = sa; const s = WD.data, o = img.data, band = .045, n = M.w * M.h;
    for (let i = 0, j = 0; i < n; i++, j += 4){ const a = s[j + 3]; if (!a){ o[j + 3] = 0; continue; } const k = (g - G[i]) / band;
      if (k <= 0){ o[j + 3] = 0; continue; } const front = k < 1 ? 1 - k : 0, rev = Math.min(1, k);
      o[j] = Math.min(255, s[j] + front * 150); o[j + 1] = Math.min(255, s[j + 1] + front * 120); o[j + 2] = 255; o[j + 3] = Math.min(255, (a * rev + front * 120) * (1 - sa * .25)); }
    octx.putImageData(img, 0, 0); }
  x.save(); x.shadowColor = 'rgba(80,170,255,.75)'; x.shadowBlur = 10; drawGeo(x, off); x.restore();
  // sites drop in, each labelled; the six near the flood line pulse once the water reaches them
  const sp = Math.max(0, (p - .08) / .12), live = SITES.map((st, i) => ({st, i, P: scr(st.X, st.Y), m: M.byId[st.id]}));
  const boxes = live.map(o => ({x: o.P[0] - 9, y: o.P[1] - 9, w: 18, h: 18})).concat([{x: 0, y: 0, w: innerWidth, h: 72}]);
  const hitBox = b => boxes.some(o => b.x < o.x + o.w + 4 && b.x + b.w + 4 > o.x && b.y < o.y + o.h + 4 && b.y + b.h + 4 > o.y);
  live.forEach(({st, i, P, m}) => { const local = Math.max(0, Math.min(1, sp * 1.7 - i * .06)); if (local <= 0) return;
    const e = 1 - Math.pow(1 - local, 3), drop = (1 - e) * -140, ring = local < 1 ? local : 0, hit = NEAR[st.id] && m && g >= m.g;
    x.fillStyle = 'rgba(0,0,0,' + (.45 * e) + ')'; x.beginPath(); x.ellipse(P[0], P[1] + 3, 7 * e, 2.4 * e, 0, 0, 7); x.fill();
    if (ring){ x.strokeStyle = 'rgba(251,201,0,' + (1 - ring) + ')'; x.lineWidth = 2; x.beginPath(); x.arc(P[0], P[1], 6 + ring * 20, 0, 7); x.stroke(); }
    if (hit){ const age = (now / 1000) % 1.6 / 1.6; for (const ph of [0, .5]){ const k2 = (age + ph) % 1; x.strokeStyle = 'rgba(255,107,94,' + (.85 * (1 - k2)) + ')'; x.lineWidth = 2.5; x.beginPath(); x.arc(P[0], P[1], 8 + k2 * 42, 0, 7); x.stroke(); } }
    x.beginPath(); x.arc(P[0], P[1] + drop, 6.5, 0, 7); x.fillStyle = hit ? '#ff6b5e' : '#FBC900'; x.shadowColor = hit ? 'rgba(255,107,94,.9)' : 'rgba(251,201,0,.9)'; x.shadowBlur = 14; x.fill(); x.shadowBlur = 0; x.lineWidth = 2; x.strokeStyle = '#0b0e14'; x.stroke();
    if (local < 1) return;
    x.font = '600 11.5px Inter, Arial'; const t1 = hit ? NEAR[st.id] + ' from the flood line' : '';
    const w = Math.max(x.measureText(st.name).width, t1 ? x.measureText(t1).width : 0) + 14, h = hit ? 34 : 20;
    const C = [[14, -h / 2], [14, -h - 8], [14, 8], [-w - 14, -h / 2], [-w - 14, -h - 8], [-w - 14, 8]];
    let pick = null; for (let r = 0; r < 8 && !pick; r++) for (const c of C){ const dx = c[0] + (c[0] > 0 ? r * 24 : -r * 24), dy = c[1] + (c[1] < 0 ? -r * 20 : r * 20), b = {x: P[0] + dx, y: P[1] + dy, w, h};
      if (!hitBox(b)){ pick = Object.assign(b, {lead: r > 0, ax: dx > 0 ? b.x : b.x + w}); break; } }
    if (!pick) pick = {x: P[0] + 14, y: P[1] - h / 2, w, h, lead: false}; boxes.push(pick);
    if (pick.lead){ x.strokeStyle = 'rgba(255,255,255,.45)'; x.lineWidth = 1; x.beginPath(); x.moveTo(P[0], P[1]); x.lineTo(pick.ax, pick.y + h / 2); x.stroke(); }
    x.fillStyle = 'rgba(6,10,17,.84)'; x.strokeStyle = hit ? 'rgba(255,107,94,.7)' : 'rgba(255,255,255,.22)'; x.lineWidth = 1; x.beginPath(); x.roundRect(pick.x, pick.y, w, h, 5); x.fill(); x.stroke();
    x.fillStyle = '#fff'; x.fillText(st.name, pick.x + 7, pick.y + 14); if (t1){ x.font = '500 10.5px Inter, Arial'; x.fillStyle = '#ff9b90'; x.fillText(t1, pick.x + 7, pick.y + 28); } });
  if (p < 1){ raf = requestAnimationFrame(frame); return; }
  // hand over to the normal map: fade out, then remove
  cv.style.opacity = '0'; document.body.classList.remove('manim'); if (typeof draw === 'function') draw();
  setTimeout(() => cv.remove(), 1300);
}
})();
