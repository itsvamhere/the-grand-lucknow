'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS, SITE_CONFIG } from '@/data/siteConfig';
import { useUIState } from '@/lib/useSurfaceTheme';

export function Header() {
  const pathname = usePathname();
  const { isMenuOpen, toggleMenu, menuTriggerRef } = useUIState();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[70] isolate h-[76px]">
      {/* Top-Left Brand Wordmark */}
      <Link
        href="/"
        className="tgl-wordmark tgl-theme-transition pointer-events-auto fixed left-[20px] top-[16px] z-[70] -ml-3.5 inline-flex min-h-[44px] min-w-[44px] items-center rounded-full px-3.5 font-display text-[1.125rem] tracking-[0.06em] uppercase no-underline laptop:left-[32px]"
      >
        {SITE_CONFIG.wordmark}
      </Link>

      {/* Single Primary Navigation Landmark (Drawer toggle on Phone/Tablet; inline bar on Laptop) */}
      <nav aria-label="Primary">
        {/* Phone (375–809px) & Tablet (810–1023px) Menu / Close Pill */}
        <button
          ref={menuTriggerRef}
          type="button"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation-drawer"
          className="tgl-menu-pill tgl-theme-transition pointer-events-auto fixed right-[20px] top-[16px] z-[70] inline-flex min-h-[44px] min-w-[68px] items-center justify-center rounded-full px-4 text-[0.875rem] font-medium tracking-[0.01em] laptop:hidden"
        >
          <span className="tgl-roll-wrapper">
            <span aria-hidden="true" className="invisible select-none px-0.5">
              Close
            </span>
            <span
              aria-hidden={isMenuOpen}
              className="absolute inset-0 inline-flex items-center justify-center transition-transform duration-200 ease-out"
              style={{
                transform: isMenuOpen ? 'translateY(-100%)' : 'translateY(0%)',
              }}
            >
              Menu
            </span>
            <span
              aria-hidden={!isMenuOpen}
              className="absolute inset-0 inline-flex items-center justify-center transition-transform duration-200 ease-out"
              style={{
                transform: isMenuOpen ? 'translateY(0%)' : 'translateY(100%)',
              }}
            >
              Close
            </span>
          </span>
        </button>

        {/* Laptop (>= 1024px) Centered Inline Navigation Links */}
        <ul className="tgl-desktop-nav tgl-theme-transition pointer-events-auto fixed left-1/2 top-[16px] z-[70] hidden min-h-[44px] -translate-x-1/2 items-center gap-1 rounded-full px-2 laptop:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href ||
              Boolean(pathname?.startsWith(`${link.href}/`));
            return (
              <li key={link.href} className="list-none">
                <Link
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className="tgl-nav-link tgl-theme-transition inline-flex min-h-[44px] items-center rounded-full px-4 text-[0.875rem] font-medium text-inherit no-underline"
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Laptop (>= 1024px) Top-Right Book Now Pill */}
      <Link
        href="/book/venue"
        aria-current={pathname === '/book/venue' ? 'page' : undefined}
        className="tgl-book-pill tgl-theme-transition pointer-events-auto fixed right-[32px] top-[16px] z-[70] hidden min-h-[44px] items-center gap-1.5 rounded-full px-5 text-[0.875rem] font-medium no-underline laptop:inline-flex"
      >
        <span>Book Now</span>
        <span aria-hidden="true" className="text-[0.85em]">
          ↗
        </span>
      </Link>
    </header>
  );
}
