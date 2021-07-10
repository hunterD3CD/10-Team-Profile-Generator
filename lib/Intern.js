const Employee = require("./Employee");

// Establish Classes which are templates for defining "blueprint - Intern" s properties and methods
class Intern extends Employee {
  // -----------------the object constructor: include class properties------------------
  constructor(name, id, emial, school) {
    super(name, id, emial);
    this.school = school;
  }
  // -----------------the object methods: include class methods ------------------------
  getSchool() {
    return this.school;
  }
  getRole() {
    return "Intern";
  }
}

module.exports = Intern;
