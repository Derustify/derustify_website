/**
 * Derustify Marketing Site - Main JavaScript
 * Comparison sliders, FAQ accordion, scroll animations
 */

// ===== Internationalization (i18n) =====
class I18n {
  constructor() {
    this.locale = localStorage.getItem('derustify-locale') || this.detectLocale();
    this.translations = {};
    this.flags = {
      en: 'assets/flags/us.svg',
      de: 'assets/flags/de.svg',
      es: 'assets/flags/es.svg',
      fr: 'assets/flags/fr.svg',
      ja: 'assets/flags/jp.svg',
      nb: 'assets/flags/no.svg',
      pt: 'assets/flags/br.svg',
      zh: 'assets/flags/cn.svg'
    };
  }

  detectLocale() {
    const navLang = navigator.language.split('-')[0];
    const supported = ['en', 'de', 'es', 'fr', 'ja', 'nb', 'pt', 'zh'];
    return supported.includes(navLang) ? navLang : 'en';
  }

  async setLocale(locale) {
    if (this.locale === locale && Object.keys(this.translations).length > 0) return;
    this.locale = locale;
    localStorage.setItem('derustify-locale', locale);
    await this.load();
    this.updateSelectorUI();
  }

  async load() {
    console.log(`🌐 i18n: Attempting to load ${this.locale}.json...`);
    try {
      const response = await fetch(`locales/${this.locale}.json?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      this.translations = await response.json();
      console.log('✅ i18n: Translations loaded successfully:', this.translations);
      
      this.apply();
      document.body.classList.add('i18n-ready');
    } catch (error) {
      console.error('❌ i18n: Failed to load translations:', error);
      console.warn('💡 Tip: If you are seeing a CORS error, you must use a local server (like Live Server) rather than opening the file directly.');
    }
  }

  apply() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = this.getNestedValue(this.translations, key);
      if (text) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = text;
        } else {
          el.innerHTML = text; // Supports <br> in JSON
        }
      }
    });

    // Handle attributes like alt and title
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      const key = el.getAttribute('data-i18n-alt');
      const text = this.getNestedValue(this.translations, key);
      if (text) el.alt = text;
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const text = this.getNestedValue(this.translations, key);
      if (text) el.title = text;
    });

    // Handle SEO Meta Tags
    const metaTitle = this.getNestedValue(this.translations, 'meta.title');
    if (metaTitle) document.title = metaTitle;

    const metaDesc = this.getNestedValue(this.translations, 'meta.description');
    if (metaDesc) {
      const descTag = document.querySelector('meta[name="description"]');
      if (descTag) descTag.setAttribute('content', metaDesc);
    }
  }

  updateSelectorUI() {
    const triggerFlag = document.getElementById('current-flag');
    if (triggerFlag && this.flags[this.locale]) {
      triggerFlag.src = this.flags[this.locale];
    }

    document.querySelectorAll('.lang-option').forEach(btn => {
      const isSelected = btn.getAttribute('data-lang') === this.locale;
      btn.classList.toggle('selected', isSelected);
    });
  }

  getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }
}

// Global instance
const i18n = new I18n();

// ===== Comparison Slider =====
class ComparisonSlider {
  constructor(element) {
    this.container = element;
    this.handle = element.querySelector('.comparison-handle');
    this.beforeImg = element.querySelector('.comparison-img-before');
    this.beforeLabel = element.querySelector('.comparison-label-before');
    this.afterLabel = element.querySelector('.comparison-label-after');
    
    this.position = 50;
    this.isDragging = false;
    
    this.init();
  }
  
  init() {
    // Set initial position
    this.updatePosition(50);
    
    // Mouse events
    this.container.addEventListener('mousedown', (e) => this.startDrag(e));
    document.addEventListener('mousemove', (e) => this.onDrag(e));
    document.addEventListener('mouseup', () => this.endDrag());
    
    // Touch events
    this.container.addEventListener('touchstart', (e) => this.startDrag(e), { passive: true });
    document.addEventListener('touchmove', (e) => this.onDrag(e), { passive: true });
    document.addEventListener('touchend', () => this.endDrag());
    
    // Keyboard support
    this.container.setAttribute('tabindex', '0');
    this.container.setAttribute('role', 'slider');
    this.container.setAttribute('aria-valuenow', '50');
    this.container.setAttribute('aria-valuemin', '0');
    this.container.setAttribute('aria-valuemax', '100');
    this.container.setAttribute('aria-label', 'Before and after comparison');
    
    this.container.addEventListener('keydown', (e) => this.onKeydown(e));
  }
  
  startDrag(e) {
    this.isDragging = true;
    this.container.style.cursor = 'grabbing';
    this.onDrag(e);
  }
  
  endDrag() {
    this.isDragging = false;
    this.container.style.cursor = 'ew-resize';
  }
  
  onDrag(e) {
    if (!this.isDragging) return;
    
    e.preventDefault?.();
    
    const rect = this.container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    this.updatePosition(percentage);
  }
  
  onKeydown(e) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      this.updatePosition(Math.max(0, this.position - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      this.updatePosition(Math.min(100, this.position + 5));
    }
  }
  
  updatePosition(percentage) {
    this.position = percentage;
    
    // Update CSS custom properties
    this.container.style.setProperty('--slider-pos', `${percentage}%`);
    this.container.style.setProperty('--clip-pos', `${100 - percentage}%`);
    
    // Update ARIA
    this.container.setAttribute('aria-valuenow', Math.round(percentage));
    
    // Update label visibility
    if (this.beforeLabel) {
      this.beforeLabel.classList.toggle('hidden', percentage <= 10);
    }
    if (this.afterLabel) {
      this.afterLabel.classList.toggle('hidden', percentage >= 90);
    }
  }
}

// ===== FAQ Accordion =====
class FAQAccordion {
  constructor(container) {
    this.container = container;
    this.items = container.querySelectorAll('.faq-item');
    
    this.init();
  }
  
  init() {
    this.items.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        
        // Close all items
        this.items.forEach(i => i.classList.remove('open'));
        
        // Open clicked item if it wasn't already open
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    });
  }
}

// ===== Scroll Animations =====
class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll('.fade-in');
    
    if ('IntersectionObserver' in window) {
      this.init();
    } else {
      // Fallback: show all elements
      this.elements.forEach(el => el.classList.add('visible'));
    }
  }
  
  init() {
    const options = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, options);
    
    this.elements.forEach(el => observer.observe(el));
  }
}

// ===== Mobile Navigation =====
class MobileNav {
  constructor() {
    this.btn = document.querySelector('.mobile-menu-btn');
    this.nav = document.querySelector('.nav-links');
    this.cta = document.querySelector('.nav-cta');
    this.isOpen = false;
    
    if (this.btn) {
      this.init();
    }
  }
  
  init() {
    this.btn.addEventListener('click', () => this.toggle());
    
    // Close on link click
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => this.close());
    });
  }
  
  toggle() {
    this.isOpen = !this.isOpen;
    
    if (this.isOpen) {
      this.nav.style.display = 'flex';
      this.nav.style.flexDirection = 'column';
      this.nav.style.position = 'absolute';
      this.nav.style.top = '100%';
      this.nav.style.left = '0';
      this.nav.style.right = '0';
      this.nav.style.background = 'var(--bg-elevated)';
      this.nav.style.padding = '1rem';
      this.nav.style.borderRadius = '0 0 var(--radius-lg) var(--radius-lg)';
      this.nav.style.boxShadow = 'var(--shadow-lg)';
      
      if (this.cta) {
        this.cta.style.display = 'flex';
        this.cta.style.marginTop = '1rem';
      }
    } else {
      this.close();
    }
  }
  
  close() {
    this.isOpen = false;
    this.nav.style = '';
    if (this.cta) {
      this.cta.style = '';
    }
  }
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      e.preventDefault();
      
      const target = document.querySelector(href);
      if (target) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===== Header Scroll Effect =====
function initHeaderScroll() {
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ===== Language Selector Toggle =====
function initLanguageSelector() {
  const selector = document.getElementById('language-selector');
  const trigger = document.getElementById('lang-trigger');
  const dropdown = document.getElementById('lang-dropdown');
  const options = document.querySelectorAll('.lang-option');

  if (!selector || !trigger || !dropdown) return;

  const toggle = (force) => {
    const isNowOpen = force !== undefined ? force : trigger.getAttribute('aria-expanded') !== 'true';
    trigger.setAttribute('aria-expanded', isNowOpen);
    dropdown.classList.toggle('active', isNowOpen);
  };

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggle();
  });

  options.forEach(opt => {
    opt.addEventListener('click', async () => {
      const lang = opt.getAttribute('data-lang');
      await i18n.setLocale(lang);
      toggle(false);
    });
  });

  // Close on click outside
  document.addEventListener('click', (e) => {
    if (!selector.contains(e.target)) {
      toggle(false);
    }
  });

  // Initial UI sync
  i18n.updateSelectorUI();
}

// ===== Hero Showcase (Carousel) =====
class HeroShowcase {
  constructor(container) {
    this.container = container;
    this.slides = container.querySelectorAll('.hero-slide');
    this.dots = container.querySelectorAll('.showcase-dot');
    this.currentIndex = 0;
    this.interval = null;
    this.sliders = [];
    
    this.init();
  }
  
  init() {
    // Initialize sliders within hero slides
    this.slides.forEach((slide, index) => {
      const sliderEl = slide.querySelector('.comparison-slider');
      if (sliderEl) {
        this.sliders[index] = new ComparisonSlider(sliderEl);
      }
    });
    
    // Dot navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.goTo(index);
        this.startAutoCycle(); // Reset timer
      });
    });
    
    this.startAutoCycle();
  }
  
  goTo(index) {
    if (index === this.currentIndex) return;
    
    // Update classes
    this.slides[this.currentIndex].classList.remove('active');
    this.dots[this.currentIndex].classList.remove('active');
    
    this.currentIndex = index;
    
    this.slides[this.currentIndex].classList.add('active');
    this.dots[this.currentIndex].classList.add('active');
    
    // Premium touch: Reset slider position to 50% on new slide
    if (this.sliders[this.currentIndex]) {
      this.sliders[this.currentIndex].updatePosition(50);
    }
  }
  
  next() {
    const nextIndex = (this.currentIndex + 1) % this.slides.length;
    this.goTo(nextIndex);
  }
  
  startAutoCycle() {
    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(() => this.next(), 6000); // 6 seconds
  }
}

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', async () => {
  // Load translations first
  await i18n.load();

  // Initialize comparison sliders (standard ones)
  document.querySelectorAll('.comparison-slider:not([data-hero-slider])').forEach(slider => {
    new ComparisonSlider(slider);
  });
  
  // Initialize hero showcase
  const heroShowcase = document.getElementById('hero-showcase');
  if (heroShowcase) {
    new HeroShowcase(heroShowcase);
  }
  
  // Initialize FAQ accordion
  const faqList = document.querySelector('.faq-list');
  if (faqList) {
    new FAQAccordion(faqList);
  }
  
  // Initialize scroll animations
  new ScrollAnimations();
  
  // Initialize mobile nav
  new MobileNav();
  
  // Initialize smooth scroll
  initSmoothScroll();
  
  // Initialize header scroll effect
  initHeaderScroll();

  // Initialize language selector
  initLanguageSelector();
});
