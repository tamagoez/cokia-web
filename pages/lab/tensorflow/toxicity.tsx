import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { doToxicity } from "../../../scripts/tensorflow/toxicity";

export default function liveToxicity() {
  const [input, setInput] = useState("");
  const [toxied, setToxied] = useState("");

  async function buttonPressed() {
    setToxied("分析中");
    const predictions = await doToxicity(input);
    let returnhtml = "";
    predictions.forEach((prediction) => {
      const returnmatch = prediction.match ? "red" : "green";
      returnhtml += `${prediction.label}: 
    <span style="color:${returnmatch}">${prediction.match}</span><br>`;
    });
    setToxied(returnhtml);
  }
  return (
    <>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <Button onClick={() => buttonPressed()}>分析</Button>
      <div dangerouslySetInnerHTML={{ __html: toxied }}></div>
    </>
  );
}
