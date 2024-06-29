const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://laveshvyas20:HYfPIVV7timUKqPN@cluster0.frfboac.mongodb.net/LoginDB")
.then(()=>{console.log("mongodb connected")})
.catch(()=> console.log("Connection failed"))

const Schema  = mongoose.Schema

const userSchema = new Schema({
   
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
       
    }
})

const collection  = mongoose.model("User",userSchema)
module.exports = {collection}