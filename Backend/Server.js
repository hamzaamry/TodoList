    //importing
    require("dotenv").config()
    const express = require('express')
    const cors = require("cors")

    const connectDB = require("./config/db")


    //Initialize our app
    const app = express()

    //routes
    const todo = require("./routes/todo")
    const userRoutes = require('./routes/users');


    // connect database
    connectDB()

    app.use(cors({ origin: true, credentials: true }))

    // cors
    app.use(cors({ origin: true, credentials: true })); 


    // initialize middleware
    app.use(express.json({ extended: false }));
    app.get("/", (req, res) => res.send("Server up and running"));  


    // use routes
    app.use("/api/todo", todo);
    app.use('/api/users', userRoutes);




    // setting up port
    const PORT = process.env.PORT || 8000;

    app.listen(PORT, () => {
        console.log(`server is running on http://localhost:${PORT}`);
    });