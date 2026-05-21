import type { Level, ValidationCheck, ValidationResult } from "@/types/game";
import { compactCode, denseCode, normalizeCode } from "./normalizeCode";

type CodeForms = {
  normalized: string;
  compact: string;
  dense: string;
};

function stripComments(code: string) {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");
}

function runRule(check: ValidationCheck, code: CodeForms) {
  switch (check.rule) {
    case "zustand-create-import":
      return /import\s*\{\s*[^}]*\bcreate\b(?:\s+as\s+\w+)?[^}]*\}\s*from\s*["']zustand["']/im.test(
        code.normalized
      );
    case "bear-state-type": {
      const typeMatch = code.normalized.match(/type\s+BearState\s*=\s*\{([\s\S]*?)\}/im);
      const body = typeMatch?.[1] ?? "";

      return (
        /\bbears\s*:\s*number\b/im.test(body) &&
        /\bincreasePopulation\s*:\s*\(\s*\)\s*=>\s*void\b/im.test(body) &&
        /\bremoveAllBears\s*:\s*\(\s*\)\s*=>\s*void\b/im.test(body)
      );
    }
    case "bear-create-generic":
      return /create\s*<\s*BearState\s*>\s*(?:\(\s*\)\s*)?\(/im.test(code.normalized);
    case "bear-functional-increment": {
      const namedStateParam =
        /set\s*\(\s*\(?\s*([A-Za-z_$][\w$]*)\s*\)?\s*=>[\s\S]*bears\s*:\s*\1\.bears\s*\+\s*1/im;
      const destructuredStateParam =
        /set\s*\(\s*\(?\s*\{\s*bears\s*\}\s*\)?\s*=>[\s\S]*bears\s*:\s*bears\s*\+\s*1/im;

      return namedStateParam.test(code.normalized) || destructuredStateParam.test(code.normalized);
    }
    case "bear-reset-action":
      return (
        /removeAllBears\s*:\s*\(\s*\)\s*=>[\s\S]*set\s*\(\s*\{\s*bears\s*:\s*0\s*\}\s*\)/im.test(code.normalized) &&
        !/set\(\{\},true\)/im.test(code.dense)
      );
    default:
      return true;
  }
}

function runCheck(check: ValidationCheck, code: CodeForms) {
  const ruleOk = runRule(check, code);
  const includesOk = (check.requiredIncludes ?? []).every((needle) => {
    const normalizedNeedle = compactCode(needle);
    return (
      code.compact.includes(normalizedNeedle) ||
      code.normalized.includes(needle) ||
      code.dense.includes(denseCode(needle))
    );
  });

  const forbiddenOk = !(check.forbiddenIncludes ?? []).some((needle) => {
    const normalizedNeedle = compactCode(needle);
    return (
      code.compact.includes(normalizedNeedle) ||
      code.normalized.includes(needle) ||
      code.dense.includes(denseCode(needle))
    );
  });

  let patternOk = true;
  if (check.pattern) {
    patternOk = new RegExp(check.pattern, "ims").test(code.normalized);
  }

  return ruleOk && includesOk && forbiddenOk && patternOk;
}

export function validateCode(level: Level, userCode: string): ValidationResult {
  const checkableCode = stripComments(userCode);
  const normalizedCode = normalizeCode(checkableCode);
  const code: CodeForms = {
    normalized: normalizedCode,
    compact: compactCode(checkableCode),
    dense: denseCode(checkableCode)
  };
  const passedChecks: string[] = [];
  const failedChecks: ValidationResult["failedChecks"] = [];
  const maxScore = level.validation.checks.reduce((sum, check) => sum + check.points, 0);
  const requiredFailedChecks: ValidationResult["failedChecks"] = [];
  let score = 0;

  for (const check of level.validation.checks) {
    if (runCheck(check, code)) {
      passedChecks.push(check.id);
      score += check.points;
    } else {
      const failedCheck = {
        id: check.id,
        description: check.description,
        message: check.message ?? `Missing: ${check.description}`
      };
      failedChecks.push(failedCheck);

      if (check.required ?? true) {
        requiredFailedChecks.push(failedCheck);
      }
    }
  }

  return {
    isCorrect: requiredFailedChecks.length === 0,
    score: maxScore === 0 ? 0 : Math.round((score / maxScore) * 100),
    passedChecks,
    failedChecks,
    normalizedCode
  };
}
