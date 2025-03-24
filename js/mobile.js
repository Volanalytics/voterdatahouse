/**
 * Mobile enhancements for VoterDataHouse
 * Improves mobile navigation and user experience across the site
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation handling
    setupMobileNavigation();
    
    // Improve touch targets on mobile
    improveFormAccessibility();
    
    // Lazy load images for better mobile performance
    setupLazyLoading();
    
    // Add smooth scrolling for anchor links
    setupSmoothScrolling();
    
    // Add FAQ accordion functionality if on FAQ page
    if (document.querySelector('.faq-item')) {
        setupFaqAccordion();
    }
    
    // Add dynamic copyright year
    updateCopyrightYear();
});

/**
 * Mobile navigation toggle and accessibility improvements
 */
function setupMobileNavigation() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        // Initial ARIA state
        menuToggle.setAttribute('aria-expanded', 'false');
        
        // Toggle menu when hamburger icon is clicked
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const expanded = navLinks.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', expanded.toString());
            
            // Trap focus within mobile menu when open
            if (expanded) {
                trapFocus(navLinks);
            }
        });
        
        // Close menu when a link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && 
                !navLinks.contains(event.target) && 
                navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.focus(); // Return focus to toggle button
            }
        });
    }
}

/**
 * Focus trap for modals and navigation
 */
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    // Set initial focus
    firstFocusableElement.focus();
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            // Shift+Tab
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            // Tab
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

/**
 * Improve form accessibility for mobile devices
 */
function improveFormAccessibility() {
    // Make sure input fields are large enough for touch
    const formFields = document.querySelectorAll('input, select, textarea, button');
    
    formFields.forEach(field => {
        // Ensure minimum touch target size
        if (window.innerWidth <= 768) {
            field.style.minHeight = '44px';
            
            if (field.tagName.toLowerCase() === 'button') {
                field.style.minWidth = '44px';
            }
        }
        
        // Fix iOS zoom on focus
        if (field.tagName.toLowerCase() === 'input' || field.tagName.toLowerCase() === 'textarea') {
            field.style.fontSize = '16px';
        }
    });
    
    // Fix select styling on iOS
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        select.style.webkitAppearance = 'none';
        select.style.borderRadius = '4px';
    });
}

/**
 * Setup lazy loading for images to improve mobile page load time
 */
function setupLazyLoading() {
    // Check if browser supports native lazy loading
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const lazyImages = document.querySelectorAll('img');
        lazyImages.forEach(img => {
            img.loading = 'lazy';
        });
    } else {
        // Fall back to Intersection Observer for older browsers
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        image.src = image.dataset.src;
                        if (image.dataset.srcset) {
                            image.srcset = image.dataset.srcset;
                        }
                        image.classList.remove('lazy');
                        imageObserver.unobserve(image);
                    }
                });
            });
            
            lazyImages.forEach(image => {
                imageObserver.observe(image);
            });
        } else {
            // Fallback for older browsers without IntersectionObserver
            let lazyLoadThrottleTimeout;
            
            function lazyLoad() {
                if (lazyLoadThrottleTimeout) {
                    clearTimeout(lazyLoadThrottleTimeout);
                }
                
                lazyLoadThrottleTimeout = setTimeout(function() {
                    const scrollTop = window.pageYOffset;
                    
                    lazyImages.forEach(function(img) {
                        if (img.offsetTop < (window.innerHeight + scrollTop)) {
                            img.src = img.dataset.src;
                            if (img.dataset.srcset) {
                                img.srcset = img.dataset.srcset;
                            }
                            img.classList.remove('lazy');
                        }
                    });
                    
                    if (lazyImages.length == 0) { 
                        document.removeEventListener('scroll', lazyLoad);
                        window.removeEventListener('resize', lazyLoad);
                        window.removeEventListener('orientationChange', lazyLoad);
                    }
                }, 20);
            }
            
            document.addEventListener('scroll', lazyLoad);
            window.addEventListener('resize', lazyLoad);
            window.addEventListener('orientationChange', lazyLoad);
        }
    }
}

/**
 * Setup smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
    // Check if browser supports smooth scrolling natively
    if ('scrollBehavior' in document.documentElement.style) {
        // Browser supports it, apply via CSS
        document.documentElement.style.scrollBehavior = 'smooth';
    } else {
        // Fallback for browsers without native support
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                // Skip empty links or just "#"
                if (targetId === "#" || !targetId) return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    const startPosition = window.pageYOffset;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = 500; // ms
                    let start = null;
                    
                    window.requestAnimationFrame(step);
                    
                    function step(timestamp) {
                        if (!start) start = timestamp;
                        const progress = timestamp - start;
                        
                        window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
                        
                        if (progress < duration) {
                            window.requestAnimationFrame(step);
                        } else {
                            targetElement.tabIndex = '-1';
                            targetElement.focus();
                            window.history.pushState(null, '', targetId);
                        }
                    }
                    
                    // Easing function for smooth animation
                    function easeInOutCubic(t, b, c, d) {
                        t /= d/2;
                        if (t < 1) return c/2*t*t*t + b;
                        t -= 2;
                        return c/2*(t*t*t + 2) + b;
                    }
                }
            });
        });
    }
}

/**
 * Setup FAQ accordion functionality
 */
function setupFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Toggle active class on question
            this.classList.toggle('active');
            
            // Get the answer element (next sibling)
            const answer = this.nextElementSibling;
            
            // Toggle active class on answer
            if (answer.classList.contains('active')) {
                answer.classList.remove('active');
                // Update ARIA attributes
                this.setAttribute('aria-expanded', 'false');
                answer.setAttribute('aria-hidden', 'true');
            } else {
                answer.classList.add('active');
                // Update ARIA attributes
                this.setAttribute('aria-expanded', 'true');
                answer.setAttribute('aria-hidden', 'false');
            }
        });
        
        // Set initial ARIA attributes
        question.setAttribute('aria-expanded', 'false');
        question.nextElementSibling.setAttribute('aria-hidden', 'true');
    });
    
    // Setup search functionality if search box exists
    const searchBox = document.querySelector('.faq-search input');
    
    if (searchBox) {
        searchBox.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            // If search box is empty, show all questions
            if (searchTerm === '') {
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.style.display = 'block';
                });
                return;
            }
            
            // Filter FAQ items based on search term
            document.querySelectorAll('.faq-item').forEach(item => {
                const question = item.querySelector('.faq-question').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}

/**
 * Update copyright year to current year
 */
function updateCopyrightYear() {
    const copyrightElements = document.querySelectorAll('.footer-bottom p');
    const currentYear = new Date().getFullYear();
    
    copyrightElements.forEach(element => {
        element.innerHTML = element.innerHTML.replace(/\d{4}/, currentYear);
    });
}