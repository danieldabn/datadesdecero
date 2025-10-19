document.addEventListener('DOMContentLoaded', function () {
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

    // Process cards collapsible functionality
    document.querySelectorAll('.process-header').forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const button = this.querySelector('.expand-btn');
            const isActive = content.classList.contains('active');

            // Close all other sections
            document.querySelectorAll('.process-content').forEach(content => {
                content.classList.remove('active');
            });
            document.querySelectorAll('.expand-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // Toggle current section
            if (!isActive) {
                content.classList.add('active');
                button.classList.add('active');
            }
        });
    });

    // Smooth header background change on scroll
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    }

    // Throttle scroll events
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
            setTimeout(() => { ticking = false; }, 16);
        }
    }

    window.addEventListener('scroll', requestTick);

    // Responsive mobile nav toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
        }
    });

    // Smooth scrolling for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({ 
                    top: targetPosition, 
                    behavior: 'smooth' 
                });
            }
            
            navMenu.classList.remove('active');
        });
    });

    // Hero CTA scroll to contact
    const heroCta = document.querySelector('.hero-cta');
    if (heroCta) {
        heroCta.addEventListener('click', function() {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = contactSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({ 
                    top: targetPosition, 
                    behavior: 'smooth' 
                });
            }
        });
    }

    // Intersection Observer for card animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = Math.random() * 0.3 + 's';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all cards for animation
    document.querySelectorAll('.value-card, .process-card, .portfolio-card, .service-card').forEach(card => {
        cardObserver.observe(card);
    });

    // Contact Form Submission & Validation
    document.getElementById('contactForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const messages = {
            required: "Este campo es requerido.",
            email: "Por favor ingrese una dirección de email válida.",
            success: "¡Éxito! Su mensaje ha sido enviado."
        };
        
        let valid = true, msg = "";

        this.querySelectorAll("input, select, textarea").forEach(el => {
            if (el.required && !el.value.trim()) {
                valid = false;
                msg += `${el.previousElementSibling.textContent}: ${messages.required}<br>`;
            } else if (el.type === "email" && el.value && !el.value.match(/^[^@ ]+@[^@ ]+\.[^@ ]+$/)) {
                valid = false;
                msg += `${el.previousElementSibling.textContent}: ${messages.email}<br>`;
            }
        });

        const formMsgEl = document.getElementById('formMessage');
        if (valid) {
            formMsgEl.innerHTML = messages.success;
            formMsgEl.className = 'form-message';
            this.reset();
            
            setTimeout(() => {
                formMsgEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        } else {
            formMsgEl.innerHTML = msg;
            formMsgEl.className = 'form-message error';
        }
    });

    // Add loading state to form submission
    const form = document.getElementById('contactForm');
    const submitBtn = document.querySelector('.form-submit');
    const originalSubmitText = submitBtn.textContent;

    form.addEventListener('submit', function() {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalSubmitText;
        }, 2000);
    });
});