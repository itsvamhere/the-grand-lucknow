'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MOBILE_MENU_LINKS, SITE_CONFIG } from '@/data/siteConfig';
import { useUIState } from '@/lib/useSurfaceTheme';

export function MobileMenu() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const { isMenuOpen, frozenMenuTheme, closeMenu, menuTriggerRef } = useUIState();
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  // Close on Escape and return focus to trigger button
  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        menuTriggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const focusTimer = window.requestAnimationFrame(() => {
      firstLinkRef.current?.focus({ preventScroll: true });
    });

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.cancelAnimationFrame(focusTimer);
    };
  }, [isMenuOpen, closeMenu, menuTriggerRef]);

  const isLightDrawer = frozenMenuTheme === 'light';
  const drawerBg = isLightDrawer ? '#F5EEDB' : '#14120E';
  const drawerFg = isLightDrawer ? '#14120E' : '#F5EEDB';
  const drawerMuted = isLightDrawer ? '#5C564B' : '#B5AEA0';
  const borderCol = isLightDrawer ? 'rgba(20, 18, 14, 0.14)' : 'rgba(245, 238, 219, 0.16)';

  const linkCount = MOBILE_MENU_LINKS.length;

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          id="mobile-navigation-drawer"
          data-mobile-menu="true"
          data-surface={isLightDrawer ? 'light' : 'dark'}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[65] flex flex-col justify-between px-5 pb-8 pt-24 laptop:hidden"
          style={{
            backgroundColor: drawerBg,
            color: drawerFg,
            opacity: 1,
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: prefersReducedMotion
              ? { duration: 0 }
              : { delay: 0.16, duration: 0.12, ease: 'linear' },
          }}
        >
          <nav aria-label="Mobile menu" className="mt-4">
            <ul className="m-0 flex list-none flex-col p-0">
              {MOBILE_MENU_LINKS.map((item, idx) => {
                const isActive =
                  pathname === item.href ||
                  Boolean(pathname?.startsWith(`${item.href}/`));
                const reverseIdx = linkCount - 1 - idx;

                return (
                  <motion.li
                    key={item.href}
                    style={{ borderBottom: `1px solid ${borderCol}` }}
                    initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.18, delay: idx * 0.03, ease: [0.22, 1, 0.36, 1] },
                    }}
                    exit={{
                      opacity: 0,
                      y: -8,
                      transition: prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.09, delay: reverseIdx * 0.015, ease: 'easeIn' },
                    }}
                  >
                    <Link
                      ref={idx === 0 ? firstLinkRef : undefined}
                      href={item.href}
                      onClick={closeMenu}
                      aria-current={isActive ? 'page' : undefined}
                      className="flex min-h-[56px] min-w-[44px] w-full items-center justify-between py-3 font-display text-[1.875rem] tracking-[-0.01em] no-underline"
                      style={{ color: drawerFg }}
                    >
                      <span>{item.label}</span>
                      <span aria-hidden="true" className="font-sans text-base" style={{ color: drawerMuted }}>
                        {item.href === '/book/venue' ? '↗' : `0${idx + 1}`}
                      </span>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          <motion.div
            className="flex flex-col gap-2 pt-6 text-[0.875rem]"
            style={{ color: drawerMuted }}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{
              opacity: 1,
              transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.18, delay: 0.1 },
            }}
            exit={{
              opacity: 0,
              transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.08 },
            }}
          >
            <p className="m-0 text-[0.8125rem]" style={{ color: drawerMuted }}>
              {SITE_CONFIG.address}
            </p>
            <div className="flex flex-wrap gap-4 pt-1">
              <a
                href={SITE_CONFIG.primaryPhoneHref}
                className="inline-flex min-h-[44px] min-w-[44px] items-center underline underline-offset-4"
                style={{ color: drawerFg }}
              >
                {SITE_CONFIG.phones[1]}
              </a>
              <a
                href={SITE_CONFIG.emailHref}
                className="inline-flex min-h-[44px] min-w-[44px] items-center underline underline-offset-4"
                style={{ color: drawerFg }}
              >
                {SITE_CONFIG.email}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
