import { useSelector, useDispatch } from 'react-redux';
import {
  increment, decrement, incrementByAmount, reset,
} from '../store/counterSlice';
import {
  Box, Typography, Paper, Stack,
  Button as MuiButton, Slider, Divider, Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useState } from 'react';

/**
 * ReduxPage — демонстрация Redux Toolkit.
 * Actions: increment, decrement, incrementByAmount, reset
 */
function ReduxPage() {
  const count    = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [step, setStep] = useState(5);

  const color = count > 0 ? 'success.main' : count < 0 ? 'error.main' : 'text.primary';

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 700 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Redux Toolkit
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Глобальное хранилище состояния. <code>useSelector</code> читает данные из store,{' '}
        <code>useDispatch</code> отправляет actions. Reducers в{' '}
        <code>counterSlice.js</code> описывают как изменяется состояние.
      </Typography>

      {/* ── Отображение значения ── */}
      <Paper
        variant="outlined"
        sx={{
          p: 4, mb: 3, borderRadius: 3, textAlign: 'center',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        }}
      >
        <Typography variant="overline" sx={{ color: '#9ab0c6', letterSpacing: 2 }}>
          store.counter.value
        </Typography>
        <Typography
          variant="h1"
          fontWeight={900}
          sx={{ color, fontSize: { xs: '5rem', md: '7rem' }, lineHeight: 1.1 }}
        >
          {count}
        </Typography>
        <Chip
          label={count > 0 ? 'Положительное' : count < 0 ? 'Отрицательное' : 'Ноль'}
          color={count > 0 ? 'success' : count < 0 ? 'error' : 'default'}
          sx={{ mt: 1 }}
        />
      </Paper>

      {/* ── Actions: +1 / -1 / reset ── */}
      <Paper variant="outlined" sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
          Базовые actions
        </Typography>
        <Stack direction="row" spacing={1.5} flexWrap="wrap">
          <MuiButton variant="contained" color="success" startIcon={<AddIcon />}
            onClick={() => dispatch(increment())}>
            increment (+1)
          </MuiButton>
          <MuiButton variant="contained" color="error" startIcon={<RemoveIcon />}
            onClick={() => dispatch(decrement())}>
            decrement (−1)
          </MuiButton>
          <MuiButton variant="outlined" startIcon={<RestartAltIcon />}
            onClick={() => dispatch(reset())}>
            reset (→ 0)
          </MuiButton>
        </Stack>
      </Paper>

      {/* ── Action с payload ── */}
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
          Action с payload — incrementByAmount
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Шаг: <strong>{step}</strong>
        </Typography>
        <Slider
          value={step} min={1} max={50}
          onChange={(_, v) => setStep(v)}
          valueLabelDisplay="auto"
          sx={{ mb: 2 }}
        />
        <Stack direction="row" spacing={1.5}>
          <MuiButton variant="contained" color="success" startIcon={<AddIcon />}
            onClick={() => dispatch(incrementByAmount(step))}>
            +{step}
          </MuiButton>
          <MuiButton variant="contained" color="error" startIcon={<RemoveIcon />}
            onClick={() => dispatch(incrementByAmount(-step))}>
            −{step}
          </MuiButton>
        </Stack>

        <Divider sx={{ my: 2 }} />
        <Typography variant="caption" color="text.secondary">
          {'dispatch(incrementByAmount(' + step + '))  →  state.counter.value += ' + step}
        </Typography>
      </Paper>
    </Box>
  );
}

export default ReduxPage;
