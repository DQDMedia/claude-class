# Your Name Photography

A minimal static photography portfolio. No build step, no framework — just HTML, CSS, and vanilla JS.

## Structure

```
index.html      Home page / gallery
about.html      About page
contact.html    Contact page
css/style.css   All styling
js/main.js      Gallery rendering, lightbox, nav toggle, contact form
images/         Your photos
images/gallery/manifest.json   List of gallery images + captions
```

## Adding your own photos

1. Drop your image files into `images/gallery/`.
2. Edit `images/gallery/manifest.json` — one entry per photo:
   ```json
   { "src": "images/gallery/my-photo.jpg", "caption": "Big Sur, 2026", "wide": false }
   ```
   Set `"wide": true` on a photo to make it span two grid columns (use sparingly, for standout shots).
3. Replace `images/hero.svg` with a real photo for the homepage banner (keep the filename or update the `src` in `index.html`).
4. Replace `images/portrait.svg` with a photo of yourself on `about.html`.
5. Delete the `placeholder-*.svg` files once you don't need them.

Use reasonably compressed JPEGs (1600–2000px on the long edge is plenty for web) so the site stays fast.

## Editing text

- Swap "Your Name" and the tagline in the `<header>` and `<section class="hero">` of each HTML file.
- Fill in the bracketed placeholders in `about.html`.
- Update the email address in `contact.html`.

## Previewing locally

Opening `index.html` directly in a browser (`file://...`) will NOT load the gallery, because the browser blocks `fetch()` for local files. Run a tiny local server instead from this folder:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Wiring up the contact form

The form currently does nothing but show a message on submit. The easiest fix with no backend:

1. Sign up at [formspree.io](https://formspree.io) (free tier available) and create a form to get an endpoint like `https://formspree.io/f/xxxxxxx`.
2. In `contact.html`, change:
   ```html
   <form id="contact-form">
   ```
   to:
   ```html
   <form id="contact-form" action="https://formspree.io/f/xxxxxxx" method="POST">
   ```
3. Remove (or keep, as a fallback) the `preventDefault()` handling in `js/main.js` — with an `action` and `method` set, the browser will submit the form to Formspree directly.

## Deploying

Any static host works — no build step needed. Easiest options:

- **Netlify**: drag-and-drop the whole `photography-portfolio` folder onto [app.netlify.com/drop](https://app.netlify.com/drop).
- **Vercel**: `vercel` CLI or connect the folder as a project.
- **GitHub Pages**: push this folder to a repo and enable Pages in repo settings.
