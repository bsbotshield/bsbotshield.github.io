// Fake cart logic
let cart = [];
const countEl = document.getElementById("count");
const itemsEl = document.getElementById("items");
const checkoutBtn = document.getElementById("checkout");

// Add to fake cart
document.querySelectorAll(".add").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent redirect
    const product = btn.closest(".product");
    const name = product.querySelector("h3").innerText;
    cart.push(name);
    updateCart();
    logAction("add_to_cart", name);
  });
});

// Click product → real Printify
document.querySelectorAll(".product").forEach(prod => {
  prod.addEventListener("click", (e) => {
    if (!e.target.closest("button")) {
      const url = prod.dataset.url;
      logAction("redirect", url);
      setTimeout(() => window.location.href = url, 300); // Delay for log
    }
  });
});

// Update fake cart
function updateCart() {
  countEl.innerText = cart.length;
  itemsEl.innerHTML = cart.map(item => `<li>${item}</li>`).join("");
  checkoutBtn.disabled = cart.length === 0;
  checkoutBtn.onclick = () => {
    logAction("fake_checkout", cart.join(", "));
    alert("This is a FAKE cart! Real checkout on Printify.");
  };
}

// Log to webhook
function logAction(action, data) {
  fetch('https://your-webhook.com/log.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action,
      data,
      ua: navigator.userAgent,
      ip: 'BOT_IP',
      time: new Date().toISOString(),
      page: window.location.href
    })
  });
}
