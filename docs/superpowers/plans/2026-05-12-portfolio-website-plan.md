# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page portfolio website for a film/TV directing graduate with dark cinema aesthetic.

**Architecture:** Single HTML page with 4 sections (Hero, About, Portfolio, Contact), vanilla CSS with CSS custom properties for theming, vanilla JS + GSAP ScrollTrigger for animations. Right-side dot navigation syncs with scroll position.

**Tech Stack:** Vite, HTML/CSS, vanilla JavaScript, GSAP 3 (ScrollTrigger), no framework

---

### Task 1: Initialize Vite project

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html` (skeleton)
- Create: `src/css/style.css` (empty)
- Create: `src/js/main.js` (empty)
- Create: `src/assets/images/.gitkeep`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^6.0.0"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `npm install`

- [ ] **Step 3: Create vite.config.js**

```js
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
  },
});
```

- [ ] **Step 4: Create index.html skeleton**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio</title>
  <link rel="stylesheet" href="/src/css/style.css">
</head>
<body>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script type="module" src="/src/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 5: Create directory structure and verify dev server starts**

Run: `mkdir -p src/css src/js src/assets/images && touch src/css/style.css src/js/main.js src/assets/images/.gitkeep`
Run: `npx vite --host 0.0.0.0`
Expected: Dev server starts, blank page loads at localhost

---

### Task 2: Write HTML structure

**Files:**
- Modify: `index.html` (replace skeleton body content)

- [ ] **Step 1: Replace `<body>` with full section structure**

```html
<body>
  <!-- Navigation -->
  <nav class="nav-dots" id="navDots">
    <span class="nav-dot active" data-target="hero"></span>
    <span class="nav-dot" data-target="about"></span>
    <span class="nav-dot" data-target="portfolio"></span>
    <span class="nav-dot" data-target="contact"></span>
  </nav>

  <!-- Hero Section -->
  <section id="hero" class="section-hero">
    <video class="hero-video" autoplay muted loop playsinline>
      <source src="" type="video/mp4">
    </video>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1 class="hero-name">你的名字</h1>
      <p class="hero-role">导演 · 编剧 · 剪辑</p>
      <div class="hero-scroll-indicator">
        <span></span>
      </div>
    </div>
  </section>

  <!-- About Section -->
  <section id="about" class="section-about">
    <div class="section-inner">
      <h2 class="section-title">关于我</h2>
      <div class="about-grid">
        <div class="about-photo">
          <img src="/src/assets/images/profile.jpg" alt="个人照片">
        </div>
        <div class="about-info">
          <div class="about-item">
            <h3>教育背景</h3>
            <p><!-- 院校及专业 --></p>
          </div>
          <div class="about-item">
            <h3>专业技能</h3>
            <ul class="skills-list">
              <li>导演</li><li>剪辑</li><li>剧本创作</li><li>调色</li>
            </ul>
          </div>
          <div class="about-item">
            <h3>获奖与实习经历</h3>
            <p><!-- 获奖和实习经历 --></p>
          </div>
          <div class="about-item">
            <h3>个人介绍</h3>
            <p><!-- 简短个人介绍 --></p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Portfolio Section -->
  <section id="portfolio" class="section-portfolio">
    <div class="section-inner">
      <h2 class="section-title">作品集</h2>
      <div class="portfolio-grid" id="portfolioGrid">
        <!-- Cards injected by JS -->
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="section-contact">
    <div class="section-inner">
      <h2 class="section-title">联系方式</h2>
      <div class="contact-grid">
        <div class="contact-item">
          <span class="contact-label">邮箱</span>
          <span class="contact-value">your@email.com</span>
        </div>
        <div class="contact-item">
          <span class="contact-label">微信</span>
          <span class="contact-value">your_wechat</span>
        </div>
        <div class="contact-item">
          <span class="contact-label">手机</span>
          <span class="contact-value">138-xxxx-xxxx</span>
        </div>
        <div class="contact-socials">
          <!-- Social media links -->
          <a href="#" class="social-link">Bilibili</a>
          <a href="#" class="social-link">微博</a>
          <a href="#" class="social-link">小红书</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Portfolio Modal -->
  <div class="modal" id="videoModal">
    <div class="modal-backdrop"></div>
    <div class="modal-content">
      <button class="modal-close">&times;</button>
      <div class="modal-video-wrapper" id="modalVideoWrapper"></div>
      <div class="modal-info">
        <h3 class="modal-title" id="modalTitle"></h3>
        <p class="modal-desc" id="modalDesc"></p>
      </div>
    </div>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script type="module" src="/src/js/main.js"></script>
