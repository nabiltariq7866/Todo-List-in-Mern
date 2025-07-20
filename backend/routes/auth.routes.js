const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Make sure to install and configure JWT
const {register,login}=require("../controller/auth.controller.js")
router.post("/register",register )
router.post("/signin",login );

module.exports = router;