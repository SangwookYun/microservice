const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
const { type } = require("os");
const app = express();
app.use(cors());
const commentsByPostId = {};

app.use(bodyParser.json());

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });

  await axios.post("http://127.0.0.1:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
    },
  });

  commentsByPostId[req.params.id] = comments;
  res.status(201).send(commentsByPostId[req.params.id]);
});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);
  res.send({});
});

app.listen(4001, () => {
  console.log(`Listening on 4001`);
});
