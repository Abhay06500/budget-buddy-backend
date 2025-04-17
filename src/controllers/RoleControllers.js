const RoleModels = require("../models/RoleModels")
// const roleModels = require("../models/RoleModels")
//roleModel == roles

const getAllRoles = async (req, res) => {

    //await.... 
    //select * from roleModel

    const roles = await RoleModels.find()

    res.json({
        message: "role fetched successfully",
        data: roles
    })
}

const addRole = async (req, res) => {
    //req.body,req.params,req.headers,req.query
    console.log(req.body);
    //insert into roles () values()
    //database...
    const savedRole = await RoleModels.create(req.body)
    res.json({
        message: "role created...",
        data: savedRole
    });
};


const deleteRole = async (req, res) => {

    //delete from roles where id =?
    //req.params
    console.log(req.params.id) //prams object...

    const deletedRole = await RoleModels.findByIdAndDelete(req.params.id)

    res.json({
        message: "role deleted successfully..",
        data: deletedRole
    })
}

const getRoleById = async (req, res) => {
    //req.params.id

    const foundRole = await RoleModels.findById(req.params.id)
    res.json({
        message: "role fatched..",
        data: foundRole
    })
}

module.exports = {
    getAllRoles, addRole, deleteRole,getRoleById
}