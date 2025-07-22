const List = require("../models/list.modal");
exports.deleteList = async (req, res) => {
    try {
        const listId = req.params.id;
        if (!listId) {
            return res.status(400).json({ message: "List ID is required" });
        }
        const deletedList = await List.findByIdAndDelete(listId);
        if (!deletedList) {
            return res.status(404).json({ message: "List not found" });
        }
        res.status(200).json({ message: "List deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
}