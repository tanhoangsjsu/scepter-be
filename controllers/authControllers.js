const bcrypt = require("bcrypt")
const User = require("../models/User")

const authController = {
    //REGISTER
    registerUser: async(req,res)=>{
        try {
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hashed(req.body.password,salt)

            //create new user
            const newUser = await new User({
                username : req.body.username,
                email: req.body.email,
                password: hashed,
                role: req.body.role,
            })

            //save to DB
            const user = await newUser.save()
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
module.exports = authController