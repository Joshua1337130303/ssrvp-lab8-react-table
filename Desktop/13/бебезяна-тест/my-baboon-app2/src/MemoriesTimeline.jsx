import React, { useState, useEffect, useRef } from 'react';
import './MemoriesTimeline.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LOCAL_KEY = 'memories_timeline_events';

const MemoriesTimeline = () => {
  const [events, setEvents] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ date: '', title: '', description: '', media: null });
  const fileInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  // Загрузка событий из localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) setEvents(JSON.parse(saved));
  }, []);

  // Сохранение событий в localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(events));
  }, [events]);

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'media') {
      setForm({ ...form, media: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Конвертация файла в base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!form.date || !form.title || !form.description) return;
    setIsLoading(true);
    let mediaDataUrl = null;
    if (form.media) {
      try {
        mediaDataUrl = await fileToBase64(form.media);
      } catch {
        mediaDataUrl = null;
      }
    }
    setEvents([
      { ...form, id: Date.now(), media: mediaDataUrl },
      ...events,
    ]);
    setForm({ date: '', title: '', description: '', media: null });
    if (fileInputRef.current) fileInputRef.current.value = '';
    setIsLoading(false);
  };

  const openModal = (event) => setModal(event);
  const closeModal = () => setModal(null);

  // --- График по месяцам ---
  // Собираем статистику: { '2024-05': 3, ... }
  const monthStats = {};
  events.forEach(ev => {
    if (ev.date) {
      const month = ev.date.slice(0, 7); // YYYY-MM
      monthStats[month] = (monthStats[month] || 0) + 1;
    }
  });
  // Получаем отсортированный список месяцев
  const months = Object.keys(monthStats).sort();
  const counts = months.map(m => monthStats[m]);

  const chartData = {
    labels: months.length ? months : ['Нет данных'],
    datasets: [
      {
        label: 'Воспоминаний за месяц',
        data: counts.length ? counts : [0],
        fill: false,
        borderColor: '#6a5acd',
        backgroundColor: '#b3b3e6',
        tension: 0.2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Динамика воспоминаний по месяцам', color: '#6a5acd', font: { size: 18 } },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        title: { display: true, text: 'Месяц', color: '#6a5acd' },
        ticks: { color: '#6a5acd' },
      },
      y: {
        title: { display: true, text: 'Кол-во воспоминаний', color: '#6a5acd' },
        beginAtZero: true,
        ticks: { stepSize: 1, color: '#6a5acd' },
      },
    },
  };

  return (
    <div className="memories-timeline-section">
      <h2>📖 Лента воспоминаний</h2>
      <form className="memories-form" onSubmit={handleAddEvent}>
        <input type="date" name="date" value={form.date} onChange={handleFormChange} required />
        <input type="text" name="title" placeholder="Заголовок" value={form.title} onChange={handleFormChange} required />
        <textarea name="description" placeholder="Описание" value={form.description} onChange={handleFormChange} required />
        <input type="file" name="media" accept="image/*,image/gif" onChange={handleFormChange} ref={fileInputRef} />
        <button type="submit" disabled={isLoading}>{isLoading ? 'Добавление...' : 'Добавить воспоминание'}</button>
      </form>
      <div className="memories-timeline-list">
        {events.length === 0 && <div className="memories-empty">Пока нет воспоминаний. Добавьте первое!</div>}
        {events.map(event => (
          <div className="memories-card" key={event.id} style={{ animation: 'fadeInUp 0.6s' }}>
            <div className="memories-card-date">{event.date}</div>
            <div className="memories-card-title">{event.title}</div>
            <div className="memories-card-desc">{event.description}</div>
            {event.media && (
              <img
                src={event.media}
                alt={event.title}
                className="memories-card-img"
                onClick={() => openModal(event)}
                style={{ cursor: 'pointer' }}
              />
            )}
          </div>
        ))}
      </div>
      {/* Линейный график по месяцам */}
      <div style={{ margin: '40px 0 0 0', background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(106,90,205,0.07)', padding: 20 }}>
        <Line data={chartData} options={chartOptions} height={220} />
      </div>
      {/* Модальное окно для просмотра фото/гифки */}
      {modal && modal.media && (
        <div className="media-modal-overlay" onClick={closeModal}>
          <div className="media-modal-content" onClick={e => e.stopPropagation()}>
            <button className="media-modal-close" onClick={closeModal}>×</button>
            <img
              src={modal.media}
              alt={modal.title}
              className="memories-modal-img"
              style={{ maxWidth: '90vw', maxHeight: '80vh', borderRadius: 16 }}
            />
            <div className="memories-modal-title">{modal.title}</div>
            <div className="memories-modal-date">{modal.date}</div>
            <div className="memories-modal-desc">{modal.description}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoriesTimeline; 