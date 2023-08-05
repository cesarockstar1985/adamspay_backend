const { Router } = require('express')
const { checkout, confirmation } = require('../controllers/pedidos')

const router = Router()

router.post('/checkout', checkout)
router.post('/confirmation', confirmation)

module.exports = router