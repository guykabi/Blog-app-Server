const mongoose = require('mongoose') 
const {Schema} = mongoose  

let PostsSchema = new Schema({ 
     UserId:String,
     Name:String, 
     Title:String,
     Subtitle:String,
     Content:String,
     Image:String,
     Likes:[{Username:String}],
     Comments:[{Username:String,Content:String}]
},
{timestamps:true}
) 



module.exports = mongoose.model('posts',PostsSchema)
