const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const message = document.getElementById('message');
const bottle = document.getElementById('bottle');

const messages = [
  'Aniqmi? Ishonchimiz komil 😊',
  'Ha, bu juda to‘g‘ri tanlov — yanada shirinroq bo‘ladi 💖',
  'Yalqinishlar cheksiz davom etaveradi, ishonchli va chiroyli 💫',
  'Aniqmi, bu yerda ha degan javob eng yaxshisi 🩷',
  'Ishonchingiz komil, va bu his cheksiz davom etadi ✨'
];

const noPhrases = [
  'Adajon...',
  'Iltimos, ada!',
  'Jon ada...',
  'Bittagina-da!',
  'Muzdeggina...',
  'Iltimos-da...',
  'Adajonim-a...',
  'Rozi bo\'ling...',
  'Bitta xolos!',
  'Jonim adajon!',
  'Mehribonim...',
  'Xo\'p deng...',
  'Faqat bugun!',
  'Oxirgi marta!',
  'Siz yaxshisiz-da...',
  'Tushuning endi...',
  'Maylimi, ada?',
  'Xafa bo\'laman-a...',
  'Iltimosss!',
  'Yo\'q demang...'
];
let noIndex = 0;

function vibrate(pattern) {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

function triggerPress(button) {
  button.classList.remove('is-press');
  void button.offsetWidth;
  button.classList.add('is-press');
  setTimeout(() => button.classList.remove('is-press'), 120);
}

function createConfetti() {
  const colors = ['#ff4fb3', '#ffb347', '#ffd166', '#7afcff'];
  for (let i = 0; i < 24; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.top = '-10px';
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = `${Math.random() * 0.15}s`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 1400);
  }
}

yesBtn.addEventListener('click', () => {
  vibrate([10, 20, 10]);
  triggerPress(yesBtn);
  noBtn.style.transform = 'translate(0, 0)';
  bottle.classList.remove('is-pop');
  void bottle.offsetWidth;
  bottle.classList.add('is-pop');
  createConfetti();
  message.textContent = 'Shu yerga bittasini tanlang';
});

noBtn.addEventListener('click', () => {
  vibrate([8, 12, 8]);
  triggerPress(noBtn);
  const offsetX = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 30 + 12);
  const offsetY = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 16 + 8);
  noBtn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  noBtn.textContent = noPhrases[noIndex];
  noIndex = (noIndex + 1) % noPhrases.length;
  message.textContent = 'Shu yerga bittasini tanlang';
});
