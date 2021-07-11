// Include node modules (fs:write file; inquirer:question feedback)
const fs = require("fs");
const inquirer = require("inquirer");

// Include class template for "Manager object", "Engineer object" and "Intern object"
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");

var intern;
var manager;
var engineer;

// ------------------------------- CAPTURE USER INPUT (Inquirer module): Manager  --------------------------------
function managerInfo() {
  inquirer
    .prompt([
      {
        name: "managerName",
        type: "input",
        message: "what is manager's name?",
      },
      {
        name: "managerId",
        type: "input",
        message: "what is manager's id?",
      },
      {
        name: "managerEmail",
        type: "input",
        message: "please enter the email.",
      },
      {
        name: "officeNumber",
        type: "input",
        message: "please enter the office number.",
      },
    ])
    .then((managerInput) => {
      // create a new object from class "blueprint - Manager", replace parameters with user input: name, id, email, officeNumber
      let manager = new Manager(
        managerInput.managerName,
        managerInput.managerId,
        managerInput.managerEmail,
        managerInput.officeNumber
      );
      console.log(
        "after entering manager info, please fill in employee's info"
      );
      console.log(manager);

      employeeInfo();
    });
}
managerInfo();

// ------------------------------- CAPTURE USER INPUT (Inquirer module): Engineer, Intern --------------------------------
function employeeInfo() {
  inquirer
    .prompt([
      {
        name: "employeeRole",
        type: "list",
        message: "What is the role of your employee?",
        choices: ["Engineer", "Intern"],
      },
      {
        name: "employeeName",
        type: "input",
        message: "What is employee's name?",
      },
      {
        name: "employeeId",
        type: "input",
        message: "What is the employee ID?",
      },
      {
        name: "employeeEmail",
        type: "input",
        message: "What is the employee's email?",
      },
      {
        name: "engineerGithub",
        type: "input",
        message: "What is the Github?",
        when: (userInput) => userInput.employeeRole === "Engineer",
      },
      {
        name: "internSchool",
        type: "input",
        message: "What is the school?",
        when: (userInput) => userInput.employeeRole === "Intern",
      },
      {
        name: "addEmployee",
        type: "confirm",
        message: "would you add new employee?",
      },
    ])
    .then((employeeInput) => {
      if (employeeInput.employeeRole === "Engineer") {
        let engineer = new Engineer(
          employeeInput.employeeName,
          employeeInput.employeeId,
          employeeInput.employeeEmail,
          employeeInput.engineerGithub
        );
        console.log(engineer);
      } else if (employeeInput.employeeRole === "Intern") {
        let intern = new Intern(
          employeeInput.employeeName,
          employeeInput.employeeId,
          employeeInput.employeeEmail,
          employeeInput.internSchool
        );
        console.log(intern);
      }
      if (employeeInput.addEmployee === true) {
        employeeInfo();
      } else {

      }
    });
}
