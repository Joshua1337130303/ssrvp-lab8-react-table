import Navbar from '../Navbar';
import Container from '../Container';
import styles from './Layout.module.css';

/**
 * Layout — шаблон страницы.
 * Структура: <Navbar /> + <main> + <footer>
 */
function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Navbar />

      <main className={styles.main}>
        <Container>{children}</Container>
      </main>

      <footer className={styles.footer}>
        <Container centered>
          <p>© 2024 Лабораторная работа №2 — ССРВП</p>
        </Container>
      </footer>
    </div>
  );
}

export default Layout;
