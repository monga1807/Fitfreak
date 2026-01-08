// const { Router } = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const User = require('../models/user');


// router.post("/register", async(req , res) => {
//     const { name , email , password } = req.body;
//     const passwordHash = await bcrypt.hash(password ,10)

//     const user = await User.create({
//           name,
//           email: email.tolowercase(), 
//           passwordHash
//     });
//     // return res.status(201).json({ message: 'User created', user });
//     return res.status(201).json({
//             message: "User created successfully",
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 createdAt: user.createdAt
//             }
//         });
       
// });
// module.exports = router;

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); // bcryptjs recommended
const User = require("../models/user"); // correct import
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth")

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Validate fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // 2. Check if email already exists
        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // 3. Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // 4. Create user document
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            passwordHash
        });

        // 5. Return safe user object (never send passwordHash)
        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            }
        });

    } catch (err) {
        console.error("Error in register route:", err);
        return res.status(500).json({ message: "Server error" });
    }
});
router.post('/login', async(req, res) => {
    const {email , password} = req.body;

    if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // 2. Check if user exists
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 3. Compare password
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }


        const token = jwt.sign(
          {id: user._id},
          process.env.JWT_SECRET,
          {expiresIn: "7d"}
        );
        
   return res.json({
            message: "Login successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            }
        });    
});

router.get("/me", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-passwordHash");
        return res.json({ user });
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
