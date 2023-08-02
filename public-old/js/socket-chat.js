var socket = io();
var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

const getUserData = async() => {
    const request = await fetch( baseUrl + '/user/getUserByName/' + params.get('nombre') )
    const response = await request.json()
    const { usuario } = await response

    return usuario
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala'),
};

socket.on('connect', async () => {
    console.log('Conectado al servidor');

    const { image } = await getUserData()
    usuario.image = image == '' ? 'default_user.jpg' : image

    $('.user-profile-img').attr('src', './assets/images/users/' + usuario.image)

    socket.emit('entrarChat', usuario, function(resp) {
        renderizarUsuarios(resp)
        nombreSala()
    });

});

// escuchar
socket.on('disconnect', () => {

    console.log('Perdimos conexión con el servidor');

});

// Escuchar información
socket.on('crearMensaje', function(mensaje)  {
    // console.log('Servidores:', mensaje);
    renderizarMensajes( mensaje, false )
    scrollBottom()
});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('listaPersonas', (personas) =>{
    renderizarUsuarios(personas)
});

// Mensajes privados
socket.on('mensajePrivado', function(mensaje) {

    console.log('Mensaje Privado:', mensaje);

});