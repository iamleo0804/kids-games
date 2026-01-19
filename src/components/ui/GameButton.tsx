import React from "react";
import { playClickSound } from "../../utils/audio";
import "./GameButton.css";

interface GameButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "success" | "danger" | "accent";
  size?: "md" | "lg" | "xl";
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

const GameButton: React.FC<GameButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  icon,
}) => {
  return (
    <button
      className={`game-button game-button--${variant} game-button--${size} ${className}`}
      onClick={() => {
        if (!disabled) {
          playClickSound();
          onClick?.();
        }
      }}
      disabled={disabled}
      aria-label={typeof children === "string" ? children : "按鈕"}
    >
      <div className="game-button__content">
        {icon && <span className="game-button__icon">{icon}</span>}
        <span className="game-button__text">{children}</span>
      </div>
      <div className="game-button__shadow"></div>
    </button>
  );
};

export default GameButton;
