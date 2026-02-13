const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../model/listing.js");

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');
};

main()
    .then(()=>{
        console.log("CONNECTED TO DB.");
        initDB();
    })
    .catch((err)=>{
        throw(err);
    });

const initDB = async() =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner :"697a56cb6a1b93c8d9b66b0e"}));
    await Listing.insertMany(initData.data);
    console.log("data was intialised");
};



