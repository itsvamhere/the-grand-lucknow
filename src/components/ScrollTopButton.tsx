'use client';

import React, { useEffect, useState } from 'react';
import { getLenis, subscribeScroll } from '@/lib/scroll';
import {
  resolveSurfaceThemeAtPoint,
  useUIState,
  type HeaderTheme,
} from '@/lib/useSurfaceTheme';

export function ScrollTopButton() {
  const { isMenuOpen, isStickyCtaVisible } = useUIState();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [bottomTheme, setBottomTheme] = useState<HeaderTheme>('dark');

  useEffect(() => {
    let rafId: number | null = null;
    const syncState = () => {
      setHasScrolled(window.scrollY > 240);
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const nextTheme = resolveSurfaceThemeAtPoint(
          window.innerWidth - 42,
          window.innerHeight - 46
        );
        setBottomTheme((prev) => (prev === nextTheme ? prev : nextTheme));
      });
    };
    syncState();
    const unsub = subscribeScroll(syncState);
    window.addEventListener('scroll', syncState, { passive: true });
    window.addEventListener('resize', syncState, { passive: true });
    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      unsub();
      window.removeEventListener('scroll', syncState);
      window.removeEventListener('resize', syncState);
    };
  }, []);

  const isHidden = isMenuOpen || isStickyCtaVisible || !hasScrolled;

  const handleScrollTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lenis = getLenis();
    if (lenis && !prefersReducedMotion) {
      lenis.scrollTo(0);
      return;
    }
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  const isLightSurface = bottomTheme === 'light';

  return (
    <button
      type="button"
      data-scroll-top-btn="true"
      onClick={handleScrollTop}
      aria-label="Scroll to top"
      aria-hidden={isHidden}
      tabIndex={isHidden ? -1 : 0}
      className="tgl-theme-transition fixed bottom-6 right-5 z-50 inline-flex h-[44px] min-h-[44px] w-[44px] min-w-[44px] items-center justify-center rounded-full shadow-lg"
      style={{
        opacity: isHidden ? 0 : 1,
        pointerEvents: isHidden ? 'none' : 'auto',
        backgroundColor: isLightSurface ? '#14120E' : '#F5EEDB',
        color: isLightSurface ? '#F5EEDB' : '#14120E',
        border: isLightSurface
          ? '1px solid rgba(245, 238, 219, 0.25)'
          : '1px solid rgba(20, 18, 14, 0.18)',
      }}
    >
      <span aria-hidden="true" className="text-[1rem] leading-none font-medium">
        ^
      </span>
    </button>
  );
}
