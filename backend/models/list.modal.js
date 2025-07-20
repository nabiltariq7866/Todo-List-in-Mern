const mongoose = require("mongoose");

const ListItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
},{timestamps:true});

module.exports = mongoose.model("ListItem", ListItemSchema);