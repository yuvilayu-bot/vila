const projects = [
  {folder:'📂 Creative Content', title:'Creative Content', subtitle:'What The Duck Music Company', image:'assets/pages/page3.jpg', text:'Worked on creative projects with What The Duck Music Company, Milk BKK, and Whoop, focusing on content planning, campaign ideas, social media storytelling, creative concept development, and on-site coverage.'},
  {folder:'📂 Event Management', title:'Event Management', subtitle:'Gift Festival 2023 — Faculty of Decorative Arts, Silpakorn University', image:'assets/pages/page6.jpg', text:'Head of the concert division, responsible for coordinating, booking, and managing on-site operations for over 25 performing artists, ensuring seamless performances and overall event success.'},
  {folder:'📂 Illustration & Merchandise', title:'Illustration, Art & Merchandise Design', subtitle:'Fan goods, keyrings, stickers, cup sleeves, collectibles', type:'merch', text:'Developed merchandise designs from hand-drawn illustrations and sketches, then refined them into final artwork that reflected artist identity and enhanced the fan experience.', images:[
    'assets/merch/namwon-banner.png',
    'assets/merch/whale-phonecase.png',
    'assets/merch/cat-characters.png',
    'assets/merch/mute-heart.png'
  ]},
  {folder:'📂 Visual Motion', title:'Visual Motion', subtitle:'YouTube motion gallery', type:'youtube', text:'Created frame-by-frame visual videos combining illustration and motion design. Each work translates the mood of music into moving visuals and strengthens storytelling.', videos:[
    {title:'อยากให้เธอเก็บไว้', artist:'Mac Punnapob', url:'https://youtu.be/T-7_hOWKbpY?si=GRPokLAKg01lVZgO', embed:'https://www.youtube.com/embed/T-7_hOWKbpY'},
    {title:'Happy Death Day', artist:'Bangpun', url:'https://www.youtube.com/watch?v=OJuzDBQllJI', embed:'https://www.youtube.com/embed/OJuzDBQllJI'},
    {title:'rorrorrorrorrorror', artist:'Varis cover by VILA', url:'https://www.youtube.com/watch?v=Ud6jJWlX6rE', embed:'https://www.youtube.com/embed/Ud6jJWlX6rE'}
  ]},
  {folder:'📂 Fashion Design', title:'Fashion & Textile Design', subtitle:'Menswear collection inspired by mythical monsters and Monsters, Inc.', type:'fashion', text:'A collection exploring the contrast between outward appearances and inner emotions through oversized silhouettes, playful childlike colors, and runway pieces that challenge conventional menswear standards.', images:[
    'assets/fashion/fashion-01.jpg',
    'assets/fashion/fashion-02.jpg',
    'assets/fashion/fashion-03.jpg',
    'assets/fashion/fashion-04.jpg',
    'assets/fashion/fashion-05.jpg',
    'assets/fashion/fashion-06.png',
    'assets/fashion/fashion-07.png',
    'assets/fashion/fashion-08.png',
    'assets/fashion/fashion-09.png',
    'assets/fashion/fashion-10.png',
    'assets/fashion/fashion-11.png'
  ]},
  {folder:'📂 Styling', title:'Styling & Photography', subtitle:'Nylon Japan inspired editorial project with Converse', image:'assets/pages/page12.jpg', text:'A styling and photography project merging fashion with lifestyle, representing a soft boy sensibility that is colorful, expressive, and subtle.'},
  {folder:'📂 Visual Storytelling', title:'Visual Storytelling — My Life in Korea', subtitle:'Korean storytelling, collage, illustration, graphic design', image:'assets/pages/page14.jpg', text:'Created as part of a Korean language course at Ewha Womans University, combining illustration, collage, and graphic design to depict study abroad experiences in Korea.'}
];
let currentProject = 0;
const folders = document.getElementById('projectFolders');
const title = document.getElementById('projectTitle');
const subtitle = document.getElementById('projectSubtitle');
const image = document.getElementById('projectImage');
const text = document.getElementById('projectText');
const detail = document.querySelector('.project-detail');
function renderProject(i){
  currentProject = (i + projects.length) % projects.length;
  const p = projects[currentProject];
  title.textContent = p.title;
  subtitle.textContent = p.subtitle;
  text.textContent = p.text;
  detail.querySelectorAll('.youtube-gallery,.merch-gallery,.fashion-gallery').forEach(el=>el.remove());
  image.style.display = 'block';
  image.classList.remove('hidden-project-image');
  if(p.type === 'youtube'){
    image.style.display = 'none';
    const gallery = document.createElement('div');
    gallery.className = 'youtube-gallery';
    p.videos.forEach(v=>{
      const videoId = (v.embed || '').split('/').pop();
      const card = document.createElement('a');
      card.className = 'youtube-card';
      card.href = v.url;
      card.target = '_blank';
      card.rel = 'noopener';
      card.innerHTML = `
        <div class="youtube-thumb" style="background-image:url('https://img.youtube.com/vi/${videoId}/hqdefault.jpg')">
          <span class="youtube-play">▶</span>
          <span class="youtube-time">YouTube</span>
        </div>
        <div class="youtube-meta"><div class="yt-avatar">V</div><div><b>${v.title}</b><small>${v.artist}</small></div></div>`;
      gallery.appendChild(card);
    });
    text.before(gallery);
  } else if(p.type === 'merch'){
    image.style.display = 'none';
    const gallery = document.createElement('div');
    gallery.className = 'merch-gallery desk-collage';
    p.images.forEach((src, idx)=>{
      const item = document.createElement('div');
      item.className = `merch-piece merch-${idx+1}`;
      item.innerHTML = `<img src="${src}" alt="Merchandise design ${idx+1}">`;
      item.addEventListener('dblclick', () => openLightbox(src));
      gallery.appendChild(item);
      setTimeout(()=>makeDraggable(item), 0);
    });
    text.before(gallery);
  } else if(p.type === 'fashion'){
    image.style.display = 'none';
    const gallery = document.createElement('div');
    gallery.className = 'fashion-gallery';
    p.images.forEach((src, idx)=>{
      const item = document.createElement('div');
      item.className = `fashion-piece fashion-${idx+1}`;
      item.innerHTML = `<img src="${src}" alt="Fashion and textile design ${idx+1}">`;
      item.addEventListener('dblclick', () => openLightbox(src));
      gallery.appendChild(item);
      setTimeout(()=>makeDraggable(item), 0);
    });
    text.before(gallery);
  } else {
    image.src = p.image;
  }
  [...folders.children].forEach((b,idx)=>b.classList.toggle('active',idx===currentProject));
}
projects.forEach((p,i)=>{const b=document.createElement('button'); b.textContent=p.folder; b.onclick=()=>renderProject(i); folders.appendChild(b);});
renderProject(0);
document.getElementById('prevProject').onclick=()=>renderProject(currentProject-1);
document.getElementById('nextProject').onclick=()=>renderProject(currentProject+1);

