const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:3000`);
});
app.post('/chatbot', async (req, res) => {
  const { message } = req.body;

  const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
    prompt: message,
    max_tokens: 50,
    n: 1,
    stop: '\n',
    temperature: 0.7
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.sk - H8XBM50I3ebv2OmRQR5pT3BlbkFJCbkhduuyyvyzYmuLNdmj}`
    }
  });

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/learnmorepage.html');
  });

  const { choices } = response.data?.choices?.[0];

  const botResponse = choices.map(choice => choice.text).join('');

  res.json({ message: botResponse });
});
