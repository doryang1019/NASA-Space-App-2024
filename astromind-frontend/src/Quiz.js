import React, { useState, useEffect } from 'react';
const APP_URL = 'http://localhost:3001'
const QuizQuestion = ({ question, options, onAnswer, answered }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
    <h3 className="text-xl text-white mb-4">{question}</h3>
    <div className="grid grid-cols-2 gap-4">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onAnswer(index)}
          className={`p-3 rounded-md transition-colors duration-300 ${
            answered === index
              ? 'bg-blue-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          disabled={answered !== null}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

const Quiz = ({ onClose }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState(null);
    const [quizComplete, setQuizComplete] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      fetchQuestions();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${APP_URL}/question/all`);
        if (!res.ok) {
          throw new Error('Failed to fetch questions');
        }
        const result = await res.json();
        setQuestions(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError('Failed to load quiz questions. Please try again later.');
        setLoading(false);
      }
    };

    const handleAnswer = (index) => {
      setAnswered(index);
      if (index === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
    };

    const nextQuestion = () => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setAnswered(null);
      } else {
        setQuizComplete(true);
      }
    };

    if (loading) {
      return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
          <div className="text-white text-2xl">Loading questions...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
          <div className="text-red-500 text-2xl">{error}</div>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-xl p-8 max-w-2xl w-full">
          <h2 className="text-3xl text-white mb-6">Exoplanet Quiz</h2>
          {!quizComplete && questions.length > 0 ? (
            <>
              <QuizQuestion
                question={questions[currentQuestion].question}
                options={questions[currentQuestion].options}
                onAnswer={handleAnswer}
                answered={answered}
              />
              <div className="flex justify-between items-center">
                <span className="text-white">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <button
                  onClick={nextQuestion}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300"
                  disabled={answered === null}
                >
                  {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                </button>
              </div>
            </>
          ) : quizComplete ? (
            <div className="text-center">
              <h3 className="text-2xl text-white mb-4">Quiz Complete!</h3>
              <p className="text-xl text-white mb-6">
                Your score: {score} out of {questions.length}
              </p>
              <button
                onClick={onClose}
                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors duration-300"
              >
                Return to Mind Map
              </button>
            </div>
          ) : (
            <div className="text-white text-xl">No questions available.</div>
          )}
        </div>
      </div>
    );
  };

  export default Quiz;