document.querySelectorAll('[data-window]').forEach(icon=>icon.addEventListener('dblclick',()=>openWindow(icon.dataset.window)));
document.querySelectorAll('[data-window]').forEach(icon=>icon.addEventListener('click',()=>openWindow(icon.dataset.window)));
function openWindow(id){const w=document.getElementById(id); w.classList.add('open'); bringFront(w);}
document.querySelectorAll('.window header button').forEach(btn=>btn.onclick=e=>e.target.closest('.window').classList.remove('open'));
let z=30; function bringFront(el){el.style.zIndex=++z;}

function makeDraggable(el, handle=el){
  let sx,sy,l,t,drag=false;
  handle.addEventListener('mousedown',e=>{drag=true;bringFront(el);sx=e.clientX;sy=e.clientY;l=el.offsetLeft;t=el.offsetTop;document.body.style.userSelect='none'});
  window.addEventListener('mousemove',e=>{if(!drag)return; el.style.left=l+e.clientX-sx+'px'; el.style.top=t+e.clientY-sy+'px';});
  window.addEventListener('mouseup',()=>{drag=false;document.body.style.userSelect='auto'});
  handle.addEventListener('touchstart',e=>{const touch=e.touches[0];drag=true;sx=touch.clientX;sy=touch.clientY;l=el.offsetLeft;t=el.offsetTop;},{passive:true});
  window.addEventListener('touchmove',e=>{if(!drag)return;const touch=e.touches[0];el.style.left=l+touch.clientX-sx+'px';el.style.top=t+touch.clientY-sy+'px';},{passive:true});
  window.addEventListener('touchend',()=>drag=false);
}
document.querySelectorAll('.window').forEach(w=>makeDraggable(w,w.querySelector('header')));
document.querySelectorAll('.drag').forEach(el=>makeDraggable(el));

