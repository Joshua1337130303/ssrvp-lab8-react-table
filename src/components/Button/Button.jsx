import styles from './Button.module.css';

/**
 * Компонент Button
 * Props:
 *   children  — текст/содержимое кнопки
 *   onClick   — обработчик клика
 *   variant   — 'primary' | 'secondary' | 'danger'  (по умолчанию 'primary')
 *   disabled  — boolean
 */
function Button({ children, onClick, variant = 'primary', disabled = false }) {
  return (
    <button
      className={`${styles.btn} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
