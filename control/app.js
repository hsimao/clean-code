const dummyTransactions = require("./data/dummy-transactions");
const { showErrorMessage } = require("./util/error-handling");
const { validateTransactions } = require("./processing/transactions");
const {
  processWithProcessor,
  validateTransaction
} = require("./processing/transaction");

main();

function main() {
  try {
    const transactions = dummyTransactions;
    processTransactions(transactions);
  } catch (error) {
    showErrorMessage(error.message, error.item);
  }
}

function processTransactions(transactions) {
  validateTransactions(transactions);
  transactions.forEach((transaction) => processTransaction(transaction));
}

function processTransaction(transaction) {
  validateTransaction(transaction);
  processWithProcessor(transaction);
}
