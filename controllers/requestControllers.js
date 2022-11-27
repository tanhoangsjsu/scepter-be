
var Request = require("../models/Request");

const requestController = {

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
}

};

module.exports = requestController;