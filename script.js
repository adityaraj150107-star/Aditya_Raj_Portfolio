const words = ['web experiences', 'AI applications', 'useful solutions', 'machine learning projects'];
const typed = document.getElementById('typed');
let wordIndex = 0, charIndex = words[0].length, deleting = true;
function typeLoop(){ if(!typed) return; const word=words[wordIndex]; if(deleting){charIndex--;typed.textContent=word.slice(0,charIndex);if(charIndex<=0){deleting=false;wordIndex=(wordIndex+1)%words.length;setTimeout(typeLoop,350);return;}}else{const next=words[wordIndex];charIndex++;typed.textContent=next.slice(0,charIndex);if(charIndex>=next.length){deleting=true;setTimeout(typeLoop,1500);return;}}setTimeout(typeLoop,deleting?45:75); }
setTimeout(typeLoop,1800);
const menuToggle=document.getElementById('menuToggle'), nav=document.getElementById('nav');
const themeToggle=document.getElementById('themeToggle'), themeIcon=document.getElementById('themeIcon');
themeToggle?.addEventListener('click',()=>{const light=document.body.classList.toggle('light-mode');if(themeIcon)themeIcon.textContent=light?'☀':'☾';themeToggle.setAttribute('aria-label',light?'Switch to dark mode':'Switch to light mode');});
menuToggle?.addEventListener('click',()=>nav.classList.toggle('open'));
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
const sections=[...document.querySelectorAll('main section[id]')];
const navObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){document.querySelectorAll('.nav-link').forEach(link=>link.classList.toggle('active',link.getAttribute('href')==='#'+entry.target.id));}}),{rootMargin:'-35% 0px -55% 0px'});
sections.forEach(section=>navObserver.observe(section));
const backTop=document.getElementById('backTop');window.addEventListener('scroll',()=>backTop.classList.toggle('show',window.scrollY>450));backTop?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
document.getElementById('year').textContent=new Date().getFullYear();
document.getElementById('copyProfile')?.addEventListener('click',async()=>{const message=document.getElementById('copyMessage');try{await navigator.clipboard.writeText('https://github.com/adityaraj150107-star');message.textContent='GitHub profile link copied!';}catch{message.textContent='GitHub: github.com/adityaraj150107-star';}});


// Contact form: prepare an email draft in the visitor's default mail app.
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const formData = new FormData(contactForm);
    const subject = encodeURIComponent(String(formData.get('subject') || 'Portfolio contact'));
    const body = encodeURIComponent(
      'Name: ' + formData.get('name') + '\\n' +
      'Email: ' + formData.get('email') + '\\n\\n' +
      String(formData.get('message') || '')
    );
    window.location.href = 'mailto:adityaraj150107@gmail.com?subject=' + subject + '&body=' + body;
  });
}


// Section navigation: show only the selected page-like section.
const homeSections = ['home', 'expertise', 'skills'];
function showPortfolioSection(sectionId) {
  document.body.dataset.activeSection = sectionId;
  document.querySelectorAll('#nav .nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + sectionId);
  });
  const target = document.getElementById(sectionId);
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
nav?.querySelectorAll('a.nav-link').forEach(link => {
  link.addEventListener('click', event => {
    const id = link.getAttribute('href')?.slice(1);
    if (!id) return;
    event.preventDefault();
    showPortfolioSection(id === 'expertise' || id === 'skills' ? 'home' : id);
    history.replaceState(null, '', '#' + (id === 'expertise' || id === 'skills' ? 'home' : id));
  });
});
document.querySelectorAll('a[href="#contact"]').forEach(link => link.addEventListener('click', event => {
  if (link.closest('#nav')) return;
  event.preventDefault();
  showPortfolioSection('contact');
  history.replaceState(null, '', '#contact');
}));
const initialSection = location.hash.slice(1);
document.body.dataset.activeSection = ['resume','projects','contact'].includes(initialSection) ? initialSection : 'home';
