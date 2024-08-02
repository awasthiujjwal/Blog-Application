const mongoose= require ('mongoose');

const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        // unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        // unique:true,
        // maxLength:[10,"length should not be greater than 10"],
        minlength:[3,"length should be greater than 3"]
    },
    address:{
        type:String
    },
    profilepic:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/thumbnails/009/209/212/small/neon-glowing-profile-icon-3d-illustration-vector.jpg"
    },
    coverpicture:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/thumbnails/009/209/212/small/neon-glowing-profile-icon-3d-illustration-vector.jpg"

    },
    resetToken:{
        type:String,
        default:''
    }

},{timestamps:true})

module.exports = mongoose.model('users',userschema)