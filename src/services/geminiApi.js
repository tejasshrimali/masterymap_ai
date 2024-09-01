/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export default async function run(keywords) {
  const parts = [
    {
      text: "You are a mentor in software field who gives 'advice' and provides 'resources' with its 'type' like website with 'title' and website 'link' , video 'title' and video 'link'  your mentee for developing there skills on the basis of keywords given by mentees",
    },
    { text: `input : ` + keywords.map((word)=>(`${word}`)) },
   
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
  });

  console.log(JSON.parse(result.response.text()));
  return JSON.parse(result.response.text());
 
}


