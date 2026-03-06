import { useSelector } from 'react-redux';

/**
 * useLoginState — кастомный хук для проверки статуса авторизации.
 * Читает состояние из Redux store (auth.isAuthenticated).
 *
 * @returns {boolean} true — пользователь авторизован, false — нет
 */
export function useLoginState() {
  return useSelector((state) => state.auth.isAuthenticated);
}

/**
 * useCurrentUser — кастомный хук для получения данных текущего пользователя.
 *
 * @returns {{ name: string, login: string, email: string, role: string } | null}
 */
export function useCurrentUser() {
  return useSelector((state) => state.auth.user);
}

/**
 * useIsAdmin — проверяет, является ли текущий пользователь администратором.
 *
 * @returns {boolean}
 */
export function useIsAdmin() {
  return useSelector((state) => state.auth.user?.role === 'admin');
}
