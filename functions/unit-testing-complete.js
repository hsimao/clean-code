class Product {
  constructor(name, price) {
    this.id = this.generateRandomId(name);
    this.name = name;
    this.price = price;
  }

  save() {
    // database.insert("products", this);
    console.log("save product", this);
    return this;
  }

  generateRandomId(baseValue) {
    return `${baseValue}_${Math.random().toString()}`;
  }
}

function addProduct(name, price) {
  validateProductData(name, price);
  const product = new Product(name, price);
  return product.save();
}

function validateProductData(name, price) {
  if (!productInputIsValid(name, price)) {
    throw new Error("Invalid input - product was not created.");
  }
}

function productInputIsValid(name, price) {
  return !isEmpty(name) && priceIsValid(price);
}

function priceIsValid(price) {
  return isMinValue(price, 0);
}

function isEmpty(value) {
  return !value || !value.trim();
}

function isMinValue(value, min) {
  return value > min;
}

addProduct("hello", 1);

describe("Test isEmpty function", () => {
  it("return true if an empty name is passed as a value", () => {
    const validationResult = isEmpty("");
    expect(validationResult).toEqual(true);
  });

  it("return false if a non-empty name is passed as a value", () => {
    const validationResult = isEmpty("Test");
    expect(validationResult).toEqual(false);
  });
});

describe("Test isMinValue function", () => {
  it("return true if a value above the minValue is provided", () => {
    const validationResult = isMinValue(10, 8);
    expect(validationResult).toEqual(true);
  });

  it("return false if a value below the minValue is provided", () => {
    const validationResult = isMinValue(5, 8);
    expect(validationResult).toEqual(false);
  });
});