document.addEventListener('mousemove',e=>{document.querySelector('.cursor').style.left=e.clientX+'px';document.querySelector('.cursor').style.top=e.clientY+'px';});
function updateClock(){document.getElementById('clock').textContent=new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});} updateClock(); setInterval(updateClock,1000);

function openLightbox(src){
  let box = document.querySelector('.lightbox');
  if(!box){
    box = document.createElement('div');
    box.className = 'lightbox';
    box.innerHTML = '<button class="lightbox-close">×</button><img alt="Preview">';
    document.body.appendChild(box);
    box.addEventListener('click', (e)=>{ if(e.target === box || e.target.classList.contains('lightbox-close')) box.classList.remove('open'); });
  }
  box.querySelector('img').src = src;
  box.classList.add('open');
}


const stickers=['˚.⋆꒰১ ໒꒱⋆.˚','.✦ ݁˖','⋆˚꩜｡','ꉂ(˵˃ ᗜ ˂˵)','⋆˙⟡','₍^. .^₎⟆','meow','(˶˃𐃷˂˶)'];
const stickerColors=['#80B0E8','#FFC0C0','#008471','#D1CAEA','#D6D35F','#000000','#ffffff','#ff8fcf','#8ee7c8','#f7f09b'];
document.getElementById('spawnSticker').onclick=()=>{
  const s=document.createElement('div');
  s.className='sticker drag spawned-sticker';
  s.textContent=stickers[Math.floor(Math.random()*stickers.length)];
  const bg=stickerColors[Math.floor(Math.random()*stickerColors.length)];
  const fg=bg==='#000000' ? '#ffffff' : '#000000';
  s.style.background=bg;
  s.style.color=fg;
  s.style.boxShadow=`0 0 38px ${bg}`;
  s.style.left=Math.random()*70+15+'%';
  s.style.top=Math.random()*60+20+'%';
  s.style.fontSize=(Math.random()*12+18)+'px';
  s.style.transform=`rotate(${Math.random()*32-16}deg)`;
  document.body.appendChild(s);
  makeDraggable(s);
};
document.getElementById('shuffleWindows').onclick=()=>document.querySelectorAll('.window.open').forEach(w=>{w.style.left=Math.random()*45+15+'%';w.style.top=Math.random()*35+12+'%';});

function makeDesktopFileDraggable(icon){
  let sx=0, sy=0, l=0, t=0, dragging=false, moved=false;
  icon.addEventListener('mousedown', e=>{
    dragging=true; moved=false; sx=e.clientX; sy=e.clientY; l=icon.offsetLeft; t=icon.offsetTop;
    icon.classList.add('dragging'); document.body.style.userSelect='none';
  });
  window.addEventListener('mousemove', e=>{
    if(!dragging) return;
    const dx=e.clientX-sx, dy=e.clientY-sy;
    if(Math.abs(dx)+Math.abs(dy)>4) moved=true;
    icon.style.left=l+dx+'px'; icon.style.top=t+dy+'px';
  });
  window.addEventListener('mouseup', e=>{
    if(!dragging) return;
    dragging=false; icon.classList.remove('dragging'); document.body.style.userSelect='auto';
  });
  icon.addEventListener('click', e=>{ if(moved){ e.stopImmediatePropagation(); e.preventDefault(); moved=false; }});
}
document.querySelectorAll('.desktop-file').forEach(makeDesktopFileDraggable);

