const User = require("../models/user.model");
const List = require("../models/list.modal");
exports.allLists=async (req, res) => {
    try {
        const {email} = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(user);
        const lists = await List.find({ user: user._id });
        if (lists.length === 0) {
            return res.status(404).json({ message: "No lists found for this user" });
        }
        res.status(200).json(lists);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        
    }
}