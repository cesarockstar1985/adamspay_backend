const { reponse, request } = require('express');
const md5 = require('md5');

const validarCambio = ( req = request, res = response, next ) => {
    const { rawBody } = req;

    const hashSent = req.header('x-adams-notify-hash')
    const hashExpected = md5(process.env.ADAMSPAY_COMMERCE_NAME + rawBody + process.env.ADAMSPAY_SECRET);

    if(hashSent !== hashExpected){
        return res.status(400).json({
            msg: 'El hash no corresponde'
        }) 
    }

    next();
} 

module.exports = {
    validarCambio
}