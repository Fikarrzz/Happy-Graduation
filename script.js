document.addEventListener('DOMContentLoaded', function() {
    // Animasi teks pembuka
    gsap.to('.opening-text', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.to('.name-text', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
    });

    gsap.to('.wyatb-content', {
    scrollTrigger: {
        trigger: '.wyatb-section',
        start: 'top 70%',
        toggleActions: 'play none none none'
    },
    opacity: 1,
    y: 0,
    duration: 1,
    onComplete: animateLetters
    });

    gsap.to('.flower-field', {
    scrollTrigger: {
        trigger: '.wyatb-section',
        start: 'bottom bottom',
        onEnter: createPurpleFlowers,
        once: true // Only animate once
    }
    });

    
    // Inisialisasi ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Animasi kartu saat scroll
    gsap.utils.toArray('.card').forEach((card, index) => {
        gsap.fromTo(card, 
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                    // Memberikan delay berbeda untuk setiap kartu
                    delay: index * 0.1
                }
            }
        );
    });
    
    // Animasi scroll prompt
    const scrollPrompt = document.querySelector('.scroll-prompt');
    
    scrollPrompt.addEventListener('click', function() {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
    
    // Efek hover untuk kartu
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.03,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
});

// Generate kelopak bunga
function createPetals() {
  const container = document.querySelector('.petals-container');
  for (let i = 0; i < 15; i++) {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.animationDuration = (Math.random() * 5 + 5) + 's';
    petal.style.animationDelay = Math.random() * 5 + 's';
    petal.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
    container.appendChild(petal);
  }
}
createPetals();

function animateLetters() {
    document.querySelector('.wyatb-content').classList.add('show');
    
    // Split WYATB into individual letters
    const wyatb = document.querySelector('.wyatb-main');
    wyatb.innerHTML = wyatb.textContent.split('').map(letter => 
        `<span>${letter}</span>`
    ).join('');
}


function createPurpleFlowers() {
  const field = document.querySelector('.flower-field');
  const flowerCount = 25;
  
  // Clear previous flowers if any
  field.innerHTML = '';
  
  // Create flowers
  for (let i = 0; i < flowerCount; i++) {
    const flower = document.createElement('div');
    flower.className = 'flower';
    flower.style.left = `${Math.random() * 100}%`;
    flower.style.animationDelay = `${Math.random() * 0.5}s`;
    
    // Create flower with 6 petals
    flower.innerHTML = `
      <div class="stem"></div>
      <div class="petals">
        ${Array.from({length: 6}).map((_, i) => 
          `<div class="petal" style="transform: rotate(${i * 60}deg) translateY(-10px);"></div>`
        ).join('')}
        <div class="center"></div>
      </div>
    `;
    
    field.appendChild(flower);
  }
}