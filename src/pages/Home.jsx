import { useRef, useState } from 'react';

export default function Home() {
    const fileInputRef = useRef(null);
    const [dragging, setDragging] = useState(false);
    const [questions, setQuestions] = useState(null);

    function radomizeShuffleArray(array) {
        return array
          .map(value => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);
      }

    const handleFile = (file) => {
        if (!file) return
        const reader = new FileReader()
        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target?.result)
                setQuestions(radomizeShuffleArray(json))
                setCurrentQuestionIndex(0)
            } catch (error) {
                alert("Error al cargar el archivo JSON. Asegúrate de que el formato sea correcto.")
            }
        }
        reader.readAsText(file)
    }
    function triggerFileSelect() {
        fileInputRef.current?.click();
    }
    function handleFileUpload(e) {
        const file = e.target.files[0];
        handleFile(file);
    }
    function handleDrop(e) {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
    }
    function handleDragOver(e) {
        e.preventDefault();
        setDragging(true);
    }
    function handleDragLeave() {
        setDragging(false);
    }

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [score, setScore] = useState(0);
    const [questionsAnswered, setQuestionsAnswered] = useState(0);
    const currentQuestion = questions && questions[currentQuestionIndex];
    const handleAnswer = (answer) => {
        if (selectedAnswer !== null) return // Prevenir múltiples respuestas

        setSelectedAnswer(answer)
        const currentQuestion = questions[currentQuestionIndex]
        const correct = answer === currentQuestion.answer
        setIsCorrect(correct)

        // Actualizar puntuación y contador de preguntas respondidas
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
        <main className="main-container">
            <div className="quiz-container">
                {
                    !questions ?
                        (
                            <section className="card">
                                <div className="card-header">
                                    <h1 className="card-title">Cuestionario de Verdadero/Falso</h1>
                                    <p className="card-description">Carga un archivo JSON con tus preguntas para comenzar</p>
                                </div>
                                <div className="card-content">
                                    <div
                                        className={`file-upload-area ${dragging ? 'dragging' : ''}`}
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                    >
                                        <p className="upload-text">
                                            Arrastra y suelta tu archivo JSON o haz clic para seleccionarlo
                                        </p>

                                        <input
                                            type="file"
                                            accept=".json"
                                            ref={fileInputRef}
                                            onChange={handleFileUpload}
                                            style={{ display: 'none' }}
                                        />

                                        <button type="button" onClick={triggerFileSelect} className="button button-outline">
                                            Seleccionar archivo
                                        </button>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <p className="json-format-text">El archivo JSON debe tener el formato:</p>
                                    <pre className="json-example">
                                        {JSON.stringify(
                                            [
                                                {
                                                    "question": "¿La Tierra es redonda?",
                                                    "answer": true,
                                                    "explanation": "Aunque la Tierra no es una esfera perfecta, tiene una forma aproximadamente redonda (geoide), ligeramente achatada en los polos debido a su rotación."
                                                },
                                                {
                                                    "question": "¿Existen más de dos sexos biológicos en los seres humanos?",
                                                    "answer": false,
                                                    "explanation": "Biológicamente, la mayoría de los seres humanos se clasifican como varones (XY) o hembras (XX). Existen casos raros de intersexualidad, pero no constituyen sexos biológicos adicionales definidos."
                                                }
                                            ],
                                            null,
                                            2,
                                        )}
                                    </pre>
                                </div>
                            </section>
                        )
                        :
                        (
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
                        )
                }
            </div>
        </main>
    );
} 