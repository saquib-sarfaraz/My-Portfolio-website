// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Get header height to offset scroll position
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;

                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight - 20, // Add a small extra margin
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (mobileMenuOverlay.classList.contains('flex')) {
                    mobileMenuOverlay.classList.remove('flex');
                    mobileMenuOverlay.classList.add('hidden');
                    document.body.style.overflow = ''; // Re-enable scrolling
                }
            }
        });
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const closeMenu = document.getElementById('close-menu');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('hidden');
            mobileMenuOverlay.classList.add('flex');
            document.body.style.overflow = 'hidden'; // Disable scrolling on body
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('flex');
            mobileMenuOverlay.classList.add('hidden');
            document.body.style.overflow = ''; // Re-enable scrolling
        });
    }


    // Close mobile menu when a nav link is clicked (inside the overlay)
    document.querySelectorAll('.nav-link-mobile').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('flex');
            mobileMenuOverlay.classList.add('hidden');
            document.body.style.overflow = ''; // Re-enable scrolling
        });
    });

    // Handle responsiveness for desktop nav
    const adjustNavDisplay = () => {
        if (window.innerWidth >= 768) {
            mainNav.classList.remove('mobile-menu-hidden');
            mobileMenuOverlay.classList.remove('flex');
            mobileMenuOverlay.classList.add('hidden');
            document.body.style.overflow = '';
        } else {
            mainNav.classList.add('mobile-menu-hidden');
        }
    };

    window.addEventListener('resize', adjustNavDisplay);
    adjustNavDisplay(); // Initial check on load
});
