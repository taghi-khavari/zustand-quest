"use client";

import CodeMirror from "@uiw/react-codemirror";
import { indentWithTab } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import { EditorView, keymap } from "@codemirror/view";
import { oneDark } from "@codemirror/theme-one-dark";

export function RichCodeEditor({
  code,
  fontSize,
  onChange
}: {
  code: string;
  fontSize: number;
  onChange: (code: string) => void;
}) {
  return (
    <div className="h-full min-h-0 overflow-hidden">
      <CodeMirror
        value={code}
        height="100%"
        className="h-full"
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true
        }}
        extensions={[
          javascript({ jsx: true, typescript: true }),
          keymap.of([indentWithTab]),
          EditorView.lineWrapping,
          EditorView.theme({
            "&": {
              height: "100%",
              fontSize: `${fontSize}px`,
              backgroundColor: "#020617"
            },
            ".cm-scroller": {
              overflow: "auto",
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace",
              lineHeight: "1.55"
            },
            ".cm-content": {
              minHeight: "100%",
              padding: "16px 0"
            },
            ".cm-line": {
              padding: "0 16px"
            },
            ".cm-gutters": {
              backgroundColor: "#020617",
              borderRightColor: "#1e293b"
            },
            ".cm-activeLineGutter, .cm-activeLine": {
              backgroundColor: "rgba(51, 65, 85, 0.45)"
            },
            ".cm-focused": {
              outline: "2px solid #4d9b59",
              outlineOffset: "-2px"
            }
          })
        ]}
        theme={oneDark}
        onChange={onChange}
        aria-label="Zustand challenge code editor"
      />
    </div>
  );
}
