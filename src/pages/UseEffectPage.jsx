import { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Stack,
  Button as MuiButton, Chip, Alert,
} from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import MouseIcon from '@mui/icons-material/Mouse';

/* ─────────────────────────────────────────
   Дочерний компонент для демонстрации
   монтирования / размонтирования
───────────────────────────────────────── */
function LifecycleDemo({ log, setLog }) {
  useEffect(() => {
    // Вызывается при монтировании компонента
    setLog((prev) => [
      ...prev,
      { type: 'mount', msg: '✅ Компонент смонтирован (componentDidMount)' },
    ]);

    return () => {
      // Вызывается при размонтировании (cleanup)
      setLog((prev) => [
        ...prev,
        { type: 'unmount', msg: '❌ Компонент размонтирован (componentWillUnmount)' },
      ]);
    };
  }, []); // пустой массив — эффект только при монтировании

  return (
    <Box sx={{ p: 2, bgcolor: 'success.light', borderRadius: 2, color: '#fff' }}>
      👋 Я живой компонент! Нажми «Удалить», чтобы размонтировать меня.
    </Box>
  );
}

/**
 * UseEffectPage — демонстрация хука useEffect.
 * Примеры:
 *   1. Монтирование / размонтирование (cleanup)
 *   2. Таймер с зависимостью
 *   3. Отслеживание позиции мыши
 */
function UseEffectPage() {
  // ── 1. Монтирование/размонтирование ──
  const [show, setShow] = useState(true);
  const [log, setLog] = useState([]);

  // ── 2. Таймер ──
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    // cleanup — останавливаем интервал при остановке или размонтировании
    return () => clearInterval(id);
  }, [running]); // перезапускается при изменении running

  // ── 3. Позиция мыши ──
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [tracking, setTracking] = useState(false);

  useEffect(() => {
    if (!tracking) return;

    const handler = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    // cleanup — снимаем слушатель
    return () => window.removeEventListener('mousemove', handler);
  }, [tracking]);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 700 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        useEffect
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Хук <code>useEffect</code> позволяет выполнять побочные эффекты: подписки,
        таймеры, запросы к API. Функция из <code>return</code> вызывается при
        размонтировании (cleanup).
      </Typography>

      {/* ── 1. Монтирование / размонтирование ── */}
      <Paper variant="outlined" sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
          1. Монтирование и размонтирование (lifecycle)
        </Typography>

        {show ? (
          <LifecycleDemo log={log} setLog={setLog} />
        ) : (
          <Alert severity="warning">Компонент удалён из DOM</Alert>
        )}

        <MuiButton
          sx={{ mt: 2 }}
          variant="outlined"
          color={show ? 'error' : 'success'}
          onClick={() => setShow((v) => !v)}
        >
          {show ? 'Удалить компонент' : 'Создать компонент'}
        </MuiButton>

        {log.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" fontWeight={700} color="text.secondary">
              Лог событий:
            </Typography>
            {log.map((entry, i) => (
              <Typography key={i} variant="body2"
                sx={{ color: entry.type === 'mount' ? 'success.main' : 'error.main' }}>
                {entry.msg}
              </Typography>
            ))}
          </Box>
        )}
      </Paper>

      {/* ── 2. Таймер ── */}
      <Paper variant="outlined" sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
          <TimerIcon sx={{ verticalAlign: 'middle', mr: 0.5 }} />
          2. Таймер — useEffect с setInterval + cleanup
        </Typography>
        <Typography variant="h3" fontWeight={800} sx={{ my: 1.5 }}>
          {String(Math.floor(seconds / 60)).padStart(2, '0')}:
          {String(seconds % 60).padStart(2, '0')}
        </Typography>
        <Stack direction="row" spacing={1}>
          <MuiButton variant="contained" color={running ? 'warning' : 'success'}
            onClick={() => setRunning((v) => !v)}>
            {running ? 'Пауза' : 'Старт'}
          </MuiButton>
          <MuiButton variant="outlined" onClick={() => { setRunning(false); setSeconds(0); }}>
            Сброс
          </MuiButton>
        </Stack>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          {'useEffect(() => { const id = setInterval(...); return () => clearInterval(id); }, [running])'}
        </Typography>
      </Paper>

      {/* ── 3. Позиция мыши ── */}
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
          <MouseIcon sx={{ verticalAlign: 'middle', mr: 0.5 }} />
          3. Позиция мыши — useEffect с addEventListener + cleanup
        </Typography>
        <MuiButton variant="outlined" onClick={() => setTracking((v) => !v)} sx={{ mb: 2 }}>
          {tracking ? 'Остановить слежение' : 'Начать слежение'}
        </MuiButton>
        {tracking && (
          <Stack direction="row" spacing={1.5}>
            <Chip label={`X: ${mouse.x}px`} color="primary" />
            <Chip label={`Y: ${mouse.y}px`} color="secondary" />
          </Stack>
        )}
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          {'useEffect(() => { window.addEventListener("mousemove", handler); return () => window.removeEventListener(...); }, [tracking])'}
        </Typography>
      </Paper>
    </Box>
  );
}

export default UseEffectPage;
