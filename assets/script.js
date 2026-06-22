// ===================================
// Dark Mode Toggle
// ===================================
const initDarkMode = () => {
  const darkBtn = document.getElementById('darkBtn');
  const themeIcon = document.getElementById('themeIcon');
  
  // Check saved preference
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
    document.body.classList.add('dark');
    if (themeIcon) themeIcon.textContent = '☀️';
  }

  // Toggle dark mode
  if (darkBtn) {
    darkBtn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark');
      if (themeIcon) {
        themeIcon.textContent = isDark ? '☀️' : '🌙';
      }
      localStorage.setItem('darkMode', isDark);
    });
  }
};

// ===================================
// Mobile Menu Toggle
// ===================================
const initMobileMenu = () => {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (!hamburgerBtn || !navMenu) return;

  hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navMenu.classList.toggle('open');
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      navMenu.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Close menu when clicking on a link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navMenu.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
  });
};

// ===================================
// Navbar Scroll Effect
// ===================================
const initNavbarScroll = () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  let lastScrollTop = 0;
  const scrollThreshold = 50;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop === 0) {
      navbar.classList.remove('hidden', 'transparent');
    } else if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
      // Scrolling down
      navbar.classList.add('hidden');
    } else {
      // Scrolling up
      navbar.classList.remove('hidden');
      navbar.classList.add('transparent');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }, { passive: true });
};

// ===================================
// Smooth Scroll for Anchor Links
// ===================================
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const targetPosition = targetElement.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
};

// ===================================
// Intersection Observer for Animations
// ===================================
const initScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements with animation class
  document.querySelectorAll('.service-card, .testimonial, .about__content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
};

// ===================================
// Lazy Loading Images
// ===================================
const initLazyLoading = () => {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
};

// ===================================
// WhatsApp Button Pulse Animation
// ===================================
const initWhatsAppPulse = () => {
  const whatsappButtons = document.querySelectorAll('.btn--whatsapp');
  
  whatsappButtons.forEach(btn => {
    setInterval(() => {
      btn.style.animation = 'pulse 0.6s ease';
      setTimeout(() => {
        btn.style.animation = '';
      }, 600);
    }, 5000);
  });
};

// ===================================
// Add Pulse Animation Keyframes
// ===================================
const addPulseAnimation = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
  `;
  document.head.appendChild(style);
};

// ===================================
// Initialize All Features
// ===================================
const init = () => {
  initDarkMode();
  initMobileMenu();
  initNavbarScroll();
  initSmoothScroll();
  initScrollAnimations();
  initLazyLoading();
  initWhatsAppPulse();
  addPulseAnimation();
};

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}