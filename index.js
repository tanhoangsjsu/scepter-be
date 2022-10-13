const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser")
const authRoute = require("./routes/auth")




const app = express();
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json({limit: '30mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}))
dotenv.config()

mongoose.connect(process.env.MONGODB_URL,()=>{
    console.log("connected to mongodb")
})

//ROUTES 
app.use("/v1/auth", authRoute)


app.post('/register', async (req,res)=>{
    const user = new UserDetails({
        email: "test@gmail.com",
        username: "testusername",
        role:"student",
        password:"password"
    })
    user.save()
})

app.post('/login',(req,res)=>{
    const returnedObj = {status:200, message:"successful", role:"student"}
    return res.send(returnedObj)
})
app.listen(8000,()=>{
    console.log("server is running...")
})

