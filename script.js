const space = document.getElementById('space');
const boxCount = 80;

const aspectRatios = [
  { w: 160, h: 120 },
  { w: 160, h: 90 },
  { w: 120, h: 150 }
];

for (let i = 0; i < boxCount; i++) {
  const box = document.createElement('div');
  box.className = 'box';

  const ratio = aspectRatios[Math.floor(Math.random() * aspectRatios.length)];
  const scale = 0.8 + Math.random() * 0.2;
  const width = ratio.w * scale;
  const height = ratio.h * scale;

  box.style.width = `${width}px`;
  box.style.height = `${height}px`;

  const centerX = 1500;
  const centerY = 1500;
  const offsetX = (Math.random() - 0.5) * 2600;
  const offsetY = (Math.random() - 0.5) * 2600;

  const posX = centerX + offsetX;
  const posY = centerY + offsetY;

  box.style.left = `${posX}px`;
  box.style.top = `${posY}px`;

  box.dataset.password = "a12";

  box.addEventListener("click", () => {
    const input = prompt("Inserisci la password");
    if (input && input.toLowerCase() === "a12") {
      showFolder();
    } else {
      showRedOverlay();
    }
  });

  animateBox(box, posX, posY);
  space.appendChild(box);
}

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
  'png/element1.png',
  'png/element2.png',
  'png/element3.png',
  'png/element4.png',
  'png/element5.png',
  'png/element6.png',
  'png/element7.png',
  'png/element8.png',
  'png/element9.png'
];

const pngTexts = {
  'element1.png': 'Sembrava una mummia, ma aveva mani troppo lunghe e un cranio impossibile da spiegare.',
  'element2.png': "Erano le 7 del mattino e l’acqua era immobile, finché qualcosa di enorme non affiorò per un istante.",
  'element3.png': "Alcuni dicono che non sia mai morta. Altri, che non sia mai stata viva.",
  'element4.png': "Alle 9 di mattina del 24 luglio, le pale di una benna meccanica strappano dal fango del canale un oggetto di pietra. È lei...",
  'element5.png': "Era pietra fredda, eppure piangeva come un essere umano.",
  'element6.png': "All’alba, i marciapiedi erano cosparsi di corpi: decine, forse centinaia di uccelli giacevano immobili sotto le antenne.",
  'element7.png': "Ogni notte appare nel sogno: lo stesso volto, lo stesso sorriso, eppure nessuno sa chi sia.",
  'element8.png': "Era come un sole in miniatura, comparso tra le tende e scomparso senza rumore.",
  'element9.png': "Nel silenzio del cortile, solo il rumore della lattina vuota. E poi il lamento."
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

  const baseSize = 100 * (1.8 + Math.random() * 0.4);
  img.style.width = `${baseSize}px`;
  img.style.height = 'auto';

  const centerX = 1500;
  const centerY = 1500;
  const offsetX = (Math.random() - 0.5) * 3000;
  const offsetY = (Math.random() - 0.5) * 3000;

  let posX = centerX + offsetX;
  let posY = centerY + offsetY;

  img.style.left = `${posX}px`;
  img.style.top = `${posY}px`;

  img.addEventListener("click", (e) => {
    e.stopPropagation();
    const jumpX = (Math.random() - 0.5) * 800;
    const jumpY = (Math.random() - 0.5) * 800;
    img.animate([
      { transform: `translate(${posX}px, ${posY}px)` },
      { transform: `translate(${posX + jumpX}px, ${posY + jumpY}px)` }
    ], {
      duration: 400,
      easing: 'cubic-bezier(0.25, 1.5, 0.5, 1)',
      fill: 'forwards'
    });
    posX += jumpX;
    posY += jumpY;
  });

  img.addEventListener("mouseenter", () => {
    if (img.tooltipEl) return;

    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = pngTexts[src.split('/').pop()] || '';
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

  navigatePng(img, posX, posY);
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

let offsetX = window.innerWidth / 2 - 1500;
let offsetY = window.innerHeight / 2 - 1500;
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

  const tab = document.createElement('div');
  tab.id = 'folderTab';
  tab.innerText = '\u0034';

  tab.addEventListener('click', () => {
    panel.classList.toggle('open');
  });

  panel.appendChild(tab);
  document.body.appendChild(panel);
}
