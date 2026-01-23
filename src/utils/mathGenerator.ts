export interface Question {
  id: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
  audioText: string;
}

export const generateMathQuestions = (
  operation: string,
  levelNumber: number,
  count: number = 10,
): Question[] => {
  const questions: Question[] = [];
  const used = new Set<string>();

  const getRange = (level: number) => {
    // 難度曲線隨關卡提升
    const min = Math.floor(level / 10) + 1;
    const max = 5 + level + Math.floor((level * level) / 100);
    return { min, max };
  };

  while (questions.length < count) {
    let num1 = 0,
      num2 = 0,
      ans = 0,
      opChar = "",
      audioOp = "";
    const { max } = getRange(levelNumber);

    switch (operation) {
      case "add":
        num1 = Math.floor(Math.random() * max) + 1;
        num2 = Math.floor(Math.random() * max) + 1;
        ans = num1 + num2;
        opChar = "+";
        audioOp = "加";
        break;
      case "sub":
        ans = Math.floor(Math.random() * max) + 1;
        num2 = Math.floor(Math.random() * max) + 1;
        num1 = ans + num2; // 確保答案為正數
        ans = num1 - num2;
        opChar = "-";
        audioOp = "減";
        break;
      case "mul":
        if (levelNumber <= 3) {
          // 前 3 關：1 或 2 的乘法
          num1 = Math.random() > 0.5 ? 1 : 2;
          num2 = Math.floor(Math.random() * 9) + 1;
        } else {
          // 第 4 關後：難度隨關卡提升，慢慢增加到 9x9
          const maxFactor = Math.min(9, 2 + Math.floor((levelNumber - 1) / 2));
          num1 = Math.floor(Math.random() * maxFactor) + 1;
          num2 = Math.floor(Math.random() * maxFactor) + 1;
          // 確保至少有一個數字符合目前的最高難度上限，避免題目太簡單
          if (Math.random() > 0.5) num1 = maxFactor;
          else num2 = maxFactor;
        }
        ans = num1 * num2;
        opChar = "×";
        audioOp = "乘以";
        break;
      case "div": {
        const divMax = Math.min(12, 3 + Math.floor(levelNumber / 8));
        num2 = Math.floor(Math.random() * divMax) + 2;
        ans = Math.floor(Math.random() * 9) + 1;
        num1 = ans * num2; // 確保整除
        opChar = "÷";
        audioOp = "除以";
        break;
      }
    }

    const key = `${num1}${opChar}${num2}`;
    if (used.has(key)) continue;
    used.add(key);

    // 產生干擾項
    const optionsSet = new Set<number>([ans]);
    while (optionsSet.size < 4) {
      const offset = Math.floor(Math.random() * 5) + 1;
      const sign = Math.random() > 0.5 ? 1 : -1;
      const wrong = ans + offset * sign;
      if (wrong >= 0) optionsSet.add(wrong);
    }

    const options = Array.from(optionsSet)
      .sort(() => Math.random() - 0.5)
      .map(String);

    questions.push({
      id: `${operation}-${levelNumber}-${questions.length}`,
      prompt: `${num1} ${opChar} ${num2} = ?`,
      audioText: `${num1} ${audioOp} ${num2} 等於多少？`,
      options,
      correctAnswer: String(ans),
    });
  }

  return questions;
};
