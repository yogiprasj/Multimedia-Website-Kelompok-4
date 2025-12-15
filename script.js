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


let clickSound = null;

document.addEventListener('DOMContentLoaded', function() {
    console.log('Preloading click sound...');
    clickSound = new Audio('https://www.soundjay.com/buttons/button-3.mp3');
    clickSound.volume = 0.5;
    clickSound.preload = 'auto';
    
    clickSound.play().then(() => {
        clickSound.pause();
        clickSound.currentTime = 0;
    }).catch(e => {
    });
});

function playWebClickSound(url) {
    console.log('Playing sound...');
    
    if (clickSound && clickSound.readyState >= 2) {

        clickSound.currentTime = 0;
        clickSound.play().then(() => {
            setTimeout(() => {
                window.location.href = url;
            }, 100);
        }).catch(error => {
            console.log('Preloaded sound error:', error);
            playFallbackSound(url);
        });
    } else {

        playFallbackSound(url);
    }
}


function playWebClickSound(url) {

    const soundUrl = 'https://www.soundjay.com/buttons/button-3.mp3';
    
    console.log('Playing sound from:', soundUrl);
    
    const audio = new Audio(soundUrl);
    audio.volume = 0.5;
    
    // Coba play
    audio.play().then(() => {
        setTimeout(() => {
            window.location.href = url;
        }, 200);
    }).catch(error => {
        playFallbackSound(url);
    });
}

function playFallbackSound(url) {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        // Sound 200ms
        oscillator.frequency.value = 1000;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
        
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.2);
        
        setTimeout(() => {
            window.location.href = url;
        }, 250);
        
    } catch (e) {
        if (navigator.vibrate) navigator.vibrate(50);
        window.location.href = url;
    }
}