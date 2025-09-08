// Theme Management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Add event listener
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Update icon
        this.updateIcon();
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
        this.updateIcon();
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    updateIcon() {
        const icon = this.themeToggle.querySelector('i');
        if (this.currentTheme === 'light') {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.navbar = document.querySelector('.navbar');
        this.init();
    }

    init() {
        // Hamburger menu toggle
        this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
        
        // Close menu when clicking on nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => this.handleScroll());

        // Active link highlighting
        window.addEventListener('scroll', () => this.highlightActiveSection());
    }

    toggleMobileMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }

    closeMobileMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
    }

    handleScroll() {
        if (window.scrollY > 100) {
            this.navbar.style.background = 'var(--bg-card)';
            this.navbar.style.backdropFilter = 'blur(10px)';
            this.navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            this.navbar.style.background = 'var(--bg-card)';
            this.navbar.style.backdropFilter = 'blur(10px)';
            this.navbar.style.boxShadow = 'none';
        }
    }

    highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
}

// Smooth Scroll Manager
class SmoothScrollManager {
    constructor() {
        this.init();
    }

    init() {
        // Handle smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                
                // Check if targetId is valid and not just '#'
                if (targetId && targetId.length > 1) {
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
}

// Resume Download Manager
class ResumeManager {
    constructor() {
        this.downloadButton = document.getElementById('downloadResume');
        this.init();
    }

    init() {
        this.downloadButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.downloadResume();
        });
    }

    downloadResume() {
        // Create a simple resume content
        const resumeContent = this.generateResumeContent();
        
        // Create and download the file
        const blob = new Blob([resumeContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'Vikas_Patel_Resume.txt';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        // Show success message
        this.showNotification('Resume downloaded successfully!');
    }

    generateResumeContent() {
        return `
VIKAS PATEL
Aspiring Software Developer

Contact Information:
Phone: +91 9876543210
Email: vikaspatel.dev@gmail.com
Location: Kanadiya Road, Indore, MP

OBJECTIVE:
Passionate B.Tech IT student with strong foundation in web development technologies, 
seeking opportunities to contribute to innovative projects and grow in the tech industry.

EDUCATION:
- B.Tech (Information Technology) - 4th Semester
  RGPV University - Current
- Higher Secondary Education
  Government School - Completed

SKILLS:
Technical Skills:
- HTML5, CSS3, JavaScript
- C Programming
- Problem Solving
- Responsive Web Design

Currently Learning:
- React.js
- Git Version Control

PROJECTS:
1. Roller Blind Product Page
   - Modern, responsive product showcase
   - Features: Product gallery, specifications, contact integration
   - Technologies: HTML, CSS, JavaScript
   - Live: https://readdy.link/preview/4f0acf4e-7761-4140-ace6-593e5fd8daa6/1174480/products/roller-blind

2. App Volume Control (Upcoming)
   - Android-like volume control application
   - Focus on modern UI and user experience

STRENGTHS:
- Self-motivated learner from rural background
- Strong determination to excel in technology
- Continuous learning mindset
- Problem-solving abilities

INTERESTS:
- Web Development
- Modern JavaScript Frameworks
- User Experience Design
- Open Source Contribution
        `;
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Animation Manager
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        // Initialize AOS (Animate On Scroll)
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100
            });
        }

        // Add custom animations
        this.addScrollAnimations();
        this.addHoverAnimations();
    }

    addScrollAnimations() {
        // Animate elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.project-card, .skill-category, .timeline-item, .contact-item').forEach(el => {
            observer.observe(el);
        });
    }

    addHoverAnimations() {
        // Add subtle hover animations to interactive elements
        const interactiveElements = document.querySelectorAll('.project-card, .skill-item, .contact-item');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-5px)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translateY(0)';
            });
        });
    }
}

// Contact Manager
class ContactManager {
    constructor() {
        this.init();
    }

    init() {
        // Add click tracking for contact methods
        document.querySelectorAll('.contact-item a').forEach(link => {
            link.addEventListener('click', (e) => {
                const contactType = this.getContactType(link.href);
                this.trackContactClick(contactType);
            });
        });
    }

    getContactType(href) {
        if (href.startsWith('tel:')) return 'phone';
        if (href.startsWith('mailto:')) return 'email';
        return 'other';
    }

    trackContactClick(type) {
        console.log(`Contact method clicked: ${type}`);
        // Here you could add analytics tracking if needed
    }
}

// Performance Manager
class PerformanceManager {
    constructor() {
        this.init();
    }

    init() {
        // Lazy load images
        this.lazyLoadImages();
        
        // Optimize scroll performance
        this.optimizeScrollPerformance();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    optimizeScrollPerformance() {
        let ticking = false;

        const updateScrollEffects = () => {
            // Update scroll-based effects here
            ticking = false;
        };

        const requestScrollUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    }
}

// Initialize Application
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeManagers());
        } else {
            this.initializeManagers();
        }
    }

    initializeManagers() {
        // Initialize all managers
        this.themeManager = new ThemeManager();
        this.navigationManager = new NavigationManager();
        this.smoothScrollManager = new SmoothScrollManager();
        this.resumeManager = new ResumeManager();
        this.animationManager = new AnimationManager();
        this.contactManager = new ContactManager();
        this.performanceManager = new PerformanceManager();

        // Add any global event listeners
        this.addGlobalEventListeners();

        console.log('Portfolio application initialized successfully!');
    }

    addGlobalEventListeners() {
        // Add keyboard navigation support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.navigationManager.closeMobileMenu();
            }
        });

        // Add focus management for accessibility
        document.addEventListener('focusin', (e) => {
            if (e.target.matches('.nav-link, .btn, button, a')) {
                e.target.style.outline = '2px solid var(--primary-color)';
                e.target.style.outlineOffset = '2px';
            }
        });

        document.addEventListener('focusout', (e) => {
            e.target.style.outline = 'none';
        });
    }
}

// Start the application
const portfolioApp = new PortfolioApp();

// Add some additional CSS for animations via JavaScript
const additionalCSS = `
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
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

    .nav-link.active {
        color: var(--primary-color) !important;
    }

    .nav-link.active::after {
        width: 100%;
    }
`;

// Inject additional CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);
          
