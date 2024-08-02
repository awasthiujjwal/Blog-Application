const express = require('express');
const app = express();
const port = 8080;
const connectToDb = require('./db')
const cors= require('cors')
const Usermodel = require ('./models/Usermodel')

let UserRoutes =require ('./routes/UserRoutes')
let postsroutes =require ('./routes/postroute')
app.use(cors())
app.use(express.json( {limit:'50mb'}))
connectToDb()

app.set('view engine', 'ejs')
app.get('/',(req,res)=>{
    res.send("welcome page")
})

// app.post('/register',async(req,res)=>{
    
// })
// userRoutes middleware
app.use('/users',UserRoutes)
app.use ('/posts',postsroutes)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})