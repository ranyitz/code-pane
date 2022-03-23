import React, { useState } from "react";
import { CodeViewer } from "./CodeViewer";
import { CodeEditor } from "./CodeEditor";
import { exportToPng } from "./export";
import { initialCode } from "./initialCode";

const Component = () => {
  const [code, setCode] = useState(initialCode);

  return (
    <div>
      <CodeViewer code={code} />
      <br />
      <CodeEditor code={code} setCode={setCode} />
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
        <button onClick={async () => exportToPng()}>Export</button>
        <br />
      </div>
      <Component />
    </div>
  );
}
export default App;
