const expres=require('express')
const config=require('config')
const jwt=require('jsonwebtoken')

function isLogin(req,res,next){
    const token=req.header('x-auth-token');
    if(!token) return res.status(500).send('Access denied')
    try{
        const decoded=jwt.verify(token,config.get('PrivateKey'))
        req.user=decoded
        next()

    }
    catch(ex){
        res.send('Invalid token')
    }

}
module.exports=isLogin