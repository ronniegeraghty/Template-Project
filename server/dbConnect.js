const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Connect to DB
module.exports.connect = () => {
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

//Disconnect from DB
module.exports.close = () => {
  mongoose.connection.close();
};
