const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const PORT = 4000;
const app = express();

app.use(bodyParser.json());
app.use(cors());
const posts = {};
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex"); // random 4 bytes//
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };
  await axios.post("http://127.0.0.1:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });
  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);
  res.send({});
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
