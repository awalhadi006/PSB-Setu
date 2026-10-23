// src/scripts/gsap-animations.ts
// All GSAP/ScrollTrigger animation logic for PSB Landing Page

import type { GSAP, ScrollTrigger } from 'gsap';
import type { SplitText } from 'gsap/SplitText';
import type { TextPlugin } from 'gsap/TextPlugin';

interface AnimationContext {
  gsap: GSAP;
  ScrollTrigger: typeof ScrollTrigger;
  SplitText: typeof SplitText;
  TextPlugin: typeof TextPlugin;
}

export function initAnimations(gsap: GSAP, ScrollTrigger: typeof ScrollTrigger, SplitText: typeof SplitText, TextPlugin: typeof TextPlugin): void {
  // Register plugins (already done in main.ts but safe to repeat)
  gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin);

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    // Skip all animations, show final state immediately
    document.documentElement.classList.add('reduce-motion');
    return;
  }

  // ==========================================
  // HERO ANIMATIONS
  // ==========================================
  const heroTitle = document.querySelector('#beranda h1#hero-title');
  const heroButton = document.querySelector('#beranda .btn-secondary-stacked');

  if (heroTitle) {
    // SplitText: lines on mobile, words on desktop
    gsap.matchMedia().add(
      {
        mobile: '(max-width: 767px)',
        desktop: '(min-width: 768px)',
      },
      (context) => {
        let split: ReturnType<typeof SplitText>;

        if (context.conditions.mobile) {
          split = new SplitText(heroTitle, { type: 'lines', linesClass: 'hero-title-line' });
          gsap.from(split.lines, {
            y: '100%',
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.15,
          });
        } else {
          split = new SplitText(heroTitle, { type: 'words,chars', wordsClass: 'hero-title-word', charsClass: 'hero-title-char' });
          gsap.from(split.words, {
            y: '100%',
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.05,
          });
        }

        // Staggered button reveal
        if (heroButton) {
          gsap.from(heroButton, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: context.conditions.mobile ? 0.6 : 0.4,
          });
        }

        // Store for cleanup
        context.add(() => {
          split?.revert();
        });
      }
    );
  }

  // ==========================================
  // SCROLL-REVEAL FOR SECTIONS
  // ==========================================
  const sections = document.querySelectorAll('section.section:not(#beranda)');
  
  gsap.matchMedia().add(
    {
      mobile: '(max-width: 767px)',
      desktop: '(min-width: 768px)',
    },
    (context) => {
      sections.forEach((section) => {
        const content = section.querySelector('.container > *:not(h2)') || section.querySelector('.container');
        if (!content) return;

        if (context.conditions.mobile) {
          gsap.from(content, {
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              once: true,
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
          });
        } else {
          gsap.from(content, {
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
          });
        }
      });
    }
  );

  // ==========================================
  // TIMELINE DRAWING (stroke-dashoffset)
  // ==========================================
  const timelinePaths = document.querySelectorAll('#jadwal .jadwal-timeline-line, #cara-mendaftar .timeline-path');
  timelinePaths.forEach((path) => {
    gsap.to(path, {
      scrollTrigger: {
        trigger: path.closest('section.section'),
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
      strokeDashoffset: 0,
      duration: 1.5,
      ease: 'power2.out',
    });
  });

  // ==========================================
  // SECTION TITLE ORNAMENT (::before scaleX via .animate-in class)
  // ==========================================
  const sectionTitles = document.querySelectorAll('section.section h2.section-title');
  sectionTitles.forEach((title) => {
    ScrollTrigger.create({
      trigger: title,
      start: 'top 85%',
      once: true,
      onEnter: () => title.classList.add('animate-in'),
    });
  });

  // ==========================================
  // CARD HOVER/TAP LIFT
  // ==========================================
  const cards = document.querySelectorAll('.card-elevated, .card-elevated-lg, .card-primary, .card-surface-low, .card-surface-lowest, .card-surface-container, .syarat-item, .almamater-item, .narahubung-card, .biaya-content, .visicard, .misi-card, .stat-metric, .galeri-card');
  cards.forEach((card) => {
    let hoverTween: GSAPTimeline | null = null;
    
    card.addEventListener('mouseenter', () => {
      hoverTween = gsap.to(card, {
        y: -4,
        boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
        duration: 0.3,
        ease: 'power2.out',
      });
    });
    
    card.addEventListener('mouseleave', () => {
      hoverTween?.kill();
      gsap.to(card, {
        y: 0,
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        duration: 0.3,
        ease: 'power2.out',
      });
    });
    
    // Touch support
    card.addEventListener('touchstart', () => {
      gsap.to(card, { y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.12)', duration: 0.2 });
    }, { passive: true });
    
    card.addEventListener('touchend', () => {
      gsap.to(card, { y: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', duration: 0.3 });
    }, { passive: true });
  });

  // ==========================================
  // NAVBAR SCROLL EFFECT (header)
  // ==========================================
  const navbar = document.querySelector('header');
  if (navbar) {
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top -50',
      end: 'bottom bottom',
      onToggle: (self) => {
        navbar.classList.toggle('scrolled', self.isActive);
      },
    });
  }

  // ==========================================
  // WA FAB PULSE
  // ==========================================
  const waFab = document.querySelector('.btn-wa-fab');
  if (waFab) {
    gsap.to(waFab, {
      scale: 1.05,
      duration: 1.5,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    });
  }

  // ==========================================
  // SCROLLTRIGGER REFRESH ON LOAD
  // ==========================================
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });

  // Also refresh on font load (for SplitText accuracy)
  if (document.fonts) {
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  }
}