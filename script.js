// Portfolio JavaScript - STMB
// Features: Loader, Cursor, Theme, Typing, Animations, Particles, Modal, Filter, Form

document.addEventListener('DOMContentLoaded', () => {
    // ===== LOADER =====
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1500);

    // ===== CUSTOM CURSOR =====
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: 'forwards' });
        });

        // Cursor hover effects
        document.querySelectorAll('a, button, .project-card, .skill-item').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.style.width = '12px';
                cursorDot.style.height = '12px';
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.opacity = '0.8';
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.style.width = '8px';
                cursorDot.style.height = '8px';
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.opacity = '0.5';
            });
        });
    }

    // ===== THEME TOGGLE =====
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const savedTheme = localStorage.getItem('theme') || 'dark';

    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // ===== TYPING EFFECT =====
    const typingText = document.getElementById('typing-text');
    const phrases = [
        'Electrical Engineer',
        'Aspiring Robotics Engineer',
        'ROS 2 Developer',
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }
    typeEffect();

    // ===== PARTICLE BACKGROUND =====
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const particlesContainer = document.getElementById('particles-js');
    particlesContainer.appendChild(canvas);

    let particles = [];
    const particleCount = 60;
    const connectionDistance = 150;

    function resizeCanvas() {
        canvas.width = particlesContainer.offsetWidth;
        canvas.height = particlesContainer.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.color = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#6366f1';
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    initParticles();

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - distance / connectionDistance)})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===== MOBILE NAVIGATION =====
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // ===== ACTIVE NAV LINK =====
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // ===== SCROLL REVEAL =====
    const revealElements = document.querySelectorAll('.section-header, .about-content, .skills-content, .projects-grid, .timeline-item, .github-card, .contact-content, .stats-grid');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // ===== STATS COUNTER =====
    const statNumbers = document.querySelectorAll('.stat-number');

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statsObserver.observe(stat));

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 30);
    }

    // ===== SKILL BARS ANIMATION =====
    const skillBars = document.querySelectorAll('.skill-progress');

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillsObserver.observe(bar));

    // ===== PROJECT FILTERING =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ===== PROJECT MODAL =====
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.querySelector('.modal-close');

    const projectDetails = {
        1: {
            title: 'Gesture-Controlled TurtleBot3',
            tags: ['ROS 2', 'OpenCV', 'MediaPipe', 'Python', 'Computer Vision'],
            description: 'A sophisticated hand-gesture recognition system that bridges human-computer interaction with robotics. Built using OpenCV and MediaPipe for real-time hand landmark detection, mapped to ROS 2 velocity commands to control TurtleBot3 navigation.',
            features: [
                'Real-time hand gesture recognition using MediaPipe Hands',
                'ROS 2 publisher nodes for velocity command mapping',
                'Custom gesture definitions for forward, backward, left, right, stop',
                'OpenCV video stream integration with ROS 2 image transport',
                'TurtleBot3 simulation testing in Gazebo before hardware deployment'
            ]
        },
        2: {
            title: 'Real-Time Face Detection & Tracking',
            tags: ['ROS 2', 'OpenCV', 'Serial Communication', 'Embedded', 'Python'],
            description: 'An intelligent vision system that integrates OpenCV face detection algorithms with ROS 2 framework. Enables real-time face tracking with hardware actuation via serial communication for pan-tilt servo control.',
            features: [
                'Haar Cascade / DNN-based face detection in ROS 2 nodes',
                'Real-time bounding box tracking and centroid calculation',
                'Serial communication protocol for Arduino servo control',
                'Pan-tilt mechanism for active face following',
                'ROS 2 topic-based architecture for modular design'
            ]
        },
        3: {
            title: 'Autonomous Plant Watering Robot',
            tags: ['Arduino', 'Soil Sensors', 'IoT', 'Embedded C', 'Automation'],
            description: 'A fully autonomous mobile robot designed for agricultural automation. Features soil moisture sensing, automatic irrigation pump control, and real-time monitoring capabilities for smart farming applications.',
            features: [
                'Soil moisture sensor integration with threshold-based logic',
                'Automatic water pump activation via relay module',
                'Mobile robot chassis with obstacle avoidance',
                'Real-time LCD monitoring of soil status',
                'Power-efficient design for extended field operation',
                'Presented at SRISHTI 2026 National Technical Exhibition'
            ]
        },
        4: {
            title: '6-DOF Robotic Arm with GUI',
            tags: ['Arduino', 'Servo Motors', 'GUI', 'Kinematics', 'C++'],
            description: 'A precision 6-Degree-of-Freedom robotic arm controlled through an intuitive graphical user interface. Enables real-time manipulation of each joint with forward kinematics visualization and position control.',
            features: [
                '6 servo motor control with individual joint manipulation',
                'Custom GUI built with Processing / Python Tkinter',
                'Serial communication between PC and Arduino',
                'Real-time position feedback and angle display',
                'Pre-programmed motion sequences and pick-place operations',
                'Demonstrated at EXORDIUM 4.0 college technical fest'
            ]
        },
        5: {
            title: 'ROS 2 Trajectory & Path Planning',
            tags: ['ROS 2', 'Turtlesim', 'Path Planning', 'Python', 'Mathematics'],
            description: 'Advanced trajectory generation and path planning algorithms implemented as custom ROS 2 nodes. Features shape drawing capabilities, dynamic target tracking, and smooth curve interpolation for mobile robot navigation.',
            features: [
                'Custom ROS 2 nodes for trajectory generation',
                'Parametric shape drawing (circles, squares, spirals)',
                'Dynamic target tracking with proportional control',
                'Bézier curve and spline-based smooth path planning',
                'Turtlesim simulation environment for algorithm validation',
                'Modular architecture for easy deployment to physical robots'
            ]
        },
        6: {
            title: 'Hardware Automation: Chrome Dino Game',
            tags: ['Arduino', 'LDR Sensor', 'Servo Motor', 'Automation', 'C++'],
            description: 'A creative hardware automation project that plays the Chrome Dinosaur game automatically. Uses Light Dependent Resistor (LDR) to detect oncoming obstacles and servo motor to physically press the spacebar.',
            features: [
                'LDR-based obstacle detection with calibrated thresholds',
                'Servo motor mechanism for physical keypress automation',
                'Real-time response with minimal latency',
                'Adjustable sensitivity for different screen brightness',
                'Compact Arduino Nano implementation',
                'Demonstrates sensor-actuator closed-loop control principles'
            ]
        }
    };

    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            const project = projectDetails[projectId];

            if (project) {
                modalBody.innerHTML = `
                    <h2>${project.title}</h2>
                    <div class="modal-tags">
                        ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                    </div>
                    <p>${project.description}</p>
                    <h4 style="margin-bottom: 1rem; color: var(--text);">Key Features</h4>
                    <ul class="modal-features">
                        ${project.features.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                    <a href="https://github.com/SThirumalaMurthyBabu" target="_blank" class="btn btn-primary">
                        <i class="fab fa-github"></i> View on GitHub
                    </a>
                `;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // ===== GITHUB CONTRIBUTION GRAPH =====
const contributionGrid =
document.getElementById('contribution-grid');

if (contributionGrid) {

const weeks = 52;
const days = 7;

for (let w = 0; w < weeks; w++) {

    for (let d = 0; d < days; d++) {

        const cell =
        document.createElement('div');

        cell.className =
        'contribution-cell';

        const rand =
        Math.random();

        let level = 0;

        if (rand > 0.6) level = 1;
        if (rand > 0.75) level = 2;
        if (rand > 0.85) level = 3;
        if (rand > 0.92) level = 4;

        if (w > 40 && rand > 0.3)
            level = Math.min(level + 1, 4);

        if (level > 0) {
            cell.classList.add(
                `level-${level}`
            );
        }

        contributionGrid.appendChild(cell);
    }
}

}
    // ===== CONTACT FORM =====

emailjs.init("4b2eSit6raCSCTn2a");

const contactForm =
document.getElementById("contact-form");

if(contactForm){

contactForm.addEventListener(
"submit",
function(e){
    e.preventDefault();

    const btn = contactForm.querySelector(
        'button[type="submit"]'
    );

    const originalText = btn.innerHTML;

    btn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Sending...';

    btn.disabled = true;

    emailjs.send(
        "service_tg1xrdc",
        "template_499kd6a",
        {
            name:
                document.getElementById("name").value,

            email:
                document.getElementById("email").value,

            subject:
                document.getElementById("subject").value,

            message:
                document.getElementById("message").value
        }
    )

    .then(() => {

        btn.innerHTML =
            '<i class="fas fa-check"></i> Message Sent!';

        contactForm.reset();

    })

    .catch((err) => {

        console.log(err);

        btn.innerHTML =
            'Failed to Send';

    })

    .finally(() => {

        setTimeout(() => {

            btn.innerHTML =
                originalText;

            btn.disabled =
                false;

        }, 3000);

    });

});
}

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // ===== SCROLL INDICATOR HIDE =====
    const scrollIndicator = document.querySelector('.scroll-indicator');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });

    // ===== HERO PARALLAX =====
    const heroContent = document.querySelector('.hero-content');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
    });
});
