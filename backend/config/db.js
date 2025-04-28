const { connect } = require("mongoose");
require("dotenv").config();
const dbConnect = async () => {
  try {
    await connect(process.env.DB_HOST);
    console.log("DB connected successfully");
  } catch (error) {
    console.log("Error in DB connection", error);
  }
};

module.exports = { dbConnect };
