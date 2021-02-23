const router = require("express").Router();
const Transaction = require("../models/transaction.js");

router.post("/transaction", async (req, res) => {
  const { name, amount } = req.query;
  console.log(name, amount);
  try {
    const transaction = await Transaction.create({ name, value: amount });
    return res.json(transaction);
  } catch (error) {
    console.log("err", error);
    return res.status(500).json({
      error: "Server Error",
    });
  }
});

router.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find({}).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    return res.status(500).json({
      error: "Server Error",
    });
  }
});

module.exports = router;
