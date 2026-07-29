const track = document.getElementById('track');
const runner = document.getElementById('runner');
const startBtn = document.getElementById('startBtn');
const scoreElement = document.getElementById('score');
const distanceElement = document.getElementById('distance');
const message = document.getElementById('message');
const playArea = document.getElementById('playArea');

let score = 0;
let distance = 0;
let speed = 220;
let lane = 1;
let isJumping = false;
let jumpVelocity = 0;
let gameActive = false;
let obstacles = [];
let coins = [];
let lastSpawn = 0;
let lastCoinSpawn = 0;
let lastFrame = 0;
let trackRect = null;
let laneX = [0, 0, 0];
let audioContext = null;
const coinColors = ['gold', 'cyan', 'pink'];

function vibrate(pattern) {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

function updateStats() {
  scoreElement.textContent = score;
  distanceElement.textContent = Math.floor(distance);
}

function setRunnerPosition() {
  if (!trackRect) {
    trackRect = track.getBoundingClientRect();
    const laneWidth = trackRect.width / 3;
    laneX = [laneWidth * 0.5 - 26, laneWidth * 1.5 - 26, laneWidth * 2.5 - 26];
  }

  runner.style.left = `${laneX[lane]}px`;
}

function createObstacle() {
  const obstacle = document.createElement('div');
  obstacle.className = 'obstacle';
  obstacle.dataset.lane = Math.floor(Math.random() * 3);
  obstacle.style.left = `${laneX[Number(obstacle.dataset.lane)] + 6}px`;
  obstacle.style.top = '-56px';
  track.appendChild(obstacle);
  obstacles.push(obstacle);
}

function createCoin() {
  const coin = document.createElement('div');
  const laneIndex = Math.floor(Math.random() * 3);
  coin.dataset.lane = laneIndex;
  coin.className = `coin ${coinColors[laneIndex]}`;
  coin.style.left = `${laneX[laneIndex] + 14}px`;
  coin.style.top = '-44px';
  track.appendChild(coin);
  coins.push(coin);
}

function playCoinSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  if (!audioContext) audioContext = new AudioContext();
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.type = 'triangle';
  osc.frequency.value = 520;
  osc.connect(gain);
  gain.connect(audioContext.destination);
  gain.gain.setValueAtTime(0.15, audioContext.currentTime);
  osc.start();
  osc.frequency.exponentialRampToValueAtTime(860, audioContext.currentTime + 0.12);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.18);
  osc.stop(audioContext.currentTime + 0.18);
}

function showCollectText(text) {
  const badge = document.createElement('span');
  badge.className = 'collect-text';
  badge.textContent = text;
  badge.style.left = `${laneX[lane] + 12}px`;
  badge.style.top = `${trackRect.height - 120}px`;
  track.appendChild(badge);
  requestAnimationFrame(() => {
    badge.style.opacity = '1';
    badge.style.transform = 'translateY(-72px) scale(1)';
  });
  setTimeout(() => {
    badge.style.opacity = '0';
    badge.style.transform = 'translateY(-110px) scale(0.9)';
  }, 80);
  setTimeout(() => badge.remove(), 700);
}

function removeObstacle(obstacle) {
  if (obstacle.parentElement) {
    obstacle.parentElement.removeChild(obstacle);
  }
  obstacles = obstacles.filter((item) => item !== obstacle);
}

function removeCoin(coin) {
  if (coin.parentElement) {
    coin.parentElement.removeChild(coin);
  }
  coins = coins.filter((item) => item !== coin);
}

function updateObstacles(delta) {
  const move = speed * delta;
  for (const obstacle of [...obstacles]) {
    const top = parseFloat(obstacle.style.top) + move;
    obstacle.style.top = `${top}px`;
    if (top > trackRect.height) {
      removeObstacle(obstacle);
      score += 1;
      distance += 5;
      vibrate([10]);
    }
  }
}

function updateCoins(delta) {
  const move = speed * delta;
  for (const coin of [...coins]) {
    const top = parseFloat(coin.style.top) + move;
    coin.style.top = `${top}px`;
    if (top > trackRect.height) {
      removeCoin(coin);
      continue;
    }
    checkCoinCollection(coin, top);
  }
}

function checkCoinCollection(coin, top) {
  const coinLane = Number(coin.dataset.lane);
  if (coinLane !== lane) return;
  if (top + 32 >= trackRect.height - 100 && top <= trackRect.height - 20) {
    score += 5;
    vibrate([15, 10]);
    playCoinSound();
    showCollectText('COOL BAL +5');
    removeCoin(coin);
  }
}

