const express = require("express");
const router =express.Router();

//Index -user
router.get("/", (req, res) =>{
    res.send("GET for users");
});

//show - user
router.get("/:id" ,  (req , res)=>{
    res.send("Get for user id");
});

//post- users
router.post("/", (req, res) =>{
    res.send("post for users");
});

//delete -users  
router.delete("/:id", (req, res) =>{
    res.send("DELETE for users id");
});

module.exports = router;