// Define a class called Person
class Person {
  // Constructor
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
  
  // Getter method for full name
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  
  // Method to check if person is adult
  isAdult() {
    return this.age >= 18;
  }
  
  // Method to update age
  updateAge(newAge) {
    if (newAge > 0) {
      this.age = newAge;
      return true;
    }
    return false;
  }
  
  // Static method to create a Person from an object
  static fromObject(obj) {
    return new Person(obj.firstName, obj.lastName, obj.age);
  }
}

// Example usage
function testPerson() {
  // Create a new person
  const person1 = new Person("John", "Doe", 25);
  
  // Use instance methods
  Logger.log(person1.getFullName()); // Outputs: John Doe
  Logger.log(person1.isAdult()); // Outputs: true
  
  // Update age
  person1.updateAge(26);
  Logger.log(person1.age); // Outputs: 26
  
  // Create person from object using static method
  const personData = {
    firstName: "Jane",
    lastName: "Smith",
    age: 30
  };
  const person2 = Person.fromObject(personData);
  Logger.log(person2.getFullName()); // Outputs: Jane Smith
}