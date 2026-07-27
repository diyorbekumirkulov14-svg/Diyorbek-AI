const items = [
  { name: '1 litr suv', price: 2000, image: 'https://avatars.mds.yandex.net/i?id=88410da7c32053de4b8ce824f0f0035bfad1b113-5714482-images-thumbs&n=13' },
  { name: '2 litr suv', price: 5000, image: 'https://avatars.mds.yandex.net/i?id=9e5dbdfcec22b9ea649998ace750c0bb3372e45a-8000733-images-thumbs&n=13' },
  { name: 'Non', price: 2000, image: 'https://avatars.mds.yandex.net/i?id=ea855bedada677f08febd8a201c1222f8f0dc53a-12598198-images-thumbs&n=13' },
  { name: '10 000 so\'mlik pul', price: 12000, image: 'https://avatars.mds.yandex.net/get-mpic/13969676/2a0000019659f056a0e72fbb9ea6f8a7ce4c/orig' },
  { name: 'Qatiq', price: 2000, image: 'https://cdn.zoomda.uz/products/2025/11/28/1764312581005344178.webp' },
  { name: 'Piyola', price: 2000, image: 'https://avatars.mds.yandex.net/i?id=b59a9de87c34ca4f018acea6c2c7b58989332dac-9065769-images-thumbs&n=13' },
  { name: 'Telefon', price: 1500000, image: 'https://i.ytimg.com/vi/s9JIymPj0no/maxresdefault.jpg' }
];

const itemsContainer = document.getElementById('items');
const totalEl = document.getElementById('total');
const resetBtn = document.getElementById('resetBtn');
const buyBtn = document.getElementById('buyBtn');
const messageEl = document.getElementById('message');
const selectedItems = new Set();

function renderItems() {
  itemsContainer.innerHTML = '';

  items.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'item';

    if (selectedItems.has(item.name)) {
      card.classList.add('active');
    }

    card.innerHTML = `
      <img class="item-image" src="${item.image}" alt="${item.name}" />
      <div class="item-content">
        <span class="item-name">${item.name}</span>
        <span class="item-price">${item.price.toLocaleString()} so'm</span>
      </div>
    `;

    card.addEventListener('click', () => toggleItem(item.name));
    itemsContainer.appendChild(card);
  });
}

function toggleItem(name) {
  if (selectedItems.has(name)) {
    selectedItems.delete(name);
  } else {
    selectedItems.add(name);
  }

  renderItems();
  updateTotal();
}

function updateTotal() {
  const total = items.reduce((sum, item) => {
    return selectedItems.has(item.name) ? sum + item.price : sum;
  }, 0);

  totalEl.textContent = total.toLocaleString();
}

resetBtn.addEventListener('click', () => {
  selectedItems.clear();
  renderItems();
  updateTotal();
  messageEl.classList.remove('show');
  messageEl.textContent = '';
});

buyBtn.addEventListener('click', () => {
  if (selectedItems.size === 0) {
    messageEl.textContent = 'Hech narsa tanlanmagan. Iltimos, biror mahsulotni tanlang.';
    messageEl.classList.add('show');
    return;
  }

  while (true) {
    const enteredCode = prompt("Kodni kiriting (egadan so'rang):");

    if (enteredCode === null) {
      messageEl.textContent = 'Sotib olish bekor qilindi.';
      messageEl.classList.add('show');
      break;
    }

    if (enteredCode === '1234') {
      messageEl.textContent = 'Sotib olindi! Tez orada yetkazib beriladi.';
      messageEl.classList.add('show');
      break;
    }

    messageEl.textContent = `Noto'g'ri kod (${enteredCode}). Iltimos, egadan so'rang.`;
    messageEl.classList.add('show');
    // loop to prompt again
  }
});

renderItems();
updateTotal();
