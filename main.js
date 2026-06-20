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



/* --- Animated Counter Statistics --- */

const counters = document.querySelectorAll('.counter');

const speed = 150; // Jitna kam number, utni tez speed



const animateCounters = () => {

    counters.forEach(counter => {

        const updateCount = () => {

            const target = +counter.getAttribute('data-target'); // Target number (e.g. 50)

            const count = +counter.innerText.replace('+', ''); // Current number

            

            // Increment calculate karein

            const inc = target / speed;



            if (count < target) {

                // Jab tak target tak na pohanche, add karte raho

                counter.innerText = Math.ceil(count + inc) + "+";

                setTimeout(updateCount, 20);

            } else {

                // Exact number set kar do

                counter.innerText = target + "+";

            }

        };

        updateCount();

    });

};

/* --- Scroll Trigger (Jab user wahan pohanche tab start ho) --- */

let hasAnimate = false;

window.addEventListener('scroll', () => {

    const section = document.querySelector('.stats-section');

    const sectionPos = section.getBoundingClientRect().top;

    const screenPos = window.innerHeight / 1.3;



    if(sectionPos < screenPos && !hasAnimate) {

        animateCounters();

        hasAnimate = true; // Sirf ek baar chalega

    }

});

/* --- Particle System Configuration --- */
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        "particles": {
            "number": { 
                "value": 70, /* Screen par particles ki taadad */
                "density": { "enable": true, "value_area": 800 } 
            },
            "color": { "value": "#2dd4bf" }, /* Aapka Aesthetic Teal Color */
            "shape": { "type": "circle" },
            "opacity": { 
                "value": 0.5, 
                "random": false 
            },
            "size": { 
                "value": 3, 
                "random": true 
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#2dd4bf",
                "opacity": 0.3,
                "width": 1
            },
            "move": { 
                "enable": true, 
                "speed": 2, 
                "direction": "none", 
                "random": false, 
                "straight": false, 
                "out_mode": "out", 
                "bounce": false 
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "grab" }, /* Mouse ko track karega */
                "onclick": { "enable": true, "mode": "push" }, /* Click karne par aur particles aayenge */
                "resize": true
            },
            "modes": {
                "grab": { "distance": 180, "line_linked": { "opacity": 0.8 } },
                "push": { "particles_nb": 4 }
            }
        },
        "retina_detect": true
    });
}
