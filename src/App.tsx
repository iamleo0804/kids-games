import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './features/quiz/Home';
import LevelSelect from './features/quiz/LevelSelect';
import QuizPlay from './features/quiz/QuizPlay';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz/:subjectId" element={<LevelSelect />} />
            <Route path="/quiz/:subjectId/:levelId" element={<QuizPlay />} />
            {/* 更多路徑將在此加入 */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
