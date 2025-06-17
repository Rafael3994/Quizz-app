import { useState } from 'react';

export default function CardQuizz({questions, setCurrentQuestionIndex, currentQuestionIndex}) {
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

    const resetQuizz = () => {
        setScore(0)
        setQuestionsAnswered(0)
        setCurrentQuestionIndex(0)
        setSelectedAnswer(null)
        setIsCorrect(null)
    }

    const percentCorrect = questionsAnswered > 0 ? Math.round((score / questions.length) * 100) : 0;

    return {
        isCorrect,
        percentCorrect,
        currentQuestion,
        score,
        questionsAnswered,
        selectedAnswer,
        resetQuizz,
        nextQuestion,
        handleAnswer,
    };
}