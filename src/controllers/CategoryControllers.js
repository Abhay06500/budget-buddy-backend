const categoryModel = require("../models/CategoryModel");

const addCategory = async (req, res) => {
    try {
        const savedCategory = await categoryModel.create(req.body);
        res.status(201).json({
            message: "category added successfully",
            data: savedCategory,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getCategories = async (req, res) => {
    try {
        const Categories = await categoryModel.find().populate("userId");
        res.status(200).json({
            message: "All categories",
            data: Categories,
        });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};



module.exports = { addCategory, getCategories, };
