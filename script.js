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
