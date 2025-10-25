document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const header = document.querySelector('.header');
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    const form = document.getElementById('contactForm');
    const processCards = document.querySelectorAll('.process-card');
    const heroTitle = document.querySelector('.hero-title');
    const heroStats = document.querySelector('.hero-stats');

    // Ensure hero elements are visible immediately
    if (heroTitle) heroTitle.style.opacity = '1';
    if (heroStats) heroStats.style.opacity = '1';

    // Add intersection observer for fade-in animations
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements that should fade in
    document.querySelectorAll('.hero-title, .hero-subtitle, .hero-stats, .stat').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        fadeInObserver.observe(el);
    });

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value + '%';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Initialize stats animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                animateValue(target, 0, finalValue, 2000);
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));

    // Process Timeline Interaction
    processCards.forEach(card => {
        const header = card.querySelector('.process-header');
        const content = card.querySelector('.process-content');
        const expandBtn = card.querySelector('.expand-btn');

        header.addEventListener('click', () => {
            // Close all other sections
            document.querySelectorAll('.process-content.active').forEach(activeContent => {
                if (activeContent !== content) {
                    activeContent.classList.remove('active');
                    activeContent.previousElementSibling.querySelector('.expand-btn').classList.remove('active');
                }
            });

            // Toggle current section
            content.classList.toggle('active');
            expandBtn.classList.toggle('active');
            expandBtn.setAttribute('aria-expanded', content.classList.contains('active'));
        });
    });

    // Form Handling
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitButton = e.target.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.innerHTML = '<span class="loading-spinner"></span>Enviando...';
            submitButton.disabled = true;

            try {
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    company: document.getElementById('company').value,
                    companySize: document.getElementById('company_size').value,
                    projectType: document.getElementById('project_type').value,
                    message: document.getElementById('message').value
                };

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));

                submitButton.innerHTML = 'Enviado <span class="check-mark">✓</span>';
                submitButton.classList.add('success');

                setTimeout(() => {
                    e.target.reset();
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    submitButton.classList.remove('success');
                }, 3000);

            } catch (error) {
                submitButton.innerHTML = 'Error al enviar';
                submitButton.classList.add('error');
                
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    submitButton.classList.remove('error');
                }, 3000);
            }
        });
    }

    // Enhanced smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = header.offsetHeight;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navMenu?.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle?.classList.remove('active');
                }
            }
        });
    });

    // Mobile menu handling
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate menu items
            navMenu.querySelectorAll('a').forEach((item, index) => {
                if (navMenu.classList.contains('active')) {
                    item.style.animation = `fadeInRight 0.5s ease forwards ${index * 0.1}s`;
                } else {
                    item.style.animation = '';
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !e.target.closest('.nav-menu') && 
                !e.target.closest('.menu-toggle')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }

    // Header scroll effect
    if (header) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                header.classList.add('scrolled');
                header.style.background = `rgba(10, 10, 15, ${Math.min(currentScroll / 500, 0.95)})`;
            } else {
                header.classList.remove('scrolled');
                header.style.background = 'transparent';
            }
            
            lastScroll = currentScroll;
        });
    }
});