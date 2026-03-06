import styles from './Container.module.css';

/**
 * Компонент Container
 * Обёртка для контента с максимальной шириной и отступами.
 * Props:
 *   children  — дочерние элементы
 *   centered  — boolean, центрировать ли содержимое (по умолчанию false)
 */
function Container({ children, centered = false }) {
  return (
    <div className={`${styles.container} ${centered ? styles.centered : ''}`}>
      {children}
    </div>
  );
}

export default Container;
