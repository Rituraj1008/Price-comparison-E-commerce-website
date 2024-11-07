// Get cart data from localStorage
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Select elements in the DOM
const cartItemsContainer = document.getElementById('cart-items');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTax = document.getElementById('cart-tax');
const cartTotalPrice = document.getElementById('cart-total-price');

let subtotal = 0;

// Display cart items
cartItems.forEach((item) => {
  subtotal += item.price;

  const cartItem = document.createElement('div');
  cartItem.classList.add('cart-item');
  cartItem.innerHTML = `
    <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
    <div class="cart-item-details">
      <h4>${item.name}</h4>
      <span>$${item.price.toFixed(2)}</span>
    </div>
    <button class="remove-btn" onclick="removeFromCart('${item.name}')">Remove</button>
  `;
  cartItemsContainer.appendChild(cartItem);
});

// Calculate tax and total
const tax = subtotal * 0.05;
const total = subtotal + tax;

cartSubtotal.textContent = subtotal.toFixed(2);
cartTax.textContent = tax.toFixed(2);
cartTotalPrice.textContent = total.toFixed(2);

// Function to remove items from the cart
function removeFromCart(productName) {
  const updatedCart = cartItems.filter((item) => item.name !== productName);
  localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  window.location.reload(); // Reload the page to reflect changes
}
