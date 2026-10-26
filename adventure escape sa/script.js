/* Adventure Escape SA - shared JavaScript for every page */
const ITEMS = [
  {id:'corporate',type:'package',name:'Corporate Team Challenge',price:1500,emoji:'🛶',
   desc:'A fun, guided team-building day with raft building and group challenges for corporate groups.',
   included:['Raft building challenge','Team games','Guide and safety gear','Refreshments'],
   meeting:'Main reception at 30 Angelica Ave, Breaunanda, Krugersdorp, 07:30.',
   cancel:'Free cancellation up to 48 hours before. After that, 50% is charged.'},
  {id:'mountain',type:'package',name:'Mountain Adventure',price:1500,emoji:'🏔️',
   desc:'A guided mountain adventure for outdoor enthusiasts.',
   included:['Mountain hiking','Scenic viewpoints','Rock scrambling'],
   meeting:'Main reception at 30 Angelica Ave, Breaunanda, Krugersdorp, 07:00.',
   cancel:'Free cancellation up to 48 hours before. After that, 50% is charged.'},
  {id:'ultimate',type:'package',name:'Ultimate Adventure Day',price:1500,emoji:'🧗',
   desc:'A full day of mixed outdoor activities, from hiking to climbing with stunning views.',
   included:['Guided hike','Climbing session','Lunch pack','Safety gear'],
   meeting:'Main reception at 30 Angelica Ave, Breaunanda, Krugersdorp, 07:00.',
   cancel:'Free cancellation up to 48 hours before. After that, 50% is charged.'},
  {id:'family',type:'package',name:'Family Explorer',price:1500,emoji:'🚴',
   desc:'An easy-going outdoor day designed for families with kids of all ages.',
   included:['Family bike ride','Nature trail','Picnic stop','Kid-friendly guide'],
   meeting:'Family parking area at 30 Angelica Ave, Krugersdorp, 08:00.',
   cancel:'Free cancellation up to 48 hours before. After that, 50% is charged.'},
  {id:'zipline',type:'activity',name:'Ziplining Adventure',price:750,emoji:'🪂',
   desc:'Fly through the forest canopy on a series of ziplines with trained guides.',
   included:['Harness and helmet','Safety briefing','Guided zipline course'],
   meeting:'Zipline office at 30 Angelica Ave, Krugersdorp.',
   cancel:'Free cancellation up to 24 hours before.'},
  {id:'kayak',type:'activity',name:'Kayaking Experience',price:750,emoji:'🛶',
   desc:'Paddle calm waters with a guide and enjoy the scenery from the water.',
   included:['Kayak and paddle','Life jacket','Guide'],
   meeting:'Dam entrance at 30 Angelica Ave, Krugersdorp.',
   cancel:'Free cancellation up to 24 hours before.'},
  {id:'rock',type:'activity',name:'Rock Climbing Session',price:750,emoji:'🧗‍♀️',
   desc:'A beginner-friendly climbing session on natural rock with certified instructors.',
   included:['Climbing gear','Instructor','Safety briefing'],
   meeting:'Climbing base at 30 Angelica Ave, Krugersdorp.',
   cancel:'Free cancellation up to 24 hours before.'}
];
const rand = n => 'R' + Number(n).toLocaleString('en-ZA',{minimumFractionDigits:0,maximumFractionDigits:2});
const byId = id => ITEMS.find(i => i.id === id);
const $ = s => document.querySelector(s);

/* picture with placeholder fallback (put photos in /images/<id>.jpg) */
function pic(src, emoji, alt){
  return `<img src="${src}" alt="${alt||''}" onerror="this.outerHTML='<div class=&quot;ph&quot;>${emoji}</div>'">`;
}

/* every picture bounces when pressed */
document.addEventListener('click', e => {
  const t = e.target.closest('img, .ph, .logo');
  if(!t) return;
  t.classList.remove('bounce'); void t.offsetWidth; t.classList.add('bounce');
  t.addEventListener('animationend', () => t.classList.remove('bounce'), {once:true});
});

/* broken picture: show a green box with the picture name instead of a broken icon */
document.addEventListener('error', e => {
  const t = e.target;
  if(t && t.tagName === 'IMG' && !t.classList.contains('logo')){
    const d = document.createElement('div');
    d.className = 'ph'; d.title = 'Picture not found';
    d.style.fontSize = '13px'; d.style.padding = '4px';
    d.textContent = t.alt || 'Picture not found';
    t.replaceWith(d);
  }
}, true);

/* menu underline: always on the page you are on, whatever is written in the HTML */
(function(){
  const here = (location.pathname.split('/').pop() || 'home.html').toLowerCase();
  document.querySelectorAll('nav > ul > li > a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href').split('#')[0].toLowerCase() === here);
  });
})();

/* drop-down menu: the arrow button opens and closes it (for phones and keyboards) */
const closeMenus = () => document.querySelectorAll('.dropdown.open').forEach(d => {
  d.classList.remove('open'); d.querySelector('.dd-toggle').setAttribute('aria-expanded','false');
});
document.querySelectorAll('.dd-toggle').forEach(btn => btn.addEventListener('click', e => {
  e.stopPropagation();
  const li = btn.closest('.dropdown'), wasOpen = li.classList.contains('open');
  closeMenus();
  if(!wasOpen){ li.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
}));
document.addEventListener('click', closeMenus);
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeMenus(); });