</body>
```

- [ ] **Step 2: Verify page loads with all sections**

Run: `npx vite --host 0.0.0.0`
Expected: Blank page with all section elements visible in devtools

---

### Task 3: CSS base — variables, reset, typography

**Files:**
- Modify: `src/css/style.css` (write base styles)

- [ ] **Step 1: Write CSS custom properties, reset, and typography**

```css
/* === Reset === */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* === Custom Properties === */
:root {
  --bg: #0a0a0f;
  --bg-elevated: #111118;
  --gold: #c9a84c;
  --gold-dim: rgba(201, 168, 76, 0.3);
  --red: #8b1a1a;
  --text: #e0e0e0;
  --text-dim: #888;
  --font-heading: 'Noto Serif SC', 'Times New Roman', serif;
  --font-body: 'Noto Sans SC', 'Helvetica Neue', sans-serif;
  --max-width: 1100px;
}

/* === Base === */
html {
  scroll-behavior: smooth;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.7;
}

body {
  overflow-x: hidden;
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
  color: #fff;
}

a {
  color: var(--gold);
  text-decoration: none;
  transition: color 0.3s;
}
a:hover { color: #fff; }

ul { list-style: none; }

img { max-width: 100%; display: block; }

/* === Section Common === */
section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-inner {
  width: 100%;
  max-width: var(--max-width);
  padding: 80px 40px;
}

.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  color: var(--gold);
  margin-bottom: 60px;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 0;
  width: 60%;
  height: 2px;
  background: linear-gradient(90deg, var(--gold), transparent);
}
```

- [ ] **Step 2: Verify in browser**

Run: `npx vite --host 0.0.0.0`
Expected: Dark background, gold section title styles visible

---

### Task 4: CSS — Hero section

**Files:**
- Modify: `src/css/style.css` (append hero styles)

- [ ] **Step 1: Append hero section CSS**

```css
/* === Hero === */
.section-hero {
  position: relative;
  overflow: hidden;
}

.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(10,10,15,0.4) 0%,
    rgba(10,10,15,0.7) 60%,
    var(--bg) 100%
  );
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.hero-name {
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 900;
  letter-spacing: 0.05em;
  color: #fff;
  text-shadow: 0 0 60px rgba(0,0,0,0.6);
}

.hero-role {
  margin-top: 16px;
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--gold);
  letter-spacing: 0.3em;
}

.hero-scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.hero-scroll-indicator span {
  display: block;
  width: 24px;
  height: 24px;
  border-right: 2px solid var(--gold);
  border-bottom: 2px solid var(--gold);
  transform: rotate(45deg);
  animation: scrollPulse 2s ease-in-out infinite;
}

@keyframes scrollPulse {
  0%, 100% { opacity: 0.3; transform: rotate(45deg) translate(0,0); }
  50% { opacity: 1; transform: rotate(45deg) translate(6px,6px); }
}
```

- [ ] **Step 2: Verify hero section renders with video placeholder and overlay**

Run: `npx vite --host 0.0.0.0`
Expected: Full-screen hero with dark overlay, name visible, scroll arrow pulsing at bottom

---

### Task 5: CSS — About section

**Files:**
- Modify: `src/css/style.css` (append about styles)

- [ ] **Step 1: Append about section CSS**

```css
/* === About === */
.section-about {
  background: var(--bg);
}

.about-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 60px;
  align-items: start;
}

