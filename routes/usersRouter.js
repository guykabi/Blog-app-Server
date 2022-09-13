const express = require('express') 
const router = express.Router() 
const userModel = require('../models/usersModel') 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config() 

router.get('/:email',async(req,resp)=>{
      if(req.params.email.includes('@')) //Check if the email exsits
      {
      try{  
            
           let data = await userModel.findOne({Email:req.params.email})
             if(!data)
              {
                  return resp.status(200).json('Email is not exists')
              }
                  return resp.status(200).json({message:'Email already exists',userName:data})
            }catch(err)
            {
                  resp.status(500).json('Error')
            }
      }
      else{ //Get the user data 
            try{
                   
                  let data = await userModel.find({_id:req.params.email}) //Search the user by his ID not email!!!!
                    if(!data)
                     {
                         return resp.status(200).json('User is not exists')
                     }
                         return resp.status(200).json(data)
                   }catch(err)
                   {
                         resp.status(500).json(err)
                   }
      }
})

router.post('/',async(req,resp)=>
{
    if(!req.body.Email)
    {
        const {Username,Password} = req.body
              try{
                     let Data = await userModel.findOne({Username:Username}) 
                     if(!Data) 
                     {
                          return  resp.status(200).json('User does not exist') 
                     }
                       //Verifies the password the client typed
                     const isMatch = await bcrypt.compare(Password,Data.Password) 
                     if(!isMatch)
                     {
                           return resp.status(200).json('Invalid password')
                     } 
                     const accessToken = jwt.sign(
                            {id:Data._id} ,
                            process.env.ACCESS_SECRET_TOKEN
                        ) 
                     resp.status(200).json({accessToken,Data})

                    
              } catch(err)
              {
                     resp.status(500).json({err:err.message})
              }
    } 

    if(req.body.Name)
      { 
       
              const user = new userModel(req.body)
              try{
                     const data = await user.save()
                     resp.status(200).json({message:'Added Successfully',Name:req.body.Name})
              }catch(err)
              {
                     resp.status(500).json(data)
              }
      } 
})   


router.route('/:id').put(async(req,resp)=>
 { 
        
        if(!req.body.Name) 
        {
              //Crypt the changed password
              const salt = await bcrypt.genSalt(10)
              const passwordHash = await bcrypt.hash(req.body.Password,salt)
             //Update only the password
             try{  
                     let data = await userModel.updateOne( { _id:req.params.id} , { $set: { Password:passwordHash } })
                     resp.status(200).json('Updated')
            }catch(err)
            {
                     resp.status(500).json('opsss')
            }
       }
    })


router.patch('/:id',async(req,resp)=>{
      try{
            let data = await userModel.findByIdAndUpdate(req.params.id,req.body)
           
            resp.status(200).json('Updated')
      }catch(err){
            resp.status(500).json('Error')
      }
})

module.exports = router