/* ---------- OVERVIEW: filters ---------- */
if($('#pk-sec') && $('#ac-sec')){
  const sections = {all:['pk','ac'],packages:['pk'],individual:['ac']};
  document.querySelectorAll('.filters button').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.filters button').forEach(b => b.classList.toggle('on', b===btn));
    const show = sections[btn.dataset.filter];
    $('#pk-sec').classList.toggle('hidden', !show.includes('pk'));
    $('#ac-sec').classList.toggle('hidden', !show.includes('ac'));
  }));
  /* links from the drop-down menu: overview.html#packages or #individual */
  const applyHash = () => {
    const h = location.hash.replace('#','');
    const b = document.querySelector('.filters button[data-filter="' + (h === 'packages' || h === 'individual' ? h : 'all') + '"]');
    if(b) b.click();
  };
  applyHash();
  window.addEventListener('hashchange', applyHash);
}

/* ---------- FEES: add / remove / calculate ---------- */
const feeList = $('#fee-list');
if(feeList){
  let sel = [];
  try{ sel = JSON.parse(localStorage.getItem('aeQuote')||'[]').filter(byId); }catch(e){}
  const render = () => {
    try{ localStorage.setItem('aeQuote', JSON.stringify(sel)); }catch(e){}
    $('#sel-title').textContent = `Your Selection (${sel.length} ${sel.length===1?'Item':'Items'})`;
    $('#sel-items').innerHTML = sel.length ? sel.map((id,i) => {
      const p = byId(id);
      return `<div class="sel-item"><span>${p.name}<small>${rand(p.price)}</small></span><button data-rm="${i}" aria-label="Remove">X</button></div>`;
    }).join('') : '<div class="empty">Nothing selected yet. Press + Add.</div>';
    const sub = sel.reduce((s,id) => s + byId(id).price, 0);
    const pct = sel.length>3 ? 15 : sel.length===3 ? 10 : sel.length===2 ? 5 : 0;
    const total = sub - sub*pct/100;
    $('#subtotal').textContent = rand(sub);
    $('#discount').textContent = pct + ' %';
    $('#total').textContent = 'Total: ' + rand(total);
    return {sub,pct,total};
  };
  feeList.addEventListener('click', e => {
    const b = e.target.closest('[data-add]'); if(!b) return;
    sel.push(b.dataset.add); render();
    b.textContent = '✓ Added'; setTimeout(() => b.textContent = '+ Add', 700);
    $('#sel-items').lastElementChild.scrollIntoView({block:'nearest',behavior:'smooth'});
  });
  $('#sel-items').addEventListener('click', e => {
    const b = e.target.closest('[data-rm]'); if(!b) return;
    sel.splice(+b.dataset.rm,1); render();
  });
  $('#request-quote').addEventListener('click', () => {
    const r = render(), out = $('#quote-msg');
    if(!sel.length){ out.textContent = 'Please add at least one activity first.'; out.style.color = '#b00020'; return; }
    out.style.color = '#006400';
    out.innerHTML = `Quote requested for ${sel.length} item(s). Subtotal ${rand(r.sub)}, discount ${r.pct}%, total <b>${rand(r.total)}</b>. We will contact you soon.`;
  });
  render();
}

/* ---------- CONTACT ---------- */
const form = $('#contact-form');
if(form){
  const sel = $('#c-package');
  sel.innerHTML = '<option value=""> choose your package </option>' + ITEMS.map(p => `<option>${p.name}</option>`).join('');
  const fields = {name:$('#c-name'), email:$('#c-email'), phone:$('#c-phone'), pkg:sel, msg:$('#c-msg')};
  const notes = {};
  const clear = k => { notes[k].textContent = ''; fields[k].classList.remove('invalid'); fields[k].removeAttribute('aria-invalid'); };
  Object.keys(fields).forEach(k => {
    const d = document.createElement('div');
    d.className = 'err'; d.setAttribute('aria-live','polite');
    fields[k].insertAdjacentElement('afterend', d); notes[k] = d;
    fields[k].addEventListener('input', () => clear(k));
    fields[k].addEventListener('change', () => clear(k));
  });
  form.addEventListener('submit', e => {
    e.preventDefault();
    const ok = $('#thanks'); ok.style.display = 'none'; $('#c-err').textContent = '';
    Object.keys(fields).forEach(clear);
    const v = {name:fields.name.value.trim(), email:fields.email.value.trim(), phone:fields.phone.value.replace(/[\s()-]/g,''), pkg:sel.value, msg:fields.msg.value.trim()};
    let first = null;
    const fail = (k,t) => { notes[k].textContent = t; fields[k].classList.add('invalid'); fields[k].setAttribute('aria-invalid','true'); if(!first) first = k; };
    if(!v.name) fail('name','Please enter your name.');
    else if(v.name.length < 2 || !/[A-Za-z]/.test(v.name)) fail('name','Please enter a valid name.');
    if(!v.email) fail('email','Please enter your email address.');
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) fail('email','Please enter a valid email address, for example name@example.com.');
    if(v.phone && !/^(\+27|0)\d{9}$/.test(v.phone)) fail('phone','Enter a valid South African number, for example 0821234567 or +27821234567.');
    if(!v.pkg) fail('pkg','Please choose a package.');
    if(!v.msg) fail('msg','Please type a message.');
    else if(v.msg.length < 10) fail('msg','Your message is too short. Please write at least 10 characters.');
    if(first){ $('#c-err').textContent = 'Please fix the errors above and press send again.'; fields[first].focus(); return; }
    ok.textContent = `Thank you, ${v.name}! Your message was sent. We will reply to ${v.email} soon.`;
    ok.style.display = 'block'; form.reset();
  });
}

