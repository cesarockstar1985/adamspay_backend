const { Router } = require('express')
const { checkout } = require('../controllers/pedidos')

const router = Router()

router.post('/checkout', checkout)

module.exports = router