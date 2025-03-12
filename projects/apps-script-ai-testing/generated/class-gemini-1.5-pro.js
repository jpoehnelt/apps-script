class MyClass {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    Logger.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }

  static createObject(name, age) {
    return new MyClass(name, age);
  }
}

function testMyClass() {
  const myObject = MyClass.createObject("John Doe", 30);
  myObject.greet();

  const anotherObject = new MyClass("Jane Doe", 25);
  anotherObject.greet(); 
}