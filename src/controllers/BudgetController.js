const budgetModel = require("../models/BudgetModel")

const addBudget = async (req, res) => {
    try {
        const savedBudget = await budgetModel.create(req.body)
        res.status(201).json({
            message: "Budget added successfully",
            data: savedBudget
        });
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

const getBudget = async (req, res) => {
    try {
        const budgets = await budgetModel.find()
        res.status(200).json({
            message: "All budget",
            data: budgets,
        });
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

 const getAllBudgetByUserId = async (req, res) => {
     try {
         const budget = await budgetModel.find({ userId: req.params.userId })
 
             // .populate("stateId cityId areaId userId");
         if (budget.length === 0) {
             res.status(404).json({ message: "No Budget found" });
         } else {
             res.status(200).json({
                 message: "Budget found successfully",
                 data: budget,
             });
         }
     } catch (err) {
         res.status(500).json({ message: err.message });
     }
 };

module.exports = { addBudget, getBudget  , getAllBudgetByUserId}