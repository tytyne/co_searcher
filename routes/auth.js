
const express=require('express');
const router = express.Router()
const Joi=require('joi');
const jwt=require('jsonwebtoken')
const config=require('config')
const bcrypt=require('bcrypt');
const _ = require('lodash');
const {User,validate}=require('../models/User');


router.post('/',async(req, res) => {  
    
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({email:req.body.email})

    if(!user) return res.status(400).send('incorrect email or password')

        const validatePassword= await bcrypt.compare(req.body.password,user.password)
        if(!validatePassword)
        return status(400).send('incorrect email or password')
        const token=jwt.sign({_id:user._id},config.get('PrivateKey'))
        return res.json({token:token})

});

module.exports = router;