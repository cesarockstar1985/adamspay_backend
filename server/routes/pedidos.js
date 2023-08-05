const { Router } = require('express')
const { checkout, confirmation } = require('../controllers/pedidos')

const router = Router()

router.post('/checkout', checkout)
router.get('/confirmation', confirmation)

module.exports = router