import React from 'react';

const Answers = ({ answers }) => {
    return (
        <div className="answers">
            {answers.map((answer, index) => (
                <button key={index} className="answer-button">{answer}</button>
            ))}
        </div>
    );
};

export default Answers;
