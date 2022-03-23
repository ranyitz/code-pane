import { useState } from "react";

import tomorrow from "react-syntax-highlighter/dist/cjs/styles/prism/tomorrow";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

export const CodeViewer = ({ code }) => {
  const [highlightedLines, setHighlightedLines] = useState(new Set());
  const [toggle, setToggle] = useState(true);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        id="export-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SyntaxHighlighter
          language="javascript"
          id="code"
          style={tomorrow}
          customStyle={{
            minHeight: "20px",
            minWidth: "40px",
            margin: "0 0",
          }}
          wrapLines={true}
          showLineNumbers={true}
          lineProps={(number) => {
            let opacity;

            if (highlightedLines.size === 0) {
              opacity = 1;
            } else if (highlightedLines.has(number)) {
              opacity = 1;
            } else {
              opacity = 0.3;
            }

            return {
              style: { opacity, cursor: "pointer" },
              onClick: () => {
                if (highlightedLines.has(number)) {
                  highlightedLines.delete(number);
                } else {
                  highlightedLines.add(number);
                }

                setHighlightedLines(highlightedLines);

                // A hack to re-render the lines after each change
                // for some reason only code changes trigger a re-render
                setToggle(!toggle);
              },
            };
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
