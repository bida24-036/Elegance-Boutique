// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'white';
        navbar.style.boxShadow = 'none';
    }
});

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        if (email) {
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        }
    });
}

// Image Lazy Loading
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Add to Cart Animation
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const cart = document.querySelector('.cart-icon');
        const buttonRect = button.getBoundingClientRect();
        const cartRect = cart.getBoundingClientRect();

        const flyingItem = document.createElement('div');
        flyingItem.className = 'flying-item';
        flyingItem.style.cssText = `
            position: fixed;
            top: ${buttonRect.top}px;
            left: ${buttonRect.left}px;
            width: 20px;
            height: 20px;
            background: var(--primary-color);
            border-radius: 50%;
            z-index: 1000;
            transition: all 0.8s ease;
        `;

        document.body.appendChild(flyingItem);

        setTimeout(() => {
            flyingItem.style.top = `${cartRect.top}px`;
            flyingItem.style.left = `${cartRect.left}px`;
            flyingItem.style.transform = 'scale(0.1)';
            flyingItem.style.opacity = '0';
        }, 0);

        setTimeout(() => {
            flyingItem.remove();
            cart.classList.add('bounce');
            setTimeout(() => cart.classList.remove('bounce'), 300);
        }, 800);
    });
});

// Price Formatting
const formatPrice = (price) => {
    return new Intl.NumberFormat('en-BW', {
        style: 'currency',
        currency: 'BWP',
        minimumFractionDigits: 2
    }).format(price);
};

// Update all price elements
document.querySelectorAll('.price').forEach(element => {
    const price = parseFloat(element.dataset.price);
    element.textContent = formatPrice(price);
});

// Car Data (Example for BMW)
const carData = {
    bmw: {
        models: [
            {
                name: 'BMW M4 Competition',
                specs: {
                    engine: '3.0L Twin-Turbo Inline-6',
                    horsepower: '503 hp',
                    torque: '479 lb-ft',
                    transmission: '8-Speed M Steptronic',
                    acceleration: '3.8s (0-60 mph)',
                    topSpeed: '180 mph',
                    fuelEconomy: '17/25 mpg (city/highway)'
                },
                image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e'
            },
            // Add more BMW models here
        ]
    },
    mercedes: {
        models: [
            {
                name: 'Mercedes-AMG GT Black Series',
                specs: {
                    engine: '4.0L Twin-Turbo V8',
                    horsepower: '720 hp',
                    torque: '590 lb-ft',
                    transmission: '7-Speed AMG SPEEDSHIFT DCT',
                    acceleration: '3.1s (0-60 mph)',
                    topSpeed: '202 mph',
                    fuelEconomy: '15/22 mpg (city/highway)'
                },
                image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8'
            },
            // Add more Mercedes models here
        ]
    },
    audi: {
        models: [
            {
                name: 'Audi RS e-tron GT',
                specs: {
                    engine: 'Dual Electric Motors',
                    horsepower: '637 hp',
                    torque: '612 lb-ft',
                    transmission: '2-Speed Automatic',
                    acceleration: '3.1s (0-60 mph)',
                    topSpeed: '155 mph',
                    range: '232 miles'
                },
                image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a'
            },
            // Add more Audi models here
        ]
    }
};

