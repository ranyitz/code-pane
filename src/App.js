import React, { useState } from "react";
import tomorrow from "react-syntax-highlighter/dist/cjs/styles/prism/tomorrow";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

const codeString = `import reportWebVitals from './reportWebVitals';

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
  
  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();`;

const Component = () => {
  const [code, setCode] = useState(codeString);

  return (
    <div>
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
          wrapLines={true}
          showLineNumbers={true}
          lineProps={(number) => {
            if (number === 7 || number === 1) return { style: { opacity: 1 } };
            return { style: { opacity: 0.3 } };
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

function App() {
  return (
    <div>
      <h1>Syntax highlighter</h1>
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

          saveAs(png, "my-node.png");
        }}
      >
        Export
      </button>
      <Component />
    </div>
  );
}
export default App;
