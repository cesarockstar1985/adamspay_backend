const crearMensajes = ( nombre, mensaje, image ) => {
    return {
        nombre,
        mensaje,
        fecha: new Date().getTime(),
        image
    }
}

module.exports = {
    crearMensajes
}