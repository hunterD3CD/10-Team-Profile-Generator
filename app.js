// Include node modules (fs:write file; inquirer:question feedback)
const fs = require("fs");
const inquirer = require("inquirer");

// Include class template for "Manager object", "Engineer object" and "Intern object"
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// ------------------------------- CAPTURE USER INPUT (Inquirer module): Manager, Engineer, Intern --------------------------------
// Variable: question list
function managerInfo() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "what is manager's name?",
      },
      {
        name: "id",
        type: "input",
        message: "what is manager's id?",
      },
      {
        name: "email",
        type: "input",
        message: "please enter the email.",
      },
      {
        name: "officeNumber",
        type: "input",
        message: "please enter the office number.",
      },
    ])
    .then((answer) => {
      console.log(answer);
    });
}
managerInfo();
