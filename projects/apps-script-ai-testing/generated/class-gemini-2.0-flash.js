/**
 * A class representing a Person.
 */
class Person {
  /**
   * Constructor for the Person class.
   * @param {string} firstName The first name of the person.
   * @param {string} lastName The last name of the person.
   * @param {number} age The age of the person.
   */
  constructor(firstName, lastName, age) {
    /**
     * @private @type {string} The first name of the person.
     */
    this.firstName_ = firstName;
    /**
     * @private @type {string} The last name of the person.
     */
    this.lastName_ = lastName;
    /**
     * @private @type {number} The age of the person.
     */
    this.age_ = age;
  }

  /**
   * Gets the first name of the person.
   * @return {string} The first name.
   */
  getFirstName() {
    return this.firstName_;
  }

  /**
   * Sets the first name of the person.
   * @param {string} firstName The new first name.
   */
  setFirstName(firstName) {
    this.firstName_ = firstName;
  }

  /**
   * Gets the last name of the person.
   * @return {string} The last name.
   */
  getLastName() {
    return this.lastName_;
  }

  /**
   * Sets the last name of the person.
   * @param {string} lastName The new last name.
   */
  setLastName(lastName) {
    this.lastName_ = lastName;
  }

  /**
   * Gets the age of the person.
   * @return {number} The age.
   */
  getAge() {
    return this.age_;
  }

  /**
   * Sets the age of the person.
   * @param {number} age The new age.
   */
  setAge(age) {
    this.age_ = age;
  }

  /**
   * Returns the full name of the person.
   * @return {string} The full name.
   */
  getFullName() {
    return this.firstName_ + ' ' + this.lastName_;
  }

  /**
   * Returns a string representation of the person.
   * @return {string} The string representation.
   */
  toString() {
    return 'Person: {firstName: ' + this.firstName_ + ', lastName: ' + this.lastName_ + ', age: ' + this.age_ + '}';
  }
}

/**
 * Example usage of the Person class.
 */
function testPerson() {
  // Create a new Person object.
  var person = new Person('John', 'Doe', 30);

  // Log the person's full name.
  Logger.log(person.getFullName()); // Output: John Doe

  // Log the person's age.
  Logger.log(person.getAge()); // Output: 30

  // Change the person's age.
  person.setAge(31);

  // Log the updated age.
  Logger.log(person.getAge()); // Output: 31

  // Log the string representation of the person.
  Logger.log(person.toString());
}
