"use strict";
const nodemailer = require("nodemailer");
function sendMail(
    to="2859180318@qq.com,txincrystal@163.com",
    subject='hello txm',
    text='谭总，该下班了',
    fn
){
    let transporter = nodemailer.createTransport({
        host: "smtp.163.com",
        port: 465,
        secure: true,
        auth: {
            user: 'txincrystal@163.com',//testAccount.user, // generated ethereal user
            pass: 'GELNKQXKKSOSXABC' //testAccount.pass // generated ethereal password
        }
    });
    let info = {
        from: '"tanxin 👻" <txincrystal@163.com>', // sender address
        to: to, //"2859180318@qq.com,txincrystal@163.com", // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        //html: "" // html body
    }
    transporter.sendMail(info,(err,data)=>{
        if(err){
            console.log('send err')
            fn&&fn('error')
        }else{
            console.log('send ok!')
            fn&&fn('success')
        }
    });
}
exports.send = sendMail