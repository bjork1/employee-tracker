var mysql = require("mysql");

var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "tracker_data"
});

/*
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});
*/
/*
function afterConnection() {
  let sql = "SELECT * FROM employee";
  //WHERE (title = 'Marketing Intern' OR salary > 50000) ORDER BY salary ASC";
  connection.query(sql, function(err, res) {
    if (err) throw err;
    console.log(res);
    console.table(res);
  });
}
*/

var questions = inquirer
  .prompt([
    {
      type: "list",
      name: "dropdown",
      message: "Please select from the options below",
      choices: ["View all employees", "View all roles", "View all departments"]
    }
  ])

  .then(answers => {
    if (answers.dropdown === "View all employees") {
      connection.connect(function(err) {
        if (err) throw err;
        //console.log("connected as id " + connection.threadId);
        afterConnection();
      });

      function afterConnection() {
        let sql = "SELECT * FROM employee";
        //WHERE (title = 'Marketing Intern' OR salary > 50000) ORDER BY salary ASC";
        connection.query(sql, function(err, res) {
          if (err) throw err;
          //console.log(res);
          console.table(res);
        });
      }
      questions;
    }
    if (answers.dropdown === "View all roles") {
      connection.connect(function(err) {
        if (err) throw err;
        //console.log("connected as id " + connection.threadId);
        afterConnection();
      });

      function afterConnection() {
        let sql = "SELECT * FROM role";
        //WHERE (title = 'Marketing Intern' OR salary > 50000) ORDER BY salary ASC";
        connection.query(sql, function(err, res) {
          if (err) throw err;
          //console.log(res);
          console.table(res);
        });
      }
    } else if (answers.dropdown === "View all departments") {
      connection.connect(function(err) {
        if (err) throw err;
        //console.log("connected as id " + connection.threadId);
        afterConnection();
      });

      function afterConnection() {
        let sql = "SELECT * FROM department";
        //WHERE (title = 'Marketing Intern' OR salary > 50000) ORDER BY salary ASC";
        connection.query(sql, function(err, res) {
          if (err) throw err;
          //console.log(res);
          console.table(res);
        });
      }
    }
  });
