// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.benefit-card, .client-card, .pricing-card');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Currency Conversion Widget Logic
    const basePriceAUD = 45; // Base monthly price in AUD
    const baseDailyPriceAUD = 1.50; // Base daily price in AUD

    const exchangeRates = {
        'AUD': { rate: 1, symbol: '$', code: 'AUD' },
        'USD': { rate: 0.66, symbol: '$', code: 'USD' },
        'GBP': { rate: 0.52, symbol: '£', code: 'GBP' },
        'EUR': { rate: 0.61, symbol: '€', code: 'EUR' },
        'NZD': { rate: 1.08, symbol: '$', code: 'NZD' }
    };

    const currencySelect = document.getElementById('currency-select');
    const displayPrice = document.getElementById('displayPrice');
    const displayCurrencySymbol = document.getElementById('displayCurrencySymbol');
    const displayCurrencyCode = document.getElementById('displayCurrencyCode');
    const displayDailyPrice = document.getElementById('displayDailyPrice');

    function updatePrices() {
        const selectedCurrency = currencySelect.value;
        const rate = exchangeRates[selectedCurrency].rate;
        const symbol = exchangeRates[selectedCurrency].symbol;
        const code = exchangeRates[selectedCurrency].code;

        const convertedMonthlyPrice = (basePriceAUD * rate).toFixed(2);
        const convertedDailyPrice = (baseDailyPriceAUD * rate).toFixed(2);

        displayPrice.textContent = convertedMonthlyPrice;
        displayCurrencySymbol.textContent = symbol;
        displayCurrencyCode.textContent = `${code} / month`;
        displayDailyPrice.textContent = `${symbol}${convertedDailyPrice} ${code}`;
    }

    updatePrices(); // Initial update
    currencySelect.addEventListener('change', updatePrices);

    // SEO Keyword Generator
    const businessDescriptionInput = document.getElementById('business-description');
    const generateSeoKeywordsBtn = document.getElementById('generate-seo-keywords-btn');
    const loadingSpinner = document.getElementById('loading-spinner');
    const seoKeywordsOutput = document.getElementById('seo-keywords-output');
    const keywordsText = document.getElementById('keywords-text');

    generateSeoKeywordsBtn.addEventListener('click', async function() {
        const businessDesc = businessDescriptionInput.value.trim();

        if (!businessDesc) {
            keywordsText.innerHTML = '<p style="color: #ef4444;">Please describe your business first to generate keywords!</p>';
            seoKeywordsOutput.classList.remove('hidden');
            return;
        }

        keywordsText.innerHTML = '';
        seoKeywordsOutput.classList.remove('hidden');
        loadingSpinner.classList.remove('hidden');
        generateSeoKeywordsBtn.disabled = true;
        generateSeoKeywordsBtn.style.opacity = '0.7';
        generateSeoKeywordsBtn.style.cursor = 'not-allowed';

        try {
            const prompt = `Based on the following business description, suggest 5-10 relevant SEO keywords and short phrases that a potential customer might use to find this business online. Focus on practical, actionable keywords.
            \nBusiness Description: ${businessDesc}`;

            let chatHistory = [];
            chatHistory.push({ role: "user", parts: [{ text: prompt }] });
            const payload = { contents: chatHistory };
            const apiKey = ""; // API key would be provided in production
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            // Simulate API call for demo purposes
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Mock response for demo
            const mockKeywords = [
                "• " + businessDesc.toLowerCase() + " services",
                "• Local " + businessDesc.toLowerCase(),
                "• Professional " + businessDesc.toLowerCase(),
                "• Best " + businessDesc.toLowerCase() + " near me",
                "• Affordable " + businessDesc.toLowerCase(),
                "• Custom " + businessDesc.toLowerCase() + " solutions"
            ];
            
            keywordsText.innerHTML = mockKeywords.join('<br>');

        } catch (error) {
            keywordsText.innerHTML = '<p style="color: #ef4444;">An error occurred while generating keywords. Please try again.</p>';
            console.error('Error calling API:', error);
        } finally {
            loadingSpinner.classList.add('hidden');
            generateSeoKeywordsBtn.disabled = false;
            generateSeoKeywordsBtn.style.opacity = '1';
            generateSeoKeywordsBtn.style.cursor = 'pointer';
        }
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = contactForm.querySelector('#name').value;
        const email = contactForm.querySelector('#email').value;
        const phone = contactForm.querySelector('#phone').value;
        const businessDescription = contactForm.querySelector('#business-description').value;
        const message = contactForm.querySelector('#message').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your inquiry! We\'ll get back to you soon to discuss your digital masterpiece.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Reset SEO keywords output
            const seoOutput = document.getElementById('seo-keywords-output');
            if (seoOutput) {
                seoOutput.classList.add('hidden');
            }
        }, 2000);
    });
}

// Button click effects
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Pricing card hover effects
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.08) translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1.05)';
    });
});

// Initialize tooltips (if needed)
document.querySelectorAll('[data-tooltip]').forEach(element => {
    element.addEventListener('mouseenter', (e) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = e.target.getAttribute('data-tooltip');
        document.body.appendChild(tooltip);
        
        const rect = e.target.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    });
    
    element.addEventListener('mouseleave', () => {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
});
