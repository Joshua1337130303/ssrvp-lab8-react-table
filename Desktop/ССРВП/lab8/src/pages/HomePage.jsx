import { useState } from 'react';
import Button from '../components/Button';
import Container from '../components/Container';
import styles from './HomePage.module.css';

function HomePage() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');

  const handleHello = () => setMessage('Hello, World! 👋');
  const handleReset  = () => { setMessage(''); setCount(0); };

  return (
    <>
      {/* ── Hero ───────────────────────────────────── */}
      <section id="home" className={styles.hero}>
        <Container centered>
          <h1 className={styles.title}>Hello, World! 🌍</h1>
          <p className={styles.subtitle}>
            Лабораторная работа №2 — React + Vite
          </p>
          <div className={styles.actions}>
            <Button onClick={handleHello}>Сказать привет</Button>
            <Button variant="secondary" onClick={handleReset}>Сбросить</Button>
          </div>
          {message && <p className={styles.message}>{message}</p>}
        </Container>
      </section>

      {/* ── About ──────────────────────────────────── */}
      <section id="about" className={styles.section}>
        <h2>О проекте</h2>
        <p>
          Проект создан с помощью <strong>Vite</strong> и <strong>React</strong>.
          Демонстрирует базовые концепции: компоненты, пропсы, хуки состояния.
        </p>
      </section>

      {/* ── Components demo ────────────────────────── */}
      <section id="components" className={styles.section}>
        <h2>Компоненты</h2>

        <h3>Button</h3>
        <div className={styles.row}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button disabled>Disabled</Button>
        </div>

        <h3 style={{ marginTop: '24px' }}>Counter (useState)</h3>
        <div className={styles.row}>
          <Button variant="danger"    onClick={() => setCount((c) => c - 1)}>−</Button>
          <span className={styles.counter}>{count}</span>
          <Button variant="primary"   onClick={() => setCount((c) => c + 1)}>+</Button>
        </div>

        <h3 style={{ marginTop: '24px' }}>Container</h3>
        <div className={styles.containerDemo}>
          <p>Этот блок обёрнут в компонент <code>{'<Container>'}</code>.</p>
          <p>Он ограничивает ширину контента и добавляет боковые отступы.</p>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────── */}
      <section id="contact" className={styles.section}>
        <h2>Контакты</h2>
        <p>Email: <a href="mailto:student@university.ru">student@university.ru</a></p>
      </section>
    </>
  );
}

export default HomePage;
