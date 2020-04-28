const express = require('express')
const db = require('../db')
const utils = require('../utils/mail')
const userRouter = express.Router()
let send = {}
userRouter.post('/register', (req,res)=>{
    let {us, up} = req.body
    if(us && up){
        db.insert('INSERT INTO students(up,us) VALUES(?,?)',[up,us],(err,data)=>{
            if(err){
                res.send({
                    msg:'注册失败',
                    code:500,
                    data:{
                        us:null,
                        up:null
                    } 
                }) 
            }else{
                res.send({
                    msg: '注册成功',
                    code:200,
                    data: {
                        us,up
                    }
                })
            }
        })
    }else{
        send.msg = "账号或者密码错误"
        send.code = 400
        send.data = {
            us:null,
            up:null
        }
        res.send(send)
    }
})
userRouter.get('/login',(req,res)=>{
    let {up,us} = req.query
    if(up && us){
        db.query(`SELECT * FROM students WHERE up='${up}' AND us='${us}'`,(err,data)=>{
            if(err){
                res.send({
                    msg:'服务器错误',
                    code:500,
                    data:{
                        us:null,
                        up:null
                    } 
                }) 
            }else{
                if(data.length){
                    res.send({
                        msg: '登陆成功',
                        code:200,
                        data: data
                    })
                }else{
                    res.send({
                        msg: '用户名或者密码错误',
                        code:400,
                        data: data
                    })
                }
                
            }
        })
    }else{
        send.msg = "账号或者密码错误"
        send.code = 400
        send.data = {
            us:null,
            up:null
        }
        res.send(send)
    }
})
userRouter.get("/sendMail",(req,res)=>{
    let {to, subject, text} = req.query
    utils.send(to, subject, text,function(type){
        res.send(type)
    })
})

module.exports = userRouter