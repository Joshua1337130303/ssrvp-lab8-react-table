import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, IconButton, Box, Tooltip,
  Avatar, Menu, MenuItem, ListItemIcon, Divider, Button,
} from '@mui/material';
import MenuIcon      from '@mui/icons-material/Menu';
import SchoolIcon    from '@mui/icons-material/School';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon  from '@mui/icons-material/DarkMode';
import LogoutIcon    from '@mui/icons-material/Logout';
import EditIcon      from '@mui/icons-material/Edit';
import HomeIcon      from '@mui/icons-material/Home';
import PersonIcon    from '@mui/icons-material/Person';
import { useTheme }      from '../../context/ThemeContext';
import { useCurrentUser } from '../../hooks/useLoginState';
import { logout }        from '../../store/authSlice';

/**
 * Header — лаб. работа №7
 * Props:
 *   onMenuToggle — открытие/закрытие бокового Drawer (все экраны)
 *
 * Навигация: «Главная» и «О себе».
 * Переключение темы перенесено в Header из Context-кнопки.
 * Профиль пользователя — MUI Avatar + Dropdown (стандарт MUI).
 */
function Header({ onMenuToggle }) {
  const { mode, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user     = useCurrentUser();
  const [anchor, setAnchor] = useState(null);

  const initials = user?.name
    ? user.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
    : '?';

  const handleLogout = () => {
    setAnchor(null);
    dispatch(logout());
  };

  /* Стиль NavLink-кнопки */
  const navStyle = ({ isActive }) => ({
    color: isActive ? '#61dafb' : 'rgba(255,255,255,0.85)',
    fontWeight: isActive ? 700 : 500,
    textTransform: 'none',
    fontSize: '0.95rem',
    borderBottom: isActive ? '2px solid #61dafb' : '2px solid transparent',
    borderRadius: 0,
    paddingBottom: '4px',
    minWidth: 0,
  });

  return (
    <AppBar position="sticky"
      sx={{ background: 'linear-gradient(90deg, #1a1a2e 0%, #16213e 100%)' }}>
      <Toolbar>

        {/* ── Бургер — открывает Drawer для всех экранов ── */}
        <Tooltip title="Меню лабораторных">
          <IconButton color="inherit" edge="start" onClick={onMenuToggle}
            sx={{ mr: 1 }} aria-label="открыть меню">
            <MenuIcon />
          </IconButton>
        </Tooltip>

        {/* ── Логотип ── */}
        <SchoolIcon sx={{ color: '#61dafb', mr: 1, fontSize: 26 }} />
        <Typography variant="h6" fontWeight={700}
          sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}>
          ССРВП
        </Typography>

        {/* ── Навигация: Главная / О себе ── */}
        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', mr: 'auto' }}>
          <Button
            component={NavLink}
            to="/"
            end
            startIcon={<HomeIcon sx={{ fontSize: 18 }} />}
            style={navStyle}
          >
            Главная
          </Button>
          <Button
            component={NavLink}
            to="/about"
            startIcon={<PersonIcon sx={{ fontSize: 18 }} />}
            style={navStyle}
          >
            О себе
          </Button>
        </Box>

        {/* ── Переключатель темы (ThemeContext) ── */}
        <Tooltip title={mode === 'light' ? 'Тёмная тема' : 'Светлая тема'}>
          <IconButton color="inherit" onClick={toggleTheme} aria-label="переключить тему">
            {mode === 'light'
              ? <DarkModeIcon />
              : <LightModeIcon sx={{ color: '#ffd54f' }} />}
          </IconButton>
        </Tooltip>

        {/* ── Профиль пользователя (MUI Avatar + Dropdown) ── */}
        {user && (
          <>
            <Tooltip title={`${user.name} (@${user.login})`}>
              <IconButton onClick={(e) => setAnchor(e.currentTarget)} sx={{ ml: 0.5, p: 0.5 }}>
                <Avatar sx={{
                  width: 36, height: 36, fontSize: 14, fontWeight: 700,
                  bgcolor: '#61dafb', color: '#1a1a2e',
                }}>
                  {initials}
                </Avatar>
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchor}
              open={Boolean(anchor)}
              onClose={() => setAnchor(null)}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{ sx: { minWidth: 210, mt: 0.5 } }}
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
                <ListItemIcon>
                  <LogoutIcon fontSize="small" sx={{ color: 'error.main' }} />
                </ListItemIcon>
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
