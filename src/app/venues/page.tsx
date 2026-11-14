import type { Metadata } from 'next';
import Link from 'next/link';
import { VENUES } from '@/data/venueFacts';
import { SITE_CONFIG } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Venues',
  description: `Explore all 5 outdoor lawns and indoor banquet spaces at ${SITE_CONFIG.name}.`,
};

export default function VenuesIndexPage() {
  return (
    <div data-surface="dark" className="min-h-screen px-5 pb-24 pt-28 laptop:px-16 laptop:pt-36">
      <div className="mx-auto max-w-[1200px]">
        <p className="mb-3 text-[0.75rem] uppercase tracking-[0.18em] text-[var(--fg-muted)]">
          5 Celebration Spaces · {SITE_CONFIG.name}
        </p>
        <h1 className="font-display text-[clamp(2.25rem,6vw,4.25rem)] leading-[1.04]">
          Our Venues
        </h1>
        <p className="mt-4 max-w-[60ch] text-[1rem] text-[var(--fg-muted)]">
          From the 55,000 sq ft Open Earth Lawn to the climate-controlled Royal Legacy Banquet,
          every venue pairs expansive architecture with 64 on-site guest rooms.
        </p>

        <div className="mt-10 grid gap-6 tablet:grid-cols-2">
          {VENUES.map((venue, index) => (
            <Link
              key={venue.slug}
              href={`/venues/${venue.slug}`}
              className="block min-h-[44px] overflow-hidden rounded-lg border border-[#F5EEDB]/15 bg-[#1C1915] p-5 no-underline"
            >
              <div className="relative overflow-hidden rounded-md bg-[#14120E]">
                <img
                  src={venue.image}
                  alt={venue.imageAlt}
                  loading={index < 2 ? 'eager' : 'lazy'}
                  className="h-56 w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#14120E]/40 to-transparent"
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <h2 className="m-0 font-display text-[1.5rem] leading-tight text-[#F5EEDB]">
                  {venue.name}
                </h2>
                <span className="shrink-0 whitespace-nowrap rounded border border-[#F5EEDB]/25 px-2.5 py-1 text-[0.75rem] text-[#F5EEDB]">
                  {venue.sqftDisplay} sqft
                </span>
              </div>
              <p className="mt-2 mb-0 text-[0.875rem] text-[var(--fg-muted)]">
                {venue.type} · {venue.guestsDisplay} guests
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
