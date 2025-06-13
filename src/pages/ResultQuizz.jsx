import { route } from 'preact-router';

export default function ResultQuizz () {
    return (
        <section>
            <h1>Result Quizz</h1>
            <div>
                <button onClick={() => route('/quizz', true)}>Start quizz</button>
                <button onClick={() => route('/', true)}>Inital Page</button>
            </div>
        </section>
    );
} 