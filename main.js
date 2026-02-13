// Typing Animation Logic
const textElement = document.querySelector('.typing-text');
const titles = ["Developer", "Python Expert", "Game Developer"];
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
        setTimeout(typeEffect, 2000); // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        setTimeout(typeEffect, 500); // Pause before typing new word
    } else {
        setTimeout(typeEffect, isDeleting ? 100 : 200); // Typing speed
    }
}

// Start the animation when page loads
document.addEventListener('DOMContentLoaded', typeEffect);

// Optional: Cursor Blink Effect css already added via class

