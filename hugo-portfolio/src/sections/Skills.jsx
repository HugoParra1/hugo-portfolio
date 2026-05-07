import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Skills.css';

/* ── Tabler icon map (inline SVG paths, no extra package) ───── */
const ICONS = {
  'ti-bug': (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 9v-1a3 3 0 0 1 6 0v1"/>
      <path d="M8 9h8a6 6 0 0 1 1 3v3a5 5 0 0 1-10 0v-3a6 6 0 0 1 1-3"/>
      <line x1="3" y1="13" x2="7" y2="13"/>
      <line x1="17" y1="13" x2="21" y2="13"/>
      <line x1="12" y1="20" x2="12" y2="14"/>
      <line x1="4" y1="19" x2="7.35" y2="17"/>
      <line x1="20" y1="19" x2="16.65" y2="17"/>
      <line x1="4" y1="7" x2="7.35" y2="9"/>
      <line x1="20" y1="7" x2="16.65" y2="9"/>
    </svg>
  ),
  'ti-code': (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="7 8 3 12 7 16"/>
      <polyline points="17 8 21 12 17 16"/>
      <line x1="14" y1="4" x2="10" y2="20"/>
    </svg>
  ),
  'ti-checklist': (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.615 20h-2.615a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8"/>
      <polyline points="9 11 11 13 15 9"/>
      <path d="M16 19h6"/>
      <path d="M19 16v6"/>
    </svg>
  ),
  'ti-settings': (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
};

/* ── Single category card ──────────────────────────────────── */
function SkillCard({ category, delay, inView }) {
  const icon = ICONS[category.icon] ?? ICONS['ti-code'];

  return (
    <motion.div
      className="skill-cat-card"
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      custom={delay}
    >
      {/* Icon circle */}
      <div className="skill-cat-icon" aria-hidden="true">
        {icon}
      </div>

      {/* Category title */}
      <h3 className="skill-cat-title">{category.label}</h3>

      {/* Tag cloud */}
      <div className="skill-cat-tags">
        {category.tags.map(tag => (
          <span key={tag} className="skill-tag">{tag}</span>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Section ───────────────────────────────────────────────── */
export default function Skills() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 });
  const categories = t('skills.categories', { returnObjects: true });

  return (
    <section id="skills" className="skills-section" ref={ref}>
      <div className="skills-inner">
        <motion.h2
          className="section-title skills-title"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          custom={0}
        >
          {t('skills.title')}
        </motion.h2>

        <div className="skills-grid">
          {categories.map((cat, i) => (
            <SkillCard
              key={cat.id}
              category={cat}
              inView={inView}
              delay={0.1 + i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
