const authController = require("../controllers/authControllers");
// const requestController = require("../controllers/requestControllers");


const router = require("express").Router();
// const { verifyToken } = require("../controllers/verifyToken");

//REGISTER
router.post("/register", authController.registerUser);


//LOGIN
router.post("/login", authController.loginUser);

//CreateRequest
// router.post("/createRequest", requestController.createRequest);

module.exports = router;
