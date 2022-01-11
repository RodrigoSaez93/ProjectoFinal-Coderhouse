const express = require('express')
const router = express.Router()
const OrdenController=require('../controllers/OrdenController')
const jwtAuthenticationMiddleware = require('../middleware/jwtAuthenticationMiddleware')
const validateBody = require('../middleware/validateBody')
const {ordenSchema}=require('../validator/orden')

router.get('/orden/:id', jwtAuthenticationMiddleware, (req, res) =>OrdenController.getInstance().getOne(req, res))

router.get('/orden', jwtAuthenticationMiddleware, (req, res) => OrdenController.getInstance().getList(req, res))

router.post('/orden/complete',validateBody(ordenSchema), jwtAuthenticationMiddleware, (req, res) => OrdenController.getInstance().post(req, res))

module.exports=router