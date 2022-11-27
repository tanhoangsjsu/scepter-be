
const requestController = require("../controllers/requestControllers");


const router = require("express").Router();


//CreateRequest
router.post("/createRequest", requestController.createRequest);

module.exports = router;