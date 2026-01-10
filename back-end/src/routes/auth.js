const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); // bcryptjs recommended
const User = require("../models/user"); // correct import
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth")
const { OAuth2Client } = require("google-auth-library");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Google token required" });
    }

    // ✅ Verify Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    const email = payload.email;
    const name = payload.name;
    const googleId = payload.sub;

    if (!email) {
      return res.status(400).json({ message: "Google account has no email" });
    }

    // ✅ Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        passwordHash: "google-auth",
      });
    }

    // ✅ Generate JWT
    const jwtToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error("Google auth error:", err);
    return res.status(401).json({ message: "Invalid Google token" });
  }
});


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
