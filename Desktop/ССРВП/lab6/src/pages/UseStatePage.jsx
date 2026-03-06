import { useState } from 'react';
import {
  Box, Typography, Paper, Divider, TextField,
  Chip, Stack, Button as MuiButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

/**
 * UseStatePage — демонстрация хука useState.
 * Примеры:
 *   1. Счётчик (number state)
 *   2. Текстовый ввод (string state)
 *   3. Переключатель (boolean state)
 *   4. Список (array state)
 */
function UseStatePage() {
  // 1. Числовое состояние
  const [count, setCount] = useState(0);

  // 2. Строковое состояние
  const [text, setText] = useState('');

  // 3. Булевое состояние
  const [isVisible, setIsVisible] = useState(true);

  // 4. Массив
  const [items, setItems] = useState(['React', 'Vite']);
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim()) {
      setItems((prev) => [...prev, newItem.trim()]);
      setNewItem('');
    }
  };

  const removeItem = (idx) => setItems((prev) => prev.filter((_, i) => i !== idx));

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 700 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        useState
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Хук <code>useState</code> добавляет локальное состояние в функциональный компонент.
        При изменении состояния React перерисовывает компонент.
      </Typography>

      {/* ── 1. Числовое состояние ── */}
      <Paper variant="outlined" sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
          1. Числовое состояние — счётчик
        </Typography>
        <Stack direction="row" alignItems="center" spacing={2}>
          <MuiButton variant="outlined" color="error" startIcon={<RemoveIcon />}
            onClick={() => setCount((c) => c - 1)}>
            -1
          </MuiButton>
          <Typography variant="h4" fontWeight={700} sx={{ minWidth: 60, textAlign: 'center' }}>
            {count}
          </Typography>
          <MuiButton variant="outlined" color="success" startIcon={<AddIcon />}
            onClick={() => setCount((c) => c + 1)}>
            +1
          </MuiButton>
          <MuiButton variant="text" startIcon={<RestartAltIcon />}
            onClick={() => setCount(0)}>
            Сброс
          </MuiButton>
        </Stack>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          {'const [count, setCount] = useState(0)'}
        </Typography>
      </Paper>

      {/* ── 2. Строковое состояние ── */}
      <Paper variant="outlined" sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
          2. Строковое состояние — текстовый ввод
        </Typography>
        <TextField
          label="Введите текст"
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth size="small"
        />
        {text && (
          <Typography sx={{ mt: 1.5 }}>
            Введено: <strong>{text}</strong> ({text.length} симв.)
          </Typography>
        )}
      </Paper>

      {/* ── 3. Булевое состояние ── */}
      <Paper variant="outlined" sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
          3. Булевое состояние — переключатель
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <MuiButton variant="contained" onClick={() => setIsVisible((v) => !v)}>
            {isVisible ? 'Скрыть блок' : 'Показать блок'}
          </MuiButton>
          {isVisible && (
            <Box sx={{ px: 2, py: 1, bgcolor: 'success.light', borderRadius: 2, color: 'white' }}>
              ✅ Я видимый!
            </Box>
          )}
        </Stack>
      </Paper>

      {/* ── 4. Массив ── */}
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
          4. Массив — динамический список тегов
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
          {items.map((item, i) => (
            <Chip key={i} label={item} onDelete={() => removeItem(i)} color="primary" />
          ))}
        </Stack>
        <Stack direction="row" spacing={1}>
          <TextField
            size="small" label="Новый тег" value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addItem()}
          />
          <MuiButton variant="contained" startIcon={<AddIcon />} onClick={addItem}>
            Добавить
          </MuiButton>
        </Stack>
      </Paper>
    </Box>
  );
}

export default UseStatePage;
