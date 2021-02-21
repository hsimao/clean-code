// bad
//需要全部看過才能理解這段邏輯，不好閱讀
// if (!email.includes("@")) {
//   console.log("Invalid email!");
// } else {
//   const user = new User(email);
//   user.save();
// }

// // good
// // 直接跳著看不同的步驟也很容易理解, 好閱讀
// if (!isEmail(email)) {
//   showError("Invalid email!");
// } else {
//   saveNewUser(email);
// }

function handleCreateUserRequest(user) {
  try {
    createUser(user);
  } catch (error) {
    showErrorMessage(error.message);
  }
}

function createUser(user) {
  validateUserInput(user);
  saveUser(user);
}

// 如果驗證未通過, 會中斷父層 function 接下來的邏輯, 可使用 try catch 接住
function validateUserInput({ email, password }) {
  if (!isEmail(email) || isEmpty(password)) {
    throw new Error("Invalid input!");
  }
}

function isEmpty(value) {
  return !value.trim();
}

function isEmail(email) {
  return !isEmpty(email) && email.includes("@");
}

function showErrorMessage(message) {
  console.error(message);
}

function saveUser(user) {
  // database.insert(user);
  console.log("save user", user);
}

handleCreateUserRequest({ email: "email@gmail.com", password: "12345" });
