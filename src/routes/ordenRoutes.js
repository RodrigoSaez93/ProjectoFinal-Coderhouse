const express = require('express')
const router = express.Router()
const OrdenController=require('../controllers/OrdenController')

router.get('/api/orden/:id', (req, res) =>
OrdenController.getInstance().getOne(req, res)
)

router.get('api/orden', (req, res) =>
OrdenController.getInstance().getList(req, res)
)

router.post('api/orden/conplete', (req, res) => OrdenController.getInstance().post(req, res))

