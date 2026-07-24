const categories = [
  {
    slug: 'ovqat',
    title: 'Ovqat',
    description: 'Issiq, mazali va to‘yingan taomlar.',
  },
  {
    slug: 'ichimlik',
    title: 'Ichimlik',
    description: 'Sovuq va shirin ichimliklar.',
  },
  {
    slug: 'shirinlik',
    title: 'Shirinlik',
    description: 'Desertlar va shirin taomlar.',
  },
  {
    slug: 'non',
    title: 'Non',
    description: 'Yangi pishirilgan non va kulchalar.',
  },
  {
    slug: 'tez',
    title: 'Tez',
    description: 'Ovqatga mos tayyor snacklar.',
  },
  {
    slug: 'soglom',
    title: 'Sog‘lom',
    description: 'Salatlar va fit menyu.',
  },
];

const menuItems = [
  {
    id: 1,
    name: 'Xotira Plov',
    description: 'Achchiq, mazali va rang-barang sabzavotlar bilan.',
    price: 42000,
    category: 'ovqat',
    image:
      'https://images.unsplash.com/photo-1604908177520-505fb409d5aa?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'Salat Rang-barang',
    description: 'Yangi salat, mevali bezak va to‘yimli dressing bilan.',
    price: 22000,
    category: 'soglom',
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'Mango Smoothie',
    description: 'Sovuq, shirin va vitaminlarga boy.',
    price: 18000,
    category: 'ichimlik',
    image:
      'https://images.unsplash.com/photo-1510626176961-4b79d0c38c1a?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    name: 'Berry Mocktail',
    description: 'Yangi mevadan tayyorlangan shirin ichimlik.',
    price: 16000,
    category: 'ichimlik',
    image:
      'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 5,
    name: 'Shirinlik Lavash',
    description: 'Yog‘ochda pishirilgan asal bilan to‘ldirilgan.',
    price: 24000,
    category: 'shirinlik',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 6,
    name: 'Sutli Kulcha',
    description: 'Issiq, yumshoq va mazali, har qanday tanlov uchun.',
    price: 12000,
    category: 'non',
    image:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 7,
    name: 'Burger Max',
    description: 'Achchiq sous va nordon sabzavot bilan.',
    price: 36000,
    category: 'tez',
    image:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 8,
    name: 'Yashil smuzi',
    description: 'Brokolli, olma va banan bilan fit taom.',
    price: 19000,
    category: 'soglom',
    image:
      'https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 9,
    name: 'Chocolate Cake',
    description: 'Shokoladli boy desert, kakao bilan.',
    price: 28000,
    category: 'shirinlik',
    image:
      'https://images.unsplash.com/photo-1505253211439-19a2d5b56f31?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 10,
    name: 'Oddiy non',
    description: 'Yangi pishirilgan non, kundalik ovqatga mos.',
    price: 8000,
    category: 'non',
    image:
      'https://images.unsplash.com/photo-1608198093006-dd54b8300ed8?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 11,
    name: 'Pepsi',
    description: 'Sovuq gazlangan ichimlik.',
    price: 12000,
    category: 'ichimlik',
    image:
      'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 12,
    name: 'Pishloqli pizza',
    description: 'Cheddar va mozzarella bilan to‘la.',
    price: 52000,
    category: 'tez',
    image:
      'https://images.unsplash.com/photo-1548365328-9787d6ddfe7d?auto=format&fit=crop&w=900&q=80',
  },
];

const order = {};
const menuGrid = document.getElementById('menuGrid');
const itemCount = document.getElementById('itemCount');
const orderTotal = document.getElementById('orderTotal');
const orderPreview = document.getElementById('orderPreview');
const checkoutButton = document.getElementById('checkoutButton');
const filterButtons = document.querySelectorAll('.filter-btn');

function formatMoney(number) {
  return `${number.toLocaleString('uz-UZ')} so‘m`;
}

function renderMenu(items) {
  menuGrid.innerHTML = items
    .map(
      (item) => `
      <article class="menu-card">
        <img src="${item.image}" alt="${item.name}" />
        <div class="menu-content">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <div class="menu-meta">
            <span class="price">${formatMoney(item.price)}</span>
            <button class="btn btn-secondary" data-add="${item.id}">Qo‘shish</button>
          </div>
        </div>
      </article>
    `
    )
    .join('');
}

