import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Check,
  Clock,
  Facebook,
  Instagram,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Twitter,
  X,
} from 'lucide-react';
import { CONTACT, NAV_LINKS } from '../data/site';
import { scrollToSection } from '../utils/scrollToSection';
import { useToast } from '../context/ToastContext';
import Logo from './ui/Logo';
import Modal from './ui/Modal';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const SOCIAL_ICONS = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  tiktok: function TikTokIcon({ className }) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M16.6 3c.3 2.1 1.5 3.6 3.5 4v3c-1.4 0-2.7-.4-3.9-1.2v6.1c0 3.6-2.4 6.1-5.8 6.1-3.1 0-5.6-2.3-5.6-5.4 0-3.2 2.7-5.5 5.9-5.3v3.1c-1.7-.3-3 .8-3 2.3 0 1.4 1.1 2.4 2.6 2.4 1.6 0 2.7-1.1 2.7-3.1V3h3.6Z" />
      </svg>
    );
  },
};

const LEGAL_CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    intro:
      'Maison Savour respects your privacy. This demo policy describes how a real restaurant website would handle guest information.',
    sections: [
      {
        heading: 'Information we collect',
        body: 'Reservation details such as your name, email, phone number and party size are used solely to confirm and manage your booking.',
      },
      {
        heading: 'How we use your data',
        body: 'Contact information may be used to send reservation confirmations and, with your consent, occasional updates about seasonal menus and events.',
      },
      {
        heading: 'Your choices',
        body: 'You can request access, correction or deletion of your personal information at any time by contacting hello@maisonsavour.com.',
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    intro:
      'These demo terms outline the expected use of the Maison Savour website and reservation experience.',
    sections: [
      {
        heading: 'Reservations',
        body: 'Tables are held for 15 minutes past the reserved time. Parties of six or more may be asked for a deposit to secure the booking.',
      },
      {
        heading: 'Cancellations',
        body: 'We kindly ask for 24 hours notice for cancellations. Special event and chef’s table bookings may follow separate cancellation terms.',
      },
      {
        heading: 'Website use',
        body: 'All content, imagery and branding on this site are presented for demonstration purposes and may not be reproduced without permission.',
      },
    ],
  },
};

function SocialIcon({ name, className }) {
  const Icon = SOCIAL_ICONS[name];
  return <Icon className={className} />;
}

