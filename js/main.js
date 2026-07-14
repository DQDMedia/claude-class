// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });
}

// Gallery + lightbox
const grid = document.querySelector(".gallery-grid");

if (grid) {
  fetch("images/gallery/manifest.json")
    .then((res) => res.json())
    .then((items) => renderGallery(items))
    .catch((err) => {
      console.error("Could not load gallery manifest:", err);
      grid.innerHTML =
        '<p style="color:#9a9a97">Gallery could not be loaded. If you are viewing this file directly, run a local server (e.g. `python3 -m http.server`) so the browser can fetch images/gallery/manifest.json.</p>';
    });

  function renderGallery(items) {
    grid.innerHTML = "";

    items.forEach((item, index) => {
      const figure = document.createElement("figure");
      figure.className = "gallery-item" + (item.wide ? " wide" : "");
      figure.dataset.index = index;

      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.caption || "";
      img.loading = "lazy";
      img.addEventListener("load", () => img.classList.add("loaded"));

      figure.appendChild(img);

      if (item.caption) {
        const caption = document.createElement("figcaption");
        caption.className = "caption";
        caption.textContent = item.caption;
        figure.appendChild(caption);
      }

      figure.addEventListener("click", () => openLightbox(items, index));
      grid.appendChild(figure);
    });
  }

  // Lightbox
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <button class="lb-close" aria-label="Close">&times;</button>
    <button class="lb-prev" aria-label="Previous">&#8249;</button>
    <img src="" alt="" />
    <div class="lb-caption"></div>
    <button class="lb-next" aria-label="Next">&#8250;</button>
  `;
  document.body.appendChild(lightbox);

  const lbImg = lightbox.querySelector("img");
  const lbCaption = lightbox.querySelector(".lb-caption");
  let currentItems = [];
  let currentIndex = 0;

  function openLightbox(items, index) {
    currentItems = items;
    currentIndex = index;
    showImage();
    lightbox.classList.add("open");
  }

  function showImage() {
    const item = currentItems[currentIndex];
    lbImg.src = item.src;
    lbImg.alt = item.caption || "";
    lbCaption.textContent = item.caption || "";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % currentItems.length;
    showImage();
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
    showImage();
  }

  lightbox.querySelector(".lb-close").addEventListener("click", closeLightbox);
  lightbox.querySelector(".lb-next").addEventListener("click", nextImage);
  lightbox.querySelector(".lb-prev").addEventListener("click", prevImage);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  });
}

// Contact form
const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const note = document.querySelector(".form-note");
    note.textContent =
      "This form isn't connected to an email service yet. See the README for how to wire it up with Formspree (free, no backend required).";
    note.classList.add("visible");
  });
}

// BOGO promo popup
const promoOverlay = document.querySelector("#promo-overlay");
const promoClose = document.querySelector("#promo-close");

if (promoOverlay) {
  window.addEventListener("load", () => promoOverlay.classList.add("open"));

  promoClose.addEventListener("click", () => promoOverlay.classList.remove("open"));

  promoOverlay.addEventListener("click", (e) => {
    if (e.target === promoOverlay) promoOverlay.classList.remove("open");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") promoOverlay.classList.remove("open");
  });
}
