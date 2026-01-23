# AGENTS.md - Agentic Coding Guidelines

This document provides guidelines for AI coding agents working on **kids-games**, a React-based educational game application for children (iPad-first design).

## Project Overview

- **Stack**: React 19 + TypeScript + Vite
- **Target**: iPad/Touch devices (children's educational games)
- **Language**: Traditional Chinese (繁體中文) for UI text

---

## Build / Lint / Test Commands

```bash
npm run dev        # Development server (with network access)
npm run build      # Production build (TypeScript + Vite)
npm run lint       # Lint all files
npm run preview    # Preview production build
```

### No Test Framework Configured

This project currently has **no test files or test runner**. If adding tests, use Vitest (Vite-native):

```bash
npm run test              # Run all tests
npm run test -- MyFile    # Run single test file
```

---

## Project Structure

```
src/
├── components/ui/       # Reusable UI components (GameButton, etc.)
├── features/quiz/       # Feature pages (Home, LevelSelect, QuizPlay, Stickers)
├── utils/               # Utility functions (audio, mathGenerator, storage)
├── types/               # TypeScript type definitions
├── data/                # Static data (quiz content)
├── assets/              # Images and sounds
├── App.tsx              # Root component with routes
└── main.tsx             # Entry point
```

---

## Code Style Guidelines

### File Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `GameButton.tsx` |
| Utilities | camelCase | `mathGenerator.ts` |
| Types | camelCase file | `sticker.ts` |
| CSS | Co-located, same name | `GameButton.css` |

### Import Order

```typescript
// 1. React
import React from "react";
// 2. External libraries
import { useNavigate } from "react-router-dom";
import { LuCalculator, LuTrophy } from "react-icons/lu";
// 3. Internal components
import GameButton from "../../components/ui/GameButton";
// 4. Internal utilities/types
import { playClickSound } from "../../utils/audio";
import type { Question } from "../../types/question";
// 5. Styles (last)
import "./Component.css";
```

### Component Pattern

```typescript
interface ComponentProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}

const Component: React.FC<ComponentProps> = ({
  children,
  variant = "primary",
  onClick,
}) => {
  return (
    <div className={`component component--${variant}`}>
      {children}
    </div>
  );
};

export default Component;
```

### Export Conventions

- **Components**: Use `export default`
- **Utilities**: Use named exports (`export const fn = ...`)
- **Types**: Use named exports (`export interface Props { ... }`)

### TypeScript

- Enable `strict` mode (enforced by tsconfig)
- Always type function parameters and return values
- Use `React.FC<Props>` for functional components
- Prefer `interface` over `type` for object shapes
- Use `type` for unions and primitives

```typescript
// Good
interface ButtonProps {
  label: string;
  disabled?: boolean;
}

type Variant = "primary" | "secondary" | "success";

// Avoid
type ButtonProps = { label: string };  // Use interface instead
```

---

## CSS Guidelines

### BEM-like Naming

```css
.game-button { }                    /* Block */
.game-button--primary { }           /* Modifier */
.game-button--xl { }                /* Size modifier */
.game-button__content { }           /* Element */
.game-button__icon { }              /* Element */
```

### CSS Variables (Design System)

**IMPORTANT**: Always use design system variables from `index.css`:

```css
/* Colors (HSL) */
--color-primary: hsl(198, 93%, 60%);    /* Sky blue - navigation */
--color-secondary: hsl(35, 100%, 60%);  /* Orange - rewards */
--color-success: hsl(145, 63%, 49%);    /* Green - correct */
--color-danger: hsl(354, 85%, 63%);     /* Red - errors */
--color-accent: hsl(280, 67%, 60%);     /* Purple - advanced */

/* Radius */
--radius-lg: 24px;  /* Large containers, XL buttons */
--radius-md: 16px;  /* Standard buttons, cards */
```

### Touch-First Design

```css
/* Required for touch interfaces */
-webkit-tap-highlight-color: transparent;
user-select: none;
touch-action: manipulation;
```

---

## UI Components

### GameButton (Core Component)

All buttons MUST use `GameButton` component. Never create custom buttons.

```tsx
import GameButton from "../../components/ui/GameButton";

// Usage
<GameButton
  variant="primary"  // primary | secondary | success | danger | accent
  size="lg"          // md | lg | xl
  icon={<LuStar />}
  onClick={handleClick}
>
  按鈕文字
</GameButton>
```

---

## Error Handling

```typescript
// Use try-catch for async operations
const loadData = async () => {
  try {
    const data = await fetchData();
    setData(data);
  } catch (error) {
    console.error("Failed to load data:", error);
    // Show user-friendly message in Chinese
  }
};

// Use optional chaining
onClick?.();
data?.items?.length ?? 0;
```

---

## State Management

- **Local state**: `useState` for component state
- **Side effects**: `useEffect` with proper cleanup
- **Persistence**: LocalStorage via utility functions (`progressStorage.ts`, `stickerStorage.ts`)
- **Navigation**: `react-router-dom` hooks (`useNavigate`, `useParams`)

---

## Audio

Use the centralized audio utility:

```typescript
import { playClickSound, playSuccessSound, playErrorSound } from "../../utils/audio";

// In click handlers
const handleClick = () => {
  playClickSound();
  // ... rest of logic
};
```

---

## Accessibility

- Always provide `aria-label` for buttons with icons only
- Use semantic HTML elements
- Maintain sufficient color contrast
- Support keyboard navigation where applicable

```tsx
<button aria-label="關閉視窗">
  <LuX />
</button>
```

---

## Animation Guidelines

- **Bouncy feel**: Use `cubic-bezier(0.68, -0.55, 0.265, 1.55)` for playful animations
- **Button press**: `translateY(4px)` + shadow reduction on `:active`
- **Page transitions**: Slide-up with fade-in

---

## Common Patterns

### Question Generation

```typescript
import { generateMathQuestions } from "../../utils/mathGenerator";

const questions = generateMathQuestions("add", levelNumber, 10);
```

### Progress Storage

```typescript
import { getProgress, saveProgress } from "../../utils/progressStorage";

const progress = getProgress();
saveProgress({ ...progress, level: newLevel });
```

---

## Do's and Don'ts

### Do

- Follow the design system strictly (HSL colors, radius values)
- Use `GameButton` for all interactive buttons
- Write UI text in Traditional Chinese
- Use relative imports with proper paths
- Keep components focused and small
- Co-locate CSS with components

### Don't

- Create custom button styles (use `GameButton`)
- Use hardcoded colors (use CSS variables)
- Mix English and Chinese randomly in UI
- Use `any` type in TypeScript
- Ignore ESLint warnings
- Skip aria-labels on icon-only buttons

---

## Reference Documents

- **Design System**: `.antigravity/docs/design_system.md` - Complete color, typography, and animation specs
- **CLAUDE.md**: Quick reminder to check design system before UI changes
