//creating the server
const express =require('express');
const app=express();
const cors =require('cors');
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

const PORT=5000;
// app.get('/',(req,res)=>{
//     res.send('Hello world');
// })


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
  }
app.listen(PORT,()=>{
    console.log(`Nodejs Server is running on port:${PORT}`)
})

