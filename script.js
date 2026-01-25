// script.js

// Scrolled nav
window.addEventListener('scroll', () => {
    document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 50);
});

// Fade-ins
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Hamburger menu – more robust version
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('#navLinks');
const body = document.body;

if (hamburger && navLinks) {
    const toggleMenu = () => {
        const isActive = navLinks.classList.toggle('active');
        hamburger.classList.toggle('active', isActive);
        body.style.overflow = isActive ? 'hidden' : '';
        // Extra insurance for iOS
        document.documentElement.style.overflow = isActive ? 'hidden' : '';
    };

    hamburger.addEventListener('click', toggleMenu);

    // Close when clicking links
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close on outside click (optional but nice)
    document.addEventListener('click', e => {
        if (
            navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !hamburger.contains(e.target)
        ) {
            toggleMenu();
        }
    });

    // Optional: close on ESC key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
}
