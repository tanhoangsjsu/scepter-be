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
// app.use(bodyParser.json({limit: '30mb'}))
// app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}))
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

io.on('connection', (socket) => {
  console.log("Socket.IO got connected!");
  socket.on("Login", (msg) => {
    console.log("User logged in!");
    socket.emit("NewUser", 'userX');
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

