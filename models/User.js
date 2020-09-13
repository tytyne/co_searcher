
const mongoose =require('mongoose')

var mySchema = mongoose.Schema({

    name:{

        type:String,
        required:true,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        maxlength:50
    },
    password:{
        type:String,
        required:true,
        maxlength:50

    }

});

mySchema.methods.schemaValidate = function(obj){
    var Joi=require('joi')

    const schema={
        name:Joi.string().min(3).max(50).required(),
        email:Joi.string().min(3).max(50).required().email(),
        password:Joi.string().min(5).max(50).required()
    };

    return Joi.validate(obj,schema);
}

module.exports=mongoose.model('User',mySchema)
