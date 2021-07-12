// Include node modules (fs:write file; inquirer:question feedback)
const fs = require("fs");
const inquirer = require("inquirer");

// Include class template for "Manager object", "Engineer object" and "Intern object"
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// establish variables
const teamNumber = [];
let manager;

// ------------------------------- FUNCTION 1: CAPTURE USER INPUT (Inquirer module): Manager  --------------------------------
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
        teamNumber.push(employee);
      } else if (employeeInput.employeeRole === "Engineer") {
        const employee = new Engineer(
          employeeInput.employeeName,
          employeeInput.employeeId,
          employeeInput.employeeEmail,
          employeeInput.github
        );
        teamNumber.push(employee);
      }
      if (employeeInput.addEmployee === true) {
        console.log(
          "------------adding more employee's information-----------"
        );
        employeeInfo();
      } else {
        // ------------------------------- FUNCTION 3: GENERATE HTML: fs module to create html, append html --------------------------------

        var Central = fs.readFileSync("./Html/Central.html", "utf8");

        /////////////////////////////////////////////////////update manager html template
        // /////////////////////////////////////////////////////////////////////////////
        var managerHtml = fs.readFileSync("./Html/Manager.html", "utf8");
        managerHtml = managerHtml.replace("#name", manager.getName());
        managerHtml = managerHtml.replace("#role", manager.getRole());
        managerHtml = managerHtml.replace("#id", manager.getId());
        managerHtml = managerHtml.replace("#email", manager.getEmail());
        managerHtml = managerHtml.replace(
          "#officeNumber",
          manager.getOfficeNumber()
        );

        ///////////////////////////////////////////////////update employee html template
        // /////////////////////////////////////////////////////////////////////////////
        function employeeHtml(employee) {
          if (employee.getRole() === "Intern") {
            var internHtml = fs.readFileSync("./Html/Intern.html", "utf8");
            internHtml = internHtml.replace("#name", employee.getName());
            internHtml = internHtml.replace("#role", employee.getRole());
            internHtml = internHtml.replace("#id", employee.getId());
            internHtml = internHtml.replace("#email", employee.getEmail());
            internHtml = internHtml.replace("#school}", employee.getSchool());
            return internHtml;
          } else if (employee.getRole() === "Engineer") {
            var engineerHtml = fs.readFileSync("./Html/Engineer.html", "utf8");
            engineerHtml = engineerHtml.replace("#name", employee.getName());
            engineerHtml = engineerHtml.replace("#role", employee.getRole());
            engineerHtml = engineerHtml.replace("#id", employee.getId());
            engineerHtml = engineerHtml.replace("#email", employee.getEmail());
            engineerHtml = engineerHtml.replace(
              "#github",
              employee.getGithub()
            );
            return engineerHtml;
          }
        }

        ///////////////////////update the central html with manager html & employee html
        // /////////////////////////////////////////////////////////////////////////////

        var html = managerHtml;
        for (var i = 0; i < teamNumber.length; i++) {
          html += employeeHtml(teamNumber[i]);
        }
        Central = Central.replace("#html", html);

        fs.writeFile("./output/team.html", Central, function (err) {
          if (err) throw error;
          console.log("the team html is generated");
        });

        console.log(
          "---------------the team profile is generated--------------"
        );
      }
    });
}

// -------------------------------RUN THE FUNCTIONS---------------------------------
managerInfo();
