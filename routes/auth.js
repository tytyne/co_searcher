const Joi=require('joi');
const jwt=require('jsonwebtoken')
const config=require('config')
const bcrypt=require('bcryptjs');
const_=require('lodash');
const User=require('../models/User');
const express=require('express');
const router=express.Router()

router.post(async(req,res)=>{

    let user = await User.findOne({emai:req.body.email})

    if(!user) return res.status(400).send('incorrect email or password')

        const validatePassword= await bcrypt.compare(req.body.password,user.password)
        if(!validatePassword)
        return status(400).send('incorrect email or password')
        const token=jwt.sign({_id:user._id},config.get('privateKey'))
        return res.send(token)

});

module.exports=router