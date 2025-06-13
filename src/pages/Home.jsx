import { useState } from 'react';
import CardLoadFile from './../components/CardLoadFile.jsx';
import CardQuizz from '../components/CardQuizz.jsx';

export default function Home() {
    const [questions, setQuestions] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    return (
        <main className="main-container">
            <div className="quiz-container">
                {
                    !questions ?
                        <CardLoadFile setQuestions={setQuestions} setCurrentQuestionIndex={setCurrentQuestionIndex} />
                        :
                        <CardQuizz questions={questions} setQuestions={setQuestions} currentQuestionIndex={currentQuestionIndex} setCurrentQuestionIndex={setCurrentQuestionIndex} />
                }
            </div>
        </main>
    );
} 