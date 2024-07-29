const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
// import userRoute from "./Routes/userRoute.js"
const userRoute = require("./Routes/userRoute.js")
app.use(cors());
app.use(express.json());
// app.use((err,req,res,next)=>{
// console.log("Something went wrong")
// })
app.use("/api/auth",userRoute)
mongoose
  .connect(process.env.MONGO_URL)
  .then(()=>console.log("connected to db successfully"))
  .catch(err=>console.log("error connecting to db"))
const server = app.listen(process.env.PORT, () =>
    console.log(`Server started on ${process.env.PORT}`)
  );