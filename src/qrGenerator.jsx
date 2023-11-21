import "./index.css";
import QRCode from "react-qr-code";
import React from "react";

function Generator() {
  const [setText, typeText] = React.useState("");
  const [setQrText, qrText] = React.useState("");

  function typing(e) {
    typeText(e.target.value);
  }

  const download = () => {
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `${setText}`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <div className="wrap active">
      <header>
        <h1>QR Code Generator</h1>
        <p>Paste a url or enter text to create QR code</p>
      </header>
      <div className="form">
        <input
          type="text"
          spellCheck="false"
          placeholder="Enter text or url"
          name="text"
          onChange={typing}
          value={setText}
        />
        <button onClick={download}>Download</button>
      </div>
      <div className="qr-code">
        <QRCode
          //id="QRCodeScaled"
          size={256}
          style={{ height: "180", maxWidth: "100%", width: "180" }}
          title="Custom Title"
          value={setText}
          viewBox={`0 0 200 200`}
          id="QRCode"
          bgColor="black"
          fgColor="white"
        />
      </div>
    </div>
  );
}
export default Generator;
