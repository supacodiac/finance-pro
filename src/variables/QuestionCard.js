import React from 'react';

function QuestionCard({ question, totalQuestions, currentQuestion, answer, onAnswer, onNext, onPrev }) {
    return (
        <div className="card">
            <h2>Question {currentQuestion} of {totalQuestions}</h2>
            <p>{question.text}</p>
            {question.options.map((option, index) => (
                <div key={index}>
                    <input
                        type="radio"
                        id={`q${question.id}o${index}`}
                        name={`q${question.id}`}
                        value={option}
                        checked={answer === option}
                        onChange={() => onAnswer(question.id, option)}
                    />
                    <label htmlFor={`q${question.id}o${index}`}>{option}</label>
                </div>
            ))}
            <div className="navigation">
                <button onClick={onPrev} disabled={currentQuestion === 1}>Back</button>
                <button onClick={onNext} disabled={currentQuestion === totalQuestions}>Next</button>
            </div>
        </div>
    );
}

export default QuestionCard;