const mongoose = require ('mongoose')
const connectToDb=async()=>{
   await mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(()=>console.log("successfully connected to db"))
    .catch(()=>console.log("did not connect to db",))
}
module.exports = connectToDb;




