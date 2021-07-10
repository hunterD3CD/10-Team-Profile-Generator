// Establish Classes which are templates for creating objects - Employee
class Employee {
  // -----------------the object constructor: include class properties------------------
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }
  // -----------------the object methods: include class methods ------------------------
  getName() {
    return this.name;
  }
  getId() {
    return this.id;
  }
  getEmail() {
    return this.email;
  }
  getRole() {
    return "Employee";
  }
}

module.exports = Employee;
