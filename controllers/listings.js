const Listing = require("../model/listing.js");

module.exports.index =async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings}); 
};

module.exports.renderNewForm =(req,res)=>{
    res.render("listings/new.ejs");
};


module.exports.showListing =(async(req,res)=>{
    let { id} = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path:"reviews",
            populate: {
                path : "author"
            }
        })
        .populate("owner");
    if(!listing){
        req.flash("error","listing you requested doesn't exists!");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{ listing });
});

module.exports.createListing =async (req,res,next) => {
    const newListing= new Listing(req.body.listing);
    newListing.owner =req.user._id;
    await newListing.save();
    req.flash("success","new list created!");
    res.redirect("/listings");
};

module.exports.renderEditForm =async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","listing you requested doesn't exists!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
};

module.exports.updateListing =async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","list updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing =async (req,res)=>{
    let {id} = req.params;
    let deletedListing= await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","listing deleted!");
    res.redirect("/listings");
}