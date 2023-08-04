const { Usuario } = require('../models/usuario')
const bcryptjs= require('bcryptjs')

const login = async ( req, res ) =>{

    const { nombre, password } = req.body
    
    try {

        const usuario = await Usuario.findOne({ where: { nombre } })
        if( !usuario ){
            return res.status(401).json({
                msg: 'Usuario / Password no son correctos - usuario'
            })
        }

        const validPassword = bcryptjs.compareSync( password, usuario.password )
        if( !validPassword ){
            return res.status(401).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        res.status(202).json({
            usuario
        })
        
    } catch (error) {
        throw new Error(error)
    }

}

module.exports = {
    login
}