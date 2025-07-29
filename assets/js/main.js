// Main JavaScript file for Life Servicios website

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile detection
    const isMobile = () => window.innerWidth <= 768;
    
    // Hamburger menu functionality
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    let isMenuOpen = false;

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', function() {
            isMenuOpen = !isMenuOpen;
            
            // Toggle hamburger animation
            this.classList.toggle('active');
            
            // Toggle menu visibility
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (isMenuOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (isMobile() && isMenuOpen && 
                !hamburgerBtn.contains(e.target) && 
                !navMenu.contains(e.target)) {
                closeMenu();
            }
        });

        // Close menu on window resize if switching to desktop
        window.addEventListener('resize', function() {
            if (!isMobile() && isMenuOpen) {
                closeMenu();
            }
        });
    }

    function closeMenu() {
        isMenuOpen = false;
        hamburgerBtn?.classList.remove('active');
        navMenu?.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Navigation links functionality
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            // Close mobile menu when link is clicked
            if (isMobile() && isMenuOpen) {
                closeMenu();
            }
        });
    });

    // Hero button interactions with mobile support
    const heroButtons = document.querySelectorAll('.hero-btn');
    heroButtons.forEach(button => {
        // Click animation
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });

        // Touch support for mobile
        if ('ontouchstart' in window) {
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });

            button.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            });
        }
    });

    // Primary button special effects (desktop only)
    const primaryBtn = document.querySelector('.primary-btn');
    if (primaryBtn) {
        if (!isMobile()) {
            primaryBtn.addEventListener('mouseenter', function() {
                const cursor = this.querySelector('.btn-cursor');
                if (cursor) {
                    cursor.style.animation = 'pulse 1s infinite';
                }
            });

            primaryBtn.addEventListener('mouseleave', function() {
                const cursor = this.querySelector('.btn-cursor');
                if (cursor) {
                    cursor.style.animation = '';
                }
            });
        }
    }

    // Social icons interactions
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        if (!isMobile()) {
            // Desktop hover effects
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1) rotate(5deg)';
            });

            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        } else {
            // Mobile touch effects
            icon.addEventListener('touchstart', function() {
                this.style.transform = 'scale(1.1)';
            });

            icon.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            });
        }
    });

    // Navbar scroll effect (disabled when mobile menu is open)
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (isMenuOpen) return; // Don't hide navbar when menu is open
        
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add transition to navbar
    navbar.style.transition = 'transform 0.3s ease-in-out';

    // Parallax effect for hero section (desktop only)
    if (!isMobile()) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }

    // Button click handlers with haptic feedback
    document.querySelector('.primary-btn')?.addEventListener('click', function() {
        console.log('Conoce nuestros servicios clicked');
        
        // Haptic feedback on mobile
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
        
        // Add your navigation logic here
    });

    const secondaryBtns = document.querySelectorAll('.secondary-btn');
    secondaryBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            // Haptic feedback on mobile
            if ('vibrate' in navigator) {
                navigator.vibrate(30);
            }
            
            if (index === 0) {
                console.log('Cotiza tu servicio clicked');
                // Add cotization logic here
            } else {
                console.log('Haz tus consultas clicked');
                // Add consultation logic here
            }
        });
    });

    // Prevent zoom on double tap (iOS)
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // Escape key to close mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });
});

// CSS Animation keyframes (added via JavaScript)
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: translateY(-50%) scale(1); }
        50% { transform: translateY(-50%) scale(1.1); }
        100% { transform: translateY(-50%) scale(1); }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .hero-btn {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    .hero-btn:nth-child(1) { animation-delay: 0.2s; }
    .hero-btn:nth-child(2) { animation-delay: 0.4s; }
    .hero-btn:nth-child(3) { animation-delay: 0.6s; }
`;
document.head.appendChild(style);