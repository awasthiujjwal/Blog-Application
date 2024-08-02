const express = require ('express')
const Post= require('../models/Postmodel')







const createpost = async (req,res)=>{
  let {title,image,content,author} = req.body
 try {
    let post = await Post.create({
        title,
        image,
        content,
        author
    
      })
      return res.json ({msg:"post created successfully",post})
 } catch (error) {
    return res.json ({msg:"error in creating post",error})
 }
}
const Updatepost = async (req,res)=>{
    let {title,image,content,author} = req.body
    try {
    let obj ={};

        if(title){
          obj.title=title  
        }
        if(image){
           obj.image= image
        }
        if(content){
            obj.content = content
        }
    console.log(obj)
    console.log(req.params._id)

    let update= await Post.findByIdAndUpdate(req.params._id,{$set:obj},{new:true})
    await update.save()
      return   res.json({msg:"user updated suuccessfully",update})
} catch  {
    res.send("cannot update the user")
}
}
const Deletepost = async (req,res)=>{
  
    try {
        let  delete1 = await Post.findByIdAndDelete(req.params._id)
        return res.json({msg:"post deleted successfully",delete1})
    } catch (error) {
        res.json({msg:"error in deleting the posts",error})
    }


}
const Singlepost = async (req,res)=>{
    try {
        let  singlepost = await Post.findById(req.params._id)
        return res.json({msg:"post fetched successfully",singlepost})
    } catch (error) {
        res.json({msg:"error in fetching single post",error})
    }

}
const getyourallpost = async (req,res)=>{
    try {
        let userpost =await Post.find({author:req.params._id}) .populate ({path:'author'})
        res.json({msg:"all posts fetched successfully",userpost})
    } catch (error) {
        res.json({msg:"error in fetching post",error})
    }

}
const getallusers = async(req,res)=>{
 try {
    let posts =await Post.find().populate ({path:'author'})
    res.json({msg:"all posts fetched successfully",posts})
 } catch (error) {
    res.json({msg:"error in fetching posts",error})
 }
}

module.exports = {
    createpost,
    Updatepost,
    Deletepost,
    Singlepost,
    getyourallpost,
    getallusers
}