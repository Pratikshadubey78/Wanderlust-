require('dotenv').config();
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../model/listing.js");

async function main(){
    await mongoose.connect(process.env.ATLASDB_URL);
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
        owner :"6a90197837e26262c775adc1"}));
    await Listing.insertMany(initData.data);
    console.log("data was intialised");
};



