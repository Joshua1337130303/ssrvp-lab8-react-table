import React, { useEffect, useState } from 'react';
import './App.css';

const KissAnimation = () => {
    const [kisses, setKisses] = useState([]);

    useEffect(() => {
        const createKiss = () => {
            const kiss = {
                id: Date.now() + Math.random(),
                x: Math.random() * (window.innerWidth - 50),
                y: window.innerHeight + 50,
                rotation: Math.random() * 360,
                scale: 0.5 + Math.random() * 0.5,
                speed: 1 + Math.random() * 2
            };
            setKisses(prev => [...prev, kiss]);
        };

        const interval = setInterval(createKiss, 800);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const moveKisses = () => {
            setKisses(prev => 
                prev
                    .filter(kiss => kiss.y > -50)
                    .map(kiss => ({
                        ...kiss,
                        y: kiss.y - kiss.speed,
                        rotation: kiss.rotation + 1
                    }))
            );
        };

        const animationFrame = requestAnimationFrame(moveKisses);
        return () => cancelAnimationFrame(animationFrame);
    }, [kisses]);

    return (
        <div className="kiss-container">
            {kisses.map(kiss => (
                <div
                    key={kiss.id}
                    className="kiss"
                    style={{
                        left: `${kiss.x}px`,
                        top: `${kiss.y}px`,
                        transform: `rotate(${kiss.rotation}deg) scale(${kiss.scale})`
                    }}
                >
                    💋
                </div>
            ))}
        </div>
    );
};

export default KissAnimation; 