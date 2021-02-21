function createUser(email, password) {
  if (!email || !email.include("@") || !password || password.trim() === "") {
    console.log("Invalid input!");
    return;
  }

  const user = {
    email,
    password
  };

  database.insert(user);
}
