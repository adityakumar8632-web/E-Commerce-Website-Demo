// checkout.js - Checkout page functionality

// Initialize checkout on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeCheckout();
});

// Initialize checkout functionality
function initializeCheckout() {
    loadCartItems();
    setupFormValidation();
    setupPaymentMethodToggle();
    setupCouponApplication();
    setupCheckoutButton();
    calculateOrderTotal();
}

// Load cart items from localStorage
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        showEmptyCartState();
        return;
    }
    
    renderOrderSummary(cart);
}

// Show empty cart state
function showEmptyCartState() {
    const checkoutContainer = document.querySelector('.checkout-container');
    checkoutContainer.innerHTML = `
        <div class="empty-state">
            <svg class="empty-state-icon" data-lucide="shopping-cart" width="120" height="120"></svg>
            <h2>Your cart is empty</h2>
            <p>Browse our products to start shopping</p>
            <a href="index.html" class="browse-btn">
                <i data-lucide="arrow-left" width="20" height="20"></i>
                Browse Products
            </a>
        </div>
    `;
    lucide.createIcons();
}

// Render order summary with cart items
function renderOrderSummary(cart) {
    const summaryContainer = document.querySelector('.order-summary .summary-card');
    
    if (!summaryContainer) return;
    
    let productItemsHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        if (!item || !item.price || !item.quantity) return;
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        productItemsHTML += `
            <div class="product-item">
                <img src="${item.image}" alt="${item.name}" class="product-image">
                <div class="product-details">
                    <div class="product-name">${item.name}</div>
                    <div class="product-quantity">Qty: ${item.quantity}</div>
                    <div class="product-price">$${itemTotal.toFixed(2)}</div>
                </div>
            </div>
        `;
    });
    
    const shipping = 15.00;
    const taxRate = 0.08;
    const tax = subtotal * taxRate;
    const total = subtotal + shipping + tax;
    
    // Store totals for later use
    window.orderTotals = { subtotal, shipping, tax, total };
    
    summaryContainer.innerHTML = `
        <h2 class="summary-title">Order Summary</h2>
        ${productItemsHTML}
        <div class="coupon-section">
            <div class="coupon-input">
                <input type="text" id="coupon-code" placeholder="Enter coupon code">
                <button class="apply-btn" id="apply-coupon-btn">Apply</button>
            </div>
            <div id="coupon-message" style="margin-top: 0.5rem; font-size: 0.9rem;"></div>
        </div>
        <div class="price-breakdown">
            <div class="price-row">
                <span>Subtotal</span>
                <span id="subtotal-amount">$${subtotal.toFixed(2)}</span>
            </div>
            <div class="price-row">
                <span>Shipping</span>
                <span id="shipping-amount">$${shipping.toFixed(2)}</span>
            </div>
            <div class="price-row">
                <span>Tax</span>
                <span id="tax-amount">$${tax.toFixed(2)}</span>
            </div>
            <div class="price-row" id="discount-row" style="display: none; color: var(--color-primary);">
                <span>Discount</span>
                <span id="discount-amount">-$0.00</span>
            </div>
            <div class="price-row total">
                <span>Total</span>
                <span id="total-amount">$${total.toFixed(2)}</span>
            </div>
        </div>
        <button class="checkout-btn" id="complete-order-btn">
            <i data-lucide="lock" width="20" height="20"></i>
            Complete Order
        </button>
    `;
    
    lucide.createIcons();
    setupCouponApplication();
    setupCheckoutButton();
}

