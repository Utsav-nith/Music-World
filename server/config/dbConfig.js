//connecting the mongodb to nodejs
const mongoose=require('mongoose');

mongoose.connect(process.env.MONGO_URL);
//create connection object
const connection=mongoose.connection;

connection.on('connected',()=>{
    console.log("mongodb is connected!");
})
connection.on('error',(err)=>{
    console.log(err);
})


module.exports = connection;

//this is how we connect the mongodb to nodejs