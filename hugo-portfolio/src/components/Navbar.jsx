import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const NAV_LINKS = [
  { key: 'nav.about',      href: '#about'      },
  { key: 'nav.experience', href: '#experience' },
  { key: 'nav.skills',     href: '#skills'     },
  { key: 'nav.contact',    href: '#contact'    },
];

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { theme, toggle: toggleTheme } = useTheme();
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [scrolled,   setScrolled]   = useState(false);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleLang = () => i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
  const handleLinkClick = (href) => { setActiveLink(href); setMenuOpen(false); };

  return (
    <header
      className="navbar-wrapper"
      style={{ boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.25)' : 'none' }}
    >
      <nav className="navbar-inner">
        {/* Logo */}
        <a href="#hero" className="nav-logo" onClick={() => setActiveLink('')}>
          <span className="nav-logo-circle">HP</span>
        </a>

        {/* Desktop Links */}
        <ul className="nav-links">
          {NAV_LINKS.map(({ key, href }) => (
            <li key={href} className="nav-link-item">
              <a href={href} className="nav-link" onClick={() => handleLinkClick(href)}>
                {t(key)}
                {activeLink === href && (
                  <motion.span
                    className="nav-link-underline"
                    layoutId="nav-underline"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="nav-controls">
          {/* Theme toggle */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -30, opacity: 0 }}
                animate={{ rotate: 0,   opacity: 1 }}
                exit={{   rotate:  30,  opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'flex' }}
              >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </motion.span>
            </AnimatePresence>
          </button>

          {/* Language toggle */}
          <button className="lang-toggle" onClick={toggleLang} aria-label="Toggle language">
            <span className={i18n.language === 'es' ? 'lang-active' : ''}>ES</span>
            <span className="lang-sep">/</span>
            <span className={i18n.language === 'en' ? 'lang-active' : ''}>EN</span>
          </button>

          {/* Hamburger */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`ham-bar ${menuOpen ? 'ham-open-top' : ''}`} />
            <span className={`ham-bar ${menuOpen ? 'ham-open-mid' : ''}`} />
            <span className={`ham-bar ${menuOpen ? 'ham-open-bot' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <ul className="mobile-nav-links">
              {NAV_LINKS.map(({ key, href }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={href}
                    className={`mobile-nav-link ${activeLink === href ? 'mobile-nav-link--active' : ''}`}
                    onClick={() => handleLinkClick(href)}
                  >
                    {t(key)}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <button className="lang-toggle lang-toggle--mobile" onClick={toggleLang}>
                <span className={i18n.language === 'es' ? 'lang-active' : ''}>ES</span>
                <span className="lang-sep">/</span>
                <span className={i18n.language === 'en' ? 'lang-active' : ''}>EN</span>
              </button>
              <button className="theme-toggle" onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
