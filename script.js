const words = ['web experiences', 'AI applications', 'useful solutions', 'machine learning projects'];
const typed = document.getElementById('typed');
let wordIndex = 0, charIndex = words[0].length, deleting = true;
function typeLoop(){ if(!typed) return; const word=words[wordIndex]; if(deleting){charIndex--;typed.textContent=word.slice(0,charIndex);if(charIndex<=0){deleting=false;wordIndex=(wordIndex+1)%words.length;setTimeout(typeLoop,350);return;}}else{const next=words[wordIndex];charIndex++;typed.textContent=next.slice(0,charIndex);if(charIndex>=next.length){deleting=true;setTimeout(typeLoop,1500);return;}}setTimeout(typeLoop,deleting?45:75); }
setTimeout(typeLoop,1800);
const menuToggle=document.getElementById('menuToggle'), nav=document.getElementById('nav');
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


// Contact section polish: reveal status when a visitor returns from the form service.
const contactFormStatus = document.getElementById('contactFormStatus');
const contactParams = new URLSearchParams(window.location.search);
if (contactParams.get('message') === 'sent' && contactFormStatus) {
  contactFormStatus.textContent = 'Thanks! If the form service accepted your message, it has been submitted.';
  document.getElementById('contact')?.scrollIntoView({behavior:'smooth',block:'start'});
}
// Subtle focus feedback and browser-native validation are kept accessible.
document.querySelectorAll('.contact-form input:not([type="hidden"]), .contact-form textarea').forEach((field) => {
  field.addEventListener('invalid', () => field.closest('label')?.classList.add('field-invalid'));
  field.addEventListener('input', () => field.closest('label')?.classList.remove('field-invalid'));
});
