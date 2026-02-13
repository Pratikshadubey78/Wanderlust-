const express = require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../model/listing.js");
const listingController = require("../controllers/listings.js");

const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router
    .route("/")
    .get( wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        validateListing,
        wrapAsync(listingController.createListing)
    );
    // .post(upload.single('listing[image]'),(req,res)=>{
    //     res.send(req.file);
    // });
    
router.get("/new",wrapAsync(listingController.renderNewForm));

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
        validateListing,
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.updateListing))
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.destroyListing));

//SHOW ROUTE
router.get('/listings/:id', wrapAsync(listingController.showListing));
    
//EDIT ROUTE
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm ));


module.exports = router;