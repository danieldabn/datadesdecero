document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const header = document.querySelector('.header');
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    const form = document.getElementById('contactForm');
    const processHeaders = document.querySelectorAll('.process-header');
    const links = document.querySelectorAll('a[href^="#"]');
    const cards = document.querySelectorAll('.service-card, .about-card, .process-card');
    const heroTitle = document.querySelector('.hero-title');
    const heroStats = document.querySelector('.hero-stats');

    // Ensure hero elements are visible immediately
    if (heroTitle) heroTitle.style.opacity = '1';
    if (heroStats) heroStats.style.opacity = '1';

    // Form options in Spanish
    const formOptions = {
        company_size: ["10-50 empleados", "50-200 empleados", "200-500 empleados", "500+ empleados"],
        project_type: ["Inteligencia de Negocios", "Modelos Predictivos con IA", "Automatización de Procesos", "No estoy seguro - Necesito consulta"],
        budget_range: ["€5,000 - €12,000", "€12,000 - €25,000", "€25,000+", "Necesito consulta"],
        timeline: ["6-8 semanas", "8-12 semanas", "12+ semanas", "Flexible"]
    };

    // Initialize form options
    document.getElementById('company_size').innerHTML = formOptions.company_size.map(opt => `<option value="${opt}">${opt}</option>`).join('');
    document.getElementById('project_type').innerHTML = formOptions.project_type.map(opt => `<option value="${opt}">${opt}</option>`).join('');
    document.getElementById('budget_range').innerHTML = formOptions.budget_range.map(opt => `<option value="${opt}">${opt}</option>`).join('');
    document.getElementById('timeline').innerHTML = formOptions.timeline.map(opt => `<option value="${opt}">${opt}</option>`).join('');

    // Add data-aos attributes to elements for animations
    const animatedElements = document.querySelectorAll('.service-card, .process-card, .stat, .hero-title, .hero-subtitle');
    animatedElements.forEach(el => {
        el.setAttribute('data-aos', 'fade-up');
    });

    // Header scroll effect with enhanced color transition
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            header.classList.add('scrolled');
            // Add gradient background effect
            header.style.background = `rgba(10, 10, 15, ${Math.min(currentScroll / 500, 0.95)})`;
        } else {
            header.classList.remove('scrolled');
            header.style.background = 'transparent';
        }
        lastScroll = currentScroll;
    });

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

    // Initialize stats visibility
    stats.forEach(stat => {
        stat.style.opacity = '1';
        stat.style.visibility = 'visible';
    });

    // Intersection Observer for stat animations
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

    // Process steps expansion with smooth animations
    processHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const button = this.querySelector('.expand-btn');
            const isActive = content.classList.contains('active');

            // Close all other sections with animation
            document.querySelectorAll('.process-content').forEach(content => {
                content.style.maxHeight = '0px';
                content.classList.remove('active');
            });
            document.querySelectorAll('.expand-btn').forEach(btn => {
                btn.classList.remove('active');
                btn.style.transform = 'rotate(0deg)';
            });

            // Toggle current section with animation
            if (!isActive) {
                content.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
                button.classList.add('active');
                button.style.transform = 'rotate(45deg)';
            }
        });
    });

    // Enhanced smooth scroll with offset calculation
    links.forEach(anchor => {
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
                if (navMenu) {
                    navMenu.classList.remove('active');
                    menuToggle?.classList.remove('active');
                }
            }
        });
    });

    // Card hover effects
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Contact form handling with enhanced validation and animations
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Add loading state with animation
            submitBtn.innerHTML = '<span class="loading-spinner"></span> Enviando...';
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form submission)
            setTimeout(() => {
                submitBtn.innerHTML = '¡Mensaje enviado! <span class="check-mark">✓</span>';
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('success');
                form.reset();
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.classList.remove('success');
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }

    // Mobile menu with enhanced animations
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Animate menu items
            const menuItems = navMenu.querySelectorAll('a');
            menuItems.forEach((item, index) => {
                if (navMenu.classList.contains('active')) {
                    item.style.animation = `fadeInRight 0.5s ease forwards ${index * 0.1}s`;
                } else {
                    item.style.animation = '';
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (hero) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });
});