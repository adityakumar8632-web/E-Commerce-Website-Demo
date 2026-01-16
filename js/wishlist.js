/**
 * wishlist.js
 * Handles wishlist functionality for the smart home e-commerce site
 * Phase 1: UI-only demo (no backend persistence)
 */

// Wishlist state management
let wishlistItems = [];

// Initialize wishlist on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeWishlist();
    setupWishlistEventListeners();
    updateWishlistUI();
});

/**
 * Initialize wishlist from localStorage (Phase 1 demo data)
 */
function initializeWishlist() {
    // Demo data for Phase 1
    const demoWishlist = [
        {
            id: 1,
            name: 'Smart Speaker Pro',
            tagline: 'Premium sound with voice control',
            price: 199.99,
            image: 'https://via.placeholder.com/250x250/E8D5FF/7B3FBF?text=Smart+Speaker',
            compatibility: ['alexa', 'google', 'siri']
        },
        {
            id: 2,
            name: 'Color LED Bulb',
            tagline: '16 million colors, app-controlled',
            price: 49.99,
            image: 'https://via.placeholder.com/250x250/E8D5FF/7B3FBF?text=Smart+Light',
            compatibility: ['alexa', 'google']
        },
        {
            id: 3,
            name: 'Security Camera 4K',
            tagline: 'AI-powered motion detection',
            price: 299.99,
            image: 'https://via.placeholder.com/250x250/E8D5FF/7B3FBF?text=Smart+Camera',
            compatibility: ['alexa', 'google', 'siri']
        },
        {
            id: 4,
            name: 'Smart Thermostat',
            tagline: 'Energy-saving climate control',
            price: 249.99,
            image: 'https://via.placeholder.com/250x250/E8D5FF/7B3FBF?text=Smart+Thermostat',
            compatibility: ['alexa', 'google']
        },
        {
            id: 5,
            name: 'Keyless Smart Lock',
            tagline: 'Secure entry with fingerprint',
            price: 179.99,
            image: 'https://via.placeholder.com/250x250/E8D5FF/7B3FBF?text=Smart+Lock',
            compatibility: ['alexa', 'siri']
        },
        {
            id: 6,
            name: 'Smart Display 10"',
            tagline: 'Touch screen voice assistant hub',
            price: 279.99,
            image: 'https://via.placeholder.com/250x250/E8D5FF/7B3FBF?text=Smart+Display',
            compatibility: ['alexa', 'google']
        }
    ];

    // Try to load from localStorage, fallback to demo data
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
        try {
            wishlistItems = JSON.parse(savedWishlist);
        } catch (e) {
            wishlistItems = demoWishlist;
        }
    } else {
        wishlistItems = demoWishlist;
    }

    // Save to localStorage
    saveWishlist();
}

/* Setup event listeners for wishlist interactions */
// Add to setupWishlistEventListeners function
function setupWishlistEventListeners() {
    const wishlistGrid = document.querySelector('.wishlist-grid');
    if (!wishlistGrid) return;

    // Event delegation on grid instead of document
    wishlistGrid.addEventListener('click', handleWishlistClick);
}

function handleWishlistClick(e) {
    const removeBtn = e.target.closest('.remove-btn');
    if (removeBtn) {
        const card = removeBtn.closest('.wishlist-card');
        const productId = card.dataset.productId;
        removeFromWishlist(productId, card);
        return;
    }

    const addToCartBtn = e.target.closest('.add-to-cart-btn');
    if (addToCartBtn) {
        const card = addToCartBtn.closest('.wishlist-card');
        const productId = card.dataset.productId;
        addToCartFromWishlist(productId, card);
    }
}

/**
 * Update the wishlist UI
 */
function updateWishlistUI() {
    const wishlistGrid = document.querySelector('.wishlist-grid');
    const emptyState = document.querySelector('.empty-state');

    if (wishlistItems.length === 0) {
        // Show empty state
        wishlistGrid.style.display = 'none';
        emptyState.classList.add('show');
    } else {
        // Show wishlist grid
        wishlistGrid.style.display = 'grid';
        emptyState.classList.remove('show');
        renderWishlistItems();
    }
}

/**
 * Render wishlist items in the grid
 */
