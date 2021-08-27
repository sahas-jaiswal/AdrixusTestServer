const express = require('express');
const env = require('dotenv');
const cors = require("cors");
const mongoose = require('mongoose');
env.config();

const app = express();

//importing route
const userRoute = require('./Routes/user.route')

//environment variable or you can say constants
env.config();

//mongo db connection
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.3qpya.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connected");
  }).catch(error=>{
    console.log('Error in DB Connection',error);
  })


app.use(cors());
app.use(express.json());
app.use('/api',userRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});


