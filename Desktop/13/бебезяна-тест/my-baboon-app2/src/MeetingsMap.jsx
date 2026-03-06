import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MeetingsMap = () => {
  const [points, setPoints] = useState([]);
  const [modal, setModal] = useState(null);

  function AddMarkerOnClick() {
    useMapEvents({
      click(e) {
        setModal({ coords: [e.latlng.lat, e.latlng.lng], title: '', description: '', date: '', photo: null });
      },
    });
    return null;
  }

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setModal({ ...modal, photo: files[0] });
    } else {
      setModal({ ...modal, [name]: value });
    }
  };

  const handleAddPoint = (e) => {
    e.preventDefault();
    setPoints([...points, { ...modal }]);
    setModal(null);
  };

  const closeModal = () => {
    setModal(null);
  };

  return (
    <div className="meetings-map-section">
      <h2>🗺️ Карта наших встреч (OpenStreetMap)</h2>
      <div className="meetings-map-container">
        <MapContainer center={[53.3474, 83.7788]} zoom={12} style={{ width: '100%', height: 400, minHeight: 300, borderRadius: 20, margin: '0 auto' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <AddMarkerOnClick />
          {points.map((point, idx) => (
            <Marker key={idx} position={point.coords}>
              <Popup>
                <b>{point.title}</b><br />
                {point.description}<br />
                {point.date}<br />
                {point.photo && (
                  <img
                    src={URL.createObjectURL(point.photo)}
                    alt={point.title}
                    className="map-point-photo"
                    style={{ maxWidth: 200, maxHeight: 150, marginTop: 8 }}
                  />
                )}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      {/* Модальное окно для добавления точки */}
      {modal && (
        <div className="media-modal-overlay" onClick={closeModal}>
          <div className="media-modal-content" onClick={e => e.stopPropagation()}>
            <button className="media-modal-close" onClick={closeModal}>×</button>
            <h3>Добавить место встречи</h3>
            <form className="meetings-form" onSubmit={handleAddPoint}>
              <input type="text" name="title" placeholder="Название" value={modal.title} onChange={handleFormChange} required />
              <input type="text" name="description" placeholder="Описание" value={modal.description} onChange={handleFormChange} required />
              <input type="date" name="date" value={modal.date} onChange={handleFormChange} required />
              <input type="file" name="photo" accept="image/*" onChange={handleFormChange} />
              <button type="submit">Добавить</button>
            </form>
          </div>
        </div>
      )}
      <div className="meetings-map-hint">Кликни по карте, чтобы добавить новое место встречи!</div>
    </div>
  );
};

export default MeetingsMap; 