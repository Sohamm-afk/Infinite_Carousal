
const track = document.getElementById("carouselTrack");

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    originalPrice: 4999,
    discountedPrice: 3499,
    rating: 4.5
  },
  {
    id: 2,
    name: "Smart Watch",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    originalPrice: 5999,
    discountedPrice: 4299,
    rating: 4.2
  },
  {
    id: 3,
    name: "Running Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    originalPrice: 3999,
    discountedPrice: 2799,
    rating: 4.7
  },
  {
    id: 4,
    name: "Classic Backpack",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    originalPrice: 2499,
    discountedPrice: 1799,
    rating: 4.3
  },
  {
    id: 5,
    name: "Sunglasses",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
    originalPrice: 1999,
    discountedPrice: 1299,
    rating: 4.1
  },
  {
    id: 6,
    name: "Camera",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    originalPrice: 24999,
    discountedPrice: 19999,
    rating: 4.8
  },
  {
    id: 7,
    name: "Travel Bottle",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
    originalPrice: 999,
    discountedPrice: 699,
    rating: 4.0
  },
  {
    id: 8,
    name: "Mechanical Keyboard",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    originalPrice: 4999,
    discountedPrice: 3599,
    rating: 4.6
  }
];

function calculateDiscount(originalPrice, discountedPrice) {
  return Math.round(
    ((originalPrice - discountedPrice) / originalPrice) * 100
  );
}

console.log(calculateDiscount(4999, 3499));

function createProductCard(product) {
  const discount = calculateDiscount(
    product.originalPrice,
    product.discountedPrice
  );

  const card = document.createElement("article");
  card.className = "product-card";

  card.innerHTML = `
    <div class="product-card-inner">

      <div class="product-image-wrapper">
        <img
          class="product-image"
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >

        <span class="discount-badge">
          ${discount}% OFF
        </span>

        <button
          class="wishlist-btn"
          type="button"
          aria-label="Add ${product.name} to wishlist"
          aria-pressed="false"
        >
          ♡
        </button>
      </div>

      <div class="product-info">
        <h2 class="product-name">${product.name}</h2>

        <div
          class="product-rating"
          aria-label="Rated ${product.rating} out of 5"
        >
          ★★★★★
          <span>(${product.rating})</span>
        </div>

        <div class="product-prices">
          <span class="original-price">
            ₹${product.originalPrice.toLocaleString("en-IN")}
          </span>

          <span class="discounted-price">
            ₹${product.discountedPrice.toLocaleString("en-IN")}
          </span>
        </div>

        <button
          class="add-to-cart"
          type="button"
          data-product-id="${product.id}"
        >
          Add to Cart
        </button>
      </div>

    </div>
  `;

  return card;
}

function renderProducts() {
  track.innerHTML = "";

  products.forEach(function (product) {
    const card = createProductCard(product);
    track.appendChild(card);
  });
}

renderProducts();

let currentIndex = 0;
let visibleCards = getVisibleCards();

function getVisibleCards() {
  if (window.innerWidth <= 560) {
    return 1;
  }

  if (window.innerWidth <= 900) {
    return 2;
  }

  return 4;
}

const dotsContainer = document.getElementById("carouselDots");

function updateCarousel() {
  const maxIndex = Math.max(
    0,
    products.length - visibleCards
  );

  currentIndex = Math.max(
    0,
    Math.min(currentIndex, maxIndex)
  );

  const firstCard = track.querySelector(".product-card");

  if (!firstCard) return;

  const cardWidth = firstCard.getBoundingClientRect().width;

  const trackStyles = window.getComputedStyle(track);
  const gap = parseFloat(trackStyles.gap) || 0;

  track.style.transform =
    `translateX(-${currentIndex * (cardWidth + gap)}px)`;

  const dots = dotsContainer.querySelectorAll(".carousel-dot");

  dots.forEach((dot, index) => {
    const active = index === currentIndex;

    dot.classList.toggle("active", active);
    dot.setAttribute("aria-current", String(active));
  });
}

function renderDots() {
  dotsContainer.innerHTML = "";

  const maxIndex = Math.max(
    0,
    products.length - visibleCards
  );

  for (let i = 0; i <= maxIndex; i++) {
    const dot = document.createElement("button");

    dot.className = "carousel-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);

    dot.addEventListener("click", () => {
      currentIndex = i;
      updateCarousel();
      resetAutoplay();
    });

    dotsContainer.appendChild(dot);
  }
}

renderDots();
updateCarousel();




const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function nextSlide() {
  const maxIndex = Math.max(
    0,
    products.length - visibleCards
  );

  if (currentIndex >= maxIndex) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }

  updateCarousel();
  resetAutoplay();
}

