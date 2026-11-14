'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { usePathname } from 'next/navigation';
import { initScroll, startScroll, stopScroll, subscribeScroll } from './scroll';

export type HeaderTheme = 'dark' | 'light';

interface UIStateContextValue {
  headerTheme: HeaderTheme;
  isMenuOpen: boolean;
  frozenMenuTheme: HeaderTheme;
  isStickyCtaVisible: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  setStickyCtaVisible: (visible: boolean) => void;
  menuTriggerRef: React.RefObject<HTMLButtonElement | null>;
}

const UIStateContext = createContext<UIStateContextValue | null>(null);

function parseRgbLuminance(bgString: string): number | null {
  const match = bgString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!match) return null;
  const alpha = match[4] !== undefined ? Number(match[4]) : 1;
  if (alpha < 0.1) return null;
  const toLinear = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(Number(match[1])) + 0.7152 * toLinear(Number(match[2])) + 0.0722 * toLinear(Number(match[3]));
}

export function resolveSurfaceThemeAtPoint(probeX: number, probeY: number): HeaderTheme {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return 'dark';
  }

  let surfaceEl: HTMLElement | null = null;
  const x = Math.max(1, Math.min(window.innerWidth - 1, Math.floor(probeX)));
  const y = Math.max(1, Math.min(window.innerHeight - 1, Math.floor(probeY)));

  if (typeof document.elementsFromPoint === 'function') {
    const stack = document.elementsFromPoint(x, y);
    for (const el of stack) {
      if (el.closest('header, [data-mobile-menu], [data-scroll-top-btn]')) continue;
      const candidate = el.closest<HTMLElement>('[data-surface]');
      if (candidate) {
        surfaceEl = candidate;
        break;
      }
    }
  } else {
    const hit = document.elementFromPoint(x, y);
    surfaceEl = hit?.closest<HTMLElement>('[data-surface]') ?? null;
  }

  if (!surfaceEl) {
    surfaceEl = document.querySelector<HTMLElement>('main [data-surface], [data-surface]');
  }

  if (!surfaceEl) return 'dark';

  const attr = surfaceEl.getAttribute('data-surface');
  if (attr === 'light' || attr === 'sand-muted' || attr === 'taupe' || attr === 'terracotta' || attr === 'terracotta-card') {
    return 'light';
  }

  if (attr === 'dark') {
    // Handle live GSAP interpolated surfaces where background color transitions from dark to light
    const lum = parseRgbLuminance(window.getComputedStyle(surfaceEl).backgroundColor);
    if (lum !== null && lum > 0.35) {
      return 'light';
    }
    return 'dark';
  }

  return 'dark';
}

export function resolveSurfaceThemeAtHeader(): HeaderTheme {
  if (typeof window === 'undefined') return 'dark';
  const xCoords = [
    56,
    Math.floor(window.innerWidth / 2),
    Math.max(1, window.innerWidth - 56),
  ];
  const yCoords = [18, 38, 58];
  for (const py of yCoords) {
    for (const px of xCoords) {
      if (resolveSurfaceThemeAtPoint(px, py) === 'light') {
        return 'light';
      }
    }
  }
  return 'dark';
}

export function UIStateProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [headerTheme, setHeaderTheme] = useState<HeaderTheme>('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [frozenMenuTheme, setFrozenMenuTheme] = useState<HeaderTheme>('dark');
  const [isStickyCtaVisible, setStickyCtaVisible] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement | null>(null);
  const isMenuOpenRef = useRef(false);
  isMenuOpenRef.current = isMenuOpen;

  const sampleAndApply = useCallback(() => {
    if (isMenuOpenRef.current) return;
    const nextTheme = resolveSurfaceThemeAtHeader();
    setHeaderTheme((prev) => (prev === nextTheme ? prev : nextTheme));
    document.documentElement.setAttribute('data-header-theme', nextTheme);
  }, []);

  // Initialize global Lenis + GSAP ticker once
  useEffect(() => {
    const cleanup = initScroll();
    return cleanup;
  }, []);

  // Sample theme on scroll (rAF-throttled), resize, route change, and IntersectionObserver fallback
  useEffect(() => {
    let rafId: number | null = null;

    const scheduleSample = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        sampleAndApply();
      });
    };

    // Immediate initial read + next-frame read for newly mounted route surfaces
    sampleAndApply();
    scheduleSample();

    const unsubscribeScroll = subscribeScroll(scheduleSample);
    window.addEventListener('resize', scheduleSample, { passive: true });
    window.addEventListener('scroll', scheduleSample, { passive: true });

    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      const surfaces = Array.from(document.querySelectorAll<HTMLElement>('[data-surface]'));
      if (surfaces.length > 0) {
        observer = new IntersectionObserver(scheduleSample, {
          rootMargin: '-35px 0px -90% 0px',
          threshold: [0, 0.01, 0.5],
        });
        surfaces.forEach((el) => observer?.observe(el));
      }
    }

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      unsubscribeScroll();
      window.removeEventListener('resize', scheduleSample);
      window.removeEventListener('scroll', scheduleSample);
      observer?.disconnect();
    };
  }, [pathname, sampleAndApply]);

  const openMenu = useCallback(() => {
    const snapshot = resolveSurfaceThemeAtHeader();
    setFrozenMenuTheme(snapshot);
    setHeaderTheme(snapshot);
    document.documentElement.setAttribute('data-header-theme', snapshot);
    setIsMenuOpen(true);
    stopScroll();
    document.body.style.overflow = 'hidden';
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
    startScroll();
    window.requestAnimationFrame(() => {
      const nextTheme = resolveSurfaceThemeAtHeader();
      setHeaderTheme(nextTheme);
      document.documentElement.setAttribute('data-header-theme', nextTheme);
    });
  }, []);

  const toggleMenu = useCallback(() => {
    if (isMenuOpenRef.current) {
      closeMenu();
    } else {
      openMenu();
    }
  }, [closeMenu, openMenu]);

  // Close mobile menu and reset sticky CTA flag on route transitions
  useEffect(() => {
    if (isMenuOpenRef.current) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
      startScroll();
    }
    setStickyCtaVisible(false);
    const id = window.requestAnimationFrame(sampleAndApply);
    return () => window.cancelAnimationFrame(id);
  }, [pathname, sampleAndApply]);

  // Ensure background content is inert when mobile menu overlay is open
  useEffect(() => {
    const mainEl = document.querySelector('main');
    const footerEl = document.querySelector('footer');
    if (mainEl) mainEl.inert = isMenuOpen;
    if (footerEl) footerEl.inert = isMenuOpen;
    return () => {
      if (mainEl) mainEl.inert = false;
      if (footerEl) footerEl.inert = false;
    };
  }, [isMenuOpen]);

  return React.createElement(
    UIStateContext.Provider,
    {
      value: {
        headerTheme,
        isMenuOpen,
        frozenMenuTheme,
        isStickyCtaVisible,
        openMenu,
        closeMenu,
        toggleMenu,
        setStickyCtaVisible,
        menuTriggerRef,
      },
    },
    children
  );
}

export function useUIState(): UIStateContextValue {
  const ctx = useContext(UIStateContext);
  if (!ctx) {
    throw new Error('useUIState must be used within UIStateProvider');
  }
  return ctx;
}

export function useSurfaceTheme(): HeaderTheme {
  return useUIState().headerTheme;
}
