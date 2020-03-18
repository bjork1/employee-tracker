//MySQL
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "tracker_data"
});

connection.connect(function(err) {
  if (err) throw err;
});
addArray = [];
roleArray = [];
depArray = [];
nameArray = [];

//Inquirer
("use strict");
var inquirer = require("inquirer");

var mainPrompt = {
  type: "list",
  name: "main",
  message: "What would you like to do?",
  choices: ["View company information", "Edit company information"]
};

function welcome() {
  console.log("Welcome to the employee tracker. Make yourself at home.");
  options();
}

function options() {
  inquirer.prompt(mainPrompt).then(answers => {
    if (answers.main === "View company information") {
      view();

      //encounter1();
    } else if (answers.main === "Edit company information") {
      edit();
      // exitHouse();
    }
  });
}

function view() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "view",
        message: "Please select from the options below",
        choices: [
          "View all employees",
          "View all roles",
          "View all departments",
          "Return to the Main Menu"
        ]
      }
    ])
    .then(answers => {
      var response = answers.view;
      if (response === "View all employees") {
        console.log("Here are the employees");
        //Welcome();
        afterConnection();
        //});

        function afterConnection() {
          let sql = "SELECT * FROM employee";
          //WHERE (title = 'Marketing Intern' OR salary > 50000) ORDER BY salary ASC";
          connection.query(sql, function(err, res) {
            if (err) throw err;
            //console.log(res);
            console.log("\n");
            console.table(res);
          });
        }
      } else if (response === "View all roles") {
        console.log("Here are the roles");
        afterConnection();
        //});

        function afterConnection() {
          let sql = "SELECT * FROM role";
          //WHERE (title = 'Marketing Intern' OR salary > 50000) ORDER BY salary ASC";
          connection.query(sql, function(err, res) {
            if (err) throw err;
            //console.log(res);
            console.log("\n");
            console.table(res);
          });
        }
        //encounter2a();
      } else if (response === "View all departments") {
        console.log("Here are the departments");
        afterConnection();
        //});

        function afterConnection() {
          let sql = "SELECT * FROM department";
          //WHERE (title = 'Marketing Intern' OR salary > 50000) ORDER BY salary ASC";
          connection.query(sql, function(err, res) {
            if (err) throw err;
            //console.log(res);
            console.log("\n");
            console.table(res);
          });
        }
      } else if (response === "Return to the Main Menu") {
        welcome();
      }
    });
}

