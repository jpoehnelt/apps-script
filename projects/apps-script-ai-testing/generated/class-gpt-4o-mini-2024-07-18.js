class MyClass {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
  }

  haveBirthday() {
    this.age += 1;
  }
}

// Example usage:
function testMyClass() {
  const person = new MyClass('Alice', 30);
  Logger.log(person.greet()); // Hello, my name is Alice and I am 30 years old.
  person.haveBirthday();
  Logger.log(person.greet()); // Hello, my name is Alice and I am 31 years old.
}