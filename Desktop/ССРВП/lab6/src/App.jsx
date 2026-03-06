import { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Box, createTheme, ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { Provider as ReduxProvider } from 'react-redux';

import { ThemeProvider, useTheme } from './context/ThemeContext';
import store from './store';

import Header   from './components/Header';
import Footer   from './components/Footer';
import Menu     from './components/Menu';

import LabPage        from './pages/LabPage';
import UseStatePage   from './pages/UseStatePage';
import UseEffectPage  from './pages/UseEffectPage';
import ReduxPage      from './pages/ReduxPage';
import FeedbackPage   from './pages/FeedbackPage';
import ProfilePage    from './pages/ProfilePage';
import AuthPage       from './pages/AuthPage';

import { useLoginState } from './hooks/useLoginState';

/**
 * MainApp — основной интерфейс приложения (рендерится только при isAuthenticated=true).
 * Header с профилем пользователя, боковое меню, роуты.
 */
function MainApp() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      {/* ── Header (переключение темы + профиль пользователя) ── */}
      <Header onMenuToggle={() => setMobileMenuOpen((v) => !v)} />

      {/* ── Body ── */}
      <Box sx={{ display: 'flex', flex: 1 }}>

        {/* ── Menu (ссылки через React Router NavLink) ── */}
        <Menu
          mobileOpen={mobileMenuOpen}
          onMobileClose={() => setMobileMenuOpen(false)}
        />

        {/* ── Content (обработчик роутов) ── */}
        <Box component="main" sx={{ flex: 1, minWidth: 0 }}>
          <Routes>
            <Route path="/"             element={<Navigate to="/lab/1" replace />} />
            <Route path="/lab/:id"      element={<LabPage />} />
            <Route path="/hooks/state"  element={<UseStatePage />} />
            <Route path="/hooks/effect" element={<UseEffectPage />} />
            <Route path="/redux"        element={<ReduxPage />} />
            <Route path="/feedback"     element={<FeedbackPage />} />
            <Route path="/profile"      element={<ProfilePage />} />
            <Route path="*"             element={<Navigate to="/lab/1" replace />} />
          </Routes>
        </Box>
      </Box>

      {/* ── Footer ── */}
      <Footer />
    </Box>
  );
}

/**
 * AuthGuard — условный рендеринг на основе useLoginState.
 * true  → MainApp (основное приложение)
 * false → AuthPage (форма авторизации/регистрации)
 */
function AuthGuard() {
  const isAuthenticated = useLoginState();
  return isAuthenticated ? <MainApp /> : <AuthPage />;
}

/**
 * AppShell — внутренняя оболочка.
 * Читает режим темы из ThemeContext и строит MUI тему динамически.
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

/**
 * App — корневой компонент.
 * Порядок провайдеров:
 *   BrowserRouter → ReduxProvider → ThemeProvider (Context) → AppShell → AuthGuard
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
