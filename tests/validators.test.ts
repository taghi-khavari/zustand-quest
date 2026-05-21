import { describe, expect, it } from "vitest";
import { levels } from "@/data/levels";
import { validateCode } from "@/lib/validators/validators";

describe("validateCode", () => {
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
});