function renderWishlistItems() {
    const wishlistGrid = document.querySelector('.wishlist-grid');
    
    wishlistGrid.innerHTML = wishlistItems.map(item => `
        <div class="wishlist-card" data-product-id="${item.id}">
            <button class="remove-btn" aria-label="Remove from wishlist">
                <i data-lucide="heart"></i>
            </button>
            <div class="product-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="product-info">
                <h3 class="product-name">${item.name}</h3>
                <p class="product-tagline">${item.tagline}</p>
                <div class="product-price">$${item.price.toFixed(2)}</div>
                <div class="compatibility-icons">
                    ${renderCompatibilityIcons(item.compatibility)}
                </div>
            </div>
            <button class="add-to-cart-btn">
                <i data-lucide="shopping-cart"></i>
                Add to Cart
            </button>
        </div>
    `).join('');

    // Reinitialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

/**
 * Render compatibility icons
 */
function renderCompatibilityIcons(compatibility) {
    const icons = {
        'alexa': { letter: 'A', title: 'Alexa Compatible' },
        'google': { letter: 'G', title: 'Google Assistant Compatible' },
        'siri': { letter: 'S', title: 'Siri Compatible' }
    };

    return compatibility.map(type => {
        const icon = icons[type];
        return `<div class="compatibility-icon" title="${icon.title}">${icon.letter}</div>`;
    }).join('');
}

/**
 * Remove item from wishlist with animation
 */
function removeFromWishlist(productId, cardElement) {
    // Add exit animation
    cardElement.style.transform = 'scale(0.8)';
    cardElement.style.opacity = '0';
    cardElement.style.transition = 'all 0.3s ease';

    setTimeout(() => {
        // Remove from array
        wishlistItems = wishlistItems.filter(item => item.id !== parseInt(productId));
        
        // Save to localStorage
        saveWishlist();

        // Update UI
        updateWishlistUI();

        // Show notification
        showNotification('Removed from wishlist', 'info');
    }, 300);
}

/**
 * Add item to cart from wishlist
 */
function addToCartFromWishlist(productId, cardElement) {
    const item = wishlistItems.find(item => item.id === parseInt(productId));
    
    if (!item) return;

    // Get cart from localStorage
    let cart = [];
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
        } catch (e) {
            cart = [];
        }
    }

    // Check if item already in cart
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
        showNotification('Quantity updated in cart', 'success');
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
        showNotification('Added to cart', 'success');
    }

    // Save cart
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart badge
    updateCartBadge();

    // Add success animation to button
    const button = cardElement.querySelector('.add-to-cart-btn');
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
}

/**
 * Save wishlist to localStorage
 */
function saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
}

/**
 * Add item to wishlist (called from other pages)
 */
function addToWishlist(product) {
    // Check if already in wishlist
    const exists = wishlistItems.find(item => item.id === product.id);
    
    if (!exists) {
        wishlistItems.push(product);
        saveWishlist();
        showNotification('Added to wishlist', 'success');
        return true;
    } else {
        showNotification('Already in wishlist', 'info');
        return false;
    }
}

/**
 * Check if item is in wishlist
 */
function isInWishlist(productId) {
    return wishlistItems.some(item => item.id === productId);
}

/**
 * Get wishlist count
 */
function getWishlistCount() {
    return wishlistItems.length;
}

/**
 * Update cart badge count
 */
function updateCartBadge() {
    const cartBadge = document.querySelector('.cart-badge');
    if (!cartBadge) return;

    const savedCart = localStorage.getItem('cart');
    let totalItems = 0;

    if (savedCart) {
        try {
            const cart = JSON.parse(savedCart);
            totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        } catch (e) {
            totalItems = 0;
        }
    }

    cartBadge.textContent = totalItems;
    cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    cartBadge.setAttribute('aria-label', `${totalItems} items in cart`);
}

/**
 * Show notification toast
 */
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification-toast');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification-toast notification-${type}`;
    notification.innerHTML = `
        <i data-lucide="${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `;

    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        background: type === 'success' ? 'linear-gradient(135deg, #7B3FBF 0%, #5A2D8C 100%)' : 
                    type === 'info' ? 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)' :
                    'linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        zIndex: '10000',
        animation: 'slideIn 0.3s ease',
        fontSize: '1rem',
        fontWeight: '500'
    });

    // Add to page
    document.body.appendChild(notification);

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        notification.addEventListener('animationend', () => {
            notification.remove();
        }, { once: true });
    }, 3000);
}

/**
 * Get notification icon based on type
 */
function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'info': 'info',
        'error': 'alert-circle'
    };
    return icons[type] || 'info';
}

// Add notification animations
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
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Export functions for use in other scripts
if (typeof window !== 'undefined') {
    window.wishlistFunctions = {
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        getWishlistCount,
        updateWishlistUI
    };
}

// Initialize cart badge on load
updateCartBadge();

function removeFromWishlist(productId, cardElement) {
    // Prevent multiple clicks
    if (cardElement.classList.contains('removing')) return;
    cardElement.classList.add('removing');
    
    // Add exit animation
    cardElement.style.transform = 'scale(0.8)';
    cardElement.style.opacity = '0';
    cardElement.style.pointerEvents = 'none';

    setTimeout(() => {
        wishlistItems = wishlistItems.filter(item => item.id !== parseInt(productId));
        saveWishlist();
        updateWishlistUI();
        showNotification('Removed from wishlist', 'info');
    }, 300);
}