// Setup form validation
function setupFormValidation() {
    const form = document.querySelector('.checkout-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('.form-input');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
}

// Validate individual field
function validateField(input) {
    const value = input.value.trim();
    const type = input.type;
    
    let isValid = true;
    let errorMessage = '';
    
    if (!value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (type === 'email' && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email';
    } else if (type === 'tel' && !isValidPhone(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
    }
    
    if (!isValid) {
        input.classList.add('error');
        input.style.borderColor = '#e74c3c';
        showFieldError(input, errorMessage);
    } else {
        input.classList.remove('error');
        input.style.borderColor = '';
        removeFieldError(input);
    }
    
    return isValid;
}

// Show field error message
function showFieldError(input, message) {
    removeFieldError(input);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.85rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    input.parentElement.parentElement.appendChild(errorDiv);
}

// Remove field error message
function removeFieldError(input) {
    const existingError = input.parentElement.parentElement.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation
function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Setup payment method toggle
function setupPaymentMethodToggle() {
    const paymentOptions = document.querySelectorAll('.payment-option input[type="radio"]');
    const cardDetails = document.querySelector('.card-details');
    
    if (!cardDetails) return;
    
    paymentOptions.forEach(option => {
        option.addEventListener('change', (e) => {
            const selectedMethod = e.target.parentElement.querySelector('.payment-label').textContent;
            
            if (selectedMethod === 'Credit Card') {
                cardDetails.style.display = 'grid';
            } else {
                cardDetails.style.display = 'none';
            }
        });
    });
}

// Setup coupon application
function setupCouponApplication() {
    const applyBtn = document.getElementById('apply-coupon-btn');
    const couponInput = document.getElementById('coupon-code');
    
    if (!applyBtn || !couponInput) return;
    
    applyBtn.addEventListener('click', () => applyCoupon());
    couponInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            applyCoupon();
        }
    });
}

// Apply coupon code
function applyCoupon() {
    const couponInput = document.getElementById('coupon-code');
    const couponMessage = document.getElementById('coupon-message');
    const code = couponInput.value.trim().toUpperCase();
    
    // Sample coupon codes
    const validCoupons = {
        'SAVE10': { type: 'percentage', value: 10, description: '10% off' },
        'SAVE20': { type: 'percentage', value: 20, description: '20% off' },
        'WELCOME': { type: 'fixed', value: 25, description: '$25 off' },
        'FREESHIP': { type: 'shipping', value: 0, description: 'Free shipping' }
    };
    
    if (!code) {
        showCouponMessage('Please enter a coupon code', 'error');
        return;
    }
    
    if (validCoupons[code]) {
        applyCouponDiscount(validCoupons[code]);
        showCouponMessage(`Coupon applied: ${validCoupons[code].description}`, 'success');
        couponInput.value = '';
        couponInput.disabled = true;
        document.getElementById('apply-coupon-btn').textContent = 'Applied';
        document.getElementById('apply-coupon-btn').disabled = true;
    } else {
        showCouponMessage('Invalid coupon code', 'error');
    }
}

// Show coupon message
function showCouponMessage(message, type) {
    const couponMessage = document.getElementById('coupon-message');
    couponMessage.textContent = message;
    couponMessage.style.color = type === 'success' ? 'var(--color-primary)' : '#e74c3c';
}

// Apply coupon discount
function applyCouponDiscount(coupon) {
    const { subtotal, shipping, tax } = window.orderTotals;
    let discount = 0;
    let newShipping = shipping;
    
    if (coupon.type === 'percentage') {
        discount = subtotal * (coupon.value / 100);
    } else if (coupon.type === 'fixed') {
        discount = coupon.value;
    } else if (coupon.type === 'shipping') {
        discount = shipping;
        newShipping = 0;
    }
    
    const newSubtotal = Math.max(0, subtotal - (coupon.type !== 'shipping' ? discount : 0));
    const newTax = newSubtotal * 0.08;
    const newTotal = newSubtotal + newShipping + newTax;
    
    // Update UI
    document.getElementById('subtotal-amount').textContent = `$${newSubtotal.toFixed(2)}`;
    document.getElementById('shipping-amount').textContent = `$${newShipping.toFixed(2)}`;
    document.getElementById('tax-amount').textContent = `$${newTax.toFixed(2)}`;
    document.getElementById('total-amount').textContent = `$${newTotal.toFixed(2)}`;
    
    const discountRow = document.getElementById('discount-row');
    if (discount > 0) {
        discountRow.style.display = 'flex';
        document.getElementById('discount-amount').textContent = `-$${discount.toFixed(2)}`;
    }
    
    window.orderTotals = { subtotal: newSubtotal, shipping: newShipping, tax: newTax, total: newTotal };
}

// Calculate order total
function calculateOrderTotal() {
    // Already calculated in renderOrderSummary
}

// Setup checkout button
function setupCheckoutButton() {
    const checkoutBtn = document.getElementById('complete-order-btn');
    
    if (!checkoutBtn) return;
    
    checkoutBtn.addEventListener('click', handleCheckout);
}

// Handle checkout process
function handleCheckout(e) {
    e.preventDefault();
    
    // Validate all form fields
    const form = document.querySelector('.checkout-form');
    if (!form) return;
    
    const requiredInputs = form.querySelectorAll('.form-input');
    let isFormValid = true;
    
    requiredInputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        showNotification('Please fill in all required fields correctly', 'error');
        return;
    }
    
    // Get form data
    const formData = getFormData();
    
    // Get selected payment method
    const selectedPayment = document.querySelector('.payment-option input[type="radio"]:checked');
    const paymentMethod = selectedPayment ? 
        selectedPayment.parentElement.querySelector('.payment-label').textContent : 
        'Credit Card';
    
    // Simulate order processing
    processOrder(formData, paymentMethod);
}

