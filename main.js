// Cart state management
let cart = [];
let totalAmount = 0;

// Page navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// Cart functions
function addToCart(button) {
    const menuItem = button.closest('.menu-item');
    const itemName = menuItem.querySelector('h3').textContent;
    const price = parseFloat(menuItem.querySelector('.price').textContent.replace('$', ''));
    const quantityElement = menuItem.querySelector('.quantity');
    let quantity = parseInt(quantityElement.textContent);
    
    quantity++;
    quantityElement.textContent = quantity;
    
    updateCart(itemName, price, quantity);
}

function removeFromCart(button) {
    const menuItem = button.closest('.menu-item');
    const itemName = menuItem.querySelector('h3').textContent;
    const price = parseFloat(menuItem.querySelector('.price').textContent.replace('$', ''));
    const quantityElement = menuItem.querySelector('.quantity');
    let quantity = parseInt(quantityElement.textContent);
    
    if (quantity > 0) {
        quantity--;
        quantityElement.textContent = quantity;
        updateCart(itemName, price, quantity);
    }
}

function updateCart(itemName, price, quantity) {
    const itemIndex = cart.findIndex(item => item.name === itemName);
    const specialRequest = document.querySelector(`#special-request-${itemName}`).value;
    
    if (quantity === 0 && itemIndex !== -1) {
        cart.splice(itemIndex, 1);
    } else if (itemIndex !== -1) {
        cart[itemIndex].quantity = quantity;
        cart[itemIndex].specialRequest = specialRequest;
    } else if (quantity > 0) {
        cart.push({
            name: itemName,
            price: price,
            quantity: quantity,
            specialRequest: specialRequest
        });
    }
    
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalAmountElement = document.getElementById('total-amount');
    let total = 0;
    
    // Update cart count in nav button
    cartCount.textContent = `(${cart.length})`;
    
    // Clear current cart display
    cartItems.innerHTML = '';
    
    // Add each item to cart display
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartItems.innerHTML += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>Quantity: ${item.quantity}</p>
                <p>Price: $${item.price.toFixed(2)}</p>
                <p>Total: $${itemTotal.toFixed(2)}</p>
                ${item.specialRequest ? `<p>Special Request: ${item.specialRequest}</p>` : ''}
            </div>
        `;
    });
    
    // Update total amount
    totalAmountElement.textContent = total.toFixed(2);
}

// Initialize menu items (example)
function initializeMenuItems() {
    const menuItemsContainer = document.getElementById('menu-items');
    
    // Example menu items - replace with your actual menu items
    const items = [
        { name: 'Burger', price: 9.99, description: 'Classic beef burger' },
        { name: 'Pizza', price: 12.99, description: 'Margherita pizza' },
        // Add more items as needed
    ];
    
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'menu-item';
        itemElement.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p class="price">$${item.price.toFixed(2)}</p>
            <div class="item-controls">
                <button onclick="removeFromCart(this)" class="remove-btn">-</button>
                <span class="quantity">0</span>
                <button onclick="addToCart(this)" class="add-btn">+</button>
            </div>
            <div class="special-request">
                <label for="special-request-${item.name}">Special Request:</label>
                <textarea id="special-request-${item.name}" placeholder="Enter any special requests..."></textarea>
            </div>
        `;
        menuItemsContainer.appendChild(itemElement);
    });
}

// Checkout function
function checkout() {
    // Add your checkout logic here
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Example: Display order summary
    const orderSummary = cart.map(item => 
        `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    alert(`Order Summary:\n${orderSummary}\n\nTotal: $${document.getElementById('total-amount').textContent}`);
    // Add your payment processing logic here
}

// Initialize the app when the document loads
document.addEventListener('DOMContentLoaded', function() {
    initializeMenuItems();
    showPage('menu'); // Or whatever page you want to show first
});