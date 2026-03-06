import React, { useState, useEffect, useRef } from 'react';
import './MemoriesTimeline.css';

const LOCAL_KEY = 'joint_dreams_list';

const JointDreams = () => {
  const [dreams, setDreams] = useState([]);
  const [input, setInput] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) setDreams(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(dreams));
  }, [dreams]);

  const addDream = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setDreams([{ text: input.trim(), done: false, id: Date.now() }, ...dreams]);
      setInput('');
      inputRef.current && inputRef.current.focus();
    }
  };

  const toggleDone = (id) => {
    setDreams(dreams.map(d => d.id === id ? { ...d, done: !d.done } : d));
  };

  const removeDream = (id) => {
    setDreams(dreams.filter(d => d.id !== id));
  };

  return (
    <div className="memories-timeline-section">
      <h2>🌠 Совместные планы и мечты</h2>
      <form className="memories-form" onSubmit={addDream} style={{marginBottom: 24}}>
        <input
          type="text"
          placeholder="Добавить мечту или цель..."
          value={input}
          onChange={e => setInput(e.target.value)}
          ref={inputRef}
          required
        />
        <button type="submit">Добавить</button>
      </form>
      <div className="memories-timeline-list">
        {dreams.length === 0 && <div className="memories-empty">Пока нет совместных мечт. Добавьте первую!</div>}
        {dreams.map(dream => (
          <div className="memories-card" key={dream.id} style={{ display: 'flex', alignItems: 'center', gap: 12, animation: 'fadeInUp 0.6s' }}>
            <input
              type="checkbox"
              checked={dream.done}
              onChange={() => toggleDone(dream.id)}
              style={{ width: 22, height: 22, marginRight: 10 }}
            />
            <span style={{
              textDecoration: dream.done ? 'line-through' : 'none',
              color: dream.done ? '#aaa' : '#444',
              flex: 1,
              fontSize: '1.1em',
              wordBreak: 'break-word',
            }}>{dream.text}</span>
            <button onClick={() => removeDream(dream.id)} style={{ background: '#ff69b4', color: '#fff', border: 'none', borderRadius: 8, padding: '4px 10px', fontSize: 18, cursor: 'pointer' }}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JointDreams; 