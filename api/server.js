const express = require("express");
//import accountRouter
const AccountRouter = require("../accounts/accountRouter")

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());
server.use("/api/accounts", AccountRouter)  //use the accountRouter

//testing
server.get("/", (req,res)=>{
    res.status(200).json({message: "Api is running properly"})
})

module.exports = server;
