const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const event = req.body;

  axios.post("http://127.0.0.1:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://127.0.0.1:4001/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://127.0.0.1:4002/events", event).catch((err) => {
    console.log(err.message);
  });

  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
