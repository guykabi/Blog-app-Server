const express = require('express') 
const emailFile = require('../mailer') 
const router = express.Router()  

router.route('/').post(async (req,resp)=>
{
    const {name,Email} = req.body  
    try{
    let data = await emailFile.sendEmail(Email,name) 
       resp.status(200).json(data)

    }catch(err)
    {
        resp.status(500).json(err)
    }
}) 

module.exports = router 