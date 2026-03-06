import { Box, Container, Typography, Divider, Link, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

/**
 * Footer — лаб. работа №7
 * Отображается только на sm+ (на мобильных заменён BottomNav).
 */
function Footer() {
  return (
    <Box
      component="footer"
      sx={{ background: '#1a1a2e', color: '#8892a0', mt: 'auto', py: 3 }}
    >
      <Divider sx={{ borderColor: 'rgba(255,255,255,.08)', mb: 3 }} />
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          gap={1}
        >
          <Typography variant="body2">
            © 2026 ССРВП — Лабораторные работы
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <GitHubIcon sx={{ fontSize: 16 }} />
            <Link
              href="https://github.com/Joshua1337-baboon/ssrvp-lab7"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{ color: '#8892a0', fontSize: '0.82rem' }}
            >
              github.com/Joshua1337-baboon/ssrvp-lab7
            </Link>
          </Box>

          <Typography variant="body2" sx={{ fontSize: '0.78rem' }}>
            React 19 + Vite 7 + MUI v7
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
