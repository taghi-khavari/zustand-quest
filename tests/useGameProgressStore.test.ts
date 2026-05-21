import { beforeEach, describe, expect, it } from "vitest";
import { act } from "@testing-library/react";
import { useGameProgressStore } from "@/stores/useGameProgressStore";

describe("useGameProgressStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useGameProgressStore.getState().resetProgress();
  });

  it("records attempts", () => {
    act(() => {
      useGameProgressStore.getState().recordAttempt("create-bear-store");
    });

    expect(useGameProgressStore.getState().levels["create-bear-store"].attempts).toBe(1);
  });

  it("completes a level and unlocks the next one", () => {
    act(() => {
      useGameProgressStore.getState().completeLevel("create-bear-store", {
        stars: 3,
        timeMs: 500,
        usedHints: 0
      });
    });

    const state = useGameProgressStore.getState();
    expect(state.levels["create-bear-store"].status).toBe("completed");
    expect(state.levels["select-bears"].status).toBe("available");
    expect(state.totalStars).toBe(3);
  });
});
