const body = document.body;

document.getElementById("modeSwitch").addEventListener("change", () => {
  body.classList.toggle("dark-mode");
});

document.getElementById("burger").addEventListener("change", function() {
  const navLinks = document.querySelector(".mobile-links");
  if (this.checked) {
    navLinks.classList.add("open-nav");
  } else {
    navLinks.classList.remove("open-nav");
  }
});

const links = document.querySelectorAll(".mobile-links a");
links.forEach(link => {
  link.addEventListener("click", function() {
    document.getElementById("burger").checked = false;
    document.querySelector(".mobile-links").classList.remove("open-nav");
  });
});

const words = ["Student.", "Learner.", "Coder.", "Web Developer.", "Computer Science Enthusiast."];
const typingSpeed = 200;
const erasingSpeed = 100;
const delayBetweenWords = 1500;

let wordIndex = 0;
let charIndex = 0;
let isErasing = false;

const spanElement = document.querySelector(".me-as");

function type() {
  const currentWord = words[wordIndex];
  if (isErasing) {
    if (charIndex > 0) {
      spanElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(type, erasingSpeed);
    } else {
      isErasing = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, typingSpeed);
    }
  } else {
    if (charIndex < currentWord.length) {
      spanElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      isErasing = true;
      setTimeout(type, delayBetweenWords);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, delayBetweenWords);
});

const form = document.getElementById('contact-form');
const modal = document.getElementById('custom-alert');
const closeBtn = document.querySelector('.close-btn');
const submitBtn = document.getElementById('submit-btn');

if (submitBtn) {
    submitBtn.addEventListener('click', function (event) {
        event.preventDefault();
        console.log('Submit button clicked');
        if (modal) {
            modal.style.display = 'block';
        }
        if (form) {
            form.reset();
        }
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', function () {
        if (modal) {
            modal.style.display = 'none';
        }
    });
}

window.addEventListener('click', function (event) {
    if (event.target === modal) {
        if (modal) {
            modal.style.display = 'none';
        }
    }
});
