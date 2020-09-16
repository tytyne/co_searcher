
const express=require('express');
const router=express.Router();
const {User,validate} = require('../models/User');
const _ =require('lodash')
const bcrypt=require('bcrypt')
const config=require('config')
const jwt=require('jsonwebtoken')


router.post('/',async(req,res)=>{


    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

// check if an email(user) already exists

let user= await User.findOne({email:req.body.email});
console.log(user)

if (user) {return res.status(400).send('That user already exists!');}
 
else {

    console.log(user)
    // Insert the new user 
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        const token = jwt.sign({ _id: user._id }, config.get('PrivateKey'));
        res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));

    }


});

module.exports = router;