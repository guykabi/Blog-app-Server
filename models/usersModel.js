const mongoose = require('mongoose') 
const {Schema} = mongoose  
const {hash} = require('bcryptjs')
const bcrypt = require('bcryptjs/dist/bcrypt')



let UsersSchema = new Schema({ 
     Name:String,
     Lastname:String,
     Username:String,
     Password:String, 
     Email:String,
     Image:String,
     Age:Number,
     Color:String
},
{timestamps:true}
) 



module.exports = mongoose.model('users',UsersSchema)


