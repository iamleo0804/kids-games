import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GameButton from "../../components/ui/GameButton";
import {
  LuArrowLeft,
  LuVolume2,
  LuCheck,
  LuX,
  LuPartyPopper,
} from "react-icons/lu";
import { INITIAL_STICKERS } from "../../types/sticker";
import { addSticker } from "../../utils/stickerStorage";
import { playCorrectSound, playIncorrectSound } from "../../utils/audio";
import "./QuizPlay.css";

interface Question {
  id: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
  audioText: string;
}

const QuizPlay: React.FC = () => {
  const { subjectId, levelId } = useParams<{
    subjectId: string;
    levelId: string;
  }>();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [newStickerAwarded, setNewStickerAwarded] = useState<string | null>(
    null,
  );

  // 模擬題目產生器 (實際開發會更複雜)
  useEffect(() => {
    const generated: Question[] = [];
    const usedEquations = new Set<string>();

    while (generated.length < 10) {
      if (subjectId === "math") {
        let num1: number,
          num2: number,
          ans: number,
          operator: string,
          audioOp: string;

        if (levelId === "k") {
          // 幼稚園：10以內加法
          num1 = Math.floor(Math.random() * 5) + 1;
          num2 = Math.floor(Math.random() * 5) + 1;
          ans = num1 + num2;
          operator = "+";
          audioOp = "加";
        } else if (levelId === "g1") {
          // 一年級：20以內加減法
          const isSub = Math.random() > 0.5;
          if (isSub) {
            num1 = Math.floor(Math.random() * 10) + 10; // 10-20
            num2 = Math.floor(Math.random() * 10) + 1; // 1-10
            ans = num1 - num2;
            operator = "-";
            audioOp = "減";
          } else {
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            ans = num1 + num2;
            operator = "+";
            audioOp = "加";
          }
        } else {
          // 二年級：50以內加減法或乘法
          const type = Math.floor(Math.random() * 3);
          if (type === 0) {
            // 加法
            num1 = Math.floor(Math.random() * 25) + 1;
            num2 = Math.floor(Math.random() * 25) + 1;
            ans = num1 + num2;
            operator = "+";
            audioOp = "加";
          } else if (type === 1) {
            // 減法
            num1 = Math.floor(Math.random() * 50) + 1;
            num2 = Math.floor(Math.random() * num1) + 1;
            ans = num1 - num2;
            operator = "-";
            audioOp = "減";
          } else {
            // 簡單乘法 (2, 3, 5, 10)
            const multipliers = [2, 3, 5, 10];
            num1 = multipliers[Math.floor(Math.random() * multipliers.length)];
            num2 = Math.floor(Math.random() * 9) + 1;
            ans = num1 * num2;
            operator = "×";
            audioOp = "乘以";
          }
        }

        const equation = `${num1}${operator}${num2}`;
        if (usedEquations.has(equation)) continue;
        usedEquations.add(equation);

        // 產生干擾選項
        const wrongOptions = new Set<number>();
        while (wrongOptions.size < 3) {
          const offset = Math.floor(Math.random() * 5) + 1;
          const sign = Math.random() > 0.5 ? 1 : -1;
          const wrong = ans + offset * sign;
          if (wrong !== ans && wrong >= 0) {
            wrongOptions.add(wrong);
          }
        }

        const options = [ans, ...Array.from(wrongOptions)]
          .sort(() => Math.random() - 0.5)
          .map(String);
        generated.push({
          id: `m-${generated.length}`,
          prompt: `${num1} ${operator} ${num2} = ?`,
          audioText: `${num1} ${audioOp} ${num2} 等於多少？`,
          options,
          correctAnswer: String(ans),
        });
      } else {
        break;
      }
    }
    setQuestions(generated);
  }, [subjectId, levelId]);

  const currentQuestion = questions[currentIndex];

  const handleSpeak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = subjectId === "english" ? "en-US" : "zh-TW";
    window.speechSynthesis.speak(utterance);
  };

  // 自動播放已移除，僅在點選按鈕時播放

  useEffect(() => {
    if (isCompleted) {
      if (subjectId === "math") {
        const added = addSticker("math-star-1");
        if (added) setNewStickerAwarded("math-star-1");
      }
      if (score === 100) {
        const added = addSticker("perfect-score");
        if (added) setNewStickerAwarded("perfect-score");
      }
    }
  }, [isCompleted, score, subjectId]);

  const awardedSticker = INITIAL_STICKERS.find(
    (s) => s.id === newStickerAwarded,
  );

  const handleAnswer = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    if (option === currentQuestion.correctAnswer) {
      setScore((s) => s + 10);
      playCorrectSound();
    } else {
      playIncorrectSound();
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((c) => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  if (isCompleted) {
    return (
      <div className="quiz-result-page">
        <LuPartyPopper
          className="result-icon animate-bounce"
          size={100}
          color="var(--color-secondary)"
        />
        <h1 className="result-title">冒險完成！</h1>
        <div className="score-display">
          <span className="score-label">最後得分</span>
          <span className="score-number">{score}</span>
        </div>

        {awardedSticker && (
          <div className="sticker-award animate-bounce">
            <img
              src={`/${awardedSticker.image}`}
              alt={awardedSticker.name}
              className="award-sticker-img"
            />
            <p className="award-text">
              恭喜獲得新獎勵：{awardedSticker.name}！
            </p>
          </div>
        )}
        <GameButton size="xl" variant="primary" onClick={() => navigate("/")}>
          回首頁
        </GameButton>
      </div>
    );
  }

  if (!currentQuestion) return <div>載入中...</div>;

  return (
    <div className="quiz-play-page">
      <header className="quiz-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <LuArrowLeft /> 離開
        </button>
        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>
          <span className="progress-text">
            第 {currentIndex + 1} / {questions.length} 題
          </span>
        </div>
        <div className="score-badge">分：{score}</div>
      </header>

      <main className="quiz-main">
        <div className="question-card">
          <h2 className="question-text">{currentQuestion.prompt}</h2>
          <button
            className="speak-btn"
            onClick={() => handleSpeak(currentQuestion.audioText)}
          >
            <LuVolume2 size={32} />
          </button>
        </div>

        <div className="options-grid">
          {currentQuestion.options.map((option, idx) => (
            <GameButton
              key={idx}
              variant={
                isAnswered
                  ? option === currentQuestion.correctAnswer
                    ? "success"
                    : option === selectedOption
                      ? "danger"
                      : "primary"
                  : "primary"
              }
              size="lg"
              onClick={() => handleAnswer(option)}
              disabled={isAnswered}
              className={`option-btn ${isAnswered && option === currentQuestion.correctAnswer ? "animate-bounce" : ""}`}
            >
              {option}
            </GameButton>
          ))}
        </div>

        {isAnswered && (
          <div className="feedback-area">
            {selectedOption === currentQuestion.correctAnswer ? (
              <div className="feedback feedback--correct">
                <LuCheck /> 太棒了！答對了！
              </div>
            ) : (
              <div className="feedback feedback--incorrect">
                <LuX /> 沒關係，內容是 {currentQuestion.correctAnswer}
              </div>
            )}
            <GameButton variant="secondary" size="lg" onClick={handleNext}>
              下一題
            </GameButton>
          </div>
        )}
      </main>
    </div>
  );
};

export default QuizPlay;
