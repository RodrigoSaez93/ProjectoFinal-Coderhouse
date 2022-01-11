const joi =require('joi')

const authLoginSchema=joi.object({
    email:joi.string().required(),
    password:joi.number().required()
}) 
const authSignupSchema =joi.object({

    email:joi.string().required(),
    password:joi.number().required(),
    name:joi.string().required(),
    phone:joi.number().required()   

})

module.exports={authLoginSchema, authSignupSchema}