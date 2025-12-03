// --- 1. Scroll Animations (Intersection Observer) ---
function initializeScrollObserver() {
    // Select elements to animate
    const elementsToObserve = document.querySelectorAll('.fade-in, .fade-in-item');
    if (elementsToObserve.length === 0) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
        // 'root' is null by default, which means viewport. This works best for standard scrolling.
    });

    elementsToObserve.forEach(el => observer.observe(el));
}

// --- 2. Theme Toggle ---
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

const updateThemeIcon = (isLight) => {
    themeIcon.textContent = isLight ? '🌙' : '🔆';
    themeToggleBtn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
};

themeToggleBtn.addEventListener('click', () => {
    const html = document.documentElement;
    const isLight = html.getAttribute('data-theme') === 'light';

    if (isLight) {
        html.removeAttribute('data-theme');
        updateThemeIcon(false);
    } else {
        html.setAttribute('data-theme', 'light');
        updateThemeIcon(true);
    }
    updateParticleColor();
});

// --- 3. Project Filtering ---
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        projectCards.forEach(card => {
            const cat = card.getAttribute('data-category');
            if (filter === 'all' || filter === cat) {
                card.classList.remove('hide');
                card.style.display = 'flex'; // Ensure flex layout is kept
            } else {
                card.classList.add('hide');
                setTimeout(() => card.style.display = 'none', 300); // Wait for transition
            }
        });
    });
});

// --- 4. Mobile Menu Toggle (UPDATED FOR TOP NAVBAR) ---
const menuToggle = document.querySelector('.menu-toggle');
const sidePanel = document.getElementById('side-panel');
const mainNav = document.querySelector('.main-nav'); // Select the nav container
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    sidePanel.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (sidePanel.classList.contains('open')) {
            sidePanel.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
});
// --- 5. Modal Contact Form ---
const modal = document.getElementById('contact-modal');
const openModal = document.getElementById('open-modal');
const closeModal = document.getElementById('modal-close');
const contactForm = document.getElementById('contact-form');

if (openModal) openModal.addEventListener('click', () => modal.classList.add('show'));
if (closeModal) closeModal.addEventListener('click', () => modal.classList.remove('show'));

window.addEventListener('click', e => {
    if (e.target === modal) modal.classList.remove('show');
});

if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        alert('Message sent! (Demo mode)');
        modal.classList.remove('show');
        e.target.reset();
    });
}

// --- 6. Particles (Background) ---
const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");
let particles = [];
let w, h;
let particleColor = "rgba(255, 255, 255, 0.6)"; // Default white-ish
let mouse = { x: null, y: null, radius: 100 }; // Mouse interactive radius

function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Update particle color based on current theme accent
function updateParticleColor() {
    const computedStyle = getComputedStyle(document.body);
    const accentColor = computedStyle.getPropertyValue('--accent-color').trim();

    // Convert accentColor to rgba for particles, adding an alpha value
    // This is a simplified conversion, actual CSS parsing is more complex
    if (accentColor.startsWith('#')) {
        let r = parseInt(accentColor.slice(1, 3), 16);
        let g = parseInt(accentColor.slice(3, 5), 16);
        let b = parseInt(accentColor.slice(5, 7), 16);
        particleColor = `rgba(${r}, ${g}, ${b}, 0.6)`;
    } else if (accentColor.startsWith('rgb')) {
        // Assuming rgb(r, g, b) or rgba(r, g, b, a)
        const parts = accentColor.match(/\d+/g).map(Number);
        if (parts.length >= 3) {
            particleColor = `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, 0.6)`;
        }
    } else {
        // Fallback for unknown formats
        particleColor = "rgba(56, 189, 248, 0.6)";
    }
}


