const mongoose = require("mongoose") // Import monggoose

const uri = process.env.MONGO_URI //Add URI MongoDB Atlas

// Connect express to MongoDB with mongose
mongoose
  .connect(uri, {
    useUnifiedTopology: true, //must be added
    useNewUrlParser: true, //must be added
    useCreateIndex: true, //use to make unique data Types
    useFindAndModify: false, //usefindAndUpdate instead of findAndModify
  })
  .then(() => console.log("database connected")) //connected test
  .catch((e) => console.log(e));


//Import models

const guru = require("./guru");
const user = require("./user");
const nilai = require("./nilai");
const siswa = require("./siswa");

module.exports = { user, guru, siswa, nilai }
