// Typing Animation Logic (Can be re-applied to any text element)
const textElement = document.querySelector('.typing-text');
// If you want to use it, just add <span class="typing-text"></span> to your HTML
if(textElement) {
    const titles = ["Developer", "Python Expert", "3D Architect"];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            textElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            setTimeout(typeEffect, 500); 
        } else {
            setTimeout(typeEffect, isDeleting ? 100 : 200); 
        }
    }
    document.addEventListener('DOMContentLoaded', typeEffect);
}

// --- Animated Counter Statistics ---
const counters = document.querySelectorAll('.counter');
const speed = 150; 

const animateCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target'); 
            const count = +counter.innerText.replace('+', ''); 
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc) + "+";
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target + "+";
            }
        };
        updateCount();
    });
};

// Scroll Trigger
let hasAnimate = false;
window.addEventListener('scroll', () => {
    const section = document.querySelector('.stats-section');
    if(section) {
        const sectionPos = section.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;

        if(sectionPos < screenPos && !hasAnimate) {
            animateCounters();
            hasAnimate = true; 
        }
    }
});
