const router = require("express").Router();
const List = require("../models/list.modal");
const { deleteList } = require("../controller/delete.controller.js");
router.delete("/deleteList/:id", deleteList);
module.exports = router;