async function formatWithPrettier(code: string) {
  const [prettier, typescriptPlugin, estreePlugin] = await Promise.all([
    import("prettier/standalone"),
    import("prettier/plugins/typescript"),
    import("prettier/plugins/estree")
  ]);

  return prettier.format(code, {
    parser: "typescript",
    plugins: [typescriptPlugin.default, estreePlugin.default],
    printWidth: 88,
    tabWidth: 2,
    semi: true,
    trailingComma: "none"
  });
}

function stripObjectWrapper(formatted: string) {
  const match = formatted.match(/^const __snippet = \{\n([\s\S]*)\n\};\n?$/);
  return match?.[1]?.replace(/^  /gm, "").trim() ?? formatted.trim();
}

export async function formatCodeSnippet(code: string) {
  try {
    return (await formatWithPrettier(code)).trim();
  } catch {
    const wrapped = `const __snippet = {\n${code}\n};`;
    try {
      return stripObjectWrapper(await formatWithPrettier(wrapped));
    } catch {
      throw new Error("This snippet is not syntactically complete enough to format yet.");
    }
  }
}
