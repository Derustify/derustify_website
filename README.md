# Derustify Marketing Website

Premium landing page for Derustify - the AI photo restoration app.

## Preview Locally

Open in browser:
```
index.html
```

Or use VS Code Live Server extension.

## Structure

```
website/
├── index.html          # Main landing page
├── privacy.html        # Privacy policy
├── terms.html          # Terms of service
├── css/styles.css      # Design system + components
├── js/main.js          # Slider, FAQ, animations
└── assets/
    ├── icons/          # Logo, favicon
    └── images/         # Before/after demos (TODO)
```

## Features

- **Comparison sliders** - Interactive before/after reveal (touch/mouse/keyboard)
- **Silver/glass design** - Light theme matching the app aesthetic
- **Scroll animations** - Fade-in effects on scroll
- **FAQ accordion** - Expandable questions
- **Responsive** - Mobile, tablet, desktop

## Deploy to GitHub Pages

```bash
git init
git remote add origin https://github.com/Derustify/derustify.git
git add .
git commit -m "Initial marketing website"
git push -u origin main
```

Then: GitHub repo → Settings → Pages → Source: `main` branch (root `/`)

## TODO

- [x] Add real before/after demo images
- [ ] Fill in Privacy Policy content
- [ ] Fill in Terms of Service content
- [ ] Add Play Store link
- [ ] Add Windows download link
