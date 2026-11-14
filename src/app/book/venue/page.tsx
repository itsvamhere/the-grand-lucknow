import type { Metadata } from 'next';
import Link from 'next/link';
import { VENUES } from '@/data/venueFacts';
import { SITE_CONFIG } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Book Your Venue',
  description: `Check event dates and request a hold across 5 celebration spaces at ${SITE_CONFIG.name}.`,
};

export default function BookVenueStubPage() {
  return (
    <div data-surface="dark" className="min-h-screen px-5 pb-24 pt-28 laptop:px-16 laptop:pt-36">
      <div className="mx-auto max-w-[1000px]">
        <p className="mb-3 text-[0.75rem] uppercase tracking-[0.18em] text-[var(--fg-muted)]">
          Event Reservations · {SITE_CONFIG.name}
        </p>
        <h1 className="font-display text-[clamp(2.25rem,6vw,4rem)] leading-[1.05]">
          Book Your Venue
        </h1>
        <p className="mt-5 max-w-[60ch] text-[1rem] text-[var(--fg-muted)]">
          Full interactive availability calendar, guest capacity stepper, and inline booking drawer
          will be implemented in Run 4.
        </p>

        <div className="mt-10 grid gap-4 tablet:grid-cols-2">
          {VENUES.map((venue) => (
            <div
              key={venue.slug}
              className="rounded-lg border border-[#F5EEDB]/20 bg-[#1C1915] p-5"
            >
              <h2 className="m-0 font-display text-[1.375rem]">{venue.name}</h2>
              <p className="mt-1 text-[0.875rem] text-[var(--fg-muted)]">
                {venue.type} · {venue.sqftDisplay} sqft · {venue.guestsDisplay} guests
              </p>
              <Link
                href={`/venues/${venue.slug}`}
                className="mt-3 inline-flex min-h-[44px] min-w-[44px] items-center text-[0.875rem] underline underline-offset-4"
              >
                View Venue Details ↗
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/book/rooms"
            className="inline-flex min-h-[44px] min-w-[44px] items-center rounded-full border border-[#F5EEDB]/30 px-6 text-[0.875rem] text-[#F5EEDB] no-underline"
          >
            Need overnight rooms? View 64 On-Site Rooms →
          </Link>
        </div>
      </div>
    </div>
  );
}
