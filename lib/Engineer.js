const Employee = require("./Employee");

// Establish Classes which are templates for defining "blueprint - Engineer" s properties and methods
class Engineer extends Employee {
  // -----------------the object constructor: include class properties------------------
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
  }
  // -----------------the object methods: include class methods ------------------------
  getGithub() {
    return this.github;
  }

  getRole() {
    return "Engineer";
  }
}

module.exports = Engineer;
