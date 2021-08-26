const mongoose = require('mongoose');
const env = require("dotenv");
env.config();

// mongodb connection
//mongodb+srv://root:<password>@cluster0.8pl1w.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8pl1w.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("Database connected");
  });