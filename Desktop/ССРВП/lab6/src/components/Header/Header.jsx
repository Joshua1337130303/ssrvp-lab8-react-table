import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, IconButton, Box, Tooltip,
  Avatar, Menu, MenuItem, ListItemIcon, Divider,
} from '@mui/material';
import MenuIcon        from '@mui/icons-material/Menu';
import SchoolIcon      from '@mui/icons-material/School';
import LightModeIcon   from '@mui/icons-material/LightMode';
import DarkModeIcon    from '@mui/icons-material/DarkMode';
import LogoutIcon      from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon         from '@mui/icons-material/Edit';
import { useTheme }    from '../../context/ThemeContext';
import { useCurrentUser } from '../../hooks/useLoginState';
import { logout }      from '../../store/authSlice';

/**
 * Компонент Header
 * Props:
 *   onMenuToggle — колбэк открытия/закрытия бокового меню (мобильные)
 *
 * Использует ThemeContext для переключения темы.
 * Отображает профиль пользователя с кнопкой разлогина (верхний правый угол).
 */
function Header({ onMenuToggle }) {
  const { mode, toggleTheme } = useTheme();
  const dispatch   = useDispatch();
  const navigate   = useNavigate();
  const user       = useCurrentUser();
  const [anchor, setAnchor] = useState(null);

  const initials = user?.name
    ? user.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
    : '?';

  const handleLogout = () => {
    setAnchor(null);
    dispatch(logout());
  };

  return (
    <AppBar position="sticky"
      sx={{ background: 'linear-gradient(90deg, #1a1a2e 0%, #16213e 100%)' }}>
      <Toolbar>
        {/* Бургер (только мобильные) */}
        <IconButton color="inherit" edge="start" onClick={onMenuToggle}
          sx={{ mr: 1, display: { md: 'none' } }} aria-label="открыть меню">
          <MenuIcon />
        </IconButton>

        {/* Логотип */}
        <SchoolIcon sx={{ color: '#61dafb', mr: 1.5, fontSize: 28 }} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" fontWeight={700} lineHeight={1.2}>
            ССРВП — Лабораторные работы
          </Typography>
          <Typography variant="caption" sx={{ color: '#9ab0c6', lineHeight: 1 }}>
            Современные средства разработки веб-приложений
          </Typography>
        </Box>

        {/* Переключатель темы (Context) */}
        <Tooltip title={mode === 'light' ? 'Тёмная тема' : 'Светлая тема'}>
          <IconButton color="inherit" onClick={toggleTheme} aria-label="переключить тему">
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon sx={{ color: '#ffd54f' }} />}
          </IconButton>
        </Tooltip>

        {/* ── Профиль пользователя (верхний правый угол) ── */}
        {user && (
          <>
            <Tooltip title={`${user.name} (${user.login})`}>
              <IconButton onClick={(e) => setAnchor(e.currentTarget)} sx={{ ml: 1, p: 0.5 }}>
                <Avatar
                  sx={{
                    width: 36, height: 36, fontSize: 14, fontWeight: 700,
                    bgcolor: '#61dafb', color: '#1a1a2e',
                  }}
                >
                  {initials}
                </Avatar>
              </IconButton>
            </Tooltip>

            {/* Dropdown меню профиля */}
            <Menu
              anchorEl={anchor}
              open={Boolean(anchor)}
              onClose={() => setAnchor(null)}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{ sx: { minWidth: 200, mt: 0.5 } }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="subtitle2" fontWeight={700}>{user.name}</Typography>
                <Typography variant="caption" color="text.secondary">@{user.login}</Typography>
                {user.email && (
                  <Typography variant="caption" color="text.secondary" display="block">
                    {user.email}
                  </Typography>
                )}
              </Box>
              <Divider />
              <MenuItem onClick={() => { setAnchor(null); navigate('/profile'); }}>
                <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
                Редактировать профиль
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                <ListItemIcon><LogoutIcon fontSize="small" sx={{ color: 'error.main' }} /></ListItemIcon>
                Выйти
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