function prevSlide() {
  const maxIndex = Math.max(
    0,
    products.length - visibleCards
  );

  if (currentIndex <= 0) {
    currentIndex = maxIndex;
  } else {
    currentIndex--;
  }

  updateCarousel();
  resetAutoplay();
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

updateCarousel();

const carousel = document.getElementById("productCarousel");
const playPauseBtn = document.getElementById("playPauseBtn");

let autoplayTimer = null;
let isPlaying = true;
let isHovered = false;

const progressBar = document.getElementById("progressBar");
const progressTrack = document.querySelector(".progress-track");

/** Autoplay interval in milliseconds (3 seconds) */
const autoplayDuration = 3000;

function stopProgressBar() {
  progressBar.classList.remove("animating");
}

function stopAutoplay() {
  if (autoplayTimer !== null) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }

  stopProgressBar();
}

function startAutoplay() {
  stopAutoplay();

  if (!isPlaying || isHovered) {
    progressBar.style.transform = `scaleX(0)`;
    progressBar.classList.remove("animating");
    return;
  }

  progressBar.style.transform = `scaleX(0)`;
  progressBar.classList.add("animating");

  autoplayTimer = setInterval(() => {
    nextSlide();
  }, autoplayDuration);
}

function resetAutoplay() {
  startAutoplay();
}




function updatePlayPauseButton() {
  playPauseBtn.textContent = isPlaying ? "Pause" : "Play";

  playPauseBtn.setAttribute(
    "aria-label",
    isPlaying ? "Pause autoplay" : "Resume autoplay"
  );
}

playPauseBtn.addEventListener("click", () => {
  isPlaying = !isPlaying;

  updatePlayPauseButton();

  if (isPlaying) {
    startAutoplay();
  } else {
    stopAutoplay();
  }
});

carousel.addEventListener("mouseenter", () => {
  isHovered = true;
  stopAutoplay();
});

carousel.addEventListener("mouseleave", () => {
  isHovered = false;

  if (isPlaying) {
    startAutoplay();
  }
});

updatePlayPauseButton();
startAutoplay();


window.addEventListener("resize", () => {
  const newVisibleCards = getVisibleCards();

  if (newVisibleCards !== visibleCards) {
    visibleCards = newVisibleCards;

    currentIndex = Math.min(
      currentIndex,
      Math.max(0, products.length - visibleCards)
    );

    renderDots();
  }

  updateCarousel();
});

carousel.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    event.preventDefault();
    nextSlide();
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    prevSlide();
  }
});

let touchStartX = 0;
let touchStartY = 0;

const swipeThreshold = 50;

const viewport = document.querySelector(".carousel-viewport");

viewport.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
  touchStartY = event.changedTouches[0].screenY;
}, { passive: true });

viewport.addEventListener("touchend", (event) => {
  const touchEndX = event.changedTouches[0].screenX;
  const touchEndY = event.changedTouches[0].screenY;

  const distanceX = touchEndX - touchStartX;
  const distanceY = touchEndY - touchStartY;

  // Ignore vertical scrolling.
  if (Math.abs(distanceY) > Math.abs(distanceX)) {
    return;
  }

  // Ignore tiny movements.
  if (Math.abs(distanceX) < swipeThreshold) {
    return;
  }

  if (distanceX < 0) {
    nextSlide();
  } else {
    prevSlide();
  }
}, { passive: true });

const toast = document.getElementById("toast");

let toastTimer = null;


function showToast(message) {
  toast.textContent = message;

  toast.classList.add("visible");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("visible");
  }, 2500);
}



track.addEventListener("click", (event) => {
  const cartButton = event.target.closest(".add-to-cart");

  // Ignore clicks that aren't on an Add to Cart button.
  if (!cartButton) return;

  const productId = Number(cartButton.dataset.productId);

  const product = products.find((item) => item.id === productId);

  if (!product) return;

  // Get the current quantity of this product.
  const currentQuantity = cart.get(productId) || 0;

  // Increase the quantity by one.
  cart.set(productId, currentQuantity + 1);

  // Update the cart count and total price.
  updateCartCount();

  // Show confirmation.
  showToast(`${product.name} added to cart!`);
});

const wishlist = new Set();

