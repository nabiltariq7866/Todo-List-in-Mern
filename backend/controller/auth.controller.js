const User = require("../models/user.model");
const jwt = require('jsonwebtoken'); // Make sure to install and configure JWT
const bcrypt = require('bcrypt');
exports.register = async (req, res) => {
    try {
        const { email, userName, password } = req.body;

        // Collect missing fields
        const missingFields = [];
        if (!email) missingFields.push("email");
        if (!userName) missingFields.push("userName");
        if (!password) missingFields.push("password");

        if (missingFields.length > 0) {
            return res.status(400).json({ msg: `Missing required field(s): ${missingFields.join(", ")}` });
        }
        // Check for existing user
        const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
        if (existingUser) {
            return res.status(409).json({ msg: "Email or username already in use" });
        }

        // Create and save user 
        const user = new User({ email, userName, password });
        await user.save();
        // Do not return password hash
        const userResponse = {
            _id: user._id,
            email: user.email,
            userName: user.userName,
            list: user.list,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        res.status(201).json({ user: userResponse });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for missing fields
        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password are required" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ msg: "Invalid email or password" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid email or password" });
        }

        // Generate JWT token (optional, but recommended)
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            "your_jwt_secret", // In production, use process.env.JWT_SECRET
            { expiresIn: "2d" }
        );

        // Exclude password from user object
        const { password: pwd, ...userWithoutPassword } = user._doc;

        res.status(200).json({ user: userWithoutPassword, token });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
}