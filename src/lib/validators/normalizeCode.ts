export function normalizeCode(code: string) {
  return code
    .replace(/\r\n/g, "\n")
    .trim()
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n");
}

export function compactCode(code: string) {
  return normalizeCode(code).replace(/\s+/g, " ");
}
