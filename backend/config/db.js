require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
})
.then(() => {
  console.log("✅ Conexión exitosa a MongoDB");
})
.catch((err) => {
  console.error("❌ Error conectando a MongoDB:", err.message);
});