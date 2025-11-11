// Replace checkoutBtn.onclick
checkoutBtn.onclick = () => {
  if (cart.length === 0) return;
  document.getElementById("checkout-modal").style.display = "block";
};

// Close modal
document.getElementById("close-modal").onclick = () => {
  document.getElementById("checkout-modal").style.display = "none";
};

// Submit email
document.getElementById("submit-email").onclick = () => {
  const email = document.getElementById("bot-email").value.trim();
  if (!email) return alert("Email required!");

  logToWebhook('fake_checkout_with_email', {
    email,
    cart: cart.join(", "),
    ip: 'BOT_IP'
  });

  // For humans: redirect to real Printify
  if (email.includes("@gmail.com") || email.includes("@yahoo.com")) {
    alert("Human detected! Redirecting to real store...");
    window.location.href = "https://abookmark.printify.me";
  } else {
    alert("Order confirmed! (Fake) 😘 Check your email.");
  }

  document.getElementById("checkout-modal").style.display = "none";
  cart = [];
  updateCart();
};
