import { createContext, useContext, useState, useMemo } from 'react';

/**
 * ThemeContext — контекст для переключения светлой/тёмной темы.
 * Предоставляет: { mode, toggleTheme }
 */
const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light');

  const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  // Мемоизируем значение контекста, чтобы не вызывать лишних ре-рендеров
  const value = useMemo(() => ({ mode, toggleTheme }), [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/** Хук для удобного доступа к контексту темы */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
