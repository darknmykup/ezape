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

setTimeout(()=>go(0,false),1300);

/* ===== v2: novidades ===== */
const rnd=(a,b)=>Math.random()*(b-a)+a, sleep=ms=>new Promise(r=>setTimeout(r,ms));
const reveal=e=>{e.classList.add('rv');io.observe(e)};
document.querySelectorAll('.explore>*,.checkin>*,.breath-copy,.vacinas>*').forEach(reveal);

function confetti(x=innerWidth/2,y=innerHeight/2){
  const cols=['#FFD84D','#B9F6CA','#4C9F38','#FF6F61','#8EE3EF','#ffffff'];
  for(let i=0;i<60;i++){
    const c=document.createElement('i'); c.className='cf'; c.style.cssText=`left:${x}px;top:${y}px;background:${cols[i%6]}`;
    document.body.appendChild(c);
    c.animate([{transform:'translate(0,0) rotate(0)',opacity:1},
      {transform:`translate(${rnd(-300,300)}px,${rnd(-350,-50)}px) rotate(${rnd(0,720)}deg)`,opacity:1,offset:.4},
      {transform:`translate(${rnd(-400,400)}px,${rnd(200,500)}px) rotate(${rnd(0,1080)}deg)`,opacity:0}],
      {duration:rnd(1200,2200),easing:'cubic-bezier(.2,.7,.4,1)'}).onfinish=()=>c.remove();
  }
}

/* painéis expansíveis (dicas na mesma ordem de TEMAS) */
const DICAS=[
 ['Camisinha gratuita nas UBS','Teste rápido de HIV, sífilis e hepatites no SUS','Dúvida ou sintoma? Procure a UBS sem medo'],
 ['Desconfie de print sem fonte','Confira em sites oficiais, como o Ministério da Saúde e a OMS','Na dúvida, não compartilhe'],
 ['Planejamento reprodutivo gratuito no SUS','Converse com a UBS sobre métodos contraceptivos','Pré-natal gratuito e rede de apoio'],
 ['CVV: 188, 24 horas, ligação gratuita','UBS e CAPS atendem pelo SUS','Fale com alguém de confiança'],
 ['Pausas curtas ajudam a estudar','Dormir bem ajuda a fixar o conteúdo','Peça apoio à escola ou à coordenação'],
 ['Leve a caderneta à UBS','O Meu SUS Digital mostra suas vacinas','As vacinas do calendário são gratuitas']
];
const panels=$('#panels');
const openPanel=i=>[...panels.children].forEach((e,j)=>e.classList.toggle('on',j===i));
TEMAS.forEach((t,i)=>{
  const p=document.createElement('div'); p.className='panel'+(i?'':' on'); p.tabIndex=0;
  p.style.backgroundImage=t.img?`url(${t.img}), ${t.grad}`:t.grad;
  p.innerHTML=`<h3>${t.nome}</h3><div class="pc"><small style="color:${t.cor}">${t.tag}</small><h4>${t.titulo}</h4><ul>${DICAS[i].map(d=>`<li>${d}</li>`).join('')}</ul></div>`;
  p.onmouseenter=p.onclick=p.onfocus=()=>openPanel(i);
  panels.appendChild(p);
});

/* mito ou verdade: placar + confete */
const found=new Set(), seen=e=>{const c=e.target.closest('.card'); if(!c||found.has(c))return; found.add(c);
  $('#score b').textContent=found.size;
  if(found.size===CARTAS.length){confetti();$('#score').textContent='Você descobriu tudo! Agora compartilhe a informação certa.'}};
cards.addEventListener('click',seen); cards.addEventListener('keydown',e=>e.key==='Enter'&&seen(e));

