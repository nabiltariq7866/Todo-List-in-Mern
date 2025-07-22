const router = require("express").Router();
const User = require("../models/user.model");
const List = require("../models/list.modal");
const { allLists } = require("../controller/allList.controller.js");
router.get("/allLists", allLists)
module.exports = router;