import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Speak directly with the events and hospitality desk at ${SITE_CONFIG.name}.`,
};

export default function ContactPage() {
  return (
    <div data-surface="dark" className="min-h-screen px-5 pb-24 pt-28 laptop:px-16 laptop:pt-36">
      <div className="mx-auto max-w-[960px]">
        <p className="mb-3 text-[0.75rem] uppercase tracking-[0.18em] text-[var(--fg-muted)]">
          Concierge &amp; Inquiries
        </p>
        <h1 className="font-display text-[clamp(2.25rem,6vw,4.25rem)] leading-[1.04]">
          Contact Us
        </h1>
        <p className="mt-6 max-w-[44ch] text-[1.25rem] leading-[2]">
          Feel free to send us an{' '}
          <a
            href={SITE_CONFIG.emailHref}
            className="inline-flex min-h-[44px] min-w-[44px] items-center underline underline-offset-[6px]"
          >
            email
          </a>{' '}
          or give us a call at{' '}
          <a
            href={SITE_CONFIG.primaryPhoneHref}
            className="inline-flex min-h-[44px] min-w-[44px] items-center underline underline-offset-[6px]"
          >
            {SITE_CONFIG.phones[1]}
          </a>
          . We&apos;d be happy to help you personally.
        </p>
        <div className="mt-10 space-y-2 text-[0.9375rem] text-[var(--fg-muted)]">
          <p>{SITE_CONFIG.address}</p>
          <p>
            Landline:{' '}
            <a href={SITE_CONFIG.landlineHref} className="inline-flex min-h-[44px] items-center underline">
              {SITE_CONFIG.phones[0]}
            </a>
          </p>
        </div>
        <div className="mt-8">
          <Link
            href="/book/venue"
            className="inline-flex min-h-[44px] min-w-[44px] items-center rounded-full bg-[#F5EEDB] px-6 text-[0.875rem] font-medium text-[#14120E] no-underline"
          >
            Check Venue Availability ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
