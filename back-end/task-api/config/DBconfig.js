const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
    } catch (error) {
        console.error("Error connecting to the database. \n", error);
    }
    };

module.exports = connectDB;