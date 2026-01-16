// auth.js - Authentication Page Interactions

document.addEventListener('DOMContentLoaded', () => {
    initAuthTabs();
    initPasswordToggles();
    initFormHandlers();
});

// Tab switching functionality
function initAuthTabs() {
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');
    const indicator = document.querySelector('.tab-indicator');

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and forms
            tabs.forEach(t => t.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));

            // Add active class to clicked tab
            tab.classList.add('active');

            // Show corresponding form
            const targetForm = tab.dataset.tab;
            const formToShow = document.getElementById(`${targetForm}-form`);
            if (formToShow) {
                formToShow.classList.add('active');
            }

            // Move indicator
            const tabWidth = tab.offsetWidth;
            const tabLeft = tab.offsetLeft;
            indicator.style.width = `${tabWidth}px`;
            indicator.style.left = `${tabLeft}px`;
        });
    });
}

// Password show/hide toggle
function initPasswordToggles() {
    const toggleButtons = document.querySelectorAll('.toggle-password');

    toggleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const wrapper = button.closest('.input-wrapper');
            const input = wrapper.querySelector('input');
            const icon = button.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icon.setAttribute('data-lucide', 'eye-off');
            } else {
                input.type = 'password';
                icon.setAttribute('data-lucide', 'eye');
            }

            // Reinitialize Lucide icons
            lucide.createIcons();
        });
    });
}

// Form submission handlers (demo only)
function initFormHandlers() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Guest login handler
    const guestButton = document.querySelector('.btn-secondary');
    if (guestButton) {
        guestButton.addEventListener('click', handleGuestLogin);
    }

    // Social login handlers
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', handleSocialLogin);
    });
}

// Login form handler (demo)
function handleLogin(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;
    const remember = e.target.querySelector('#remember').checked;

    // Demo: Show loading state
    const submitButton = e.target.querySelector('.btn-primary');
    
    // Prevent double submission
    if (submitButton.disabled) return;
    
    submitButton.disabled = true;
    submitButton.style.opacity = '0.6';
    submitButton.style.cursor = 'not-allowed';
    
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i data-lucide="loader-2"></i> Logging in...';

    

    // Simulate API call
    setTimeout(() => {
        console.log('Login attempt:', { email, password, remember });
        
        // Demo: Store user state (in real app, this would be handled by backend)
        sessionStorage.setItem('isAuthenticated', 'true');
        sessionStorage.setItem('userEmail', email);

        // Show success message
        showNotification('Login successful!', 'success');

        // Redirect to home page after short delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }, 1500);
}

// Register form handler (demo)
function handleRegister(e) {
    e.preventDefault();

    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const passwords = e.target.querySelectorAll('input[type="password"]');
    const password = passwords[0].value;
    const confirmPassword = passwords[1].value;
    const termsAccepted = e.target.querySelector('#terms').checked;

    // Validate passwords match
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }

    // Validate terms accepted
    if (!termsAccepted) {
        showNotification('Please accept the Terms & Conditions', 'error');
        return;
    }

    // Demo: Show loading state
    const submitButton = e.target.querySelector('.btn-primary');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i data-lucide="loader-2"></i> Creating account...';
    submitButton.disabled = true;

    // Simulate API call
    setTimeout(() => {
        console.log('Register attempt:', { name, email, password });

        // Demo: Store user state
        sessionStorage.setItem('isAuthenticated', 'true');
        sessionStorage.setItem('userEmail', email);
        sessionStorage.setItem('userName', name);

        // Show success message
        showNotification('Account created successfully!', 'success');

        // Redirect to home page after short delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }, 1500);
}

// Guest login handler
function handleGuestLogin() {
    console.log('Guest login');
    
    // Demo: Set guest session
    sessionStorage.setItem('isAuthenticated', 'false');
    sessionStorage.setItem('isGuest', 'true');

    showNotification('Continuing as guest...', 'success');

    setTimeout(() => {
        window.location.href = 'index.html';
    }, 800);
}

// Social login handler (demo)
function handleSocialLogin(e) {
    const button = e.currentTarget;
    const provider = button.querySelector('svg').getAttribute('style').includes('4285F4') ? 'Google' : 
                     button.querySelector('svg').getAttribute('style').includes('#000') ? 'Apple' : 'Amazon';

    console.log(`Social login with ${provider}`);
    showNotification(`${provider} login coming soon!`, 'info');
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.auth-notification');
    if (existing) {
        existing.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `auth-notification auth-notification-${type}`;
    notification.innerHTML = `
        <i data-lucide="${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `;

    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '2rem',
        right: '2rem',
        background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#7B3FBF',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        zIndex: '10000',
        animation: 'slideIn 0.3s ease',
        fontWeight: '500'
    });

    document.body.appendChild(notification);
    lucide.createIcons();

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'x-circle';
        case 'info': return 'info';
        default: return 'bell';
    }
}

// Add animation styles
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

// Check authentication status on page load
function checkAuthStatus() {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    const userEmail = sessionStorage.getItem('userEmail');

    if (isAuthenticated === 'true' && userEmail) {
        console.log('User is authenticated:', userEmail);
        // Could auto-redirect or show different UI
    }
}

checkAuthStatus();

// In initPasswordToggles() function, add:
button.setAttribute('aria-label', 'Toggle password visibility');

// In initAuthTabs() function, enhance with:
tabs.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', tab.classList.contains('active'));
    
    tab.addEventListener('click', () => {
        // Existing code...
        
        // Update ARIA states
        tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
        tab.setAttribute('aria-selected', 'true');
    });
});

function initPasswordToggles() {
    const toggleButtons = document.querySelectorAll('.toggle-password');

    toggleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const wrapper = button.closest('.input-wrapper');
            const input = wrapper.querySelector('input');
            const icon = button.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icon.setAttribute('data-lucide', 'eye-off');
            } else {
                input.type = 'password';
                icon.setAttribute('data-lucide', 'eye');
            }

            // Reinitialize only this icon
            lucide.createIcons({ 
                icons: { 
                    eye: lucide.Eye, 
                    eyeOff: lucide.EyeOff 
                },
                attrs: {
                    'stroke-width': 2
                }
            });
        });
    });
}   