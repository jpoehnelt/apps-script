class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
  }

  haveBirthday() {
    this.age++;
    return `Happy Birthday! You are now ${this.age} years old.`;
  }
}

function testPersonClass() {
  const person = new Person('Alice', 30);
  Logger.log(person.greet());
  Logger.log(person.haveBirthday());
}