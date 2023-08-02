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

        // crear hash para password
        // const salt = bcryptjs.genSaltSync()
        // usuario.password = bcryptjs.hashSync( password, salt)

        // console.log( usuario.password )

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

const logout = async ( req, res ) =>{

    const { nombre, password } = req.body

    try {
        const usuario = await Usuario.findOne({ where: { nombre, password } })

        if(!usuario){
            return res.status(404).json({
                msg: `No se encontró el usuario ${ nombre }`
            })
        }

        res.json({
            usuario
        })
        
    } catch (error) {
        throw error
    }

}

module.exports = {
    login,
    logout
}