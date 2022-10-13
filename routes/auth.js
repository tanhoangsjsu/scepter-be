const authController = require("../controllers/authControllers")

const router = require("express").Router()

router.post("/register", authController.registerUser)

module.exports = router;