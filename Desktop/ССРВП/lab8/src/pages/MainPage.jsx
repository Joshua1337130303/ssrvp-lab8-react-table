import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button, Grid, Paper, Chip, Stack, Divider,
} from '@mui/material';
import SchoolIcon     from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CodeIcon       from '@mui/icons-material/Code';
import StorageIcon    from '@mui/icons-material/Storage';
import { labs } from '../data/labs';

/**
 * MainPage — страница «Главная» (маршрут "/")
 * Обзор проекта, список лабораторных работ, технологии.
 */
function MainPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 900, mx: 'auto' }}>

      {/* ── Hero ── */}
      <Box sx={{ textAlign: 'center', py: { xs: 4, md: 6 } }}>
        <SchoolIcon sx={{ fontSize: 64, color: '#61dafb', mb: 2 }} />
        <Typography variant="h3" fontWeight={800} gutterBottom>
          ССРВП — Лабораторные работы
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3, maxWidth: 560, mx: 'auto' }}>
          Современные средства разработки веб-приложений
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
          <Button
            variant="contained"
            size="large"
            startIcon={<AssignmentIcon />}
            onClick={() => navigate('/lab/1')}
            sx={{ fontWeight: 700, bgcolor: '#1a1a2e', '&:hover': { bgcolor: '#16213e' } }}
          >
            Смотреть работы
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<CodeIcon />}
            onClick={() => navigate('/about')}
          >
            О себе
          </Button>
        </Stack>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* ── Список лабораторных ── */}
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Выполненные лабораторные работы
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {labs.map((lab) => (
          <Grid item xs={12} sm={6} key={lab.id}>
            <Paper
              variant="outlined"
              sx={{
                p: 2.5, borderRadius: 3, cursor: 'pointer',
                borderLeft: `4px solid ${lab.color}`,
                transition: 'box-shadow .2s',
                '&:hover': { boxShadow: 4 },
              }}
              onClick={() => navigate(`/lab/${lab.id}`)}
            >
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                Лаб. работа №{lab.id}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                {lab.subtitle}
              </Typography>
              <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                {lab.tech.map((t) => (
                  <Chip key={t} label={t} size="small" variant="outlined"
                    sx={{ fontSize: 11, borderColor: lab.color, color: lab.color }} />
                ))}
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ mb: 4 }} />

      {/* ── Технологии ── */}
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Технологии проекта
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
        {['React 19', 'Vite 7', 'MUI v7', 'Redux Toolkit', 'React Router v7',
          'React Hook Form', 'axios', 'json-server'].map((tech) => (
          <Chip key={tech} label={tech} icon={<StorageIcon />}
            variant="outlined" sx={{ fontWeight: 600 }} />
        ))}
      </Stack>
    </Box>
  );
}

export default MainPage;
