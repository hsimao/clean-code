function showErrorMessage(message, extraMessage) {
  console.log(message);
  if (extraMessage) {
    console.log(extraMessage);
  }
}

exports.showErrorMessage = showErrorMessage;
