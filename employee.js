var mysql = require("mysql");

var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employee_tracker_database"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connection as id:" + connection.threadId);
  connection.end();
});

inquirer
  .prompt([
    {
      type: "input",
      name: "test",
      message: "Hey there"
    }
  ])

  .then(answers => {});
