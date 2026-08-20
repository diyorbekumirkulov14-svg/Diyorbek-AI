document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle.querySelector("i");
  const catCards = document.querySelectorAll(".cat-card");
  const navItems = document.querySelectorAll(".nav-item");
  const productsGrid = document.getElementById("productsGrid");
  const searchInput = document.getElementById("searchInput");
  const productCount = document.getElementById("productCount");
  const emptyState = document.getElementById("emptyState");
  const cartCount = document.getElementById("cartCount");
  const navCartCount = document.getElementById("navCartCount");
  const cartModal = document.getElementById("cartModal");
  const cartItems = document.getElementById("cartItems");
  const cartEmpty = document.getElementById("cartEmpty");
  const cartSummary = document.getElementById("cartSummary");
  const cartTotalPrice = document.getElementById("cartTotalPrice");
  const orderButton = document.getElementById("orderButton");
  const orderSuccess = document.getElementById("orderSuccess");
  const orderNumber = document.getElementById("orderNumber");
  const downloadReceipt = document.getElementById("downloadReceipt");
  const shareReceipt = document.getElementById("shareReceipt");
  const shareStatus = document.getElementById("shareStatus");
  let selectedCategory = "all";
  let cartTotal = 0;
  const cartItemsList = [];

  const products = [
    { name: "Qulupnayli konus", description: "Qulupnay va qaymoqli", prices: [15000, 18000, 23000], category: "cone", visual: "visual-1", type: "cone", color: "#ffb5b0" },
    { name: "Vanilli konus", description: "Klassik vanil ta'mi", prices: [13000, 16000, 21000], category: "cone", visual: "visual-2", type: "cone", color: "#fff0c5" },
    { name: "Pista kremi", description: "Yumshoq pista kremi", prices: [18000, 22000, 28000], category: "cup", visual: "visual-3", type: "cup", color: "#bde8d7" },
    { name: "Shokoladli tort", description: "4 kishilik muzqaymoqli tort", prices: [60000, 75000, 95000], category: "cake", visual: "visual-4", type: "cup", color: "#d4b7eb" },
    { name: "Malinali bulut", description: "Malina va oq shokolad", prices: [16000, 20000, 25000], category: "cup", visual: "visual-5", type: "cup", color: "#ffb7ca" },
    { name: "Karamelli konus", description: "Karamel va yong'oq", prices: [16000, 19000, 24000], category: "cone", visual: "visual-6", type: "cone", color: "#f2c37a" }
  ];

  function renderProducts() {
    const query = searchInput.value.toLowerCase().trim();
    const filtered = products.filter((product) => (selectedCategory === "all" || product.category === selectedCategory) && product.name.toLowerCase().includes(query));
    productsGrid.innerHTML = filtered.map((product) => `<article class="product-card"><div class="product-visual ${product.visual}"><button class="favorite" aria-label="Sevimlilarga qo'shish"><i class="fa-regular fa-heart"></i></button>${product.type === "cone" ? `<div class="dessert"><span class="scoop" style="background:${product.color}"></span><span class="cone"></span><span class="fun-topping"><i></i><i></i></span></div>` : `<div class="cup" style="background:${product.color}"><span class="fun-topping"><i></i><i></i></span></div>`}</div><div class="product-info"><h4>${product.name}</h4><p>${product.description}</p><div class="size-label">Hajmini tanlang</div><div class="size-options">${["Kichik", "O'rta", "Katta"].map((size, index) => `<button class="size-btn${index === 1 ? " active" : ""}" data-size="${index}" data-prices="${product.prices.join(",")}">${size}</button>`).join("")}</div><div class="product-bottom"><span class="price">${product.prices[1].toLocaleString("uz-UZ")} so'm</span><button class="add-btn" aria-label="Savatga qo'shish" data-product="${product.name}"><i class="fa-solid fa-plus"></i></button></div></div></article>`).join("");
    productCount.textContent = `${filtered.length} ta mahsulot`;
    emptyState.hidden = filtered.length > 0;
    productsGrid.querySelectorAll(".add-btn").forEach((button) => button.addEventListener("click", () => { const card = button.closest(".product-card"); const selectedSize = card.querySelector(".size-btn.active"); const price = Number(selectedSize.dataset.prices.split(",")[selectedSize.dataset.size]); cartItemsList.push({ name: button.dataset.product, size: selectedSize.textContent, price }); cartTotal += 1; cartCount.textContent = cartTotal; navCartCount.textContent = cartTotal; button.innerHTML = '<i class="fa-solid fa-check"></i>'; }));
    productsGrid.querySelectorAll(".favorite").forEach((button) => button.addEventListener("click", () => { button.classList.toggle("active"); button.innerHTML = button.classList.contains("active") ? '<i class="fa-solid fa-heart"></i>' : '<i class="fa-regular fa-heart"></i>'; }));
    productsGrid.querySelectorAll(".size-btn").forEach((button) => button.addEventListener("click", () => { const options = button.parentElement; options.querySelectorAll(".size-btn").forEach((sizeButton) => sizeButton.classList.remove("active")); button.classList.add("active"); const prices = button.dataset.prices.split(","); button.closest(".product-info").querySelector(".price").textContent = `${Number(prices[button.dataset.size]).toLocaleString("uz-UZ")} so'm`; }));
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    
    if (document.body.classList.contains("dark-mode")) {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    } else {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    }
  });

  catCards.forEach((card) => {
    card.addEventListener("click", () => {
      catCards.forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
      selectedCategory = card.dataset.category;
      renderProducts();
    });
  });

  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      navItems.forEach((n) => n.classList.remove("active"));
      item.classList.add("active");
    });
  });
  searchInput.addEventListener("input", renderProducts);
  function openCart() {
    cartModal.hidden = false;
    orderSuccess.hidden = true;
    renderCart();
  }

  function renderCart() {
    cartItems.innerHTML = cartItemsList.map((item, index) => `<div class="cart-item"><span class="cart-item-number">${index + 1}</span><div><strong>${item.name}</strong><small>${item.size} hajm</small></div><b>${item.price.toLocaleString("uz-UZ")} so'm</b></div>`).join("");
    cartEmpty.hidden = cartItemsList.length > 0;
    cartSummary.hidden = cartItemsList.length === 0;
    orderButton.hidden = cartItemsList.length === 0;
    cartTotalPrice.textContent = `${cartItemsList.reduce((sum, item) => sum + item.price, 0).toLocaleString("uz-UZ")} so'm`;
  }

  document.getElementById("cartButton").addEventListener("click", openCart);
  document.getElementById("navCart").addEventListener("click", (event) => { event.preventDefault(); openCart(); });
  document.getElementById("closeCart").addEventListener("click", () => { cartModal.hidden = true; });
  cartModal.addEventListener("click", (event) => { if (event.target === cartModal) cartModal.hidden = true; });
  orderButton.addEventListener("click", () => { orderSuccess.hidden = false; orderButton.hidden = true; orderNumber.textContent = `Buyurtma raqami: #${Date.now().toString().slice(-6)}`; });
  function createReceipt() {
    const canvas = document.createElement("canvas");
    canvas.width = 900;
    canvas.height = 620;
    const context = canvas.getContext("2d");
    context.fillStyle = "#fff9f2";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#ef6f51";
    context.fillRect(0, 0, canvas.width, 115);
    context.fillStyle = "#ffffff";
    context.font = "bold 38px Trebuchet MS, sans-serif";
    context.fillText("Diyorbek Ice Cream", 48, 70);
    context.fillStyle = "#30231d";
    context.font = "bold 30px Trebuchet MS, sans-serif";
    context.fillText("Buyurtma cheki", 48, 175);
    context.font = "22px Trebuchet MS, sans-serif";
    context.fillStyle = "#8e7567";
    context.fillText(orderNumber.textContent, 48, 215);
    cartItemsList.forEach((item, index) => { const y = 275 + index * 48; context.fillStyle = "#30231d"; context.font = "22px Trebuchet MS, sans-serif"; context.fillText(`${item.name} - ${item.size}`, 48, y); context.textAlign = "right"; context.fillText(`${item.price.toLocaleString("uz-UZ")} so'm`, 850, y); context.textAlign = "left"; });
    context.strokeStyle = "#d9c8bb";
    context.beginPath();
    context.moveTo(48, 305 + cartItemsList.length * 48);
    context.lineTo(850, 305 + cartItemsList.length * 48);
    context.stroke();
    context.fillStyle = "#d84d39";
    context.font = "bold 28px Trebuchet MS, sans-serif";
    context.fillText(`Jami: ${cartItemsList.reduce((sum, item) => sum + item.price, 0).toLocaleString("uz-UZ")} so'm`, 48, 365 + cartItemsList.length * 48);
    context.fillStyle = "#286653";
    context.font = "20px Trebuchet MS, sans-serif";
    context.fillText("Skrinshotni Diyor_bek_14.12 profiliga yuboring", 48, 440 + cartItemsList.length * 48);
    return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
  }

  downloadReceipt.addEventListener("click", async () => { const blob = await createReceipt(); const link = document.createElement("a"); link.download = "Diyorbek-buyurtma-cheki.png"; link.href = URL.createObjectURL(blob); link.click(); URL.revokeObjectURL(link.href); shareStatus.textContent = "Chek skrinshoti yuklandi."; });
  shareReceipt.addEventListener("click", async () => { const blob = await createReceipt(); const file = new File([blob], "Diyorbek-buyurtma-cheki.png", { type: "image/png" }); const message = `Buyurtma cheki. Skrinshot va to'lovni Diyor_bek_14.12 profil egasiga yuboring.`; if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ text: message, files: [file] }); shareStatus.textContent = "Ulashish oynasi ochildi."; } else { const link = document.createElement("a"); link.download = file.name; link.href = URL.createObjectURL(blob); link.click(); URL.revokeObjectURL(link.href); shareStatus.textContent = "Skrinshot yuklandi. Uni Diyor_bek_14.12 profiliga yuboring."; } });
  document.getElementById("offerButton").addEventListener("click", () => { selectedCategory = "cone"; catCards.forEach((card) => card.classList.toggle("active", card.dataset.category === "cone")); renderProducts(); document.getElementById("productsGrid").scrollIntoView({ behavior: "smooth" }); });
  renderProducts();
});