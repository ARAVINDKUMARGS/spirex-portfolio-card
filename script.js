// ==============================
// 1. SELECT HTML ELEMENTS
// ==============================

const themeToggle = document.getElementById("themeToggle");
const copyEmailButton = document.getElementById("copyEmail");
const emailAddress = document.getElementById("emailAddress");
const backToTopButton = document.getElementById("backToTop");
const currentYear = document.getElementById("currentYear");
const roleText = document.getElementById("roleText");
const accentToggle = document.getElementById("accentToggle");
const scrollProgress = document.getElementById("scrollProgress");
const revealElements = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");


// ==============================
// 2. CURRENT YEAR
// ==============================

currentYear.textContent = new Date().getFullYear();


// ==============================
// 3. LIGHT AND DARK THEME
// ==============================

const savedTheme = localStorage.getItem("portfolioTheme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
}

function updateThemeButton() {
    const isLightTheme = document.body.classList.contains("light-theme");

    themeToggle.textContent = isLightTheme ? "🌙" : "☀️";

    themeToggle.setAttribute(
        "aria-label",
        isLightTheme ? "Switch to dark theme" : "Switch to light theme"
    );

    themeToggle.title = isLightTheme
        ? "Switch to dark theme"
        : "Switch to light theme";
}

updateThemeButton();

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("light-theme");

    const theme = document.body.classList.contains("light-theme")
        ? "light"
        : "dark";

    localStorage.setItem("portfolioTheme", theme);

    updateThemeButton();
});

// ==============================
// 4. ACCENT COLOR SWITCHER
// ==============================

const accents = ["purple", "coral", "green", "blue"];
let accentIndex = accents.indexOf(localStorage.getItem("portfolioAccent"));

if (accentIndex < 0) {
    accentIndex = 0;
} else if (accents[accentIndex] !== "purple") {
    document.body.dataset.accent = accents[accentIndex];
}

accentToggle.addEventListener("click", function () {
    accentIndex = (accentIndex + 1) % accents.length;
    const accent = accents[accentIndex];

    if (accent === "purple") {
        delete document.body.dataset.accent;
    } else {
        document.body.dataset.accent = accent;
    }

    localStorage.setItem("portfolioAccent", accent);
});


// ==============================
// 5. COPY EMAIL ADDRESS
// ==============================

copyEmailButton.addEventListener("click", async function () {
    const email = emailAddress.textContent.trim();

    try {
        await navigator.clipboard.writeText(email);

        copyEmailButton.textContent = "Copied! ✓";
    } catch (error) {
        // Fallback for browsers where clipboard access is unavailable.

        const temporaryInput = document.createElement("textarea");

        temporaryInput.value = email;
        temporaryInput.style.position = "fixed";
        temporaryInput.style.opacity = "0";

        document.body.appendChild(temporaryInput);

        temporaryInput.select();

        const copied = document.execCommand("copy");

        temporaryInput.remove();

        copyEmailButton.textContent = copied
            ? "Copied! ✓"
            : "Copy failed";
    }

    setTimeout(function () {
        copyEmailButton.textContent = "Copy Email";
    }, 2000);
});


// ==============================
// 6. BACK TO TOP BUTTON
// ==============================

window.addEventListener("scroll", function () {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
    scrollProgress.style.width = `${progress}%`;

    if (window.scrollY > 300) {
        backToTopButton.classList.add("show");
    } else {
        backToTopButton.classList.remove("show");
    }
});

// ==============================
// 7. REVEAL AND ACTIVE NAVIGATION
// ==============================

const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealElements.forEach(function (element) {
    revealObserver.observe(element);
});

const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            navLinks.forEach(function (link) {
                link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
            });
        }
    });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(function (section) {
    sectionObserver.observe(section);
});

document.addEventListener("pointermove", function (event) {
    document.body.style.setProperty("--pointer-x", `${event.clientX}px`);
    document.body.style.setProperty("--pointer-y", `${event.clientY}px`);
});

backToTopButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// ==============================
// 8. ROTATING DEVELOPER ROLES
// ==============================

const roles = [
    "Full Stack Developer",
    "Web Developer",
    "Software Developer"
];

let currentRoleIndex = 0;

setInterval(function () {
    currentRoleIndex = (currentRoleIndex + 1) % roles.length;

    roleText.style.opacity = "0";

    setTimeout(function () {
        roleText.textContent = roles[currentRoleIndex];
        roleText.style.opacity = "1";
    }, 250);

}, 2500);


// ==============================
// 9. WELCOME MESSAGE
// ==============================

console.log(
    "Welcome to Aravind Kumar GS's Portfolio!"
);

console.log(
    "Built with HTML, CSS, and JavaScript."
);