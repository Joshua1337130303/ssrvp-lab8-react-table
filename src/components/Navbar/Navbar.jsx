import { useState } from 'react';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'Главная',   href: '#home' },
  { label: 'О проекте', href: '#about' },
  { label: 'Компоненты', href: '#components' },
  { label: 'Контакты',  href: '#contact' },
];

/**
 * Компонент Navbar — навигационная панель.
 * Поддерживает активную ссылку и мобильное бургер-меню.
 */
function Navbar() {
  const [active, setActive]   = useState('#home');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>⚛️ Lab 2 — React</div>

      {/* Бургер для мобильных */}
      <button
        className={styles.burger}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Открыть меню"
      >
        <span /><span /><span />
      </button>

      <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
        {NAV_LINKS.map(({ label, href }) => (
          <li key={href}>
            <a
              href={href}
              className={active === href ? styles.activeLink : ''}
              onClick={() => { setActive(href); setMenuOpen(false); }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
