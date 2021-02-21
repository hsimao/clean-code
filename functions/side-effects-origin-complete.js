function initApp() {
  const success = connectDatabase();
  if (!success) {
    showErrorMessage("Could not connect to database!");
  }
}

function showErrorMessage(message) {
  console.error(message);
}

function connectDatabase() {
  return database.connect();
}

function determineSupportAgent(ticket) {
  if (ticket.requestType === "unknown") {
    return findStandardAgent();
  }
  return findAgentByRequestType(ticket.requestType);
}

function createUser(email, password) {
  if (!isValid(email, password)) {
    showErrorMessage("Invalid input!");
  }
}

function isValid(email, password) {
  if (!email.includes("@") || password.length < 7) {
    return false;
  }
  return true;
}
