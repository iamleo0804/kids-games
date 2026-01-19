import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LuArrowLeft, LuLock, LuCheck } from "react-icons/lu";
import { getLevelProgress } from "../../utils/progressStorage";
import "./LevelSelect.css";

const LevelSelect: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"add" | "sub" | "mul" | "div">(
    "add",
  );
  const [currentProgress, setCurrentProgress] = useState(1);

  const operations = [
    { id: "add", name: "加法", variant: "primary" as const },
    { id: "sub", name: "減法", variant: "secondary" as const },
    { id: "mul", name: "乘法", variant: "success" as const },
    { id: "div", name: "除法", variant: "accent" as const },
  ];

  useEffect(() => {
    setCurrentProgress(getLevelProgress(subjectId || "math", activeTab));
  }, [subjectId, activeTab]);

  const handleSelectLevel = (levelNumber: number) => {
    if (levelNumber <= currentProgress) {
      navigate(`/quiz/${subjectId}/${activeTab}/${levelNumber}`);
    }
  };

  return (
    <div className="level-select-page">
      <header className="level-header">
        <button className="back-button" onClick={() => navigate("/")}>
          <LuArrowLeft /> 返回
        </button>
        <h1 className="level-title">挑戰關卡</h1>
        <p className="level-subtitle">
          選擇一個運算方式，開始你的第 {currentProgress} 關吧！
        </p>
      </header>

      <div className="operation-tabs">
        {operations.map((op) => (
          <button
            key={op.id}
            className={`op-tab op-tab--${op.variant} ${activeTab === op.id ? "is-active" : ""}`}
            onClick={() => setActiveTab(op.id as any)}
          >
            {op.name}
          </button>
        ))}
      </div>

      <div className="levels-container">
        <div className="levels-grid">
          {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => {
            const isLocked = num > currentProgress;
            const isCompleted = num < currentProgress;

            return (
              <button
                key={num}
                className={`level-btn ${isLocked ? "is-locked" : ""} ${isCompleted ? "is-completed" : ""} ${num === currentProgress ? "is-current" : ""}`}
                onClick={() => handleSelectLevel(num)}
                disabled={isLocked}
              >
                {isLocked ? <LuLock size={20} /> : num}
                {isCompleted && (
                  <LuCheck className="completed-icon" size={14} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LevelSelect;
