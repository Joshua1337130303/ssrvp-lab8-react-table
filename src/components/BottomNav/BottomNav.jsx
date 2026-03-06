import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Paper, BottomNavigation, BottomNavigationAction, Box,
} from '@mui/material';
import HomeIcon          from '@mui/icons-material/Home';
import AssignmentIcon    from '@mui/icons-material/Assignment';
import RateReviewIcon    from '@mui/icons-material/RateReview';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon        from '@mui/icons-material/Person';

/**
 * BottomNav — нижняя панель быстрых действий (только мобильные, xs/sm).
 * Позиционируется fixed внизу экрана.
 * Содержит: Главная, Лабораторные, Обратная связь, Профиль, О себе.
 */
const NAV_ITEMS = [
  { label: 'Главная',      icon: <HomeIcon />,          to: '/' },
  { label: 'Лабораторные', icon: <AssignmentIcon />,    to: '/lab/1' },
  { label: 'Отзывы',       icon: <RateReviewIcon />,    to: '/feedback' },
  { label: 'Профиль',      icon: <AccountCircleIcon />, to: '/profile' },
  { label: 'О себе',       icon: <PersonIcon />,         to: '/about' },
];

function BottomNav() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [value, setValue] = useState(0);

  /* Синхронизируем активный пункт с текущим маршрутом */
  useEffect(() => {
    const idx = NAV_ITEMS.findIndex(({ to }) =>
      to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)
    );
    setValue(idx >= 0 ? idx : 0);
  }, [location.pathname]);

  return (
    <Box
      sx={{
        display: { xs: 'block', sm: 'none' },
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: (t) => t.zIndex.appBar,
      }}
    >
      <Paper elevation={8} sx={{ borderRadius: 0 }}>
        <BottomNavigation
          value={value}
          onChange={(_, newValue) => {
            setValue(newValue);
            navigate(NAV_ITEMS[newValue].to);
          }}
          showLabels
          sx={{ bgcolor: '#1a1a2e', '& .MuiBottomNavigationAction-root': { color: '#607082' } }}
        >
          {NAV_ITEMS.map(({ label, icon }) => (
            <BottomNavigationAction
              key={label}
              label={label}
              icon={icon}
              sx={{
                '&.Mui-selected': { color: '#61dafb' },
                fontSize: '0.65rem',
                minWidth: 0,
              }}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default BottomNav;
