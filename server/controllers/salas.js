const { Sala } = require('../models/sala')

const getSalas = async ( req, res ) =>{

    try {

        const salas = await Sala.findAll()

        if(!salas){
            return res.status(404).json({
                msg: `No se encontró el usuario ${ nombre }`
            })
        }

        res.json({
            salas
        })
        
    } catch (error) {
        throw error
    }

}

const getSala = async( req, res ) => {
    try {
        const { id } = req.params
        const sala = await Sala.findOne( { where: { id } } )

        res.json({
            sala
        })
    } catch (error) {
        
    }
}

module.exports = {
    getSalas,
    getSala
}