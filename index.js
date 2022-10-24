const express = require('express')
const cors = require('cors') 
const usersRouter = require('./routes/usersRouter')
const postsRouter = require('./routes/postsRouter')
const mailRouter = require('./routes/mailRouter')
const uploadRouter = require('./routes/uplaodRouter')

const path = require('path')

const app = express() 
app.use(cors()) 
app.use(express.json()); 
const port = process.env.PORT || 8000

require('./configs/database') 

//Upload file/images
app.use('/images',express.static(path.join(__dirname,'public/images')))

app.use('/api/users',usersRouter)
app.use('/api/posts',postsRouter)
app.use('/api/mail',mailRouter)
app.use('/api/upload',uploadRouter)


app.listen(port, ()=>{
    console.log('Listenning on port' + " " +  port)
}) 