import type { Metadata } from 'next';
import Link from 'next/link';
import { LEGAL_CONFIG } from '@/data/legalConfig';
import { SITE_CONFIG } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Imprint',
  description: `Statutory entity and contact details for ${SITE_CONFIG.name}.`,
};

export default function ImprintPage() {
  return (
    <div data-surface="dark" className="min-h-screen px-5 pb-24 pt-28 laptop:px-16 laptop:pt-36">
      <div className="mx-auto max-w-[820px]">
        <p className="mb-3 text-[0.75rem] uppercase tracking-[0.18em] text-[var(--fg-muted)]">
          Legal &amp; Compliance
        </p>
        <h1 className="font-display text-[clamp(2.25rem,6vw,3.75rem)] leading-[1.05]">Imprint</h1>
        {LEGAL_CONFIG.LEGAL_REVIEW_PENDING && (
          <div className="mt-6 rounded-lg border border-[#F5EEDB]/25 bg-[#1C1915] p-4 text-[0.875rem] text-[#F5EEDB]">
            Preview Legal Notice — Commercial terms, GSTIN, and policy schedules marked{' '}
            <code>[CLIENT TO CONFIRM]</code> are pending final sign-off by {SITE_CONFIG.name}{' '}
            management.
          </div>
        )}
        <dl className="mt-8 space-y-4 text-[0.9375rem]">
          <div>
            <dt className="text-[0.75rem] uppercase tracking-[0.14em] text-[var(--fg-muted)]">
              Legal Entity
            </dt>
            <dd className="mt-1">{LEGAL_CONFIG.legalEntityName}</dd>
          </div>
          <div>
            <dt className="text-[0.75rem] uppercase tracking-[0.14em] text-[var(--fg-muted)]">
              Address
            </dt>
            <dd className="mt-1">{SITE_CONFIG.address}</dd>
          </div>
          <div>
            <dt className="text-[0.75rem] uppercase tracking-[0.14em] text-[var(--fg-muted)]">
              GSTIN / PAN
            </dt>
            <dd className="mt-1">
              {LEGAL_CONFIG.gstin} · {LEGAL_CONFIG.pan}
            </dd>
          </div>
          <div>
            <dt className="text-[0.75rem] uppercase tracking-[0.14em] text-[var(--fg-muted)]">
              Contact
            </dt>
            <dd className="mt-1">
              {SITE_CONFIG.phones.join(' · ')} · {SITE_CONFIG.email}
            </dd>
          </div>
        </dl>
        <div className="mt-10 flex flex-wrap gap-4">
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