function checkCollision() {
  if (!gameActive) return;
  if (isJumping) return;

  for (const obstacle of obstacles) {
    const obstacleTop = parseFloat(obstacle.style.top);
    const obstacleLane = Number(obstacle.dataset.lane);
    if (obstacleLane !== lane) continue;
    if (obstacleTop + 42 >= trackRect.height - 100 && obstacleTop <= trackRect.height - 40) {
      endGame();
      return;
    }
  }
}

function updateJump(delta) {
  if (!isJumping) return;
  jumpVelocity -= 1200 * delta;
  const bottom = Math.min(120, Math.max(24, parseFloat(runner.style.bottom || '24') + jumpVelocity * delta));
  runner.style.bottom = `${bottom}px`;
  if (bottom <= 24) {
    runner.style.bottom = '24px';
    isJumping = false;
    jumpVelocity = 0;
  }
}

function startGame() {
  score = 0;
  distance = 0;
  speed = 220;
  lane = 1;
  isJumping = false;
  obstacles.forEach(removeObstacle);
  coins.forEach(removeCoin);
  obstacles = [];
  coins = [];
  lastSpawn = 0;
  lastCoinSpawn = 0;
  lastFrame = performance.now();
  trackRect = track.getBoundingClientRect();
  setRunnerPosition();
  runner.style.bottom = '24px';
  gameActive = true;
  updateStats();
  message.textContent = 'Chapga, o‘ngga harakatlaning, tanga yig‘ing va to‘siqlardan qoching!';
  startBtn.disabled = true;
  startBtn.textContent = 'O‘yin davom etmoqda';
  requestAnimationFrame(gameLoop);
}

function endGame() {
  gameActive = false;
  startBtn.disabled = false;
  startBtn.textContent = 'Yana o‘ynash';
  message.textContent = `O'yin tugadi! Siz ${score} ball oldingiz va ${Math.floor(distance)} metr bosib o'tdingiz.`;
}

function moveLeft() {
  if (!gameActive || lane === 0) return;
  lane -= 1;
  setRunnerPosition();
  vibrate([20, 5]);
}

function moveRight() {
  if (!gameActive || lane === 2) return;
  lane += 1;
  setRunnerPosition();
  vibrate([20, 5]);
}

function jump() {
  if (!gameActive || isJumping) return;
  isJumping = true;
  jumpVelocity = 520;
  vibrate([30, 10, 30]);
}

function gameLoop(timestamp) {
  if (!gameActive) return;
  const delta = Math.min((timestamp - lastFrame) / 1000, 0.04);
  lastFrame = timestamp;

  distance += speed * delta * 0.02;
  updateStats();
  updateJump(delta);
  updateObstacles(delta);
  updateCoins(delta);
  checkCollision();

  lastSpawn += delta;
  lastCoinSpawn += delta;
  if (lastSpawn > 0.9) {
    lastSpawn = 0;
    createObstacle();
  }
  if (lastCoinSpawn > 1.4) {
    lastCoinSpawn = 0;
    createCoin();
  }

  speed += 2 * delta;
  requestAnimationFrame(gameLoop);
}

startBtn.addEventListener('click', startGame);

document.addEventListener('keydown', (event) => {
  if (!gameActive) return;
  if (event.key === 'ArrowLeft') moveLeft();
  if (event.key === 'ArrowRight') moveRight();
  if (event.key === 'ArrowUp' || event.key === ' ') jump();
});

let touchStartX = 0;
let touchStartY = 0;
let swipeHandled = false;
const swipeThreshold = 40;

function handleTouchStart(event) {
  if (event.touches.length !== 1) return;
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
  swipeHandled = false;
}

function handleTouchMove(event) {
  if (event.touches.length !== 1) return;
  if (swipeHandled) return;
  const deltaX = event.touches[0].clientX - touchStartX;
  const deltaY = event.touches[0].clientY - touchStartY;
  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > swipeThreshold) {
    swipeHandled = true;
    if (!gameActive) return;
    if (deltaX > 0) {
      moveRight();
    } else {
      moveLeft();
    }
  }
}

function handleTouchEnd(event) {
  if (!gameActive || swipeHandled) return;
  // Short tap can jump if no swipe occurred
  jump();
}

track.addEventListener('touchstart', handleTouchStart, { passive: true });
track.addEventListener('touchmove', handleTouchMove, { passive: true });
track.addEventListener('touchend', handleTouchEnd);

window.addEventListener('resize', () => {
  trackRect = track.getBoundingClientRect();
  const laneWidth = trackRect.width / 3;
  laneX = [laneWidth * 0.5 - 26, laneWidth * 1.5 - 26, laneWidth * 2.5 - 26];
  setRunnerPosition();
});

window.addEventListener('load', () => {
  setRunnerPosition();
  runner.style.bottom = '24px';
});

updateStats();
