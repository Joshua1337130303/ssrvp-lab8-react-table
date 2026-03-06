import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const LOCAL_KEY = 'secret_notes_list';

const SecretNotes = () => {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', text: '', date: '' });
  const inputRef = useRef();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_KEY);
      if (saved) {
        const parsedNotes = JSON.parse(saved);
        setNotes(parsedNotes);
      }
    } catch (error) {
      console.error('Ошибка при загрузке записок:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(notes));
    } catch (error) {
      console.error('Ошибка при сохранении записок:', error);
    }
  }, [notes]);

  const addNote = (e) => {
    e.preventDefault();
    if (!form.text.trim() || !form.date) return;
    setNotes([
      {
        ...form,
        id: Date.now(),
        opened: false,
      },
      ...notes,
    ]);
    setForm({ title: '', text: '', date: '' });
    inputRef.current && inputRef.current.focus();
  };

  const removeNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="memories-timeline-section" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', color: '#6a5acd', marginBottom: '30px' }}>🔒 Секретные записки</h2>
      <form className="memories-form" onSubmit={addNote} style={{ marginBottom: '30px', background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <input
          type="text"
          placeholder="Заголовок (необязательно)"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          ref={inputRef}
          style={{ marginBottom: '10px' }}
        />
        <textarea
          placeholder="Текст записки..."
          value={form.text}
          onChange={e => setForm({ ...form, text: e.target.value })}
          required
          style={{ marginBottom: '10px', minHeight: '100px' }}
        />
        <input
          type="date"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
          required
          style={{ marginBottom: '15px' }}
        />
        <button type="submit" style={{ background: '#6a5acd', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', width: '100%' }}>Добавить записку</button>
      </form>
      <div className="memories-timeline-list">
        {notes.length === 0 && (
          <div style={{ textAlign: 'center', color: '#666', padding: '40px 20px', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            Пока нет секретных записок. Добавьте первую!
          </div>
        )}
        {notes.map(note => {
          const isOpen = note.date <= today;
          return (
            <div key={note.id} style={{ 
              background: '#fff', 
              padding: '20px', 
              borderRadius: '12px', 
              marginBottom: '15px', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              animation: 'fadeInUp 0.6s'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontSize: '28px' }}>{isOpen ? '📜' : '🔒'}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, color: '#6a5acd', fontSize: '1.1em', marginBottom: '5px' }}>
                    {note.title || (isOpen ? 'Секретная записка' : 'Секрет!')}
                  </div>
                  <div style={{ color: '#888', fontSize: '0.9em', marginBottom: '8px' }}>
                    Откроется: {note.date}
                  </div>
                  <div style={{ color: '#444', fontSize: '1em', marginTop: '5px', wordBreak: 'break-word' }}>
                    {isOpen ? note.text : <span style={{ opacity: 0.7 }}>Текст появится в день открытия!</span>}
                  </div>
                </div>
                <button 
                  onClick={() => removeNote(note.id)} 
                  style={{ 
                    background: '#ff69b4', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '8px', 
                    padding: '8px 12px', 
                    fontSize: '16px', 
                    cursor: 'pointer',
                    transition: 'background 0.3s'
                  }}
                  onMouseOver={e => e.target.style.background = '#ff1493'}
                  onMouseOut={e => e.target.style.background = '#ff69b4'}
                >
                  ✕
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SecretNotes; 