// Typing Animation Logic (Can be used if you add class .typing-text anywhere)
const textElement = document.querySelector('.typing-text');
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

// Menu Toggle for Mobile
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if(menuBtn) {
    menuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(5, 5, 7, 0.95)';
        navLinks.style.padding = '20px 0';
        navLinks.style.textAlign = 'center';
    });
}
