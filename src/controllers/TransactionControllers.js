const transactioModel = require('../models/TransactionModel');

const multer = require('multer');
const path = require('path');
const cloudinaryUtil = require('../utils/cloudinaryUtils')


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

const addtransaction = async (req, res) => {
    try {
        const savedtransaction = await transactioModel.create(req.body);
        res.status(201).json({
            message: "transaction added successfully",
            data: savedtransaction
        });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const gettransaction = async (req, res) => {
    try {
        const transaction = await transactioModel.find();
        res.status(200).json({
            message: "All transaction",
            data: transaction,
        });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const 
getAlltransactionByUserId = async (req, res) => {
    try {
        const transactions = await transactioModel
            .find({ userId: req.params.userId })

            // .populate("stateId cityId areaId userId");
        if (transactions.length === 0) {
            res.status(404).json({ message: "No  transactions found", data:[] });
        } else {
            res.status(200).json({
                message: "transactions found successfully",
                data: transactions,
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addTransactionWithFile = async (req, res) => {
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
            const savedreceipt = await transactioModel.create(req.body);
            res.status(200).json({
                message: "receipt  saved successfully",
                data: savedreceipt
            });
        }
    });
};

const updateTransaction = async (req, res) => {
  
    try {
        const updatedTransaction = await transactioModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json({
            message: "Transaction updated successfully",
            data: updatedTransaction,
        });
    } catch (err) {
        res.status(500).json({
            message: "error while update Transaction",
            err: err,
        });
    }
};


// Export the functions
module.exports = {
    addtransaction,
    gettransaction,
    addTransactionWithFile,
    getAlltransactionByUserId,
    updateTransaction
}