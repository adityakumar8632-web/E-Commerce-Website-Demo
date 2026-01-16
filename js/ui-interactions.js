// ui-interactions.js
// Category-accurate filtering & sorting for PLP

class UIInteractions {
    constructor() {
        this.products = [];
        this.currentFilter = 'all';
        this.currentSort = 'default';
        this.priceDirection = 'asc';

        this.productGrid = document.querySelector('.product-grid');
        this.init();
    }

    /* ---------- INIT ---------- */

    init() {
        this.collectProducts();
        this.setupFilterButtons();
        this.setupSortButtons();
        this.render();
    }

    /* ---------- DATA ---------- */

    collectProducts() {
        const cards = document.querySelectorAll('.product-card');

        this.products = [...cards].map((card, index) => ({
            element: card,
            index,
            category: card.querySelector('.product-category')
                ?.innerText.toLowerCase().trim() || '',
            price: parseFloat(
                card.querySelector('.product-price')
                    ?.innerText.replace(/[^\d.]/g, '')
            ) || 0,
            rating: card.querySelectorAll('.stars [style*="fill"]').length,
            badge: card.querySelector('.product-badge')
                ?.innerText.toLowerCase() || ''
        }));
    }

    /* ---------- FILTER ---------- */

    setupFilterButtons() {
        const buttons = document.querySelectorAll('.filter-btn');

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const text = btn.innerText.toLowerCase();

                if (text.includes('all')) this.currentFilter = 'all';
                else if (text.includes('lighting')) this.currentFilter = 'lighting';
                else if (text.includes('kitchen')) this.currentFilter = 'kitchen';
                else if (text.includes('surveillance')) this.currentFilter = 'surveillance';
                else if (text.includes('automation')) this.currentFilter = 'automation';

                this.render();
            });
        });
    }

    /* ---------- SORT ---------- */

    setupSortButtons() {
        const buttons = document.querySelectorAll('.sort-btn');

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const text = btn.innerText.toLowerCase();

                if (text.includes('price')) {
                    this.currentSort = 'price';
                    this.priceDirection =
                        this.priceDirection === 'asc' ? 'desc' : 'asc';
                } 
                else if (text.includes('rating')) {
                    this.currentSort = 'rating';
                } 
                else if (text.includes('popular')) {
                    this.currentSort = 'popular';
                }

                this.render();
            });
        });
    }

    /* ---------- PIPELINE ---------- */

    getFilteredProducts() {
        if (this.currentFilter === 'all') return [...this.products];
        return this.products.filter(p => p.category === this.currentFilter);
    }

    getSortedProducts(products) {
        const sorted = [...products];

        switch (this.currentSort) {
            case 'price':
                sorted.sort((a, b) =>
                    this.priceDirection === 'asc'
                        ? a.price - b.price
                        : b.price - a.price
                );
                break;

            case 'rating':
                sorted.sort((a, b) => b.rating - a.rating);
                break;

            case 'popular':
                sorted.sort((a, b) => {
                    const aBest = a.badge.includes('best');
                    const bBest = b.badge.includes('best');
                    if (aBest && !bBest) return -1;
                    if (!aBest && bBest) return 1;
                    return b.rating - a.rating;
                });
                break;

            default:
                sorted.sort((a, b) => a.index - b.index);
        }

        return sorted;
    }

    /* ---------- RENDER ---------- */

    render() {
        const filtered = this.getFilteredProducts();
        const sorted = this.getSortedProducts(filtered);

        this.productGrid.innerHTML = '';

        sorted.forEach(p => {
            p.element.style.display = 'block';
            this.productGrid.appendChild(p.element);
        });

        this.products.forEach(p => {
            if (!sorted.includes(p)) {
                p.element.style.display = 'none';
            }
        });

        this.updateResultsCount(sorted.length);
    }

    /* ---------- UI ---------- */

    updateResultsCount(count) {
        const el = document.querySelector('.results-count');
        if (el) el.innerText = `Showing ${count} products`;
    }
}

/* ---------- BOOT ---------- */

document.addEventListener('DOMContentLoaded', () => {
    new UIInteractions();
});
