const express = require('express') 
const router = express.Router() 
const multer = require('multer')  


const storage = multer.diskStorage( { 
    destination:(req,file,cb)=>{
        cb(null,'public/images')
    }, 
    filename:(req,file,cb)=>{
        cb(null,req.body.name) 
    }
}) 

const upload = multer({storage}) 

router.post("/",upload.single("file"),(req,resp)=>{
    
    try{
        return resp.status(200).json('Image added')
    }catch(err){ 
        console.log(err) 
    } 
}) 

module.exports = router