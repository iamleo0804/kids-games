import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GameButton from '../../components/ui/GameButton';
import { LuArrowLeft, LuStar, LuTrophy, LuMedal } from 'react-icons/lu';
import './LevelSelect.css';

const LevelSelect: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();

  const levels = [
    { id: 'k', name: '基礎等級', label: '幼稚園', icon: <LuStar />, variant: 'secondary' as const },
    { id: 'g1', name: '進階等級', label: '國小一年級', icon: <LuMedal />, variant: 'success' as const },
    { id: 'g2', name: '大師等級', label: '國小二年級', icon: <LuTrophy />, variant: 'accent' as const },
  ];

  const getSubjectName = (id: string | undefined) => {
    switch (id) {
      case 'math': return '數學';
      case 'chinese': return '中文';
      case 'english': return '英文';
      default: return '';
    }
  };

  const handleSelectLevel = (levelId: string) => {
    navigate(`/quiz/${subjectId}/${levelId}`);
  };

  return (
    <div className="level-select-page">
      <header className="level-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <LuArrowLeft /> 返回
        </button>
        <h1 className="level-title">{getSubjectName(subjectId)}冒險</h1>
        <p className="level-subtitle">選擇一個適合你的等級吧！</p>
      </header>

      <div className="level-grid">
        {levels.map((level) => (
          <div key={level.id} className="level-card-wrapper">
            <GameButton
              variant={level.variant}
              size="xl"
              icon={level.icon}
              onClick={() => handleSelectLevel(level.id)}
              className="level-card"
            >
              <div className="level-card-text">
                <span className="level-name">{level.name}</span>
                <span className="level-label">{level.label}</span>
              </div>
            </GameButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelSelect;
