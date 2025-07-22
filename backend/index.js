const express = require('express');
const app = express();
const auth =require("./routes/auth.routes")
const list =require("./routes/list.routes")
const updateList = require("./routes/updateList.routes");
const deleteList = require("./routes/deleteList.routes");
const allList = require("./routes/allList.routes");
app.use(express.json());
app.use("/api/auth",auth)
app.use("/api/list",list)
app.use("/api/list",updateList );
app.use("/api/list",deleteList);
app.use("/api/list",allList);


module.exports = app;