track.addEventListener("click", (event) => {
  const wishlistButton = event.target.closest(".wishlist-btn");

  if (!wishlistButton) return;

  const card = wishlistButton.closest(".product-card");
  const cartButton = card.querySelector(".add-to-cart");
  const productId = Number(cartButton.dataset.productId);

  if (wishlist.has(productId)) {
    wishlist.delete(productId);
    wishlistButton.textContent = "♡";
    wishlistButton.setAttribute("aria-pressed", "false");
    wishlistButton.setAttribute(
      "aria-label",
      `Add ${products.find(p => p.id === productId).name} to wishlist`
    );

    showToast("Removed from wishlist");
  } else {
    wishlist.add(productId);
    wishlistButton.textContent = "♥";
    wishlistButton.setAttribute("aria-pressed", "true");
    wishlistButton.setAttribute(
      "aria-label",
      `Remove ${products.find(p => p.id === productId).name} from wishlist`
    );

    showToast("Added to wishlist");
  }
});


const cart = new Map();

const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

function updateCartCount() {
  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach((quantity, productId) => {
    const product = products.find(
      (item) => item.id === productId
    );

    if (!product) return;

    totalItems += quantity;
    totalPrice += product.discountedPrice * quantity;
  });

  cartCount.textContent = totalItems;
  cartTotal.textContent = totalPrice.toLocaleString("en-IN");
  panelCartTotal.textContent = totalPrice.toLocaleString("en-IN");
}



const cartPanel = document.getElementById("cartPanel");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartItemsContainer = document.getElementById("cartItems");
const panelCartTotal = document.getElementById("panelCartTotal");
const clearCartBtn = document.getElementById("clearCartBtn");

const cartToggleBtn = document.querySelector(".cart-summary .cart-button");

cartToggleBtn.addEventListener("click", () => {
  cartPanel.hidden = !cartPanel.hidden;

  if (!cartPanel.hidden) {
    renderCartItems();
  }
});

closeCartBtn.addEventListener("click", () => {
  cartPanel.hidden = true;
});


function renderCartItems() {
  cartItemsContainer.innerHTML = "";

  if (cart.size === 0) {
    cartItemsContainer.innerHTML =
      '<p class="empty-cart-message">Your cart is empty. Add some products!</p>';

    panelCartTotal.textContent = "0";
    updateCartCount();
    return;
  }

  let subtotal = 0;

  cart.forEach((quantity, productId) => {
    const product = products.find(
      (item) => item.id === productId
    );

    if (!product) return;

    const itemTotal = product.discountedPrice * quantity;
    subtotal += itemTotal;

    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";

    const itemInfo = document.createElement("div");
    itemInfo.className = "cart-item-info";

    const name = document.createElement("h3");
    name.textContent = product.name;

    const price = document.createElement("p");
    price.textContent =
      `₹${product.discountedPrice.toLocaleString("en-IN")} each`;

    const itemSubtotal = document.createElement("strong");
    itemSubtotal.textContent =
      `₹${itemTotal.toLocaleString("en-IN")}`;

    const quantityControls = document.createElement("div");
    quantityControls.className = "quantity-controls";

    const decreaseButton = document.createElement("button");
    decreaseButton.type = "button";
    decreaseButton.textContent = "−";
    decreaseButton.className = "quantity-btn";
    decreaseButton.dataset.action = "decrease";
    decreaseButton.dataset.productId = productId;
    decreaseButton.setAttribute("aria-label", `Decrease ${product.name} quantity`);

    const quantityText = document.createElement("span");
    quantityText.textContent = quantity;

    const increaseButton = document.createElement("button");
    increaseButton.type = "button";
    increaseButton.textContent = "+";
    increaseButton.className = "quantity-btn";
    increaseButton.dataset.action = "increase";
    increaseButton.dataset.productId = productId;
    increaseButton.setAttribute("aria-label", `Increase ${product.name} quantity`);

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Remove";
    removeButton.className = "remove-cart-item";
    removeButton.dataset.action = "remove";
    removeButton.dataset.productId = productId;

    itemInfo.append(name, price, itemSubtotal);
    quantityControls.append(
      decreaseButton,
      quantityText,
      increaseButton
    );

    itemElement.append(itemInfo, quantityControls, removeButton);
    cartItemsContainer.appendChild(itemElement);
  });

  panelCartTotal.textContent = subtotal.toLocaleString("en-IN");
  updateCartCount();
}

cartItemsContainer.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");

  if (!button) return;

  const productId = Number(button.dataset.productId);
  const action = button.dataset.action;
  const currentQuantity = cart.get(productId);

  if (currentQuantity === undefined) return;

  if (action === "increase") {
    cart.set(productId, currentQuantity + 1);
  } else if (action === "decrease") {
    if (currentQuantity <= 1) {
      cart.delete(productId);
    } else {
      cart.set(productId, currentQuantity - 1);
    }
  } else if (action === "remove") {
    cart.delete(productId);
  }

  renderCartItems();
});

// Clear the entire cart
clearCartBtn.addEventListener("click", () => {
  cart.clear();
  renderCartItems();
  showToast("Cart cleared");
});
