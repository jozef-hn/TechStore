document.addEventListener("scroll", () => {
    const heroImage = document.querySelector(".hero-image");
    if (heroImage) {
        const scrollPosition = window.scrollY;
        
        // When scroll position is at the top, reset scale to 1
        if (scrollPosition === 0) {
            heroImage.style.transform = `translateY(0) scale(1)`;
        } else {
            // Apply the transform when scrolling
            heroImage.style.transform = `translateY(${scrollPosition * 0.2}px) scale(1.05)`;
        }
    }
});

const sliderTrack = document.getElementById('slider-track');

if (sliderTrack) {
    function duplicateSlides() {
        const slides = Array.from(sliderTrack.children);
        slides.forEach(slide => {
            const clone = slide.cloneNode(true);

            // Copy the background image if it's set via CSS
            const backgroundImage = window.getComputedStyle(slide).backgroundImage;
            if (backgroundImage !== 'none') {
                clone.style.backgroundImage = backgroundImage;
            }

            sliderTrack.appendChild(clone);
        });
    }

    duplicateSlides();
}


//menu
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');
if (bar && nav) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}
if (close && nav) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

// Product's Filtering checked
function filterProducts(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    const products = document.querySelectorAll('.pro');

    // Remove 'actived' class from all buttons
    buttons.forEach(button => {
        button.classList.remove('actived');
    });

    // Add 'actived' class to the clicked button
    document.querySelector(`.filter-btn[onclick="filterProducts('${category}')"]`).classList.add('actived');

    // Filter products based on the selected category
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Function to open the popup with product details
function openProductPopup(title, imgSrc, price, company, description) {
    const popup = document.getElementById('product-popup');
    document.getElementById('popup-title').textContent = title;
    document.getElementById('popup-img').src = imgSrc;
    document.getElementById('popup-price').textContent = price;
    document.getElementById('popup-company').textContent = company;
    document.getElementById('popup-description').textContent = description;

    // Create star elements dynamically
    const starsContainer = document.getElementById('popup-stars');
    starsContainer.innerHTML = ''; // Clear existing stars
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('i');
        star.classList.add('fa-solid', 'fa-star');
        starsContainer.appendChild(star);
    }

    // Set the dynamic cart button
    const cartButton = document.getElementById('add-to-cart');
    cartButton.setAttribute('onclick', `addToCart({name: '${title}', image: '${imgSrc}', company: '${company}', price: '${price}'})`);

    // Show the popup
    popup.classList.remove('hidden');
    popup.style.display = 'block';
}

// Function to close the popup
function closeProductPopup() {
    const popup = document.getElementById('product-popup');
    popup.classList.add('hidden');
    popup.style.display = 'none';
}

// Function to add product to the cart
function addToCart(product) {
    console.log('Added to cart:', product);
    // You can implement cart logic here, e.g., add the product to a shopping cart array
}

// Reviews Data
const reviews = [
    {
        text: "TechStore's service is outstanding! Highly recommend.",
        stars: 5,
        name: "Alice Johnson",
        icon: "woman.jpg", // Path to the empty profile image
    },
    {
        text: "Great prices and excellent customer support. Will shop again.",
        stars: 4,
        name: "John Smith",
        icon: "man.jpg", // Path to the empty profile image
    },
    {
        text: "Amazing quality and fast delivery. Couldn't ask for more.",
        stars: 5,
        name: "Emily Davis",
        icon: "woman.jpg", // Path to the empty profile image
    },
];

let currentReview = 0;

function showReview() {
    const reviewContainer = document.getElementById("reviews-container");
    if (reviewContainer) {
        const review = reviews[currentReview];
        const stars = "★".repeat(review.stars) + "☆".repeat(5 - review.stars);

        reviewContainer.innerHTML = `
            <div class="review-item">
                <img class="icon" src="${review.icon}" alt="Profile Picture">
                <div class="content">
                    <div class="review-text">${review.text}</div>
                    <div class="stars">${stars}</div>
                    <div class="customer-name">${review.name}</div>
                </div>
            </div>
        `;

        currentReview = (currentReview + 1) % reviews.length;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    showReview();
    setInterval(showReview, 3000);
});

//new cart
let cart = [];

function addToCart(product) {
    const existingProduct = cart.find(item => item.name === product.name);
    if (!existingProduct) {
        cart.push(product);
    }
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = savedCart;
    updateCartUI();
}

function updateCartUI() {
    const cartTableBody = document.querySelector('#cart-table tbody');
    const cartTotal = document.getElementById('cart-total');
    if (cartTableBody && cartTotal) {
        cartTableBody.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}"></td>
                <td>${item.name}</td>
                <td>${item.company}</td>
                <td>${item.price}</td>
                <td><button onclick="removeFromCart(${index})" class="remove-btn">❌</button></td>
            `;
            cartTableBody.appendChild(row);
            total += parseFloat(item.price.replace('$', ''));
        });

        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

document.getElementById('buy-now')?.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your purchase!');
    cart = [];
    saveCart();
    updateCartUI();
});

document.addEventListener('DOMContentLoaded', loadCart);