/* check-in de humor */
const MOODS=[
 {e:'😄',bg:'#14703a',m:'Que bom! Guarde essa energia e conte para alguém o que fez seu dia ser bom.'},
 {e:'🙂',bg:'#0D4A33',m:'Dia tranquilo também conta. Um copo d’água e uma pausa já ajudam.'},
 {e:'😴',bg:'#1b3a52',m:'Corpo cansado pede descanso. Dormir bem também é estudar.',l:['#respire','Fazer uma pausa guiada']},
 {e:'😰',bg:'#4a2f4f',m:'A ansiedade aperta, mas passa. Vamos respirar juntos por um minuto?',l:['#respire','Respirar agora']},
 {e:'😔',bg:'#173a55',m:'Obrigado por reconhecer isso. Falar com alguém de confiança ajuda. Se estiver pesado demais, o CVV atende 24h pelo 188.',l:['#explore','Ver onde buscar apoio'],p:3}
];
const moods=$('#moods'), rep=$('#reply');
MOODS.forEach(m=>{
  const b=document.createElement('button'); b.textContent=m.e; b.setAttribute('aria-label','Humor '+m.e);
  b.onclick=()=>{
    [...moods.children].forEach(x=>x.classList.toggle('on',x===b));
    $('#checkin').style.setProperty('--mood',m.bg);
    rep.innerHTML=`<p>${m.m}</p>`+(m.l?`<a class="btn" href="${m.l[0]}">${m.l[1]}</a>`:'');
    if(m.p!==undefined)openPanel(m.p);
    if(m.e==='😄'){const r=b.getBoundingClientRect();confetti(r.x+46,r.y+46)}
  };
  moods.appendChild(b);
});

/* respiração guiada: 4 ciclos de inspire 4s, segure 4s, solte 6s */
const orb=$('#orb'), ot=$('#orb-t'), bb=$('#breath-btn'); let run=0;
bb.onclick=async()=>{
  if(bb.dataset.on){run++;delete bb.dataset.on;bb.textContent='Começar';ot.textContent='Pronto?';orb.style.transform='scale(.6)';return}
  const id=++run; bb.dataset.on=1; bb.textContent='Parar';
  const ph=async(t,sc,s)=>{if(id!==run)return; ot.textContent=t; orb.style.transition=`transform ${s}s ease-in-out`; orb.style.transform=`scale(${sc})`; await sleep(s*1000)};
  for(let c=1;c<=4&&id===run;c++){await ph('Inspire',1,4);await ph('Segure',1,4);await ph('Solte',.6,6);if(id===run)$('#cycles').textContent=`${c} de 4 ciclos`}
  if(id===run){delete bb.dataset.on;bb.textContent='Começar de novo';ot.textContent='Muito bem!';confetti()}
};

/* caderneta de vacinas (lembrete, não substitui o cartão) */
const VAX=['Hepatite B','Tríplice viral','HPV','Meningocócica ACWY','dT (difteria e tétano)','Febre amarela'], ok=new Set(), arc=$('#arc');
VAX.forEach((v,i)=>{
  const b=document.createElement('button'); b.textContent=v; b.setAttribute('aria-pressed','false');
  b.onclick=e=>{
    ok.has(i)?ok.delete(i):ok.add(i); b.classList.toggle('on'); b.setAttribute('aria-pressed',ok.has(i));
    arc.style.strokeDashoffset=327*(1-ok.size/VAX.length); $('#ring-n').textContent=`${ok.size}/${VAX.length}`;
    const full=ok.size===VAX.length; $('#vax-msg').textContent=full?'Caderneta completa! Pergunte na UBS se falta alguma dose de reforço.':'';
    if(full)confetti(e.clientX,e.clientY);
  };
  $('#vax').appendChild(b);
});

/* botões magnéticos + barra de progresso da página */
document.querySelectorAll('.btn,.pill').forEach(b=>{
  b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.translate=`${(e.clientX-r.left-r.width/2)*.25}px ${(e.clientY-r.top-r.height/2)*.35}px`});
  b.addEventListener('mouseleave',()=>b.style.translate='');
});
addEventListener('scroll',()=>$('.sp').style.width=scrollY/(document.body.scrollHeight-innerHeight)*100+'%',{passive:true});
