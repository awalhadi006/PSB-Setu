// src/scripts/main.ts
// Single JS entry point with .js-ready pattern and dynamic imports

// 1. Progressive enhancement: mark HTML as JS-ready immediately on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js-ready');
});

// 2. Dynamic imports after DOM ready — keeps initial bundle small
async function initAnimations(): Promise<void> {
  // Import GSAP core + plugins
  const [{ gsap }, { ScrollTrigger }, { SplitText }, { TextPlugin }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
    import('gsap/SplitText'),
    import('gsap/TextPlugin'),
  ]);

  // Register plugins
  gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin);

  // Import and initialize GSAP animations
  const { initAnimations: initGsapAnimations } = await import('./gsap-animations.ts');
  initGsapAnimations(gsap, ScrollTrigger, SplitText, TextPlugin);
}

// 3. Tab switcher for Rincian Biaya
function switchBiayaTab(tabName: string): void {
  const tabs = ['umum', 'dhuafa', 'yatim'];
  tabs.forEach((t) => {
    const btn = document.getElementById('tab-btn-' + t);
    const content = document.getElementById('content-' + t);
    if (t === tabName) {
      btn?.classList.add('active');
      btn?.classList.remove('inactive');
      btn?.setAttribute('aria-selected', 'true');
      content?.classList.remove('hidden');
    } else {
      btn?.classList.remove('active');
      btn?.classList.add('inactive');
      btn?.setAttribute('aria-selected', 'false');
      content?.classList.add('hidden');
    }
  });
  // Trigger counter animation for the newly shown panel
  animateBiayaTotal(tabName);
}

// 4. Biaya total counter: smooth count-up
function animateBiayaTotal(tabName: string): void {
  const panel = document.getElementById('content-' + tabName);
  if (!panel) return;
  const totalEl = panel.querySelector('.biaya-total-value');
  if (!totalEl) return;

  // Get target from data attribute (set once on first run)
  let target = parseInt(totalEl.dataset.target || '0', 10);
  if (!target) {
    const text = totalEl.textContent || '';
    target = parseInt(text.replace(/\D/g, ''), 10);
    totalEl.dataset.target = String(target);
  }
  if (!target) return;

  const duration = 1200;
  const startTime = performance.now();
  const frame = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const displayValue = Math.round(target * eased);
    totalEl.textContent = 'Rp ' + displayValue.toLocaleString('id-ID');
    if (progress < 1) {
      requestAnimationFrame(frame);
    }
  };
  requestAnimationFrame(frame);
}

// 5. Accordion toggle for FAQ
function toggleFaq(button: HTMLButtonElement): void {
  const content = button.nextElementSibling as HTMLElement;
  const icon = button.querySelector('.material-symbols') as HTMLElement;
  const isExpanded = button.getAttribute('aria-expanded') === 'true';

  if (isExpanded) {
    content?.classList.add('hidden');
    button.setAttribute('aria-expanded', 'false');
    icon.style.transform = 'rotate(0deg)';
  } else {
    content?.classList.remove('hidden');
    button.setAttribute('aria-expanded', 'true');
    icon.style.transform = 'rotate(180deg)';
  }
}

// 6. Header auto-hide: hide at top, show on scroll down
const header = document.querySelector('header');
if (header) {
  let lastScrollY = 0;
  const threshold = 4;
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY <= threshold) {
      header.classList.add('hidden');
      header.classList.remove('scrolled');
    } else {
      header.classList.remove('hidden');
      header.classList.add('scrolled');

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        header.classList.add('-translate-y-full');
      } else {
        header.classList.remove('-translate-y-full');
      }
    }
    lastScrollY = currentScrollY;
  });
}

// 7. Kick off initialization
async function main(): Promise<void> {
  await initAnimations();

  // 8. Refresh ScrollTrigger after all images/fonts have loaded
  window.addEventListener('load', async () => {
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    ScrollTrigger.refresh();
  });
}

// Expose functions to global scope for inline onclick handlers
(window as any).switchBiayaTab = switchBiayaTab;
(window as any).toggleFaq = toggleFaq;

main().catch((err) => {
  console.error('[main.ts] Initialization failed:', err);
});