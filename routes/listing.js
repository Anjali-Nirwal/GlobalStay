const express = require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const { listingSchema }= require("../serverschema.js");
const ExpressError= require("../utils/ExpressError.js");
const Listing =require("../models/listing.js");
const { isLoggedIn } = require("../middleware.js");

//validating the listing schema from the server
const validateListing = (req, res ,next)=>{
let{error} =  listingSchema.validate(req.body);
  if(error){
        let errMsg= error.details.map((el)=> el.message).join(",");
       throw new ExpressError(404 , errMsg);
    }else{
        next();
    }
};

 //Index route 
router.get("/",  wrapAsync (async (req, res)=>{
  let allListing = await  Listing.find({});
    res.render("listings/index.ejs",{ allListing } );
 }));

//new route 
router.get("/new", isLoggedIn ,(req, res)=>{
    // if(!req.isAuthenticated()){
    //     req.flash("error" , "You much be Logged in to create listing");
    //     return res.redirect("/login");
    // }
    res.render("listings/new.ejs");

    
});

 //show route 
 router.get("/:id" , wrapAsync (async  (req , res)=>{
    let {id} = req.params;
    const listing =  await Listing.findById(id).populate("reviews");
    if(!listing){
        req.flash("error" ,"Listing you requested does not exist!" );
     return res.redirect("/listings");
    }
    res.render("listings/show.ejs" , { listing});
}));

// create route 

router.post("/", isLoggedIn , validateListing , wrapAsync(async (req , res , next)=>{ 
 //one way of schema validation but more use of if condition 
    // if (!req.body.listing) {
    //     throw new ExpressError(400, "Invalid Listing Data");
    // }
    // console.log("New listing data:", req.body.listing); 
    // const newListing = new Listing(req.body.listing);
    //  if (!newListing.title) {
    //     throw new ExpressError(400, "Invalid Listing Data");
    // }
    //  if (!newListing.description) {
    //     throw new ExpressError(400, "Invalid Listing Data");
    // }
    //  if (!newListing.location) {
    //     throw new ExpressError(400, "Invalid Listing Data");
    // }
    // await newListing.save();
    // res.redirect("/listings");

    //alternate way of ServerSide Validaation 
    // let result =  listingSchema.validate(req.body);
    // console.log(result);
    // if(!result.error){
    //     throw new ExpressError(404 , error );
    // }
    const  newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success" ," New Listing Created" );
    res.redirect("/listings");
    
}));
 
//edit route
 router.get("/:id/edit" ,  isLoggedIn , wrapAsync (async (req, res)=>{
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error" , "Listing you requested does not exist!");
        return  res.redirect("/listings");
    }
    res.render("listings/edit.ejs" , {listing});

}));
 

//update route 
router.put("/:id",validateListing ,  isLoggedIn ,wrapAsync( async(req, res)=>{
    // if (!req.body.listing) {
    //     throw new ExpressError(400, "Invalid Listing Data");
    // }
    let {id } = req.params;
    await Listing.findByIdAndUpdate( id ,{...req.body.listing});
    req.flash("success" , "Listing Updated !!");
      res.redirect(`/listings/${id}`);
}));


//delete route
router.delete("/:id" ,  isLoggedIn ,wrapAsync (async(req , res)=>{
    let {id} = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log("deleted listing");
    req.flash("success","Listing Delete !!" );
    res.redirect("/listings");
}));
module.exports = router;
