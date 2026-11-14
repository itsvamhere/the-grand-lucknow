import type { Metadata } from 'next';
import Link from 'next/link';
import { LEGAL_CONFIG } from '@/data/legalConfig';
import { SITE_CONFIG } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: `Venue date-hold and room reservation terms for ${SITE_CONFIG.name}.`,
};

export default function TermsPage() {
  return (
    <div data-surface="dark" className="min-h-screen px-5 pb-24 pt-28 laptop:px-16 laptop:pt-36">
      <div className="mx-auto max-w-[820px]">
        <p className="mb-3 text-[0.75rem] uppercase tracking-[0.18em] text-[var(--fg-muted)]">
          Legal &amp; Compliance
        </p>
        <h1 className="font-display text-[clamp(2.25rem,6vw,3.75rem)] leading-[1.05]">
          Terms &amp; Conditions
        </h1>
        {LEGAL_CONFIG.LEGAL_REVIEW_PENDING && (
          <div className="mt-6 rounded-lg border border-[#F5EEDB]/25 bg-[#1C1915] p-4 text-[0.875rem] text-[#F5EEDB]">
            Preview Legal Notice — Jurisdiction: {LEGAL_CONFIG.jurisdictionCity}. Full commercial
            contract terms will be finalized in Run 5.
          </div>
        )}
        <p className="mt-6 max-w-[60ch] text-[0.9375rem] text-[var(--fg-muted)]">
          All tariffs, date holds, and room reservations displayed during preview are governed by
          management confirmation at {SITE_CONFIG.name}, {SITE_CONFIG.address}.
        </p>
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
