const mongoose = require ('mongoose')
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,

    },
    content:{
        type:String,
        required:true,
    },
    image:{
        type:String,
    },
    // author:{
    //     type:String,
    //     required:true,
    // }
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
},{timestamps:true})

module.exports = mongoose.model ('posts',postSchema);