/* ---------- INDIVIDUAL (detail) page ---------- */
const detail = $('#detail');
if(detail){
  const idParam = new URLSearchParams(location.search).get('id');
  const p = byId(idParam) || ITEMS[1];
  document.title = p.name + ' - Adventure Escape SA';
  $('#d-title').textContent = p.name + (p.type==='package' ? ' Package' : '');
  $('#d-price').textContent = rand(p.price) + ' Per Person';
  /* Mountain Adventure keeps the picture written in individual.html; other packages use images/<id>.jpg */
  const mainImg = $('#d-main img');
  if(mainImg){ if(p.id !== 'mountain') mainImg.src = 'images/'+p.id+'.jpg'; mainImg.alt = p.name; }
  const sections = [
    ['Description', `<p>${p.desc}</p>`, true],
    ["What's Included", '<ul>'+p.included.map(i=>`<li>${i}</li>`).join('')+'</ul>', true],
    ['Meeting Point', `<p>${p.meeting}</p>`, false],
    ['Cancellation Policy', `<p>${p.cancel}</p>`, false]
  ];
  $('#d-acc').innerHTML = sections.map(s => `<div class="acc ${s[2]?'open':''}">
    <div class="acc-head"><span>${s[0]}</span><button type="button">${s[2]?'↓':'↑'}</button></div>
    <div class="acc-body">${s[1]}</div></div>`).join('');
  /* arrow down = information shown, arrow up = closed */
  $('#d-acc').addEventListener('click', e => {
    const head = e.target.closest('.acc-head'); if(!head) return;
    const acc = head.parentElement, open = acc.classList.toggle('open');
    head.querySelector('button').textContent = open ? '↓' : '↑';
  });
  const date = $('#d-date'), msg = $('#d-msg');
  date.min = new Date().toISOString().split('T')[0];
  const say = (t,bad) => { msg.textContent = t; msg.style.color = bad ? '#b00020' : '#006400'; };
  if(idParam && !byId(idParam)) say('That package was not found. Showing Mountain Adventure instead.', true);
  /* check the date: it must be chosen and not in the past */
  const checkDate = () => {
    date.style.borderColor = '';
    let bad = '';
    if(!date.value) bad = 'Please choose a date first.';
    else {
      const d = new Date(date.value + 'T00:00'), today = new Date(); today.setHours(0,0,0,0);
      if(isNaN(d)) bad = 'Please enter a valid date.';
      else if(d < today) bad = 'The date cannot be in the past. Please choose a later date.';
    }
    if(bad) date.style.borderColor = '#b00020';
    return bad;
  };
  date.addEventListener('change', () => { date.style.borderColor = ''; });
  $('#d-book').addEventListener('click', () => {
    const bad = checkDate(); if(bad) return say(bad, true);
    say(`Booked ${p.name} for ${new Date(date.value+'T00:00').toDateString()} at ${rand(p.price)} per person.`);
  });
  $('#d-quote').addEventListener('click', () => {
    const bad = checkDate(); if(bad) return say(bad, true);
    let q = []; try{ q = JSON.parse(localStorage.getItem('aeQuote')||'[]'); }catch(e){}
    q.push(p.id);
    try{ localStorage.setItem('aeQuote', JSON.stringify(q)); }catch(e){ return say('Could not save your quote on this browser.', true); }
    say(`Added to your quote (${q.length} item(s)). See it on the Fees page.`);
  });
  $('#d-share').addEventListener('click', async () => {
    const data = {title:p.name, text:`Check out ${p.name} at Adventure Escape SA`, url:location.href};
    try{
      if(navigator.share){ await navigator.share(data); }
      else{ await navigator.clipboard.writeText(location.href); say('Link copied. Paste it to share.'); }
    }catch(e){ say('Sharing was cancelled.', true); }
  });
  $('#d-save').addEventListener('click', async () => {
    if(typeof html2canvas === 'undefined'){ say('Screenshot tool is loading or offline. Opening print instead.', true); return window.print(); }
    try{
      const canvas = await html2canvas(document.body, {useCORS:true});
      const a = document.createElement('a');
      a.download = p.id + '-screenshot.png'; a.href = canvas.toDataURL('image/png'); a.click();
      say('Screenshot saved.');
    }catch(err){ say('Could not take the screenshot. Opening print instead.', true); window.print(); }
  });
}