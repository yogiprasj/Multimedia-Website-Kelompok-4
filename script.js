document.addEventListener('DOMContentLoaded', function() {
    const memberCards = document.querySelectorAll('.member-card');
    
    // Efek hover untuk kartu
    memberCards.forEach(card => {
        const photo = card.querySelector('.member-photo img');
        
        card.addEventListener('mouseenter', () => {
            if (photo) {
                photo.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (photo) {
                photo.style.transform = 'scale(1)';
            }
        });
    });
    
    // Animasi scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    memberCards.forEach(card => {
        observer.observe(card);
    });
})