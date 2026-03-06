import React from 'react';
import './App.css';

const MusicCorner = () => {
  return (
    <div className="music-corner">
      <h2>🎵 Музыкальный уголок</h2>
      <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%'}}>
        <iframe
          frameBorder="0"
          allow="clipboard-write"
          style={{border:'none', width:'100%', maxWidth:614, height:244}}
          width="614"
          height="244"
          src="https://music.yandex.ru/iframe/album/23593193/track/107522081"
          title="Яндекс Музыка"
        >
          Слушайте <a href="https://music.yandex.ru/album/23593193/track/107522081">немерено</a> — <a href="https://music.yandex.ru/artist/8451432">лампабикт</a> на Яндекс Музыке
        </iframe>
      </div>
    </div>
  );
};

export default MusicCorner; 