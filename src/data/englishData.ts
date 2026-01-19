export interface EnglishQuestion {
  word: string;
  translation: string;
  options: string[];
  type: "word-to-image" | "word-to-translation" | "translation-to-word";
}

export const ENGLISH_DATA: Record<string, EnglishQuestion[]> = {
  k: [
    {
      word: "Apple",
      translation: "蘋果",
      options: ["蘋果", "香蕉", "橘子", "葡萄"],
      type: "word-to-translation",
    },
    {
      word: "Cat",
      translation: "貓",
      options: ["貓", "狗", "鳥", "魚"],
      type: "word-to-translation",
    },
    {
      word: "Dog",
      translation: "狗",
      options: ["狗", "貓", "兔子", "獅子"],
      type: "word-to-translation",
    },
    {
      word: "Red",
      translation: "紅色",
      options: ["紅色", "藍色", "黃色", "綠色"],
      type: "word-to-translation",
    },
    {
      word: "Blue",
      translation: "藍色",
      options: ["藍色", "紅色", "綠色", "紫色"],
      type: "word-to-translation",
    },
    {
      word: "One",
      translation: "一",
      options: ["一", "二", "三", "四"],
      type: "word-to-translation",
    },
    {
      word: "Sun",
      translation: "太陽",
      options: ["太陽", "月亮", "星星", "雲"],
      type: "word-to-translation",
    },
    {
      word: "Boy",
      translation: "男孩",
      options: ["男孩", "女孩", "男人", "女人"],
      type: "word-to-translation",
    },
    {
      word: "Girl",
      translation: "女孩",
      options: ["女孩", "男孩", "老師", "學生"],
      type: "word-to-translation",
    },
    {
      word: "Book",
      translation: "書",
      options: ["書", "筆", "包", "桌"],
      type: "word-to-translation",
    },
  ],
  g1: [
    {
      word: "Elephant",
      translation: "大象",
      options: ["大象", "長頸鹿", "獅子", "老虎"],
      type: "word-to-translation",
    },
    {
      word: "Banana",
      translation: "香蕉",
      options: ["香蕉", "蘋果", "梨子", "西瓜"],
      type: "word-to-translation",
    },
    {
      word: "Yellow",
      translation: "黃色",
      options: ["黃色", "黑色", "白色", "灰色"],
      type: "word-to-translation",
    },
    {
      word: "Teacher",
      translation: "老師",
      options: ["老師", "醫生", "警察", "學生"],
      type: "word-to-translation",
    },
    {
      word: "School",
      translation: "學校",
      options: ["學校", "家", "公園", "動物園"],
      type: "word-to-translation",
    },
    {
      word: "Friend",
      translation: "朋友",
      options: ["朋友", "家人", "鄰居", "同學"],
      type: "word-to-translation",
    },
    {
      word: "Water",
      translation: "水",
      options: ["水", "牛奶", "果汁", "茶"],
      type: "word-to-translation",
    },
    {
      word: "Bread",
      translation: "麵包",
      options: ["麵包", "米飯", "麵條", "蛋"],
      type: "word-to-translation",
    },
    {
      word: "Happy",
      translation: "快樂",
      options: ["快樂", "生氣", "傷心", "累"],
      type: "word-to-translation",
    },
    {
      word: "Jump",
      translation: "跳",
      options: ["跳", "跑", "走", "坐"],
      type: "word-to-translation",
    },
  ],
  g2: [
    {
      word: "Breakfast",
      translation: "早餐",
      options: ["早餐", "午餐", "晚餐", "點心"],
      type: "word-to-translation",
    },
    {
      word: "Beautiful",
      translation: "美麗",
      options: ["美麗", "難看", "強大", "快"],
      type: "word-to-translation",
    },
    {
      word: "Butterfly",
      translation: "蝴蝶",
      options: ["蝴蝶", "蜜蜂", "螞蟻", "蜘蛛"],
      type: "word-to-translation",
    },
    {
      word: "Morning",
      translation: "早上",
      options: ["早上", "下午", "晚上", "深夜"],
      type: "word-to-translation",
    },
    {
      word: "Library",
      translation: "圖書館",
      options: ["圖書館", "書店", "辦公室", "醫院"],
      type: "word-to-translation",
    },
    {
      word: "Under",
      translation: "在...下面",
      options: ["在下面", "在上面", "在裡面", "在旁邊"],
      type: "word-to-translation",
    },
    {
      word: "Together",
      translation: "一起",
      options: ["一起", "獨自", "有時", "總是"],
      type: "word-to-translation",
    },
    {
      word: "Kitchen",
      translation: "廚房",
      options: ["廚房", "客廳", "浴室", "臥室"],
      type: "word-to-translation",
    },
    {
      word: "Wednesday",
      translation: "星期三",
      options: ["星期三", "星期一", "星期五", "星期日"],
      type: "word-to-translation",
    },
    {
      word: "Thirsty",
      translation: "渴",
      options: ["渴", "餓", "熱", "冷"],
      type: "word-to-translation",
    },
  ],
};
