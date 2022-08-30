const mailer = require('nodemailer') 

 
let code;
const getEmailData = (to,name) =>
{
     code= Math.floor(100000 + Math.random() * 900000)
    let data = {
        from: "guyka00@gmail.com",
        to,
        subject: `Hello ${name?name:""}`,
        text:`your reset code is ${code}`
    } 
    return data
}


const sendEmail = (to, name) => {
 
    const smtpTransport =  mailer.createTransport({
        service: "gmail",
        auth: {
            user: 'guyka00@gmail.com',
            pass: 'xrxdbnbodktefeda'
        }
    })
 
    
    const mail = getEmailData(to, name)

    return new Promise((resolve,reject)=>{

     smtpTransport.sendMail(mail, function(error, response) {
        if(error) {
           reject(error) 
        } else {
            resolve(code)
        }
        
      })
   })
} 

module.exports = {sendEmail}