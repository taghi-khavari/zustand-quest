import type { Level, PlaygroundType } from "@/types/game";

const sharedFailure = [
  "Compare the missing checks with the mission.",
  "Selectors, actions, and middleware names are usually the important clues.",
  "Whitespace is flexible, but the core Zustand API usage needs to be present."
];

function makeLevel(level: Omit<Level, "failureMessages" | "whyItMatters"> & Partial<Pick<Level, "failureMessages" | "whyItMatters">>): Level {
  return {
    failureMessages: sharedFailure,
    whyItMatters:
      "This pattern shows up constantly in production React apps where teams need predictable shared client state without boilerplate.",
    ...level
  };
}

const starterHeader = `import { create } from "zustand";`;

export const levels: Level[] = [
  makeLevel({
    id: "create-bear-store",
    order: 1,
    title: "Create the Bear Store",
    chapter: "Bear Store Basics",
    difficulty: "beginner",
    estimatedMinutes: 4,
    conceptTags: ["create", "set", "actions", "typescript"],
    learningObjectives: ["Create a Zustand store", "Define state and actions", "Use set to update state"],
    story: "The bear team needs one central store before the forest dashboard can work.",
    mission: "Create a typed Zustand store with bears, increasePopulation, and removeAllBears.",
    explanation:
      "In Zustand, the store is a hook. A store can contain state and actions, and components subscribe to the parts they need.",
    starterCode: `${starterHeader}

type BearState = {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
};

export const useBearStore = // TODO`,
    solutionCode: `${starterHeader}

type BearState = {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
};

export const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));`,
    validation: {
      type: "multiCheck",
      checks: [
        { id: "imports-create", description: "Import create from zustand", requiredIncludes: ['import { create } from "zustand"'], points: 1 },
        { id: "uses-create-generic", description: "Use create with the BearState type", pattern: "create\\s*<\\s*BearState\\s*>\\s*\\(\\s*\\)", points: 2 },
        { id: "uses-functional-set", description: "Use functional set for increment", requiredIncludes: ["set((state) =>", "state.bears + 1"], points: 3 },
        { id: "resets-count", description: "Reset bears without replacing actions", requiredIncludes: ["removeAllBears", "set({ bears: 0 })"], forbiddenIncludes: ["set({}, true)"], points: 2 }
      ]
    },
    hints: ["Start with create<BearState>()(...).", "The creator receives set.", "Use set((state) => ({ bears: state.bears + 1 })) when the next value depends on the previous value."],
    playgroundType: "counter",
    successMessage: "Great. Your first Zustand store is alive."
  }),
  makeLevel({
    id: "select-bears",
    order: 2,
    title: "Select Only What You Need",
    chapter: "Bear Store Basics",
    difficulty: "beginner",
    estimatedMinutes: 3,
    conceptTags: ["selectors", "rendering"],
    learningObjectives: ["Subscribe a component to a single field", "Avoid full-store subscriptions"],
    story: "A React cabin only needs the bear count, not the whole forest inventory.",
    mission: "Subscribe BearCounter only to bears.",
    explanation: "Selectors are the default performance tool in Zustand. A selector narrows what makes a component re-render.",
    starterCode: `function BearCounter() {
  const bears = // TODO
  return <p>{bears} bears</p>;
}`,
    solutionCode: `function BearCounter() {
  const bears = useBearStore((state) => state.bears);
  return <p>{bears} bears</p>;
}`,
    validation: {
      type: "multiCheck",
      checks: [
        { id: "uses-selector", description: "Use a selector callback", pattern: "useBearStore\\s*\\(\\s*\\(?\\s*state\\s*\\)?\\s*=>", points: 3 },
        { id: "selects-bears", description: "Select state.bears", requiredIncludes: ["state.bears"], points: 3 },
        { id: "no-full-store", description: "Do not subscribe to the whole store", forbiddenIncludes: ["useBearStore()"], points: 2 }
      ]
    },
    hints: ["Call the store hook with a function.", "Return state.bears from the selector.", "Avoid const state = useBearStore() for large stores."],
    playgroundType: "renderLab",
    successMessage: "The cabin now receives only the bear count."
  }),
  makeLevel({
    id: "action-buttons",
    order: 3,
    title: "Action Buttons",
    chapter: "Bear Store Basics",
    difficulty: "beginner",
    estimatedMinutes: 3,
    conceptTags: ["actions", "events", "selectors"],
    learningObjectives: ["Select actions from the store", "Wire actions to React events"],
    story: "The lever is built, but it is not connected to the store action.",
    mission: "Read increasePopulation from the store and call it on click.",
    explanation: "Actions are just functions in the store. Select them the same way you select state.",
    starterCode: `function AddBearButton() {
  const increasePopulation = // TODO
  return <button>Add bear</button>;
}`,
    solutionCode: `function AddBearButton() {
  const increasePopulation = useBearStore((state) => state.increasePopulation);
  return <button onClick={increasePopulation}>Add bear</button>;
}`,
    validation: {
      type: "multiCheck",
      checks: [
        { id: "select-action", description: "Select the action from the store", requiredIncludes: ["useBearStore((state) => state.increasePopulation)"], points: 4 },
        { id: "wire-click", description: "Wire the action to onClick", requiredIncludes: ["onClick={increasePopulation}"], points: 3 }
      ]
    },
    hints: ["Actions live beside state.", "Select state.increasePopulation.", "Pass the function directly to onClick."],
    playgroundType: "counter",
    successMessage: "The action lever is connected."
  }),
  makeLevel({
    id: "set-merges-state",
    order: 4,
    title: "Set Merges State",
    chapter: "Bear Store Basics",
    difficulty: "beginner",
    estimatedMinutes: 4,
    conceptTags: ["set", "merge", "actions"],
    learningObjectives: ["Use shallow merging", "Update one field without deleting siblings"],
    story: "The name tag printer should rename the mascot without changing the bear count.",
    mission: "Add a renameBear action that updates name without removing bears.",
    explanation: "By default, set shallow-merges partial state. This makes focused field updates concise.",
    starterCode: `type BearState = {
  bears: number;
  name: string;
  renameBear: (newName: string) => void;
};

export const useBearStore = create<BearState>()((set) => ({
  bears: 3,
  name: "Maple",
  renameBear: // TODO
}));`,
    solutionCode: `renameBear: (newName) => set({ name: newName })`,
    validation: {
      type: "multiCheck",
      checks: [
        { id: "has-action", description: "Define renameBear as an action", requiredIncludes: ["renameBear"], points: 2 },
        { id: "sets-name", description: "Use set with the new name", pattern: "set\\s*\\(\\s*\\{\\s*name\\s*:\\s*newName\\s*\\}\\s*\\)", points: 4 },
        { id: "no-replace", description: "Do not replace the whole store", forbiddenIncludes: ["true)"], points: 1 }
      ]
    },
    hints: ["set({ name: newName }) is enough.", "Zustand merges the partial object.", "Use replace mode only deliberately."],
    playgroundType: "counter",
    successMessage: "The name tag changes and the bears stay put."
  }),
  makeLevel({
    id: "read-before-write",
    order: 5,
    title: "Read Before You Write",
    chapter: "Actions, get, and Real App State",
    difficulty: "beginner",
    estimatedMinutes: 5,
    conceptTags: ["get", "conditional actions"],
    learningObjectives: ["Read current state inside actions", "Use get with set"],
    story: "The academy should welcome a new bear only when the pantry has food.",
    mission: "Add addBearIfFoodAvailable using get() and set().",
    explanation: "The store creator can receive both set and get. Use get when an action needs to inspect current state before deciding what to do.",
    starterCode: `type BearState = {
  bears: number;
  food: number;
  addBearIfFoodAvailable: () => void;
};

export const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  food: 2,
  addBearIfFoodAvailable: // TODO
}));`,
    solutionCode: `export const useBearStore = create<BearState>()((set, get) => ({
  bears: 0,
  food: 2,
  addBearIfFoodAvailable: () => {
    if (get().food <= 0) return;
    set((state) => ({ bears: state.bears + 1, food: state.food - 1 }));
  },
}));`,
    validation: {
      type: "multiCheck",
      checks: [
        { id: "uses-get-param", description: "Receive get in the store creator", requiredIncludes: ["(set, get)"], points: 2 },
        { id: "reads-food", description: "Read food with get()", requiredIncludes: ["get().food"], points: 3 },
        { id: "functional-update", description: "Use functional set for dependent updates", requiredIncludes: ["set((state) =>", "state.bears + 1"], points: 3 }
      ]
    },
    hints: ["Change (set) to (set, get).", "Guard with get().food.", "Increment bears and decrement food in one functional set call."],
    playgroundType: "counter",
    successMessage: "The pantry gate now protects the store."
  }),
  makeLevel({
    id: "cart-store",
    order: 6,
    title: "Cart Store",
    chapter: "Actions, get, and Real App State",
    difficulty: "beginner",
    estimatedMinutes: 4,
    conceptTags: ["arrays", "immutable updates", "cart"],
    learningObjectives: ["Append to arrays immutably", "Model app state as store actions"],
    story: "The SaaS dashboard has a tiny merch cart for team supplies.",
    mission: "Implement addToCart(product) with an immutable array update.",
    explanation: "Zustand does not require reducers. Use normal JavaScript immutable updates in actions.",
    starterCode: `type Product = { id: string; name: string; price: number };
type CartState = { items: Product[]; addToCart: (product: Product) => void };

export const useCartStore = create<CartState>()((set) => ({
  items: [],
  addToCart: // TODO
}));`,
    solutionCode: `addToCart: (product) =>
  set((state) => ({ items: [...state.items, product] }))`,
    validation: {
      type: "multiCheck",
      checks: [
        { id: "functional-set", description: "Use functional set", requiredIncludes: ["set((state) =>"], points: 3 },
        { id: "spread-items", description: "Append with array spread", requiredIncludes: ["items: [...state.items, product]"], points: 4 }
      ]
    },
    hints: ["The next array depends on the previous array.", "Use [...state.items, product].", "Return a partial state object from set."],
    playgroundType: "cart",
    successMessage: "Products now land in the cart."
  }),
  makeLevel({
    id: "remove-from-cart",
    order: 7,
    title: "Remove From Cart",
    chapter: "Actions, get, and Real App State",
    difficulty: "beginner",
    estimatedMinutes: 4,
    conceptTags: ["arrays", "filter", "immutable updates"],
    learningObjectives: ["Remove items immutably", "Keep actions focused"],
    story: "Duplicate honey jars are clogging the cart.",
    mission: "Implement removeItem(id) using filter.",
    explanation: "For array removals, return a new array that excludes the item. Components subscribed to items will see the change.",
    starterCode: `type CartState = {
  items: Product[];
  removeItem: (id: string) => void;
};

removeItem: // TODO`,
    solutionCode: `removeItem: (id) =>
  set((state) => ({ items: state.items.filter((item) => item.id !== id) }))`,
    validation: {
      type: "multiCheck",
      checks: [
        { id: "uses-filter", description: "Use filter for removal", requiredIncludes: ["state.items.filter"], points: 3 },
        { id: "compares-id", description: "Compare item.id to id", requiredIncludes: ["item.id !== id"], points: 3 },
        { id: "updates-items", description: "Return items from set", requiredIncludes: ["items:"], points: 1 }
      ]
    },
    hints: ["Filter keeps the items that should remain.", "The condition should be item.id !== id.", "Wrap it in set((state) => ({ items: ... }))."],
    playgroundType: "cart",
    successMessage: "The cart can remove items cleanly."
  }),
  makeLevel({
    id: "reset-state-safely",
    order: 8,
    title: "Reset State Safely",
    chapter: "Actions, get, and Real App State",
    difficulty: "beginner",
    estimatedMinutes: 4,
    conceptTags: ["reset", "initial state", "actions"],
    learningObjectives: ["Reset data without deleting actions", "Avoid accidental replace mode"],
    story: "The checkout reset should clear draft data while keeping the cart controls alive.",
    mission: "Reset cart to initialState without using replace mode.",
    explanation: "A normal set(initialState) shallow-merges data fields and leaves actions intact when the action lives in the same object.",
    starterCode: `const initialState = { items: [], coupon: null };

export const useCartStore = create<CartState>()((set) => ({
  ...initialState,
  reset: // TODO
}));`,
    solutionCode: `reset: () => set(initialState)`,
    validation: {
      type: "multiCheck",
      checks: [
        { id: "has-initial", description: "Keep an initialState object", requiredIncludes: ["initialState"], points: 2 },
        { id: "sets-initial", description: "Reset with set(initialState)", requiredIncludes: ["set(initialState)"], points: 4 },
        { id: "avoid-replace", description: "Do not use replace mode for this reset", forbiddenIncludes: ["set({}, true)", "set(initialState, true)"], points: 2 }
      ]
    },
    hints: ["Keep initial state separate from actions.", "reset can be one line.", "Avoid replace mode unless you really want to replace actions too."],
    playgroundType: "cart",
    successMessage: "The cart clears and the controls still work."
  }),
  makeLevel({
    id: "render-storm",
    order: 9,
    title: "The Render Storm",
    chapter: "Selectors and Performance",
    difficulty: "intermediate",
    estimatedMinutes: 5,
    conceptTags: ["selectors", "performance", "rendering"],
    learningObjectives: ["Avoid full-store subscriptions", "Subscribe to one field"],
    story: "A dashboard panel is re-rendering whenever unrelated settings change.",
    mission: "Fix the component so it selects only selectedField.",
    explanation: "Calling a store hook with no selector subscribes the component to every store change.",
    starterCode: `function ExpensivePanel() {
  const state = useDashboardStore();
  return <Chart value={state.selectedField} />;
}`,
    solutionCode: `function ExpensivePanel() {
  const selectedField = useDashboardStore((state) => state.selectedField);
  return <Chart value={selectedField} />;
}`,
    validation: {
      type: "multiCheck",
      checks: [
        { id: "selects-field", description: "Select selectedField", requiredIncludes: ["state.selectedField"], points: 4 },
        { id: "no-full-store", description: "Remove the full-store subscription", forbiddenIncludes: ["useDashboardStore()"], points: 4 }
      ]
    },
    hints: ["The chart only needs selectedField.", "Call useDashboardStore with a selector.", "The render counter should ignore unrelated updates."],
    playgroundType: "renderLab",
    successMessage: "The render storm calms down."
  }),
  makeLevel({
    id: "multiple-picks",
    order: 10,
    title: "Multiple Picks",
    chapter: "Selectors and Performance",
    difficulty: "intermediate",
    estimatedMinutes: 6,
    conceptTags: ["useShallow", "selectors", "performance"],
    learningObjectives: ["Select multiple values", "Use shallow comparison"],
    story: "Two resource pipes feed one component. It should not re-render when unrelated resources move.",
    mission: "Select nuts and honey together with useShallow.",
    explanation: "Object selectors create a new object each time. useShallow compares object fields so unchanged values do not re-render.",
    starterCode: `import { useShallow } from "zustand/react/shallow";

function Pantry() {
  const resources = // TODO
  return <p>{resources.nuts} nuts, {resources.honey} honey</p>;
}`,
    solutionCode: `const resources = useBearStore(
  useShallow((state) => ({ nuts: state.nuts, honey: state.honey }))
);`,
    validation: {
      type: "multiCheck",
      checks: [
        { id: "imports-use-shallow", description: "Import useShallow", requiredIncludes: ['import { useShallow } from "zustand/react/shallow"'], points: 2 },
        { id: "wraps-selector", description: "Wrap the selector in useShallow", requiredIncludes: ["useBearStore(", "useShallow((state) =>"], points: 3 },
        { id: "selects-two", description: "Select nuts and honey", requiredIncludes: ["nuts: state.nuts", "honey: state.honey"], points: 3 }
      ]
    },
    hints: ["Import useShallow from zustand/react/shallow.", "Pass useShallow(selector) into the store hook.", "Return an object with nuts and honey."],
    playgroundType: "renderLab",
    successMessage: "Both resource pipes are stable."
  }),
  makeLevel({
    id: "derived-selector",
    order: 11,
    title: "Derived Selector",
    chapter: "Selectors and Performance",
    difficulty: "intermediate",
    estimatedMinutes: 5,
    conceptTags: ["derived state", "selectors", "cart"],
    learningObjectives: ["Compute derived values in selectors", "Avoid storing duplicative totals"],
    story: "Checkout total should be calculated from cart items, not manually synced.",
    mission: "Compute totalPrice from items in a selector.",
    explanation: "Derived values can often live outside the store as selectors. That avoids duplicated state that can drift.",
    starterCode: `function CheckoutTotal() {
  const totalPrice = // TODO
  return <strong>{totalPrice}</strong>;
}`,
    solutionCode: `const totalPrice = useCartStore((state) =>
  state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);`,
    validation: {
      type: "multiCheck",
      checks: [
        { id: "uses-cart-selector", description: "Use a cart selector", requiredIncludes: ["useCartStore((state) =>"], points: 2 },
        { id: "uses-reduce", description: "Reduce items into a total", requiredIncludes: ["state.items.reduce"], points: 3 },
        { id: "quantity-price", description: "Multiply price and quantity", requiredIncludes: ["item.price * item.quantity"], points: 3 }
      ]
    },
    hints: ["The total belongs to a selector.", "Use reduce over state.items.", "Each line item contributes price * quantity."],
    playgroundType: "cart",
    successMessage: "The checkout total now follows the cart."
  }),
  makeLevel({
    id: "stable-custom-hooks",
    order: 12,
    title: "Stable Custom Hooks",
    chapter: "Selectors and Performance",
    difficulty: "intermediate",
    estimatedMinutes: 5,
    conceptTags: ["custom hooks", "architecture", "selectors"],
    learningObjectives: ["Export domain hooks", "Hide raw store details from components"],
    story: "The cart module needs clean entry points for product engineers.",
    mission: "Create useCartItems and useCartTotal custom hooks.",
    explanation: "Domain-specific hooks make component dependencies obvious and keep selector logic reusable.",
    starterCode: `export const useCartItems = // TODO
export const useCartTotal = // TODO`,
    solutionCode: `export const useCartItems = () => useCartStore((state) => state.items);
export const useCartTotal = () =>
  useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );`,
    validation: {
      type: "multiCheck",
      checks: [
        { id: "items-hook", description: "Export useCartItems", requiredIncludes: ["export const useCartItems", "state.items"], points: 3 },
        { id: "total-hook", description: "Export useCartTotal", requiredIncludes: ["export const useCartTotal", "reduce"], points: 3 },
        { id: "uses-store", description: "Both hooks use the cart store", requiredIncludes: ["useCartStore"], points: 2 }
      ]
    },
    hints: ["Each custom hook can be a one-line function.", "useCartItems returns the selected array.", "useCartTotal can reuse the derived selector pattern."],
    playgroundType: "renderLab",
    successMessage: "Components now depend on clean cart hooks."
  }),
  makeLevel({
    id: "async-fish-market",
    order: 13,
    title: "Async Fish Market",
    chapter: "Async and Side Effects",
    difficulty: "intermediate",
    estimatedMinutes: 7,
    conceptTags: ["async actions", "loading", "errors"],
    learningObjectives: ["Write async store actions", "Represent loading and error states"],
    story: "The fish market panel needs a client-state loading flow.",
    mission: "Implement fetchFish with loading, success, and error status.",
    explanation: "Zustand actions can be async. Use set before and after the awaited work to drive UI state.",
    starterCode: `fetchFish: async () => {
  // TODO
}`,
    solutionCode: `fetchFish: async () => {
  set({ status: "loading" });
  try {
    const fish = await mockFetchFish();
    set({ fish, status: "success" });
  } catch {
    set({ status: "error" });
  }
}`,
    validation: {
      type: "multiCheck",
      checks: [
        { id: "async-action", description: "Use an async action", requiredIncludes: ["async"], points: 2 },
        { id: "loading", description: "Set loading before awaiting", requiredIncludes: ['set({ status: "loading" })'], points: 2 },
        { id: "awaits-fetch", description: "Await mockFetchFish", requiredIncludes: ["await mockFetchFish()"], points: 2 },
        { id: "handles-error", description: "Handle errors", requiredIncludes: ["catch", 'set({ status: "error" })'], points: 2 }
      ]
    },
    hints: ["Set status to loading first.", "Wrap await mockFetchFish() in try/catch.", "Set success with the fish payload, and error in catch."],
    playgroundType: "async",
    successMessage: "The market now reports its async state."
  }),
  makeLevel({
    id: "optimistic-update",
    order: 14,
    title: "Optimistic Update",
    chapter: "Async and Side Effects",
    difficulty: "intermediate",
    estimatedMinutes: 7,
    conceptTags: ["optimistic UI", "rollback", "async"],
    learningObjectives: ["Apply optimistic updates", "Rollback on failure"],
    story: "The cart should feel instant, but failed saves need a clean recovery path.",
    mission: "Add item optimistically and rollback on failure.",
    explanation: "Optimistic UI updates client state first, then restores a previous snapshot if the server request fails.",
    starterCode: `addItemOptimistic: async (item) => {
  // TODO
}`,
    solutionCode: `addItemOptimistic: async (item) => {
  const previousItems = get().items;
  set((state) => ({ items: [...state.items, item] }));
  try {
    await saveItem(item);
  } catch {
    set({ items: previousItems });
  }
}`,
    validation: {
      type: "multiCheck",
      checks: [
        { id: "snapshot", description: "Save previous items", requiredIncludes: ["previousItems", "get().items"], points: 3 },
        { id: "optimistic-first", description: "Set optimistic state before await", requiredIncludes: ["set((state) =>", "[...state.items, item]"], points: 3 },
        { id: "rollback", description: "Rollback in catch", requiredIncludes: ["catch", "set({ items: previousItems })"], points: 3 }
      ]
    },
    hints: ["Take a snapshot before the optimistic set.", "Update local state before await saveItem.", "Catch failure and set items back to previousItems."],
    playgroundType: "async",
    successMessage: "The optimistic flow has a rollback rope."
  }),
  makeLevel({
    id: "client-vs-server-state",
    order: 15,
    title: "Client State vs Server State",
    chapter: "Async and Side Effects",
    difficulty: "intermediate",
    estimatedMinutes: 5,
    conceptTags: ["client state", "server state", "architecture"],
    learningObjectives: ["Separate client state from server cache", "Choose the right tool"],
    story: "The dashboard bins are mixed. Some cards belong in Zustand, some in a server cache.",
    mission: "Choose Zustand for UI/client state and React Query/SWR for server data.",
    explanation: "Zustand is excellent for client state. Server data usually needs caching, invalidation, refetching, and stale-time controls.",
    starterCode: `const zustand = [
  // TODO
];

const serverCache = [
  // TODO
];`,
    solutionCode: `const zustand = ["modalOpen", "selectedTab", "cartDraft"];
const serverCache = ["authenticatedUserCache", "serverProductsList"];`,
    validation: {
      type: "multiCheck",
      checks: [
        { id: "zustand-local", description: "Put UI/client state in Zustand", requiredIncludes: ["modalOpen", "selectedTab", "cartDraft"], points: 4 },
        { id: "server-cache", description: "Put server data in server cache", requiredIncludes: ["authenticatedUserCache", "serverProductsList"], points: 4 },
        { id: "mentions-boundary", description: "Mention React Query or SWR boundary", pattern: "React Query|SWR|serverCache", points: 1 }
      ]
    },
    hints: ["Modal open and selected tab are client UI state.", "Server products list is server state.", "Authenticated user cache usually belongs with server fetching/cache tooling."],
    playgroundType: "slices",
    successMessage: "The state boundary is clear."
  }),
  makeLevel({
    id: "persist-cave",
    order: 16,
    title: "Persist Cave",
    chapter: "Middleware",
    difficulty: "intermediate",
    estimatedMinutes: 6,
    conceptTags: ["persist", "middleware", "localStorage"],
    learningObjectives: ["Use persist middleware", "Choose a storage key"],
    story: "The academy should remember a theme and cart draft after a refresh simulation.",
    mission: "Wrap the store with persist and provide a name.",
    explanation: "persist stores selected state in localStorage by default. Use a stable key and persist only useful state.",
    starterCode: `import { persist } from "zustand/middleware";

export const useSettingsStore = create<SettingsState>()(
  // TODO
);`,
    solutionCode: `export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: "system",
      cartDraft: [],
      setTheme: (theme) => set({ theme }),
    }),
    { name: "academy-settings" }
  )
);`,
    validation: {
      type: "multiCheck",
      checks: [
        { id: "imports-persist", description: "Import persist", requiredIncludes: ['import { persist } from "zustand/middleware"'], points: 2 },
        { id: "wraps-persist", description: "Wrap the creator with persist", requiredIncludes: ["persist("], points: 3 },
        { id: "has-name", description: "Set a storage name", pattern: "name\\s*:\\s*[\"'][\\w-]+[\"']", points: 3 }
      ]
    },
    hints: ["persist wraps the state creator.", "The second argument contains options.", "Always give persist a stable name."],
    playgroundType: "persist",
    successMessage: "The cave now remembers useful state."
  }),
  makeLevel({
    id: "partial-persistence",
    order: 17,
    title: "Partial Persistence",
    chapter: "Middleware",
    difficulty: "intermediate",
    estimatedMinutes: 5,
    conceptTags: ["persist", "partialize", "privacy"],
    learningObjectives: ["Persist only selected fields", "Avoid storing temporary UI state"],
    story: "The cave is keeping modal state it should forget.",
    mission: "Persist only theme, not temporary modal state.",
    explanation: "partialize lets you store a subset of state. This keeps localStorage small and avoids stale UI surprises.",
    starterCode: `persist(
  (set) => ({
    theme: "dark",
    modalOpen: false,
    setTheme: (theme) => set({ theme }),
    setModalOpen: (modalOpen) => set({ modalOpen })
  }),
  {
    name: "settings",
    // TODO
  }
)`,
    solutionCode: `partialize: (state) => ({ theme: state.theme })`,
    validation: {
      type: "multiCheck",
      checks: [
        { id: "uses-partialize", description: "Use partialize", requiredIncludes: ["partialize:"], points: 3 },
        { id: "keeps-theme", description: "Persist theme", requiredIncludes: ["theme: state.theme"], points: 3 },
        { id: "excludes-modal", description: "Do not persist modalOpen", forbiddenIncludes: ["modalOpen: state.modalOpen"], points: 2 }
      ]
    },
    hints: ["partialize receives state.", "Return an object with theme only.", "Temporary modal state should reset on refresh."],
    playgroundType: "persist",
    successMessage: "The cave remembers the theme and forgets the modal."
  }),
  makeLevel({
    id: "devtools-telescope",
    order: 18,
    title: "Devtools Telescope",
    chapter: "Middleware",
    difficulty: "intermediate",
    estimatedMinutes: 6,
    conceptTags: ["devtools", "middleware", "debugging"],
    learningObjectives: ["Use devtools middleware", "Name important actions"],
    story: "The debugging telescope shows mystery updates. Give the actions names.",
    mission: "Add devtools and named actions.",
    explanation: "devtools integrates with Redux DevTools. Named set calls make timelines readable during debugging.",
    starterCode: `import { devtools } from "zustand/middleware";

export const useCartStore = create<CartState>()(
  // TODO
);`,
    solutionCode: `export const useCartStore = create<CartState>()(
  devtools((set) => ({
    items: [],
    addItem: (item) =>
      set((state) => ({ items: [...state.items, item] }), false, "cart/addItem")
  }))
);`,
    validation: {
      type: "multiCheck",
      checks: [
        { id: "imports-devtools", description: "Import devtools", requiredIncludes: ['import { devtools } from "zustand/middleware"'], points: 2 },
        { id: "wraps-devtools", description: "Wrap with devtools", requiredIncludes: ["devtools("], points: 3 },
        { id: "named-action", description: "Name the set action", requiredIncludes: ['false, "cart/addItem"'], points: 4 }
      ]
    },
    hints: ["devtools wraps the creator like persist does.", "The third set argument can be an action name.", "Use names like cart/addItem."],
    playgroundType: "devtools",
    successMessage: "The timeline now tells a readable story."
  }),
  makeLevel({
    id: "immer-forest",
    order: 19,
    title: "Immer Forest",
    chapter: "Middleware",
    difficulty: "intermediate",
    estimatedMinutes: 6,
    conceptTags: ["immer", "nested updates", "middleware"],
    learningObjectives: ["Use immer middleware", "Update nested state safely"],
    story: "The forest has deeply nested nest state, and spread syntax is becoming hard to read.",
    mission: "Use immer to clear nested nest items with mutable syntax.",
    explanation: "Immer middleware lets you write convenient draft mutations while producing immutable updates.",
    starterCode: `import { immer } from "zustand/middleware/immer";

export const useForestStore = create<ForestState>()(
  // TODO
);`,
    solutionCode: `export const useForestStore = create<ForestState>()(
  immer((set) => ({
    forest: { tree: { nest: { items: ["twig"] } } },
    clearNest: () =>
      set((state) => {
        state.forest.tree.nest.items = [];
      })
  }))
);`,
    validation: {
      type: "multiCheck",
      checks: [
        { id: "imports-immer", description: "Import immer middleware", requiredIncludes: ['import { immer } from "zustand/middleware/immer"'], points: 2 },
        { id: "wraps-immer", description: "Wrap store creator with immer", requiredIncludes: ["immer((set) =>"], points: 3 },
        { id: "mutates-draft", description: "Use draft mutation for nested state", requiredIncludes: ["state.forest.tree.nest.items = []"], points: 4 }
      ]
    },
    hints: ["Import immer from zustand/middleware/immer.", "Wrap the creator with immer(...).", "Inside set, mutate the draft state."],
    playgroundType: "immer",
    successMessage: "Nested updates are readable and safe."
  }),
  makeLevel({
    id: "slices-village",
    order: 20,
    title: "Slices Village",
    chapter: "Architecture",
    difficulty: "advanced",
    estimatedMinutes: 8,
    conceptTags: ["slices", "architecture", "StateCreator"],
    learningObjectives: ["Split large stores into slices", "Combine slice creators into one store"],
    story: "Cart, user, and UI teams each need their own section of the village.",
    mission: "Split cart, user, and UI slices and compose them into one store.",
    explanation: "The slices pattern keeps large stores modular without forcing every feature into one giant object literal.",
    starterCode: `type StoreState = CartSlice & UserSlice & UiSlice;

const createCartSlice = // TODO
const createUserSlice = // TODO
const createUiSlice = // TODO

export const useAppStore = create<StoreState>()((...a) => ({
  // TODO
}));`,
    solutionCode: `const createCartSlice: StateCreator<StoreState, [], [], CartSlice> = (set) => ({ items: [] });
const createUserSlice: StateCreator<StoreState, [], [], UserSlice> = (set) => ({ user: null });
const createUiSlice: StateCreator<StoreState, [], [], UiSlice> = (set) => ({ modalOpen: false });

export const useAppStore = create<StoreState>()((...a) => ({
  ...createCartSlice(...a),
  ...createUserSlice(...a),
  ...createUiSlice(...a),
}));`,
    validation: {
      type: "multiCheck",
      checks: [
        { id: "slice-types", description: "Define the slice types", requiredIncludes: ["type CartSlice", "type UserSlice", "type UiSlice"], points: 2 },
        { id: "state-creator", description: "Use StateCreator for slice creators", requiredIncludes: ["StateCreator<StoreState"], points: 3 },
        { id: "composes-slices", description: "Spread each slice into the store", requiredIncludes: ["...createCartSlice(...a)", "...createUserSlice(...a)", "...createUiSlice(...a)"], points: 4 }
      ]
    },
    hints: ["StoreState is an intersection of slices.", "Each slice creator can be typed with StateCreator.", "The root create call spreads each slice creator with ...a."],
    playgroundType: "slices",
    successMessage: "The village sections now compose into one store."
  }),
  makeLevel({
    id: "store-outside-react",
    order: 21,
    title: "Store Outside React",
    chapter: "Architecture",
    difficulty: "advanced",
    estimatedMinutes: 7,
    conceptTags: ["vanilla store", "outside React", "services"],
    learningObjectives: ["Create a vanilla store", "Bind it to React with useStore"],
    story: "A non-React service needs to update state, while components still subscribe normally.",
    mission: "Create a vanilla store with createStore and bind it with useStore.",
    explanation: "Vanilla stores are useful for code that lives outside React, such as services, workers, or integration modules.",
    starterCode: `// TODO: create a vanilla store and read from it in React`,
    solutionCode: `import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

const positionStore = createStore<PositionState>()((set) => ({
  x: 0,
  setX: (x) => set({ x })
}));

const x = useStore(positionStore, (state) => state.x);`,
    validation: {
      type: "multiCheck",
      checks: [
        { id: "imports-create-store", description: "Import createStore", requiredIncludes: ['import { createStore } from "zustand/vanilla"'], points: 2 },
        { id: "imports-use-store", description: "Import useStore", requiredIncludes: ['import { useStore } from "zustand"'], points: 2 },
        { id: "creates-vanilla", description: "Create a vanilla store", requiredIncludes: ["createStore"], points: 2 },
        { id: "binds-react", description: "Bind vanilla store with useStore", pattern: "useStore\\s*\\(\\s*\\w+Store\\s*,\\s*\\(?\\s*state", points: 3 }
      ]
    },
    hints: ["createStore comes from zustand/vanilla.", "React components use useStore(store, selector).", "A service can call positionStore.setState outside React."],
    playgroundType: "slices",
    successMessage: "The outside service and React cabin share a store."
  }),
  makeLevel({
    id: "subscribe-without-render",
    order: 22,
    title: "Subscribe Without Render",
    chapter: "Architecture",
    difficulty: "advanced",
    estimatedMinutes: 7,
    conceptTags: ["subscribe", "effects", "performance"],
    learningObjectives: ["Subscribe outside render", "Clean up subscriptions"],
    story: "A canvas marker needs every position update, but React renders should stay quiet.",
    mission: "Subscribe to position changes inside useEffect and return unsubscribe.",
    explanation: "Store subscriptions are useful for imperative integrations where React rendering is not the right update loop.",
    starterCode: `useEffect(() => {
  // TODO
}, []);`,
    solutionCode: `useEffect(() => {
  const unsubscribe = usePositionStore.subscribe((state) => state.position, drawMarker);
  return unsubscribe;
}, []);`,
    validation: {
      type: "multiCheck",
      checks: [
        { id: "uses-effect", description: "Use useEffect", requiredIncludes: ["useEffect(() =>"], points: 2 },
        { id: "subscribes", description: "Subscribe to store changes", requiredIncludes: [".subscribe("], points: 3 },
        { id: "cleans-up", description: "Return unsubscribe", requiredIncludes: ["return unsubscribe"], points: 3 }
      ]
    },
    hints: ["Imperative subscriptions belong in an effect.", "Capture the return value from subscribe.", "Return it from useEffect for cleanup."],
    playgroundType: "renderLab",
    successMessage: "The marker moves while React renders stay calm."
  }),
  makeLevel({
    id: "ssr-bridge",
    order: 23,
    title: "SSR Bridge",
    chapter: "Next.js, SSR, and Testing",
    difficulty: "advanced",
    estimatedMinutes: 8,
    conceptTags: ["Next.js", "SSR", "hydration", "persist"],
    learningObjectives: ["Avoid hydration mismatches", "Defer persisted client-only values"],
    story: "Persisted localStorage state is being read before the client bridge is ready.",
    mission: "Use a client boundary and hasHydrated/mounted pattern before rendering persisted state.",
    explanation: "Next.js renders on the server first. Browser-only persisted values can mismatch until hydration finishes.",
    starterCode: `"use client";

function ThemeLabel() {
  const theme = useSettingsStore((state) => state.theme);
  return <span>{theme}</span>;
}`,
    solutionCode: `"use client";

function ThemeLabel() {
  const [hasHydrated, setHasHydrated] = useState(false);
  const theme = useSettingsStore((state) => state.theme);

  useEffect(() => setHasHydrated(true), []);
  if (!hasHydrated) return null;

  return <span>{theme}</span>;
}`,
    validation: {
      type: "multiCheck",
      checks: [
        { id: "client-boundary", description: "Use a client component boundary", requiredIncludes: ['"use client"'], points: 2 },
        { id: "hydrated-flag", description: "Track hydration or mounted state", pattern: "hasHydrated|mounted|isClient", points: 3 },
        { id: "uses-effect", description: "Set the flag in useEffect", requiredIncludes: ["useEffect"], points: 2 },
        { id: "guards-render", description: "Guard rendering before hydration", pattern: "if\\s*\\(\\s*!\\s*(hasHydrated|mounted|isClient)\\s*\\)\\s*return", points: 3 }
      ]
    },
    hints: ["Persisted localStorage values are client-only.", "Track mounted state with useState and useEffect.", "Render null or a stable placeholder before hydration."],
    playgroundType: "ssr",
    successMessage: "The SSR bridge is stable."
  }),
  makeLevel({
    id: "testing-lab",
    order: 24,
    title: "Testing Lab",
    chapter: "Next.js, SSR, and Testing",
    difficulty: "advanced",
    estimatedMinutes: 7,
    conceptTags: ["testing", "actions", "getState"],
    learningObjectives: ["Test store actions directly", "Reset store state between tests"],
    story: "The academy test bench needs proof that store actions behave.",
    mission: "Write a test that resets state, calls an action in act, and asserts getState.",
    explanation: "Zustand stores can be tested without rendering a component. Reset state, run actions, assert state.",
    starterCode: `it("increments bears", () => {
  // TODO
});`,
    solutionCode: `it("increments bears", () => {
  useBearStore.setState(initialState);

  act(() => {
    useBearStore.getState().increasePopulation();
  });

  expect(useBearStore.getState().bears).toBe(1);
});`,
    validation: {
      type: "multiCheck",
      checks: [
        { id: "resets-state", description: "Reset state before action", requiredIncludes: ["setState(initialState)"], points: 3 },
        { id: "uses-act", description: "Wrap action in act", requiredIncludes: ["act(() =>"], points: 2 },
        { id: "uses-get-state", description: "Use getState to call and assert", requiredIncludes: ["getState()"], points: 2 },
        { id: "asserts", description: "Assert expected result", requiredIncludes: ["expect(", ".toBe("], points: 2 }
      ]
    },
    hints: ["Reset the store at the start of the test.", "Call actions through useBearStore.getState().", "Use act around updates that React may observe."],
    playgroundType: "testing",
    successMessage: "The store action passes the test bench."
  })
];

export const levelMap = new Map(levels.map((level) => [level.id, level]));

export const playgroundTypes: Record<Level["playgroundType"], PlaygroundType> = {
  counter: "counter",
  cart: "cart",
  renderLab: "renderLab",
  async: "async",
  persist: "persist",
  slices: "slices",
  devtools: "devtools",
  immer: "immer",
  ssr: "ssr",
  testing: "testing"
};
