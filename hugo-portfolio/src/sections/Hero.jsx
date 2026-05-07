import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import './Hero.css';

const STATS = [
  { key: 'stats.regression', value: '66%' },
  { key: 'stats.tests',      value: '300+' },
  { key: 'stats.award',      value: '3º'   },
];

/* Shared fade-up variant — each child sets its own delay via custom prop */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section id="hero" className="hero">
      {/* Decorative blobs */}
      <div className="hero-blob hero-blob--tr blob" aria-hidden="true" />
      <div className="hero-blob hero-blob--bl blob-alt" aria-hidden="true" />

      <div className="hero-content">
        {/* Available pill */}
        <motion.div
          className="hero-pill"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
        >
          <span className="hero-pill-dot" aria-hidden="true" />
          {t('hero.available')}
        </motion.div>

        {/* Name */}
        <motion.h1
          className="hero-name"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.1}
        >
          {t('hero.name')}
        </motion.h1>

        {/* Role */}
        <motion.p
          className="hero-role"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.2}
        >
          {t('hero.role')}
        </motion.p>

        {/* Summary */}
        <motion.p
          className="hero-summary"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.3}
        >
          {t('hero.summary')}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="hero-actions"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.4}
        >
          <a href="#experience" className="btn btn-primary">
            {t('hero.ctaExperience')}
          </a>
          <a href="/assets/CV_Hugo_Parra_2026.pdf" download="CV_Hugo_Parra_2026.pdf" className="btn btn-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            {t('hero.ctaCV')}
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="hero-stats"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.5}
        >
          {STATS.map(({ key, value }) => (
            <div key={key} className="hero-stat-card">
              <span className="hero-stat-value">{value}</span>
              <span className="hero-stat-label">{t(`hero.${key}`)}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
    </section>
  );
}

