const router = require("express").Router();
const User = require("../models/user.model");
const List = require("../models/list.modal");

router.post("/addTask", async (req, res) => {
    try {
        const { title, description, email } = req.body;
        // Input validation
        if (!title || !description || !email) {
            return res.status(400).json({ msg: "Title, description, and email are required." });
        }
        // Await user lookup
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ msg: "User does not exist." });
        }
        // Create and save the new task
        const list = new List({ title, description, user: existingUser._id });
        await list.save();

        // Associate the task with the user if user model supports it
        if (Array.isArray(existingUser.list)) {
            existingUser.list.push(list._id);
            await existingUser.save();
        }

        return res.status(201).json({ list });
    } catch (error) {
        console.error("Error in /addTask:", error);
        return res.status(500).json({ msg: "Server error", error: error.message });
    }
});

module.exports = router;