import { route } from 'preact-router';

export default function Home () {
    return (
        <section>
            <h1>Welcome to repass Quizz ✨</h1>
            <div>
                <button onClick={() => route('/quizz', true)}>Import file and go to the next page</button>
            </div>
        </section>
    );
} 