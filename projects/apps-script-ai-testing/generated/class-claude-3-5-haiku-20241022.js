/**
 * A sample class representing a Person with properties and methods
 */
class Person {
  /**
   * Constructor to initialize a Person object
   * @param {string} name - The name of the person
   * @param {number} age - The age of the person
   */
  constructor(name, age) {
    // Private properties (using underscore convention)
    this._name = name;
    this._age = age;
  }
  
  /**
   * Getter for name
   * @return {string} The person's name
   */
  getName() {
    return this._name;
  }
  
  /**
   * Getter for age
   * @return {number} The person's age
   */
  getAge() {
    return this._age;
  }
  
  /**
   * Setter for age
   * @param {number} newAge - The new age to set
   */
  setAge(newAge) {
    if (newAge > 0) {
      this._age = newAge;
    }
  }
  
  /**
   * Method to introduce the person
   * @return {string} An introduction string
   */
  introduce() {
    return `Hi, my name is ${this._name} and I am ${this._age} years old.`;
  }
  
  /**
   * Static method to create a person
   * @param {string} name - The name of the person
   * @param {number} age - The age of the person
   * @return {Person} A new Person instance
   */
  static create(name, age) {
    return new Person(name, age);
  }
}

/**
 * Function to demonstrate the Person class usage
 */
function demonstratePerson() {
  // Create a person using the constructor
  const john = new Person('John Doe', 30);
  
  // Create a person using the static method
  const jane = Person.create('Jane Smith', 25);
  
  // Log introductions
  console.log(john.introduce());
  console.log(jane.introduce());
  
  // Modify age
  john.setAge(31);
  console.log(`John's new age: ${john.getAge()}`);
}