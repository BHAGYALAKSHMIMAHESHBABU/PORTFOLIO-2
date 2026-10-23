/**
 * Bhagya Lakshmi — Portfolio Interactive Logic
 * Features:
 * - Mobile Navigation Drawer Toggle
 * - Glassmorphic Header Elevation on Scroll
 * - Active Navigation Spy on Scroll
 * - Project Category Filter Tabs with Smooth Transitions
 * - Project Details Modal with Comprehensive Technical Information
 * - Seamless Formspree AJAX Submission with Graceful Fallback
 * - Back to Top Floating Action
 * - AOS Animations Initialization
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 60
        });
    }

    // 2. Navigation Elements & Sticky Header Effect
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menu-toggle');
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const backToTopBtn = document.getElementById('back-to-top');

    // Header scroll background toggle & Back-to-Top display
    const handleScroll = () => {
        const scrollY = window.scrollY;

        if (header) {
            if (scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        if (backToTopBtn) {
            if (scrollY > 450) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        // Active Navigation Link Highlighting on Scroll (Scroll Spy)
        let currentSectionId = '';
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId === 'focus') {
            currentSectionId = 'about';
        }

        if (currentSectionId) {
            navLinks.forEach((link) => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 3. Mobile Navigation Menu Toggle
    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            const isActive = navbar.classList.toggle('active');
            if (menuIcon) {
                if (isActive) {
                    menuIcon.classList.remove('fa-bars');
                    menuIcon.classList.add('fa-xmark');
                } else {
                    menuIcon.classList.remove('fa-xmark');
                    menuIcon.classList.add('fa-bars');
                }
            }
        });

        // Close mobile nav when clicking a nav link
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                if (navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                    if (menuIcon) {
                        menuIcon.classList.remove('fa-xmark');
                        menuIcon.classList.add('fa-bars');
                    }
                }
            });
        });

        // Close mobile nav on outside click
        document.addEventListener('click', (e) => {
            if (navbar.classList.contains('active') && !navbar.contains(e.target) && !menuToggle.contains(e.target)) {
                navbar.classList.remove('active');
                if (menuIcon) {
                    menuIcon.classList.remove('fa-xmark');
                    menuIcon.classList.add('fa-bars');
                }
            }
        });
    }

    // 4. Back To Top Action
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 5. Project Category Filter Tabs
    const filterBtns = document.querySelectorAll('.filter-tab, .filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                // Update active tab button
                filterBtns.forEach((b) => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach((card) => {
                    const cardCategory = card.getAttribute('data-category');
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'flex';
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.transition = 'opacity 0.4s ease';
                            card.style.opacity = '1';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // 6. Project Details Modal Logic
    const projectModal = document.getElementById('project-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalCloseAction = document.getElementById('modal-close-action');
    const modalCategory = document.getElementById('modal-project-category');
    const modalTitle = document.getElementById('modal-project-title');
    const modalDate = document.getElementById('modal-project-date');
    const modalOverview = document.getElementById('modal-project-overview');
    const modalFeatures = document.getElementById('modal-project-features');
    const modalTech = document.getElementById('modal-project-tech');
    const modalGithubLink = document.getElementById('modal-github-link');

    // Comprehensive data dictionary of genuine projects from repository & resume
    const projectsData = {
        sentiment: {
            title: 'AI-Based Sentiment Analysis System',
            category: 'AI & Machine Learning',
            date: 'Jun 2026 – Sep 2026',
            overview: 'An AI application that analyzes user reviews and classifies them as Positive, Negative, or Neutral. Built with Python and NLP techniques, featuring a FastAPI backend, an interactive Streamlit dashboard, and a Chrome extension for real-time text analysis.',
            features: [
                'Preprocesses review text with tokenization, stopword cleaning, and feature extraction.',
                'Classifies sentiment polarity into Positive, Negative, and Neutral.',
                'Provides a FastAPI prediction endpoint for real-time analysis.',
                'Features an interactive Streamlit dashboard for testing single reviews and batch inputs.',
                'Includes a Chrome extension (Manifest V3) for checking text sentiment on web pages.'
            ],
            tech: ['Python', 'Scikit-learn', 'TensorFlow', 'FastAPI', 'Streamlit', 'NLP', 'Chrome Extension'],
            github: 'https://github.com/BHAGYALAKSHMIMAHESHBABU'
        },
        wastewise: {
            title: 'WasteWise – Digital Waste Management Platform',
            category: 'Full Stack Web Application',
            date: 'Mar 2026 – May 2026',
            overview: 'A digital waste management platform designed to modernize and optimize municipal and campus waste collection logistics. Streamlines pickup schedules, user requests, driver dispatch, and administrative analytics through a unified responsive portal.',
            features: [
                'Designed role-based access control (Admin, Collection Driver, and Resident User) with secure JWT authentication and password hashing.',
                'Integrated RESTful APIs for real-time waste pickup request logging, status tracking, and schedule updates.',
                'Implemented interactive dashboards presenting collection statistics, pending pickups, and route verification.',
                'Architected MongoDB schema to handle flexible disposal categories, collection logs, and user metadata.'
            ],
            tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'RESTful APIs', 'CSS3'],
            github: 'https://github.com/BHAGYALAKSHMIMAHESHBABU'
        },
        switchify: {
            title: 'Switchify: Dual-Mode Real-Time Chat App',
            category: 'Real-Time Communication',
            date: 'Feb 2025 – May 2025',
            overview: 'A responsive full-stack messaging application featuring an innovative dual-mode interface that allows users to instantly toggle their conversation environment between a relaxed "Friendly" theme and a sleek "Professional" workspace context.',
            features: [
                'Established bi-directional WebSocket connections with Socket.IO for zero-latency instant messaging and typing indicators.',
                'Built dual UI modes (Friendly and Professional) with custom themes, contextual typography, and layout preferences.',
                'Implemented secure JWT-based user authentication and user profile management.',
                'Supported media and file sharing with MongoDB message persistence and batch loading.',
                'Designed mobile-first responsive layout with clean message bubble rendering.'
            ],
            tech: ['React.js', 'Node.js', 'Socket.IO', 'MongoDB', 'JWT', 'Express.js', 'CSS Modules'],
            github: 'https://github.com/BHAGYALAKSHMIMAHESHBABU'
        },
        furnovera: {
            title: 'Furnovera – Furniture E-Commerce Website',
            category: 'Full Stack E-Commerce',
            date: 'Jun 2025',
            overview: 'A full-stack responsive online furniture marketplace developed during an internship at Softrate Tech Park. Provides consumers with an engaging shopping experience for browsing, filtering, and ordering furniture items.',
            features: [
                'Built an interactive product catalog with category-based filtering (Living Room, Bedroom, Office, Decor).',
                'Developed a responsive shopping cart prototype with dynamic item addition, quantity adjustments, and subtotal calculation.',
                'Constructed backend REST endpoints in Node.js connected to MongoDB for product inventory management.',
                'Deployed frontend on Netlify and backend service on Render ensuring optimal availability and low latency.'
            ],
            tech: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'MongoDB', 'Netlify', 'Render'],
            github: 'https://github.com/BHAGYALAKSHMIMAHESHBABU'
        },
        classroom: {
            title: 'Online Classroom Booking System',
            category: 'Campus Infrastructure System',
            date: 'Nov 2024',
            overview: 'A centralized room scheduling system built for college campuses to optimize classroom, seminar hall, and lab reservations while preventing double-booking and scheduling conflicts.',
            features: [
                'Engineered real-time availability tracking displaying open and occupied campus slots.',
                'Created multi-role approval workflow enabling faculty to request slots and administrators to review and approve.',
                'Designed Oracle SQL relational schema enforcing strict primary/foreign key constraints and timestamp validations.',
                'Implemented lightweight Java HTTP backend handlers with JSON data exchange and empathetic UI design.'
            ],
            tech: ['HTML5', 'CSS3', 'JavaScript', 'Java (HTTP Server)', 'Oracle SQL', 'Responsive Design'],
            github: 'https://github.com/BHAGYALAKSHMIMAHESHBABU'
        },
        movie: {
            title: 'Movie Ticket Booking System',
            category: 'Cinema Ticketing Application',
            date: 'Nov 2024',
            overview: 'An end-to-end movie reservation platform covering the entire customer booking journey from browsing currently screening films to seat selection, pricing calculation, and checkout simulation.',
            features: [
                'Created an interactive visual seat selection matrix reflecting standard, premium, and reserved seats in real time.',
                'Designed complete visual prototype in Figma, establishing wireframes and user flows prior to code implementation.',
                'Built dynamic ticket pricing computation accounting for seat tiers, show timings, and group bookings.',
                'Structured Oracle SQL relational database to manage movie schedules, cinema halls, reservations, and customer records.'
            ],
            tech: ['HTML5', 'CSS3', 'JavaScript', 'Java (HTTP)', 'Oracle SQL', 'Figma Prototyping'],
            github: 'https://github.com/BHAGYALAKSHMIMAHESHBABU'
        }
    };

    // Open Modal
    const openModalBtns = document.querySelectorAll('.open-project-modal');
    openModalBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const projectKey = btn.getAttribute('data-project');
            const data = projectsData[projectKey];

            if (data && projectModal) {
                modalCategory.textContent = data.category;
                modalTitle.textContent = data.title;
                modalDate.textContent = data.date;
                modalOverview.textContent = data.overview;

                // Populate Features
                modalFeatures.innerHTML = '';
                data.features.forEach((feat) => {
                    const li = document.createElement('li');
                    li.textContent = feat;
                    modalFeatures.appendChild(li);
                });

                // Populate Tech Tags
                modalTech.innerHTML = '';
                data.tech.forEach((t) => {
                    const span = document.createElement('span');
                    span.className = 'tech-tag';
                    span.textContent = t;
                    modalTech.appendChild(span);
                });

                // Set GitHub Link
                if (modalGithubLink) {
                    modalGithubLink.href = data.github || 'https://github.com/BHAGYALAKSHMIMAHESHBABU';
                }

                // Show modal
                projectModal.classList.add('active');
                projectModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close Modal helper
    const closeModal = () => {
        if (projectModal) {
            projectModal.classList.remove('active');
            projectModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    };

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalCloseAction) modalCloseAction.addEventListener('click', closeModal);

    // Close on backdrop click
    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeModal();
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
            closeModal();
        }
    });

    // 7. Formspree Contact Form Submission via AJAX with Clean In-Page Feedback
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> <span>Sending Message...</span>';

            if (formStatus) {
                formStatus.className = 'form-status';
                formStatus.style.display = 'none';
            }

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    if (formStatus) {
                        formStatus.textContent = 'Thank you! Your message has been sent successfully. I will get back to you shortly.';
                        formStatus.className = 'form-status success';
                        formStatus.style.display = 'block';
                    }
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    if (data && data.errors) {
                        const errorMsg = data.errors.map(err => err.message).join(', ');
                        throw new Error(errorMsg || 'Failed to submit form.');
                    } else {
                        throw new Error('Server returned an unexpected response.');
                    }
                }
            } catch (error) {
                console.error('Contact Form Error:', error);
                // Fallback option: allow native submission if AJAX fails
                if (formStatus) {
                    formStatus.textContent = 'Oops! There was a problem submitting your message. Please email me directly at bhagyalakshmimaheshbabu@gmail.com.';
                    formStatus.className = 'form-status error';
                    formStatus.style.display = 'block';
                }
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
            }
        });
    }
});
