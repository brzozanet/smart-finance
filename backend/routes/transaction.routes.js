const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction.controller");
const auth = require("../auth/user.auth");
const { transformAuthInfo } = require("passport");

router.post("/income", auth, transactionController.addIncome);
router.post("/expense", auth, transactionController.addExpense);
router.delete("/:transactionId", auth, transactionController.deleteTransaction);
router.get("/expense", auth, transactionController.getExpenseStats);
router.get("/income", auth, transactionController.getIncomeStats);
module.exports = router;
