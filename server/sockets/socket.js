const { Usuarios } = require('../classes/usuarios');
const { io } = require('../server');
const { crearMensajes } = require('../utils/utilidades');

const usuarios = new Usuarios()

io.on('connection', (client) => {

    client.on('entrarChat', ( usuario, callback ) => {

        if(!usuario.nombre){
            return callback({
                error: true,
                mensaje: ' El nombre/sala es necesario '
            })
        }

        client.join( usuario.sala )

        usuarios.agregarPersona( client.id, usuario.nombre, usuario.sala, usuario.image )

        client.broadcast.to( usuario.sala ).emit('listaPersonas', usuarios.getPersonasPorSala( usuario.sala ))
        client.broadcast.to( usuario.sala ).emit('crearMensaje', crearMensajes( 'Admin', `${ usuario.nombre } se unió` ))
        
        callback(usuarios.getPersonasPorSala( usuario.sala ));
    })
    
    client.on('disconnect', () => {
        const personaBorrada = usuarios.eliminarPersona(client.id)
        
        client.broadcast.to( personaBorrada.sala ).emit('crearMensaje', crearMensajes( 'Admin', `${ personaBorrada.nombre } salió` ))
        client.broadcast.to( personaBorrada.sala ).emit('listaPersonas', usuarios.getPersonasPorSala( personaBorrada.sala ))

    })

    client.on('crearMensaje', ( data, callback ) => {
        
        const { nombre, sala, image } = usuarios.getPersona(client.id)
        const { mensaje } = data

        const msg = crearMensajes( nombre, mensaje, image )
        client.to( sala ).broadcast.emit( 'crearMensaje', msg )

        callback( msg )
    })

    // Mensajes privados
    client.on('mensajePrivado', data => {

        const persona = usuarios.getPersona( client.id )
        client.broadcast.to( data.to ).emit('mensajePrivado', crearMensajes( persona.nombre, data.mensaje ))
    })

    client.on('getUsers', ( data, callback ) => {
        const { searchText, sala } = data
        const firstLetter = searchText.charAt(0)
        const textCamelcase = firstLetter.toUpperCase() + searchText.slice(1)
        const users = usuarios.getPersonasPorSala(sala).filter( user => user.nombre.includes( textCamelcase  ) )
        // console.log(users)
        callback( users )
    })

});