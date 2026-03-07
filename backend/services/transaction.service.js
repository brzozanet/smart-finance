const Transaction = require("../models/transaction.model");

const createTransaction = async (transactionData) => {
  const newTransaction = new Transaction(transactionData);
  return newTransaction.save();
};

const getAllTransactions = async () => {
  return Transaction.find();
};

const deleteTransaction = async (transactionId) => {
  return Transaction.findByIdAndDelete(transactionId);
};

const getTransactionById = async (transactionId) => {
  return Transaction.findById(transactionId);
};

const getExpensesByUserAndYear = async (userId, year) => {
  return Transaction.find({
    owner: userId,
    income: false,
    "date.year": year.toString(),
  });
};

const getIncomesByUserAndYear = async (userId, year) => {
  return Transaction.find({
    owner: userId,
    income: true,
    "date.year": year.toString(),
  });
};

module.exports = {
  createTransaction,
  getAllTransactions,
  deleteTransaction,
  getTransactionById,
  getExpensesByUserAndYear,
  getIncomesByUserAndYear,
};
