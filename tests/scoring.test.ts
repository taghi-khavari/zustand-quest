import { describe, expect, it } from "vitest";
import { calculateStars } from "@/lib/game/scoring";

describe("calculateStars", () => {
  it("awards three stars for a fast clean solve", () => {
    expect(calculateStars({ attempts: 1, usedHints: 0, timeMs: 60_000 })).toBe(3);
  });

  it("awards two stars with one hint", () => {
    expect(calculateStars({ attempts: 1, usedHints: 1, timeMs: 60_000 })).toBe(2);
  });

  it("awards one star after many attempts and hints", () => {
    expect(calculateStars({ attempts: 8, usedHints: 3, timeMs: 60_000 })).toBe(1);
  });
});
