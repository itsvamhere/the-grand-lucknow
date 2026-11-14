import type { Metadata } from 'next';
import Link from 'next/link';
import { ROOM_TIERS, totalSampleRoomCapacity } from '@/data/roomsConfig';
import { SITE_CONFIG } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Book Guest Rooms',
  description: `Reserve from ${SITE_CONFIG.totalRooms} on-site guest rooms and family suites at ${SITE_CONFIG.name}.`,
};

export default function BookRoomsStubPage() {
  return (
    <div data-surface="dark" className="min-h-screen px-5 pb-24 pt-28 laptop:px-16 laptop:pt-36">
      <div className="mx-auto max-w-[820px]">
        <p className="mb-3 text-[0.75rem] uppercase tracking-[0.18em] text-[var(--fg-muted)]">
          On-Site Estate Accommodation · {SITE_CONFIG.totalRooms} Rooms
        </p>
        <h1 className="font-display text-[clamp(2.25rem,6vw,4rem)] leading-[1.05] tracking-[-0.02em]">
          Book Guest Rooms
        </h1>
        <p className="mt-5 max-w-[60ch] text-[1rem] text-[var(--fg-muted)]">
          {SITE_CONFIG.doubleRooms} Double Occupancy Rooms and {SITE_CONFIG.familySuites} Luxury Family
          Suites (sample estate room capacity up to {totalSampleRoomCapacity} guests). Full interactive
          room booking engine launches in Run 6.
        </p>

        <div className="mt-10 grid gap-4 tablet:grid-cols-2">
          {ROOM_TIERS.map((tier) => (
            <div
              key={tier.slug}
              className="rounded-lg border border-[#F5EEDB]/20 bg-[#1C1915] p-6"
            >
              <p className="m-0 text-[0.75rem] uppercase tracking-[0.14em] text-[var(--fg-muted)]">
                {tier.count} Units
              </p>
              <h2 className="mt-2 font-display text-[1.5rem] leading-tight">{tier.name}</h2>
              <p className="mt-2 text-[0.9375rem] text-[var(--fg-muted)]">
                Sample tariff: ₹{tier.sampleNightlyTariffINR.toLocaleString('en-IN')} / night
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/book/venue"
            className="inline-flex min-h-[44px] min-w-[44px] items-center rounded-full border border-[#F5EEDB]/30 px-6 text-[0.875rem] font-medium text-[#F5EEDB] no-underline hover:bg-[#F5EEDB] hover:text-[#14120E]"
          >
            Book a Celebration Venue ↗
          </Link>
          <Link
            href="/venues"
            className="inline-flex min-h-[44px] min-w-[44px] items-center rounded-full border border-[#F5EEDB]/20 px-6 text-[0.875rem] text-[#F5EEDB] no-underline hover:border-[#F5EEDB]/50"
          >
            Explore All 5 Venues
          </Link>
        </div>
      </div>
    </div>
  );
}
