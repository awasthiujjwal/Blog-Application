const mongoose = require ('mongoose')
require('dotenv').config()
const connectToDb=async()=>{
   await mongoose.connect(`mongodb+srv://${process.env.mongousername}:${process.env.mongopassword}@blogapplication.f5xgl.mongodb.net/?retryWrites=true&w=majority&appName=Blogapplication`)
    .then(()=>console.log("successfully connected to db"))
    .catch(()=>console.log("did not connect to db",))
}
module.exports = connectToDb;




