var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3333
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Bailey16!",
  database: "employeeTracker_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  runProgram();
});

function runProgram() {
  inquirer
    .prompt({
      name: "start",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees by Department",
        "View All Employees by Role",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Update Employee Role",
        "exit"
      ]
    }).then(function (response) {
      switch (response.start) {
        case "View All Employees":
          viewEmployees();
          break;
        case "View All Employees by Department":
          viewDepartments();
          break;
        case "View All Employees by Role":
          viewRoles();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Update Employee Role":
          updateEmployee();
          break;
        case "exit":
          connection.end();
          break;
      }
    })
}

function viewEmployees (){
  var query = "SELECT * FROM employee";
  connection.query(query, function (err, res){
    if (err) throw err;
    console.log(res);
  })
}

function addDepartment (){
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is the name of the department?"
      }
    ]).then(function (response){
      var query = connection.query(
        "INSERT INTO department SET ?",
        {
          name: response.department
        },
        function (err, res) {
          if (err) throw err;
          console.log("Department Inserted");
        }
      )
    })
}