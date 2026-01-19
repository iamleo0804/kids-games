const STORAGE_KEY = "kids-games-stickers";

export const getOwnedStickers = (): string[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addSticker = (stickerId: string): boolean => {
  const owned = getOwnedStickers();
  if (owned.includes(stickerId)) return false;

  const newOwned = [...owned, stickerId];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newOwned));
  return true;
};

export const clearStickers = () => {
  localStorage.removeItem(STORAGE_KEY);
};
