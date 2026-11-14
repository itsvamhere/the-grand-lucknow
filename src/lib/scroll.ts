'use client';

import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenisInstance: Lenis | null = null;
let tickerFn: ((time: number) => void) | null = null;
let initialized = false;
const scrollSubscribers = new Set<() => void>();

function notifyScrollSubscribers() {
  scrollSubscribers.forEach((cb) => {
    try {
      cb();
    } catch {
      // Ignore individual subscriber errors so other listeners continue firing
    }
  });
}

export function initScroll(): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  if (initialized) {
    return () => {};
  }

  initialized = true;
  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onNativeScroll = () => {
    ScrollTrigger.update();
    notifyScrollSubscribers();
  };

  window.addEventListener('scroll', onNativeScroll, { passive: true });

  if (!prefersReducedMotion) {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    lenisInstance = lenis;

    lenis.on('scroll', () => {
      ScrollTrigger.update();
      notifyScrollSubscribers();
    });

    tickerFn = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);
  }

  return () => {
    window.removeEventListener('scroll', onNativeScroll);
    destroyScroll();
  };
}

export function destroyScroll(): void {
  if (tickerFn) {
    gsap.ticker.remove(tickerFn);
    tickerFn = null;
  }
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
  initialized = false;
}

export function stopScroll(): void {
  if (lenisInstance) {
    lenisInstance.stop();
  }
}

export function startScroll(): void {
  if (lenisInstance) {
    lenisInstance.start();
  }
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function subscribeScroll(cb: () => void): () => void {
  scrollSubscribers.add(cb);
  return () => {
    scrollSubscribers.delete(cb);
  };
}
