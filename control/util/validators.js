const { TYPE, STATUS } = require("../constant");

function isEmpty(transactions) {
  return !transactions || transactions.length === 0;
}

function isOpen(transaction) {
  return transaction.status === STATUS.OPEN;
}

function isPayment(transaction) {
  return transaction.type === TYPE.PAYMENT;
}

function isRefund(transaction) {
  return transaction.type === TYPE.REFUND;
}

exports.isEmpty = isEmpty;
exports.isOpen = isOpen;
exports.isPayment = isPayment;
exports.isRefund = isRefund;
