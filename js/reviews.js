// reviews.js - Review functionality for product detail page

// Mock reviews data
const mockReviews = [
    {
        id: 1,
        userName: "Sarah Mitchell",
        userInitial: "S",
        rating: 5,
        date: "2024-12-15",
        reviewText: "Absolutely love these bulbs! The color options are stunning and the voice control integration works flawlessly with my Google Home. Setup was incredibly easy and the app is intuitive. The energy savings are already noticeable on my electricity bill. Highly recommended for anyone looking to upgrade their home lighting!"
    },
    {
        id: 2,
        userName: "Michael Chen",
        userInitial: "M",
        rating: 4,
        date: "2024-12-10",
        reviewText: "Great product with excellent build quality. The brightness is impressive and the color accuracy is spot-on. I've set up several automation routines and they work perfectly. My only minor complaint is that the initial connection took a few tries, but once connected, it's been rock solid. The scheduling feature has been a game-changer for my morning routine."
    },
    {
        id: 3,
        userName: "Emily Rodriguez",
        userInitial: "E",
        rating: 5,
        date: "2024-12-08",
        reviewText: "These bulbs have transformed my home! I love being able to control the ambiance from my phone or with voice commands. The warm white setting is perfect for evenings, and the bright cool white is great for working. The quality is exceptional and they feel premium. Worth every penny. I'm planning to replace all my old bulbs with these!"
    },
    {
        id: 4,
        userName: "David Kim",
        userInitial: "D",
        rating: 5,
        date: "2024-12-05",
        reviewText: "Outstanding smart bulb! Integration with Alexa is seamless. The app allows for precise color control and scheduling. Very impressed with the build quality and longevity so far."
    },
    {
        id: 5,
        userName: "Jessica Thompson",
        userInitial: "J",
        rating: 4,
        date: "2024-12-01",
        reviewText: "Really happy with this purchase. The colors are vibrant and the dimming is smooth. Setup was straightforward. Would give 5 stars but wish the app had more preset scenes."
    }
];

// Initialize reviews functionality
function initReviews() {
    // Calculate and display average rating
    updateAverageRating();
    
    // Set up write review button
    setupWriteReviewButton();
    
    // Set up review sorting/filtering (Phase 2)
    // setupReviewFilters();
    
    // Set up load more reviews functionality (Phase 2)
    // setupLoadMoreReviews();
}

// Calculate and update average rating
function updateAverageRating() {
    const totalReviews = mockReviews.length;
    const totalRating = mockReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = (totalRating / totalReviews).toFixed(1);
    
    // Update rating number
    const ratingNumberElement = document.querySelector('.rating-number');
    if (ratingNumberElement) {
        ratingNumberElement.textContent = averageRating;
    }
    
    // Update review count
    const ratingTextElement = document.querySelector('.reviews-header .rating-text');
    if (ratingTextElement) {
        ratingTextElement.textContent = `Based on ${totalReviews} reviews`;
    }
}

// Set up write review button
function setupWriteReviewButton() {
    const writeReviewBtn = document.querySelector('.btn-write-review');
    
    if (writeReviewBtn) {
        writeReviewBtn.addEventListener('click', handleWriteReview);
    }
}

// Handle write review button click
function handleWriteReview() {
    // Phase 1: Show alert (Phase 2 will open modal)
    alert('Write a Review feature coming soon!\n\nIn the next phase, you will be able to:\n• Rate the product\n• Write detailed reviews\n• Upload photos\n• Share your experience');
    
    // Phase 2: Open review modal
    // openReviewModal();
}

// Render review stars
function renderStars(rating, container) {
    if (!container) return;
    
    container.innerHTML = '';
    
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('i');
        star.setAttribute('data-lucide', 'star');
        
        if (i <= rating) {
            star.setAttribute('fill', '#FFB800');
        }
        
        container.appendChild(star);
    }
    
    // Re-initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Format date
function formatReviewDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Create review card element
function createReviewCard(review) {
    const reviewCard = document.createElement('div');
    reviewCard.className = 'review-card';
    reviewCard.setAttribute('data-review-id', review.id);
    
    reviewCard.innerHTML = `
        <div class="review-header">
            <div class="reviewer-info">
                <div class="reviewer-avatar">${review.userInitial}</div>
                <div>
                    <div class="reviewer-name">${review.userName}</div>
                    <div class="review-stars"></div>
                </div>
            </div>
            <div class="review-date">${formatReviewDate(review.date)}</div>
        </div>
        <p class="review-text">${review.reviewText}</p>
    `;
    
    // Render stars
    const starsContainer = reviewCard.querySelector('.review-stars');
    renderStars(review.rating, starsContainer);
    
    return reviewCard;
}

// Load more reviews (Phase 2)
function loadMoreReviews() {
    // This will be implemented in Phase 2
    console.log('Load more reviews functionality coming in Phase 2');
}

// Filter reviews by rating (Phase 2)
function filterReviewsByRating(rating) {
    // This will be implemented in Phase 2
    console.log(`Filter by ${rating} stars - Coming in Phase 2`);
}

// Sort reviews (Phase 2)
function sortReviews(sortBy) {
    // sortBy options: 'recent', 'helpful', 'rating-high', 'rating-low'
    console.log(`Sort by ${sortBy} - Coming in Phase 2`);
}

// Mark review as helpful (Phase 2)
function markReviewHelpful(reviewId) {
    console.log(`Mark review ${reviewId} as helpful - Coming in Phase 2`);
}

// Report review (Phase 2)
function reportReview(reviewId) {
    console.log(`Report review ${reviewId} - Coming in Phase 2`);
}

// Phase 2: Open review modal
function openReviewModal() {
    // Create and show modal for writing reviews
    // This will be implemented in Phase 2
    console.log('Review modal - Coming in Phase 2');
}

// Phase 2: Submit review
function submitReview(reviewData) {
    // Handle review submission
    // This will be implemented in Phase 2
    console.log('Submit review - Coming in Phase 2', reviewData);
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReviews);
} else {
    initReviews();
}

// Export functions for use in other modules (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initReviews,
        mockReviews,
        renderStars,
        createReviewCard,
        filterReviewsByRating,
        sortReviews
    };
}