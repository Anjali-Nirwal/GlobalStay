const express= require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const Listing =require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require('./utils/wrapAsync.js');
const ExpressError= require("./utils/ExpressError.js");

app.use(methodOverride("_method"));
app.set("view engine" ,"ejs" );
app.set("views" , path.join(__dirname , "views"));
app.use(express.urlencoded({extended :true}));
app.engine("ejs" , ejsMate);
app.use(express.static(path.join(__dirname ,'/public')));


main().then(()=>{
    console.log("successfully connectd");
}).catch((err)=>{
    console.log(err);
});

// app.get("/testListing" , async (req, res)=>{
//    let sampleListing = new Listing({
//     title:"My New Villa",
//     description :"by the beach ",
//     price :1200,
//     location:"Calangute , Goa",
//     country:"India",
//    });
//    await sampleListing.save()
//     console.log("sample was saved");
//     res.send("successfully tested");
// });

async function main(){
    await mongoose.connect(MONGO_URL);
}

// root route
 app.get("/", (req , res)=>{
    console.log("working properly ");
    res.send("hii i am the route main")
 }); 

 //Index route 
 app.get("/listings",  wrapAsync (async (req, res)=>{
  let allListing = await  Listing.find({});
    res.render("listings/index.ejs",{ allListing } );

 }));
//new route 
app.get("/listings/new", (req, res)=>{
    res.render("listings/new.ejs");
    
});

 //show route 
 app.get("/listings/:id" ,  wrapAsync (async  (req , res)=>{
    let {id} = req.params;
    const listing =  await Listing.findById(id);
    res.render("listings/show.ejs" , { listing});
}));
// create route 
// app.post("/listings", wrapAsync(async (req , res , next)=>{
    
//         // let { title, discription , image ,price,location, country } = req.body ;
//      // let listing = req.body.listing;
//      console.log("New listing data:", req.body.listing); 
//       const newListing = new Listing(req.body.listing);
//      await newListing.save();
//      // console.log("Saved listing : ",newListing);
//      res.redirect("/listings");
//    })
// );
app.post("/listings", wrapAsync(async (req , res , next)=>{
    if (!req.body.listing) {
        throw new ExpressError(400, "Invalid Listing Data");
    }
    console.log("New listing data:", req.body.listing); 
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));

app.get("/listings/:id/edit" ,  wrapAsync (async (req, res)=>{
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs" , {listing});

}));
 

//update route 
app.put("/listings/:id", wrapAsync( async(req, res)=>{
    let {id } = req.params;
    await Listing.findByIdAndUpdate( id ,{...req.body.listing});
      res.redirect(`/listings/${id}`);
}));


//delete route
app.delete("/listings/:id" ,  wrapAsync (async(req , res)=>{
    let {id} = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log("deleted listing");
    res.redirect("/listings");
}));

// For unknown routes
app.all("/test", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});

// Global error handler
app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong!" } = err;
    res.status(status).send(message);
});


app.listen(8080, ()=>{
    console.log("listening to the port ");
});   


