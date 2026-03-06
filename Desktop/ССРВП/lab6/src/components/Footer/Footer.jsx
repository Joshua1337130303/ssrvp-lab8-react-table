import { Box, Container, Typography, Divider, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

/**
 * Компонент Footer
 */
function Footer() {
  return (
    <Box
      component="footer"
      sx={{ background: '#1a1a2e', color: '#8892a0', mt: 'auto', py: 3 }}
    >
      <Divider sx={{ borderColor: 'rgba(255,255,255,.08)', mb: 3 }} />
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
          }}
        >
          <Typography variant="body2">
            © 2024 ССРВП — Лабораторные работы
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <GitHubIcon sx={{ fontSize: 16 }} />
            <Link
              href="https://github.com/Joshua1337-baboon/ssrvp-lab2-react"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{ color: '#8892a0', fontSize: '0.82rem' }}
            >
              ssrvp-lab2-react
            </Link>
          </Box>

          <Typography variant="body2" sx={{ fontSize: '0.78rem' }}>
            React 19 + Vite 7 + MUI v6
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
