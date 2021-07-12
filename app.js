// Include node modules (fs:write file; inquirer:question feedback)
const fs = require("fs");
const inquirer = require("inquirer");

// Include class template for "Manager object", "Engineer object" and "Intern object"
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");

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
        generateTeam();
        // appendHtml();
      }
    });
}

// ------------------------------- FUNCTION 3: GENERATE HTML: fs module to create html, append html --------------------------------
const generateTeam = (team) => {
  const generateEnginner = (engineer) => {
    const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      <title>Team Profile Generator</title>
  </head>
  <body>
      <nav class="navbar navbar-light bg-light">
          <span class="navbar-brand mb-0 h1">My Team</span>
      </nav>
      <div class="container">
          <div class="row">
          <h5 class="card-header">${data.getName()}<br /><br />Engineer</h5>
          </div>
          </div>
          </body>
          </html>`;
    fs.writeFile("./output/team.html", html, function (err) {
      if (err) throw error;
      console.log("the team html is generated");
    });
  };

  const data = [];
  data.push(
    team
      .filter((employee) => employee.getRole() === "Engineer")
      .map((engineer) => generateEnginner(engineer).join(""))
  );

  return html.join("");
};

// function appendHtml() {
//   let data = "";
//   if (Engineer.getRole() === "Engineer") {
//     data = `<div class="col-6">
//             <div class="card mx-auto mb-3" style="width: 18rem">
//             <h5 class="card-header">${Employee.getName()}<br /><br />Engineer</h5>
//             <ul class="list-group list-group-flush">
//                 <li class="list-group-item">ID: ${Employee.getId()}</li>
//                 <li class="list-group-item">Email Address: ${Employee.getEmail()}</li>
//                 <li class="list-group-item">GitHub: ${Engineer.getGithub()}</li>
//             </ul>
//             </div>
//         </div>`;
//   }
//   fs.appendFile("./output/team.html", data, function (err) {
//     if (err) throw error;
//     console.log("adding new employee");
//   });
// }

module.exports = (team) => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>My Team</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/c502137733.js"></script>
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 jumbotron mb-3 team-heading">
                <h1 class="text-center">My Team</h1>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="team-area col-12 d-flex justify-content-center">
                ${generateTeam(team)}
                ${generateEnginner(engineer)}
            </div>
        </div>
    </div>
</body>
</html>
    `;
};
