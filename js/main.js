// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function () {
  lucide.createIcons();
  initScrollAnimations();
  initNavbar();
  initMobileMenu();
  initAboutSlider();
});

/**
 * Scroll Reveal Animations
 */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  revealElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Navbar Scroll Effect
 */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        closeMobileMenu();

        const navHeight = navbar.offsetHeight;
        const targetPosition = targetElement.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Mobile Navigation
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const overlay = document.getElementById('mobileOverlay');
  const closeBtn = document.getElementById('mobileNavClose');

  if (!menuBtn || !mobileNav) return;

  menuBtn.addEventListener('click', () => {
    mobileNav.classList.add('active');
    overlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  const closeMobile = () => {
    mobileNav.classList.remove('active');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeMobile);
  overlay?.addEventListener('click', closeMobile);

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobile);
  });
}

function closeMobileMenu() {
  const mobileNav = document.getElementById('mobileNav');
  const overlay = document.getElementById('mobileOverlay');

  mobileNav?.classList.remove('active');
  overlay?.classList.remove('active');
  document.body.style.overflow = '';
}

/**
 * About Section Auto-Sliding Carousel
 */
let aboutSlideIndex = 0;
let aboutSliderInterval;

function initAboutSlider() {
  const slider = document.getElementById('aboutSlider');
  if (!slider) return;

  const slides = slider.querySelectorAll('.about-slide');
  if (slides.length === 0) return;

  startAboutSlider();

  slider.addEventListener('mouseenter', () => {
    clearInterval(aboutSliderInterval);
  });

  slider.addEventListener('mouseleave', () => {
    startAboutSlider();
  });
}

function startAboutSlider() {
  aboutSliderInterval = setInterval(() => {
    const slides = document.querySelectorAll('.about-slide');
    aboutSlideIndex = (aboutSlideIndex + 1) % slides.length;
    updateAboutSlider();
  }, 4000);
}

function goToSlide(index) {
  aboutSlideIndex = index;
  updateAboutSlider();
  clearInterval(aboutSliderInterval);
  startAboutSlider();
}

function updateAboutSlider() {
  const slides = document.querySelectorAll('.about-slide');
  const dots = document.querySelectorAll('.about-slider-dots .dot');

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === aboutSlideIndex);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === aboutSlideIndex);
  });
}

/**
 * Lightbox Functions
 */
function openLightbox(imageSrc, title, description) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const titleEl = document.getElementById('lightbox-title');
  const descEl = document.getElementById('lightbox-desc');

  if (!lightbox) return;

  // Handle fallback images
  img.src = imageSrc;
  img.onerror = function () {
    const placeholders = {
      'service': 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800',
      'cuci': 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800',
      'pasang': 'https://images.unsplash.com/photo-1631545806609-35d4ae440431?w=800',
      'freon': 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800',
      'bongkar': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'
    };

    let placeholder = 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800';
    for (const [key, url] of Object.entries(placeholders)) {
      if (imageSrc.toLowerCase().includes(key)) {
        placeholder = url;
        break;
      }
    }
    this.src = placeholder;
  };

  titleEl.textContent = title || '';
  descEl.textContent = description || '';

  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
  lucide.createIcons();
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Keyboard events
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeMobileMenu();
  }
});

// Close lightbox on background click
document.getElementById('lightbox')?.addEventListener('click', (e) => {
  if (e.target.id === 'lightbox') {
    closeLightbox();
  }
});
