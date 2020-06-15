const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();

app.use(cors());
app.use(bodyParser.json());

//connecting to database
const connection = mysql.createConnection({
  host: "tr-course-instance1.chxrnd0gkww3.eu-west-2.rds.amazonaws.com",
  user: "root",
  password: "",
  database: "todos",
})

app.get("/tasks", function (req, res) {
  const query = "SELECT * FROM todos_table;"

  connection.query(query, function (error, data) {
    if (error) {
      console.log("Error fetching task", error);
      res.status(500).json({
        error: error
      });
    } else {
      res.status(200).send(data)
    }
  });
});
// let taskList = [
//   { text: "Look up isBefore and momentjs.com", completed: false, dueDate: "2020-05-20", priority: "high", id: 1 },
//   { text: "try and order you lists by date", completed: false, dueDate: "2020-05-20", priority: "high", id: 2 },
//   { text: "Wash Alan", completed: false, dueDate: "2020-05-17", priority: "high", id: 3 },
//   { text: "Find the cat", completed: false, dueDate: "2020-05-17", priority: "medium", id: 4 },
//   { text: "Take a secret nap", completed: false, dueDate: "2020-05-24", priority: "low", id: 5 },
//   { text: "Make a white Russian", completed: true, dueDate: "2020-05-01", priority: "doneColor", id: 6 },
// ];
// res.send({
//   taskList
// });

app.post("/tasks", function (req, res) {
  const query = "INSERT INTO todos_table VALUES (?,?,?,?,?,?,?,?,?,?,?)";
  const userQuery = "INSERT INTO User VALUES (?,?,?)";
  const querySelect = "SELECT * FROM todos_table WHERE todoId = ?";
  const querySelectUser = "SELECT * FROM User WHERE userId = ?";

  connection.query(query, [req.body.todoId, req.body.text, req.body.originalDueDate, req.body.currentDueDate, req.body.priority, req.body.completed, req.body.twFlag, req.body.nwFlag, req.body.allWeeksFlag, req.body.deleted, req.body.userId], function (error, data) {
    if (error) {
      console.log("Error adding a task", error);
      res.status(500).json({
        error: error
      })
    } else {
      connection.query(querySelect, [data.insertId], function (error, data) {
        if (error) {
          console.log("Error getting the task", error);
          res.status(500).json({
            error: error
          })
        } else {
          res.status(201).json({
            task: data
          })
        }
      })
    }
  })
});

app.delete("/tasks/:taskId", function (req, res) {
  // const taskIdToBeDeleted = req.params.taskId;
  // let someResponse = {
  //   message: "You issued a delete request for ID: " + taskIdToBeDeleted
  // };

  // if (taskIdToBeDeleted > 6 || taskIdToBeDeleted < 1) {
  //   res.status(404).send("Task " + taskIdToBeDeleted + " does NOT exist")
  // }

  // res.send({
  //   someResponse
  // });

  const queryDelete = "DELETE FROM todos_table WHERE todoId = ?";
  
  connection.query(queryDelete, [req.body.todoId], function (error, data) {
    if (error) {
      console.log("Error deleting a task check user id exists", error);
      res.status(500).json({
        error: error
      })
    } else {
      res.status(200).json({
        task: data
      })
    }
  })
});

app.put("/tasks/:taskId", function (req, res) {
  // const taskIdToBeAmended = req.params.taskId;
  // let somePutResponse = {
  //   message: "You issued a put request for ID: " + taskIdToBeAmended};
  // if (taskIdToBeAmended > 6 || taskIdToBeAmended < 1) {
  //   res.status(404).send("Task " + taskIdToBeAmended + " does NOT exist")}
  // res.send({somePutResponse});

  const queryPut = " UPDATE todos_table SET KEYS = (?) WHERE todid=(?);";
  connection.query(queryPut, [req.params.taskId], [req.body.todoId, req.body.text, req.body.originalDueDate, req.body.currentDueDate, req.body.priority, req.body.completed, req.body.twFlag, req.body.nwFlag, req.body.allWeeksFlag, req.body.deleted, req.body.userId], function (error, data) {
    if (error) {
      console.log("Error changing task", error);
      res.status(500).json({
        error: error
      });
    } else {
      res.status(200).send(data)
    }
  });
});

module.exports.handler = serverless(app);