function edit() {
  afterConnection();
  function afterConnection() {
    let sql = "SELECT title FROM role AS title";
    let roleSql = "SELECT name FROM department AS name";
    let nameSql = "SELECT * FROM employee;";
    //let depSql = ;

    inquirer
      .prompt([
        {
          type: "list",
          name: "edit",
          message: "Please select from the options below",
          choices: [
            "Add employee",
            "Add position",
            "Add department",
            "Update employee position",
            "Return to the Main Menu"
          ]
        }
      ])
      .then(answers => {
        var response = answers.edit;
        if (response === "Add employee") {
          //console.log("Here are the employees");
          addEmployee();
          //Welcome();
        } else if (response === "Add position") {
          //console.log("Here are the roles");
          addPosition();
          //encounter2a();
        } else if (response === "Add department") {
          console.log("Here are the departments");
          addDepartment();
        } else if (response === "Update employee position") {
          console.log("Update employee information below");
          updatePosition();
        } else if (response === "Return to the Main Menu") {
          welcome();
        }
      });

    function addEmployee() {
      //WHERE (title = 'Marketing Intern' OR salary > 50000) ORDER BY salary ASC";
      connection.query(sql, function(err, res) {
        if (err) throw err;
        //console.log(res);
        //console.log("\n");

        //array = [];

        Object.keys(res).forEach(function(key) {
          var test = "";
          var row = res[key];
          var test = row.title;
          addArray.push(test);
        });
        //console.log(addArray);
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
              choices: addArray
            }
          ])
          .then(answers => {
            addEmployeeData();
            function addEmployeeData() {
              var position = answers.role;
              var sqlEmployee =
                "INSERT INTO employee(first_name, last_name, role_id) VALUES('" +
                answers.first_name +
                "', '" +
                answers.last_name +
                "', (SELECT id FROM role WHERE title = '" +
                position +
                "'));";

              connection.query(sqlEmployee, function(err, res) {
                if (err) throw err;
                //console.log(res);
                console.table(res);
              });
            }
            //console.log(answers.first_name);
            //console.log(answers.last_name);
            //console.log(answers.role);
          });
      });
    }
    function addPosition() {
      connection.query(roleSql, function(err, res) {
        if (err) throw err;
        //console.log(res);
        //console.log("\n");

        //array = [];

        Object.keys(res).forEach(function(key) {
          var test = "";
          var row = res[key];
          var test = row.name;
          roleArray.push(test);
        });
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
              choices: roleArray
            }
          ])
          .then(answers => {
            addPositionData();
            function addPositionData() {
              var departmentName = answers.department;
              var sqlEmployee =
                "INSERT INTO role(title, salary, department_id) VALUES('" +
                answers.title +
                "', " +
                answers.salary +
                ", (SELECT id FROM department WHERE name = '" +
                departmentName +
                "'));";

              connection.query(sqlEmployee, function(err, res) {
                if (err) throw err;
                //console.log(res);
                console.table(res);
              });
            }
            //console.log(answers.first_name);
            //console.log(answers.last_name);
            //console.log(answers.role);
          });
      });
    }

    function addDepartment() {
      connection.query(roleSql, function(err, res) {
        if (err) throw err;
        //console.log(res);
        //console.log("\n");

        //array = [];

        Object.keys(res).forEach(function(key) {
          var test = "";
          var row = res[key];
          var test = row.name;
          roleArray.push(test);
        });
        inquirer
          .prompt([
            {
              type: "input",
              name: "department",
              message:
                "What is the name of the department you would like to add?"
            }
          ])
          .then(answers => {
            addDepartmentData();
            function addDepartmentData() {
              //var departmentName = answers.department;
              var sqlDep =
                "INSERT INTO department(name) VALUES('" +
                answers.department +
                "');";

              connection.query(sqlDep, function(err, res) {
                if (err) throw err;
                //console.log(res);
                console.table(res);
              });
            }
            //console.log(answers.first_name);
            //console.log(answers.last_name);
            //console.log(answers.role);
          });
      });
    }

    function updatePosition() {
      connection.query(nameSql, function(err, res) {
        if (err) throw err;
        //console.log(res);
        //console.log("\n");

        //array = [];

        Object.keys(res).forEach(function(key) {
          var first = "";
          //var last = "";
          var row = res[key];
          var first = row.first_name;
          //var last = row.last_name;
          nameArray.push(first);
        });

        //console.log(roleArray);

        //connection.query(nameSql, function(err, result) {
        //if (err) throw err;
        /*
          Object.keys(result).forEach(function(key) {
            var test = "";
            var row = result[key];
            var test = row.name;
            roleArray.push(test);
          });
          */

        inquirer
          .prompt([
            {
              type: "list",
              name: "profile",
              message:
                "Select the first name of the employee you would like to update",
              choices: nameArray //Choices array here
            },
            {
              type: "input",
              name: "new",
              message:
                "Enter the role Id for the employees position. Please view the position database from the main menu to get this information."
              //choices: roleArray //positions
            }
          ])
          .then(answers => {
            updateEmployeeData();
            function updateEmployeeData() {
              //var departmentName = answers.department;
              //"SELECT * FROM employee";

              var updateSql =
                "UPDATE employee SET role_id = " +
                answers.new +
                " WHERE first_name = '" +
                answers.profile +
                "'";

              connection.query(updateSql, function(err, res) {
                if (err) throw err;
                //console.log(res);
                console.table(res);
              });
            }
            //console.log(answers.first_name);
            //console.log(answers.last_name);
            //console.log(answers.role);
          });
      });
      //});
    }
  }
}

/*
      [
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
      */

welcome();
