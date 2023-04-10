//creating the server
const express =require('express');
const app=express();
const cors =require('cors');
const mongoose=require('mongoose');
// configure .env file so that server.js can decode the env variables
require('dotenv').config();
//importing the dbconfig file
const dbConfig =require('./config/dbConfig');
const path = require("path");
//vary
app.use(cors());

app.use(express.json());
const userRoute=require('./routes/userRoute');
const songsRoute=require('./routes/songsRoute');
const adminRoute = require("./routes/adminRoute");


app.use('/api/users',userRoute);
app.use('/api/songs',songsRoute);
app.use("/api/admin", adminRoute);

const PORT=process.env.PORT || 6001;
// app.get('/',(req,res)=>{
//     res.send('Hello world');
// })



mongoose.set("strictQuery" , true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

