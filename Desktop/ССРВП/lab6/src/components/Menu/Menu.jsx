import {
  List, ListItemButton, ListItemIcon, ListItemText,
  Typography, Divider, Box, Drawer,
} from '@mui/material';
import AssignmentIcon   from '@mui/icons-material/Assignment';
import HookIcon         from '@mui/icons-material/AutoFixHigh';
import TimerIcon        from '@mui/icons-material/Timer';
import StorageIcon      from '@mui/icons-material/Storage';
import FeedbackIcon     from '@mui/icons-material/RateReview';
import ApiIcon          from '@mui/icons-material/Api';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink, useLocation } from 'react-router-dom';
import { labs } from '../../data/labs';

export const MENU_WIDTH = 260;

const DEMO_LINKS = [
  { to: '/hooks/state',  label: 'useState',         icon: <HookIcon          sx={{ fontSize: 20 }} /> },
  { to: '/hooks/effect', label: 'useEffect',        icon: <TimerIcon         sx={{ fontSize: 20 }} /> },
  { to: '/redux',        label: 'Redux',             icon: <StorageIcon       sx={{ fontSize: 20 }} /> },
  { to: '/feedback',     label: 'Обратная связь',   icon: <FeedbackIcon      sx={{ fontSize: 20 }} /> },
  { to: '/profile',      label: 'Профиль (PUT)',     icon: <AccountCircleIcon sx={{ fontSize: 20 }} /> },
];

function MenuContent({ onClose }) {
  const location = useLocation();

  const itemSx = (active) => ({
    borderRadius: 2,
    mb: 0.5,
    ...(active
      ? { bgcolor: 'rgba(97,218,251,.12)', '&:hover': { bgcolor: 'rgba(97,218,251,.18)' } }
      : { '&:hover': { bgcolor: 'rgba(255,255,255,.05)' } }),
  });

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* ── Раздел: лабораторные ── */}
      <Box sx={{ px: 2.5, pt: 2, pb: 1 }}>
        <Typography variant="overline"
          sx={{ color: '#9ab0c6', fontWeight: 700, letterSpacing: 1.2 }}>
          Лабораторные работы
        </Typography>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,.08)' }} />

      <List sx={{ px: 1, py: 1 }} disablePadding>
        {labs.map((lab) => {
          const active = location.pathname === `/lab/${lab.id}`;
          return (
            <ListItemButton
              key={lab.id}
              component={NavLink}
              to={`/lab/${lab.id}`}
              onClick={onClose}
              sx={itemSx(active)}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <AssignmentIcon
                  sx={{ fontSize: 20, color: active ? '#61dafb' : '#607082' }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2" fontWeight={active ? 700 : 500}
                    sx={{ color: active ? '#61dafb' : '#cdd3dd' }}>
                    Лаб. работа №{lab.id}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" sx={{ color: '#607082' }}>
                    {lab.subtitle}
                  </Typography>
                }
              />
            </ListItemButton>
          );
        })}
      </List>

      <Divider sx={{ borderColor: 'rgba(255,255,255,.08)', my: 0.5 }} />

      {/* ── Раздел: демо ── */}
      <Box sx={{ px: 2.5, pt: 1.5, pb: 1 }}>
        <Typography variant="overline"
          sx={{ color: '#9ab0c6', fontWeight: 700, letterSpacing: 1.2 }}>
          Демо
        </Typography>
      </Box>
      <List sx={{ px: 1, pb: 1 }} disablePadding>
        {DEMO_LINKS.map(({ to, label, icon }) => {
          const active = location.pathname === to;
          return (
            <ListItemButton
              key={to}
              component={NavLink}
              to={to}
              onClick={onClose}
              sx={itemSx(active)}
            >
              <ListItemIcon sx={{ minWidth: 36, color: active ? '#61dafb' : '#607082' }}>
                {icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2" fontWeight={active ? 700 : 500}
                    sx={{ color: active ? '#61dafb' : '#cdd3dd' }}>
                    {label}
                  </Typography>
                }
              />
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ mt: 'auto', px: 2.5, py: 1.5 }}>
        <Divider sx={{ borderColor: 'rgba(255,255,255,.08)', mb: 1 }} />
        <Typography variant="caption" sx={{ color: '#47535f' }}>
          Всего работ: {labs.length}
        </Typography>
      </Box>
    </Box>
  );
}

function Menu({ mobileOpen, onMobileClose }) {
  return (
    <>
      {/* Десктоп */}
      <Box component="nav"
        sx={{ width: MENU_WIDTH, flexShrink: 0, display: { xs: 'none', md: 'block' } }}>
        <Box sx={{ width: MENU_WIDTH, height: '100%', background: '#0f1923',
          borderRight: '1px solid rgba(255,255,255,.06)' }}>
          <MenuContent onClose={() => {}} />
        </Box>
      </Box>

      {/* Мобильный Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: MENU_WIDTH, background: '#0f1923',
            borderRight: '1px solid rgba(255,255,255,.06)',
          },
        }}
      >
        <MenuContent onClose={onMobileClose} />
      </Drawer>
    </>
  );
}

export default Menu;