export default function Footer() {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [newsletterState, setNewsletterState] = useState('idle');
  const [error, setError] = useState('');
  const [legalDoc, setLegalDoc] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const handleSubscribe = (event) => {
    event.preventDefault();
    setError('');

    if (!EMAIL_PATTERN.test(email.trim())) {
      setError('Please enter a valid email address.');
      showToast('Please enter a valid email address to subscribe.', 'error');
      return;
    }

    setNewsletterState('loading');
    timerRef.current = window.setTimeout(() => {
      setNewsletterState('success');
      setEmail('');
      showToast('You’re on the list. Welcome to Maison Savour.', 'success');
      timerRef.current = window.setTimeout(() => setNewsletterState('idle'), 3600);
    }, 850);
  };

  return (
    <>
      <footer
        id="contact"
        aria-labelledby="footer-heading"
        className="relative overflow-hidden border-t border-white/[0.06] bg-[#070707]"
      >
        <div
          className="pointer-events-none absolute -left-[10%] top-0 h-[420px] w-[420px] rounded-full bg-accent/[0.035] blur-[120px]"
          aria-hidden="true"
        />

        <div className="container relative z-10 pb-8 pt-16 sm:pt-20 lg:pt-24">
          <h2 id="footer-heading" className="sr-only">
            Maison Savour contact and information
          </h2>

          <div className="grid gap-11 md:grid-cols-2 lg:grid-cols-[1.5fr_0.7fr_1.15fr_1.3fr] lg:gap-10">
            <div>
              <Logo size="lg" />
              <p className="mt-6 max-w-[290px] text-[13px] leading-[1.9] text-muted/70">
                Elevating taste, crafting memories. Experience the art of fine
                dining like never before.
              </p>

              <div className="mt-7 flex items-center gap-2.5">
                {['facebook', 'instagram', 'twitter', 'tiktok'].map((social) => (
                  <a
                    key={social}
                    href={
                      social === 'twitter'
                        ? 'https://x.com'
                        : `https://${social}.com`
                    }
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`Maison Savour on ${social === 'twitter' ? 'X (Twitter)' : social}`}
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-cream/55 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/45 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                  >
                    <SocialIcon name={social} className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-accent/80">
                Quick Links
              </p>
              <ul className="mt-6 space-y-3.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        scrollToSection(link.id);
                      }}
                      className="group inline-flex items-center gap-2 text-[12.5px] text-muted/65 transition-colors duration-300 hover:text-cream"
                    >
                      <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-3" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-accent/80">
                Contact Us
              </p>
              <ul className="mt-6 space-y-4 text-[12.5px] text-muted/65">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent/80" strokeWidth={1.6} />
                  <span className="leading-relaxed">{CONTACT.address}</span>
                </li>
                <li>
                  <a
                    href={`tel:${CONTACT.phone.replace(/[^+\d]/g, '')}`}
                    className="flex items-center gap-3 transition-colors hover:text-cream"
                  >
                    <Phone className="h-3.5 w-3.5 shrink-0 text-accent/80" strokeWidth={1.6} />
                    {CONTACT.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="flex items-center gap-3 transition-colors hover:text-cream"
                  >
                    <Mail className="h-3.5 w-3.5 shrink-0 text-accent/80" strokeWidth={1.6} />
                    {CONTACT.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent/80" strokeWidth={1.6} />
                  <span className="leading-relaxed">{CONTACT.hours}</span>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-accent/80">
                Newsletter
              </p>
              <p className="mt-6 text-[12.5px] leading-[1.8] text-muted/65">
                Stay updated with our latest offers and special events.
              </p>

              <form onSubmit={handleSubscribe} noValidate className="mt-5">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted/40"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Your email address"
                    autoComplete="email"
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? 'newsletter-error' : undefined}
                    className="field py-3 pl-10 pr-3 text-[12px]"
                  />
                </div>

                {error && (
                  <p id="newsletter-error" role="alert" className="field-error">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={newsletterState !== 'idle'}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-[9.5px] font-semibold uppercase tracking-[0.22em] text-[#140D08] transition-colors duration-300 hover:bg-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070707] disabled:opacity-80"
                >
                  {newsletterState === 'loading' && (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={2} />
                      Subscribing
                    </>
                  )}
                  {newsletterState === 'success' && (
                    <>
                      <Check className="h-3.5 w-3.5" strokeWidth={2.2} />
                      Subscribed
                    </>
                  )}
                  {newsletterState === 'idle' && (
                    <>
                      Subscribe
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.8} />
                    </>
                  )}
                </button>

                <p className="mt-3 text-[9px] leading-relaxed text-muted/35">
                  Demo form only. No emails are stored or sent.
                </p>
              </form>
            </div>
          </div>

          <div className="mt-12 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent sm:mt-16" />

          <div className="mt-6 flex flex-col items-center justify-between gap-3 pb-2 text-center sm:flex-row sm:text-left">
            <p className="text-[10.5px] tracking-wide text-muted/40">
              Copyright © 2026 Maison Savour. All Rights Reserved.
            </p>
            <div className="flex items-center gap-5 text-[10.5px] text-muted/40">
              <button
                type="button"
                onClick={() => setLegalDoc('privacy')}
                className="transition-colors duration-300 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                Privacy Policy
              </button>
              <span className="h-3 w-px bg-white/10" aria-hidden="true" />
              <button
                type="button"
                onClick={() => setLegalDoc('terms')}
                className="transition-colors duration-300 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                Terms of Services
              </button>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -bottom-4 select-none overflow-hidden text-center"
        >
          <span className="font-serif text-[clamp(4.5rem,16vw,15rem)] leading-none tracking-[0.05em] text-white/[0.018]">
            Maison Savour
          </span>
        </div>
      </footer>

      <Modal
        open={Boolean(legalDoc)}
        onClose={() => setLegalDoc(null)}
        variant="center"
        className="max-h-[88dvh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-accent/20 bg-[#0D0D0D] p-7 shadow-card sm:p-9"
        labelledBy="legal-modal-title"
      >
        {legalDoc && (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-accent">
                  Maison Savour
                </p>
                <h3
                  id="legal-modal-title"
                  className="mt-2 font-serif text-3xl text-cream"
                >
                  {LEGAL_CONTENT[legalDoc].title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLegalDoc(null)}
                aria-label="Close policy"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-cream/60 transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                <X className="h-4 w-4" strokeWidth={1.6} />
              </button>
            </div>

            <p className="mt-5 text-[13px] leading-[1.9] text-muted/75">
              {LEGAL_CONTENT[legalDoc].intro}
            </p>

            <div className="mt-6 space-y-5">
              {LEGAL_CONTENT[legalDoc].sections.map((section) => (
                <div key={section.heading}>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cream/85">
                    {section.heading}
                  </h4>
                  <p className="mt-2 text-[12.5px] leading-[1.85] text-muted/65">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-7 rounded-lg border border-accent/15 bg-accent/[0.04] p-3 text-[10px] leading-relaxed text-muted/50">
              This is demo content created for a portfolio website. It is not legal
              advice and does not represent a real restaurant policy.
            </p>
          </>
        )}
      </Modal>
    </>
  );
}
