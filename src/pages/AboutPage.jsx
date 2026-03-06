import {
  Box, Typography, Paper, Avatar, Chip, Stack, Divider, Link,
} from '@mui/material';
import GitHubIcon    from '@mui/icons-material/GitHub';
import SchoolIcon    from '@mui/icons-material/School';
import CodeIcon      from '@mui/icons-material/Code';
import { labs }      from '../data/labs';
import { useCurrentUser } from '../hooks/useLoginState';

/**
 * AboutPage — страница «О себе» (маршрут "/about")
 * Информация о студенте, курсе и репозитории.
 */
function AboutPage() {
  const user = useCurrentUser();

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        О себе
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Страница с информацией о студенте и выполненном курсе лабораторных работ.
      </Typography>

      {/* ── Карточка студента ── */}
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, mb: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <Avatar
            sx={{
              width: 72, height: 72, fontSize: 26, fontWeight: 700,
              bgcolor: '#1a1a2e', color: '#61dafb',
            }}
          >
            {user?.name
              ? user.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
              : 'ST'}
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight={700}>
              {user?.name ?? 'Студент'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email ?? 'student@university.ru'}
            </Typography>
            <Chip label={`@${user?.login ?? 'login'}`} size="small"
              variant="outlined" sx={{ mt: 0.5 }} />
          </Box>
        </Stack>
      </Paper>

      {/* ── Курс ── */}
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, mb: 3 }}>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
          <SchoolIcon sx={{ color: '#61dafb' }} />
          <Typography variant="h6" fontWeight={700}>Курс</Typography>
        </Stack>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1" gutterBottom>
          <strong>Дисциплина:</strong> Современные средства разработки веб-приложений (ССРВП)
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Выполнено лабораторных:</strong> {labs.length}
        </Typography>
        <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5} sx={{ mt: 1.5 }}>
          {labs.map((lab) => (
            <Chip
              key={lab.id}
              label={`Лаб. №${lab.id}`}
              size="small"
              sx={{ bgcolor: lab.color, color: '#fff', fontWeight: 600, fontSize: 11 }}
            />
          ))}
        </Stack>
      </Paper>

      {/* ── Технологии ── */}
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, mb: 3 }}>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
          <CodeIcon sx={{ color: '#61dafb' }} />
          <Typography variant="h6" fontWeight={700}>Технологии</Typography>
        </Stack>
        <Divider sx={{ mb: 2 }} />
        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
          {['React 19', 'Vite 7', 'MUI v7', 'Redux Toolkit', 'React Router v7',
            'React Hook Form', 'axios', 'json-server', 'JavaScript ES2024'].map((t) => (
            <Chip key={t} label={t} variant="outlined" size="small" sx={{ fontWeight: 500 }} />
          ))}
        </Stack>
      </Paper>

      {/* ── Репозиторий ── */}
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
          <GitHubIcon sx={{ color: '#61dafb' }} />
          <Typography variant="h6" fontWeight={700}>Репозиторий</Typography>
        </Stack>
        <Divider sx={{ mb: 2 }} />
        <Link
          href="https://github.com/Joshua1337-baboon/ssrvp-lab7"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          sx={{ fontWeight: 600, fontSize: '1rem' }}
        >
          github.com/Joshua1337-baboon/ssrvp-lab7
        </Link>
      </Paper>
    </Box>
  );
}

export default AboutPage;
