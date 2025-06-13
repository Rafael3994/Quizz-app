import { route } from 'preact-router';

export default function Quizz () {
    return (
        <section>
            <h1>Quizz</h1>
            <div>
                <button onClick={() => route('/result-quizz', true)}>Answer the question and follow</button>
            </div>
        </section>
    );
} 