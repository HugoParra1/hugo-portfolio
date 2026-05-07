import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Contact.css';

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <polyline points="2,4 12,13 22,4"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
    fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="13" height="13" rx="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const EMAIL = 'hugo.pargon@gmail.com';

const CARDS = [
  { id: 'linkedin', Icon: LinkedInIcon, href: 'https://www.linkedin.com/in/hugo-parra-gonz%C3%A1lez-a20660254/', external: true },
  { id: 'location', Icon: MapPinIcon,   href: null },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
};

function EmailCard({ inView, delay, t }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <motion.div
      className="contact-card contact-card--link contact-card--email"
      variants={fadeUp} initial="hidden"
      animate={inView ? 'show' : 'hidden'} custom={delay}
      whileHover={{ y: -4, borderColor: 'var(--color-accent)' }}
    >
      <a href={`mailto:${EMAIL}`} className="contact-card-main-link" aria-label="Send email">
        <span className="contact-card-icon"><MailIcon /></span>
        <span className="contact-card-label">{t('contact.cards.email.label')}</span>
        <span className="contact-card-value">{t('contact.cards.email.value')}</span>
      </a>
      <motion.button
        className={`copy-btn${copied ? ' copy-btn--done' : ''}`}
        onClick={handleCopy}
        aria-label={copied ? 'Email copied!' : 'Copy email to clipboard'}
        whileTap={{ scale: 0.9 }}
        title={copied ? (t('contact.copied') || 'Copied!') : (t('contact.copy') || 'Copy email')}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
        <span className="copy-btn-label">
          {copied
            ? (t('contact.copied') || '¡Copiado!')
            : (t('contact.copy')   || 'Copiar')}
        </span>
      </motion.button>
    </motion.div>
  );
}

function ContactCard({ card, inView, delay, t }) {
  const { id, Icon, href, external } = card;
  const inner = (
    <>
      <span className="contact-card-icon"><Icon /></span>
      <span className="contact-card-label">{t(`contact.cards.${id}.label`)}</span>
      <span className="contact-card-value">{t(`contact.cards.${id}.value`)}</span>
    </>
  );
  const sharedProps = {
    className: `contact-card${href ? ' contact-card--link' : ''}`,
    whileHover: href ? { y: -4, borderColor: 'var(--color-accent)' } : {},
    whileTap:   href ? { scale: 0.97 } : {},
    variants: fadeUp, initial: 'hidden',
    animate:  inView ? 'show' : 'hidden',
    custom:   delay,
  };
  if (href) {
    return (
      <motion.a href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...sharedProps}>
        {inner}
      </motion.a>
    );
  }
  return <motion.div {...sharedProps}>{inner}</motion.div>;
}

export default function Contact() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <div className="contact-blob blob-alt" aria-hidden="true" />
      <div className="contact-inner">
        <motion.h2 className="contact-title"
          variants={fadeUp} initial="hidden"
          animate={inView ? 'show' : 'hidden'} custom={0}>
          {t('contact.title')}
        </motion.h2>
        <motion.p className="contact-subtitle"
          variants={fadeUp} initial="hidden"
          animate={inView ? 'show' : 'hidden'} custom={0.1}>
          {t('contact.subtitle')}
        </motion.p>

        <div className="contact-cards">
          <EmailCard inView={inView} delay={0.18} t={t} />
          {CARDS.map((card, i) => (
            <ContactCard key={card.id} card={card} inView={inView} delay={0.3 + i * 0.1} t={t} />
          ))}
        </div>

        <motion.a
          href="/assets/CV_Hugo_Parra_2026.pdf"
          download="CV_Hugo_Parra_2026.pdf"
          className="contact-cv-btn"
          variants={fadeUp} initial="hidden"
          animate={inView ? 'show' : 'hidden'} custom={0.52}
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <DownloadIcon />
          {t('contact.downloadCV')}
        </motion.a>

        <motion.p className="contact-footer"
          variants={fadeUp} initial="hidden"
          animate={inView ? 'show' : 'hidden'} custom={0.64}>
          {t('contact.footer')}
        </motion.p>
      </div>
    </section>
  );
}
