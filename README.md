# Zustand Quest: Bear Store Academy

A visual, level-based game for learning practical Zustand state management in React and TypeScript.

Zustand Quest teaches the “0 to 80%” of Zustand that shows up in real frontend work: stores, actions, selectors, async flows, middleware, slices, SSR awareness, and testing. It borrows the tiny-challenge learning rhythm of games like Flexbox Froggy and Grid Garden, but the topic, visuals, curriculum, and implementation are original.

## What You Build While Playing

The player helps a bear engineering team repair a small SaaS dashboard. Each level presents a focused Zustand scenario, a CodeMirror editor, static validation, feedback, hints, scoring, and a visual simulation that changes when the solution is correct.

No snippets are executed. The game validates code with deterministic text and regex checks, then updates the playground using expected level behavior.

## Features

- 24 data-driven Zustand levels
- TypeScript-first examples and starter code
- CodeMirror editor with TSX syntax highlighting, line numbers, bracket matching, and tab indentation
- Prettier-powered format button
- Safe static validation with specific failed checks
- Visual playgrounds for counters, carts, render performance, async state, persistence, devtools, immer, SSR, and testing
- Zustand `persist` progress store using `localStorage`
- Stars, attempts, hints, streaks, unlock progression, and reset progress
- Light/dark/system theme setting
- Responsive desktop and mobile layouts
- Standalone concepts cheat sheet
- Frontend-only, deployable to Vercel free tier

## Curriculum

The first version covers:

1. What Zustand is and when to use it
2. Creating a store with `create`
3. State and actions in one store
4. Updating state with `set`
5. Reading state inside actions with `get`
6. Selecting state in components
7. Avoiding unnecessary re-renders with selectors
8. Selecting multiple values with shallow comparison
9. Async actions
10. Persist middleware
11. Devtools middleware and named actions
12. Immer middleware for nested updates
13. Store organization and slices
14. Derived selectors
15. Subscribing outside components
16. Vanilla stores outside React
17. Next.js SSR and hydration awareness
18. Client state vs server state
19. Testing store actions
20. Common mistakes and debugging patterns

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Zustand
- Tailwind CSS
- CodeMirror
- Prettier
- Lucide React
- Vitest

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the URL printed by Next.js, usually:

```text
http://localhost:3000
```

If port `3000` is busy, Next will choose the next available port. Use the exact port shown in your terminal.

## Scripts

```bash
npm run dev
```

Starts the local Next.js dev server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Runs the production build locally after `npm run build`.

```bash
npm run lint
```

Runs Next.js ESLint checks.

```bash
npm run test
```

Runs the Vitest suite.

## Project Structure

```text
src/
  app/                 App Router pages
  components/
    game/              Game shell, editor, lessons, result panels
    playgrounds/       Visual level simulations
    layout/            App header, shell, theme toggle
    ui/                Lightweight UI primitives
  data/                Level and concepts content
  lib/
    validators/        Safe static validation engine
    game/              Scoring, hints, level lookup helpers
  stores/              Zustand progress/settings stores and sample stores
  types/               Shared game types
tests/                 Validator, scoring, and store tests
```

## Level Authoring

Levels live in [`src/data/levels.ts`](src/data/levels.ts). Each level defines:

- metadata: title, chapter, difficulty, tags
- lesson content: story, mission, explanation, objectives
- `starterCode` and `solutionCode`
- validation checks
- hints
- playground type
- success and failure copy

The engine does not need to change when adding ordinary levels. Add a level object, choose a `playgroundType`, and define validation checks.

## Validation Model

The validator lives in [`src/lib/validators/validators.ts`](src/lib/validators/validators.ts).

It intentionally does not use `eval`, `new Function`, or a runtime sandbox. Instead it:

- normalizes whitespace
- checks required includes
- checks forbidden includes
- runs focused regex checks
- returns passed checks, failed checks, score, and normalized code

This keeps the game safe for a frontend-only app.

## State Management

The app uses Zustand to teach Zustand:

- [`useGameProgressStore`](src/stores/useGameProgressStore.ts) persists level progress under `zustand-quest-progress`
- [`useSettingsStore`](src/stores/useSettingsStore.ts) persists theme and editor settings
- page-local UI state stays local where global state would be unnecessary

## Deployment

This app is frontend-only and deploys cleanly to Vercel:

```bash
npm run build
```

No database, authentication, environment variables, paid services, or external backend are required.

## Design Notes

The UI aims for playful but professional: bear-themed, visual, and game-like without feeling toyish. The visual metaphors are:

- Bear Store: global state store
- React cabins: components
- Selectors: pipes delivering only needed state
- Actions: levers that mutate state
- Persist cave: localStorage persistence
- Devtools telescope: debugging timeline
- Slices village: modular store sections
- SSR bridge: server/client boundary

## Status

Current version: first playable curriculum release.

Core checks passing:

```bash
npm run lint
npm run test
npm run build
```