.about-photo img {
  width: 100%;
  border-radius: 4px;
  border: 1px solid var(--gold-dim);
}

.about-item {
  margin-bottom: 32px;
}

.about-item h3 {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--gold);
  margin-bottom: 8px;
}

.about-item p,
.about-item li {
  font-size: 0.95rem;
  color: var(--text-dim);
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skills-list li {
  padding: 4px 14px;
  border: 1px solid var(--gold-dim);
  border-radius: 2px;
  font-size: 0.85rem;
  color: var(--text);
  letter-spacing: 0.05em;
}
```

- [ ] **Step 2: Verify about section layout**

Expected: Two-column grid, gold accents on labels, skill tags with gold border

---

### Task 6: CSS — Portfolio section + Modal

**Files:**
- Modify: `src/css/style.css` (append portfolio + modal styles)

- [ ] **Step 1: Append portfolio and modal CSS**

```css
/* === Portfolio === */
.section-portfolio {
  background: var(--bg-elevated);
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 32px;
}

.portfolio-card {
  cursor: pointer;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 4px;
  overflow: hidden;
  transition: border-color 0.3s, transform 0.3s;
  background: var(--bg);
}

.portfolio-card:hover {
  border-color: var(--gold);
  transform: translateY(-4px);
  box-shadow: 0 0 24px var(--gold-dim);
}

.portfolio-card img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.portfolio-card-body {
  padding: 20px;
}

.portfolio-card-body h3 {
  font-size: 1.1rem;
  margin-bottom: 6px;
}

.portfolio-card-body p {
  font-size: 0.85rem;
  color: var(--text-dim);
}

.portfolio-card-body .role-tag {
  display: inline-block;
  margin-top: 10px;
  font-size: 0.75rem;
  color: var(--gold);
  letter-spacing: 0.1em;
}

/* === Modal === */
.modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: none;
  align-items: center;
  justify-content: center;
}

.modal.active {
  display: flex;
}

.modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.9);
}

.modal-content {
  position: relative;
  width: 90%;
  max-width: 960px;
  z-index: 1;
}

.modal-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
  transition: color 0.3s;
}

.modal-close:hover { color: var(--gold); }

.modal-video-wrapper {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
}

.modal-video-wrapper iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.modal-info {
  margin-top: 20px;
}

.modal-title {
  font-size: 1.5rem;
  color: var(--gold);
}

.modal-desc {
  margin-top: 8px;
  color: var(--text-dim);
  font-size: 0.95rem;
}
```

- [ ] **Step 2: Verify portfolio grid layout and modal structure**

Expected: Grid of placeholder cards, clicking a card shows empty modal

---

### Task 7: CSS — Contact section

**Files:**
- Modify: `src/css/style.css` (append contact styles)

- [ ] **Step 1: Append contact section CSS**

```css
/* === Contact === */
.section-contact {
  background: var(--bg);
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 32px;
}

.contact-item {
  padding: 24px;
  border-left: 2px solid var(--gold-dim);
  transition: border-color 0.3s;
}

.contact-item:hover {
  border-left-color: var(--gold);
}

.contact-label {
  display: block;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--gold);
  margin-bottom: 8px;
}

.contact-value {
  font-size: 1rem;
  color: var(--text);
}

.contact-socials {
  display: flex;
  gap: 16px;
  padding: 24px;
  align-items: center;
}

.social-link {
  font-size: 0.9rem;
  padding: 6px 16px;
  border: 1px solid var(--gold-dim);
  border-radius: 2px;
  transition: border-color 0.3s, color 0.3s;
}