// Dynamic Content Loading
function loadCarDetails(brand) {
    const brandData = carData[brand];
    if (!brandData) return;

    // Create modal or expand section with car details
    const modal = document.createElement('div');
    modal.className = 'car-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>${brand.toUpperCase()} Models</h2>
            <div class="car-models-grid">
                ${brandData.models.map(model => `
                    <div class="car-model-card">
                        <img src="${model.image}" alt="${model.name}">
                        <h3>${model.name}</h3>
                        <div class="specs">
                            <p><strong>Engine:</strong> ${model.specs.engine}</p>
                            <p><strong>Horsepower:</strong> ${model.specs.horsepower}</p>
                            <p><strong>Torque:</strong> ${model.specs.torque}</p>
                            <p><strong>0-60 mph:</strong> ${model.specs.acceleration}</p>
                            <p><strong>Top Speed:</strong> ${model.specs.topSpeed}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => {
        modal.remove();
    };

    // Close modal when clicking outside
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.remove();
        }
    };
}

// Add click event listeners to brand cards
document.querySelectorAll('.brand-card').forEach(card => {
    card.addEventListener('click', () => {
        const brand = card.dataset.brand;
        loadCarDetails(brand);
    });
});

// Add CSS for modal
const style = document.createElement('style');
style.textContent = `
    .car-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal-content {
        background: white;
        padding: 2rem;
        border-radius: 10px;
        max-width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
    }

    .close-modal {
        position: absolute;
        right: 1rem;
        top: 1rem;
        font-size: 1.5rem;
        cursor: pointer;
    }

    .car-models-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
    }

    .car-model-card {
        background: #f8f9fa;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .car-model-card img {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }

    .car-model-card h3 {
        padding: 1rem;
        margin: 0;
    }

    .specs {
        padding: 1rem;
    }

    .specs p {
        margin: 0.5rem 0;
    }
`;

document.head.appendChild(style);

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.brand-card, .review-card, .news-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    observer.observe(card);
});

// Orders Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart and wishlist
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
    
    if (!localStorage.getItem('wishlist')) {
        localStorage.setItem('wishlist', JSON.stringify([]));
    }

    // Set up event listeners for filtering
    const searchInput = document.querySelector('.search-bar input');
    const categoryFilter = document.querySelector('.filter-options select');
    const priceFilter = document.querySelector('.price-filter input');

    if (searchInput) searchInput.addEventListener('input', filterProducts);
    if (categoryFilter) categoryFilter.addEventListener('change', filterProducts);
    if (priceFilter) priceFilter.addEventListener('input', filterProducts);

    // Set up event listeners for product cards
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    const quickViewButtons = document.querySelectorAll('.quick-view');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const product = {
                id: productCard.dataset.id,
                name: productCard.querySelector('h3').textContent,
                price: parseFloat(productCard.querySelector('.price').textContent.replace('P', '')),
                image: productCard.querySelector('img').src,
                quantity: 1
            };
            addToCart(product);
        });
    });

    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const product = {
                id: productCard.dataset.id,
                name: productCard.querySelector('h3').textContent,
                price: parseFloat(productCard.querySelector('.price').textContent.replace('P', '')),
                image: productCard.querySelector('img').src
            };
            toggleWishlist(product, this);
        });
    });

    quickViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const product = {
                id: productCard.dataset.id,
                name: productCard.querySelector('h3').textContent,
                price: parseFloat(productCard.querySelector('.price').textContent.replace('P', '')),
                image: productCard.querySelector('img').src,
                description: productCard.dataset.description || 'No description available.'
            };
            showQuickView(product);
        });
    });

    // Set up checkout button
    const checkoutButton = document.querySelector('.checkout-btn');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', proceedToCheckout);
    }

    // Update cart summary
    updateCartSummary();
});

function filterProducts() {
    const searchTerm = document.querySelector('.search-bar input').value.toLowerCase();
    const category = document.querySelector('select[name="category"]').value;
    const price = document.querySelector('select[name="price"]').value;
    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
        const title = product.querySelector('h3').textContent.toLowerCase();
        const productCategory = product.dataset.category;
        const productPrice = parseFloat(product.dataset.price);

        const matchesSearch = title.includes(searchTerm);
        const matchesCategory = category === 'all' || productCategory === category;
        const matchesPrice = price === 'all' || 
            (price === 'under-50' && productPrice < 50) ||
            (price === '50-100' && productPrice >= 50 && productPrice <= 100) ||
            (price === 'over-100' && productPrice > 100);

        product.style.display = matchesSearch && matchesCategory && matchesPrice ? 'block' : 'none';
    });
}

function addToCart(product) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(product);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Show confirmation
    const confirmation = document.createElement('div');
    confirmation.className = 'cart-confirmation';
    confirmation.innerHTML = `
        <i class="fas fa-check"></i>
        <p>Added to cart!</p>
    `;
    document.body.appendChild(confirmation);
    
    setTimeout(() => {
        confirmation.remove();
    }, 2000);
}

function toggleWishlist(product, button) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist'));
    const existingItem = wishlist.find(item => item.id === product.id);
    
    if (existingItem) {
        wishlist = wishlist.filter(item => item.id !== product.id);
        button.classList.remove('active');
        showNotification('Item removed from wishlist');
    } else {
        wishlist.push(product);
        button.classList.add('active');
        showNotification('Item added to wishlist!');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function showQuickView(product) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <div class="modal-body">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-details">
                    <h2>${product.name}</h2>
                    <p class="price">P${product.price.toFixed(2)}</p>
                    <p>${product.description}</p>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.close');
    const addToCartBtn = modal.querySelector('.add-to-cart');
    
    closeBtn.onclick = function() {
        modal.remove();
    };
    
    addToCartBtn.onclick = function() {
        addToCart(product);
        modal.remove();
    };
    
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.remove();
        }
    };
}

function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const cartItems = document.querySelector('.cart-items');
    const subtotalElement = document.querySelector('.subtotal');
    const shippingElement = document.querySelector('.shipping');
    const totalElement = document.querySelector('.total');
    
    if (cartItems) {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>P${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <button class="remove-item" data-id="${item.id}">×</button>
            </div>
        `).join('');
        
        // Add event listeners to remove buttons
        const removeButtons = cartItems.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.dataset.id;
                removeFromCart(itemId);
            });
        });
    }
    
    if (subtotalElement && shippingElement && totalElement) {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 0 ? 50 : 0;
        const total = subtotal + shipping;
        
        subtotalElement.textContent = `P${subtotal.toFixed(2)}`;
        shippingElement.textContent = `P${shipping.toFixed(2)}`;
        totalElement.textContent = `P${total.toFixed(2)}`;
    }
}

