import React, { useEffect } from 'react';
import './App.css';

const MediaModal = ({ src, alt, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('media-modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className="media-modal-overlay" onClick={handleOverlayClick}>
      <div className="media-modal-content">
        <button className="media-modal-close" onClick={onClose} aria-label="Закрыть">×</button>
        <img src={src} alt={alt} className="media-modal-img" />
        <div className="media-modal-alt">{alt}</div>
      </div>
    </div>
  );
};

export default MediaModal; 