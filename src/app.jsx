import './app.css'

import { Router } from 'preact-router';
import Home from './pages/Home.jsx';

export function App() {

  return (
    <>
        <Router>
            <Home path="/" default />
        </Router>
    </>
  )
}
