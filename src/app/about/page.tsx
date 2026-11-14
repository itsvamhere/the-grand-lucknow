import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'About',
  description: `Discover the hospitality philosophy and 64-room estate of ${SITE_CONFIG.name}.`,
};

export default function AboutPage() {
  return (
    <>
      <section
        data-surface="dark"
        className="flex min-h-[55vh] flex-col justify-end px-5 pb-20 pt-28 laptop:px-16 laptop:pt-36"
      >
        <div className="mx-auto w-full max-w-[960px]">
          <p className="mb-3 text-[0.75rem] uppercase tracking-[0.18em] text-[var(--fg-muted)]">
            Heritage Hospitality · Lucknow
          </p>
          <h1 className="font-display text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.04]">
            About {SITE_CONFIG.name}
          </h1>
          <p className="mt-5 max-w-[60ch] text-[1rem] text-[var(--fg-muted)]">
            Situated on Raibareli Road in Bindaua, Lucknow, {SITE_CONFIG.name} brings together five
            distinct celebration lawns and indoor banquet spaces within one curated estate.
          </p>
        </div>
      </section>

      <section data-surface="light" className="min-h-[125vh] px-5 py-24 laptop:px-16 laptop:py-32">
        <div className="mx-auto max-w-[960px]">
          <p className="mb-3 text-[0.75rem] uppercase tracking-[0.18em] text-[var(--fg-muted)]">
            Welcome to The Grand
          </p>
          <h2 className="font-display text-[clamp(2rem,5.5vw,3.75rem)] leading-[1.06]">
            {SITE_CONFIG.totalRooms} guest rooms, {SITE_CONFIG.doubleRooms} double occupancy and{' '}
            {SITE_CONFIG.familySuites} family suites.
          </h2>
          <p className="mt-5 max-w-[60ch] text-[1rem] text-[var(--fg-muted)]">
            Every celebration is supported by end-to-end event planning, custom decoration, Awadhi
            and multi-cuisine catering, and dedicated residential comfort for wedding families.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/venues"
              className="inline-flex min-h-[44px] min-w-[44px] items-center rounded-full border border-[#14120E]/25 bg-[#EAE0C8] px-6 text-[0.875rem] font-medium text-[#14120E] no-underline"
            >
              Explore All Venues ↗
            </Link>
            <Link
              href="/book/rooms"
              className="inline-flex min-h-[44px] min-w-[44px] items-center rounded-full border border-[#14120E]/20 px-6 text-[0.875rem] text-[#14120E] no-underline"
            >
              View On-Site Rooms
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
