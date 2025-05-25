require('dotenv').config();
const mongoose = require("mongoose");

// Conexión mongodb
mongoose.connect(process.env.MONGODB_URI).then (() => {
    console.log("DB Connected");
})
.catch((err) => console.log(err));