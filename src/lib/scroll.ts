/**
 * Global SSR-safe Lenis-compatible scroll controller.
 * Exposes initScroll(), stopScroll(), startScroll().
 */

declare global {
  interface Window {
    lenis?: {
      start: () => void;
      stop: () => void;
      destroy?: () => void;
      scrollTo?: (target: number | string | HTMLElement, options?: any) => void;
    };
  }
}

let isScrollLocked = false;
let savedScrollY = 0;

export function stopScroll(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (isScrollLocked) return;
  isScrollLocked = true;
  savedScrollY = window.scrollY;

  document.body.style.overflow = 'hidden';
  document.documentElement.classList.add('grand-scroll-locked');

  if (window.lenis && typeof window.lenis.stop === 'function') {
    window.lenis.stop();
  }
}

export function startScroll(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (!isScrollLocked) return;
  isScrollLocked = false;

  document.body.style.overflow = '';
  document.documentElement.classList.remove('grand-scroll-locked');

  if (window.lenis && typeof window.lenis.start === 'function') {
    window.lenis.start();
  }
}

export function initScroll(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.documentElement.style.scrollBehavior = 'auto';
    return;
  }

  // Smooth scroll sync with Framer SSR ticker if Lenis exists on window
  if (window.lenis && typeof window.lenis.start === 'function') {
    window.lenis.start();
  }
}

export default {
  initScroll,
  stopScroll,
  startScroll,
};
