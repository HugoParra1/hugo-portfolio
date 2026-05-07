# Hugo Parra — Portfolio

Personal portfolio of Hugo Parra, QA Engineer. Built with React 18 + Vite, bilingual (ES/EN), animated with Framer Motion.

---

## Tech stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Bundler & dev server |
| react-i18next | ES / EN translations |
| framer-motion | Animations |
| react-intersection-observer | Scroll-triggered animations |

---

## Run locally

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (http://localhost:5173)
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview
```

---

## Add your CV

Place the PDF at exactly this path:

```
src/assets/CV_Hugo_Parra_2026.pdf
```

The download buttons in the Hero and Contact sections already point to this file. After adding it, rebuild with `npm run build`.

---

## Update content (text & translations)

All portfolio text lives in two JSON files — no component code needs to be touched.

| File | Language |
|---|---|
| `src/i18n/es.json` | Spanish (default) |
| `src/i18n/en.json` | English |

### Key sections to edit

```jsonc
// Hero
"hero": {
  "available": "Disponible para nuevos proyectos",
  "name": "Hugo Parra",
  "role": "QA Engineer · Automatización · Frontend",
  "summary": "...",
  "stats": { "regression": "...", "tests": "...", "award": "..." }
}

// About bio paragraph
"about": { "bio": "..." }

// Experience — edit jobs array (company, role, period, highlights, tags)
"experience": { "jobs": [ ... ] }

// Skills — edit pct values (0–100)
"skills": { "categories": [ { "skills": [ { "name": "Cypress", "pct": 92 } ] } ] }

// Contact
"contact": { "cards": { "email": { "value": "tu@email.com" }, ... } }
```

---

## Deploy to Vercel

### 1 — Push to GitHub

```bash
cd hugo-portfolio

git init
git add .
git commit -m "feat: initial portfolio"

# Replace TU_USUARIO with your GitHub username
git remote add origin https://github.com/TU_USUARIO/hugo-portfolio.git
git branch -M main
git push -u origin main
```

### 2 — Import on Vercel

1. Go to **[vercel.com](https://vercel.com)** and log in (or sign up with GitHub)
2. Click **"Add New… → Project"**
3. Find and click **"Import"** next to `hugo-portfolio`

### 3 — Configure build settings

| Setting | Value |
|---|---|
| Framework Preset | **Vite** |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

> Vercel usually auto-detects all of these from `vite.config.js`. Verify they match before deploying.

### 4 — Deploy

Click **"Deploy"**. Vercel will:
- Install dependencies
- Run `npm run build`
- Serve the `dist/` folder
- Apply the SPA rewrite rule from `vercel.json` (all routes → `index.html`)

### 5 — Custom domain (optional)

In the Vercel dashboard go to **Settings → Domains** and add your domain. Vercel provisions HTTPS automatically.

### Re-deploy after changes

```bash
git add .
git commit -m "fix: update content"
git push
```

Vercel re-deploys automatically on every push to `main`.

---

## Project structure

```
src/
├── components/
│   └── Navbar.jsx          # Fixed nav, language toggle, mobile hamburger
├── sections/
│   ├── Hero.jsx / .css     # Full-viewport intro with stats
│   ├── About.jsx / .css    # Bio, certs, orbital decoration
│   ├── Experience.jsx/.css # Vertical timeline
│   ├── Skills.jsx / .css   # SVG ring progress cards
│   └── Contact.jsx / .css  # Contact cards + CV download
├── i18n/
│   ├── index.js            # i18next init (browser language detector)
│   ├── es.json             # Spanish translations
│   └── en.json             # English translations
├── assets/
│   └── CV_Hugo_Parra_2026.pdf   ← place your CV here
├── index.css               # Design tokens, global reset, Navbar styles
└── App.jsx                 # Root component
```

---

## License

MIT — feel free to adapt for your own portfolio.

