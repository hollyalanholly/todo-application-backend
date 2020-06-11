const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/tasks", function (req, res) {
  
  let taskList = [
      { text: "Look up isBefore and momentjs.com", completed: false, dueDate: "2020-05-20", priority: "high", id: 1 },
      { text: "try and order you lists by date", completed: false, dueDate: "2020-05-20", priority: "high", id: 2 },
      { text: "Wash Alan", completed: false, dueDate: "2020-05-17", priority: "high", id: 3 },
      { text: "Find the cat", completed: false, dueDate: "2020-05-17", priority: "medium", id:4 },
      { text: "Take a secret nap", completed: false, dueDate: "2020-05-24", priority: "low", id: 5 },
      { text: "Make a white Russian", completed: true, dueDate: "2020-05-01", priority: "doneColor", id: 6 },
    ];
  
  res.send({
    taskList
      });
  });

  app.delete("/tasks/:taskId", function (req, res) {

    const taskIdToBeDeleted = req.params.taskId;
    let someResponse = {
      message: "You issued a delete request for ID: " + taskIdToBeDeleted
    };

    if(taskIdToBeDeleted > 6 || taskIdToBeDeleted<1) {
      res.status(404);
      someResponse = {
        message: "Task " + taskIdToBeDeleted + " does NOT exist"
      }
    }  

    res.send({ 
       someResponse
         
  });

  });

  module.exports.handler = serverless(app);
