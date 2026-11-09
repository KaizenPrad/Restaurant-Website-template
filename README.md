# Maison Savour

A premium fine-dining restaurant website built as a portfolio showcase. Dark, editorial, and motion-led — designed to feel like a real high-end hospitality brand rather than a template.

![Maison Savour](https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=80)

## Tech Stack

- **React 18** + **Vite 6**
- **Tailwind CSS 3** with a custom luxury design token set
- **Framer Motion** for entrance, scroll, carousel, and modal animation
- **Lucide React** for iconography
- React Context + Hooks for cart, toasts, and overlay state

No router is used — the experience is a single, section-based landing page with smooth in-page navigation.

## Getting Started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in /dist
npm run preview  # preview the production build
```

## Features

- **Sticky navigation** with scroll-spy active states, scroll progress, and a full mobile drawer
- **Hero** with staggered entrance, floating circular dish, custom EST. 2024 seal, leaf ornament, and trust indicators
- **Signature Collection** with four menu cards, hover elevation, image zoom, and add-to-cart micro-interactions
- **Chef's Table specials** feature panel
- **Our Story** editorial layout with animated statistics and a composed image grid
- **Testimonials** with an infinite, swipe-friendly carousel, pagination dots, arrows, and rating summary
- **Cart drawer** with quantity controls, removal, subtotal, demo checkout, and `localStorage` persistence
- **Search overlay** that filters the menu by dish name and supports adding items
- **Reservation modal** with full validation and a demo confirmation state
- **Newsletter form** with validation and success/error feedback
- **Guest account modal**, privacy/terms modals, toast system, and back-to-top control
- **Accessibility**: semantic landmarks, labelled controls, keyboard focus trapping in modals, skip link, `aria-live` cart count, and `prefers-reduced-motion` support
- **Performance**: lazy-loaded below-the-fold imagery, eager/preloaded hero image, image fallbacks, and a lean dependency footprint

## Project Structure

```text
src/
  components/
    ui/               # Button, Logo, Modal, SmartImage, Reveal, Seal, etc.
    Navbar.jsx        # Navigation + mobile drawer
    Hero.jsx          # Hero section
    TrustIndicators.jsx
    MenuSection.jsx   # Signature Collection
    MenuCard.jsx
    SpecialsSection.jsx
    AboutSection.jsx
    Testimonials.jsx
    Footer.jsx        # Contact, newsletter, legal modals
    CartDrawer.jsx
    SearchModal.jsx
    ReservationModal.jsx
    AccountModal.jsx
    BackToTop.jsx
  context/
    CartContext.jsx
    ToastContext.jsx
  data/
    images.js
    menuItems.js
    site.js
    testimonials.js
  hooks/
    useScrollSpy.js
  utils/
    scrollToSection.js
  App.jsx
  main.jsx
  index.css
```

## Deploying to Render

This project is a static Vite site. On Render, deploy it as a **Static Site** (free, CDN-backed, automatic HTTPS).

### 1. Push the project to GitHub

The project is not yet a Git repository, so initialize and push it first:

```bash
git init
git add .
git commit -m "Initial commit: Maison Savour"
```

Create an empty GitHub repository, then:

```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

Or, with the GitHub CLI:

```bash
gh repo create maison-savour --public --source=. --remote=origin --push
```

### 2. Deploy on Render (dashboard)

1. Sign in at [dashboard.render.com](https://dashboard.render.com) with GitHub.
2. Click **New +** → **Static Site**.
3. Connect the repository you just pushed.
4. Use these settings:
   - **Name:** `maison-savour`
   - **Branch:** `main`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
5. Add an environment variable (optional if `.nvmrc` is committed):
   - `NODE_VERSION` = `22`
6. Click **Create Static Site**.

Render builds and publishes the site at `https://<your-service>.onrender.com`. Every push to `main` triggers an automatic redeploy.

### 3. Alternative: Blueprint deploy

The included `render.yaml` lets Render configure the service automatically:

1. Push the repo (including `render.yaml` and `.nvmrc`) to GitHub.
2. In Render, click **New +** → **Blueprint**.
3. Select the repository and apply the detected service.

### Notes

- No backend or environment secrets are required.
- No SPA rewrite is needed because navigation uses in-page anchors. If you later add React Router, add a rewrite rule: `/*` → `/index.html`.
- To use a custom domain, open the service's **Settings → Custom Domains** and follow Render's DNS instructions. TLS is provisioned automatically.

## Demo Notes

This is a frontend demonstration project. Checkout, reservations, newsletter subscription, and account sign-in are intentionally simulated — no payment is processed, no reservation is created, and no data is sent to a backend. Photography is sourced from [Unsplash](https://unsplash.com).

---

Designed and developed as a portfolio piece.
