document.addEventListener("DOMContentLoaded", () => {
  const products = generateProducts(90);

  let cart = [];

  const productList = document.getElementById("product-list");
  const sortSelect = document.getElementById("sort-select");
  const cartItems = document.getElementById("cart-items");
  const cartContainer = document.getElementById("cart-container");

  function generateProducts(count) {
    const productNames = [
      "Room",
      "House",
      "Loudge",
      "Hotels",
      "Flat",
      "Appartment",
    ];
    const products = [];
    for (let i = 0; i < count; i++) {
      const randomName =
        productNames[Math.floor(Math.random() * productNames.length)] +
        " " +
        (i + 1);
      const randomPrice = (Math.random() * 100).toFixed(2);
      const randomRating = (Math.random() * 5).toFixed(1);
      const randomImage = `https://picsum.photos/200/200?random=${i + 1}`;
      products.push({
        id: i + 1,
        name: randomName,
        price: parseFloat(randomPrice),
        image: randomImage,
        rating: parseFloat(randomRating),
        quantity: 1,
      });
    }
    return products;
  }

  function renderProducts(products) {
    productList.innerHTML = "";
    products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.className = "product";
      productElement.innerHTML = `
                <img src="${product.image}" alt="${
        product.name
      }" class="product-image">
                <div class="product-name">${product.name}</div>
                <div class="rating">
                    <span class="rating-stars">${
                      "★".repeat(Math.floor(product.rating)) +
                      "☆".repeat(5 - Math.floor(product.rating))
                    }</span>
                    <span class="rating-number">${product.rating.toFixed(
                      1
                    )}</span>
                </div>
                <div class="price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart">Add to Cart</button>
            `;
      const addToCartButton = productElement.querySelector(".add-to-cart");
      addToCartButton.addEventListener("click", () => addToCart(product));
      productElement.addEventListener("click", () =>
        viewProductDetails(product)
      );
      productList.appendChild(productElement);
    });
  }

  function viewProductDetails(product) {
    localStorage.setItem("product_" + product.id, JSON.stringify(product));
    window.location.href = `product.html?id=${product.id}`;
  }

  function addToCart(product) {
    const existingProduct = cart.find((p) => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product });
    }
    renderCart();
  }

  function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;
    let itemCount = 0;
    cart.forEach((product, index) => {
      itemCount += product.quantity;
      const cartItem = document.createElement("li");
      cartItem.innerHTML = `
                <div class="cart-item-info">
                    <span>${index + 1}. ${
        product.name
      } - $${product.price.toFixed(2)}</span>
                    <div class="quantity-controls">
                        <button onclick="updateCartQuantity(event, ${
                          product.id
                        }, -1)">-</button>
                        <span>${product.quantity}</span>
                        <button onclick="updateCartQuantity(event, ${
                          product.id
                        }, 1)">+</button>
                    </div>
                    <span>$${(product.price * product.quantity).toFixed(
                      2
                    )}</span>
                </div>
            `;
      total += product.price * product.quantity;
      cartItems.appendChild(cartItem);
    });

    const totalElement = document.createElement("div");
    totalElement.className = "cart-total";
    totalElement.innerHTML = `Total: $${total.toFixed(2)}`;
    cartItems.appendChild(totalElement);

    const itemCountElement = document.getElementById("item-count");
    itemCountElement.textContent = itemCount;
  }

  window.updateCartQuantity = function (event, productId, delta) {
    event.stopPropagation();
    const product = cart.find((p) => p.id === productId);
    if (product) {
      product.quantity += delta;
      if (product.quantity <= 0) {
        cart = cart.filter((p) => p.id !== productId);
      }
    }
    renderCart();
  };

  function sortProducts(products, criterion) {
    switch (criterion) {
      case "top-sales":
        return products.slice().sort((a, b) => b.rating - a.rating);
      case "price-low-high":
        return products.slice().sort((a, b) => a.price - b.price);
      case "price-high-low":
        return products.slice().sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  }

  sortSelect.addEventListener("change", (event) => {
    const sortedProducts = sortProducts(products, event.target.value);
    renderProducts(sortedProducts);
  });

  window.toggleCart = function () {
    cartContainer.classList.toggle("show-cart-details");
  };

  window.checkout = function () {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    const location = prompt("Enter your delivery location:");
    const contactNumber = prompt("Enter your contact number:");
    if (location && contactNumber) {
      alert(
        "Order placed successfully!\nDelivery Location: " +
          location +
          "\nContact Number: " +
          contactNumber
      );
      cart = [];
      renderCart();
    } else {
      alert("Please provide both delivery location and contact number.");
    }
  };

  renderProducts(products);
  renderCart();
});
