import React, { useState, useEffect, useRef } from 'react';
import './MemoriesTimeline.css';

const LOCAL_KEY = 'love_tree_events';

const defaultTree = [
  {
    id: 1,
    emoji: '🌱',
    title: 'Начало нашей истории',
    date: '2024-11-13',
    description: 'В этот день мы стали парой!',
    children: []
  }
];

const LoveTree = () => {
  const [tree, setTree] = useState([]);
  const [form, setForm] = useState({ emoji: '💖', title: '', date: '', description: '', parentId: 1 });
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setTree(parsed.length ? parsed : defaultTree);
    } else {
      setTree(defaultTree);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(tree));
  }, [tree]);

  const addBranch = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.date.trim()) return;
    const newBranch = {
      id: Date.now(),
      emoji: form.emoji,
      title: form.title.trim(),
      date: form.date,
      description: form.description.trim(),
      children: []
    };
    setTree(addToTree(tree, form.parentId, newBranch));
    setForm({ emoji: '💖', title: '', date: '', description: '', parentId: 1 });
    setShowForm(false);
  };

  function addToTree(nodes, parentId, branch) {
    return nodes.map(node => {
      if (node.id === Number(parentId)) {
        return { ...node, children: [branch, ...node.children] };
      } else if (node.children && node.children.length) {
        return { ...node, children: addToTree(node.children, parentId, branch) };
      } else {
        return node;
      }
    });
  }

  const renderTree = (nodes, level = 0) => (
    <ul style={{ 
      listStyle: 'none',
      paddingLeft: level === 0 ? 0 : 24,
      borderLeft: level ? '2px solid #b3b3e6' : 'none',
      marginLeft: 0,
      width: '100%',
      boxSizing: 'border-box'
    }}>
      {nodes.map(node => (
        <li key={node.id} style={{ 
          margin: '18px 0',
          animation: 'fadeInUp 0.7s',
          display: 'block',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            width: '100%',
            boxSizing: 'border-box'
          }}>
            <span style={{ fontSize: 28 }}>{node.emoji}</span>
            <div style={{ 
              textAlign: 'left',
              flex: 1,
              minWidth: 0
            }}>
              <div style={{ 
                fontWeight: 700,
                color: '#6a5acd',
                fontSize: '1.1em',
                wordBreak: 'break-word'
              }}>{node.title}</div>
              <div style={{ 
                color: '#888',
                fontSize: '0.98em'
              }}>{node.date}</div>
              <div style={{ 
                color: '#444',
                fontSize: '1em',
                marginTop: 2,
                wordBreak: 'break-word'
              }}>{node.description}</div>
            </div>
          </div>
          {node.children && node.children.length > 0 && renderTree(node.children, level + 1)}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="memories-timeline-section">
      <h2>🌳 Дерево любви</h2>
      <button onClick={() => setShowForm(!showForm)} style={{ marginBottom: 18, background: '#6a5acd', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 22px', fontSize: 18, cursor: 'pointer' }}>{showForm ? 'Скрыть форму' : 'Добавить событие/ветку'}</button>
      {showForm && tree.length > 0 && (
        <form className="memories-form" onSubmit={addBranch} ref={formRef} style={{ marginBottom: 24 }}>
          <select name="emoji" value={form.emoji} onChange={e => setForm({ ...form, emoji: e.target.value })} style={{ fontSize: 22 }}>
            <option value="💖">💖</option>
            <option value="🌸">🌸</option>
            <option value="🌿">🌿</option>
            <option value="✨">✨</option>
            <option value="🎉">🎉</option>
            <option value="🥰">🥰</option>
            <option value="🐾">🐾</option>
            <option value="🍀">🍀</option>
            <option value="🦊">🦊</option>
            <option value="🐱">🐱</option>
            <option value="🐒">🐒</option>
            <option value="🌳">🌳</option>
          </select>
          <input type="text" placeholder="Заголовок события" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
          <textarea placeholder="Описание (необязательно)" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <select name="parentId" value={form.parentId} onChange={e => setForm({ ...form, parentId: e.target.value })} required>
            {tree.length === 0 ? (
              <option value="" disabled>Нет доступных веток</option>
            ) : (
              tree.map(node => (
                <option key={node.id} value={node.id}>{node.emoji} {node.title}</option>
              ))
            )}
          </select>
          <button type="submit">Добавить ветку</button>
        </form>
      )}
      {tree.length === 0 && (
        <div style={{color:'#ff69b4', margin:'24px 0', fontWeight:600, fontSize:'1.2em'}}>Нет ни одной ветки. Добавьте первую корневую ветку!</div>
      )}
      <div style={{ marginTop: 18 }}>{renderTree(tree)}</div>
    </div>
  );
};

export default LoveTree; 