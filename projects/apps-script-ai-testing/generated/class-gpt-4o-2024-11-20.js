class MyClass {
  constructor(property1, property2) {
    this.property1 = property1;
    this.property2 = property2;
  }

  // Method to display properties
  displayProperties() {
    Logger.log(`Property 1: ${this.property1}, Property 2: ${this.property2}`);
  }

  // Method to update properties
  updateProperties(newProperty1, newProperty2) {
    this.property1 = newProperty1;
    this.property2 = newProperty2;
  }
}

function testMyClass() {
  // Create an instance of MyClass
  const myInstance = new MyClass('Value1', 'Value2');

  // Display initial properties
  myInstance.displayProperties();

  // Update properties
  myInstance.updateProperties('NewValue1', 'NewValue2');

  // Display updated properties
  myInstance.displayProperties();
}