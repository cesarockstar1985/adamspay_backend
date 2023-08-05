require('dotenv').config()
const axios = require('axios');
const uuid = require('uuid');

const { Pedido } = require('../models/pedido');
const { sendMail } = require('../utils/email');
const res = require('express/lib/response');

const checkout = async ( req, res ) =>{

    const { productoId, name, value, label, email, userId } = req.body
    const docId = uuid.v4()
    const today = new Date();
    const start = new Date(today).toISOString().replace(/\..*$/, '+0000');
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 30);

    const end = endDate.toISOString().replace(/\..*$/, '+0000');
    const axiosConfig = await getAxiosConfig()

    const instance = axios.create(axiosConfig)

    try {

        const body = {
            debt: {
                docId,
                amount: { currency: 'PYG', value },
                label,
                validPeriod: { start, end }
            },
        };

        const response = await instance.post('debts', body)

        if(!response){
            return res.status(404).json({
                msg: 'Ocurrió un error inesperado. Inténtelo más tarde'
            })
        }
        
        const pedidoinsert = await Pedido.create({
            docId,
            userId,
            productoId,
            estado: 'pendiente'
        })

        if(!pedidoinsert){
            return res.status(404).json({
                msg: 'Ocurrió un error inesperado. Inténtelo más tarde'
            })
        }

        sendMail(
            process.env.SALES_EMAIL,
            `Se ha ingresado un Nuevo pago del cliente ${ email }`,
            'Nuevo pedido de pago ingresado'
        );

        const { debt } = response.data

        res.json({
            debt
        })
        
    } catch (error) {

        sendMail(
            email,
            'Ha ocurrido un error al intentar realizar el pago. Verifique que los datos de su medio de pago sean los correctos',
            '# Pedido de pago rechazado'
        );

        throw error
    }

}

const confirmation = () => {
    res.status(200).json({
        msg: 'success'
    })
}

const getAxiosConfig = async () => {
    return {
        baseURL: process.env.ADAMSPAY_BASE_URL,
        headers: {
            'apikey': process.env.ADAMSPAY_KEY,
            'Content-Type': 'application/json'
        }
    }
}

module.exports = {
    checkout,
    confirmation
}