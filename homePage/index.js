    
      document.querySelectorAll('.note-toggle').forEach(button => {
button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      content.style.display = (content.style.display === 'block') ? 'none' : 'block';
    });
  });
    
    // Back to Top button
const backToTopButton = document.getElementById("backToTop");
const navbar = document.querySelector('.navbar');
    
window.addEventListener("scroll", () => {
  if (window.scrollY > 250) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
  
    if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

    console.log("%c👋 Hey explorer! Found the console? You're my kind of curious.", "color: #00d4ff; font-size: 16px; font-family: monospace;");

const text = "Exploring science, code, stars, and stories.";
const typedTextSpan = document.getElementById("typed-text");
let i = 0;

function type() {
  if (i < text.length) {
    typedTextSpan.textContent += text.charAt(i);
    i++;
    setTimeout(type, 60); // speed (ms)
  }
}

window.addEventListener("DOMContentLoaded", type);

  const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const numStars = 150;
const stars = [];

for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5 + 0.5,
    velocity: Math.random() * 0.3 + 0.1
  });
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--star-color').trim();

  stars.forEach(star => {
    star.y += star.velocity;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animateStars);
}

animateStars();

    fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("apod-container");
    container.innerHTML = `
      <h3>${data.title}</h3>
      <img src="${data.url}" alt="${data.title}">
      <p>${data.explanation}</p>
    `;
  })
  .catch(err => {
    document.getElementById("apod-container").innerHTML = "<p>Could not load APOD.</p>";
    console.error(err);
  });

    /*
document.querySelectorAll('.read-more').forEach(button => {
  button.addEventListener('click', () => {
    const fullTextId = button.getAttribute('aria-controls');
    const fullText = document.getElementById(fullTextId);
    const isOpen = fullText.classList.contains('open');

    // Close all open full-text sections
    document.querySelectorAll('.full-text.open').forEach(ft => {
      ft.classList.remove('open');
      ft.style.maxHeight = null;
      ft.style.opacity = 0;
      ft.setAttribute('aria-hidden', 'true');
    });

    // Reset all buttons
    document.querySelectorAll('.read-more').forEach(btn => {
      btn.textContent = 'Read More';
      btn.setAttribute('aria-expanded', 'false');
    });

    // If clicked section is not open, open it
    if (!isOpen) {
      fullText.classList.add('open');
      fullText.style.maxHeight = fullText.scrollHeight + 'px';
      fullText.style.opacity = 1;
      fullText.setAttribute('aria-hidden', 'false');
      button.textContent = 'Read Less';
      button.setAttribute('aria-expanded', 'true');
    }
  });
});


document.querySelectorAll('.read-more').forEach(button => {
  button.addEventListener('click', () => {
    const contentId = button.getAttribute('aria-controls');
    const content = document.getElementById(contentId);
    const isOpen = !content.hidden;

    // Close all content sections
    document.querySelectorAll('.full-text').forEach(section => {
      section.hidden = true;
    });

    // Reset all buttons
    document.querySelectorAll('.read-more').forEach(btn => {
      btn.textContent = 'Read More';
      btn.setAttribute('aria-expanded', 'false');
    });

    // If the clicked one was closed, open it
    if (!isOpen) {
      content.hidden = false;
      button.textContent = 'Show Less';
      button.setAttribute('aria-expanded', 'true');
    }
  });
});
*/

    document.querySelectorAll('.read-more').forEach(button => {
  button.addEventListener('click', () => {
    const contentId = button.getAttribute('aria-controls');
    const content = document.getElementById(contentId);
    const isOpen = content.classList.contains('visible');

    // Close all
    document.querySelectorAll('.full-text').forEach(section => {
      section.classList.remove('visible');
      section.setAttribute('aria-hidden', 'true');
      section.style.maxHeight = null;
      section.style.opacity = 0;
    });

    document.querySelectorAll('.read-more').forEach(btn => {
      btn.textContent = 'Read More';
      btn.setAttribute('aria-expanded', 'false');
    });

    // Open clicked one
    if (!isOpen) {
      content.classList.add('visible');
      content.setAttribute('aria-hidden', 'false');
      content.style.maxHeight = content.scrollHeight + "px";
      content.style.opacity = 1;

      button.textContent = 'Show Less';
      button.setAttribute('aria-expanded', 'true');
    }
  });
});


//sidebar links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      target.setAttribute('tabindex', '-1'); // Make it focusable
      target.focus(); // Force screen reader to read
    }
  });
});

    
// Sidebar toggle logic
const toggleBtn = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

function isMobileView() {
  return window.innerWidth <= 768;
}

function updateAria() {
  const isOpen = sidebar.classList.contains('open');

  if (isMobileView()) {
    sidebar.setAttribute('aria-hidden', !isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen);
  } else {
    sidebar.removeAttribute('aria-hidden'); // Always accessible on desktop
    toggleBtn.setAttribute('aria-expanded', false);
  }
}

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  document.body.classList.toggle('sidebar-open');
  updateAria();
});

// Re-check on window resize (in case user resizes from mobile to desktop)
window.addEventListener('resize', updateAria);

// Initial check on load
updateAria();

    
</script>
<script>
  fetch('https://iapetus-star.github.io/Iapetus-repo/changelog.html')
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const firstEntry = doc.querySelector('.entry');
      const dateHeading = firstEntry ? firstEntry.querySelector('h2') : null;

      // Check if firstEntry or dateHeading is missing
      if (!firstEntry || !dateHeading) {
        const banner = document.getElementById('announcement-banner');
        banner.style.display = 'none';
        return; // Exit early if changelog content is missing
      }

      const latestDate = dateHeading.textContent.trim();

      // Check if localStorage is available before using it
      if (typeof localStorage !== 'undefined') {
        const storedDismissedDate = localStorage.getItem('dismissedChangelogDate');

        // Only show the banner if the changelog date hasn't been dismissed before
        if (storedDismissedDate !== latestDate) {
          const banner = document.getElementById('announcement-banner');
          banner.innerHTML = `
            ✨ Site updated on ${latestDate} <a href="https://iapetus-star.github.io/Iapetus-repo/changelog.html" rel="noopener noreferrer">See what's new!</a>
            <button class="dismiss-button" aria-label="Dismiss announcement">&times;</button>
          `;
          banner.style.display = 'block';

          const dismissBtn = banner.querySelector('.dismiss-button');
          dismissBtn.addEventListener('click', () => {
            banner.classList.add('fade-out');

            // Wait for the fade-out to finish
            setTimeout(() => {
              localStorage.setItem('dismissedChangelogDate', latestDate);
              banner.style.display = 'none';
              banner.classList.remove('fade-out');
            }, 500); // duration matches the CSS transition
          });
        }
      }
    })
    .catch(error => {
      console.error('Could not load changelog:', error);
    });

