import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuArrowLeft, LuRefreshCw } from "react-icons/lu";
import { INITIAL_STICKERS } from "../../types/sticker";
import { getOwnedStickers, clearStickers } from "../../utils/stickerStorage";
import "./Stickers.css";

const Stickers: React.FC = () => {
  const navigate = useNavigate();
  const [ownedIds, setOwnedIds] = useState<string[]>([]);

  useEffect(() => {
    setOwnedIds(getOwnedStickers());
  }, []);

  const handleReset = () => {
    if (window.confirm("確定要重設所有成就嗎？")) {
      clearStickers();
      setOwnedIds([]);
    }
  };

  return (
    <div className="stickers-page">
      <header className="stickers-header">
        <button className="back-button" onClick={() => navigate("/")}>
          <LuArrowLeft /> 返回
        </button>
        <h1 className="stickers-title">成就紀錄簿</h1>
        <p className="stickers-subtitle">看看你收集了多少個獎勵！</p>
        <button
          className="reset-btn"
          onClick={handleReset}
          title="重設成就（開發測試用）"
        >
          <LuRefreshCw />
        </button>
      </header>

      <div className="stickers-grid">
        {INITIAL_STICKERS.map((sticker) => {
          const isOwned = ownedIds.includes(sticker.id);
          return (
            <div
              key={sticker.id}
              className={`sticker-card ${isOwned ? "is-owned" : "is-locked"}`}
            >
              <div className="sticker-image">
                {isOwned ? (
                  <img src={`/${sticker.image}`} alt={sticker.name} />
                ) : (
                  "❓"
                )}
              </div>
              <div className="sticker-info">
                <h3 className="sticker-name">
                  {isOwned ? sticker.name : "神秘獎勵"}
                </h3>
                <p className="sticker-desc">{sticker.description}</p>
                {isOwned && (
                  <span className={`rarity-badge rarity-${sticker.rarity}`}>
                    {sticker.rarity}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stickers;
