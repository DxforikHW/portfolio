import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

// === Portfolio ===
const portfolioData = [
  {
    title: '作品标题 1',
    desc: '短片 / 2026 · 担任导演、编剧',
    role: '导演 · 编剧',
    cover: '/src/assets/images/work-1.jpg',
    embedUrl: 'https://www.xinpianchang.com/a13668759?from=webShare&channel=copyLink',
  },
  {
    title: '作品标题 2',
    desc: '微电影 / 2026 · 担任导演、剪辑',
    role: '导演 · 剪辑',
    cover: '/src/assets/images/work-2.jpg',
    embedUrl: 'https://www.xinpianchang.com/a13668759?from=webShare&channel=copyLink',
  },
  {
    title: '作品标题 3',
    desc: 'MV / 2026 · 担任导演',
    role: '导演',
    cover: '/src/assets/images/work-3.jpg',
    embedUrl: 'https://www.xinpianchang.com/a13668759?from=webShare&channel=copyLink',
  },
  {
    title: '作品标题 4',
    desc: '短片 / 2026 · 担任编剧、剪辑',
    role: '编剧 · 剪辑',
    cover: '/src/assets/images/work-4.jpg',
    embedUrl: 'https://www.xinpianchang.com/a13668759?from=webShare&channel=copyLink',
  },
  {
    title: '作品标题 5',
    desc: '短片 / 2026 · 担任导演',
    role: '导演',
    cover: '/src/assets/images/work-5.jpg',
    embedUrl: 'https://www.xinpianchang.com/a13668759?from=webShare&channel=copyLink',
  },
  {
    title: '作品标题 6',
    desc: '广告 / 2026 · 担任导演、剪辑',
    role: '导演 · 剪辑',
    cover: '/src/assets/images/work-6.jpg',
    embedUrl: 'https://www.xinpianchang.com/a13668759?from=webShare&channel=copyLink',
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
