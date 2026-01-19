# 🌟 大冒險樂園 (Kids Adventure Game)

一個專為兒童設計的沉浸式學習平台，結合了趣味遊戲與學科挑戰。透過可愛的視覺效果、動態音效與獎勵系統，讓孩子在冒險中快樂學習。

## 🚀 核心功能

### 🔢 數學大挑戰 (Math Challenge)

- **動態題目生成**：不再重複枯燥的題目，系統根據等級即時運算產生。
- **100 級難度成長**：從加法、減法到乘除法，每個類別都有 100 關，挑戰難度隨關卡穩定提升。
- **四類運算分頁**：獨立的加、減、乘、除面板，循序漸進解鎖進度。
- **智慧難度調整**：例如乘法前 3 關固定為基礎 1 & 2 的練習，幫助建立自信。

### 🎨 貼紙獎勵系統 (Sticker Collection)

- **成就達成**：完成特定測驗或滿分即可獲得精美的 3D 高質感貼紙。
- **專屬圖鑑**：內建貼紙集結簿（Achievement Book），紀錄成長的點滴。
- **驚喜回饋**：獲得新貼紙時擁有專屬的獲獎動畫。

### 📱 iPad 優化設計 (iPad Optimized)

- **橫屏優先**：針對廣大使用的 iPad 畫面進行佈局優化。
- **大觸控目標**：加大的按鈕與網格，符合兒童的操作直覺。
- **彈性排版**：確保結算按鈕與 UI 在各種縮放比例下均能清晰呈現。
- **生動互動**：按鈕具備 Hover 浮動與 Active 點擊縮放效果，搭配 Web Audio API 的即時音效。

## 🛠️ 技術庫 (Tech Stack)

- **前端框架**: [React 18](https://reactjs.org/)
- **語言**: [TypeScript](https://www.typescriptlang.org/)
- **構建工具**: [Vite](https://vitejs.dev/)
- **路由**: [React Router DOM](https://reactrouter.com/)
- **音效系統**: [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) (即時合成音效，免下載額外資源)
- **圖示**: [React Icons (Lu)](https://react-icons.github.io/react-icons/)
- **設計風格**: 圓潤 UI (Claymorphism) + 高對比鮮豔色彩

## 🏃 快速開始

1. **安裝依賴**:

   ```bash
   npm install
   ```

2. **啟動開發伺服器**:

   ```bash
   npm run dev
   ```

3. **打包生產版本**:
   ```bash
   npm run build
   ```

## 📅 開發進度

- [x] 基礎 UI 組件庫 (GameButton, Card)
- [x] 數學動態生成題目邏輯
- [x] 100 關卡進度儲存系統
- [x] 貼紙獎勵與圖鑑系統
- [x] Web Audio API 音效整合
- [ ] 英文大冒險科目 (調整中)
- [ ] 中文小博士科目 (待開發)
- [ ] 主題場景更換功能 (待開發)

---

Made with ❤️ for Kids Education.
