const PROGRESS_KEY_PREFIX = "kids-games-progress-";

export const getLevelProgress = (
  subjectId: string,
  operationId: string,
): number => {
  const key = `${PROGRESS_KEY_PREFIX}${subjectId}-${operationId}`;
  const stored = localStorage.getItem(key);
  return stored ? parseInt(stored, 10) : 1; // 預設第 1 關
};

export const saveLevelProgress = (
  subjectId: string,
  operationId: string,
  level: number,
) => {
  const key = `${PROGRESS_KEY_PREFIX}${subjectId}-${operationId}`;
  const current = getLevelProgress(subjectId, operationId);
  if (level > current) {
    localStorage.setItem(key, level.toString());
  }
};

export const clearAllProgress = () => {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(PROGRESS_KEY_PREFIX)) {
      localStorage.removeItem(key);
    }
  });
};
