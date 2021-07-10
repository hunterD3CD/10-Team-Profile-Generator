// Include node modules (fs:write file; inquirer:question feedback)
const fs = require("fs");
const inquirer = require("inquirer");

// Include class template for "Manager object", "Engineer object" and "Intern object"
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// ------------------------------- CAPTURE USER INPUT (Inquirer module): Manager, Engineer, Intern --------------------------------
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
      console.log(manager);
    });
}
managerInfo();
