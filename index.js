const express = require("express")
const mongoose = require("mongoose")
const app = express();
const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv")

app.use(express.json())
app.use(cors())
app.use(bodyParser.json({limit: '30mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}))
dotenv.config()

mongoose.connect(process.env.MONGODB_URL,()=>{
    console.log("connected to mongodb")
})

app.post('/register',(req,res)=>{
    const returnedObj = {status:200, message:"successful"}
    return res.send(returnedObj)
})
app.post('/login',(req,res)=>{
    const returnedObj = {status:200, message:"successful", role:"student"}
    return res.send(returnedObj)
})
app.listen(8000,()=>{
    console.log("server is running...")
})

