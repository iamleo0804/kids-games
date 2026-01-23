import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GameButton from "../../components/ui/GameButton";
import {
  LuHouse,
  LuVolume2,
  LuCheck,
  LuX,
  LuPartyPopper,
} from "react-icons/lu";
import { INITIAL_STICKERS } from "../../types/sticker";
import { addSticker } from "../../utils/stickerStorage";
import { saveLevelProgress } from "../../utils/progressStorage";
import { generateMathQuestions } from "../../utils/mathGenerator";
import { playCorrectSound, playIncorrectSound } from "../../utils/audio";
import "./QuizPlay.css";

const QuizPlay: React.FC = () => {
  const { subjectId, operation, levelNumber } = useParams<{
    subjectId: string;
    operation: string;
    levelNumber: string;
  }>();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [questionSeed, setQuestionSeed] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [newStickerAwarded, setNewStickerAwarded] = useState<string | null>(
    null,
  );
  const completionHandledRef = useRef(false);

  const questions = useMemo(() => {
    if (subjectId === "math" && operation && levelNumber) {
      return generateMathQuestions(operation, parseInt(levelNumber, 10));
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectId, operation, levelNumber, questionSeed]);

  const currentQuestion = questions[currentIndex];

  const handleSpeak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-TW";
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (isCompleted && !completionHandledRef.current) {
      completionHandledRef.current = true;
      
      if (subjectId === "math" && operation && levelNumber) {
        if (score >= 80) {
          saveLevelProgress(
            subjectId,
            operation,
            parseInt(levelNumber, 10) + 1,
          );
        }
        const added = addSticker("math-star-1");
        if (added) {
          setNewStickerAwarded("math-star-1");
          return;
        }
      }
      if (score === 100) {
        const added = addSticker("perfect-score");
        if (added) setNewStickerAwarded("perfect-score");
      }
    }
  }, [isCompleted, score, subjectId, operation, levelNumber]);

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

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCompleted(false);
    setNewStickerAwarded(null);
    completionHandledRef.current = false;
    setQuestionSeed((s) => s + 1);
  };

  const handleNextLevel = () => {
    if (levelNumber) {
      const nextLevel = parseInt(levelNumber, 10) + 1;
      navigate(`/quiz/${subjectId}/${operation}/${nextLevel}`, {
        replace: true,
      });
      setCurrentIndex(0);
      setScore(0);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCompleted(false);
      setNewStickerAwarded(null);
      completionHandledRef.current = false;
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

        <div className="result-actions">
          <GameButton size="xl" variant="primary" onClick={() => navigate("/")}>
            回首頁
          </GameButton>
          {score >= 80 ? (
            <GameButton size="xl" variant="success" onClick={handleNextLevel}>
              前進下一關！
            </GameButton>
          ) : (
            <GameButton size="xl" variant="secondary" onClick={handleRestart}>
              再試一次
            </GameButton>
          )}
        </div>
      </div>
    );
  }

  if (!currentQuestion) return <div>載入中...</div>;

  return (
    <div className="quiz-play-page">
      <header className="quiz-header">
        <div className="header-left-part">
          <div className="score-badge">分：{score}</div>
        </div>

        <div className="header-center-part">
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
        </div>

        <div className="header-right-part">
          <div className="header-actions">
            <GameButton
              variant="secondary"
              size="md"
              onClick={() => navigate("/")}
              className="exit-btn-circle"
              aria-label="回首頁"
            >
              <LuHouse size={24} />
            </GameButton>
          </div>
        </div>
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
                <LuX /> 沒關係，答案是 {currentQuestion.correctAnswer}
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
