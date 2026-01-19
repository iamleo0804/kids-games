import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./features/quiz/Home";
import LevelSelect from "./features/quiz/LevelSelect";
import QuizPlay from "./features/quiz/QuizPlay";
import Stickers from "./features/quiz/Stickers";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/level/:subjectId" element={<LevelSelect />} />
            <Route
              path="/quiz/:subjectId/:operation/:levelNumber"
              element={<QuizPlay />}
            />
            <Route path="/stickers" element={<Stickers />} />
            {/* 更多路徑將在此加入 */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
