import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@/data/siteConfig';
import { VENUES } from '@/data/venueFacts';

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
  description:
    'Five grand celebration lawns and indoor banquet halls paired with 64 on-site luxury rooms and family suites on Raibareli Road, Lucknow.',
};

const LEGAL_LINKS = [
  { label: 'Imprint', href: '/imprint' },
  { label: 'Terms', href: '/terms' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Refunds & Cancellation', href: '/refunds' },
  { label: 'Service Delivery', href: '/service-delivery' },
] as const;

export default function HomePage() {
  return (
    <>
      {/* Band 1: Dark Hero Shell */}
      <section
        data-surface="dark"
        className="flex min-h-[82vh] flex-col justify-end px-5 pb-12 pt-28 laptop:px-16 laptop:pb-16"
      >
        <div className="mx-auto w-full max-w-[1200px]">
          <p className="mb-3 text-[0.75rem] uppercase tracking-[0.18em] text-[var(--fg-muted)]">
            {SITE_CONFIG.address}
          </p>
          <h1 className="max-w-[18ch] font-display text-[clamp(2.5rem,7vw,5.25rem)] leading-[1.02] tracking-[-0.02em]">
            {SITE_CONFIG.tagline}
          </h1>
          <p className="mt-5 max-w-[56ch] text-[1rem] text-[var(--fg-muted)]">
            Five outdoor lawns and climate-controlled banquet spaces paired with{' '}
            {SITE_CONFIG.totalRooms} on-site guest rooms ({SITE_CONFIG.doubleRooms} Double Occupancy
            Rooms and {SITE_CONFIG.familySuites} Luxury Family Suites).
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/book/venue"
              className="inline-flex min-h-[44px] min-w-[44px] items-center rounded-full border border-[#F5EEDB]/35 bg-[#F5EEDB] px-6 text-[0.875rem] font-medium text-[#14120E] no-underline transition-opacity hover:opacity-90"
            >
              Inquire Now ↗
            </Link>
            <Link
              href="/venues"
              className="inline-flex min-h-[44px] min-w-[44px] items-center rounded-full border border-[#F5EEDB]/25 px-6 text-[0.875rem] text-[#F5EEDB] no-underline hover:border-[#F5EEDB]/60"
            >
              Explore 5 Venues
            </Link>
          </div>
          <div className="relative mt-10 overflow-hidden rounded-[20px] border border-[#F5EEDB]/15 bg-[#1C1915]">
            <img
              src="/images/hero_bg.webp"
              alt="The Grand Lucknow celebration estate illuminated for evening hospitality"
              className="h-[300px] w-full object-cover tablet:h-[420px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#14120E]/45 to-transparent"
            />
          </div>
        </div>
      </section>

      {/* Band 2: Light Editorial Surface */}
      <section data-surface="light" className="px-5 py-28 laptop:px-16 laptop:py-36">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-3 text-[0.75rem] uppercase tracking-[0.18em] text-[var(--fg-muted)]">
            Five Celebration Spaces
          </p>
          <h2 className="max-w-[20ch] font-display text-[clamp(2rem,5.5vw,3.75rem)] leading-[1.06]">
            Tailored for intimate rituals and grand receptions.
          </h2>
          <div className="mt-10 grid gap-6 tablet:grid-cols-2 laptop:grid-cols-3">
            {VENUES.map((venue) => (
              <Link
                key={venue.slug}
                href={`/venues/${venue.slug}`}
                className="group block min-h-[44px] overflow-hidden rounded-lg border border-[#14120E]/12 bg-[#EAE0C8] p-4 no-underline"
                data-surface="sand-muted"
              >
                <div className="overflow-hidden rounded-md bg-[#1C1915]">
                  <img
                    src={venue.image}
                    alt={venue.imageAlt}
                    className="h-52 w-full object-cover"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <h3 className="m-0 font-display text-[1.375rem] leading-tight text-[#14120E]">
                    {venue.name}
                  </h3>
                  <span className="shrink-0 whitespace-nowrap rounded border border-[#14120E]/20 px-2.5 py-1 text-[0.75rem] text-[#14120E]">
                    {venue.sqftDisplay} sqft
                  </span>
                </div>
                <p className="mt-2 mb-0 text-[0.875rem] text-[#5C564B]">
                  {venue.type} · {venue.guestsDisplay} guests
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Band 3: Sand Muted Hospitality Summary */}
      <section data-surface="sand-muted" className="px-5 py-20 laptop:px-16 laptop:py-28">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-3 text-[0.75rem] uppercase tracking-[0.18em] text-[var(--fg-muted)]">
            Estate Metrics
          </p>
          <div className="grid gap-6 tablet:grid-cols-3">
            <div className="border-t border-[#14120E]/20 pt-4">
              <p className="m-0 font-display text-[2rem]">5 Venues</p>
              <p className="mt-1 text-[0.9375rem] text-[var(--fg-muted)]">
                Lawns &amp; Indoor Banquet
              </p>
            </div>
            <div className="border-t border-[#14120E]/20 pt-4">
              <p className="m-0 font-display text-[2rem]">64 Guest Rooms</p>
              <p className="mt-1 text-[0.9375rem] text-[var(--fg-muted)]">
                56 Double · 8 Family Suites
              </p>
            </div>
            <div className="border-t border-[#14120E]/20 pt-4">
              <p className="m-0 font-display text-[2rem]">Up to 1,500</p>
              <p className="mt-1 text-[0.9375rem] text-[var(--fg-muted)]">Guest Capacity</p>
            </div>
          </div>
        </div>
      </section>

      {/* Band 4: Terracotta Footer Preview Shell */}
      <section data-surface="terracotta" className="px-5 py-20 pb-28 laptop:px-16">
        <div className="mx-auto max-w-[1200px]">
          <p className="m-0 text-[0.75rem] uppercase tracking-[0.18em] text-[#F5EEDB]">
            {SITE_CONFIG.name} · Lucknow
          </p>
          <h2 className="mt-3 font-display text-[clamp(2rem,6vw,4rem)] leading-none text-[#F5EEDB]">
            Begin Planning Your Celebration
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {LEGAL_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-[44px] min-w-[44px] items-center rounded-full border border-[#F5EEDB]/35 px-4 text-[0.875rem] text-[#F5EEDB] no-underline hover:bg-[#F5EEDB] hover:text-[#14120E]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
