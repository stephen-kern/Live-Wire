// Import package
const mongoose = require("mongoose");

// set rules for mongoose
mongoose.set("strictQuery", true);

// Connection for application/deployment
mongoose.connect(
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/live-wire",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// export this connection
module.exports = mongoose.connection;
