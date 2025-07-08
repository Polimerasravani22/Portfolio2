document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const readMoreBtn = document.getElementById('readMoreBtn');
    const contactForm = document.getElementById('contact-form');

    // Navigation switching
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            sections.forEach(section => section.classList.remove('active'));

            const targetSection = document.getElementById(this.dataset.section);
            if (targetSection) {
                targetSection.classList.add('active');
                if (this.dataset.section === 'skills') {
                    animateSkillBars();
                }
            }
        });
    });

    // Read More button functionality
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', function () {
            navLinks.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));

            const aboutNavLink = document.querySelector('.nav-link[data-section="about"]');
            const aboutSection = document.getElementById('about');

            if (aboutNavLink) aboutNavLink.classList.add('active');
            if (aboutSection) aboutSection.classList.add('active');
        });
    }

    // Contact form submission
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwSiT89Ac3Pqm_uoLdyrNRihNdbimEfqNmostZp8ns0J-c3YH86YSkJOaTWKI3lshef/exec';

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(contactForm);

            fetch(scriptURL, {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.result === 'success') {
                        showNotification('Message sent successfully!', 'success');
                        contactForm.reset();
                    } else {
                        showNotification('Error: ' + data.error, 'error');
                    }
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    showNotification('Failed to send message.', 'error');
                });
        });
    }

    // Animate skill bars
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    }

    // Show notification
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = notification ${type};
        notification.textContent = message;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            ${type === 'success' ? 'background: #4caf50;' : 'background: #f44336;'}
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Profile image fade-in and fallback
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.addEventListener('load', function () {
            this.style.opacity = '1';
        });

        profileImg.addEventListener('error', function () {
            this.src = 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400';
        });
    }

    // Project card hover
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Typing effect
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }

    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Parallax effect
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('#home');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = translateY(${speed}px);
        }
    });

    // Mobile menu toggle
    function createMobileMenuToggle() {
        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-menu-toggle';
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        mobileToggle.style.cssText = `
            display: none;
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 1001;
            background: var(--accent-color);
            color: white;
            border: none;
            padding: 10px;
            border-radius: 5px;
            cursor: pointer;
        `;

        document.body.appendChild(mobileToggle);

        mobileToggle.addEventListener('click', function () {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) sidebar.classList.toggle('active');
        });

        function checkScreenSize() {
            if (window.innerWidth <= 768) {
                mobileToggle.style.display = 'block';
            } else {
                mobileToggle.style.display = 'none';
                const sidebar = document.querySelector('.sidebar');
                if (sidebar) sidebar.classList.remove('active');
            }
        }

        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();
    }

    createMobileMenuToggle();

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-category, .project-card, .timeline-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Custom cursor
document.addEventListener('mousemove', function (e) {
    let cursor = document.querySelector('.custom-cursor');
    if (!cursor) {
        cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--accent-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(cursor);
    }

    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

document.addEventListener('mouseenter', function (e) {
    if (e.target.matches('button, a, .nav-link, .project-card')) {
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) cursor.style.transform = 'scale(1.5)';
    }
}, true);

document.addEventListener('mouseleave', function (e) {
    if (e.target.matches('button, a, .nav-link, .project-card')) {
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) cursor.style.transform = 'scale(1)';
    }
}, true);