// Get form data
function getFormData() {
    const form = document.querySelector('.checkout-form');
    const inputs = form.querySelectorAll('.form-input');
    const data = {};
    
    inputs.forEach(input => {
        const label = input.parentElement.previousElementSibling?.textContent;
        if (label) {
            data[label] = input.value;
        }
    });
    
    return data;
}

// Process order
function processOrder(formData, paymentMethod) {
    const checkoutBtn = document.getElementById('complete-order-btn');
    const originalText = checkoutBtn.innerHTML;
    
    // Show processing state
    checkoutBtn.disabled = true;
    checkoutBtn.innerHTML = `
        <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" stroke-width="3" stroke-dasharray="31.4 31.4" />
        </svg>
        Processing...
    `;
    
    // Add spinner animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        .spinner { animation: spin 1s linear infinite; }
    `;
    document.head.appendChild(style);
    
    // Simulate API call
    setTimeout(() => {
        // Get cart and order details
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const { total } = window.orderTotals;
        
        // Create order object
        const order = {
            id: generateOrderId(),
            date: new Date().toISOString(),
            customer: formData,
            items: cart,
            paymentMethod: paymentMethod,
            total: total,
            status: 'confirmed'
        };
        
        // Store order
        saveOrder(order);
        
        // Clear cart
        localStorage.removeItem('cart');
        
        // Show success and redirect
        showNotification('Order placed successfully!', 'success');
        
        setTimeout(() => {
            window.location.href = 'order-confirmation.html?orderId=' + order.id;
        }, 1500);
    }, 2000);
}

// Generate order ID
function generateOrderId() {
    return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Save order to localStorage
function saveOrder(order) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('lastOrder', JSON.stringify(order));
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--color-primary)' : '#e74c3c'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 24px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Auto-fill demo data (for testing)
function fillDemoData() {
    const inputs = document.querySelectorAll('.form-input');
    const demoData = {
        'Full Name': 'John Doe',
        'Email Address': 'john.doe@example.com',
        'Phone Number': '+1 (555) 123-4567',
        'Address': '123 Main Street, Apt 4B',
        'City': 'New York',
        'State': 'NY',
        'ZIP Code': '10001',
        'Country': 'United States',
        'Card Number': '4532 1234 5678 9010',
        'Expiry Date': '12/25',
        'CVV': '123'
    };
    
    inputs.forEach(input => {
        const label = input.parentElement.previousElementSibling?.textContent;
        if (label && demoData[label]) {
            input.value = demoData[label];
        }
    });
}

// Expose fillDemoData for console testing
window.fillDemoData = fillDemoData;

function loadCartItems() {
    // Show skeleton loader
    const summaryCard = document.querySelector('.summary-card');
    if (summaryCard) {
        summaryCard.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <div class="loading-spinner"></div>
                <p style="color: #999; margin-top: 1rem;">Loading cart...</p>
            </div>
        `;
    }
    
    // Simulate async loading (in real app, this would be an API call)
    setTimeout(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            showEmptyCartState();
        } else {
            renderOrderSummary(cart);
        }
    }, 300);
}