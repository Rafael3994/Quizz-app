import { useState } from 'react';

export default function CardQuizz ({questions, setQuestions, currentQuestionIndex, setCurrentQuestionIndex}) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [score, setScore] = useState(0);
    const [questionsAnswered, setQuestionsAnswered] = useState(0);
    const currentQuestion = questions && questions[currentQuestionIndex];

    const handleAnswer = (answer) => {
        if (selectedAnswer !== null) return

        setSelectedAnswer(answer)
        const currentQuestion = questions[currentQuestionIndex]
        const correct = answer === currentQuestion.answer
        setIsCorrect(correct)

        if (correct) {
            setScore(score + 1)
        }
        setQuestionsAnswered(questionsAnswered + 1)
    }

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
            setSelectedAnswer(null)
            setIsCorrect(null)
        }
    }
    const percentCorrect = questionsAnswered > 0 ? Math.round((score / questions.length) * 100) : 0
    const resetQuizz = () => {
        setScore(0)
        setQuestionsAnswered(0)
        setCurrentQuestionIndex(0)
        setSelectedAnswer(null)
        setIsCorrect(null)
    }

    return (
        <div className="card">
            <div className="card-header">
                <h1 className="card-title">
                    Pregunta {currentQuestionIndex + 1} de {questions.length}
                </h1>
                <div className="score-container">
                    <p className="score-text">
                        Puntuación: {score} de {questionsAnswered} ({percentCorrect}%)
                    </p>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${percentCorrect}%` }}></div>
                    </div>
                </div>
            </div>
            <div className="card-content">
                <p className="question-text">{currentQuestion.question}</p>

                <div className="answer-buttons">
                    <button
                        onClick={() => handleAnswer(true)}
                        className={`button answer-button ${selectedAnswer === true ? "selected" : ""}`}
                        disabled={selectedAnswer !== null}
                    >
                        Verdadero
                    </button>
                    <button
                        onClick={() => handleAnswer(false)}
                        className={`button answer-button ${selectedAnswer === false ? "selected" : ""}`}
                        disabled={selectedAnswer !== null}
                    >
                        Falso
                    </button>
                </div>

                {selectedAnswer !== null && (
                    <div className={`alert ${isCorrect ? "alert-success" : "alert-error"}`}>
                        <div className="alert-header">
                            {isCorrect ? (
                                <div>
                                    <h1>Correcto ✨</h1>
                                </div>
                            ) : (
                                <div>
                                    <h1>Incorrecto ❌</h1>
                                </div>
                            )}
                        </div>
                        <p className="alert-description">{currentQuestion.explanation}</p>
                    </div>
                )}
            </div>
            <div className="card-footer">
                <button
                    className="button button-outline"
                    onClick={() => {
                        setQuestions(null)
                        resetQuizz()
                    }}
                >
                    Cargar otro archivo
                </button>
                <button
                    className="button button-outline"
                    onClick={() => {
                        resetQuizz()
                    }}
                >
                    Repetir Cuestionario
                </button>
                {selectedAnswer !== null &&
                    (currentQuestionIndex >= questions.length - 1 ? (
                        <div className="quiz-completed">
                            <p className="completed-title">¡Cuestionario completado!</p>
                            <p className="completed-score">
                                Puntuación final: {score} de {questions.length} ({Math.round((score / questions.length) * 100)}%)
                            </p>
                        </div>
                    ) : (
                        <button className="button" onClick={nextQuestion}>
                            Siguiente pregunta
                        </button>
                    ))}
            </div>
        </div>
    );
}