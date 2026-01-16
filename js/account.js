// account.js - Account page interactions and UI behavior

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    initializeSidebarNavigation();
    initializeDeviceToggles();
    initializeProfileForm();
    initializeOrderActions();
    initializeSmoothScrolling();
});

// Sidebar Navigation
function initializeSidebarNavigation() {
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Get target section
            const target = link.getAttribute('href');
            
            // Handle logout separately
            if (target === '#logout') {
                handleLogout();
                return;
            }
            
            // Scroll to section if it exists
            const section = document.querySelector(target);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Device Toggle Switches
function initializeDeviceToggles() {
    const toggles = document.querySelectorAll('.toggle-switch');
    
    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            // Toggle the 'on' class
            toggle.classList.toggle('on');
            
            // Find parent device card
            const deviceCard = toggle.closest('.device-card');
            const statusIndicator = deviceCard.querySelector('.status-indicator');
            const statusText = deviceCard.querySelector('.device-status');
            
            // Update device status
            if (toggle.classList.contains('on')) {
                statusIndicator.classList.remove('off');
                statusText.innerHTML = '<span class="status-indicator"></span>Online';
                
                // Show success notification
                showNotification('Device turned on successfully', 'success');
            } else {
                statusIndicator.classList.add('off');
                statusText.innerHTML = '<span class="status-indicator off"></span>Offline';
                
                // Show info notification
                showNotification('Device turned off', 'info');
            }
        });
    });
}

// Profile Form Handling
function initializeProfileForm() {
    const saveBtn = document.querySelector('.save-btn');
    const formInputs = document.querySelectorAll('.profile-form input');
    
    if (saveBtn) {
        saveBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Add loading state
            const originalText = saveBtn.textContent;
            saveBtn.textContent = 'Saving...';
            saveBtn.disabled = true;
            
            // Simulate save operation
            setTimeout(() => {
                saveBtn.textContent = originalText;
                saveBtn.disabled = false;
                
                showNotification('Profile updated successfully', 'success');
            }, 1500);
        });
    }
    
    // Add input validation feedback
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.transform = 'scale(1.01)';
        });
        
        input.addEventListener('blur', () => {
            input.style.transform = 'scale(1)';
        });
    });
}

// Order Actions
function initializeOrderActions() {

    document.querySelector('.orders-list')?.addEventListener('click', (e) => {
        if (e.target.closest('.view-btn')) {
            const btn = e.target.closest('.view-btn');
            const orderItem = btn.closest('.order-item');
            const orderInfo = orderItem.querySelector('.order-info h4').textContent;
            
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 150);
            
            showNotification(`Opening details for ${orderInfo}`, 'info');
        }
    });
}

// Smooth Scrolling for Sections
function initializeSmoothScrolling() {
    // Observe sections for active state
    const sections = document.querySelectorAll('.account-content section[id]');
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0,
        // Add delay to reduce callback frequency
    };
    
    const observerCallback = (entries) => {
        requestAnimationFrame(() => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    updateActiveNavLink(id);
                }
            });
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    function updateActiveNavLink(id) {
        const navLinks = document.querySelectorAll('.sidebar-nav a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            }
        });
    }
    
    sections.forEach(section => observer.observe(section));
}

// Logout Handler
function handleLogout() {
    const confirmed = confirm('Are you sure you want to logout?');
    
    if (confirmed) {
        // Add fade out effect
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            showNotification('Logging out...', 'info');
            // In a real app, this would redirect to login page
            // window.location.href = 'login.html';
        }, 300);
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        background: type === 'success' ? '#10b981' : type === 'info' ? '#7B3FBF' : '#ef4444',
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: '9999',
        animation: 'slideIn 0.3s ease',
        fontWeight: '500'
    });
    
    // Add animation styles
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
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
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Dashboard Card Interactions

if (!document.body.dataset.accountInitialized) {
    document.body.dataset.accountInitialized = 'true';

    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('click', () => {
            const label = card.querySelector('.stat-label').textContent;
            const value = card.querySelector('.stat-value').textContent;
            showNotification(`${label}: ${value}`, 'info');
        });
    });

}
// Device Card Hover Effects
document.querySelectorAll('.device-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.device-icon');
        icon.style.transform = 'scale(1.1) rotate(5deg)';
        icon.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.device-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Order Item Interactions
document.querySelectorAll('.order-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.borderColor = 'var(--color-primary)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.borderColor = 'rgba(123, 63, 191, 0.1)';
    });
});

// Console welcome message
console.log('%c🏠 LuxHome Account Dashboard', 'color: #7B3FBF; font-size: 20px; font-weight: bold;');
console.log('%cAccount page initialized successfully', 'color: #10b981; font-size: 14px;');