const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
var fetchuser = require('../middleware/fetchuser');



const JWT_SECRET = "rushiisagoodb$oy";
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }




    try {

        let user = await User.findOne({ email: req.body.email });


        if (user) {
            return res.status(400).json({ success, error: "Sorry the user with this email already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)


        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass

        });





        const data = {
            user: { id: user.id }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })


    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }


});







router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {


    let success = false;


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });



        if (!user) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }



        const passwordCompare = await bcrypt.compare(password, user.password);


        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }


        const data = {
            user: { id: user.id }
        }


        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});






router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

})
module.exports = router 