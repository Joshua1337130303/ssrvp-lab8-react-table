import React, { useState } from 'react';
import './App.css';
import img1 from './assets/1.jpg';
import img2 from './assets/6.jpg';
import img3 from './assets/7.jpg';
import img4 from './assets/8.jpg';
import img5 from './assets/9.jpg';
import img133 from './assets/133.jpg';
import img134 from './assets/134.jpg';
import img135 from './assets/135.jpg';
import img136 from './assets/136.jpg';
import img137 from './assets/137.jpg';
import img138 from './assets/138.jpg';
import img139 from './assets/139.jpg';
import img149 from './assets/149.jpg';
import img140 from './assets/140.jpg';
import img141 from './assets/142.jpg';

const Anniversary = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const questions = [
        {
            question: "Когда мы начали встречаться?",
            image: img5,
            answers: [
                { text: "13 ноября 2024", points: 10 },
                { text: "13 января 2024", points: 0 },
                { text: "13 февраля 2024", points: 0 },
                { text: "я ваще не в курсе кто ты....", points: 0 }
            ]
        },
        {
            question: "Что было нашим первым свиданием?",
            image: img133,
            answers: [
                { text: "Вечеринка у P.DIDDY", points: 0 },
                { text: "Оч страстно смотрели сумерки с лысым", points: 0 },
                { text: "Тур в Таджикистан", points: 0 },
                { text: "Встреча в фрименс", points: 10 }
            ]
        },
        {
            question: "Какой мой любимый цвет?",
            image: img3,
            answers: [
                { text: "Бежевый", points: 5 },
                { text: "Чёрный", points: 5 },
                { text: "Зеленый", points: 5 },
                { text: "Я тя люблю капец!!!", points: 10 }
            ]
        },
        {
            question: "Что я люблю больше всего?",
            image: img4,
            answers: [
                { text: "Всё вместе и типя ф придачу", points: 20 },
                { text: "Спать с тобой", points: 5 },
                { text: "Есть вкусности с тобой", points: 5 },
                { text: "Играть в стардью валли с тобой", points: 5 }
            ]
        },
        {
            question: "Какой у нас любимый фильм?",
            image: img134,
            answers: [
                { text: "Тот который мы смотрим вместе", points: 5 },
                { text: "Тот который мы смотрим вместе и там ещё лысый дядька", points: 10 },
                { text: "Kingsman", points: 5 },
                { text: "Адвокат дъявола", points: 20 }
            ]
        },
        {
            question: "Где мы впервые поцеловались?",
            image: img135,
            answers: [
                { text: "На похоронах паши техника", points: 0 },
                { text: "На концерте фараона", points: 0 },
                { text: "В кафе", points: 0 },
                { text: "У тэбя в подъезде", points: 10 }
            ]
        },
        {
            question: "Какой твой любимый мой комплимент?",
            image: img136,
            answers: [
                { text: "Ты самая красивая и невероятная зайчишка на свети, будь моей женой!", points: 10 },
                { text: "Ты моя лисичка", points: 5 },
                { text: "Ты ебат бомбовая красотулька-роднулька, хачу теа фсю жизь любоф", points: 5 },
                { text: "Ты моя какашка", points: 100 }
            ]
        },
        {
            question: "Какое наше любимое совместное занятие?",
            image: img137,
            answers: [
                { text: "Готовить вместе", points: 0 },
                { text: "Смотреть фильмы с лысым или плоста штота смотреть", points: 10 },
                { text: "Гулять", points: 0 },
                { text: "Играть в писюны и стардью вэлли", points: 15 }
            ]
        },
        {
            question: "Какой у нас был первый совместный праздник?",
            image: img138,
            answers: [
                { text: "Новый год", points: 10 },
                { text: "День святого Валентина", points: 0 },
                { text: "8 марта", points: 0 },
                { text: "С тобой каждый день праздник, лисик!", points: 10 }
            ]
        },
        {
            question: "моя любимая животинка!",
            image: img139,
            answers: [
                { text: "мяу-мяу писи-писи, ватермелонини четописини, я в тебя ебать как влюблини на фсю жизини", points: 10 },
                { text: "БРРР БРРР ПАТАПИМ!", points: 0 },
                { text: "Гаф-гаф каки-каки", points: 0 },
                { text: "Шимпанзини Бананини", points: 0 }
            ]
        },
        {
            question: "Какой город мы мечтаем вместе посетить?",
            image: img149,
            answers: [
                { text: "Париж", points: 0 },
                { text: "Новосибирск", points: 5 },
                { text: "Лондон", points: 0 },
                { text: "Тот город в которым мы будем вмести долга и щаслива!", points: 10 }
            ]
        },
        {
            question: "Какой твой любимый мой подарок?",
            image: img140,
            answers: [
                { text: "Мягкая игрушка", points: 5 },
                { text: "Футболочка-кружечка", points: 5 },
                { text: "Открытки", points: 5 },
                { text: "Сайт", points: 5 },
                { text: "питсят тыщ деняк долларов, любоф твоя, тачка, хата иии ещё чё-нить!", points: 5 },
                { text: "Когда кормишь, нежишься са мной, вот эта пушка!", points: 5 }
            ]
        },
        {
            question: "Какие слова я чаще всего говорю тебе?",
            image: img141,
            answers: [
                { text: "Люблю", points: 1 },
                { text: "Скучаю", points: 1 },
                { text: "Спасибо", points: 0 },
                { text: "Доброе утро", points: 1 },
                { text: "Доброе утро, люблю, скучаю, спасибо, что ты есть, ты моя самая любимая и крутая зайка на свете, ты моя мечта, моё всё, дорогушка-роднульческая к тому же самая красивая на свете!", points: 10 }
            ]
        }
    ];

    const handleAnswer = (points) => {
        setScore(score + points);
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResults(true);
        }
    };

    const getResultMessage = () => {
        const percentage = (score / (questions.length * 10)) * 100;
        if (percentage >= 80) {
            return "Вот это ты раздала!!! Может выйдешь за меня замуж? Любоф моя ненаглядная!! ❤️";
        } else if (percentage >= 50) {
            return "Сюдаааа!!! Ты блин невероятная рыбка!! Да стань уже женой моей!😊";
        } else {
            return "Неважно какой результат, ты у меня всё равно самая ахуенная, го засосяо?! 😉";
        }
    };

    if (showResults) {
        return (
            <div className="anniversary-results">
                <h2>Результаты теста</h2>
                <p>Твой счет: {score} из {questions.length * 10}</p>
                <p>{getResultMessage()}</p>
                <button onClick={() => {
                    setCurrentQuestion(0);
                    setScore(0);
                    setShowResults(false);
                }}>Начать заново</button>
                <div className="anniversary-letter" style={{marginTop: 32, background: 'linear-gradient(135deg, #ffe0f7 60%, #e0eaff 100%)', borderRadius: 18, boxShadow: '0 4px 16px rgba(147,112,219,0.08)', padding: 24, maxWidth: 500, marginLeft: 'auto', marginRight: 'auto'}}>
                  <h3 style={{color: '#ff69b4', marginBottom: 12}}>💌 Романтическое письмо к 6-месяцевщине!</h3>
                  <p style={{color: '#444', fontSize: '1.1em', lineHeight: 1.6}}>
                    Моя любимая Зайчишка!<br/><br/>
                    Вот и прошли наши с тобой 6 месяцев вместе, ты у меня блин такая невероятная рыбка мечты, просто жесть!!! Я каждый день благодарю вселенную за то, что ты есть в моей жизни. Ты — моё счастье, моя радость, моя нежность и поддержка. С тобой я чувствую себя по-настоящему счастливым и любимым.<br/><br/>
                    Пусть впереди нас ждёт с тобой ещё кучу всего невероятного и приятного прямо как ты, любимка. Я обещаю всегда быть рядом, заботиться о тебе, поддерживать и делать всё, чтобы ты улыбалась как можно чаще.<br/><br/>
                    Спасибо тебе за твою любовь, за твой свет и за то, что ты — именно ты. Я очень сильно тебя люблююаоауоаоуаоуаоу, безумнооо!!!<br/><br/>
                    С 6-месяцевщиной нас, моя родная!<br/>
                    <span style={{color:'#ff69b4'}}>Твой лисик! 💖</span><br/>
                    А типерь погнали играть в стардьююююю!!!! Кушать вкусностииии!!! И спат вмести, я теа забираю к сибе, фсё!! Панятна?!
                  </p>
                </div>
            </div>
        );
    }

    return (
        <div className="anniversary-quiz">
            <h2>Тест что-та там, типа карочи наверное на знание пары, но ваще как бы тест</h2>
            <div className="question-container">
                <img 
                    src={questions[currentQuestion].image} 
                    alt="Question illustration" 
                    className="question-image"
                />
                <h3>{questions[currentQuestion].question}</h3>
                <div className="answers-container">
                    {questions[currentQuestion].answers.map((answer, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(answer.points)}
                            className="answer-button"
                        >
                            {answer.text}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Anniversary; 