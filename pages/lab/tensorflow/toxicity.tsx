import * as tf from "@tensorflow/tfjs";
import * as toxicity from "@tensorflow-models/toxicity";
import "@tensorflow/tfjs-backend-webgl";
import { useState } from "react";
import { Button } from "@chakra-ui/react";

export default function liveToxicity() {
  const [input, setInput] = useState("");
  const [toxied, setToxied] = useState("");

  // The minimum prediction confidence.
  const threshold = 0.9;
  const toxicityLabels = [
    "identity_attack",
    "insult",
    "obscene",
    "severe_toxicity",
    "sexual_explicit",
    "threat",
    "toxicity",
  ];

  async function runToxicity() {
    const model = await toxicity.load(threshold, toxicityLabels);

    const sentences = [];
    sentences.push(input);

    const predictions = await model.classify(sentences);

    // predictions is an array of objects, one for each prediction head,
    // that contains the raw probabilities for each input along with the
    // final prediction in match (either true or false).
    // If neither prediction exceeds the threshold, match is null.
    console.log(predictions);
    setToxied(JSON.stringify(predictions));
  }

  function buttonPressed() {
    runToxicity();
  }
  return (
    <>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <Button onClick={() => buttonPressed()}>分析</Button>
      <p>{toxied}</p>
    </>
  );
}
