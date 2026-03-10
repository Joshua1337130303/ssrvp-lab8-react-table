import { useState, useMemo, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Box, createTheme, ThemeProvider as MuiThemeProvider, CssBaseline, CircularProgress } from '@mui/material';
import { Provider as ReduxProvider } from 'react-redux';

import { ThemeProvider, useTheme } from './context/ThemeContext';
import store from './store';

import Header     from './components/Header';
import Footer     from './components/Footer';
import Menu       from './components/Menu';
import BottomNav  from './components/BottomNav';

/* ── Lazy-импорты страниц (code splitting / chunks) ── */
const MainPage          = lazy(() => import('./pages/MainPage'));
const AboutPage         = lazy(() => import('./pages/AboutPage'));
const LabPage           = lazy(() => import('./pages/LabPage'));
const UseStatePage      = lazy(() => import('./pages/UseStatePage'));
const UseEffectPage     = lazy(() => import('./pages/UseEffectPage'));
const ReduxPage         = lazy(() => import('./pages/ReduxPage'));
const FeedbackPage      = lazy(() => import('./pages/FeedbackPage'));
const ProfilePage       = lazy(() => import('./pages/ProfilePage'));
const AuthPage          = lazy(() => import('./pages/AuthPage'));
const PostsPage         = lazy(() => import('./pages/PostsPage'));
const AdminUsersPage    = lazy(() => import('./pages/admin/AdminUsersPage'));
const AdminFeedbackPage = lazy(() => import('./pages/admin/AdminFeedbackPage'));

import { useLoginState, useIsAdmin } from './hooks/useLoginState';

/* ── Fallback-компонент при загрузке чанка ── */
function PageLoader() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
      <CircularProgress />
    </Box>
  );
}

/* ─────────────────────────── AdminGuard ── */
/**
 * Защита маршрутов администратора.
 * Если роль !== 'admin', перенаправляет на главную страницу.
 */
function AdminGuard({ children }) {
  const isAdmin = useIsAdmin();
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
}

/* ─────────────────────────── MainApp ── */
/**
 * MainApp — основной интерфейс приложения (рендерится только при isAuthenticated=true).
 * Меню — скрываемый Drawer для всех экранов, вызывается по кнопке-иконке в Header.
 */
function MainApp() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      {/* ── Header: навигация + переключение темы + профиль ── */}
      <Header onMenuToggle={() => setMenuOpen((v) => !v)} />

      {/* ── Скрываемый Drawer (для всех экранов) ── */}
      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* ── Content ── */}
      <Box component="main" sx={{ flex: 1, minWidth: 0, pb: { xs: 7, sm: 0 } }}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* ── Пользовательские маршруты ── */}
            <Route path="/"             element={<MainPage />} />
            <Route path="/about"        element={<AboutPage />} />
            <Route path="/lab/:id"      element={<LabPage />} />
            <Route path="/hooks/state"  element={<UseStatePage />} />
            <Route path="/hooks/effect" element={<UseEffectPage />} />
            <Route path="/redux"        element={<ReduxPage />} />
            <Route path="/feedback"     element={<FeedbackPage />} />
            <Route path="/profile"      element={<ProfilePage />} />
            <Route path="/posts"        element={<PostsPage />} />

            {/* ── Маршруты администратора (AdminGuard) ── */}
            <Route
              path="/admin/users"
              element={
                <AdminGuard>
                  <AdminUsersPage />
                </AdminGuard>
              }
            />
            <Route
              path="/admin/feedback"
              element={
                <AdminGuard>
                  <AdminFeedbackPage />
                </AdminGuard>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Box>

      {/* ── Footer (скрыт на мобильных — там BottomNav) ── */}
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Footer />
      </Box>

      {/* ── BottomNavigation — быстрые действия (только мобильные) ── */}
      <BottomNav />
    </Box>
  );
}

/* ─────────────────────────── AuthGuard ── */
/**
 * AuthGuard — условный рендеринг на основе useLoginState.
 * true  → MainApp (основное приложение)
 * false → AuthPage (форма авторизации/регистрации)
 */
function AuthGuard() {
  const isAuthenticated = useLoginState();
  return isAuthenticated
    ? <MainApp />
    : (
      <Suspense fallback={<PageLoader />}>
        <AuthPage />
      </Suspense>
    );
}

/* ─────────────────────────── AppShell ── */
/**
 * AppShell — читает режим темы из ThemeContext и строит MUI тему динамически.
 */
function AppShell() {
  const { mode } = useTheme();

  const muiTheme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: '#1a1a2e' },
      background: {
        default: mode === 'light' ? '#f0f2f5' : '#0d1117',
        paper:   mode === 'light' ? '#ffffff'  : '#161b22',
      },
    },
    typography: { fontFamily: "'Segoe UI', system-ui, Arial, sans-serif" },
    shape: { borderRadius: 10 },
  }), [mode]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <AuthGuard />
    </MuiThemeProvider>
  );
}

/* ─────────────────────────── App ── */
/**
 * App — корневой компонент.
 * BrowserRouter → ReduxProvider → ThemeProvider (Context) → AppShell → AuthGuard
 */
function App() {
  return (
    <BrowserRouter>
      <ReduxProvider store={store}>
        <ThemeProvider>
          <AppShell />
        </ThemeProvider>
      </ReduxProvider>
    </BrowserRouter>
  );
}

export default App;