function renderOrder() {
  const entries = Object.values(order);
  const totalItems = entries.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = entries.reduce((sum, item) => sum + item.qty * item.price, 0);

  itemCount.textContent = totalItems;
  orderTotal.textContent = formatMoney(totalPrice);

  if (!entries.length) {
    orderPreview.innerHTML = '<p class="empty-state">Savatingiz bo‘sh, taom qo‘shing.</p>';
    checkoutButton.disabled = true;
    return;
  }

  checkoutButton.disabled = false;
  orderPreview.innerHTML = entries
    .map(
      (item) => `
      <div class="order-item">
        <div class="order-item-title">
          <strong>${item.name}</strong>
          <span>${formatMoney(item.price)} x ${item.qty}</span>
        </div>
        <div class="order-item-controls">
          <div>
            <button data-action="decrease" data-id="${item.id}">-</button>
            <button data-action="increase" data-id="${item.id}">+</button>
          </div>
          <strong>${formatMoney(item.price * item.qty)}</strong>
        </div>
      </div>
    `
    )
    .join('');
}

function updateCart(itemId, change) {
  const menuItem = menuItems.find((item) => item.id === itemId);
  if (!menuItem) return;

  if (!order[itemId]) {
    order[itemId] = { ...menuItem, qty: 0 };
  }

  order[itemId].qty += change;
  if (order[itemId].qty <= 0) {
    delete order[itemId];
  }

  renderOrder();
}

function handleMenuClick(event) {
  const addButton = event.target.closest('[data-add]');
  if (addButton) {
    const itemId = parseInt(addButton.dataset.add, 10);
    updateCart(itemId, 1);
  }
}

function handleOrderClick(event) {
  const button = event.target.closest('button[data-action]');
  if (button) {
    const action = button.dataset.action;
    const id = parseInt(button.dataset.id, 10);
    updateCart(id, action === 'increase' ? 1 : -1);
  }
}

function setActiveFilter(button) {
  filterButtons.forEach((btn) => btn.classList.remove('active'));
  button.classList.add('active');
}

function filterMenu(category) {
  if (category === 'all') {
    renderMenu(menuItems);
  } else {
    renderMenu(menuItems.filter((item) => item.category === category));
  }
}

function activateCategoryCard(slug) {
  const cardButtons = document.querySelectorAll('.category-card');
  cardButtons.forEach((card) => {
    card.classList.toggle('active', card.dataset.category === slug);
  });
}

function initFilters() {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setActiveFilter(button);
      activateCategoryCard(button.dataset.category);
      filterMenu(button.dataset.category);
    });
  });
}

function initCategoryCards() {
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach((card) => {
    card.addEventListener('click', () => {
      const category = card.dataset.category;
      const matchingFilter = Array.from(filterButtons).find(
        (btn) => btn.dataset.category === category
      );

      if (matchingFilter) {
        setActiveFilter(matchingFilter);
      } else {
        filterButtons.forEach((btn) => btn.classList.remove('active'));
      }

      activateCategoryCard(category);
      filterMenu(category);
      document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
    });
  });
}

const orderModalOverlay = document.getElementById('orderModalOverlay');
const orderModal = document.getElementById('orderModal');
const modalSummary = document.getElementById('modalSummary');
const modalTotal = document.getElementById('modalTotal');
const closeModalButton = document.getElementById('closeModal');
const confirmOrderButton = document.getElementById('confirmOrderButton');

function openOrderModal() {
  const entries = Object.values(order);
  if (!entries.length) return;

  const totalPrice = entries.reduce((sum, item) => sum + item.qty * item.price, 0);

  modalSummary.innerHTML = entries
    .map(
      (item) => `
      <div class="modal-item">
        <span>${item.name} x${item.qty}</span>
        <strong>${formatMoney(item.price * item.qty)}</strong>
      </div>
    `
    )
    .join('');

  modalTotal.textContent = formatMoney(totalPrice);
  orderModalOverlay.classList.remove('hidden');
  orderModal.classList.remove('hidden');
}

function closeOrderModal() {
  orderModalOverlay.classList.add('hidden');
  orderModal.classList.add('hidden');
}

function initCheckout() {
  checkoutButton.addEventListener('click', openOrderModal);
  closeModalButton.addEventListener('click', closeOrderModal);
  orderModalOverlay.addEventListener('click', closeOrderModal);
  confirmOrderButton.addEventListener('click', () => {
    closeOrderModal();
    alert('Buyurtmangiz qabul qilindi! Yetkazib berishda naqd pulni to‘laysiz.');
    Object.keys(order).forEach((key) => delete order[key]);
    renderOrder();
  });
}

function initContactForm() {
  const form = document.querySelector('.contact-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Xabaringiz qabul qilindi! Tez orada javob beramiz.');
    form.reset();
  });
}

function initMobileMenu() {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelectorAll('.nav-links a');

  menuToggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('nav-open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (header.classList.contains('nav-open')) {
        header.classList.remove('nav-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

renderMenu(menuItems);
renderOrder();
initFilters();
initCategoryCards();
initCheckout();
initContactForm();
initMobileMenu();
menuGrid.addEventListener('click', handleMenuClick);
orderPreview.addEventListener('click', handleOrderClick);
