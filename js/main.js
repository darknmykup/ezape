/* ===== Dados. Para usar fotos, preencha 'img' (ex.: '../assets/img/ist.jpg'). O gradiente fica de reserva. ===== */
const TEMAS = [
 {nome:'IST sem tabu',tag:'Prevenção',cor:'#B9F6CA',titulo:'Falar de IST protege',
  texto:'Camisinha, testagem e tratamento gratuitos no SUS. Conversar sem vergonha é o primeiro passo do cuidado.',
  img:'',grad:'linear-gradient(135deg,#0d4a33,#4C9F38 60%,#B9F6CA)'},
 {nome:'Verdades e fake news',tag:'Informação',cor:'#FFD84D',titulo:'Nem tudo que viraliza é verdade',
  texto:'Aprenda a checar fontes e a separar mito de fato antes de compartilhar.',
  img:'',grad:'linear-gradient(135deg,#07281E,#7FB800 55%,#FFD84D)'},
 {nome:'Maternidade precoce',tag:'Escolhas e apoio',cor:'#FF9F8F',titulo:'Planejar é ter escolha',
  texto:'Educação sexual, métodos contraceptivos e rede de apoio para decidir o futuro com autonomia.',
  img:'',grad:'linear-gradient(135deg,#0D4A33,#2E9C6A 50%,#FF9F8F)'},
 {nome:'Saúde mental',tag:'Cuidar da mente',cor:'#8EE3EF',titulo:'Sua mente também precisa de cuidado',
  texto:'Ansiedade, tristeza e cansaço são reais. Pedir ajuda é coragem. Em crise, ligue 188 (CVV).',
  img:'',grad:'linear-gradient(135deg,#07281E,#0E7C86 55%,#8EE3EF)'},
 {nome:'Cobranças acadêmicas',tag:'Pressão e equilíbrio',cor:'#FFD84D',titulo:'Nota não define quem você é',
  texto:'Provas, vestibular e comparação cansam. Descanso e limites fazem parte do desempenho.',
  img:'',grad:'linear-gradient(135deg,#0D4A33,#4C9F38 40%,#F2C94C)'},
 {nome:'Vacinação',tag:'Cuidado coletivo',cor:'#B9F6CA',titulo:'Vacina é proteção que se espalha',
  texto:'Confira sua caderneta e mantenha as doses em dia. As vacinas do calendário são gratuitas no SUS.',
  img:'',grad:'linear-gradient(135deg,#07281E,#4C9F38 55%,#CFFFE0)'}
];
const CARTAS = [
 {p:'Só pega IST quem tem muitos parceiros.',mito:true,r:'Basta uma relação sem proteção. Camisinha e testagem valem para todo mundo.'},
 {p:'Dá para pegar HIV com abraço ou dividindo copo.',mito:true,r:'O HIV não se transmite por contato social, saliva ou objetos do dia a dia.'},
 {p:'A camisinha previne IST e também gravidez.',mito:false,r:'Usada corretamente em toda relação, ela protege nas duas frentes.'},
 {p:'A pílula do dia seguinte protege contra IST.',mito:true,r:'Ela é contracepção de emergência e não previne IST.'},
 {p:'Com tratamento e carga viral indetectável, o HIV não é transmitido pela via sexual.',mito:false,r:'É o princípio I=I (indetectável = intransmissível). O tratamento é gratuito no SUS.'},
 {p:'Vacina contra HPV é só para meninas.',mito:true,r:'O SUS vacina meninos e meninas na faixa etária indicada. Confirme na sua UBS.'}
];

const $=(s,e=document)=>e.querySelector(s), root=document.documentElement;
const bgs=[$('.b1'),$('.b2')], menu=$('#menu'), curtain=$('.curtain');
let cur=0, layer=0, timer; const DUR=8000;
curtain.querySelectorAll('i').forEach((el,i)=>el.style.setProperty('--i',i));

