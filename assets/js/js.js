document.addEventListener("DOMContentLoaded", () => {
  checkCartPageAndDisplay();
  setUpAddToCartButtons();
  performWelcomeAnimationIfNeeded();
});

function checkCartPageAndDisplay() {
  if (window.location.pathname.includes("cart.html")) {
    displayCart();
  }
}

function setUpAddToCartButtons() {
  const addToCartButtons = document.querySelectorAll(".btn-custom");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const productName = button.getAttribute("data-product");
      const productPrice = parseFloat(
        button.getAttribute("data-price").replace("$", "")
      );
      addToCart(productName, productPrice);
    });
  });
}

function performWelcomeAnimationIfNeeded() {
  if (!localStorage.getItem("welcomeAnimationShown")) {
    const logo = document.querySelector(".central-logo");
    if (logo) {
      logo.style.animation = "logoEntrance 2.5s ease forwards";
      localStorage.setItem("welcomeAnimationShown", "true");
    }
  }
}

function addToCart(productName, productPrice) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let productExists = cart.find((product) => product.name === productName);

  if (productExists) {
    productExists.quantity++;
  } else {
    cart.push({ name: productName, price: productPrice, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${productName} added to cart.`);
  if (window.location.pathname.includes("cart.html")) {
    displayCart();
  }
}

function displayCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartList = document.getElementById("cartList");
  let subtotal = 0;

  cartList.innerHTML = "";
  cart.forEach((item, index) => {
    let totalItemPrice = item.price * item.quantity;
    subtotal += totalItemPrice;

    let row = document.createElement("tr");
    row.innerHTML = `
      <th scope="row">${index + 1}</th>
      <td>${item.name}</td>
      <td>Descripción del producto aquí</td> <!-- Puedes añadir una descripción si la tienes -->
      <td>$${item.price.toFixed(2)}</td>
      <td>${item.quantity}</td>
      <td>$${totalItemPrice.toFixed(2)}</td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="removeFromCart('${
          item.name
        }')">Remove</button>
      </td>
    `;
    cartList.appendChild(row);
  });

  document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("total").textContent = `$${subtotal.toFixed(2)}`;
}

function removeFromCart(productName) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let productIndex = cart.findIndex((product) => product.name === productName);

  if (productIndex !== -1) {
    if (cart[productIndex].quantity > 1) {
      cart[productIndex].quantity--;
    } else {
      cart.splice(productIndex, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
  }
}
