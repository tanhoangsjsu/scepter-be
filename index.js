const express = require("express")
const mysql = require("mysql")
const app = express();
const cors = require("cors")

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    user:"root",
    host:"locahost",
    password:"password",
    database: "LoginSystem",
})
app.post('/register',(req,res)=>{
    db.query("INSERT INTO users(email,username,password) VALUES(?,?)",
    [email,username,password], 
    (err,result)=>{
        console.log(err)
    })
})
app.listen("8080",()=>{
    console.log("server is running...")
})
