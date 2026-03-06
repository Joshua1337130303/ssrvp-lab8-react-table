import {
  Box,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
  Paper,
  Stack,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CodeIcon from '@mui/icons-material/Code';
import { labs } from '../../data/labs';

/**
 * Компонент Content — отображает содержимое выбранной лабораторной работы.
 * Props:
 *   selectedId — id выбранной лаб. работы
 */
function Content({ selectedId }) {
  const lab = labs.find((l) => l.id === selectedId);

  if (!lab) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="text.secondary">Выберите лабораторную работу в меню</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 820 }}>
      {/* ── Заголовок ── */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
          <Box
            sx={{
              width: 10,
              height: 36,
              borderRadius: 1,
              bgcolor: lab.color,
              flexShrink: 0,
            }}
          />
          <Box>
            <Typography variant="h4" fontWeight={800} lineHeight={1.2}>
              {lab.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {lab.subtitle}
            </Typography>
          </Box>
        </Stack>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {lab.description}
        </Typography>

        {/* Технологии */}
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {lab.tech.map((t) => (
            <Chip
              key={t}
              label={t}
              size="small"
              icon={<CodeIcon />}
              sx={{ bgcolor: `${lab.color}18`, color: lab.color, fontWeight: 600 }}
            />
          ))}
        </Stack>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* ── Список заданий ── */}
      <Paper variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden', mb: 3 }}>
        <Box sx={{ px: 3, py: 2, bgcolor: `${lab.color}0d` }}>
          <Typography variant="subtitle2" fontWeight={700} color="text.secondary" letterSpacing={0.8} textTransform="uppercase">
            Выполненные задания
          </Typography>
        </Box>
        <List disablePadding>
          {lab.topics.map((topic, i) => (
            <ListItem
              key={i}
              divider={i < lab.topics.length - 1}
              sx={{ py: 1.2, px: 3 }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CheckCircleOutlineIcon sx={{ color: lab.color, fontSize: 20 }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2" fontWeight={500}>
                    {topic}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* ── Ссылка на репозиторий (если есть) ── */}
      {lab.repoUrl && (
        <Button
          variant="contained"
          endIcon={<OpenInNewIcon />}
          href={lab.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ bgcolor: lab.color, '&:hover': { bgcolor: lab.color, opacity: 0.85 } }}
        >
          Открыть репозиторий на GitHub
        </Button>
      )}
    </Box>
  );
}

export default Content;
