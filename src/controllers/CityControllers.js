const cityModel = require("../models/CityModel");

const addCity = async (req, res) => {

    try {
        const savedCity = await cityModel.create(req.body);
        res.status(201).json({
            message: "City added successfully",
            data: savedCity
        });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getAllCities = async (req, res) => {

    try {
        const cities = await cityModel.find()
        res.status(200).json({
            message: "All cities",
            data: cities
        });
    } catch (err) {
        res.status(500).json({ message: err })
    }
}
module.exports = { addCity, getAllCities }