# Eduardson Cortez — Portfolio Website

Personal portfolio of Eduardson Cortez, a graduating BS Information Systems (Cybersecurity Track) student and Junior Developer working with JavaScript / TypeScript, Next.js, Node.js, and PostgreSQL/Supabase.

**Live site:** https://eduardsoncortez-sec.github.io/portfolio-website/

![Portfolio preview](images/portfolio-preview.png)

## About

A single-page portfolio covering background, technical skills, work experience, projects, and
education — built to support job applications for Junior Developer / Junior Application Developer
roles.

## Technologies used

- HTML5, CSS3 (custom, no framework)
- Vanilla JavaScript — scroll spy, mobile nav, staggered reveal, scroll-progress bar, count-up
  stats, typed role effect, pointer tilt/spotlight
- Self-contained inline SVG icon sprite (no external icon CDN)
- Google Fonts (Poppins, Inter, JetBrains Mono)
- Responsive `<picture>` with WebP + JPEG fallback
- Respects `prefers-reduced-motion`

## Project structure

```
portfolio-website/
├── index.html          # Main page
├── css/
│   └── style.css       # Theme, layout, animations, responsive rules
├── js/
│   └── script.js       # Nav, scroll spy, reveal, count-up, typed role, tilt
├── images/
│   ├── profile.webp / profile@2x.webp / profile.jpg   # Hero photo
│   ├── portfolio-preview.png                          # Social share preview
│   └── projects/                                      # Project screenshots
└── docs/
    └── Eduardson_Cortez_Resume.pdf
```

## Updating project screenshots

Each project card loads `images/projects/<name>.webp` with a `<name>.jpg` fallback
(`datashield`, `hssmsb`, `eventify`). To refresh one, drop in a new wide screenshot
(~1280px, 16:10-ish) and re-export both formats.

## Deployment

Fully static — no build step. Deployed via **GitHub Pages** from the `main` branch.

After changing `css/style.css` or `js/script.js`, bump the `?v=` query string on
their `<link>` / `<script>` tags in `index.html` so visitors' browsers fetch the
new file instead of a cached copy.

To run locally:

```bash
npx http-server -p 5500
```

Then open `http://localhost:5500`.

## Contact

- Email: eduardcortez05@gmail.com
- GitHub: https://github.com/eduardsoncortez-sec
- LinkedIn: https://www.linkedin.com/in/eduardson-cortez-23a88b338
