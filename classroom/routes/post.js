 const express=  require("express");
 const router = express.Router();



 //Post 
//Index -user
router.get("/posts" ,  (req , res)=>{
    res.send("Get for post ");
});

//show
router.get("/posts/:id", (req, res) =>{
    res.send("GET for post id");
});

//Post 
router.post("/posts", (req, res) =>{
    res.send("post for post");
});
 //DELETE

 router.delete("/posts/:id" , (req , res)=>{
    res.send("Delete  for post id ")
 });

 module.exports = router;