.social-link:hover {
  border-color: var(--gold);
  color: #fff;
}
```

---

### Task 8: CSS — Navigation dots

**Files:**
- Modify: `src/css/style.css` (append nav styles)

- [ ] **Step 1: Append navigation dots CSS**

```css
/* === Navigation Dots === */
.nav-dots {
  position: fixed;
  right: 28px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.nav-dots::before {
  content: '';
  position: absolute;
  top: -40px;
  bottom: -40px;
  width: 1px;
  background: var(--gold-dim);
}

.nav-dot {
  position: relative;
  z-index: 1;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid var(--gold-dim);
  background: transparent;
  cursor: pointer;
  transition: border-color 0.3s, background 0.3s, transform 0.3s;
}

.nav-dot:hover {
  border-color: var(--gold);
}

.nav-dot.active {
  border-color: var(--gold);
  background: var(--gold);
  transform: scale(1.4);
  box-shadow: 0 0 12px var(--gold-dim);
}
```

---

### Task 9: CSS — Responsive design

**Files:**
- Modify: `src/css/style.css` (append media queries)

- [ ] **Step 1: Append responsive media queries**

```css
/* === Responsive === */
@media (max-width: 768px) {
  .section-inner {
    padding: 60px 24px;
  }

  .about-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .about-photo {
    max-width: 200px;
    margin: 0 auto;
  }

  .portfolio-grid {
    grid-template-columns: 1fr;
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }

  .nav-dots {
    right: auto;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    flex-direction: row;
    justify-content: center;
    gap: 24px;
    padding: 16px 0;
    background: linear-gradient(0deg, var(--bg) 60%, transparent);
  }

  .nav-dots::before {
    top: 0;
    bottom: auto;
    left: 10%;
    right: 10%;
    width: auto;
    height: 1px;
  }

  .hero-name {
    font-size: clamp(2rem, 10vw, 3rem);
  }
}
```

---

### Task 10: JavaScript — Navigation scroll sync

**Files:**
- Modify: `src/js/main.js` (write navigation logic)

- [ ] **Step 1: Write navigation scroll sync and click handler**

```js
// === Navigation ===
const navDots = document.querySelectorAll('.nav-dot');
const sections = [...navDots].map(dot =>
  document.getElementById(dot.dataset.target)
);

// Click to scroll
navDots.forEach(dot => {
  dot.addEventListener('click', () => {
    const target = document.getElementById(dot.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Scroll to highlight
function updateActiveDot() {
  const scrollPos = window.scrollY + window.innerHeight / 2;

  let activeIndex = 0;
  sections.forEach((section, i) => {
    if (section && scrollPos >= section.offsetTop) {
      activeIndex = i;
    }
  });

  navDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === activeIndex);
  });
}

window.addEventListener('scroll', updateActiveDot, { passive: true });
updateActiveDot();
```

- [ ] **Step 2: Verify navigation works**

Run: `npx vite --host 0.0.0.0`
Expected: Clicking dots scrolls to sections, scrolling highlights active dot

---

### Task 11: JavaScript — Portfolio card data and modal

**Files:**
- Modify: `src/js/main.js` (append portfolio + modal logic)

- [ ] **Step 1: Append portfolio data, card rendering, and modal logic**

```js
// === Portfolio ===
const portfolioData = [
  {
    title: '作品标题 1',
    desc: '短片 / 2024 · 担任导演、编剧',
    role: '导演 · 编剧',
    cover: '/src/assets/images/work-1.jpg',
    embedUrl: 'https://player.bilibili.com/player.html?bvid=XXXXX',
  },
  {
    title: '作品标题 2',
    desc: '微电影 / 2024 · 担任导演、剪辑',
    role: '导演 · 剪辑',
    cover: '/src/assets/images/work-2.jpg',
    embedUrl: 'https://player.bilibili.com/player.html?bvid=XXXXX',
  },
  {
    title: '作品标题 3',
    desc: 'MV / 2023 · 担任导演',
    role: '导演',
    cover: '/src/assets/images/work-3.jpg',
    embedUrl: 'https://player.bilibili.com/player.html?bvid=XXXXX',
  },
  {
    title: '作品标题 4',
    desc: '短片 / 2023 · 担任编剧、剪辑',
    role: '编剧 · 剪辑',
    cover: '/src/assets/images/work-4.jpg',
    embedUrl: 'https://player.bilibili.com/player.html?bvid=XXXXX',
  },
];

const grid = document.getElementById('portfolioGrid');

portfolioData.forEach(work => {
  const card = document.createElement('div');
  card.className = 'portfolio-card';
  card.innerHTML = `
    <img src="${work.cover}" alt="${work.title}">
    <div class="portfolio-card-body">
      <h3>${work.title}</h3>
      <p>${work.desc}</p>
      <span class="role-tag">${work.role}</span>
    </div>
  `;
  card.addEventListener('click', () => openModal(work));
  grid.appendChild(card);
});

// === Modal ===
const modal = document.getElementById('videoModal');
const modalVideoWrapper = document.getElementById('modalVideoWrapper');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');

function openModal(work) {
  modalTitle.textContent = work.title;
  modalDesc.textContent = work.desc;
  modalVideoWrapper.innerHTML = `<iframe src="${work.embedUrl}" allowfullscreen></iframe>`;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  modalVideoWrapper.innerHTML = '';
  document.body.style.overflow = '';
}

document.querySelector('.modal-close').addEventListener('click', closeModal);
document.querySelector('.modal-backdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
```

- [ ] **Step 2: Verify portfolio cards render and modal opens/closes**

Expected: Cards display in grid, clicking opens modal with iframe, clicking close/backdrop/Escape closes modal

---

### Task 12: JavaScript — GSAP ScrollTrigger animations

**Files:**
- Modify: `src/js/main.js` (append GSAP animations)

- [ ] **Step 1: Append GSAP ScrollTrigger animations**

```js
// === GSAP Animations ===
gsap.registerPlugin(ScrollTrigger);

// Section title entrance
document.querySelectorAll('.section-title').forEach(title => {
  gsap.fromTo(title,
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, duration: 0.8,
      scrollTrigger: {
        trigger: title,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    }
  );
});

// About grid entrance
gsap.fromTo('.about-photo',
  { opacity: 0, x: -40 },
  {
    opacity: 1, x: 0, duration: 0.8,
    scrollTrigger: {
      trigger: '.about-grid',
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  }
);

gsap.fromTo('.about-info',
  { opacity: 0, x: 40 },
  {
    opacity: 1, x: 0, duration: 0.8,
    scrollTrigger: {
      trigger: '.about-grid',
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  }
);

// Portfolio cards stagger entrance
gsap.fromTo('.portfolio-card',
  { opacity: 0, y: 30 },
  {
    opacity: 1, y: 0, duration: 0.6, stagger: 0.12,
    scrollTrigger: {
      trigger: '.portfolio-grid',
      start: 'top 85%',
      toggleActions: 'play none none none',
    }
  }
);

// Contact items stagger entrance
gsap.fromTo('.contact-item',
  { opacity: 0, y: 20 },
  {
    opacity: 1, y: 0, duration: 0.5, stagger: 0.1,
    scrollTrigger: {
      trigger: '.contact-grid',
      start: 'top 90%',
      toggleActions: 'play none none none',
    }
  }
);

// Hero parallax scroll effect
gsap.to('.hero-content', {
  y: 100,
  opacity: 0,
  scrollTrigger: {
    trigger: '.section-hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  }
});
```

- [ ] **Step 2: Verify animations trigger on scroll**

Run: `npx vite --host 0.0.0.0`
Expected: Sections fade/slide in as they scroll into view, hero content parallaxes upward

---

### Task 13: Final verification and build

**Files:**
- Modify: `index.html` (update title, replace placeholder text with actual content)

- [ ] **Step 1: Update `<title>` and placeholder content**

Set `<title>` to your actual name, replace all Chinese placeholder text (`<!-- ... -->`) with real content.

- [ ] **Step 2: Replace portfolio data with actual works**

Update `portfolioData` array in `src/js/main.js` with real video embed URLs and cover images.

- [ ] **Step 3: Add profile photo and cover images**

Place actual images into `src/assets/images/`.

- [ ] **Step 4: Production build**

Run: `npx vite build`
Expected: `dist/` folder with optimized static files, no errors.

- [ ] **Step 5: Preview production build**

Run: `npx vite preview`
Expected: Site loads correctly from built files.
