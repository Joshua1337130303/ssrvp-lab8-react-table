import React from 'react';

const Header = ({ activeButton, setActiveButton, gif, index, showAnniversary }) => {
    return (
        <header>
            <div className='button-panel'>
                <button className={`emoji-button ${activeButton === 0 ? 'active' : ''}`} onClick={() => setActiveButton(0)}>
                    😺
                </button>
                <button className={`emoji-button ${activeButton === 1 ? 'active' : ''}`} onClick={() => setActiveButton(1)}>
                    🐱
                </button>
                <button className={`emoji-button ${activeButton === 2 ? 'active' : ''}`} onClick={() => setActiveButton(2)}>
                    💖
                </button>
                <button className={`emoji-button ${activeButton === 3 ? 'active' : ''}`} onClick={() => setActiveButton(3)}>
                    💑
                </button>
                <button className={`emoji-button ${activeButton === 4 ? 'active' : ''}`} onClick={() => setActiveButton(4)}>
                    🎵
                </button>
                <button className={`emoji-button ${activeButton === 5 ? 'active' : ''}`} onClick={() => setActiveButton(5)}>
                    🗺️
                </button>
                <button className={`emoji-button ${activeButton === 6 ? 'active' : ''}`} onClick={() => setActiveButton(6)}>
                    📖
                </button>
                <button className={`emoji-button ${activeButton === 7 ? 'active' : ''}`} onClick={() => setActiveButton(7)}>
                    🌠
                </button>
                <button className={`emoji-button ${activeButton === 8 ? 'active' : ''}`} onClick={() => setActiveButton(8)}>
                    🌳
                </button>
                <button className={`emoji-button ${activeButton === 9 ? 'active' : ''}`} onClick={() => setActiveButton(9)}>
                    🗝️
                </button>
            </div>
            {activeButton === 2 || activeButton === 1 || index > 8 || showAnniversary || activeButton === 4 || activeButton === 5 || activeButton === 6 || activeButton === 7 || activeButton === 8 || activeButton === 9 ? (<></>) : (<img src={gif} />)}
        </header>
    );
};

export default Header;