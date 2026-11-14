import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getVenueBySlug, VENUES } from '@/data/venueFacts';

export function generateStaticParams() {
  return VENUES.map((venue) => ({ slug: venue.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const venue = getVenueBySlug(slug);
  if (!venue) {
    return { title: 'Venue Not Found' };
  }
  return {
    title: venue.name,
    description: venue.description,
  };
}

export default async function VenueDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const venue = getVenueBySlug(slug);
  if (!venue) {
    notFound();
  }

  return (
    <div data-surface="dark" className="min-h-screen px-5 pb-28 pt-28 laptop:px-16 laptop:pt-36">
      <div className="mx-auto max-w-[1000px]">
        <p className="mb-3 text-[0.75rem] uppercase tracking-[0.18em] text-[var(--fg-muted)]">
          {venue.type} · {venue.sqftDisplay} sqft · {venue.guestsDisplay} guests
        </p>
        <h1 className="font-display text-[clamp(2.25rem,6vw,4.25rem)] leading-[1.04]">
          {venue.name}
        </h1>
        <p className="mt-5 max-w-[60ch] text-[1rem] text-[var(--fg-muted)]">{venue.description}</p>

        <div className="mt-8 overflow-hidden rounded-lg border border-[#F5EEDB]/15 bg-[#1C1915]">
          <img
            src={venue.image}
            alt={venue.imageAlt}
            className="h-[280px] w-full object-cover tablet:h-[420px]"
          />
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href={`/book/venue?venue=${venue.slug}`}
            className="inline-flex min-h-[44px] min-w-[44px] items-center rounded-full bg-[#F5EEDB] px-6 text-[0.875rem] font-medium text-[#14120E] no-underline"
          >
            Check Availability ↗
          </Link>
          <Link
            href={`/book/rooms?fromVenue=${venue.slug}`}
            className="inline-flex min-h-[44px] min-w-[44px] items-center rounded-full border border-[#F5EEDB]/30 px-6 text-[0.875rem] text-[#F5EEDB] no-underline"
          >
            Need rooms for your guests?
          </Link>
        </div>
      </div>
    </div>
  );
}
