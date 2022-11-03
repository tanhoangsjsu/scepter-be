const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser")
const authRoute = require("./routes/auth")


const app = express();


const http = require('http').Server(app);
// const io = require('socket.io')(http);
const port = process.env.PORT || 9000;
const io = require("socket.io")(http, {
  cors: {
    origin: '*',
  }
});


app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json({limit: '30mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}))
dotenv.config()

mongoose.connect("mongodb+srv://tanhoang14:3KuADKJSIhBOzJhl@cluster0.n720fe1.mongodb.net/?retryWrites=true&w=majority",()=>{
    console.log("connected to mongodb")
})

//ROUTES 
app.use("/v1/auth", authRoute);

app.listen(8000,()=>{
    console.log("server is running...")
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

//socket listener for when connection is established
io.on('connection', (socket) => {
  console.log("Socket.IO got connected!");
  

  //socket listener for login event
  socket.on("Login",(msg)=>{
    //deciding which room to put socket of the user in
    if(msg == "student"){
      socket.join("studentRoom")
      console.log("Login Successful! Student joined room")
    }
    else {
      socket.join("assistantRoom");
      console.log("Login Successful! Assistant joined room")
  }})
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

