const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title : {
        type : String,
        unique : true,
        required : [true,"title is required"],
        trim : true,
        minlength :[3,"title must be at least 3 characters long"]
    },
    description : {
        type:String,
        required : [true,"description is required"],
        minlength :[3,"description must be at least 3 characters long"]
    },
    image : {
        url : {
            type:String,
            default : "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
            set: (v) => v === "" ? "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60":v,

        }
    },
    price : {
        type :Number,
        required : [true,"price is required"],
        min :[0,"price can not be negative"]
    },
    location : {
        type:String,
        required : [true,"location is required"],
    },
    country : {
        type:String,
        required : [true,"country is required"],
    },
    reviews :[{
        type : Schema.Types.ObjectId,
        ref : "Review"
    }],
    owner :{
        type : Schema.Types.ObjectId,
        ref: "User",
    }
});

listingSchema.post("findOneAndDelete", async (listing)=>{
    if (listing){
        await Review.deleteMany({ _id: { $in : listing.reviews }});
    }
})

const Listing = mongoose.model("Listing",listingSchema);
module.exports=Listing;