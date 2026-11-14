import type { Metadata } from 'next';
import Link from 'next/link';
import { LEGAL_CONFIG } from '@/data/legalConfig';
import { SITE_CONFIG } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Service Delivery Policy',
  description: `Venue handover, room check-in, and hold fulfillment policy for ${SITE_CONFIG.name}.`,
};

export default function ServiceDeliveryPage() {
  const { serviceDeliveryPolicy } = LEGAL_CONFIG;
  return (
    <div data-surface="dark" className="min-h-screen px-5 pb-24 pt-28 laptop:px-16 laptop:pt-36">
      <div className="mx-auto max-w-[820px]">
        <p className="mb-3 text-[0.75rem] uppercase tracking-[0.18em] text-[var(--fg-muted)]">
          Legal &amp; Compliance
        </p>
        <h1 className="font-display text-[clamp(2.25rem,6vw,3.75rem)] leading-[1.05]">
          Service Delivery Policy
        </h1>
        {LEGAL_CONFIG.LEGAL_REVIEW_PENDING && (
          <div className="mt-6 rounded-lg border border-[#F5EEDB]/25 bg-[#1C1915] p-4 text-[0.875rem] text-[#F5EEDB]">
            Preview Legal Notice — Service SLAs below are sample placeholders pending sign-off.
          </div>
        )}
        <div className="mt-8 space-y-4 text-[0.9375rem] text-[var(--fg-muted)]">
          <p>{serviceDeliveryPolicy.holdConfirmationSla}</p>
          <p>{serviceDeliveryPolicy.venueHandoverClause}</p>
          <p>{serviceDeliveryPolicy.roomCheckInOutClause}</p>
        </div>
        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex min-h-[44px] min-w-[44px] items-center underline underline-offset-4"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
