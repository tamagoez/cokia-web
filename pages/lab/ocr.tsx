import React, { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
export default function App() {
  const [ocr, setOcr] = useState("Recognizing...");
  const [imgurl, setImgurl] = useState("");

  async function doOCR() {
    const worker = await createWorker({
      logger: (m) => console.log(m),
    });
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(imgurl);
    setOcr(text);
  }

  return (
    <div className="App">
      <input value={imgurl} onChange={(e) => setImgurl(e.target.value)} />
      <button onClick={() => doOCR()}>認識する</button>
      <p>↓認識されたやつ</p>
      <p>{ocr}</p>
      <canvas />
    </div>
  );
}