// update: make “Hi! I'm Vila” draggable and explode on double-click
(function initHeroTitle(){
  const hero = document.getElementById('heroTitle');
  const desktop = document.getElementById('desktop');
  if(!hero || !desktop) return;

  const original = "Hi! I'm Vila";
  hero.innerHTML = [...original].map(ch => `<span class="letter">${ch === ' ' ? '&nbsp;' : ch}</span>`).join('');
  const letters = [...hero.querySelectorAll('.letter')];

  // Convert center-positioned title into pixel position so it can be dragged freely.
  requestAnimationFrame(() => {
    const d = desktop.getBoundingClientRect();
    const r = hero.getBoundingClientRect();
    hero.style.left = (r.left - d.left) + 'px';
    hero.style.top = (r.top - d.top) + 'px';
    hero.style.transform = 'none';
  });

  let sx = 0, sy = 0, startLeft = 0, startTop = 0, dragging = false;
  function pointerDown(e){
    dragging = true;
    hero.classList.add('dragging');
    const p = e.touches ? e.touches[0] : e;
    sx = p.clientX; sy = p.clientY;
    startLeft = hero.offsetLeft; startTop = hero.offsetTop;
    document.body.style.userSelect = 'none';
  }
  function pointerMove(e){
    if(!dragging) return;
    const p = e.touches ? e.touches[0] : e;
    hero.style.left = (startLeft + p.clientX - sx) + 'px';
    hero.style.top = (startTop + p.clientY - sy) + 'px';
  }
  function pointerUp(){
    dragging = false;
    hero.classList.remove('dragging');
    document.body.style.userSelect = 'auto';
  }

  hero.addEventListener('mousedown', pointerDown);
  window.addEventListener('mousemove', pointerMove);
  window.addEventListener('mouseup', pointerUp);
  hero.addEventListener('touchstart', pointerDown, {passive:true});
  window.addEventListener('touchmove', pointerMove, {passive:true});
  window.addEventListener('touchend', pointerUp);

  function makeSparkles(){
    const r = hero.getBoundingClientRect();
    const symbols = ['✦','⋆','˚','⟡','꩜','₍^. .^₎⟆'];
    for(let i=0;i<16;i++){
      const sp = document.createElement('span');
      sp.className = 'hero-sparkle';
      sp.textContent = symbols[Math.floor(Math.random()*symbols.length)];
      sp.style.left = (r.left + r.width/2 + (Math.random()*160-80)) + 'px';
      sp.style.top = (r.top + r.height/2 + (Math.random()*90-45)) + 'px';
      sp.style.color = stickerColors[Math.floor(Math.random()*stickerColors.length)] || '#80B0E8';
      sp.style.setProperty('--sx', (Math.random()*520-260)+'px');
      sp.style.setProperty('--sy', (Math.random()*360-180)+'px');
      document.body.appendChild(sp);
      setTimeout(()=>sp.remove(), 1100);
    }
  }

  hero.addEventListener('dblclick', (e) => {
    e.preventDefault();
    const exploded = hero.classList.toggle('exploded');
    if(exploded){
      letters.forEach((letter, i) => {
        const x = (Math.random() * 900 - 450);
        const y = (Math.random() * 560 - 280);
        const r = (Math.random() * 1440 - 720);
        const scale = 0.85 + Math.random() * 0.75;
        letter.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg) scale(${scale})`;
        letter.style.transitionDelay = (i * 0.018) + 's';
      });
      makeSparkles();
    }else{
      letters.forEach((letter, i) => {
        letter.style.transform = 'translate(0,0) rotate(0deg) scale(1)';
        letter.style.transitionDelay = (i * 0.012) + 's';
      });
    }
  });
})();
