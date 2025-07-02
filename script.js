// === SCRIPT.JS COMPLETO (versione corretta e completa) ===
// Modifiche:
// 1. Tooltip PNG in bianco, senza box.
// 2. Linguetta "M" corretta.
// 3. Scheda si apre fino a 1/3 del viewport.

const space = document.getElementById('space');
const spaceWidth = 3000;
const spaceHeight = 2000;

const imageFilenames = [
  'a1.jpg','a2.jpeg','a3.jpeg','a4.jpg','a5.jpeg','c1.jpg','c2.jpg','c3.jpg','c4.jpeg','c5.jpg',
  'f1.jpg','f2.jpg','f3.jpg','f4.jpg','l1.jpg','l2.jpg','l3.jpg','l4.jpg','l5.jpg',
  'm1.jpg','m2.jpeg','m3.jpg','m4.jpg','m5.jpg','m6.jpg','m7.jpg','m8.jpg','m9.jpg','m10.jpg','m11.jpg','m12.jpg',
  'q1.jpg','q2.jpg','q3.jpg','s1.jpg','s2.jpg','s3.jpeg','s4.jpg','u1.jpeg','u2.jpg','u3.jpg','u4.jpg',
  'v1.jpg','v2.jpg','v3.jpg','v4.jpg','v5.jpeg'
];

imageFilenames.forEach(filename => {
  const box = document.createElement('div');
  box.className = 'box';
  const isProtected = /^m\d+\.(jpg|jpeg)$/i.test(filename);
  box.dataset.password = isProtected ? 'a12' : '';

  const img = document.createElement('img');
  img.src = `img/${filename}`;
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.objectFit = 'cover';
  img.style.borderRadius = '10px';
  box.appendChild(img);

  box.style.width = '160px';
  box.style.height = '120px';

  const centerX = spaceWidth / 2;
  const centerY = spaceHeight / 2;
  const spreadX = 3000;
  const spreadY = 2000;
  const offsetX = centerX + (Math.random() - 0.5) * spreadX;
  const offsetY = centerY + (Math.random() - 0.5) * spreadY;
  box.style.left = `${offsetX}px`;
  box.style.top = `${offsetY}px`;

  box.addEventListener('click', () => {
    const input = prompt('Inserisci la password');
    if (input && input.toLowerCase() === 'a12') {
      if (box.dataset.password === 'a12') showFolder();
      else showRedOverlay();
    } else showRedOverlay();
  });

  animateBox(box, offsetX, offsetY);
  space.appendChild(box);
});

function animateBox(box, baseX, baseY) {
  const baseZ = Math.random() * 400 - 200;
  const xAmp = 20 + Math.random() * 40;
  const yAmp = 20 + Math.random() * 40;
  const zAmp = 30 + Math.random() * 60;
  const xSpeed = Math.random() * 0.0012 + 0.0003;
  const ySpeed = Math.random() * 0.0012 + 0.0003;
  const zSpeed = Math.random() * 0.0012 + 0.0003;
  let tx = Math.random() * 1000;
  let ty = Math.random() * 1000;
  let tz = Math.random() * 1000;

  function animate() {
    tx += xSpeed;
    ty += ySpeed;
    tz += zSpeed;
    const x = baseX + xAmp * Math.sin(tx);
    const y = baseY + yAmp * Math.cos(ty);
    const z = baseZ + zAmp * Math.sin(tz);
    box.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
    requestAnimationFrame(animate);
  }
  animate();
}

const pngSrcs = [
  'png/element1.png','png/element2.png','png/element3.png','png/element4.png','png/element5.png','png/element6.png','png/element7.png','png/element8.png','png/element9.png'
];

