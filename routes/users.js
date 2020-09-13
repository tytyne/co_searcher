
const express=require('express');
const router=express.Router();
const{User}=require('../models/User');
const bcrypt=require('bcryptjs')
router.post('/',async(req,res)=>{
// validate a request

// const{error}=validate(req.body);
// if(error){
//     return res.status(400).send(error.details[0].message);
// }
// check if an email(user) already exists
let user= await User.findOne({email:req.body.email})
if(user)
return res.status(400).send('user already exists')
else{
    user = new User(_.pick(req.body,['name','email','password']))
       
    const salt=await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(user.password,salt)
    await user.save();
    const token=jwt.sign({_id:user._id},config.get('privateKey'))
    res.header('x-auth-token',token).send(_.pick(user,['id','name','email']))
}
})

module.exports = router;