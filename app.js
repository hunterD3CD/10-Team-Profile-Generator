// Include node modules (fs:write file; inquirer:question feedback)
const fs = require("fs");
const inquirer = require("inquirer");

// Include class template for "Manager object", "Engineer object" and "Intern object"
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

//===================================================================
// Welcome to a team information HTML generator!
//===================================================================

// This array fills in with employee data.
const teamMembers = [];
// Manager will change-- can't be a const.
let manager;

//=========================================================
// First, we prompt the user for the manager/project info.
//=========================================================

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
      manager = new Manager(
        managerInput.managerName,
        managerInput.managerId,
        managerInput.managerEmail,
        managerInput.officeNumber
      );
      console.log(
        "------------after entering manager info, please fill in employee's info-----------"
      );
      employeeInfo();
    });
}
// ------------------------------- FUNCTION 2: CAPTURE USER INPUT (Inquirer module): Engineer, Intern --------------------------------
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
      if (employeeInput.employeeRole === "Intern") {
        const employee = new Intern(
          employeeInput.employeeName,
          employeeInput.employeeId,
          employeeInput.employeeEmail,
          employeeInput.internSchool
        );
        teamMembers.push(employee);
      } else if (employeeInput.employeeRole === "Engineer") {
        const employee = new Engineer(
          employeeInput.employeeName,
          employeeInput.employeeId,
          employeeInput.employeeEmail,
          employeeInput.github
        );
        teamMembers.push(employee);
      }
      if (employeeInput.addEmployee === true) {
        console.log(
          "------------adding more employee's information-----------"
        );
        employeeInfo();
      } else {
        // ------------------------------- FUNCTION 3: GENERATE HTML: fs module to create html, append html --------------------------------

        var Central = fs.readFileSync("./Html/Central.html", "utf8");

        //update manager html template
        var managerHtml = fs.readFileSync("./Html/Manager.html", "utf8");
        managerHtml = managerHtml.replace("{{name}}", manager.getName());
        managerHtml = managerHtml.replace("{{role}}", manager.getRole());
        managerHtml = managerHtml.replace("{{id}}", manager.getId());
        managerHtml = managerHtml.replace("{{email}}", manager.getEmail());
        managerHtml = managerHtml.replace(
          "{{officeNumber}}",
          manager.getOfficeNumber()
        );

        //=====================================================
        // Append all of the team members after manager
        //=====================================================

        var cards = managerHtml;
        for (var i = 0; i < teamMembers.length; i++) {
          cards += renderEmployee(teamMembers[i]);
        }
        Central = Central.replace("{{cards}}", cards);

        fs.writeFileSync("./output/team.html", Central);

        console.log("---------------the team html is generated--------------");
      }
    });
}

// renderEmployee function that is called above.

function renderEmployee(employee) {
  if (employee.getRole() === "Intern") {
    var internCard = fs.readFileSync("./Html/Intern.html", "utf8");
    internCard = internCard.replace("{{name}}", employee.getName());
    internCard = internCard.replace("{{role}}", employee.getRole());
    internCard = internCard.replace("{{id}}", employee.getId());
    internCard = internCard.replace("{{email}}", employee.getEmail());
    internCard = internCard.replace("{{school}}", employee.getSchool());
    return internCard;
  } else if (employee.getRole() === "Engineer") {
    var engineerCard = fs.readFileSync("./Html/Engineer.html", "utf8");
    engineerCard = engineerCard.replace("{{name}}", employee.getName());
    engineerCard = engineerCard.replace("{{role}}", employee.getRole());
    engineerCard = engineerCard.replace("{{id}}", employee.getId());
    engineerCard = engineerCard.replace("{{email}}", employee.getEmail());
    engineerCard = engineerCard.replace("{{github}}", employee.getGithub());
    return engineerCard;
  }
}

managerInfo();