const pngTexts = {
  'element1.png': 'Sembrava una mummia, ma aveva mani troppo lunghe e un cranio impossibile da spiegare.',
  'element2.png': 'Erano le 7 del mattino e l’acqua era immobile, finché qualcosa di enorme non affiorò per un istante.',
  'element3.png': 'Alcuni dicono che non sia mai morta. Altri, che non sia mai stata viva.',
  'element4.png': 'Alle 9 di mattina del 24 luglio, le pale di una benna meccanica strappano dal fango del canale un oggetto di pietra. È lei: è una statua di Modigliani.',
  'element5.png': 'Era pietra fredda, eppure piangeva come un essere umano.',
  'element6.png': 'All’alba, i marciapiedi erano cosparsi di corpi: decine, forse centinaia di uccelli giacevano immobili sotto le antenne.',
  'element7.png': 'Ogni notte appare nel sogno: lo stesso volto, lo stesso sorriso, eppure nessuno sa chi sia.',
  'element8.png': 'Era come un sole in miniatura, comparso tra le tende e scomparso senza rumore.',
  'element9.png': 'Nel silenzio del cortile, solo il rumore della lattina vuota. E poi il lamento.'
};

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

pngSrcs.forEach(src => {
  const img = document.createElement('img');
  img.className = 'floating-png';
  img.src = src;
  img.style.width = '160px';
  img.style.height = 'auto';

  const offsetX = Math.random() * (spaceWidth - 160);
  const offsetY = Math.random() * (spaceHeight - 160);
  img.style.left = `${offsetX}px`;
  img.style.top = `${offsetY}px`;

  img.addEventListener('click', (e) => {
    e.stopPropagation();
    const jumpX = (Math.random() - 0.5) * 800;
    const jumpY = (Math.random() - 0.5) * 800;
    img.animate([
      { transform: `translate(${offsetX}px, ${offsetY}px)` },
      { transform: `translate(${offsetX + jumpX}px, ${offsetY + jumpY}px)` }
    ], {
      duration: 400,
      easing: 'cubic-bezier(0.25, 1.5, 0.5, 1)',
      fill: 'forwards'
    });
  });

  img.addEventListener('mouseenter', () => {
    if (img.tooltipEl) return;
    const tooltip = document.createElement('div');
    tooltip.textContent = pngTexts[src.split('/').pop()] || '';
    tooltip.style.position = 'absolute';
    tooltip.style.color = '#fff';
    tooltip.style.background = 'none';
    tooltip.style.border = 'none';
    tooltip.style.boxShadow = 'none';
    tooltip.style.fontStyle = 'italic';
    tooltip.style.fontFamily = 'Georgia, serif';
    tooltip.style.fontSize = '1rem';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.maxWidth = '260px';
    tooltip.style.whiteSpace = 'pre-line';
    document.body.appendChild(tooltip);

    const rect = img.getBoundingClientRect();
    tooltip.style.left = `${rect.left + rect.width / 2}px`;
    tooltip.style.top = `${rect.top - 20}px`;
    img.tooltipEl = tooltip;

    function trackExit() {
      const r = img.getBoundingClientRect();
      const inBounds = mouseX >= r.left && mouseX <= r.right && mouseY >= r.top && mouseY <= r.bottom;
      if (!inBounds && img.tooltipEl) {
        img.tooltipEl.remove();
        img.tooltipEl = null;
      } else {
        requestAnimationFrame(trackExit);
      }
    }
    requestAnimationFrame(trackExit);
  });

  navigatePng(img, offsetX, offsetY);
  space.appendChild(img);
});

function navigatePng(el, baseX, baseY) {
  const travelX = (Math.random() - 0.5) * 2000;
  const travelY = (Math.random() - 0.5) * 2000;
  const speed = Math.random() * 0.001 + 0.0004;
  let t = Math.random() * 1000;
  const phaseOffsetX = Math.random() * 10;
  const phaseOffsetY = Math.random() * 10;
  function animate() {
    t += speed;
    const x = baseX + travelX * Math.sin(t + phaseOffsetX);
    const y = baseY + travelY * Math.cos(t + phaseOffsetY);
    el.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(animate);
  }
  animate();
}