class Particle {
    constructor(x, y, size, speedX, speedY, color) {
        this.x = x || Math.random() * w;
        this.y = y || Math.random() * h;
        this.size = size || Math.random() * 2 + 0.8; // Slightly larger, more varied
        this.speedX = speedX || (Math.random() - 0.5) * 0.5; // Slower, smoother movement
        this.speedY = speedY || (Math.random() - 0.5) * 0.5;
        this.color = color || particleColor;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off walls instead of resetting
        if (this.x + this.size > w || this.x - this.size < 0) {
            this.speedX *= -1;
        }
        if (this.y + this.size > h || this.y - this.size < 0) {
            this.speedY *= -1;
        }

        // Keep particles within bounds, pushing them back in
        if (this.x + this.size > w) this.x = w - this.size;
        if (this.x - this.size < 0) this.x = this.size;
        if (this.y + this.size > h) this.y = h - this.size;
        if (this.y - this.size < 0) this.y = this.size;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles(count = 100) { // was 100
    particles = [];
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

function connectParticles() {
    const maxDistance = (w / 14) * (h / 14); // slightly smaller range
    for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
            let distance = ((particles[a].x - particles[b].x) ** 2) + ((particles[a].y - particles[b].y) ** 2);
            if (distance < maxDistance) {
                let opacityValue = 1 - (distance / maxDistance);
                ctx.strokeStyle = `${particleColor.slice(0, -4)}${opacityValue.toFixed(2)})`;
                ctx.lineWidth = 0.7;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}


// Handle mouse movement
canvas.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Reset mouse position when it leaves the canvas
canvas.addEventListener('mouseleave', function () {
    mouse.x = null;
    mouse.y = null;
});

// Animation loop
function animateParticles() {
    ctx.clearRect(0, 0, w, h);

    // Update and draw particles
    particles.forEach(p => {
        p.update();
        p.draw();

        // Check for mouse connection
        if (mouse.x && mouse.y) {
            let distanceToMouse = ((p.x - mouse.x) ** 2) + ((p.y - mouse.y) ** 2);
            if (distanceToMouse < mouse.radius * mouse.radius) {
                let opacityValue = 1 - (distanceToMouse / (mouse.radius * mouse.radius));
                ctx.strokeStyle = `${particleColor.slice(0, -4)}${opacityValue})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
    });

    connectParticles(); // Draw lines between particles
    requestAnimationFrame(animateParticles);
}










// Hover play / pause inside card videos
document.querySelectorAll(".project-card video").forEach(video => {
    const card = video.closest(".project-card");

    card.addEventListener("mouseenter", () => video.play());
    card.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
    });

    // Click → open fullscreen modal
    card.addEventListener("click", () => {
        const modal = document.getElementById("videoModal");
        const modalVideo = document.getElementById("modalVideo");

        modal.style.display = "flex";
        modalVideo.src = video.src;
        modalVideo.play();
    });
});

// Close modal on background click
document.getElementById("videoModal").addEventListener("click", (e) => {
    if (e.target.id === "videoModal") {
        const modal = document.getElementById("videoModal");
        const modalVideo = document.getElementById("modalVideo");

        modal.style.display = "none";
        modalVideo.pause();
        modalVideo.src = "";
    }
});















// --- Initialize ---
updateParticleColor();
initParticles();
animateParticles();
window.addEventListener('load', initializeScrollObserver);

// --- 8. Typewriter Effect ---
const typeWriterElement = document.getElementById('typewriter-text');
const roles = [
    "Software Developer",
    "Web Developer",
    "Problem Solver"
]; // <--- CHANGE THESE TO WHATEVER YOU WANT

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100; // Speed of typing

function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        // Remove characters
        typeWriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Deleting is faster
    } else {
        // Add characters
        typeWriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100; // Typing is normal speed
    }

    if (!isDeleting && charIndex === currentRole.length) {
        // Finished typing word, pause before deleting
        isDeleting = true;
        typeSpeed = 2000; // Wait 2 seconds before deleting
    } else if (isDeleting && charIndex === 0) {
        // Finished deleting, switch to next word
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length; // Loop back to start
        typeSpeed = 500; // Small pause before typing next word
    }

    setTimeout(typeEffect, typeSpeed);
}



// Start the animation when page loads
document.addEventListener('DOMContentLoaded', typeEffect);

// --- 9. Navbar Scroll Watcher (Optional Enhancement) ---
function initializeNavbarScrollWatcher() {
    const heroSection = document.getElementById('hero');
    const navBar = document.getElementById('side-panel'); // The fixed element

    if (!heroSection || !navBar) return;

    const observer = new IntersectionObserver(([entry]) => {
        // Toggle 'scrolled' class based on whether the hero is completely out of view
        if (entry.isIntersecting) {
            navBar.classList.remove('scrolled');
        } else {
            navBar.classList.add('scrolled');
        }
    }, {
        rootMargin: `-${navBar.offsetHeight}px 0px 0px 0px`, // Trigger when the top of the viewport hits the nav bar height
        threshold: 0
    });

    observer.observe(heroSection);
}

// Ensure this runs after the main initializers
window.addEventListener('load', initializeNavbarScrollWatcher);

