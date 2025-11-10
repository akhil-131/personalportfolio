// =========================
// ⚙️ Default Config (unchanged)
// =========================
const defaultConfig = {
    heroName: "TANGILA AKHIL",  // Note: camelCase to match ID
    heroTagline: "Where Passion Meets Precision",
    shortBio: "I'm Akhil Tangila, an AI & ML student passionate about building intelligent, creative solutions that make life smarter. I blend technology and imagination to craft vibrant, meaningful digital experiences that inspire people.",
    longBio: " I am a creative technologist and AI & ML enthusiast with a strong drive to merge innovation, design, and intelligence. I loves building solutions that solve real-world challenges — from machine learning models to interactive, animated front-end interfaces. I believes in continuous learning, precision, and curiosity as the path to becoming an inspiring AI engineer. My goal: to create technology that feels alive — intuitive, human-centered, and full of purpose.",
    emailAddress: "akhiltangila131@gmail.com",
    phoneNumber: "+91 8121763248"
};

// Apply config to elements on load (unchanged)
function applyConfig() {
    Object.entries(defaultConfig).forEach(([key, value]) => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = value;
        }
    });
}

// Run on DOM load
document.addEventListener('DOMContentLoaded', applyConfig);

// =========================
// 💡 Hero Text Animation (unchanged)
// =========================
const rotatingTexts = [
    "Dream. Code. Train. Deploy. Repeat.",
    "Bridging Human Imagination with Machine Intelligence",
    "From Data to Destiny — Engineering the AI Future",
    "Blending Art and Intelligence to Build a Smarter World",
];

const rotatingTextElement = document.getElementById("rotatingText");
let currentTextIndex = 0, charIndex = 0, isDeleting = false;

function typeText() {
    const currentText = rotatingTexts[currentTextIndex];
    rotatingTextElement.textContent = currentText.substring(0, charIndex);

    // typing forward
    if (!isDeleting) {
        charIndex++;
        if (charIndex > currentText.length) {
            isDeleting = true;
            setTimeout(typeText, 2000); // wait before deleting
            return;
        }
    } 
    // deleting backward
    else {
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % rotatingTexts.length;
        }
    }

    // typing & deleting speed
    setTimeout(typeText, isDeleting ? 50 : 100);
}

// Start the animation after fade-in delay
setTimeout(() => typeText(), 800);

// =========================
// 🌙 Theme Toggle (unchanged)
// =========================
const themeToggle = document.getElementById("themeToggle");
const sunIcon = document.getElementById("sunIcon");
const moonIcon = document.getElementById("moonIcon");
const body = document.body;

function applyTheme(theme) {
    const isLight = theme === "light";
    body.classList.toggle("light", isLight);
    body.classList.toggle("dark", !isLight);
    sunIcon.classList.toggle("hidden", !isLight);
    moonIcon.classList.toggle("hidden", isLight);
}

(function initTheme() {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") applyTheme(saved);
    else applyTheme("dark");
})();

themeToggle.addEventListener("click", () => {
    const next = body.classList.contains("light") ? "dark" : "light";
    applyTheme(next);
    localStorage.setItem("theme", next);
});

// =========================
// 🧭 Smooth Scroll (unchanged)
// =========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

// =========================
// 📍 Active Nav Highlight (unchanged)
// =========================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");
window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 120)
            current = section.getAttribute("id");
    });
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`)
            link.classList.add("active");
    });
});

// =========================
// 📬 Contact Form (fixed: now uses fetch to submit to Web3Forms API)
// =========================
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = "Sending...";
        submitButton.disabled = true;

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });
            const json = await response.json();

            if (json.success) {
                submitButton.textContent = "Message Sent! ✓";
                submitButton.style.background = "linear-gradient(135deg, #10b981, #059669)";
                contactForm.reset();
            } else {
                submitButton.textContent = "Error. Try again.";
                console.error("Form submission error:", json);
            }
        } catch (error) {
            submitButton.textContent = "Error. Try again.";
            console.error("Form submission error:", error);
        }

        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.background = "";
            submitButton.disabled = false;
        }, 3000);
    });
}

// =========================
// 🎞️ Fade-in Animations on Scroll (unchanged)
// =========================
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
);

document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));