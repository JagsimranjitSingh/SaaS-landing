// Micro-interaction for glass cards on mouse move
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Active navigation link on scroll
const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px', // trigger when section is in top part of screen
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('text-champagne-gold', 'font-semibold', 'border-champagne-gold');
                link.classList.add('text-white/70', 'border-transparent');
                
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('text-champagne-gold', 'font-semibold', 'border-champagne-gold');
                    link.classList.remove('text-white/70', 'border-transparent');
                }
            });
        }
    });
}, observerOptions);

// Track all sections that have an `id` attribute
document.querySelectorAll('section[id]').forEach((section) => {
    observer.observe(section);
});

// Also add click listener so clicking immediately sets active state
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.nav-link').forEach(l => {
            l.classList.remove('text-champagne-gold', 'font-semibold', 'border-champagne-gold');
            l.classList.add('text-white/70', 'border-transparent');
        });
        this.classList.add('text-champagne-gold', 'font-semibold', 'border-champagne-gold');
        this.classList.remove('text-white/70', 'border-transparent');
    });
});

// Mobile Menu Logic
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, #mobile-menu a[href="#pricing"]');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = !mobileMenu.classList.contains('hidden');
        if (isOpen) {
            // Close menu
            mobileMenu.classList.remove('opacity-100');
            mobileMenu.classList.add('opacity-0');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            }, 300);
            menuIcon.textContent = 'menu';
            document.body.style.overflow = '';
        } else {
            // Open menu
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
            // small delay for transition
            setTimeout(() => {
                mobileMenu.classList.remove('opacity-0');
                mobileMenu.classList.add('opacity-100');
            }, 10);
            menuIcon.textContent = 'close';
            document.body.style.overflow = 'hidden'; // prevent bg scroll
        }
    });

    // Close mobile menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('opacity-100');
            mobileMenu.classList.add('opacity-0');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            }, 300);
            menuIcon.textContent = 'menu';
            document.body.style.overflow = '';
        });
    });
}

// Footer Accordion Logic (Mobile Only)
const footerAccordionBtns = document.querySelectorAll('.footer-accordion-btn');

footerAccordionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Only act as accordion on mobile (window width < 768px for Tailwind md breakpoint)
        if (window.innerWidth < 768) {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('.material-symbols-outlined');
            
            // Toggle visibility
            if (content.classList.contains('hidden')) {
                content.classList.remove('hidden');
                icon.style.transform = 'rotate(180deg)';
            } else {
                content.classList.add('hidden');
                icon.style.transform = 'rotate(0deg)';
            }
        }
    });
});

// Reset footer accordions and icon rotation on resize (if moving to desktop)
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        document.querySelectorAll('.footer-accordion-content').forEach(content => {
            content.classList.remove('hidden');
            content.classList.add('md:block');
        });
        document.querySelectorAll('.footer-accordion-btn .material-symbols-outlined').forEach(icon => {
            icon.style.transform = 'rotate(0deg)';
        });
    } else {
        document.querySelectorAll('.footer-accordion-content').forEach(content => {
            content.classList.add('hidden');
        });
    }
});
