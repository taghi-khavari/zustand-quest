import { describe, expect, it } from "vitest";
import { levels } from "@/data/levels";
import { validateCode } from "@/lib/validators/validators";

describe("validateCode", () => {
  it("accepts every authored level solution", () => {
    for (const level of levels) {
      const starterImports = level.starterCode
        .split("\n")
        .filter((line) => line.trim().startsWith("import "))
        .join("\n");
      const result = validateCode(level, `${starterImports}\n${level.solutionCode}`);

      expect(result.failedChecks, level.id).toHaveLength(0);
      expect(result.isCorrect, level.id).toBe(true);
    }
  });

  it("does not accept starter code as complete", () => {
    for (const level of levels) {
      const result = validateCode(level, level.starterCode);

      expect(result.isCorrect, level.id).toBe(false);
    }
  });

  it("accepts the level solution", () => {
    const level = levels[0];
    const result = validateCode(level, level.solutionCode);

    expect(result.isCorrect).toBe(true);
    expect(result.failedChecks).toHaveLength(0);
  });

  it("rejects unsafe replace reset in the first level", () => {
    const level = levels[0];
    const result = validateCode(level, `${level.solutionCode}\nset({}, true)`);

    expect(result.isCorrect).toBe(false);
    expect(result.failedChecks.some((check) => check.id === "resets-count")).toBe(true);
  });

  it("accepts equivalent create/reset syntax but rejects out-of-scope bear increments", () => {
    const level = levels[0];
    const result = validateCode(
      level,
      `import { create } from "zustand";

type BearState = {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
};

export const useBearStore = create<BearState>((set) => ({
  bears: 0,
  increasePopulation: () => set({bears: bears + 1}),
  removeAllBears: () => set({bears: 0})
}))`
    );

    expect(result.isCorrect).toBe(false);
    expect(result.passedChecks).toContain("imports-create");
    expect(result.passedChecks).toContain("uses-create-generic");
    expect(result.passedChecks).toContain("resets-count");
    expect(result.failedChecks.map((check) => check.id)).toEqual(["uses-functional-set"]);
    expect(result.failedChecks[0].message).toContain("bare variable bears is not in scope");
  });

  it("accepts core behavior even when level one omits the TypeScript generic", () => {
    const level = levels[0];
    const result = validateCode(
      level,
      `import { create } from 'zustand';

type BearState = {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
};

export const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((s) => ({ bears: s.bears + 1 })),
  removeAllBears: () => set({bears:0})
}))`
    );

    expect(result.isCorrect).toBe(true);
    expect(result.passedChecks).toContain("imports-create");
    expect(result.passedChecks).toContain("uses-functional-set");
    expect(result.passedChecks).toContain("resets-count");
    expect(result.failedChecks.map((check) => check.id)).toEqual(["uses-create-generic"]);
    expect(result.score).toBeLessThan(100);
  });

  it("accepts a destructured functional increment in level one", () => {
    const level = levels[0];
    const result = validateCode(
      level,
      `import { create } from "zustand";

type BearState = {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
};

export const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  increasePopulation: () => set(({ bears }) => ({ bears: bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));`
    );

    expect(result.isCorrect).toBe(true);
    expect(result.failedChecks).toHaveLength(0);
  });

  it("accepts selector callbacks with non-state parameter names", () => {
    const selectBears = validateCode(
      levels[1],
      `function BearCounter() {
  const bears = useBearStore((s) => s.bears);
  return <p>{bears} bears</p>;
}`
    );
    const actionButton = validateCode(
      levels[2],
      `function AddBearButton() {
  const increasePopulation = useBearStore((store) => store.increasePopulation);
  return <button onClick={increasePopulation}>Add bear</button>;
}`
    );

    expect(selectBears.isCorrect).toBe(true);
    expect(actionButton.isCorrect).toBe(true);
  });

  it("accepts cart actions with equivalent parameter names", () => {
    const addToCart = validateCode(
      levels[5],
      `addToCart: (nextProduct) =>
  set((current) => ({ items: [...current.items, nextProduct] }))`
    );
    const removeFromCart = validateCode(
      levels[6],
      `removeItem: (productId) =>
  set((cart) => ({ items: cart.items.filter((product) => product.id !== productId) }))`
    );

    expect(addToCart.isCorrect).toBe(true);
    expect(removeFromCart.isCorrect).toBe(true);
  });

  it("requires the async fish action to live inside a Zustand store", () => {
    const result = validateCode(
      levels[12],
      `fetchFish: async () => {
  set({ status: "loading" });
  try {
    const fish = await mockFetchFish();
    set({ fish, status: "success" });
  } catch {
    set({ status: "error" });
  }
}`
    );

    expect(result.isCorrect).toBe(false);
    expect(result.failedChecks.map((check) => check.id)).toEqual(["imports-create", "creates-store"]);
  });

  it("reports the specific wrong field in level five dependent updates", () => {
    const result = validateCode(
      levels[4],
      `import { create } from "zustand";

type BearState = {
  bears: number;
  food: number;
  addBearIfFoodAvailable: () => void;
};

export const useBearStore = create<BearState>()((set, get) => ({
  bears: 0,
  food: 2,
  addBearIfFoodAvailable: () => {
    if (get().food <= 0) return;

    return set((state) => ({
      bears: state.bears + 1,
      food: state.bears - 1
    }));
  }
}));`
    );

    expect(result.isCorrect).toBe(false);
    expect(result.passedChecks).toContain("functional-update");
    expect(result.passedChecks).toContain("increments-bears");
    expect(result.failedChecks.map((check) => check.id)).toContain("decrements-food");
    expect(result.failedChecks.find((check) => check.id === "decrements-food")?.message).toContain("state.food - 1");
  });

  it("rejects persisting modalOpen with any partialize parameter name", () => {
    const level = levels[16];
    const result = validateCode(
      level,
      `partialize: (s) => ({ theme: s.theme, modalOpen: s.modalOpen })`
    );

    expect(result.isCorrect).toBe(false);
    expect(result.failedChecks.map((check) => check.id)).toContain("excludes-modal");
  });
});
