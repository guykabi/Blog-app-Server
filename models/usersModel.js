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

//Crypt the new user password
UsersSchema.pre('save',async function (){
    if(this.isModified('Password')){
        this.Password = await bcrypt.hash(this.Password,12)
        
    }
})


module.exports = mongoose.model('users',UsersSchema)


