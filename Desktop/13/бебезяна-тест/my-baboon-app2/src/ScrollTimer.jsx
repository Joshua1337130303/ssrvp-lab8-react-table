import React, { useEffect, useState, useRef } from 'react';
import KissAnimation from './KissAnimation';

const ScrollTimer = () => {
    const [isActive, setIsActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(5); // Таймер на 60 секунд
    const timerRef = useRef(null);
    const targetRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (targetRef.current) {
                const rect = targetRef.current.getBoundingClientRect();
                // Проверяем, виден ли элемент на экране
                if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                    startTimer();
                    window.removeEventListener('scroll', handleScroll); // Удаляем обработчик после активации
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearInterval(timerRef.current);
        };
    }, []);

    const startTimer = () => {
        setIsActive(true);
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    return (
        <div className='scroll-timer'>
            <KissAnimation />
            <div ref={targetRef} style={{ margin: '2rem 0' }}>
                <h2>А до нашего поцелуя осталось...</h2>
            </div>
            {isActive && (
                <div>
                    {timeLeft === 0 ? (
                        <div className="kiss-final">
                            <h1>💋💋💋💋💋</h1>
                            <h2>Время поцелуя! 💕</h2>
                        </div>
                    ) : (
                        <div className="timer-countdown">
                            {timeLeft} секунд
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ScrollTimer;
