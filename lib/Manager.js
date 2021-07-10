// include the customized module
const Employee = require("./Employee");

// Establish Classes which are templates for creating objects - Manager
class Manager extends Employee {
  // -----------------the object constructor: include class properties------------------
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }
  // -----------------the object methods: include class methods ------------------------
  getOfficeNumber() {
    return this.officeNumber;
  }
  getRole() {
    return "Manager";
  }
}

module.exports = Manager;
