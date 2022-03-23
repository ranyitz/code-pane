import React, { useState } from "react";
import tomorrow from "react-syntax-highlighter/dist/cjs/styles/prism/tomorrow";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

const codeString = `function Foo() {
  this.a = 1;
  this.b = 2;
}
 
Foo.prototype.c = 3;
 
_.values(new Foo);
// => [1, 2] (iteration order is not guaranteed)
 
_.values('hi');
// => ['h', 'i']`;

const Component = () => {
  const [code, setCode] = useState(codeString);
  const [highlightedLines, setHighlightedLines] = useState(new Set());
  const [toggle, setToggle] = useState(true);

  return (
    <div>
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
              minHeight: "200px",
              minWidth: "400px",
              margin: "0 0",
            }}
            wrapLines={true}
            showLineNumbers={true}
            lineProps={(number) => {
              console.log(`render line ${number}`);
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
                  if (toggle) {
                    setCode(code + " ");
                    setToggle(false);
                  } else {
                    setCode(code.slice(0, -1));
                    setToggle(true);
                  }
                },
              };
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <textarea
          style={{ width: "800px", height: "300px" }}
          height="500"
          value={code}
          onChange={(e) => setCode(e.currentTarget.value)}
        />
      </div>
    </div>
  );
};

function App() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Code Pane</h1>
        <p>Click on lines to highlight them</p>
        <button
          onClick={async () => {
            const node = document.getElementById("export-container");
            const exportSize = 4;

            const width = node.offsetWidth * exportSize;
            const height = node.offsetHeight * exportSize;

            const png = await domtoimage.toPng(node, {
              style: {
                transform: `scale(${exportSize})`,
                "transform-origin": "center",
                background: "none",
              },
              width,
              height,
            });

            saveAs(png, "code.png");
          }}
        >
          Export
        </button>
        <br />
      </div>
      <Component />
    </div>
  );
}
export default App;
