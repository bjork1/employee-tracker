var mysql = require("mysql");

var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "tracker_data"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {
  let sql = "SELECT * FROM employee";
  //WHERE (title = 'Marketing Intern' OR salary > 50000) ORDER BY salary ASC";
  connection.query(sql, function(err, res) {
    if (err) throw err;
    console.log(res);
    console.table(res);
  });
}

inquirer
  .prompt([
    {
      type: "input",
      name: "test",
      message: "Hey there"
    }
  ])

  .then(answers => {});
