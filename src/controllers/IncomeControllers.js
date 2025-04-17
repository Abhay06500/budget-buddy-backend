const incomeModel = require("../models/IncomeModel")

const addIncome = async (req, res) => {
    try {
        const savedIncome = await incomeModel.create(req.body)
        res.status(201).json({
            message: "income added successfully",
            data: savedIncome
        });
    } catch (err) {
        res.status(500).json({ message: err })
    }
}

const getIncome = async (req, res) => {
    try {
        const incomes = await incomeModel.find()
        res.status(200).json({
            message: "All income",
            data: incomes,
        });
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

const getAllIncomeByUserId = async (req, res) => {
    try {
        const income = await incomeModel.find({ userId: req.params.userId })

            // .populate("stateId cityId areaId userId");
        if (income.length === 0) {
            res.status(404).json({ message: "No  income found" });
        } else {
            res.status(200).json({
                message: "income found successfully",
                data: income,
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getIncome, addIncome , getAllIncomeByUserId};