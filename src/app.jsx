import { useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import './app.css'

import { Router } from 'preact-router';
import Home from './pages/Home.jsx';
import Quizz from './pages/Quizz.jsx';
import ResultQuizz from './pages/ResultQuizz.jsx';

export function App() {

  return (
    <>
        <Router>
            <Home path="/" default />
            <Quizz path="/quizz" />
            <ResultQuizz path="/result-quizz" />
        </Router>
    </>
  )
}
