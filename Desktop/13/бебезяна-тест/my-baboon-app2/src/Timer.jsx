import React, { useEffect, useState } from 'react';
import ScrollTimer from './ScrollTimer';
import Timer2 from './Timer2';
import Timer3 from './Timer3';
import Timer4 from './Timer4';

const Timer = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const targetDate = new Date('2025-11-13T00:00:00'); // Укажите дату, до которой будет отсчет
        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate - now;

            if (difference <= 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="timer">
            <div className="obertka">
                <h2>ДО НАШЕЙ ГОДОВЩИНКИ ОСТАЛОСЬ</h2>
                <p>{timeLeft.days} дней, {timeLeft.hours} часов, {timeLeft.minutes} минут, {timeLeft.seconds} секунд</p>
                <p>💖ЛЮБЛЮ ТЕБЯ, СОНЕЧКА!💖</p>
            </div>
            <div className="obertka">
                <Timer2 />
            </div>
            <div className="obertka">
                <Timer3 />
            </div>
            <div className="obertka">
                <Timer4 />
            </div>
            <ScrollTimer />
        </div>
    );
};

export default Timer;
