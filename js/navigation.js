// navigation.js - Handles navigation, mobile menu, and search functionality

class Navigation {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSearchFunctionality();
        this.setupSmoothScrolling();
        this.highlightActiveNavLink();
    }

    setupMobileMenu() {
        const navContainer = document.querySelector('.nav-container');
        const navLinks = document.querySelector('.nav-links');
        const navIcons = document.querySelector('.nav-icons');
        const overlay = document.querySelector('.mobile-overlay');
    
        if (!navContainer || !navLinks || !navIcons) return;
    
        // Reuse or create mobile menu button
        let mobileToggle = document.querySelector('.mobile-menu-toggle');
    
        if (!mobileToggle) {
            mobileToggle = document.createElement('button');
            mobileToggle.className = 'mobile-menu-toggle icon-btn';
            mobileToggle.setAttribute('aria-label', 'Toggle navigation menu');
            mobileToggle.setAttribute('aria-expanded', 'false');
            mobileToggle.innerHTML = '<i data-lucide="menu"></i>';
    
            // ✅ Insert as FIRST icon (correct position everywhere)
            navIcons.prepend(mobileToggle);
            lucide.createIcons();
        }
    
        const closeMenu = () => {
            navLinks.classList.remove('active');
            overlay?.classList.remove('active');
            document.body.classList.remove('menu-open');
            mobileToggle.setAttribute('aria-expanded', 'false');
            mobileToggle.querySelector('i').setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        };
    
        const openMenu = () => {
            navLinks.classList.add('active');
            overlay?.classList.add('active');
            document.body.classList.add('menu-open');
            mobileToggle.setAttribute('aria-expanded', 'true');
            mobileToggle.querySelector('i').setAttribute('data-lucide', 'x');
            lucide.createIcons();
        };
    
        // Toggle menu
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.contains('active') ? closeMenu() : openMenu();
        });
    
        // Close on overlay click
        overlay?.addEventListener('click', closeMenu);
    
        // Close when clicking a nav link (mobile only)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) closeMenu();
            });
        });
    
        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (
                navLinks.classList.contains('active') &&
                !navContainer.contains(e.target)
            ) {
                closeMenu();
            }
        });
    
        // Safety: close menu on resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) closeMenu();
        });
    }
    

    setupSearchFunctionality() {
        const searchBtn = document.querySelector('.nav-icons .icon-btn:has([data-lucide="search"])');
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.openSearchModal();
            });
        }
    }

    openSearchModal() {
        // Create search modal if it doesn't exist
        let searchModal = document.getElementById('search-modal');
        
        if (!searchModal) {
            searchModal = document.createElement('div');
            searchModal.id = 'search-modal';
            searchModal.className = 'search-modal';
            searchModal.innerHTML = `
                <div class="search-modal-content">
                    <div class="search-modal-header">
                        <h2>Search Products</h2>
                        <button class="close-search" aria-label="Close search">
                            <i data-lucide="x"></i>
                        </button>
                    </div>
                    <div class="search-input-wrapper">
                        <i data-lucide="search"></i>
                        <input 
                            type="text" 
                            placeholder="Search for smart home products..." 
                            class="search-input"
                            id="product-search"
                        >
                    </div>
                    <div class="search-suggestions">
                        <h3>Popular Searches</h3>
                        <div class="suggestion-tags">
                            <span class="suggestion-tag">Smart Lights</span>
                            <span class="suggestion-tag">Coffee Maker</span>
                            <span class="suggestion-tag">Air Fryer</span>
                            <span class="suggestion-tag">Security Camera</span>
                            <span class="suggestion-tag">Smart Fan</span>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(searchModal);
            lucide.createIcons();

            // Add modal styles dynamically
            if (!document.getElementById('search-modal-styles')) {
                const style = document.createElement('style');
                style.id = 'search-modal-styles';
                style.textContent = `
                    .search-modal {
                        display: none;
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.7);
                        z-index: 2000;
                        align-items: flex-start;
                        justify-content: center;
                        padding-top: 5rem;
                    }
                    .search-modal.active {
                        display: flex;
                    }
                    .search-modal-content {
                        background: white;
                        border-radius: 16px;
                        width: 90%;
                        max-width: 600px;
                        padding: 2rem;
                        animation: slideDown 0.3s ease;
                    }
                    @keyframes slideDown {
                        from { transform: translateY(-50px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                    .search-modal-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 1.5rem;
                    }
                    .search-modal-header h2 {
                        color: var(--color-primary);
                        font-size: 1.5rem;
                    }
                    .close-search {
                        background: none;
                        border: none;
                        cursor: pointer;
                        padding: 0.5rem;
                        border-radius: 50%;
                        transition: all 0.3s ease;
                    }
                    .close-search:hover {
                        background: var(--color-card-bg);
                    }
                    .search-input-wrapper {
                        position: relative;
                        margin-bottom: 2rem;
                    }
                    .search-input-wrapper i {
                        position: absolute;
                        left: 1rem;
                        top: 50%;
                        transform: translateY(-50%);
                        color: var(--color-text-light);
                    }
                    .search-input {
                        width: 100%;
                        padding: 1rem 1rem 1rem 3rem;
                        border: 2px solid var(--color-border);
                        border-radius: 12px;
                        font-size: 1rem;
                        transition: all 0.3s ease;
                    }
                    .search-input:focus {
                        outline: none;
                        border-color: var(--color-primary);
                    }
                    .search-suggestions h3 {
                        font-size: 1rem;
                        margin-bottom: 1rem;
                        color: var(--color-text);
                    }
                    .suggestion-tags {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 0.5rem;
                    }
                    .suggestion-tag {
                        padding: 0.5rem 1rem;
                        background: var(--color-card-bg);
                        border-radius: 20px;
                        font-size: 0.9rem;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }
                    .suggestion-tag:hover {
                        background: var(--color-primary);
                        color: white;
                    }
                `;
                document.head.appendChild(style);
            }

            // Setup event listeners
            const closeBtn = searchModal.querySelector('.close-search');
            closeBtn.addEventListener('click', () => {
                searchModal.classList.remove('active');
            });

            searchModal.addEventListener('click', (e) => {
                if (e.target === searchModal) {
                    searchModal.classList.remove('active');
                }
            });

            // Search input functionality
            const searchInput = searchModal.querySelector('#product-search');
            searchInput.addEventListener('input', (e) => {
                console.log('Searching for:', e.target.value);
                // This will be connected to actual search functionality later
            });

            // Suggestion tags
            const suggestionTags = searchModal.querySelectorAll('.suggestion-tag');
            suggestionTags.forEach(tag => {
                tag.addEventListener('click', () => {
                    searchInput.value = tag.textContent;
                    searchInput.focus();
                });
            });
        }

        searchModal.classList.add('active');
        setTimeout(() => {
            document.getElementById('product-search').focus();
        }, 100);
    }

    setupSmoothScrolling() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#' && document.querySelector(href)) {
                    e.preventDefault();
                    document.querySelector(href).scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    highlightActiveNavLink() {
        // Highlight active navigation link based on current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage) {
                link.style.color = 'var(--color-secondary)';
                link.style.fontWeight = '600';
            }
        });
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Navigation;
}