const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoURI"); //getting it from default.json

const connectDb = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("hello om mongoDB connected....");
  } catch (err) {
    console.error(err.message);
    //Exist process with failure
    process.exit(1);
  }
};

module.exports = connectDb;
