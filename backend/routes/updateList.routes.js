const router = require("express").Router();
const User = require("../models/user.model");
const List = require("../models/list.modal");
const { updateList } = require("../controller/updateList.controller.js");
router.put("/updateList/:id", updateList);
module.exports = router;
