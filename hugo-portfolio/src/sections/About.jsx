import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './About.css';

/* SVG icons as inline components to avoid extra dependencies */
const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <polyline points="6 9 6 2 18 2 18 9"/>
    <path d="M6 18H4a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2"/>
    <rect x="6" y="18" width="12" height="4" rx="1"/>
    <path d="M6 9a6 6 0 0 0 12 0"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

const CERTS = [
  { key: 'certs.istqb',  Icon: ShieldIcon },
  { key: 'certs.tosca',  Icon: CheckIcon  },
  { key: 'certs.skills', Icon: TrophyIcon },
];

/* Orbit items: starting angle for each arm */
const ORBIT_ITEMS = [
  { key: 'orbit.cypress', angle:   0 },
  { key: 'orbit.istqb',   angle:  72 },
  { key: 'orbit.tosca',   angle: 144 },
  { key: 'orbit.angular', angle: 216 },
  { key: 'orbit.mobile',  angle: 288 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export default function About() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="about" className="about-section" ref={ref}>
      <div className="about-inner">

        {/* ── Left column ─────────────────────────────────────── */}
        <div className="about-left">
          <motion.h2
            className="section-title about-title"
            variants={fadeUp} initial="hidden"
            animate={inView ? 'show' : 'hidden'} custom={0}
          >
            {t('about.title')}
          </motion.h2>

          <motion.p
            className="about-bio"
            variants={fadeUp} initial="hidden"
            animate={inView ? 'show' : 'hidden'} custom={0.1}
          >
            {t('about.bio')}
          </motion.p>

          {/* Cert highlight cards */}
          <motion.div
            className="about-certs"
            variants={fadeUp} initial="hidden"
            animate={inView ? 'show' : 'hidden'} custom={0.2}
          >
            {CERTS.map(({ key, Icon }) => (
              <div key={key} className="cert-card">
                <span className="cert-icon"><Icon /></span>
                <span className="cert-label">{t(`about.${key}`)}</span>
              </div>
            ))}
          </motion.div>

          {/* LinkedIn CTA */}
          <motion.a
            href="https://www.linkedin.com/in/hugo-parra-gonz%C3%A1lez-a20660254/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary about-linkedin"
            variants={fadeUp} initial="hidden"
            animate={inView ? 'show' : 'hidden'} custom={0.3}
          >
            <LinkedInIcon />
            {t('about.linkedin')}
          </motion.a>
        </div>

        {/* ── Right column — decorative orbital ───────────────── */}
        <motion.div
          className="about-right"
          variants={fadeUp} initial="hidden"
          animate={inView ? 'show' : 'hidden'} custom={0.15}
          aria-hidden="true"
        >
          <div className="orbit-scene">
            {/* Orbit ring */}
            <div className="orbit-ring" />

            {/* One rotating arm per satellite */}
            {ORBIT_ITEMS.map(({ key, angle }) => (
              <div
                key={key}
                className="orbit-arm"
                style={{ '--start-angle': `${angle}deg` }}
              >
                <span className="orbit-label">{t(`about.${key}`)}</span>
              </div>
            ))}

            {/* Central avatar circle */}
            <div className="orbit-center">
              <span className="orbit-initials">HP</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

