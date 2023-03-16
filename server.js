const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
require("dotenv").config();

app.use(express.json());

const config = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(config);


io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat message", async (msg) => {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: msg,
      temperature: 1,
      max_tokens: 500,
    });
    io.emit("chat message", response.data.choices[0].text);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});


app.use(express.static('app'));
app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));


//Call back function
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/app/html/index.html');
});

app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + '/app/html/index.html');
});

app.get('/login.html', (req, res) => {
  res.sendFile(__dirname + '/app/html/login.html');
});

app.get('/main.html', (req, res) => {
  res.sendFile(__dirname + '/app/html/main.html');
});

app.get('/learnmorepage.html', (req, res) => {
  res.sendFile(__dirname + '/app/html/learnmorepage.html');
});

app.get('/profile.html', (req, res) => {
  res.sendFile(__dirname + '/app/html/profile.html');
});

app.get('/stats.html', (req, res) => {
  res.sendFile(__dirname + '/app/html/stats.html');
});


app.get('/header', (req, res) => {
  res.sendFile(__dirname + '/text/header.html');
});

app.get('/nav', (req, res) => {
  res.sendFile(__dirname + '/text/nav.html');
});


http.listen(8080, () => {
  console.log("listening on *:8080");
});
