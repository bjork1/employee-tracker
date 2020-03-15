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

inquirer
  .prompt([
    {
      type: "list",
      name: "dropdown",
      message: "Please select from the options below",
      choices: [
        "View all employees",
        "View all roles",
        "View all departments",
        "Add employee",
        "Add role",
        "Add department"
      ]
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
    }
    if (answers.dropdown === "View all departments") {
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
    if (answers.dropdown === "Add employee") {
      inquirer
        .prompt([
          {
            type: "input",
            name: "first_name",
            message: "What is the employees first name?"
          },
          {
            type: "input",
            name: "last_name",
            message: "What is the employees last name?"
          },
          {
            type: "list",
            name: "role",
            message: "What is the employees position?",
            choices: [
              "Market Analyst",
              "Marketing Intern",
              "Marketing Manager",
              "Social Media Specialist",
              "Operations Manager",
              "Operations Analyst",
              "Customer Service Rep",
              "Accounting Manager",
              "Junior Accountant",
              "Product Owner",
              "Scrum Master",
              "Software Developer",
              "Project Manager"
            ]
          }
        ])
        .then(answers => {
          console.log(answers.first_name);
          console.log(answers.last_name);
          console.log(answers.role);

          connection.connect(function(err) {
            if (err) throw err;
            //console.log("connected as id " + connection.threadId);
            afterConnection();
          });

          function afterConnection() {
            let sql =
              "INSERT INTO employee(first_name, last_name, role_id) VALUES(" +
              answers.first_name +
              "," +
              answers.last_name +
              "," +
              answers.role +
              ");";
            //WHERE (title = 'Marketing Intern' OR salary > 50000) ORDER BY salary ASC";
            connection.query(sql, function(err, res) {
              if (err) throw err;
              //console.log(res);
              console.table(res);
            });
          }
        });
    }
  });
