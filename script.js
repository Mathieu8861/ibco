/* ============================================ */
/* PROJET: IBCO Distribution                    */
/* SCRIPT: Navigation, animations, interactions */
/* ============================================ */

(function() {
    'use strict';

    // === CONSTANTES ===
    const SCROLL_THRESHOLD = 100;
    const MOBILE_BREAKPOINT = 768;

    // === SELECTEURS ===
    const header = document.querySelector('.header');
    const navToggle = document.getElementById('nav-toggle');
    const navOverlay = document.getElementById('nav-overlay');
    const navOverlayLinks = document.querySelectorAll('.nav__overlay-link');
    const navLinks = document.querySelectorAll('.nav__link');

    // === FONCTIONS UTILITAIRES ===
    function isMobile() {
        return window.innerWidth <= MOBILE_BREAKPOINT;
    }

    // === MENU MOBILE ===
    function toggleMenu() {
        if (!navToggle || !navOverlay) return;

        navToggle.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    function closeMenu() {
        if (!navToggle || !navOverlay) return;

        navToggle.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    // === HEADER SHADOW ON SCROLL ===
    function handleScroll() {
        if (!header) return;

        if (window.scrollY > SCROLL_THRESHOLD) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // === SMOOTH SCROLL ===
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                var targetId = this.getAttribute('href');
                if (targetId === '#') return;

                var targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    closeMenu();

                    var headerHeight = header ? header.offsetHeight : 0;
                    var targetPosition = targetElement.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // === SCROLL ANIMATIONS (IntersectionObserver) ===
    function initScrollAnimations() {
        if (!('IntersectionObserver' in window)) return;

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.scroll-animate').forEach(function(el) {
            observer.observe(el);
        });
    }

    // === CATALOGUE: FILTER BUTTONS ===
    function initFilterButtons() {
        var filterBtns = document.querySelectorAll('.filters__btn');
        if (filterBtns.length === 0) return;

        filterBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                filterBtns.forEach(function(b) {
                    b.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
    }

    // === CATALOGUE: SIDEBAR CATEGORIES ===
    function initCategorySidebar() {
        var categoryLinks = document.querySelectorAll('.sidebar__link');
        if (categoryLinks.length === 0) return;

        categoryLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                categoryLinks.forEach(function(l) {
                    l.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
    }

    // === ACTIVE NAV LINK ON SCROLL ===
    function initActiveNavOnScroll() {
        var sections = document.querySelectorAll('section[id]');
        if (sections.length === 0) return;

        function updateActiveNav() {
            var scrollPos = window.scrollY + 200;

            sections.forEach(function(section) {
                var sectionTop = section.offsetTop;
                var sectionHeight = section.offsetHeight;
                var sectionId = section.getAttribute('id');

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(function(link) {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }

        window.addEventListener('scroll', updateActiveNav, { passive: true });
    }

    // === EVENT LISTENERS ===
    if (navToggle) {
        navToggle.addEventListener('click', toggleMenu);
    }

    // Fermer le menu quand on clique un lien overlay
    navOverlayLinks.forEach(function(link) {
        link.addEventListener('click', closeMenu);
    });

    // Header scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', function() {
        handleScroll();
        // Fermer le menu si on passe en desktop
        if (!isMobile()) {
            closeMenu();
        }
    });

    // === INIT ===
    document.addEventListener('DOMContentLoaded', function() {
        handleScroll();
        initSmoothScroll();
        initScrollAnimations();
        initFilterButtons();
        initCategorySidebar();
        initActiveNavOnScroll();
    });

})();
