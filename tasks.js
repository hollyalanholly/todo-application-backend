const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/tasks", function (req, res) {

  let taskList = [
    { text: "Look up isBefore and momentjs.com", completed: false, dueDate: "2020-05-20", priority: "high", id: 1 },
    { text: "try and order you lists by date", completed: false, dueDate: "2020-05-20", priority: "high", id: 2 },
    { text: "Wash Alan", completed: false, dueDate: "2020-05-17", priority: "high", id: 3 },
    { text: "Find the cat", completed: false, dueDate: "2020-05-17", priority: "medium", id: 4 },
    { text: "Take a secret nap", completed: false, dueDate: "2020-05-24", priority: "low", id: 5 },
    { text: "Make a white Russian", completed: true, dueDate: "2020-05-01", priority: "doneColor", id: 6 },
  ];

  res.send({
    taskList
  });
});

app.post("/tasks", function (req, res) {
  const text = req.body.text;
  const date = req.body.date;
  const priority = req.body.priority;

  res.json({
    message: `Received a request to add task ${text} with date ${date} and a priority of ${priority}`
  });

});

app.delete("/tasks/:taskId", function (req, res) {

  const taskIdToBeDeleted = req.params.taskId;
  let someResponse = {
    message: "You issued a delete request for ID: " + taskIdToBeDeleted
  };

  if (taskIdToBeDeleted > 6 || taskIdToBeDeleted < 1) {
    res.status(404).send("Task " + taskIdToBeDeleted + " does NOT exist")
  }

  res.send({
    someResponse
  });

});

app.put("/tasks/:taskId", function (req, res) {
  const taskIdToBeAmended = req.params.taskId;
  let somePutResponse = {
    message: "You issued a put request for ID: " +taskIdToBeAmended 
  };

  if (taskIdToBeAmended > 6 || taskIdToBeAmended < 1) {
    res.status(404).send("Task " + taskIdToBeAmended + " does NOT exist")
  }

  res.send({
    somePutResponse
  });
});

module.exports.handler = serverless(app);
