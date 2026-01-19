export interface Sticker {
  id: string;
  name: string;
  image: string;
  description: string;
  rarity: "common" | "rare" | "epic";
}

export const INITIAL_STICKERS: Sticker[] = [
  {
    id: "math-star-1",
    name: "算術小達人",
    image: "math-star.png",
    description: "完成一次數學測驗",
    rarity: "common",
  },
  {
    id: "perfect-score",
    name: "滿分金盃",
    image: "perfect-score.png",
    description: "獲得一次 100 分",
    rarity: "rare",
  },
  {
    id: "explorer",
    name: "全能冒險家",
    image: "explorer.png",
    description: "嘗試過所有難度",
    rarity: "epic",
  },
];
