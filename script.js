const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const message = document.getElementById('message');

const messages = [
  'Zo‘r tanlov! Endi hamma narsa yorqinroq bo‘ladi ✨',
  'Bu yerda ha degan javob eng chiroyli variant 😊',
  'Oberin kabi yalqinishlar ketaveradi, ishoning! 💖'
];

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
  createConfetti();
  message.textContent = messages[Math.floor(Math.random() * messages.length)];
});

noBtn.addEventListener('click', () => {
  noBtn.style.position = 'absolute';
  const maxX = window.innerWidth - 140;
  const maxY = window.innerHeight - 60;
  noBtn.style.left = `${Math.random() * maxX}px`;
  noBtn.style.top = `${Math.random() * maxY}px`;
  noBtn.style.transform = 'translate(0, 0)';
  message.textContent = 'Ha desang, bu sahna yanada chiroyli bo‘ladi 😎';
});
