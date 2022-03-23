import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

export const exportToPng = async () => {
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
};
