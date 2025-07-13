const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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
      set: (v) =>
         v===" " ? "https://unsplash.com/photos/mountains-and-water-meet-under-a-hazy-sky-BbRRJzYDGoM " :v ,
     default :
 "https://unsplash.com/photos/mountains-and-water-meet-under-a-hazy-sky-BbRRJzYDGoM",
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
 }) ;
  const Listing = mongoose.model("Listing" , listingSchema);
  module.exports=Listing;