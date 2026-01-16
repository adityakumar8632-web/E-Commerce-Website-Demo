document.addEventListener("DOMContentLoaded", () => {

/* ---------- STATE ---------- */
const cart = new Map();

  /* ---------- DOM ---------- */
  const cartPanel = document.querySelector(".cart-panel");
  const overlay = document.querySelector(".cart-overlay");
  const to2 = n => Number((Math.round((n + Number.EPSILON) * 100) / 100).toFixed(2));
  
  /* ---------- UI ---------- */
  function opencart() {
    cartPanel.classList.add("open");
    overlay.classList.add("active");
  }
  
  function closecart() {
    cartPanel.classList.remove("open");
    overlay.classList.remove("active");
  }

  /* ---------- RENDER ---------- */
  function createcartItem(product) {
    const item = document.createElement("div");
    item.className = "cart-item";
    item.dataset.id = product.id;
  
    item.innerHTML = `
      <div class="left">
        <img class="cart-item-img" src="${product.image}">
        <div class="cart-item-info">
          <p class="cart-item-title">${product.title}</p>
          <p class="cart-item-price">$${product.price}</p>
        </div>
      </div>
  
      <div class="cart-item-controls">
        <div class="quantity">
          <button class="dec">−</button>
          <span class="qty">1</span>
          <button class="inc">+</button>
        </div>
        <button class="item-remove">remove</button>
      </div>
    `;
  
    return item;
  }  
  
  /* ---------- LOGIC ---------- */
  // Add to cart function
  function addTocart(product) {
    const container = document.getElementById("cart-content");
  
    if (cart.has(product.id)) {
      const item = cart.get(product.id);
      item.qty++;
      updatecartItemUI(item);
    } else {
      const newItem = { ...product, qty: 1 };
      cart.set(product.id, newItem);
      container.appendChild(createcartItem(newItem));
    };
  
    updateBadge();
    updateTotal();
  };

  // cart ui update logic 
  function updatecartItemUI(item) {
    const el = document.querySelector(`[data-id="${item.id}"]`);
    if (!el) return;
  
    el.querySelector(".qty").textContent = item.qty;
    el.querySelector(".cart-item-price").textContent = `$${to2(item.price * item.qty).toFixed(2)}`;
  };

  // badge sync
  function updateTotal() {
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.qty;
    });
  
    document.getElementById("cart-total").textContent = to2(total).toFixed(2);
  };
  
  // clare cart logic
  document.getElementById("clear-cart").addEventListener("click", () => {
    cart.clear();
    document.getElementById("cart-content").innerHTML = "";
    updateBadge();
    updateTotal();
  });
  

  // Quantity Logic
  document.getElementById("cart-content").addEventListener("click", (e) => {
    const itemEl = e.target.closest(".cart-item");
    if (!itemEl) return;
  
    const id = itemEl.dataset.id;
    const item = cart.get(id);
  
    if (e.target.classList.contains("inc")) item.qty++;
    if (e.target.classList.contains("dec")) item.qty--;
  
    if (item.qty <= 0 || e.target.classList.contains("item-remove")) {
      cart.delete(id);
      itemEl.remove();
    } else {
      updatecartItemUI(item);
    }
  
    updateBadge();
    updateTotal();
  });
  
  // face checkout demo
  document.getElementById("checkout-btn").addEventListener("click", () => {
    if (cart.size === 0) {
      alert("Your cart is empty");
      return;
    }
  
    alert("✅ Demo Checkout Successful!\n(No real payment)");
    window.location.href = 'cart.html';
  
    cart.clear();
    document.getElementById("cart-content").innerHTML = "";
    updateBadge();
    updateTotal();
  });
  
  
  // batch logic
  const badge = document.querySelector(".cart-badge");

  function updateBadge() {
    let count = 0;
    cart.forEach(item => count += item.qty);
    badge.textContent = count;
  }

  
  /* ---------- EVENTS (ONE LISTENER) ---------- */
  document.addEventListener("click", (e) => {
  
    /* open cart */
    if (e.target.closest(".icon-btn[aria-label='Cart']")) {
      opencart();
    }
  
    /* close cart */
    if (
      e.target.closest(".cart-close") ||
      e.target.closest(".cart-overlay")
    ) {
      closecart();
    }
  
    /* add to cart */
    const addBtn = e.target.closest(".add-to-cart-btn");
    if (addBtn) {
      e.stopPropagation();
  
      const card = addBtn.closest(".product-card");
      if (!card) return;
  
      const product = {
        id: card.dataset.id,
        title: card.querySelector(".product-title").innerText.trim(),
        price: parseFloat(
          card.querySelector(".product-price").innerText.replace("$", "")
        ),
        image: card.querySelector(".product-image img").src
      };
  
      addTocart(product);
    }

  });

});



  