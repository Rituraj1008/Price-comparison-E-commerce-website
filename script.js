// Initialize an empty cart and total
let cart = [];
let totalPrice = 0;
const TAX_RATE = 0.18; // 18% tax

// Function to calculate total price including taxes
function calculateTotal() {
  const taxAmount = totalPrice * TAX_RATE;
  const totalWithTax = totalPrice + taxAmount;
  document.getElementById('total').innerText = `Total (with taxes): $${totalWithTax.toFixed(2)}`;
}

// Function to render the cart items
function renderCart() {
  const cartItemsElement = document.getElementById('cart-items');
  cartItemsElement.innerHTML = ''; // Clear the cart display

  cart.forEach((item, index) => {
    const cartItem = document.createElement('li');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <div class="cart-item-content">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <span>$${item.price.toFixed(2)}</span>
        </div>
        <button onclick="removeFromCart(${index})" class="remove-btn">Remove</button>
      </div>
    `;
    cartItemsElement.appendChild(cartItem);
  });

  calculateTotal(); // Recalculate the total price including tax

  // Update cart count in the header
  document.getElementById('cart-count').innerText = cart.length;
}

// Add product to the cart
function addToCart(productElement) {
  const productId = productElement.dataset.id;
  const productName = productElement.dataset.name;
  const productPrice = parseFloat(productElement.dataset.price);
  const productImage = productElement.querySelector('img').src;

  // Check if product is already in the cart
  const existingProduct = cart.find(item => item.id === productId);

  if (!existingProduct) {
    // Add new product to the cart array
    cart.push({
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
    });

    totalPrice += productPrice; // Update the total price
    renderCart(); // Re-render the cart
  } else {
    alert("Product is already in the cart!");
  }
}

// Remove product from the cart
function removeFromCart(index) {
  const product = cart[index];
  totalPrice -= product.price; // Subtract the price of the removed item
  cart.splice(index, 1); // Remove the product from the cart array
  renderCart(); // Re-render the cart
}

// Attach event listeners to the "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.buy-icon'); // Select buy buttons with class 'buy-icon'
addToCartButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const productElement = event.target.closest('.product-cart'); // Get the parent product element
    addToCart(productElement); // Add the product to the cart
  });
});

// Optional: Show cart when clicking on cart icon
document.getElementById('cart-icon').addEventListener('click', () => {
  document.getElementById('cart-section').scrollIntoView({ behavior: 'smooth' });
});
