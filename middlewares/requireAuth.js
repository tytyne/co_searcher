const requireAuth=(req,res,next)=>{
    if(req.user){
        next();
    }else
    {
        res.send('login',{
            message:'Please login to continue'
        })
    }
};

module.exports=requireAuth