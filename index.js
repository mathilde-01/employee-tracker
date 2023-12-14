const inquire = require('inquirer');

const init = async () => {
  db = await mysql.createConnection({
    host: "localhost",
    // My SQL login
    user: "root",
    password: "Philly202330",
    database: "employee_tracker_db",
  });
  console.log("Connected to employee_tracker_db database.");
  console.log(db);
};
init();
