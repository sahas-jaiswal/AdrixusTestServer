const express = require('express');
const env = require('dotenv');
const cors = require("cors");
env.config();

const app = express();



//environment variable or you can say constants
env.config();



app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});


