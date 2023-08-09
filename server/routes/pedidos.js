const { Router } = require('express')
const { checkout, confirmation, adamsPayWebhook, deudas } = require('../controllers/pedidos')
const bodyParser = require("body-parser");
const { validarCambio } = require('../../middlewares/validar-cambio-estado');

const router = Router()

router.post('/checkout', checkout)
router.get('/confirmation', confirmation)
router.post('/deudas', deudas)
router.post('/webhook', [
    bodyParser.raw({ type: '*/*' }),
    validarCambio,
], adamsPayWebhook)

module.exports = router