

// const express = require("express");
// require("dotenv").config();
// const { Configuration, OpenAIApi } = require("openai");
// const app = express();

// app.use(express.json());

// const config = new Configuration({
//   apiKey: process.env.OPEN_AI_KEY,
// })

// // app.get("/", function (req, res) {
// //   // just send some plain text
// //   res.send("Hello world!");
// // });

// const openai = new OpenAIApi(config);

// const runPrompt = async () => {

//   const prompt = "Tell me a joke about a cat eating pasta.";
//   const response = await openai.createCompletion({
//     model: "text-davinci-003",
//     prompt: prompt,
//     temperature: 1,
//     max_tokens: 100,
//   });
//   console.log(response.data);
// }

// runPrompt();