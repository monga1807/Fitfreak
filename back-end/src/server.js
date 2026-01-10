require ("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const habitRoutes = require("./routes/habits");
const journalRoutes = require("./routes/journal");
const fitnessRoutes = require("./routes/fitness");



const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/journal", journalRoutes);
app.use("/api/fitness", fitnessRoutes);

app.get('/', (req , res ) => {
    // res.send("Backend is running")
    res.json({ok: true, message:`backend is ruuning`})
});




const PORT = process.env.PORT || 5000;

async function start(){
    try {
        await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDb connected")
    app.listen( PORT , () => {
    console.log(`Backend is running on localhost:${5000}`);
});
}catch(err){
    console.log("error occured" , err)
}
}

start();
