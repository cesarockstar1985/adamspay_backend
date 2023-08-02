const { Router } = require('express')
const { subirArchivo } = require('../helpers/subir-archivo')
const { Usuario } = require('../models/usuario')
const bcryptjs = require('bcryptjs');


const router = Router()

router.get('/getUser/:id', async ( req, res ) => {
    const { id } = req.params 

    const usuario = await Usuario.findByPk( id, {
        attributes: ['nombre', 'email', 'image']
    })

    if( !usuario ){
        return res.status(404).json({
            msg: `No se encontró el usuario con id ${ id }`
        })
    }

    res.json({
        usuario
    })
})

router.get('/getUserByName/:nombre', async ( req, res ) => {
    const { nombre } = req.params

    const usuario = await Usuario.findOne({
        where: { nombre },
        attributes: ['id', 'image']
    })

    if( !usuario ){
        return res.status(404).json({
            msg: `No se encontró el usuario con nombre ${ nombre }`
        })
    }

    res.json({
        usuario
    })
})

router.post('/uploadFile', async( req, res ) => {

    if ( !req.files || Object.keys(req.files).length === 0 ) {
        res.status(400).json({ msg: 'No hay archivos que subir' });
        return;
    }

    try {
        
        const nombre = await subirArchivo( req.files, undefined, 'imgs' )
        res.json({ nombre })

    } catch (msg) { 
        console.log(msg)
        res.status(400).json({ msg })
    }

})

router.post('/saveData', async( req, res ) => {
    const { id, nombre, password } = req.body
    
    try {

        const usuario = await Usuario.findByPk( id )
        let usuarioDB = {}
        usuarioDB.nombre = nombre
        if ( !usuario ) {
            return res.json({
                msg: 'No existe un usuario con el id: ' + id
            }) 
        }
        if ( password ) {
            // Encriptar la contraseña
            const salt = bcryptjs.genSaltSync();
            usuarioDB.password = bcryptjs.hashSync( password, salt );
        }
        if( req.files ){
            usuarioDB.image = subirArchivo

            try {
        
                usuarioDB.image = await subirArchivo( req.files, undefined, 'images/users/' )
        
            } catch (msg) { 
                return res.status(400).json({ msg })
            }
        }

        await usuario.update(usuarioDB)

        res.json( usuario )
    
    } catch (error) {
        res.json({
            msg: 'Hable con el administrador'
        }) 
    }

    // window.location = 'http://localhost:3000/'
})

module.exports = router