const authController = require("../controllers/authControllers.js")

const router = require("express").Router()

router.post("/register", authController.registerUser)

module.exports = router;