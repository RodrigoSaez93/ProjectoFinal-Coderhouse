const express = require('express')
const router = express.Router()
const OrdenController=require('../controllers/OrdenController')
const jwtAuthenticationMiddleware = require('../middleware/jwtAuthenticationMiddleware')

router.get('/api/orden/:id', jwtAuthenticationMiddleware, (req, res) =>OrdenController.getInstance().getOne(req, res))

router.get('/api/orden', jwtAuthenticationMiddleware, (req, res) => OrdenController.getInstance().getList(req, res))

router.post('/api/orden/complete', jwtAuthenticationMiddleware, (req, res) => OrdenController.getInstance().post(req, res))

module.exports=router