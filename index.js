// dependencies
const inquirer = require("inquirer");
const mysql = require("mysql2");

// connection
const init = async () => {
  db = await mysql.createConnection({
    host: "localhost",
    // My SQL login
    user: "root",
    password: "Philly202330",
    database: "employee_tracker_db",
  });
  console.log("Connected to employee_tracker_db database.");
};
init();

// inquirer function for command line questions
function menu() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View Department",
          "View Role",
          "View Employee",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
          "Exit",
        ],
        name: "menuOption",
      },
    ])

    .then((answers) => {
      // View department
      if (answers.menuOption === "View Department") {
        db.query(`SELECT * FROM department`, (err, result) => {
          if (err) throw err;
          console.table(result);
          menu();
        });
        // View Role
      } else if (answers.menuOption === "View Role") {
        db.query(`SELECT * FROM role`, (err, result) => {
          if (err) throw err;
          console.table(result);
          menu();
        });
        // View Employee
      } else if (answers.menuOption === "View Employee") {
        db.query(`SELECT * FROM employee`, (err, result) => {
          if (err) throw err;
          console.table(result);
          menu();
        });
        // Add Employee
      } else if (answers.menuOption === "Add Employee") {
        addEmployee().then((data) => {
          db.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,
            [
              data.employeeFirstName,
              data.employeeLastName,
              data.employeeRole,
              data.employeeManager,
            ],
            (err, result) => {
              if (err) throw err;
              console.log("Added Employee");
              menu();
            }
          );
        });
        // Add role
      } else if (answers.menuOption === "Add Role") {
        addRole().then((data) => {
          db.query(
            `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`,
            [data.roleName, data.roleSalary, data.roleDepartment],
            (err, result) => {
              if (err) throw err;
              console.log("Added role");
              menu();
            }
          );
        });
        // Add department
      } else if (answers.menuOption === "Add Department") {
        addDepartment().then((data) => {
          db.query(
            `INSERT INTO department(name) VALUES (?)`,
            [data.departmentName],
            (err, result) => {
              if (err) throw err;
              console.log("Added Department");
              menu();
            }
          );
        });
        // Update employee
      } else if (answers.menuOption === "Update Employee Role") {
        updateEmployee().then((data) => {
          console.log(data);
          //   let first_name = data.employeeUpdate(" ")[0];
          let employeeName = data.employeeUpdate;
          // Fetch employee info
          db.query(
            "SELECT * FROM employee WHERE CONCAT(first_name, ' ', last_name) = ?",
            [employeeName],
            (err, result) => {
              if (err) throw err;
              const employee = result[0];
              // Prompt user for new role information
              inquirer
                .prompt([
                  {
                    type: "input",
                    message: `Enter the new role for ${employeeName}:`,
                    name: "newRole",
                  },
                ])
                .then((updateData) => {
                  // Update employee role
                  db.query(
                    "UPDATE employee SET role_id=? WHERE id=?",
                    [updateData.newRole, employee.id],
                    (err, result) => {
                      if (err) throw err;
                      console.log("Updated Employee Role");
                      menu();
                    }
                  );
                });
            }
          );
        });
      } else if (answers.menuOption === "Exit") {
        console.log("Good-bye!");
        process.exit();
      } else {
        console.log("Error has occured", answers);
      }
    });
}

// Add employee function
function addEmployee() {
  return inquirer.prompt([
    {
      type: "input",
      message: "What is the employee's first name?",
      name: "employeeFirstName",
    },
    {
      type: "input",
      message: "What is the employee's last name?",
      name: "employeeLastName",
    },
    {
      type: "input",
      message: "What is the employee's role ID?",
      name: "employeeRole",
    },
    {
      type: "input",
      message: "Who is the employee's manager?",
      name: "employeeManager",
    },
  ]);
}

// Add Role
function addRole() {
  return inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the role?",
      name: "roleName",
    },
    {
      type: "input",
      message: "What is the salary of the role?",
      name: "roleSalary",
    },
    {
      type: "input",
      message: "Which department does the role belong to?",
      name: "roleDepartment",
    },
  ]);
}

// Add department
function addDepartment() {
  return inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the department?",
      name: "departmentName",
    },
  ]);
}

// update employee info
function updateEmployee() {
  return inquirer.prompt([
    {
      type: "list",
      message: "Which employee's role do you want to update?",
      choices: ["John Smith", "Bob Smith", "Julia Jones"],
      name: "employeeUpdate",
    },
  ]);
}

menu();
