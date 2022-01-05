const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController')

router.get('/products', (req, res) =>
  ProductController.getInstance().getList(req, res)
)
router.get('/products/categoria/:categoria', (req, res) =>
  ProductController.getInstance().getListByCategoria(req, res)
)

router.get('/products/:id', (req, res) =>
  ProductController.getInstance().getOne(req, res)
)
router.post('/products', (req, res) => ProductController.getInstance().post(req, res))
router.put('/products', (req, res) => ProductController.getInstance().put(req, res))
router.delete('/products/:id', (req, res) =>
  ProductController.getInstance().delete(req, res)
)


module.exports = router