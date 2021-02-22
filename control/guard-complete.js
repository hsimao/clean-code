main();

function main() {
  const transactions = [
    {
      id: "t1",
      type: "PAYMENT",
      status: "OPEN",
      method: "CREDIT_CARD",
      amount: "23.99"
    },
    {
      id: "t2",
      type: "PAYMENT",
      status: "OPEN",
      method: "PAYPAL",
      amount: "100.43"
    },
    {
      id: "t3",
      type: "REFUND",
      status: "OPEN",
      method: "CREDIT_CARD",
      amount: "10.99"
    },
    {
      id: "t4",
      type: "PAYMENT",
      status: "CLOSED",
      method: "PLAN",
      amount: "15.99"
    }
  ];
  try {
    processTransactions(transactions);
  } catch (error) {
    showErrorMessage(error.message, error.item);
  }
}

function processTransactions(transactions) {
  validateTransactions(transactions);
  transactions.forEach((transaction) => processTransaction(transaction));
}

function validateTransactions(transactions) {
  if (isEmpty(transactions)) {
    const error = new Error("No transactions provided!");
    error.code = 1;
    throw error;
  }
}

function processTransaction(transaction) {
  validateTransaction(transaction);
  processWithProcessor(transaction);
}

function validateTransaction(transaction) {
  if (!isOpen(transaction)) {
    throw new Error("Invalid transaction type.");
  }

  if (!isPayment(transaction) && !isRefund(transaction)) {
    const error = new Error("Invalid transaction type!");
    error.item = transaction;
    throw error;
  }
}

function processWithProcessor(transaction) {
  const processors = getTransactionProcessor(transaction);
  if (isPayment(transaction)) {
    processors.processPayment(transaction);
  } else {
    processors.processRefund(transaction);
  }
}

function getTransactionProcessor(transaction) {
  let processors = {
    processPayment: null,
    processRefund: null
  };

  if (usesTransactionMethod(transaction, "CREDIT_CARD")) {
    processors.processPayment = processCreditCardPayment;
    processors.processRefund = processCreditCardRefund;
  }

  if (usesTransactionMethod(transaction, "PAYPAL")) {
    processors.processPayment = processPayPalPayment;
    processors.processRefund = processPayPalRefund;
  }

  if (usesTransactionMethod(transaction, "PLAN")) {
    processors.processPayment = processPlanPayment;
    processors.processRefund = processPlanRefund;
  }

  return processors;
}

function usesTransactionMethod(transaction, method) {
  return transaction.method === method;
}

function isOpen(transaction) {
  return transaction.status === "OPEN";
}

function isPayment(transaction) {
  return transaction.type === "PAYMENT";
}

function isRefund(transaction) {
  return transaction.type === "REFUND";
}

function isEmpty(transactions) {
  return !transactions || transactions.length === 0;
}

function showErrorMessage(message, extraMessage) {
  console.log(message);
  if (extraMessage) {
    console.log(extraMessage);
  }
}

function processCreditCardPayment(transaction) {
  console.log(
    "Processing credit card payment for amount: " + transaction.amount
  );
}

function processCreditCardRefund(transaction) {
  console.log(
    "Processing credit card refund for amount: " + transaction.amount
  );
}

function processPayPalPayment(transaction) {
  console.log("Processing PayPal payment for amount: " + transaction.amount);
}

function processPayPalRefund(transaction) {
  console.log("Processing PayPal refund for amount: " + transaction.amount);
}

function processPlanPayment(transaction) {
  console.log("Processing plan payment for amount: " + transaction.amount);
}

function processPlanRefund(transaction) {
  console.log("Processing plan refund for amount: " + transaction.amount);
}
