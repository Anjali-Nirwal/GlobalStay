   module.exports.isLoggedIn = (req , res, next)=>{
     if(!req.isAuthenticated()){
        req.flash("error" , "You much be Logged in to create listing");
        return res.redirect("/login");
    }
    next();
}
   
   