const usermodel = require("../models/UserModels")
const bcrypt = require("bcrypt");
const mailUtil = require("../utils/MailUtil");
const UserModels = require("../models/UserModels");
const jwt = require("jsonwebtoken")
const secret = "AB"

const loginUser = async (req, res) => {

    //req.body email and password: password
    //password -->plain -->db -->encrypted
    //bcrypt  --> plain,enc --> match : true

    const email = req.body.email;
    const password = req.body.password;

    //select * from users where email =? and password = ?
    //userModel.find({email:email,password:password})
    //email --> object -->abc --{passwird:hashedPasseord}
    //normal passwoed compare -->
    //const foundUserFromEmail = userModel.findOne({email:req.body.email})

    const foundUserFromEmail = await usermodel.findOne({ email: email }).populate("roleId")
    console.log(foundUserFromEmail);

    //check if email is exist or not//

    if (foundUserFromEmail != null) {
        //password
        //normal -plain req.bodyy --- databse -->match  --> true | false
        //const isMatch = bcrypt.compareSync(req.body.password,foundUserFromEmail.password)

        const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);

        //true | false

        if (isMatch == true) {
            res.status(200).json({
                message: "login success",
                data: foundUserFromEmail,
            });
        } else {
            res.status(404).json({
                message: "invalid cred..",
            });
        }
    } else {
        res.status(404).json({
            message: "Email not found..",
        });
    }
};

const signUp = async (req, res) => {
    try {
        //for password encrupt
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt)
        req.body.password = hashedPassword;
        const createdUser = await usermodel.create(req.body)

        await mailUtil.sendingMail(createdUser.email, "welcome to budget buddy", "this is welcome mail ")

        res.status(201).json({
            message: "user createddddd",
            data: createdUser
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "errorrr",
            data: err
        })
    }
}

const addUser = async (req, res) => {

    const getUserr = await usermodel.create(req.body);

    res.json({
        message: "user fetched successfully",
        data: getUserr,
    })
}

const getUsers = async (req, res) => {
    const getUser = await usermodel.find().populate("roleId")

    res.json({
        message: "user fetched successfully.....",
        data: getUser,
    })
}

const deleteUser = async (req, res) => {
    const userDeleted = await usermodel.findByIdAndDelete(req.params.id)

    res.json({
        message: "user deleted successfully..",
        data: userDeleted
    })
}

const getUserById = async (req, res) => {
    const getUserId = await usermodel.findById(req.params.id)

    res.json({
        message: "get user successfully..",
        data: getUserId
    })
}

const forgotPassword = async (req, res) => {

    const email = req.body.email;
    const foundUser = await UserModels.findOne({ email: email })

    if (foundUser) {

        const token = jwt.sign(foundUser.toObject(), secret)
        console.log(token);
        const url = `http://localhost:5173/resetpassword/${token}`;
        const mailContent = `<html>
                                <a href ="${url}">reset password</a>
                             </html>`;

        await mailUtil.sendingMail(foundUser.email, "reset password", mailContent)
        res.json({
            message: "reset password link sent to mail.",
        });

    } else {
        res.json({
            message: "user not found register first..",
        })
    }


}

const resetpassword = async (req, res) => {
    const token = req.body.token; //decode --> email | id
    const newPassword = req.body.password;

    const userFromToken = jwt.verify(token, secret);
    //object -->email,id..
    //password encrypt...
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    const updatedUser = await UserModels.findByIdAndUpdate(userFromToken._id, {
        password: hashedPassword,
    });
    res.json({
        message: "password updated successfully..",
    });
};

module.exports = {
    addUser, getUsers, deleteUser, getUserById, signUp, loginUser, forgotPassword , resetpassword
}