import React from "react";
import { useNavigate } from "react-router-dom";
import GameButton from "../../components/ui/GameButton";
import { LuCalculator, LuTrophy } from "react-icons/lu";
import "./Home.css";

const Home: React.FC = () => {
  const subjects = [
    {
      id: "math",
      name: "數學大挑戰",
      icon: <LuCalculator />,
      variant: "primary" as const,
    },
    /*
    {
      id: "english",
      name: "英文大冒險",
      icon: <LuLanguages />,
      variant: "accent" as const,
    },
    */
    // { id: 'chinese', name: '中文小博士', icon: <LuBookOpen />, variant: 'success' as const },
  ];

  const navigate = useNavigate();

  const handleSelectSubject = (id: string) => {
    navigate(`/level/${id}`);
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <h1 className="home-title">大冒險樂園</h1>
        <p className="home-subtitle">今天想要學習哪一個科目呢？</p>
      </header>

      <div className="subject-grid">
        {subjects.map((subject) => (
          <GameButton
            key={subject.id}
            variant={subject.variant}
            size="xl"
            icon={subject.icon}
            onClick={() => handleSelectSubject(subject.id)}
            className="subject-card"
          >
            {subject.name}
          </GameButton>
        ))}
      </div>

      <div className="home-actions">
        <GameButton
          variant="secondary"
          size="lg"
          icon={<LuTrophy />}
          onClick={() => navigate("/stickers")}
        >
          查看成就紀錄簿
        </GameButton>
      </div>

      <footer className="home-footer">
        <p>準備好要開始了嗎？加油！ 🎉</p>
      </footer>
    </div>
  );
};

export default Home;
