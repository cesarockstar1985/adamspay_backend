const { Router } = require('express')
const { getSalas, getSala } = require('../controllers/salas')

const router = Router()

router.get('/getSalas', getSalas)
router.get('/getSala/:id', getSala)

module.exports = router