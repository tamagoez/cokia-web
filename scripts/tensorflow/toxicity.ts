import * as tf from "@tensorflow/tfjs";
import * as toxicity from "@tensorflow-models/toxicity";
import "@tensorflow/tfjs-backend-webgl";
export async function doToxicity(input: string, threshold = 0.9) {
  const toxicityLabels = [
    "identity_attack",
    "insult",
    "obscene",
    "severe_toxicity",
    "sexual_explicit",
    "threat",
    "toxicity",
  ];
  const model = await toxicity.load(threshold, toxicityLabels);

  const sentences = [];
  sentences.push(input);

  const predictions = await model.classify(sentences);

  // predictions is an array of objects, one for each prediction head,
  // that contains the raw probabilities for each input along with the
  // final prediction in match (either true or false).
  // If neither prediction exceeds the threshold, match is null.
  console.log(predictions);
  let returnjson = [];
  predictions.forEach((prediction) => {
    // 各要素を処理するためのコード
    returnjson.push({
      label: prediction.label,
      match: prediction.results[0].match,
    });
  });
  console.log(returnjson);
  return returnjson;
}
