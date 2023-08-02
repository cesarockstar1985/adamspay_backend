var params = new URLSearchParams(window.location.search)

const baseUrl = 'http://localhost:3000'

const nombre = params.get('nombre')
const sala   = params.get('sala')

// referncias de jQuery
const divUsuarios      = $('#divUsuarios')
const formEnviar       = $('#formEnviar')
const txtMensaje       = $('#txtMensaje')
const divChatbox       = $('#divChatbox')
const textoSala        = $('#titleSala')
const searchUser       = $('#searchUser')
const userProfileLink  = $('#userProfileLink')
const userName         = $('#userName')

const getUserByName = async () => {
    const request = await fetch( baseUrl + '/user/getUserByName/' + nombre )
    const { usuario } = await request.json()
    
    return usuario
}

const getSala = async () => {
    const request  = await fetch( baseUrl + '/salas/getSala/' + sala )
    const response = await request.json()

    const salaDB = response.sala

    return salaDB
} 

const nombreSala = async () => {
    const salaDB = await getSala()
    textoSala.text(salaDB.nombre)
}

// Funciones para renderizar usuarios
const renderizarUsuarios = async (personas) => { // [{}, {}, {}]

    let html = ''

    const salaDB = await getSala()

    html += `<li>
                <a href="javascript:void(0)" class="active"> Chat de <span> ${ salaDB.nombre }</span></a>
            </li>`

    for( let i = 0; i < personas.length; i++ ){

        html += `<li>
                    <a class="user-row" data-id="${ personas[i].id }" href="javascript:void(0)"><img src="assets/images/users/${ personas[i].image }" alt="user-img" class="img-circle user-profile-img"> <span>${ personas[i].nombre } <small class="text-success">online</small></span></a>
                </li>`

    }

    divUsuarios.html(html)

}

userName.text(nombre)

// Listeners
divUsuarios.on('click', '.user-row', function() {
    const id = $(this).data('id')
    console.log(id)
})

formEnviar.on('submit', async function(e){
    e.preventDefault()

    if( txtMensaje.val().trim().length === 0 )
        return

    const datosMensaje = {
        nombre,
        mensaje: txtMensaje.val(),
    }

    // Enviar información
    socket.emit('crearMensaje', datosMensaje, function( mensaje ) {
        txtMensaje.val('').focus()
        renderizarMensajes( mensaje, true )
        scrollBottom()
    });
})

searchUser.keyup(function(){
    const searchText = $(this).val()
    const data = {
        searchText,
        sala
    }

    socket.emit('getUsers', data, ( users ) => {
        // console.log( users );
        renderizarUsuarios( users )
    })
})

userProfileLink.click( async function(e){
    e.preventDefault()

    const { id } = await user

    window.location = `perfil.html?&id=${ id }`
})

function renderizarMensajes( msg, yo ){
    const { nombre, mensaje, fecha, image } = msg
    
    let html = '';
    let fechaNew = new Date( fecha )
    let hora = fechaNew.getHours() + ':' + fechaNew.getMinutes()

    let adminClass = 'info'
    let imageElem = `<div class="chat-img"><img src="./assets/images/users/${ image }" alt="user" /></div>`

    if( nombre === 'Admin' ){
        adminClass = 'danger'
        imageElem = ''
    }

    if( yo ){
        html += `<li class="reverse">
                    <div class="chat-content">
                        <h5>${ nombre }</h5>
                        <div class="box bg-light-inverse">${ mensaje }</div>
                    </div>
                    <div class="chat-img"><img src="./assets/images/users/${ image }" alt="user" /></div>
                    <div class="chat-time">${ hora }</div>
                 </li>`
    } else {
        html += `<li class="animated fadeIn">
                    ${ imageElem }
                    <div class="chat-content">
                        <h5>${ nombre }</h5>
                        <div class="box bg-light-${ adminClass }">${ mensaje }</div>
                    </div>
                    <div class="chat-time">${ hora }</div>
                 </li>`
    }
    

    divChatbox.append(html)
}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

const user = getUserByName()