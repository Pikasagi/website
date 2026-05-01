const slides = [...document.querySelectorAll(".slide")];
const dots = [...document.querySelectorAll(".slide-nav .dot")];
const projectTiles = [...document.querySelectorAll(".project-tile")];
const projectToggles = [...document.querySelectorAll(".project-toggle")];

const setActiveDot = (id) => {
  dots.forEach((dot) => {
    const isActive = dot.getAttribute("href") === `#${id}`;
    dot.classList.toggle("active", isActive);
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveDot(entry.target.id);
      }
    });
  },
  {
    threshold: 0.55
  }
);

slides.forEach((slide) => observer.observe(slide));

const setProjectOpenState = (tile, open) => {
  const toggle = tile.querySelector(".project-toggle");
  tile.classList.toggle("is-open", open);
  if (toggle) {
    toggle.setAttribute("aria-expanded", String(open));
  }
};

projectToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const tile = toggle.closest(".project-tile");
    if (!tile) {
      return;
    }

    const shouldOpen = !tile.classList.contains("is-open");
    projectTiles.forEach((card) => setProjectOpenState(card, false));
    setProjectOpenState(tile, shouldOpen);

    // Small whimsical sparkle on interaction.
    const sparkle = document.createElement("span");
    sparkle.className = "click-sparkle";
    sparkle.textContent = "✦";
    sparkle.style.left = `${Math.random() * 70 + 15}%`;
    sparkle.style.top = `${Math.random() * 35 + 8}%`;
    tile.appendChild(sparkle);
    window.setTimeout(() => sparkle.remove(), 700);
  });
});
