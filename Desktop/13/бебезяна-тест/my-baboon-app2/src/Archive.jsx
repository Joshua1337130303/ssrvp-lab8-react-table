import React, { useState } from 'react';
import gif1 from './assets/5.gif';
import gif2 from './assets/6.gif';
import png1 from './assets/1.png';
import png2 from './assets/2.png';
import MediaModal from './MediaModal';

const Archive = () => {
    const [activeSection, setActiveSection] = useState(null);
    const [modalMedia, setModalMedia] = useState(null);

    const sections = [
        {
            id: 1,
            title: "Нежность #1",
            subtitle: "Поцелуйчики в кружочке",
            images: [gif1, gif2],
            description: "Наши первые кружочковые поцелуи, которые запомнятся навсегда 💕"
        },
        {
            id: 2,
            title: "Нежность #2",
            subtitle: "Няшная няшность!",
            images: [png1],
            description: "Хляди шо мы тут понаписали! 💖"
        },
        {
            id: 3,
            title: "Нежность #3",
            subtitle: "Милотищаааа!",
            images: [png2],
            description: "Тут типа наше няшное письмецо!! 💝"
        }
    ];

    const toggleSection = (id) => {
        setActiveSection(activeSection === id ? null : id);
    };

    const openModal = (src, alt) => {
        setModalMedia({ src, alt });
    };

    const closeModal = () => {
        setModalMedia(null);
    };

    return (
        <div className="content-archive">
            <h1>Архив нежностей</h1>
            <h2>Здеся можна увидеть много нежностей, которые между нами были😳</h2>
            {sections.map((section) => (
                <div 
                    key={section.id} 
                    className={`archive-card ${activeSection === section.id ? 'active' : ''}`}
                    onClick={() => toggleSection(section.id)}
                >
                    <h2>{section.title}</h2>
                    <h3>{section.subtitle}</h3>
                    <p className="section-description">{section.description}</p>
                    <div className={`images-container ${activeSection === section.id ? 'show' : ''}`}>
                        {section.images.map((img, index) => (
                            <img 
                                key={index} 
                                src={img} 
                                alt={`Нежность ${section.id} - ${index + 1}`}
                                className="archive-image"
                                onClick={e => { e.stopPropagation(); openModal(img, `Нежность ${section.id} - ${index + 1}`); }}
                                style={{ cursor: 'zoom-in' }}
                            />
                        ))}
                    </div>
                </div>
            ))}
            {modalMedia && (
                <MediaModal src={modalMedia.src} alt={modalMedia.alt} onClose={closeModal} />
            )}
        </div>
    );
};

export default Archive;
    