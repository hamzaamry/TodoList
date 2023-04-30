const mongoose = require('mongoose')

const db = process.env.MONGO_URL

//connect to database

const connectDB = async () => {
    try {
        await mongoose.connect(db , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log("connected to database !")
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;