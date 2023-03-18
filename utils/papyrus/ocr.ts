import { createWorker } from "tesseract.js";
export async function doOCR(imgurl) {
  const worker = await createWorker({
    logger: (m) => console.log(m),
  });
  await worker.load();
  await worker.loadLanguage("eng+jpn");
  await worker.initialize("eng+jpn");
  const {
    data: { text },
  } = await worker.recognize(imgurl);
  return text;
}
