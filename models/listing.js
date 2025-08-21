const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
 const listingSchema  = new Schema({
    title:{
      type:  String, 
      required:true
    },
    description :{
        type:String,
    },

    image : {
        filename:String,
        url:{
     type: String,
      default :
      "https://cdn.pixabay.com/photo/2016/11/30/08/48/bedroom-1872196_1280.jpg",
    set: (v) =>
         v==="" 
    ?  "https://cdn.pixabay.com/photo/2017/08/27/10/16/interior-2685521_1280.jpg"
    : v ,
        }
    },
    price:{
        type:Number,
    },
    location :{
       type: String,
    },
    country :{
        type: String,
    },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref:"Review",
        },
    ],
 }) ;

 listingSchema.post("findOneAndDelete" , async (listing) =>{
if(listing) {
     await Review.deleteMany({ _id: {$in : listing.reviews}});
    }   
 });
  const Listing = mongoose.model("Listing" , listingSchema);
  module.exports=Listing;