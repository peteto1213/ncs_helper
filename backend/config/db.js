//Using mongoose to connect to MongoDB
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${connection.connection.host}`.green.underline);
    } catch (error) {
        console.log(error);
        //exit the process with failure(1)
        process.exit(1)
    }
}

module.exports = connectDB