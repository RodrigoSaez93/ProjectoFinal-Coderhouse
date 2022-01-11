const ConfigController=require('../controllers/configController')
const express = require('express')
const router = express.Router()
const jwtAuthenticationMiddleware = require('../middleware/jwtAuthenticationMiddleware')


router.get('/config', jwtAuthenticationMiddleware, (req,res)=>{
    ConfigController.getInstance().get(req,res)
})
module.exports=router