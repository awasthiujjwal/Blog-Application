

const UserModel = require ('../models/Usermodel')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var jwt_secret= "hellboy"
const Crypto= require ('crypto');
 const nodemailer = require ('nodemailer');
const { text } = require('express');
const { error, info } = require('console');


// create user 
let createUser =async (req,res)=>{

    let {name,email,address,password} = req.body;
    if(!name){
        return res.json({msg:"name is required",success:false})
    }
    if(!email){
        return res.json({msg:"email is required",success:false})
    }
    if(!password){
        return res.json({msg:"password is required",success:false})
    }
    if(!address){
        return res.json({msg:"address is required",success:false})
    }
    let find = await UserModel.findOne({email:req.body.email})

    if (find){
        return res.json ({msg:"user already exists",success:false})


    }else{
        let password = req.body.password
        const salt = bcrypt.genSaltSync(10);
       const  hashpassword = bcrypt.hashSync(password, salt);
       console.log(password)
       console.log(hashpassword)
        try {
            let data = await UserModel.create({
                name:req.body.name,
                email:req.body.email,
                password:hashpassword
            })
            return res.json({msg:"data saved successfully",data,success:true})
            
        } catch (error) {
            res.json ({msg:"error in saving data",error,success:false})
        }
    }
}
// get all users
let getalluser =async (req,res)=>{
    let details =await UserModel .find()
    res.json({msg:details})

} 
let login =async (req,res)=>{
    let {email,password} = req.body;
    if(!email){
        return res.json({msg:"name is required",success:false})
    }
    if(!email){
        return res.json({msg:"email is required",success:false})
    }
    let existingUser = await UserModel.findOne({email})
  
console.log(existingUser)
if(existingUser){
    let comparePassword = await bcrypt.compareSync(password, existingUser.password);
    if(comparePassword){
        let token =jwt.sign ({_id:existingUser._id},jwt_secret)
        res.json({msg:"login successfull",token,success:true,id:existingUser._id})
    }else{
        res.json({msg:"wrong password",success:false})
    }
}else{
    res.json({msg:"user not found",success:false})
}

}
let update =async (req,res)=>{
 const {name,password,email,address,profilepic,coverpicture} = req.body
let updateUser = await UserModel .updateOne ({email:email},{$set:{name:name,address:address,profilepic,coverpicture,password}})
 res.send('user updated successfully')
}

let deleteUsers =async (req,res)=>{
    let details =await UserModel .deleteOne({email:req.body.email})
    res.json({delete:details})
}


// get user by id
let getsingleuser = async (req,res)=>{
    let id = req.params._id
 let data = await Usermodel.findById({_id:id})
 res.json ({msg:data})
} 

// delet user by id
let forgetPassword = async (req,res)=>{
    const {email} =req.body
    let existingUser = await UserModel.findOne({email});
    if (!existingUser){
        return res.json ({msg:'user not found or wrong email',success:false})
    }else{
        let resetToken = await TokenGenerate()
        await UserModel.updateOne({_id:existingUser._id},{resetToken});
        // res.send ('Token saved')
        sendresetEmail(email,resetToken)
        res.json ({msg:"password reset link sent to your email"})

    }
    function TokenGenerate (){
        return Crypto.randomBytes(20).toString('hex')
    }
    function sendresetEmail (email,token){
        const transporter = nodemailer.createTransport({
            host :"smtp.gmail.com",
            port:587,
            secure:false,
            auth:{
                user:"ujjawasthi@gmail.com",
                pass:"rlin kqqh zcfs uzsf"
            },
        });
        const mailOptions= {
            from:"ujjawasthi@gmail.com",
            to:email,
            subject:"password reset request",
            text:`hello please click on the below link to reset your password,\n http://localhost:8080/users/reset-password/${token}`

        }
        transporter.sendMail(mailOptions,(error,info)=>{
            if (error){
                console.log(error)
            }
            else{
                console.log("Email sent" + info.response)
            }
        })
    }

}


// update user by id
let userUpdate = async (req,res)=>{

}
const GetToken = async (req,res) =>{
 let Token = req.params.token;
 let user = await UserModel.findOne({resetToken:Token})
 if(user){
        res.render('updatepassword',{Token})
 }else{
    res.json({msg:"Token Expired"})
 }
}

const verifyToken = async (req,res)=>{
    console.log(req.user)
    console.log(req.params._id)
    if(req.user._id === req.params._id){
        await UserModel.findByIdAndDelete(req.user._id)
        res.json ({msg:"user deleted successfully"})
    }
    else{
        res.json ({msg: "delete your own account only"})
    }
}

const updatePassword = async (req,res)=>{
    let token = req.params.token.slice(1)
    let password = req.body.password
    let salt = bcrypt.genSaltSync(10)

    let hashedPassword = await bcrypt.hashSync(password,salt)
    console.log(password)
    console.log (hashedPassword)
    console.log(token)
    let user = await UserModel.updateOne({resetToken:token},{$set:{password:hashedPassword,resetToken:""}})

    res.json({msg:"user updated succewssfully"})

}
module.exports={
    createUser,
    getalluser,
    login,
    update,
    deleteUsers,
    getsingleuser,
    deleteUsers,
    userUpdate,
    verifyToken,
    forgetPassword,
    GetToken,
    updatePassword
}