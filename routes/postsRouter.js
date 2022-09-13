require('dotenv').config() 
const router = require('express').Router() 
const postModel = require('../models/postsModel')
const jwt = require('jsonwebtoken')



router.get('/',async(req,resp)=>
{ 
    const token = req?.headers?.['x-access-token']
        if (!token) {
             resp.status(500).json('No Token Provided');
          }
    
      jwt.verify(token,  process.env.ACCESS_SECRET_TOKEN,async (err, data)  => {
        if (err) {
          return resp.status(500).json('Failed to authenticate token');
        }
        else{
              try{
                    const posts = await postModel.find({})
                    resp.status(200).json(posts)
             }catch(err)
                {
                    resp.status(500).json(err)
               }
          }
     })
})   

router.get('/:id',async(req,resp)=>{
      try{
         let data = await postModel.find({_id:req.params.id})
         if(data.length > 0)
         {
           
            resp.status(200).json(data)
         }
        
         else
         {
            try{
                let data2 = await postModel.find({"UserId":req.params.id})//This finds all the users posts
                resp.status(200).json(data2)
            }catch(err)
            {
                resp.status(500).json('Errorrrr')
            }
           
         }
         
      }catch(err)
      {
        
          resp.status(500).json('Error')
      }
})


router.post('/',async(req,resp)=>{
          const post = new postModel(req.body)
    try{
          let data = await post.save()
          resp.status(200).json('Post Added')
    }catch(err)
    {
          resp.status(500).json('Error')
    }
})


router.patch('/:id',async(req,resp)=>{
    if(req.body.Likes)
    {  
       
        try{
            
            let data = await postModel.find({_id:req.params.id})
            if(data)
            {   
                let res = data[0].Likes.find(o => o.Username === req.body.Likes[0].Username)
                if(res)//If the post already got like from that user
                {
                    try{                  
                       let deleteLike = await postModel.updateOne({_id:req.params.id},{"$pull":{"Likes":{"_id":req.body.Likes[0]._id}}})
                       resp.status(200).json('Like deleted')
                    }catch(err)
                    {
                           resp.status(500).json('Error')
                    }
                   
                }
                if(!res)//To add like to the post 
                {
                    try{
                     let update = await postModel.updateOne({ _id: req.params.id }, 
                                         {$push: {Likes: req.body.Likes[0]}},)
                                         
                          resp.status(200).json('Liked has been made')
                      }catch(err)
                      {
                        resp.status(500).json('Erorrrrr')
                      }
                }
               
            }
            else{
             resp.status(200).json('User already liked that post')
            }
        }catch(err)
        {
            resp.status(500).json('Error')
        }
    }
    if(req.body.Comments && !req.body.Comments[0]._id)//To add a comment
    {
        try{
            let update = await postModel.updateOne({ _id: req.params.id }, 
                                {$push: {Comments: req.body.Comments[0]}},)
                                
                 resp.status(200).json('Comment has been made')
             }catch(err)
             {
               resp.status(500).json('Erorrrrr')
             }
    }if(req.body.Comments?.[0]._id)//To delete a comment
    {
        try{                  
            let deleteComment = await postModel.updateOne({_id:req.params.id},{"$pull":{"Comments":{"_id":req.body.Comments[0]._id}}})
            resp.status(200).json('Comment deleted')
         }catch(err)
         {
                resp.status(500).json('Error')
         }
    }
    
})

router.delete('/:id',async(req,resp)=>{
    try{
         let data = await postModel.findByIdAndDelete(req.params.id)
         resp.status(200).json('Deleted')
    }catch(err){
        resp.status(500).json('Error')
    }
})

module.exports = router