const router = require("express").Router();
const User = require("../models/user.model");
const List = require("../models/list.modal");
const { addTask } = require("../controller/list.controller.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
router.post("/addTask",authMiddleware,addTask);

module.exports = router;