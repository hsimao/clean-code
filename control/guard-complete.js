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
  processByMethod(transaction);
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

function processByMethod(transaction) {
  if (usesTransactionMethod(transaction, "CREDIT_CARD"))
    processCreditCardTransaction(transaction);
  if (usesTransactionMethod(transaction, "PAYPAL"))
    processPayPalTransaction(transaction);
  if (usesTransactionMethod(transaction, "PLAN"))
    processPlanTransaction(transaction);
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

function processCreditCardTransaction(transaction) {
  if (isPayment(transaction)) return processCreditCardPayment(transaction);
  if (isRefund(transaction)) return processCreditCardRefund(transaction);
}

function processPayPalTransaction(transaction) {
  if (isPayment(transaction)) return processPayPalPayment(transaction);
  if (isRefund(transaction)) return processPayPalRefund(transaction);
}

function processPlanTransaction(transaction) {
  if (isPayment(transaction)) return processPlanPayment(transaction);
  if (isRefund(transaction)) return processPlanRefund(transaction);
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
