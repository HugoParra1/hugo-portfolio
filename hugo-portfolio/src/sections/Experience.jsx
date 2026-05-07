import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Experience.css';

/* ── Individual animated card ──────────────────────────────── */
function ExperienceCard({ job, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <motion.div
      ref={ref}
      className={`exp-card ${job.current ? 'exp-card--current' : ''}`}
      initial={{ opacity: 0, x: 48 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.05 * index }}
    >
      {/* Header */}
      <div className="exp-header">
        <div className="exp-header-left">
          <span className="exp-company">{job.company}</span>
          {job.current && <span className="exp-badge">● Now</span>}
        </div>
        <span className="exp-period">{job.period}</span>
      </div>

      <p className="exp-role">{job.role}</p>

      {job.project && (
        <p className="exp-project">{job.project}</p>
      )}

      {/* Highlight list */}
      <ul className="exp-highlights">
        {job.highlights.map((item, i) => (
          <li key={i} className="exp-highlight-item">
            <span className="exp-bullet" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>

      {/* Tags */}
      <div className="exp-tags">
        {job.tags.map(tag => (
          <span key={tag} className="exp-tag">{tag}</span>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Timeline node ─────────────────────────────────────────── */
function TimelineNode({ current }) {
  return (
    <div className={`timeline-node ${current ? 'timeline-node--current' : ''}`}>
      <div className="timeline-dot" />
    </div>
  );
}

/* ── Section ───────────────────────────────────────────────── */
export default function Experience() {
  const { t } = useTranslation();
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const jobs = t('experience.jobs', { returnObjects: true });

  return (
    <section id="experience" className="exp-section">
      <div className="exp-inner">
        <motion.h2
          ref={titleRef}
          className="section-title exp-title"
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {t('experience.title')}
        </motion.h2>

        <div className="timeline">
          {/* Vertical line */}
          <div className="timeline-line" aria-hidden="true" />

          {jobs.map((job, index) => (
            <div key={job.id} className="timeline-row">
              <TimelineNode current={job.current} />
              <ExperienceCard job={job} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
