export const conceptSections = [
  {
    title: "What Zustand Is",
    body: [
      "Small React state management library.",
      "Store is a hook.",
      "No Provider required for basic usage.",
      "Good for client state shared across components."
    ]
  },
  {
    title: "Zustand Mental Model",
    body: [
      "State: data.",
      "Actions: functions that update data.",
      "Selectors: component subscriptions.",
      "Middleware: capabilities around the store.",
      "Persist: localStorage/sessionStorage persistence.",
      "Devtools: debugging actions.",
      "Immer: easier nested updates."
    ]
  },
  {
    title: "What To Avoid",
    body: [
      "Avoid const state = useStore() in large stores unless intentionally subscribing to everything.",
      "Avoid storing server cache in Zustand when React Query/SWR is more appropriate.",
      "Avoid mutating nested state directly unless using Immer middleware.",
      "Avoid global singleton stores for per-request data in SSR contexts.",
      "Avoid persisting everything blindly.",
      "Avoid huge unstructured stores."
    ]
  },
  {
    title: "Zustand vs Alternatives",
    body: [
      "useState: local component state.",
      "useContext: dependency injection / low-frequency shared values.",
      "Zustand: ergonomic shared client state.",
      "Redux Toolkit: more structured large-scale event/action architecture.",
      "React Query/SWR: server state/cache.",
      "Jotai/Recoil: atom-based state."
    ]
  },
  {
    title: "Senior Engineer Heuristics",
    body: [
      "Put UI/session/client state in Zustand.",
      "Put server data in React Query/SWR.",
      "Use selectors aggressively.",
      "Export domain-specific hooks.",
      "Split large stores by slices.",
      "Persist only what is needed.",
      "Name devtools actions.",
      "Test store actions independently.",
      "Keep store actions business-oriented, not component-oriented."
    ]
  }
];

export const basicStoreExample = `import { create } from "zustand";

type CounterState = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

export const useCounterStore = create<CounterState>()((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));`;

export const componentUsageExample = `const count = useCounterStore((state) => state.count);
const increment = useCounterStore((state) => state.increment);`;