function paintBg(t){
  layer^=1; const el=bgs[layer];
  el.style.backgroundImage=t.img?`url(${t.img}), ${t.grad}`:t.grad;
  el.classList.add('on'); bgs[layer^1].classList.remove('on');
}
const words=s=>s.split(' ').map((w,i)=>`<span class="w"><span style="animation-delay:${i*90}ms">${w}</span></span>`).join(' ');
function fill(t){
  root.style.setProperty('--accent',t.cor);
  $('#h-tag').textContent=t.tag; $('#h-title').innerHTML=words(t.titulo);
  const l=$('#h-text'); l.textContent=t.texto; l.style.animation='none'; void l.offsetWidth; l.style.animation='';
  [...menu.children].forEach((li,i)=>li.classList.toggle('on',i===cur));
}
function wipe(fn){
  curtain.classList.remove('go'); void curtain.offsetWidth; curtain.classList.add('go');
  setTimeout(fn,430);
}
function go(i,withWipe=true){
  cur=(i+TEMAS.length)%TEMAS.length; const t=TEMAS[cur];
  withWipe?wipe(()=>{paintBg(t);fill(t)}):(paintBg(t),fill(t));
  progress();
}
function progress(){
  clearInterval(timer); const bar=$('#bar'), s=performance.now();
  timer=setInterval(()=>{
    const p=(performance.now()-s)/DUR; bar.style.width=Math.min(p*100,100)+'%';
    if(p>=1) go(cur+1,false);
  },50);
}

TEMAS.forEach((t,i)=>{
  const li=document.createElement('li'); li.textContent=t.nome; li.style.setProperty('--c',t.cor); li.tabIndex=0;
  li.onclick=()=>go(i); li.onkeydown=e=>e.key==='Enter'&&go(i);
  li.onmouseenter=()=>{ if(i!==cur){paintBg(t);root.style.setProperty('--accent',t.cor)} };
  li.onmouseleave=()=>{ paintBg(TEMAS[cur]);root.style.setProperty('--accent',TEMAS[cur].cor) };
  menu.appendChild(li);
});
$('.next').onclick=()=>go(cur+1); $('.prev').onclick=()=>go(cur-1);
document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')go(cur+1);if(e.key==='ArrowLeft')go(cur-1)});

/* fundo da seção ODS (troque por foto depois) */
$('.b3').style.backgroundImage='linear-gradient(135deg,#0D4A33,#4C9F38 60%,#B9F6CA)';

const cards=$('#cards');
CARTAS.forEach(c=>{
  const d=document.createElement('div'); d.className='card rv'; d.tabIndex=0;
  d.innerHTML=`<div class="front"><small>Mito ou verdade?</small>${c.p}</div><div class="back ${c.mito?'mito':''}"><strong>${c.mito?'Mito':'Verdade'}</strong><span>${c.r}</span></div>`;
  d.onclick=()=>d.classList.toggle('flip'); d.onkeydown=e=>e.key==='Enter'&&d.classList.toggle('flip');
  cards.appendChild(d);
});
document.querySelectorAll('.nums div,.ods-in h2').forEach(e=>e.classList.add('rv'));

const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return; e.target.classList.add('in'); io.unobserve(e.target);
  const n=$('b[data-n]',e.target); if(n){const max=+n.dataset.n; let v=0; const step=Math.max(1,max/60);
    const t=setInterval(()=>{v+=step;if(v>=max){v=max;clearInterval(t)}n.textContent=Math.round(v)},25)}
}),{threshold:.25});
document.querySelectorAll('.rv').forEach(e=>io.observe(e));

const glow=$('.glow');
addEventListener('mousemove',e=>{
  glow.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;
  const x=(e.clientX/innerWidth-.5)*30, y=(e.clientY/innerHeight-.5)*30;
  $('.x1').style.translate=`${-x*2}px ${-y*2}px`; $('.x2').style.translate=`${x*3}px ${y*3}px`;
});

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  const alvo=$(a.getAttribute('href')); if(!alvo)return; e.preventDefault();
  wipe(()=>alvo.scrollIntoView());
}));

go(0,false);