function removeFromCart(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartSummary();
    showNotification('Item removed from cart');
}

function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }

    // Format cart items for WhatsApp message
    const message = cart.map(item => 
        `${item.name} x${item.quantity} - P${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 50;
    
    const whatsappMessage = `Hello! I would like to place an order:\n\n${message}\n\nShipping: P50.00\nTotal: P${total.toFixed(2)}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/26776001655?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Feedback Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const rating = document.getElementById('rating').value;
            const message = document.getElementById('message').value;
            
            const feedback = {
                name,
                email,
                rating,
                message,
                date: new Date().toLocaleDateString()
            };
            
            // Save feedback to localStorage
            let feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
            feedbacks.unshift(feedback); // Add new feedback at the beginning
            localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
            
            // Display feedbacks
            displayFeedbacks();
            
            // Reset form
            feedbackForm.reset();
            
            // Show notification
            showNotification('Thank you for your feedback!');
        });
        
        // Display existing feedbacks
        displayFeedbacks();
    }
});

function displayFeedbacks() {
    const feedbacksContainer = document.querySelector('.feedbacks-container');
    if (!feedbacksContainer) return;
    
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    
    if (feedbacks.length === 0) {
        feedbacksContainer.innerHTML = '<p class="no-feedback">No feedback yet. Be the first to share your thoughts!</p>';
        return;
    }
    
    feedbacksContainer.innerHTML = feedbacks.map(feedback => `
        <div class="feedback-card">
            <div class="feedback-header">
                <div class="user-info">
                    <i class="fas fa-user-circle"></i>
                    <div>
                        <h4>${feedback.name}</h4>
                        <p class="date">${feedback.date}</p>
                    </div>
                </div>
                <div class="rating">
                    ${'★'.repeat(feedback.rating)}${'☆'.repeat(5 - feedback.rating)}
                </div>
            </div>
            <p class="feedback-message">${feedback.message}</p>
        </div>
    `).join('');
}

// Add to Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add to Cart buttons
    const addToCartButtons = document.querySelectorAll('.cta-button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const product = {
                name: productCard.querySelector('h4').textContent,
                price: parseFloat(productCard.querySelector('p').textContent.replace('$', '')),
                image: productCard.querySelector('img').src
            };
            addToCart(product);
        });
    });

    // Social media links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('aria-label').toLowerCase();
            if (platform.includes('instagram')) {
                window.open('https://instagram.com/eleganceboutique', '_blank');
            } else if (platform.includes('tiktok')) {
                window.open('https://tiktok.com/@eleganceboutique', '_blank');
            }
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', 
                hamburger.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
            );
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks && navLinks.classList.contains('active') && 
            !event.target.closest('.navbar')) {
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
});