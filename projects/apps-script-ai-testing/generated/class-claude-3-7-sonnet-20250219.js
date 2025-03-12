/**
 * A class representing a Person with properties and methods.
 */
class Person {
  /**
   * Constructor for the Person class.
   * @param {string} firstName - The first name of the person.
   * @param {string} lastName - The last name of the person.
   * @param {number} age - The age of the person.
   */
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
  
  /**
   * Gets the full name of the person.
   * @return {string} The full name.
   */
  getFullName() {
    return this.firstName + ' ' + this.lastName;
  }
  
  /**
   * Checks if the person is an adult.
   * @return {boolean} True if the person is 18 or older, false otherwise.
   */
  isAdult() {
    return this.age >= 18;
  }
  
  /**
   * Increments the person's age by one year.
   */
  haveBirthday() {
    this.age++;
    return this.age;
  }
  
  /**
   * Returns a string representation of the person.
   * @return {string} String representation.
   */
  toString() {
    return `Person: ${this.getFullName()}, Age: ${this.age}`;
  }
}

/**
 * Example usage of the Person class.
 */
function testPersonClass() {
  // Create a new Person instance
  const john = new Person('John', 'Doe', 25);
  
  // Use the methods
  Logger.log(john.getFullName()); // "John Doe"
  Logger.log(john.isAdult());     // true
  Logger.log(john.haveBirthday()); // 26
  Logger.log(john.toString());    // "Person: John Doe, Age: 26"
  
  // Create another instance
  const alice = new Person('Alice', 'Smith', 16);
  Logger.log(alice.isAdult());    // false
}