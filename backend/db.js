const mongoose = require("mongoose");

const connectDb = ()=>{
    mongoose.connect('mongodb://127.0.0.1:27017').then((data)=>{
        console.log("Your connection with mongoose has been established");
    })
}

module.exports = connectDb