const redOverlay = document.getElementById('redOverlay');
function showRedOverlay() {
  redOverlay.style.display = 'block';
  document.body.style.pointerEvents = 'none';
  setTimeout(() => {
    redOverlay.style.display = 'none';
    document.body.style.pointerEvents = 'auto';
  }, 3000);
}

function showFolder() {
  if (document.getElementById('folderPanel')) return;
  const panel = document.createElement('div');
  panel.id = 'folderPanel';
  panel.style.overflowY = 'auto';

  const tab = document.createElement('div');
  tab.id = 'folderTab';
  tab.innerText = '4'; // ripristinata la linguetta originale
  tab.addEventListener('click', () => {
    panel.classList.toggle('open');
  });
  panel.appendChild(tab);

  // contenitore testo
  const content = document.createElement('div');
  content.style.padding = '2rem';
  content.style.fontFamily = '"Courier New", monospace';
  content.innerHTML = `
    <h1 style="font-size:1.5rem; margin-top:0">La beffa delle false teste di Modigliani del 1984: uno scherzo che ha messo in crisi l’arte italiana</h1>
    <p>Nel cuore dell'estate del 1984, Livorno, la città natale di Amedeo Modigliani, fu scossa da una scoperta che sembrava destinata a riscrivere la storia dell'arte. Dal fondo melmoso del Fosso Reale emersero tre sculture in pietra grezza, che, a un primo, entusiastico sguardo, sembravano proprio le leggendarie "Teste di Modigliani" che l'artista, si diceva, avesse gettato via in un impeto di rabbia o frustrazione. La notizia fece il giro del mondo, catapultando la sonnacchiosa Livorno sotto i riflettori internazionali. Ma quella che sembrava una miracolosa riscoperta, si rivelò presto uno dei più clamorosi scherzi d'autore della storia dell'arte, capace di mettere a nudo le fragilità e le certezze del sistema critico.</p>

    <h2>La leggenda e la speranza Livornese</h2>
    <p>Amedeo Modigliani, un nome che evoca mistero, genio e un destino tragico, aveva sempre alimentato a Livorno la speranza che parte della sua produzione, specie quella scultorea, potesse giacere dimenticata nei canali cittadini. La leggenda narrava che il giovane "Dedo", insoddisfatto delle sue prime sculture o in preda a un accesso d'ira, le avesse gettate nel Fosso Reale. Questa suggestione, tramandata oralmente per decenni, creò un terreno fertile per l'incredibile vicenda del 1984. La città era in fermento per i lavori di dragaggio del Fosso, un'operazione di pulizia e riqualificazione urbana che, quasi per una beffa del destino, offrì l'occasione per la "scoperta" attesa.</p>

    <h2>La scoperta e l'estasi della critica</h2>
    <p>Quando le prime due teste, seguite poco dopo da una terza, furono ripescate dal fango, l'emozione fu palpabile. Erano grezze, essenziali, con quel fascino primitivo che si addiceva perfettamente all'immaginario di Modigliani. Il mondo dell'arte si precipitò a Livorno. Critici di fama internazionale, storici dell'arte e direttori di musei si trovarono di fronte alle opere. Il coro fu quasi unanime: si trattava di autentiche sculture del maestro livornese. Nomi autorevoli come Carlo Pirovano, allora direttore del Museo d'Arte Moderna di Milano, e Vera Durbé, direttrice del Museo Civico di Livorno, si espressero con fervore sull'autenticità. L'unica voce, seppur cauta, fuori dal coro fu quella di Federico Zeri, che pur riconoscendo la notevole fattura, espresse sin da subito dubbi sull'autenticità, alimentando un dibattito iniziale. Le teste furono esposte, studiate, celebrate, e la loro scoperta divenne una notizia di prim'ordine sui media di tutto il mondo.</p>

    <h2>L'ombra del dubbio e la sconvolgente verità</h2>
    <p>L'entusiasmo durò poco. Presto, alcune crepe cominciarono a incrinare la facciata di certezze. Un ingegnere ligure dichiarò di aver scolpito una delle teste, ma le sue affermazioni furono inizialmente liquidate come una ricerca di notorietà. La svolta clamorosa arrivò il 2 settembre 1984, quando tre studenti livornesi – Pietro Savorelli, Michele Ghelarducci e Bruno Ground – decisero di svelare la verità in diretta televisiva nazionale. Le tre teste erano un loro scherzo goliardico, un esperimento sociale orchestrato per dimostrare la presunta superficialità e l'elitarismo della critica d'arte.<br><br>Con un semplice trapano da falegname e alcuni strumenti rudimentali, avevano intagliato quelle che sarebbero diventate le "opere perdute" di Modigliani, per poi gettarle nel Fosso Reale, armati solo di un sano spirito di provocazione. La loro confessione generò uno scandalo senza precedenti. Il mondo dell'arte fu colpito da un'ondata di imbarazzo e indignazione. La credibilità di esperti e istituzioni fu messa a dura prova, aprendo un dibattito profondo sulla metodologia di autenticazione e sulla suggestione che il "mito" può esercitare sulla ragione.</p>

    <h2>La quarta testa: un Falso nel Falso</h2>
    <p>Come se non bastasse, la vicenda si arricchì di un ulteriore strato di complessità con il ritrovamento di una quarta testa. Questa, a differenza delle altre, era stata scolpita da Angelo Froglia, un portuale e scultore livornese, noto per la sua eccentricità. Froglia aveva realizzato la sua opera prima che lo scherzo degli studenti fosse svelato, ispirato dalla stessa leggenda delle teste di Modigliani nel fosso. La sua testa, che presentava caratteristiche stilistiche diverse, era anch'essa un falso, ma con una motivazione artistica e provocatoria distinta. La sua storia complicò ulteriormente il quadro, aggiungendo un livello di "falso nel falso" che rendeva la vicenda ancora più surreale.</p>

    <h2>Lezioni da un inganno eclatante</h2>
    <p>Il caso delle teste di Modigliani di Livorno rimane un'icona nella storia delle falsificazioni d'arte e un monito perenne. Ha evidenziato come l'aspettativa, il desiderio di trovare prove tangibili di un genio, e persino la pressione mediatica possano influenzare il giudizio critico. Ha costretto il mondo dell'arte a interrogarsi sulla validità delle proprie procedure di autenticazione e sulla necessità di un approccio più rigoroso e meno suscettibile alle mode o alle leggende.<br><br>Oggi, le "Teste di Modigliani" di Livorno sono esposte come simbolo di un episodio che ha segnato la storia dell'arte italiana, ricordandoci che la verità, a volte, può essere più sorprendente e istruttiva di qualsiasi leggenda.</p>
  `;
  panel.appendChild(content);

  document.body.appendChild(panel);
}

let offsetX = window.innerWidth / 2 - spaceWidth / 2;
let offsetY = window.innerHeight / 2 - spaceHeight / 2;
let isDragging = false;
let startX = 0;
let startY = 0;

function updateView() {
  space.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
}

function startDrag(e) {
  isDragging = true;
  startX = e.clientX || e.touches[0].clientX;
  startY = e.clientY || e.touches[0].clientY;
}

function dragMove(e) {
  if (!isDragging) return;
  const currentX = e.clientX || e.touches[0].clientX;
  const currentY = e.clientY || e.touches[0].clientY;
  offsetX += currentX - startX;
  offsetY += currentY - startY;
  startX = currentX;
  startY = currentY;
  updateView();
}

function stopDrag() {
  isDragging = false;
}

space.addEventListener('mousedown', startDrag);
space.addEventListener('mousemove', dragMove);
space.addEventListener('mouseup', stopDrag);

space.addEventListener('touchstart', startDrag);
space.addEventListener('touchmove', dragMove);
space.addEventListener('touchend', stopDrag);

updateView();
