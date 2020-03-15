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
      } else if (response === "View all roles") {
        console.log("Here are the roles");
        //encounter2a();
      } else if (response === "View all departments") {
        console.log("Here are the departments");
      } else if (response === "Return to the Main Menu") {
        welcome();
      }
    });
}

function edit() {
  afterConnection();
  function afterConnection() {
    let sql = "SELECT title FROM role AS title";

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
      console.log(addArray);

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
              "Return to the Main Menu"
            ]
          }
        ])
        .then(answers => {
          var response = answers.edit;
          if (response === "Add employee") {
            //console.log(addArray);
            addEmployee();
            //Welcome();
          } else if (response === "Add position") {
            console.log("Here are the roles");
            //encounter2a();
          } else if (response === "Add department") {
            console.log("Here are the departments");
          } else if (response === "Return to the Main Menu") {
            welcome();
          }
        });

      function addEmployee() {
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
            console.log(answers.first_name);
          });
      }
    });
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

function encounter2a() {
  inquirer.prompt(directionsPrompt).then(answers => {
    var direction = answers.direction;
    if (direction === "Forward") {
      var output = "You find a painted wooden sign that says:";
      output += " \n";
      output += " ____  _____  ____  _____ \n";
      output += "(_  _)(  _  )(  _ \\(  _  ) \n";
      output += "  )(   )(_)(  )(_) ))(_)(  \n";
      output += " (__) (_____)(____/(_____) \n";
      console.log(output);
    } else {
      console.log("You cannot go that way");
      encounter2a();
    }
  });
}

function encounter2b() {
  inquirer
    .prompt({
      type: "list",
      name: "weapon",
      message: "Pick one",
      choices: [
        "Use the stick",
        "Grab a large rock",
        "Try and make a run for it",
        "Attack the wolf unarmed"
      ]
    })
    .then(() => {
      console.log("The wolf mauls you. You die. The end.");
    });
}

welcome();
