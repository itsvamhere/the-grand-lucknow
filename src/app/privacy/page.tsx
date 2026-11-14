import type { Metadata } from 'next';
import Link from 'next/link';
import { LEGAL_CONFIG } from '@/data/legalConfig';
import { SITE_CONFIG } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Personal data handling and payment processing disclosures for ${SITE_CONFIG.name}.`,
};

export default function PrivacyPage() {
  return (
    <div data-surface="dark" className="min-h-screen px-5 pb-24 pt-28 laptop:px-16 laptop:pt-36">
      <div className="mx-auto max-w-[820px]">
        <p className="mb-3 text-[0.75rem] uppercase tracking-[0.18em] text-[var(--fg-muted)]">
          Legal &amp; Compliance
        </p>
        <h1 className="font-display text-[clamp(2.25rem,6vw,3.75rem)] leading-[1.05]">
          Privacy Policy
        </h1>
        {LEGAL_CONFIG.LEGAL_REVIEW_PENDING && (
          <div className="mt-6 rounded-lg border border-[#F5EEDB]/25 bg-[#1C1915] p-4 text-[0.875rem] text-[#F5EEDB]">
            Preview Legal Notice — Pending final legal sign-off by {SITE_CONFIG.name}.
          </div>
        )}
        <p className="mt-6 max-w-[60ch] text-[0.9375rem] text-[var(--fg-muted)]">
          {SITE_CONFIG.analyticsProviders.length === 0
            ? 'No third-party advertising trackers are loaded in this preview build.'
            : `Configured analytics providers: ${SITE_CONFIG.analyticsProviders.join(', ')}.`}
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
