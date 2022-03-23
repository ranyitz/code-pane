import React, { useState } from "react";
import { CodeViewer } from "./components/CodeViewer";
import { CodeEditor } from "./components/CodeEditor";
import { exportToPng, exportToClipboard } from "./utils/export";
import { initialCode } from "./utils/initialCode";
import Button from "@mui/material/Button";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

document.addEventListener("keydown", async (evt) => {
  if (evt.key === "c" && (evt.ctrlKey || evt.metaKey)) {
    console.log("Ctrl+C was pressed");
    await exportToClipboard();
  }
});

const Component = () => {
  const [code, setCode] = useState(initialCode);

  return (
    <div>
      <CodeEditor code={code} setCode={setCode} />
      <br />
      <Divider />
      <br />

      <CodeViewer code={code} />
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
        <Typography variant="h1" component="div" gutterBottom>
          Code Pane
        </Typography>

        <Typography variant="subtitle1" gutterBottom component="div">
          Click on lines to highlight them
        </Typography>
        <Button
          variant="contained"
          startIcon={<FileDownloadIcon />}
          onClick={async () => exportToPng()}
        >
          Export
        </Button>
        <br />
      </div>
      <Component />
    </div>
  );
}

export default App;
