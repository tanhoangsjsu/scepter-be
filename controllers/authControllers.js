var User = require("../models/User");
var Request = require("../models/Request");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const authController = {
//REGISTER
registerUser: async (req, res) => {
    const { username, email, password, role} = req.body;
try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    //Create new user
    const newUser = await new User({
    username: username,
    email: email,
    password: hashed,
    role: role,
    });
    //Save user to DB
    const user = await newUser.save();
    const accessToken = jwt.sign({
        id: user.id,
        username: user.username,
    },
    "sceptersecretkey",
    {expiresIn:"2h"}
    );

    // Create a dummy document in the requests collection.
    // Only for now, later this will be done when student FE sends a request message

    //Create new Request
    const newRequest = await new Request({
        username: username,
        pickupAddress: "4 A street",
        dropAddress: "5 B street",
        status: "pending",
        acceptor: "no one.."
    });

    console.log("newRequest created");

    //Save user to DB
    const request = await newRequest.save();

    console.log("newRequest saved");


    res.status(200).json({user, accessToken});
} catch (err) {
    console.log("registerUser: " + err);
    res.status(500).json(err);
}
},
//createRequest
createRequest: async (req, res) => {
    const { username, pickup, dropoff} = req.body;
try {
    
    // Create a document in the requests collection.

    console.log("In createRequest");

    //Create new Request
    const newRequest = await new Request({
        username: username,
        pickupAddress: pickup,
        dropAddress: dropoff,
        status: "pending",
        acceptor: "no one.."
    });

    console.log("newRequest created");

    //Save request to DB
    const request = await newRequest.save();

    console.log("newRequest saved");


    res.status(200).json({request});
} catch (err) {
    console.log("createRequest: " + err);
    res.status(500).json(err);
}
},
//LOGIN 
loginUser : async(req,res)=>{
    const { username, password} = req.body;
    try {
        const user = await User.findOne({username})
        if(!user){
            return res.status(404).json("Wrong username");
        }
        const validPassword = await bcrypt.compare(
            password, user.password
        )
        if(!validPassword){
            return res.status(400).json("Wrong password")
        }
        if(user && validPassword){
            const accessToken = jwt.sign({
                id: user.id,
                username: user.username,
            },
            "sceptersecretkey",
            {expiresIn:"2h"}
            );
            const {password, ...others} = user._doc;
            return res.status(200).json({...others, accessToken})
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}


};

module.exports = authController;