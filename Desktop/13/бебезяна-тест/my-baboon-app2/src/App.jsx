import React, { useState } from 'react';
import Header from './Header';
import Question from './Question';
import Answers from './Answers';
import Footer from './Footer';
import './App.css';
import bebezyna from './assets/1.gif';
import cat from './assets/12.jpg';
import fox from './assets/4.gif'
import Timer from './Timer';
import baboon from './assets/3.gif'
import EndScreen from './EndScreen';
import Archive from './Archive';
import jpg6 from './assets/6.jpg'
import jpg7 from './assets/7.gif'
import jpg8 from './assets/19.jpg'
import jpg9 from './assets/15.jpg'
import jpg17 from './assets/17.jpg'
import jpg18 from './assets/18.jpg'
import Anniversary from './Anniversary';
import MusicCorner from './MusicCorner';
import MeetingsMap from './MeetingsMap';
import MemoriesTimeline from './MemoriesTimeline';
import JointDreams from './JointDreams';
import LoveTree from './LoveTree';
import SecretNotes from './SecretNotes';

const App = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [activeButton, setActiveButton] = useState(null);
    const [showTimer, setShowTimer] = useState(false); // Состояние для отображения таймера
    const [showFine, setShowFine] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [showAnniversary, setShowAnniversary] = useState(false);
    const [showMusic, setShowMusic] = useState(false);
    const [showMap, setShowMap] = useState(false);

    const questions = [
        {
            question: "Кто вам большы нравеца ис звирушек?",
            answers: ["бебезяна", "Котик", "Котёнок", "Котя"],
            gif: baboon
        },
        {
          question: "А вы ф курсе что самоя THE BEST-SEXY на свете лесичка ента вы?",
          answers: ["Я люблю Сонечку", "Да", "Не согласна", "Нет"],
          gif: fox
        },
        {
          question: "Если бы вы выбирали котёнка, то какова бы вы хатели?",
          answers: ["Самого любимого", "Неромантичного", "Безынициативного", "Молчаливого"],
          gif: cat
        },
        {
          question: "Как вам такая идея для свидания???",
          answers: ["отстой", "абаюнда", "ахуенно", "кайф"],
          gif: jpg6
        },
        {
          question: "Ето мы с тобой???",
          answers: ["я твоя сучка...", "уфф", "нет!", "да😳"],
          gif: jpg17
        },
        {
          question: "Какое либидо должно быть у вашего любимого😳?!",
          answers: ["ШОБ ЕБАЛ МЕНЯ 24 часа в сутки", "низкое!", "как у моего любимого котика", "как у меня!!"],
          gif: jpg7
        },
        {
          question: "Знаете ли вы, что ваш будущий котик готов на всё ради вас и очень сильно любит!!??!?",
          answers: ["Дяяяя", "нет, он врун", "Конечно!! Люблю-люблю!", "сомневаюсь"],
          gif: jpg8
        },
        {
          question: "Хочется ли вам вайбово курить с вашим котиком??",
          answers: ["Да!", "+вааайб", "хочеца", "не, мне пофик"],
          gif: jpg9
        },
        {
          question: "Насколько сильно должен любить вас, ваш будущий котик!???",
          answers: ["ОЧЕНЬ-ОЧЕНЬ СИЛЬНА", "Трижды в +∞", "Безумно жёстко", "ПИЗДЕЦ КАК СИЛЬНО😳", "все варианты!)"],
          gif: jpg18
        },
        {
          question: "",
          answers: [""],
          gif: bebezyna
        },
        // Добавьте больше вопросов по желанию
    ];

    const handleNext = () => {
        setCurrentQuestion(currentQuestion + 1);
        setActiveButton(null);
        console.log(currentQuestion)
        if (currentQuestion >= 8) {
          setShowFine(true)
        } else {
          setShowFine(false)
        }
    };

    const handleEmojiClick = (index) => {
      if (index === 1) {
        setShowContent(true)
        setShowFine(false)
        setShowAnniversary(false)
        setShowMusic(false)
        setShowMap(false)
      } else if (index === 3) {
        setShowAnniversary(true)
        setShowContent(false)
        setShowFine(false)
        setShowMusic(false)
        setShowMap(false)
      } else if (index === 4) {
        setShowMusic(true)
        setShowContent(false)
        setShowFine(false)
        setShowAnniversary(false)
        setShowMap(false)
      } else if (index === 5) {
        setShowMap(true)
        setShowMusic(false)
        setShowContent(false)
        setShowFine(false)
        setShowAnniversary(false)
      } else if (index === 9) {
        setShowContent(false)
        setShowFine(false)
        setShowAnniversary(false)
        setShowMusic(false)
        setShowMap(false)
      } else {
        setShowContent(false)
        setShowAnniversary(false)
        setShowMusic(false)
        setShowMap(false)
      }
      if (index === 2) {
          setShowTimer(true);
          console.log(index)
      } else {
          if(currentQuestion >= 8) {
            if ( index !== 1) {
              setShowFine(true)
            }
          }
          setShowTimer(false);
      }
      setActiveButton(index);
    };

    const handleRestart = () => {
      setCurrentQuestion(0);
      setShowFine(false);
  };

    return (
        <div className="app">
            <div className="center">
              <Header 
                activeButton={activeButton} 
                setActiveButton={handleEmojiClick} 
                gif={questions[currentQuestion].gif} 
                index={currentQuestion}
                showAnniversary={showAnniversary}
              />
              {showTimer ? ( <Timer /> ) : (
                <>
                    {showFine ? ( <EndScreen onRestart={handleRestart} /> ) : (
                      <>
                        {showContent ? (<Archive />) : (
                          <>
                            {showAnniversary ? (<Anniversary />) : (
                              <>
                                {showMusic ? (<MusicCorner />) : (
                                  <>
                                    {showMap ? (<MeetingsMap />) : (
                                      <>
                                        {activeButton === 6 ? (<MemoriesTimeline />) : (
                                          <>
                                            {activeButton === 7 ? (<JointDreams />) : (
                                              <>
                                                {activeButton === 8 ? (<LoveTree />) : (
                                                  <>
                                                    {activeButton === 9 ? (<SecretNotes />) : (
                          <>
                            <Question question={questions[currentQuestion].question} />
                            <Answers answers={questions[currentQuestion].answers} />
                            <Footer onNext={handleNext} />
                                                      </>
                                                    )}
                                                  </>
                                                )}
                                              </>
                                            )}
                                          </>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </> 
                        )}      
                      </>
                    )}
                </>
              )}
            </div>
        </div>
    );
};

export default App;
