const List = require("../models/list.modal");
exports.updateList=async (req, res) => {
    try {
        const {title, description} = req.body;
        if (!title || !description || !req.params.id) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const updatedList = await List.findByIdAndUpdate(req.params.id,{title, description},{new: true});
        if (!updatedList) {
            return res.status(404).json({ message: "List not found" });
        }
        res.status(200).json({ message: "List updated successfully"});
        
    } catch (error) {
        res.status(500).json({ message: "Server Error" ,error});       
    }
}