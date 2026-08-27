  
// Helpers & Configuration
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const CONFIG = {
  typingSpeed: 60,
  mobileBreakpoint: 768,
  backToTopOffset: 250,
  navbarScrollOffset: 50,
  starCount: 150,
  starMinRadius: 0.5,
  starMaxRadius: 2,
  starMinSpeed: 0.1,
  starMaxSpeed: 0.4,
  bannerFadeDuration: 500
};

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// Initialize Everything
document.addEventListener("DOMContentLoaded", () => {
  initNoteToggles();
  initBackToTop();
  initTypingEffect();
  initStarfield();
  initAPOD();
  initReadMore();
  initAnchorAccessibility();
  initSidebar();
  initAnnouncementBanner();

  console.log(
    "%c👋 Hey explorer! Found the console? You're my kind of curious.",
    "color:#00d4ff;font-size:16px;font-family:monospace;"
  );
});
  
// Note Toggles
function initNoteToggles() {
  const buttons = $$(".note-toggle");

  if (!buttons.length) return;

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      if (!content) return;

      const isOpen = content.style.display === "block";
      content.style.display = isOpen ? "none" : "block";
    });
  });
}

// Back To Top + Navbar
function initBackToTop() {
  const button = $("#backToTop");
  const navbar = $(".navbar");

  if (!button) return;

  const handleScroll = () => {
    const y = window.scrollY;

    button.style.display =
      y > CONFIG.backToTopOffset ? "block" : "none";

    if (navbar) {
      navbar.classList.toggle("scrolled", y > CONFIG.navbarScrollOffset);
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// Typing Effect
function initTypingEffect() {
  const typedText = $("#typed-text");

  if (!typedText) return;

  const text = "Exploring science, code, stars, and stories.";

  let index = 0;

  function type() {
    if (index >= text.length) return;

    typedText.textContent += text.charAt(index++);
    setTimeout(type, CONFIG.typingSpeed);
  }

  type();
}

// Starfield Animation
function initStarfield() {
  if (prefersReducedMotion) return;
  const canvas = $("#stars");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const stars = Array.from({ length: CONFIG.starCount }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * (CONFIG.starMaxRadius - CONFIG.starMinRadius) + CONFIG.starMinRadius,
    velocity: Math.random() * (CONFIG.starMaxSpeed - CONFIG.starMinSpeed) + CONFIG.starMinSpeed
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = getComputedStyle(document.documentElement)
      .getPropertyValue("--star-color")
      .trim();

    stars.forEach(star => {
      star.y += star.velocity;

      if (star.y > canvas.height) {
        star.y = 0;
        star.x = Math.random() * canvas.width;
      }

      ctx.beginPath();
      ctx.arc(
        star.x,
        star.y,
        star.radius,
        0,
        Math.PI * 2
      );
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// NASA Astronomy Picture of the Day
async function initAPOD() {
  const container = $("#apod-container");

  if (!container) return;

  try {
    const response = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"
    );

    if (!response.ok)
      throw new Error("Failed to fetch APOD");

    const data = await response.json();

    container.innerHTML = `
      <h3>${data.title}</h3>
      <img src="${data.url}" alt="${data.title}">
      <p>${data.explanation}</p>
    `;
  } catch (error) {
    container.innerHTML =
      "<p>Could not load APOD.</p>";

    console.error(error);
  }
}

// Read More Sections
function initReadMore() {
  const buttons = $$(".read-more");
  const sections = $$(".full-text");

  if (!buttons.length) return;

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const content = document.getElementById(
        button.getAttribute("aria-controls")
      );

      if (!content) return;

      const isOpen = content.classList.contains("visible");

      // Close all sections
      sections.forEach(section => {
        section.classList.remove("visible");
        section.setAttribute("aria-hidden", "true");
        section.style.maxHeight = null;
        section.style.opacity = 0;
      });

      // Reset buttons
      buttons.forEach(btn => {
        btn.textContent = "Read More";
        btn.setAttribute(
          "aria-expanded",
          "false"
        );
      });

      // Open selected section
      if (!isOpen) {
        content.classList.add("visible");
        content.setAttribute(
          "aria-hidden",
          "false"
        );
        content.style.maxHeight =
          content.scrollHeight + "px";
        content.style.opacity = 1;

        button.textContent = "Show Less";
        button.setAttribute(
          "aria-expanded",
          "true"
        );
      }
    });
  });
}

// Accessible Anchor Links
function initAnchorAccessibility() {
  const links = $$('a[href^="#"]');

  if (!links.length) return;

  links.forEach(link => {
    link.addEventListener("click", () => {
      const targetId = link.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);

      if (!target) return;

      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });
}

// Sidebar
function initSidebar() {
  const toggleBtn = $("#menuToggle");
  const sidebar = $("#sidebar");

  if (!toggleBtn || !sidebar) return;

  const isMobileView = () =>
    window.innerWidth <= CONFIG.mobileBreakpoint;

  function updateAria() {
    const isOpen = sidebar.classList.contains("open");

    if (isMobileView()) {
      sidebar.setAttribute("aria-hidden", !isOpen);
      toggleBtn.setAttribute("aria-expanded", isOpen);
    } else {
      sidebar.removeAttribute("aria-hidden");
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  }

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    document.body.classList.toggle("sidebar-open");

    updateAria();
  });

  window.addEventListener("resize", updateAria);

  updateAria();
}

// Announcement Banner
async function initAnnouncementBanner() {
  const banner = $("#announcement-banner");

  if (!banner) return;

  try {
    const response = await fetch(
      "https://iapetus-star.github.io/Iapetus-repo/changelog.html"
    );

    if (!response.ok)
      throw new Error("Unable to fetch changelog.");

    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const firstEntry = doc.querySelector(".entry");
    const dateHeading = firstEntry?.querySelector("h2");

    if (!firstEntry || !dateHeading) {
      banner.style.display = "none";
      return;
    }

    const latestDate = dateHeading.textContent.trim();

    const dismissedDate = typeof localStorage !== "undefined" ? localStorage.getItem("dismissedChangelogDate") : null;

    if (dismissedDate === latestDate) return;

    banner.innerHTML = `
      ✨ Site updated on ${latestDate}
      <a href="https://iapetus-star.github.io/Iapetus-repo/changelog.html"
         rel="noopener noreferrer">
         See what's new!
      </a>
      <button class="dismiss-button" aria-label="Dismiss announcement">
        &times;
      </button>
    `;

    banner.style.display = "block";

    const dismissBtn = $(".dismiss-button");

    dismissBtn?.addEventListener("click", () => {
      banner.classList.add("fade-out");

      setTimeout(() => {
        if (typeof localStorage !== "undefined") {
          localStorage.setItem(
            "dismissedChangelogDate",
            latestDate
        );
        }

        banner.style.display = "none";
        banner.classList.remove("fade-out");
      }, CONFIG.bannerFadeDuration);
    });

  } catch (error) {
    console.error("Could not load changelog:", error);
  }
}

