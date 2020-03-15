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
        "Add position",
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
          let result = "";
          if (answers.role === "Market Analyst") {
            result = 1;
          }
          if (answers.role === "Marketing Intern") {
            result = 2;
          }
          if (answers.role === "Marketing Manager") {
            result = 3;
          }
          if (answers.role === "Social Media Specialist") {
            result = 4;
          }
          if (answers.role === "Operations Manager") {
            result = 5;
          }
          if (answers.role === "Operations Analyst") {
            result = 6;
          }
          if (answers.role === "Customer Service Rep") {
            result = 7;
          }
          if (answers.role === "Accounting Manager") {
            result = 8;
          }
          if (answers.role === "Junior Accountant") {
            result = 9;
          }
          if (answers.role === "Product Owner") {
            result = 10;
          }
          if (answers.role === "Scrum Master") {
            result = 11;
          }
          if (answers.role === "Software Developer") {
            result = 12;
          }
          if (answers.role === "Project Manager") {
            result = 13;
          }

          connection.connect(function(err) {
            if (err) throw err;
            //console.log("connected as id " + connection.threadId);
            afterConnection();
          });

          function afterConnection() {
            let sql =
              "INSERT INTO employee(first_name, last_name, role_id) VALUES('" +
              answers.first_name +
              "', '" +
              answers.last_name +
              "', " +
              result +
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

    //Add Position

    if (answers.dropdown === "Add position") {
      inquirer
        .prompt([
          {
            type: "input",
            name: "title",
            message: "What is the position you would like to add?"
          },
          {
            type: "input",
            name: "salary",
            message: "What is the salary for this position?"
          },
          {
            type: "list",
            name: "department",
            message: "Which department will this position be added to?",
            choices: ["Marketing", "Operations", "Accounting", "Scrum Team"]
          }
        ])
        .then(answers => {
          let result = "";
          if (answers.department === "Marketing") {
            result = 1;
          }
          if (answers.department === "Operations") {
            result = 2;
          }
          if (answers.department === "Accounting") {
            result = 3;
          }
          if (answers.department === "Scrum Team") {
            result = 4;
          }

          connection.connect(function(err) {
            if (err) throw err;
            //console.log("connected as id " + connection.threadId);
            afterConnection();
          });

          function afterConnection() {
            let sql =
              "INSERT INTO role(title, salary, department_id) VALUES('" +
              answers.title +
              "', " +
              answers.salary +
              ", " +
              result +
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

    //Add Department

    if (answers.dropdown === "Add department") {
      inquirer
        .prompt([
          {
            type: "input",
            name: "department",
            message: "What is the name of the department you would like to add?"
          }
        ])
        .then(answers => {
          connection.connect(function(err) {
            if (err) throw err;
            //console.log("connected as id " + connection.threadId);
            afterConnection();
          });

          function afterConnection() {
            let sql =
              "INSERT INTO department(name) VALUES('" +
              answers.department +
              "');";
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
