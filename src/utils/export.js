import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

const toPngBlob = async () => {
  const node = document.getElementById("export-container");
  const exportSize = 4;

  const width = node.offsetWidth * exportSize;
  const height = node.offsetHeight * exportSize;

  const blob = await domtoimage.toBlob(node, {
    style: {
      transform: `scale(${exportSize})`,
      "transform-origin": "center",
      background: "none",
    },
    width,
    height,
  });

  return blob;
};

const toPng = async () => {
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

  return png;
};

export const exportToPng = async () => {
  const png = await toPng();
  saveAs(png, "code.png");
};

export const exportToClipboard = async () => {
  const blob = await toPngBlob();

  navigator.clipboard.write([
    new window.ClipboardItem({
      [blob.type]: blob,
    }),
  ]);
};
