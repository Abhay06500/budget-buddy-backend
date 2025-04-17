const expenseModel = require("../models/ExpenseModel")
 const multer = require('multer');
 const path = require('path');
 const cloudinaryUtil = require('../utils/cloudinaryUtils');

 const storage = multer.diskStorage({
     destination: "./uploads",
     filename: function (req, file, cb) {
         cb(null, file.originalname);
     },
 });


const upload = multer({
    storage: storage,
    //fileFilter:
}).single("image");


const addExpense = async (req, res) => {
    try {
        const savedExpense = await expenseModel.create(req.body)
        res.status(201).json({
            message: "expense added successfully",
            data: savedExpense
        });
    } catch (err) {
        res.status(500).json({ message: err })
    }
}

const getExpense = async (req, res) => {
    try {
        const expenses = await expenseModel.find()
        res.status(200).json({
            message: "All expense",
            data: expenses,
        });
    } catch (err) {
        res.status(500).json({ message: err });
    }
}


 const addHordingWithFile = async (req, res) => {
     upload(req, res, async (err) => {
         if (err) {
             console.log(err);
             res.status(500).json({
                 message: err.message,
             });
         } else {
             const cloundinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
             console.log(cloundinaryResponse);
             console.log(req.body);
             //store data in database
             req.body.imageURL = cloundinaryResponse.secure_url
             const savedreceipt  = await expenseModel.create(req.body);
             res.status(200).json({
                 message: "receipt  saved successfully",
                 data: savedreceipt
             });
         }
     });
 };
 

 const getAllExpenseByUserId = async (req, res) => {
     try {
         const expense = await expenseModel.find({ userId: req.params.userId })
 
             // .populate("stateId cityId areaId userId");
         if (expense.length === 0) {
             res.status(404).json({ message: "No  expense found" });
         } else {
             res.status(200).json({
                 message: "expense found successfully",
                 data: expense,
             });
         }
     } catch (err) {
         res.status(500).json({ message: err.message });
     }
 };




module.exports = { getExpense, addExpense , addHordingWithFile, getAllExpenseByUserId}