import type { Level, ValidationCheck, ValidationResult } from "@/types/game";
import { compactCode, normalizeCode } from "./normalizeCode";

function runCheck(check: ValidationCheck, normalized: string, compact: string) {
  const includesOk = (check.requiredIncludes ?? []).every((needle) => {
    const normalizedNeedle = compactCode(needle);
    return compact.includes(normalizedNeedle) || normalized.includes(needle);
  });

  const forbiddenOk = !(check.forbiddenIncludes ?? []).some((needle) => {
    const normalizedNeedle = compactCode(needle);
    return compact.includes(normalizedNeedle) || normalized.includes(needle);
  });

  let patternOk = true;
  if (check.pattern) {
    patternOk = new RegExp(check.pattern, "ims").test(normalized);
  }

  return includesOk && forbiddenOk && patternOk;
}

export function validateCode(level: Level, userCode: string): ValidationResult {
  const normalizedCode = normalizeCode(userCode);
  const compact = compactCode(userCode);
  const passedChecks: string[] = [];
  const failedChecks: ValidationResult["failedChecks"] = [];
  const maxScore = level.validation.checks.reduce((sum, check) => sum + check.points, 0);
  let score = 0;

  for (const check of level.validation.checks) {
    if (runCheck(check, normalizedCode, compact)) {
      passedChecks.push(check.id);
      score += check.points;
    } else {
      failedChecks.push({
        id: check.id,
        description: check.description,
        message: check.message ?? `Missing: ${check.description}`
      });
    }
  }

  return {
    isCorrect: failedChecks.length === 0,
    score: maxScore === 0 ? 0 : Math.round((score / maxScore) * 100),
    passedChecks,
    failedChecks,
    normalizedCode
  };
}
